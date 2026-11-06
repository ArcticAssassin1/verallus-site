"""Shared helpers for the painted world map (see README.md).

Traces the continent shapes and placements from app/components/WorldMap.tsx
(viewBox 960x560) and paints fractal terrain over them.

Outputs (in OUT):
  verallus-relief.webp   base painting, 2x the viewBox
  skyspire.webp          floating continent, transparent, for the float animation
  storm.webp             Oathless storm, transparent, for the slow spin
  shapes.json            traced region outlines (viewBox units) + river path
"""
import json, re, sys, time
import numpy as np, cv2
from scipy import ndimage as ndi
from PIL import Image

import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
S = 2
# The painted extent in map units. The map was drawn on 0..960 x 0..560; the view is zoomed out
# around it so the Frozen Wastes, Pratvia and the east have room (Dan, 2026-11-06).
X0, Y0, VW, VH = -60, -70, 1120, 654
W, H = VW * S, VH * S
O = np.array([X0, Y0], float)
CELLK = VW / 960   # keep noise feature sizes the same in map units
T0 = time.time()
def log(m): print(f'[{time.time()-T0:5.1f}s] {m}', flush=True)

# ───────────────────────── shapes (viewBox units, copied from WorldMap.tsx) ─────────────────────────
P = {
 'frozen':  'M 42,148 C 25,122 15,88 28,55 C 40,25 72,4 118,-2 C 170,-10 240,-18 310,-18 C 380,-18 440,-12 490,0 C 526,10 546,30 544,52 C 542,74 520,90 486,98 C 444,104 400,94 356,94 C 314,94 280,98 258,110 C 238,122 222,152 192,166 C 156,176 118,170 72,162 C 58,159 48,154 42,148 Z',
 'dormose': 'M 148,188 C 130,228 122,292 126,360 C 130,425 150,468 178,482 C 196,492 215,486 218,468 C 224.6,477.2 237.1,486.3 254,493.8 C 254,493.8 248,478 244,466 C 236,442 240,416 237,388 C 234,360 236,334 238,312 C 228,302 218,288 212,270 C 207,236 200,210 186,198 Z',
 'feyvey':  'M 186,198 C 200,210 207,236 212,270 C 218,288 228,302 238,312 C 262,318 300,322 332,326 C 362,330 386,342 400,354 C 394,326 393,288 402,266 C 410,246 432,236 442,220 C 438,192 422,170 394,158 C 362,146 322,142 282,145 C 242,148 210,168 186,198 Z',
 'regalus': 'M 238,312 C 236,334 234,360 237,388 C 240,416 236,442 244,466 C 248,478 254,493.8 254,493.8 C 262.9,497.8 273,501.2 284,504 C 316,512 352,510 382,500 C 412,490 434,468 440,444 C 448,426 446,412 434,406 C 414,398 400,378 400,354 C 386,342 362,330 332,326 C 300,322 262,318 238,312 Z',
 'ashen':   'M 565,178 C 578,150 612,128 660,130 C 708,132 758,158 790,195 C 818,228 824,268 815,305 C 805,340 783,368 755,385 C 728,402 698,410 668,412 L 660,452 C 648,472 628,484 602,486 C 576,488 552,474 538,452 C 524,430 520,402 526,382 C 534,362 558,350 564,328 C 570,306 560,286 546,268 C 534,254 526,236 526,214 C 527,198 536,176 565,178 Z',
 'maw':     'M 522,374 C 535,358 558,348 582,355 C 606,362 625,380 630,402 C 635,422 625,444 606,454 C 587,464 562,460 546,444 C 530,428 520,402 522,374 Z',
 'sky':     'M 355,75 C 360,58 380,46 408,44 C 436,42 458,54 462,70 C 466,84 454,98 432,103 C 415,108 390,107 372,100 C 355,93 348,88 355,75 Z',
 'redwake': 'M 436,489 C 448,480 469.5,481 488.6,488 C 510.1,495 531.7,498 555.6,498 C 579.5,498 598.6,494 620.2,495 C 639.3,496 656,497 663.2,503 C 668,509 658.4,515 644.1,517 C 627.3,520 613,522 596.2,519 C 574.7,515 550.8,515 526.9,513 C 505.4,512 476.7,510 455.1,504 C 440.8,500 431.2,495 436,489 Z',
 'pratvia': 'M 444,264 C 462,258 482,264 490,280 C 500,300 500,330 496,350 C 492,372 480,388 462,390 C 444,392 430,382 426,364 C 420,342 420,310 424,290 C 428,274 434,266 444,264 Z',
 'ember':   'M 680,480 C 690,460 715,448 748,448 C 782,448 808,464 818,486 C 828,508 816,532 794,542 C 772,552 742,550 716,540 C 690,530 670,510 680,480 Z',
}
# Skyspire Zenith floats over Pratvia, its own island in the middle (Dan, 2026-11-06).
# The floating layer keeps its drawn shape ('sky') and is placed by this transform.
SKY_SCALE, SKY_DX, SKY_DY = 0.75, 154.0, 246.0
def sky_xf(pts): return np.asarray(pts, float) * SKY_SCALE + np.array([SKY_DX, SKY_DY])
ISLES = [(180,522,22,11),(242,530,18,9),(298,520,14,8),(348,534,10,6),(395,524,8,5),(458,536,6,4),(515,525,10,6),(565,534,8,5)]

