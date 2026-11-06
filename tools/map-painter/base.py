"""Base painting: terrain, ocean, fire, clouds. Writes verallus-relief.webp, preview.png, shapes.json."""
import os, json
from common import *

os.makedirs(OUT, exist_ok=True)
shp = {k: parse(v) for k, v in P.items()}

# ───────── 1. land ─────────
log('masks')
M = {k: poly_mask(shp[k]) for k in ('frozen', 'dormose', 'feyvey', 'regalus', 'ashen', 'ember', 'maw', 'redwake')}
isle = np.zeros((H, W), bool)
for cx, cy, rx, ry in ISLES: isle |= ell_mask(cx, cy, rx, ry)
LBL0 = np.zeros((H, W), np.uint8)
for i, k in enumerate(('frozen', 'dormose', 'feyvey', 'regalus', 'ashen', 'ember'), 1): LBL0[M[k]] = i
LBL0[isle] = 7
LBL0[M['redwake']] = 8
L0 = ndi.binary_closing(LBL0 > 0, iterations=2)

log('coastline')
sdf = edt(L0) - edt(~L0)
isle_zone = blur((edt(~isle) < U(24)).astype(np.float32), U(5))
dune_d = edt(~M['redwake'])
dune_zone = blur((dune_d < U(14)).astype(np.float32), U(4)) * (1 - isle_zone)
amp = U(9.5) * (1 - isle_zone - dune_zone) + U(3.2) * isle_zone + U(4) * dune_zone
wx = (fbm(6, 4, 101) * U(7) + fbm(14, 3, 108) * U(7)) * (1 - 0.7 * isle_zone - 0.55 * dune_zone)
wy = (fbm(6, 4, 102) * U(7) + fbm(14, 3, 109) * U(7)) * (1 - 0.7 * isle_zone - 0.55 * dune_zone)
sdf_w = warp(sdf, wx, wy)
cn = fbm(16, 7, 103, pers=0.62)
cn = warp(cn, fbm(9, 3, 106) * U(7), fbm(9, 3, 107) * U(7))
LAND = (sdf_w + cn * amp) > 0

do0 = edt(~LAND)
band = sstep(U(474), U(506), yy) * sstep(U(125), U(150), xx) * (1 - sstep(U(600), U(625), xx))
str_x = (xx > U(432)) & (xx < U(494)) & (yy > U(170)) & (yy < U(500))
storm_zone = (xx - U(858)) ** 2 + (yy - U(185)) ** 2 < U(72) ** 2
isl_n = fbm(60, 4, 105)
coastal = sstep(U(20), U(6), do0) * sstep(U(2.5), U(6), do0)
thr = 3.0 - 1.15 * band * sstep(U(30), U(6), edt(~isle)) - 0.55 * band - 0.6 * coastal
islets = (isl_n > thr) & ~LAND & ~str_x & ~storm_zone & (dune_d > U(9))
islets &= (xx > U(10)) & (xx < W - U(10)) & (yy > U(10)) & (yy < H - U(6))
LAND |= islets
LAND = ndi.binary_opening(LAND, iterations=1)
lab, nl = ndi.label(LAND)
sizes = ndi.sum(np.ones_like(lab), lab, range(1, nl + 1))
LAND = np.isin(lab, np.where(sizes >= 20)[0] + 1)

LBLw = warp(LBL0, fbm(10, 4, 111) * U(9), fbm(10, 4, 112) * U(9), cv2.INTER_NEAREST)
for k_ in (7, 8): LBLw[(LBL0 == k_)] = k_; LBLw[(LBL0 != k_) & (LBLw == k_)] = 0
_, (iy, ix) = ndi.distance_transform_edt(LBLw == 0, return_indices=True)
LBL = np.where(LAND, LBLw[iy, ix], 0).astype(np.uint8)
LBL[LAND & (band > 0.5) & (LBL0 == 0) & (LBL != 8)] = 7
dl = edt(LAND); do = edt(~LAND)
log(f'land {LAND.mean():.3f}  islands {nl}')

