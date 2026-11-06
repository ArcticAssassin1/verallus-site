"""Floating layers: Skyspire Zenith (float animation) and the Oathless storm (slow spin)."""
import os, json
from common import *
os.makedirs(OUT, exist_ok=True)
shp_sky = parse(P['sky'])

# ───────── Skyspire ─────────
log('skyspire')
bx0, by0, bx1, by1 = 326, 14, 494, 152
SK = 4
lh, lw = (by1 - by0) * SK, (bx1 - bx0) * SK
ly, lx = np.mgrid[0:lh, 0:lw].astype(np.float32)
SH = (lh, lw)
def lmask(pts): return poly_mask(pts - np.array([bx0, by0]), scale=SK, shape=SH)
top = lmask(shp_sky)
lsd = edt(top) - edt(~top)
top = (warp(lsd, fbm(8, 3, 300, shape=SH) * 7, fbm(8, 3, 301, shape=SH) * 7) + fbm(30, 5, 302, shape=SH) * 6) > 0
main_lab = ndi.label(top)[0]; keep = main_lab[(70 - by0) * SK, (408 - bx0) * SK]
top = main_lab == keep
for cx, cy, rx, ry in [(369,121,7,3.4),(454,108,6,2.8),(476,84,4,2),(342,60,4.6,2.2),(444,30,4,1.8),(388,130,3,1.4)]:
    em = np.zeros(SH, np.uint8)
    cv2.ellipse(em, (int((cx - bx0) * SK), int((cy - by0) * SK)), (int(rx * SK), int(ry * SK)), 0, 0, 360, 1, -1)
    e2 = (warp(edt(em.astype(bool)) - edt(~em.astype(bool)), fbm(20, 3, 310 + cx, shape=SH) * 3, fbm(20, 3, 320 + cy, shape=SH) * 3)) > 0
    top |= e2
lab2, n2 = ndi.label(top)
under = np.zeros(SH, bool); under_d = np.zeros(SH, np.float32)
jag = fbm(26, 5, 303, shape=SH)
for i in range(1, n2 + 1):
    m = lab2 == i
    ys, xs = np.nonzero(m)
    x0, x1 = xs.min(), xs.max(); cxm = (x0 + x1) / 2; half = (x1 - x0) / 2 + 1
    for x in range(x0, x1 + 1):
        col_ = np.nonzero(m[:, x])[0]
        if len(col_) == 0: continue
        yb = col_.max()
        k = max(0.0, 1 - ((x - cxm) / half) ** 2)
        dep = int(max(0, half * 0.55 * k ** 1.15 * (1 + 0.22 * jag[yb, x])))
        y2 = min(lh - 1, yb + dep)
        under[yb:y2, x] = True
        under_d[yb:y2, x] = (np.arange(yb, y2) - yb) / max(dep, 1)