def parse(d):
    toks = re.findall(r'[MCLZ]|-?\d+(?:\.\d+)?', d)
    pts, i, cmd, cur = [], 0, None, None
    while i < len(toks):
        t = toks[i]
        if t in 'MCLZ': cmd = t; i += 1; continue
        if cmd == 'M':
            cur = (float(toks[i]), float(toks[i+1])); pts.append(cur); i += 2; cmd = 'L'
        elif cmd == 'L':
            cur = (float(toks[i]), float(toks[i+1])); pts.append(cur); i += 2
        elif cmd == 'C':
            p = [cur] + [(float(toks[i+k]), float(toks[i+k+1])) for k in (0, 2, 4)]; i += 6
            for s in np.linspace(0, 1, 30)[1:]:
                u = 1 - s
                pts.append(tuple(u**3*np.array(p[0]) + 3*u*u*s*np.array(p[1]) + 3*u*s*s*np.array(p[2]) + s**3*np.array(p[3])))
            cur = p[3]
    return np.array(pts)

def poly_mask(pts, scale=S, shape=None):
    # map-unit points on the main canvas, or local points on a given canvas
    if shape is None: shape, pts = (H, W), np.asarray(pts, float) - O
    m = np.zeros(shape, np.uint8)
    cv2.fillPoly(m, [np.round(pts * scale * 8).astype(np.int32)], 1, lineType=cv2.LINE_8, shift=3)
    return m.astype(bool)

def ell_mask(cx, cy, rx, ry, shape=None, scale=S):
    if shape is None: shape, cx, cy = (H, W), cx - X0, cy - Y0
    m = np.zeros(shape, np.uint8)
    cv2.ellipse(m, (int(cx*scale), int(cy*scale)), (int(rx*scale), int(ry*scale)), 0, 0, 360, 1, -1)
    return m.astype(bool)

# ───────────────────────── noise ─────────────────────────
def vnoise(cells, seed, shape=(H, W), stretch=(1.0, 1.0)):
    h, w = shape
    if shape == (H, W): cells = cells * CELLK
    r = np.random.default_rng(seed)
    gw = max(2, int(cells * stretch[0])) + 4
    gh = max(2, int(cells * h / w * stretch[1])) + 4
    g = r.standard_normal((gh, gw)).astype(np.float32)
    bw, bh = int(w * gw / (gw - 4)), int(h * gh / (gh - 4))
    big = cv2.resize(g, (bw, bh), interpolation=cv2.INTER_CUBIC)
    ox, oy = (bw - w) // 2, (bh - h) // 2
    n = big[oy:oy+h, ox:ox+w]
    return (n - n.mean()) / (n.std() + 1e-6)