# ───────── 2. sub-zones ─────────
zn = fbm(14, 5, 120)
def soft(m, s=U(2.5)): return blur(m.astype(np.float32), s)
TP = (LBL >= 2) & (LBL <= 4)
ge = np.sqrt(((xx - U(645)) / U(68)) ** 2 + ((yy - U(266)) / U(50)) ** 2)
grey = soft(warp(ge, fbm(10, 4, 121) * U(9), fbm(10, 4, 122) * U(9)) + zn * 0.07 < 1, U(1.6)) * (LBL == 5)
mw_ = warp(M['maw'].astype(np.float32), fbm(7, 4, 126) * U(13), fbm(7, 4, 127) * U(13))
bm = blur(mw_, U(5))
maw = sstep(0.38, 0.56, bm + fbm(20, 5, 123) * 0.38 * sstep(0.02, 0.4, bm)) * (LBL == 5)
maw = blur(maw, 1.2)
east_sea = ~LAND & (xx > U(436)) & (xx < U(492)) & (yy > U(230)) & (yy < U(490))
bone = soft((edt(~east_sea) < U(22) + zn * U(6)) & TP & (yy > U(244)), U(2.5))
SOL = (298, 428)
rsol = np.hypot(xx - U(SOL[0]), yy - U(SOL[1])) + zn * U(3)
sol_basin = sstep(U(15), U(9), rsol) * (LBL == 4)
cinder = soft(fbm(9, 4, 125) > 0.25, U(5)) * (LBL == 6)

# ───────── 3. height ─────────
log('height')
Dm = ridged(44, 6, 131, Hexp=0.95)
Dm = warp(Dm, fbm(10, 3, 136) * U(3), fbm(10, 3, 137) * U(3))
Dh = ridged(40, 6, 135, Hexp=1.1)
hills = fbm(7, 6, 132) * 0.5 + 0.5
inland = 1 - np.exp(-dl / U(30))

ranges = [  # (polyline, half-width units, strength)
 ([(54,126),(80,98),(112,76),(150,64),(192,72),(226,100)], 22, 1.00),
 ([(66,46),(102,30),(150,24),(198,40)], 12, 0.8),
 ([(212,208),(246,186),(292,174),(338,172),(380,182),(416,206),(430,236)], 13, 1.0),
 ([(224,240),(236,286),(228,336),(236,388),(228,438)], 6, 0.42),
 ([(400,296),(412,352),(414,408),(406,452)], 7, 0.45),
 ([(152,236),(142,300),(146,382)], 8, 0.35),
 ([(528,184),(568,158),(620,148),(676,154),(728,184)], 15, 1.0),
 ([(760,226),(768,288),(748,344)], 13, 0.9),
 ([(498,198),(492,250),(504,296)], 8, 0.8),
 ([(610,398),(666,396),(716,374)], 10, 0.65),
]
mt = np.zeros((H, W), np.float32)
for j, (poly, wid, st) in enumerate(ranges):
    d = line_dist([catmull(poly, 10)])
    wd = wid * 1.5
    d = warp(d, fbm(10, 3, 140 + j) * U(wd * 0.4), fbm(10, 3, 160 + j) * U(wd * 0.4))
    var = np.clip(0.8 + 0.3 * vnoise(5, 180 + j), 0.45, 1.15)
    mt = np.maximum(mt, st * var * np.exp(-(d / U(wd)) ** 2))
ring = np.exp(-((rsol - U(20)) / U(8)) ** 2) * (LBL == 4) * sstep(-0.9, 0.2, fbm(12, 3, 139))
mt = np.maximum(mt, 0.42 * ring)
mt *= sstep(0, U(6), dl)
reg_rough = {1: 0.07, 2: 0.06, 3: 0.12, 4: 0.08, 5: 0.24, 6: 0.24, 7: 0.15, 8: 0.0}
rough = np.zeros((H, W), np.float32)
for k, v in reg_rough.items(): rough += v * blur((LBL == k).astype(np.float32), U(4))
rough *= (1 - 0.95 * grey)
h = inland * 0.10 + hills * 0.08 * inland + rough * Dh * 0.36 * sstep(0, U(4), dl)
h += mt * 0.08 + mt * Dm * 0.6
VOLC = [(694,486,15,1.0),(724,478,12,0.85),(752,506,11,0.7),(708,524,9,0.55),(668,500,8,0.45)]
cone = np.zeros((H, W), np.float32); crater = np.zeros((H, W), np.float32)
for cx, cy, r, st in VOLC:
    rr = np.hypot(xx - U(cx), yy - U(cy)) / U(r)
    cone = np.maximum(cone, st * np.clip(1 - rr, 0, 1) ** 1.5)
    crater = np.maximum(crater, st * np.exp(-(rr / 0.17) ** 2))
