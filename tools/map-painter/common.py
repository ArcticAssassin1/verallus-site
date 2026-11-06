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
W, H = 960 * S, 560 * S
T0 = time.time()
def log(m): print(f'[{time.time()-T0:5.1f}s] {m}', flush=True)

# ───────────────────────── shapes (viewBox units, copied from WorldMap.tsx) ─────────────────────────
P = {
 'frozen':  'M 42,148 C 25,122 15,88 28,55 C 40,25 72,8 118,6 C 162,4 205,20 232,50 C 255,75 258,108 242,138 C 225,165 192,175 155,172 C 118,170 72,162 42,148 Z',
 'dormose': 'M 148,188 C 130,228 122,292 126,360 C 130,425 150,468 178,482 C 196,492 215,486 218,468 C 224.6,477.2 237.1,486.3 254,493.8 C 254,493.8 248,478 244,466 C 236,442 240,416 237,388 C 234,360 236,334 238,312 C 230,300 224,286 220,270 C 215,234 205,208 186,198 Z',
 'feyvey':  'M 186,198 C 205,208 215,234 220,270 C 224,286 230,300 238,312 C 262,318 300,322 332,326 C 366,330 396,336 418,344 C 428,348 436.9,356 436.9,356 C 433.7,332 432.4,313.7 436,302 C 442,275 444,248 442,220 C 438,192 422,170 394,158 C 362,146 322,142 282,145 C 242,148 210,168 186,198 Z',
 'regalus': 'M 238,312 C 236,334 234,360 237,388 C 240,416 236,442 244,466 C 248,478 254,493.8 254,493.8 C 262.9,497.8 273,501.2 284,504 C 316,512 352,510 382,500 C 412,490 434,468 440,444 C 446,420 442,392 438,364 C 437.6,361.3 437.2,358.6 436.9,356 C 436.9,356 428,348 418,344 C 396,336 366,330 332,326 C 300,322 262,318 238,312 Z',
 'ashen':   'M 525,178 C 538,150 572,128 620,130 C 668,132 718,158 750,195 C 778,228 784,268 775,305 C 765,340 743,368 715,385 C 688,402 658,410 628,412 L 620,452 C 608,472 588,484 562,486 C 536,488 512,474 498,452 C 484,430 480,402 482,374 C 484,346 498,325 512,308 C 498,290 488,268 484,244 C 480,220 484,198 494,182 C 504,168 518,178 525,178 Z',
 'maw':     'M 482,374 C 495,358 518,348 542,355 C 566,362 585,380 590,402 C 595,422 585,444 566,454 C 547,464 522,460 506,444 C 490,428 480,402 482,374 Z',
 'sky':     'M 355,75 C 360,58 380,46 408,44 C 436,42 458,54 462,70 C 466,84 454,98 432,103 C 415,108 390,107 372,100 C 355,93 348,88 355,75 Z',
 'redwake': 'M 436,489 C 446,480 464,481 480,488 C 498,495 516,498 536,498 C 556,498 572,494 590,495 C 606,496 620,497 626,503 C 630,509 622,515 610,517 C 596,520 584,522 570,519 C 552,515 532,515 512,513 C 494,512 470,510 452,504 C 440,500 432,495 436,489 Z',
 'ember':   'M 640,480 C 650,460 675,448 708,448 C 742,448 768,464 778,486 C 788,508 776,532 754,542 C 732,552 702,550 676,540 C 650,530 630,510 640,480 Z',
}
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

def poly_mask(pts, scale=S, shape=(H, W)):
    m = np.zeros(shape, np.uint8)
    cv2.fillPoly(m, [np.round(pts * scale * 8).astype(np.int32)], 1, lineType=cv2.LINE_8, shift=3)
    return m.astype(bool)

def ell_mask(cx, cy, rx, ry, shape=(H, W), scale=S):
    m = np.zeros(shape, np.uint8)
    cv2.ellipse(m, (int(cx*scale), int(cy*scale)), (int(rx*scale), int(ry*scale)), 0, 0, 360, 1, -1)
    return m.astype(bool)

# ───────────────────────── noise ─────────────────────────
def vnoise(cells, seed, shape=(H, W), stretch=(1.0, 1.0)):
    h, w = shape
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
        cv2.polylines(m, [np.round(np.array(p) * S).astype(np.int32)], closed, 0, 2)
    return edt(m)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
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