under = ndi.binary_opening(under & ~top, iterations=2)
tdl = edt(top)
th = ridged(10, 6, 305, shape=SH) * 0.35 + (1 - np.exp(-tdl / 30)) * 0.4
tzy, tzx = np.gradient(blur(th, 1.2) * 70)
tn = np.sqrt(tzx ** 2 + tzy ** 2 + 1)
trel = np.clip((-tzx * LIGHT[0] - tzy * LIGHT[1] + LIGHT[2]) / tn, 0, 1) / LIGHT[2]
tc = ramp(np.clip(th / 0.7, 0, 1), [(0,(96,116,98)),(0.35,(78,104,84)),(0.65,(104,114,110)),(1,(176,186,196))])
# terraces: the altitude rings of the city, darker low ring, bright upper ring
ring_t = np.clip(tdl / (tdl.max() + 1e-6), 0, 1)
tc = mix(tc, sstep(0.08, 0.25, ring_t) * (1 - sstep(0.4, 0.55, ring_t)) * 0.35, (92, 88, 84))
tc = mix(tc, sstep(0.5, 0.75, ring_t) * 0.45, (150, 170, 182))
tc *= (0.35 + 0.65 * np.clip(trel, 0, 1.5))[..., None] * (1 + fbm(80, 3, 306, shape=SH) * 0.05)[..., None]
r_ = np.random.default_rng(307)
clus = sstep(0.1, 0.9, fbm(18, 4, 311, shape=SH))
cand = np.argwhere(top & (tdl > 10) & (lab2 == lab2[(70 - by0) * SK, (408 - bx0) * SK]))
pw = clus[cand[:, 0], cand[:, 1]] + 0.05; pw /= pw.sum()
lights = np.zeros(SH, np.float32)
for py, px in cand[r_.choice(len(cand), 900, replace=False, p=pw)]: lights[py, px] = r_.uniform(0.4, 1)
tc += blur(lights, 1.2)[..., None] * np.array([255, 226, 160]) * 3.0 + blur(lights, 6)[..., None] * np.array([255, 196, 120]) * 3.2
# underside rock with strata and a cold rim light
ux = np.gradient(blur(jag, 4), axis=1)
uc = np.array([66, 62, 64], np.float32)[None, None, :] * (1 - 0.6 * under_d[..., None])
uc *= (1 + np.clip(-ux * 40, -0.35, 0.45))[..., None]
strata = 0.5 + 0.5 * np.sin(ly / 7 + fbm(16, 3, 309, shape=SH) * 2.2)
uc *= (0.86 + 0.14 * strata)[..., None] * (1 + fbm(60, 3, 308, shape=SH) * 0.07)[..., None]
uc = mix(uc, sstep(0.75, 1.0, under_d) * 0.5, (40, 90, 140))
lip = top & (tdl < 3.5)
tc[lip] *= 0.72
rgb = np.where(top[..., None], tc, uc)
# three glass spires of Primeridia
for sx, sy0, sy1, wd in ((390, 76, 46, 1.0), (408, 72, 31, 1.3), (426, 76, 48, 1.0)):
    spm = np.zeros(SH, np.float32)
    a = np.array([(sx - bx0) * SK, (sy0 - by0) * SK]); b = np.array([(sx - bx0) * SK, (sy1 - by0) * SK])
    poly = np.array([a + [-6 * wd, 0], a + [6 * wd, 0], b]).astype(np.int32)
    cv2.fillPoly(spm, [poly], 1.0, cv2.LINE_AA)
    shade_s = np.clip((lx - a[0]) / (6 * wd), -1, 1)
    sc = np.array([170, 214, 240])[None, None, :] * (1 - 0.3 * shade_s[..., None])
    rgb = rgb * (1 - spm[..., None]) + spm[..., None] * sc
    top |= spm > 0.3
    rgb += blur(spm, 10)[..., None] * np.array([70, 170, 240]) * 1.3
    tipg = np.exp(-((lx - b[0]) ** 2 + (ly - b[1]) ** 2) / (2 * 7 ** 2))
    rgb += tipg[..., None] * np.array([200, 240, 255]) * 1.4
alpha = np.clip(blur((top | under).astype(np.float32), 0.9), 0, 1)
halo = blur(alpha, 18) * 0.45
A = np.clip(alpha + halo * (1 - alpha), 0, 1)
out = (np.clip(rgb, 0, 255) * alpha[..., None] + np.array([79, 195, 247]) * (halo * (1 - alpha))[..., None]) / np.maximum(A, 1e-4)[..., None]
sk = np.dstack([np.clip(out, 0, 255), A * 255]).astype(np.uint8)
Image.fromarray(sk, 'RGBA').resize(((bx1 - bx0) * S, (by1 - by0) * S), Image.LANCZOS).save(f'{OUT}/skyspire.webp', quality=90, method=6)