avent = np.zeros((H, W), np.float32)
isle_pk = np.zeros((H, W), np.float32)
for cx, cy, rx, ry in ISLES:
    rr = np.hypot((xx - U(cx)) / U(rx), (yy - U(cy)) / U(ry))
    isle_pk = np.maximum(isle_pk, 0.25 * sstep(1.1, 0.1, rr))
h += cone * (0.45 + 0.4 * Dm) - crater * 0.3 + isle_pk * (0.2 + 0.9 * Dh)
grey_h = blur(grey, U(7))
h = h * (1 - 0.85 * grey_h) + grey_h * (0.05 + 0.02 * Dh)
dorm_w = soft(LBL == 2, U(3))
h += dorm_w * np.clip(vnoise(320, 134), -2, 2) * 0.006
h -= sstep(U(17), U(8), rsol) * (LBL == 4) * 0.03
# Redwake: wind-cut dunes
dune_w = blur((LBL == 8).astype(np.float32), U(1.5))
dcoord = (xx * np.cos(0.5) + yy * np.sin(0.5)) / U(2.4) + fbm(18, 4, 231) * 2.6
ripple = (0.5 + 0.5 * np.sin(dcoord)) ** 3
h = h * (1 - 0.75 * dune_w) + dune_w * (ripple * 0.022 + 0.03 * sstep(0, U(5), dl))
h = blur(np.where(LAND, h, 0).astype(np.float32), 0.6)

# ───────── 4. rivers ─────────
log('rivers')
gy_, gx_ = np.gradient(blur(h, U(5)))
dgy, dgx = np.gradient(blur(dl, 2))
def trace(src, max_steps=2200, seed=0, meander=0.32, w_down=0.6, w_coast=0.7, step=1.4):
    r = np.random.default_rng(seed)
    x, y = U(src[0]), U(src[1]); pts = [(x, y)]; ph = r.uniform(0, 6.28); vx = vy = 0.0
    for _ in range(max_steps):
        ixx, iyy = int(np.clip(x, 0, W - 1)), int(np.clip(y, 0, H - 1))
        if not LAND[iyy, ixx]: break
        a = np.array([-gx_[iyy, ixx], -gy_[iyy, ixx]]); a /= np.linalg.norm(a) + 1e-9
        b = np.array([-dgx[iyy, ixx], -dgy[iyy, ixx]]); b /= np.linalg.norm(b) + 1e-9
        d = a * w_down + b * w_coast; d /= np.linalg.norm(d) + 1e-9
        ph += r.normal(0.08, 0.05)
        d = d + np.array([-d[1], d[0]]) * np.sin(ph) * meander; d /= np.linalg.norm(d) + 1e-9
        vx, vy = 0.7 * vx + 0.3 * d[0], 0.7 * vy + 0.3 * d[1]
        n = np.hypot(vx, vy) + 1e-9
        x += vx / n * step; y += vy / n * step; pts.append((x, y))
    return np.array(pts)

ECHO = [(304,176),(298,200),(286,230),(272,262),(260,296),(251,330),(247,356),(251,374),(264,367),(280,368),(291,383),(287,401),(273,417),(266,442),(268,470),(271,508)]
echo_px = catmull(ECHO, 14) * S
river_src = [
 ((262,190),2.6,1),((360,180),2.8,2),((398,194),2.2,3),((322,186),2.0,4),
 ((230,252),2.6,5),((226,332),2.4,6),((236,302),1.8,7),((234,412),2.0,8),
 ((178,236),2.4,9),((160,304),2.4,10),((152,402),2.0,11),((202,214),1.8,12),
 ((410,334),1.8,13),((404,424),1.6,14),((352,300),2.0,15),((334,468),1.4,16),((380,400),1.8,17),
 ((90,96),2.0,20),((150,66),2.2,21),((196,76),2.0,22),((122,118),1.8,23),((64,62),1.6,24),((210,120),1.8,25),
]
rivers = []
for src, wmax, sd in river_src:
    p = trace(src, seed=sd)
    if len(p) > 20: rivers.append((p, wmax))