def perlin(cells, seed, shape=(H, W)):
    h, w = shape
    if shape == (H, W): cells = cells * CELLK
    r = np.random.default_rng(seed)
    gw = int(cells) + 3; gh = int(cells * h / w) + 3
    ang = r.uniform(0, 2 * np.pi, (gh, gw)).astype(np.float32)
    GX, GY = np.cos(ang), np.sin(ang)
    ox, oy = r.uniform(0, 1, 2)
    X = (np.arange(w, dtype=np.float32) / w * cells + ox)[None, :].repeat(h, 0)
    Y = (np.arange(h, dtype=np.float32) / w * cells + oy)[:, None].repeat(w, 1)
    x0 = np.floor(X).astype(np.int32); y0 = np.floor(Y).astype(np.int32)
    fx = X - x0; fy = Y - y0
    def g(ix, iy, dx, dy): return GX[iy, ix] * dx + GY[iy, ix] * dy
    n00 = g(x0, y0, fx, fy); n10 = g(x0 + 1, y0, fx - 1, fy)
    n01 = g(x0, y0 + 1, fx, fy - 1); n11 = g(x0 + 1, y0 + 1, fx - 1, fy - 1)
    u = fx * fx * fx * (fx * (fx * 6 - 15) + 10); v = fy * fy * fy * (fy * (fy * 6 - 15) + 10)
    a = n00 + u * (n10 - n00); b = n01 + u * (n11 - n01)
    return (a + v * (b - a)) * 1.414

def fbm(cells, octaves, seed, pers=0.5, shape=(H, W), stretch=(1.0, 1.0)):
    tot = np.zeros(shape, np.float32); amp = 1.0
    for o in range(octaves):
        c = cells * 2**o
        if c > shape[1] / 2: break
        if stretch != (1.0, 1.0): n = vnoise(c, seed * 31 + o, shape, stretch)
        else: n = perlin(c, seed * 31 + o, shape)
        tot += amp * n; amp *= pers
    return (tot - tot.mean()) / (tot.std() + 1e-6)

def ridged(cells, octaves, seed, shape=(H, W), gain=2.0, Hexp=1.0, off=1.0):
    tot = np.zeros(shape, np.float32); w = np.ones(shape, np.float32); norm = 0
    for o in range(octaves):
        c = cells * 2 ** o
        if c > shape[1] / 2: break
        n = perlin(c, seed * 17 + o, shape)
        sig = np.clip(off - np.abs(n), 0, None) ** 2 * w
        w = np.clip(sig * gain, 0, 1)
        a = 2.0 ** (-o * Hexp)
        tot += sig * a; norm += a
    return tot / norm

def warp(img, wx, wy, interp=cv2.INTER_LINEAR):
    h, w = img.shape[:2]
    gx, gy = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(img, gx + wx, gy + wy, interp, borderMode=cv2.BORDER_REFLECT)

def blur(a, s): return cv2.GaussianBlur(a, (0, 0), s) if s > 0 else a
def sstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def edt(m): return ndi.distance_transform_edt(m).astype(np.float32)

def catmull(pts, n=12):
    pts = np.array(pts, float); out = []
    P_ = np.vstack([pts[0], pts, pts[-1]])
    for i in range(1, len(P_) - 2):
        p0, p1, p2, p3 = P_[i-1], P_[i], P_[i+1], P_[i+2]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(0.5 * ((2*p1) + (-p0+p2)*t + (2*p0-5*p1+4*p2-p3)*t*t + (-p0+3*p1-3*p2+p3)*t**3))
    out.append(pts[-1]); return np.array(out)

def line_dist(polys, closed=False):
    """distance in px from a set of polylines given in viewBox units"""
    m = np.ones((H, W), np.uint8)
    for p in polys:
        cv2.polylines(m, [np.round((np.array(p) - O) * S).astype(np.int32)], closed, 0, 2)
    return edt(m)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
xx += X0 * S; yy += Y0 * S   # map units x S, so U(x) comparisons hold
U = lambda v: v * S   # units → px


def ramp(e, stops):
    xs = np.array([s[0] for s in stops], np.float32); cs = np.array([s[1] for s in stops], np.float32)
    out = np.zeros(e.shape + (3,), np.float32)
    for c in range(3): out[..., c] = np.interp(e, xs, cs[:, c])
    return out
LIGHT = np.array([-0.62, -0.58, 0.53]); LIGHT /= np.linalg.norm(LIGHT)
def mix(img, a, c):
    a = a[..., None] if a.ndim == 2 else a
    return img * (1 - a) + a * np.asarray(c, np.float32)