# ───────── Oathless storm ─────────
log('storm')
SR = 80
N = SR * 2 * 4
SH2 = (N, N)
sy_, sx_ = np.mgrid[0:N, 0:N].astype(np.float32)
c = N / 2
rr = np.hypot(sx_ - c, sy_ - c) / c
ang = np.arctan2(sy_ - c, sx_ - c)
tw = 2.9 * np.log(rr + 0.06)
def swirl(field, k=1.0):
    a2 = ang + tw * k
    u = (np.cos(a2) * rr * 0.5 + 0.5) * (N - 1); v = (np.sin(a2) * rr * 0.5 + 0.5) * (N - 1)
    return cv2.remap(field, u.astype(np.float32), v.astype(np.float32), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
cloud = swirl(fbm(7, 7, 401, shape=SH2, pers=0.55))
arms = 0.5 + 0.5 * np.sin((ang + tw) * 3 + cloud * 0.9)
fine = swirl(fbm(30, 4, 402, shape=SH2), 1.1)
dens = np.clip(arms * 0.7 + cloud * 0.28 + fine * 0.1 - 0.05, 0, 1.3)
dens *= sstep(1.0, 0.5, rr) * sstep(0.04, 0.2, rr)
dz = blur(dens, 3)
gy2, gx2 = np.gradient(dz)
vol2 = np.clip(-(gx2 * LIGHT[0] + gy2 * LIGHT[1]) * 60, -1, 1)
scol = ramp(np.clip(dens, 0, 1), [(0,(26,12,54)),(0.35,(70,34,140)),(0.7,(126,86,214)),(1,(200,178,250))])
scol *= (0.78 + 0.32 * vol2)[..., None]
r_ = np.random.default_rng(403)
bolt = np.zeros(SH2, np.float32)
for b in range(7):
    a0 = r_.uniform(0, 6.28); r0 = r_.uniform(0.25, 0.6)
    p = np.array([c + np.cos(a0) * r0 * c, c + np.sin(a0) * r0 * c]); dv = np.array([np.cos(a0 + 1.5), np.sin(a0 + 1.5)])
    for s_ in range(r_.integers(9, 16)):
        dv = dv + r_.normal(0, 0.6, 2); dv /= np.linalg.norm(dv)
        q = p + dv * r_.uniform(9, 20)
        cv2.line(bolt, tuple(int(v) for v in p), tuple(int(v) for v in q), 1.0, 2, cv2.LINE_AA)
        if r_.random() < 0.3:
            d2 = dv + r_.normal(0, 1.0, 2)
            cv2.line(bolt, tuple(int(v) for v in q), tuple(int(v) for v in q + d2 * 12), 0.6, 1, cv2.LINE_AA)
        p = q
bolt *= sstep(1.0, 0.75, rr)
scol += bolt[..., None] * np.array([255, 245, 255]) + blur(bolt, 7)[..., None] * np.array([170, 120, 255]) * 1.6
eye = np.exp(-(rr / 0.11) ** 2)
scol = mix(scol, eye * 0.85, (150, 70, 240))
scol += (np.exp(-(rr / 0.05) ** 2) * 0.8)[..., None] * np.array([230, 200, 255])
salpha = np.clip(dens * 0.86 + eye * 0.7 + blur(bolt, 4) * 0.8, 0, 1) * sstep(1.0, 0.82, rr)
st = np.dstack([np.clip(scol, 0, 255), salpha * 255]).astype(np.uint8)
Image.fromarray(st, 'RGBA').resize((SR * 2 * S, SR * 2 * S), Image.LANCZOS).save(f'{OUT}/storm.webp', quality=88, method=6)
json.dump({'sky': dict(x=bx0, y=by0, w=bx1 - bx0, h=by1 - by0), 'stormR': SR}, open(f'{OUT}/layers.json', 'w'))

# preview on navy
for name in ('skyspire', 'storm'):
    im = Image.open(f'{OUT}/{name}.webp').convert('RGBA')
    bg = Image.new('RGBA', im.size, (8, 18, 36, 255)); bg.alpha_composite(im); bg.convert('RGB').save(f'{OUT}/{name}_prev.png')
log('done')