lava = []
VENTS_E = [(694,486,[2.0,2.8,1.1]),(724,478,[0.4,1.3]),(752,506,[1.0,1.9]),(708,524,[1.6]),(668,500,[2.4,1.7])]
rr_ = np.random.default_rng(300)
def flow(p0, ang, n, w0, depth=0):
    p = [np.array(p0, np.float64)]; a_ = ang; da = 0.0
    for s_ in range(n):
        q = p[-1]; iq = (int(np.clip(q[1], 0, H - 1)), int(np.clip(q[0], 0, W - 1)))
        if not LAND[iq] or dl[iq] < 2: break
        g = np.array([-gx_[iq], -gy_[iq]]); ga = np.arctan2(g[1], g[0]) if np.linalg.norm(g) > 1e-6 else a_
        diff = (ga - a_ + np.pi) % (2 * np.pi) - np.pi
        da = 0.8 * da + rr_.normal(0, 0.05) + 0.06 * diff
        a_ += da
        p.append(q + np.array([np.cos(a_), np.sin(a_)]) * 1.2)
        if depth < 2 and s_ > 8 and rr_.random() < 0.035:
            flow(p[-1], a_ + rr_.choice([-1, 1]) * rr_.uniform(0.4, 0.8), int((n - s_) * 0.6), w0 * 0.55, depth + 1)
    if len(p) > 5: lava.append((np.array(p), w0))
for cx, cy, angs in VENTS_E:
    for a0 in angs:
        r0 = U(2.2)
        flow((U(cx) + np.cos(a0) * r0, U(cy) + np.sin(a0) * r0), a0, int(U(rr_.uniform(20, 34)) / 1.2), rr_.uniform(2.2, 3.0))

SSn = 2
def stroke_mask(paths):
    m = np.zeros((H * SSn, W * SSn), np.float32)
    for p, w0, w1 in paths:
        n = len(p)
        for i in range(n - 1):
            t = i / max(1, n - 1)
            th = max(1, int(round((w0 + (w1 - w0) * t) * SSn)))
            a = tuple(int(v) for v in np.round(p[i] * SSn * 16)); b = tuple(int(v) for v in np.round(p[i + 1] * SSn * 16))
            cv2.line(m, a, b, 1.0, th, cv2.LINE_AA, shift=4)
    return np.clip(cv2.resize(m, (W, H), interpolation=cv2.INTER_AREA), 0, 1)

riv_m = stroke_mask([(p, 0.7, w) for p, w in rivers]) * LAND
echo_m = stroke_mask([(echo_px, 1.0, 2.8)]) * LAND
lava_m = stroke_mask([(p, w, w * 0.35) for p, w in lava]) * (LBL == 6)
lava_field = blur(lava_m, U(3)) * 0.8
frz_riv = riv_m * (LBL == 1); riv_m = riv_m * (LBL != 1)
h -= (riv_m + echo_m) * 0.006

# ───────── 5. light ─────────
log('light')
Z = 120.0
hs_ = h - 0.72 * blur(h, U(9))
dzy, dzx = np.gradient(hs_ * Z)
nn = np.sqrt(dzx ** 2 + dzy ** 2 + 1)
lam = np.clip((-dzx * LIGHT[0] - dzy * LIGHT[1] + LIGHT[2]) / nn, 0, 1)
rel = lam / LIGHT[2]
slope = np.sqrt(dzx ** 2 + dzy ** 2)
cav = h - blur(h, U(2.5))
slope_big = np.hypot(*np.gradient(h * 85))
shadow = np.zeros_like(h)

# ───────── 6. colour ─────────
log('colour')
e = np.clip(h / 0.95, 0, 1)
tex = fbm(150, 3, 140) * 0.5 + fbm(40, 3, 141) * 0.5
RAMPS = {
 1: [(0,(196,212,226)),(0.15,(212,224,236)),(0.45,(228,236,246)),(0.75,(240,245,251)),(1,(252,253,255))],
 2: [(0,(54,80,48)),(0.05,(28,60,34)),(0.3,(24,52,30)),(0.55,(32,60,38)),(0.8,(68,80,64)),(1,(126,128,118))],
 3: [(0,(150,146,108)),(0.05,(62,96,58)),(0.25,(70,100,60)),(0.45,(90,102,74)),(0.62,(108,106,96)),(0.8,(150,150,148)),(0.92,(224,230,238)),(1,(246,248,252))],
 4: [(0,(170,160,116)),(0.05,(84,120,56)),(0.25,(96,130,60)),(0.42,(116,132,72)),(0.6,(128,122,96)),(0.8,(156,150,142)),(1,(220,220,216))],
 5: [(0,(66,60,56)),(0.15,(52,48,46)),(0.4,(42,39,39)),(0.7,(34,31,32)),(1,(70,66,66))],
 6: [(0,(70,52,42)),(0.2,(52,38,32)),(0.5,(40,30,27)),(0.8,(30,24,23)),(1,(56,44,40))],
 7: [(0,(210,198,148)),(0.04,(150,156,104)),(0.1,(70,132,74)),(0.5,(48,110,62)),(0.8,(84,108,74)),(1,(126,128,112))],
 8: [(0,(132,80,52)),(1,(120,72,50))],
}
NR = 9
wk = np.zeros((NR, H, W), np.float32)
for k in range(1, NR): wk[k] = blur((LBL == k).astype(np.float32), U(2.0))
ws = wk[1:].sum(0) + 1e-6
for k in range(1, NR): wk[k] /= ws
col = np.zeros((H, W, 3), np.float32)
for k in range(1, NR): col += ramp(e, RAMPS[k]) * wk[k][..., None]
col *= (1 + tex * 0.045)[..., None]
ROCK = {1: (104,116,132), 2: (62,74,58), 3: (110,108,98), 4: (126,116,96), 5: (30,28,29), 6: (40,30,28), 7: (104,102,86), 8: (150,104,88)}
rock_c = np.zeros((H, W, 3), np.float32)
for k in range(1, NR): rock_c += np.array(ROCK[k], np.float32) * wk[k][..., None]
rocky = sstep(0.6, 1.8, blur(slope_big, 1.0)) * (1 - 0.4 * wk[2])
col = col * (1 - rocky[..., None] * 0.7) + rock_c * rocky[..., None] * 0.7
beach = sstep(U(1.4), U(0.4), dl) * (wk[3] + wk[4] + wk[7] + 0.5 * wk[2]) * LAND
col = mix(col, beach * 0.55, (186, 172, 128))
# Redwake sand shifts colour with the Sopher around it
hue = sstep(-1.2, 1.2, fbm(5, 4, 230))
hue2 = sstep(-1.0, 1.4, fbm(9, 3, 232))
sand = np.array([98, 54, 68], np.float32) * (1 - hue)[..., None] + np.array([134, 84, 44], np.float32) * hue[..., None]
sand = sand * (1 - 0.45 * hue2[..., None]) + np.array([128, 54, 32], np.float32) * 0.45 * hue2[..., None]
sand = sand * (0.9 + 0.18 * ripple[..., None])
col = col * (1 - wk[8][..., None]) + sand * wk[8][..., None]

canopy = fbm(200, 2, 142)
crowns = sstep(-0.1, 0.9, perlin(300, 148) + perlin(150, 149) * 0.6)
col = mix(col, wk[2] * np.clip(canopy * 0.12, 0, 0.25), (14, 30, 18))
forest = sstep(0.25, 0.95, fbm(22, 5, 143)) * sstep(0.5, 0.28, e) * (wk[3] + wk[4]) * (1 - sol_basin)
col = mix(col, forest * (0.35 + 0.35 * crowns), (36, 66, 34))
col = mix(col, wk[2] * (1 - crowns) * 0.35, (12, 28, 16))
fields = sstep(0.3, 0.9, fbm(18, 4, 146)) * sstep(0.32, 0.15, e) * wk[4] * (1 - forest)
col = mix(col, fields * 0.25, (150, 150, 86))
col = mix(col, sol_basin * 0.6, (150, 138, 96))
bone_t = sstep(0.6, 1.8, canopy)
col = mix(col, bone * (0.25 + 0.5 * crowns), (176, 170, 156))
col = mix(col, bone * (1 - crowns) * 0.5, (70, 60, 56))
col = mix(col, bone * sstep(1.8, 2.6, canopy) * 0.8, (150, 30, 28))
ash = sstep(-0.1, 0.7, fbm(12, 5, 144)) * wk[5] * sstep(0.4, 0.15, e) * (1 - grey)
col = mix(col, ash * 0.45, (104, 96, 88))
col = mix(col, cinder * 0.55 * sstep(0.5, 0.2, e), (102, 94, 88))
dust = 1 + 0.06 * fbm(40, 3, 145, stretch=(0.3, 1.5))
col = mix(col, grey * 0.94, (104, 102, 98))
col[...] = col * (1 + (grey * (dust - 1))[..., None])
gcr = np.exp(-(np.abs(perlin(90, 151) + perlin(45, 152) * 0.5) / 0.05) ** 2) * grey
col = mix(col, gcr * 0.35, (70, 68, 66))
patch = 0.55 + 0.35 * sstep(-0.8, 0.8, fbm(22, 4, 149))
col = mix(col, maw * patch, (86, 30, 24))
veins = np.exp(-(np.abs(fbm(24, 5, 147)) / 0.035) ** 2) * maw
col = mix(col, veins * 0.75, (150, 26, 22))

fro = wk[1]
sh = np.clip((0.32 + 0.68 * np.clip(rel, 0, 1.6)) * (1 + cav * 1.7), 0.28, 1.7)
col = mix(col, sstep(0.42, 0.56, e) * (wk[3] + 0.5 * wk[4]) * (1 - 0.4 * rocky) * 0.9, (236, 240, 246))
lit = col * sh[..., None]
snowy = np.clip(fro * (1 - 0.6 * rocky) + sstep(0.42, 0.56, e) * (wk[3] + 0.5 * wk[4]) * (1 - 0.4 * rocky), 0, 1)
dark = np.clip(1 - sh, 0, 1)
lit = mix(lit, snowy * dark * 0.55, (96, 128, 176))
lit = np.where(snowy[..., None] > 0.5, np.minimum(lit, 255) * 0.97 + 4, lit)

# rivers
lit = mix(lit, riv_m * 0.9, (54, 104, 134))
lit = mix(lit, frz_riv * 0.75, (150, 204, 232))
lit = mix(lit, echo_m * 0.9, (74, 150, 184))
lit += blur(echo_m, U(1.8))[..., None] * np.array([20, 80, 120]) * 0.6

# ───────── 7. ocean ─────────
log('ocean')
dn = fbm(4, 6, 150)
t_shelf = np.exp(-do / U(7)); t_mid = np.exp(-do / U(34))
oc = np.array([5, 12, 26], np.float32) * (1 + 0.2 * dn[..., None])
oc = mix(oc, t_mid, (10, 25, 46))
oc = mix(oc, t_shelf * 0.75, (20, 52, 74))
lagoon = band * np.exp(-do / U(9))
oc = mix(oc, lagoon * 0.5, (24, 90, 104))
oc *= (1 + fbm(55, 3, 151, stretch=(0.3, 1.8)) * 0.07 + fbm(200, 2, 152) * 0.03)[..., None]
oc += (np.exp(-(do / 1.5) ** 2) * 0.35)[..., None] * np.array([110, 150, 170])
oc += (np.exp(-((do - U(3.2)) / 1.3) ** 2) * 0.05)[..., None] * np.array([120, 170, 200])

fro_d = edt(~(LBL == 1))
iz = sstep(U(30), U(3), fro_d)
floes = sstep(0.6, 0.78, fbm(48, 4, 153) * 0.5 + iz * 0.95 - 0.25) * iz * (~LAND)
oc = mix(oc, floes * 0.92, (196, 214, 228))

fade = sstep(U(172), U(206), yy) * sstep(U(504), U(470), yy)
cx_s = U(463) + U(3.2) * np.sin(yy / U(21)) + fbm(14, 4, 160) * U(2.6)
dx = np.abs(xx - cx_s)
tint = np.exp(-(dx / U(17)) ** 2) * fade
oc = mix(oc, tint * 0.88, (32, 7, 9))
oc *= (1 + 0.25 * fbm(30, 3, 164) * tint)[..., None]
fiss = np.exp(-(dx / U(0.9)) ** 2) * fade * (0.65 + 0.35 * sstep(-0.6, 1, fbm(40, 3, 161)))
crk = np.exp(-(np.abs(fbm(30, 4, 162)) / 0.045) ** 2) * np.exp(-(dx / U(9)) ** 2) * fade
scar_l = np.clip(fiss + crk * 0.55, 0, 1.2) * (1 - blur(LAND.astype(np.float32), 1.5))

st_r = np.hypot(xx - U(858), yy - U(185))
st_z = np.exp(-(st_r / U(64)) ** 2)
oc = mix(oc, st_z * 0.5, (20, 10, 40))
wells = np.zeros((H, W), np.float32); r_ = np.random.default_rng(170)
for _ in range(16):
    a, rr = r_.uniform(0, 6.28), r_.uniform(30, 66)
    px, py = U(858) + np.cos(a) * U(rr), U(185) + np.sin(a) * U(rr) * 0.8
    wells += np.exp(-((xx - px) ** 2 + (yy - py) ** 2) / (2 * U(1.3) ** 2)) * r_.uniform(0.4, 1)
oc += blur(wells * (~LAND), 1.2)[..., None] * np.array([80, 210, 200]) * 0.7

img = np.where(LAND[..., None], lit, oc)

# ───────── 8. fire ─────────
log('fire')
volc = wk[5] * (1 - grey) * (1 - 0.7 * maw) * (0.2 + 0.8 * np.clip(mt * 1.3 + cone, 0, 1))
cracks = np.exp(-(np.abs(fbm(30, 5, 180)) / 0.04) ** 2) * sstep(-0.3, 0.7, fbm(7, 3, 181) + 0.3) * volc * 1.3 * sstep(U(1), U(3), dl)
ecr = np.exp(-(np.abs(fbm(60, 4, 182)) / 0.03) ** 2) * wk[6] * sstep(-0.4, 0.5, fbm(9, 3, 183)) * (1 - 0.5 * cinder) * sstep(U(1), U(3), dl)
vents = np.zeros((H, W), np.float32); r_ = np.random.default_rng(191)
vp = np.argwhere((LBL == 6) & (dl > U(3)))
for py, px in vp[r_.choice(len(vp), 40, replace=False)]: vents[py, px] = r_.uniform(0.5, 1)
vents = blur(vents, 1.3) * 9
lava_all = np.clip(cracks * 0.8 + ecr * 0.6 + lava_m + crater * 1.6 * (LBL == 6) + vents, 0, 1.5)
img = mix(img, np.clip(lava_field, 0, 1) * 0.5, (40, 22, 18))
lv = np.clip(lava_all, 0, 1)
img = mix(img, lv * 0.85, (255, 116, 36))
img += (blur(lava_all, U(1.4)) * 0.8 + blur(lava_all, U(4.5)) * 0.8)[..., None] * np.array([200, 64, 20])
img += np.clip(lava_all - 0.6, 0, 1)[..., None] * np.array([90, 90, 60])
img = mix(img, np.clip(scar_l, 0, 1) * 0.9, (255, 92, 60))
img += (blur(scar_l, U(1.2)) * 0.7 + blur(scar_l, U(5)) * 0.9)[..., None] * np.array([190, 30, 20])
sfog = sstep(0.3, 1.5, fbm(9, 5, 163)) * np.exp(-(dx / U(22)) ** 2) * fade
img = mix(img, sfog * 0.35, (96, 30, 30))
mfog = sstep(0.9, 2.0, fbm(10, 5, 184)) * blur(maw, U(4)) * 0.22
img = mix(img, mfog, (124, 44, 38))
r_ = np.random.default_rng(190)
bio = np.zeros((H, W), np.float32)
pts = np.argwhere((LBL == 2) & (dl > U(5)))
for py, px in pts[r_.choice(len(pts), 170, replace=False)]: bio[py, px] = r_.uniform(0.4, 1.0)
img += blur(bio, 0.9)[..., None] * np.array([90, 255, 200]) * 1.4
img += blur(bio, 3.2)[..., None] * np.array([40, 160, 120]) * 2.2

# internal Terra Primus borders, faint and dashed
bd = np.zeros((H, W), bool)
for dy_, dx_ in ((0, 1), (1, 0), (1, 1)):
    b2 = np.roll(np.roll(LBL, dy_, 0), dx_, 1)
    bd |= (LBL != b2) & np.isin(LBL, [2, 3, 4]) & np.isin(b2, [2, 3, 4])
bd = ndi.binary_dilation(bd, iterations=1) & (dl > U(3))
dash = sstep(-0.2, 0.2, np.sin((xx + yy) / 5.5))
bdl = blur(bd.astype(np.float32), 0.7) * dash
img = mix(img, np.clip(bdl, 0, 1) * 0.28, (236, 226, 196))

# ───────── 9. Skyspire shadow, clouds, grade ─────────
log('sky')
skym = poly_mask(shp['sky']).astype(np.float32)
sky_sh = blur(np.roll(np.roll(skym, U(30), 0), U(15), 1), U(7))
img *= (1 - 0.4 * sky_sh)[..., None]

lum = img.mean(-1, keepdims=True)
img = img * 0.92 + lum * 0.08
img = img * np.array([0.96, 0.98, 1.03])
rv = np.hypot((xx - W / 2) / (W / 2), (yy - H / 2) / (H / 2))
img *= (1 - 0.4 * sstep(0.6, 1.45, rv))[..., None]
img += (vnoise(W // 2, 220) * 2.0)[..., None]
BANKS = [(0,0,90,52),(960,0,150,95),(0,560,120,64),(960,560,120,70),(600,0,90,30)]
reach = np.zeros((H, W), np.float32)
for bx, by, rx, ry in BANKS:
    reach = np.maximum(reach, np.exp(-(((xx - U(bx)) / U(rx)) ** 2 + ((yy - U(by)) / U(ry)) ** 2)))
cl_n = fbm(7, 7, 210, pers=0.55)
billow = 1 - np.abs(fbm(16, 5, 213)) * 0.5
open_sea = sstep(U(14), U(40), do)
cl = sstep(0.3, 0.62, reach * 1.05 + (cl_n * 0.2 + billow * 0.1 - 0.05) * np.maximum(open_sea, reach))
cl = np.clip(cl * (0.75 + 0.25 * billow), 0, 1)
cl_sh = blur(np.roll(np.roll(cl, U(7), 0), U(5), 1), U(3))
img *= (1 - 0.35 * cl_sh)[..., None]
cz = blur(cl, 2.0)
vol = np.clip((cz - np.roll(np.roll(cz, -4, 0), -4, 1)) * 4, -1, 1)
cc = np.array([214, 222, 236], np.float32)[None, None, :] * (0.8 + 0.22 * vol[..., None]) * (0.92 + 0.08 * billow[..., None])
ca = (cl * 0.9)[..., None]
img = img * (1 - ca) + ca * cc

img = np.clip(img, 0, 255).astype(np.uint8)
Image.fromarray(img).save(f'{OUT}/verallus-relief.webp', quality=84, method=6)
Image.fromarray(img).save(f'{OUT}/preview.png')
log('saved base')

# ───────── 10. traced outlines ─────────
def trace_paths(mask, min_area=80, eps=1.0):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        a = cv2.approxPolyDP(c, eps, True)[:, 0, :] / S
        out.append('M' + 'L'.join(f'{x:g},{y:g}' for x, y in np.round(a, 1)) + 'Z')
    return ''.join(out)
regions = {'frozen': LBL == 1, 'dormose': LBL == 2, 'feyvey': LBL == 3, 'regalus': LBL == 4,
           'ashen': LBL == 5, 'emberfell': LBL == 6, 'oceanus': LBL == 7, 'redwake': LBL == 8,
           'scar': (tint > 0.35) & ~LAND & (xx > U(436)) & (xx < U(492))}
shapes = {k: trace_paths(v) for k, v in regions.items()}
shapes['echo'] = 'M' + 'L'.join(f'{x:g},{y:g}' for x, y in np.round(echo_px[::3] / S, 1))
json.dump(shapes, open(f'{OUT}/shapes.json', 'w'))
print({k: len(v) for k, v in shapes.items()})
log('done')
