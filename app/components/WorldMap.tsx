'use client'
import { useState, type ReactNode } from 'react'
import { REGIONS } from '../data/regions'
import { MAP_IMG, MAP_SHAPES, SKY_BOX, STORM_R } from '../data/mapShapes'
import SpoilerText, { SpoilerToggle } from './Spoiler'

type RegionKey = keyof typeof REGIONS

// Oceanus Vastara's charted isles (cx, cy, rx, ry), the same ones the painting traces.
const ISLES: [number, number, number, number][] = [
  [180, 522, 22, 11], [242, 530, 18, 9], [298, 520, 14, 8], [348, 534, 10, 6],
  [395, 524, 8, 5], [458, 536, 6, 4], [515, 525, 10, 6], [565, 534, 8, 5],
]

function Region({ id, label, color, hl, open, float, slow, children }: {
  id: RegionKey; label: string; color: string; hl?: string
  open: (k: RegionKey) => void; float?: boolean; slow?: boolean; children: ReactNode
}) {
  return (
    <g
      className="wm-region"
      role="button"
      tabIndex={0}
      aria-label={`${label}. Open its archive.`}
      onClick={() => open(id)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(id) } }}
      style={{ ['--hl' as string]: color, ...(float ? { animation: `floatUp ${slow ? 5.5 : 4}s ease-in-out ${slow ? 0.8 : 0}s infinite` } : {}) }}
    >
      {hl && <path d={hl} className="wm-hl" />}
      {children}
    </g>
  )
}

export default function WorldMap() {
  const [active, setActive] = useState<RegionKey | null>(null)

  const R = active ? REGIONS[active] : null

  return (
    <section id="world" style={{ padding: '80px 0 60px', background: 'linear-gradient(180deg,#050810 0%,#060a14 50%,#050810 100%)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 28px' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: 'Cinzel, serif' }}>GEOGRAPHY</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>THE WORLD</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 460, margin: '0 auto', lineHeight: 1.82 }}>
          Seven continents shape the politics, bloodlines, and wounds of Verallus. Click any region to open its archive.
        </p>
        <div style={{ marginTop: 20 }}><SpoilerToggle /></div>
      </div>

      {/* Map Container */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          position: 'relative', borderRadius: 10, overflow: 'hidden',
          border: '1px solid rgba(79,195,247,0.12)',
          background: '#030710',
          boxShadow: '0 0 80px rgba(79,195,247,0.06)',
        }}>
          {/* Corner accents */}
          {['tl','tr','bl','br'].map(c => (
            <div key={c} style={{
              position: 'absolute', width: 18, height: 18, zIndex: 5,
              top: c.includes('t') ? 10 : 'auto', bottom: c.includes('b') ? 10 : 'auto',
              left: c.includes('l') ? 10 : 'auto', right: c.includes('r') ? 10 : 'auto',
              borderTop: c.includes('t') ? '1px solid rgba(245,158,11,0.5)' : 'none',
              borderBottom: c.includes('b') ? '1px solid rgba(245,158,11,0.5)' : 'none',
              borderLeft: c.includes('l') ? '1px solid rgba(245,158,11,0.5)' : 'none',
              borderRight: c.includes('r') ? '1px solid rgba(245,158,11,0.5)' : 'none',
            }} />
          ))}

          <div className="wm-scroll">
          <svg viewBox="-60 -70 1120 654" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="cityGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* Painted relief: terrain, ocean, ice, lava and cloud */}
            <image href={MAP_IMG.relief} x="-60" y="-70" width="1120" height="654" preserveAspectRatio="none" />

            {/* ── FROZEN WASTES ── */}
            <Region id="frozen" label="Frozen Wastes" color="#7ecef4" hl={MAP_SHAPES.frozen} open={setActive}>
              <path className="wm-hit" d="M 42,148 C 25,122 15,88 28,55 C 40,25 72,4 118,-2 C 170,-10 240,-18 310,-18 C 380,-18 440,-12 490,0 C 526,10 546,30 544,52 C 542,74 520,90 486,98 C 444,104 400,94 356,94 C 314,94 280,98 258,110 C 238,122 222,152 192,166 C 156,176 118,170 72,162 C 58,159 48,154 42,148 Z" />
              <text className="wm-label" x="300" y="56" fill="rgba(186,230,253,0.95)" fontSize="8.6" letterSpacing="1.5" textAnchor="middle">FROZEN WASTES</text>
            </Region>

            {/* ── TERRA PRIMUS: DORMOSE ── */}
            <Region id="dormose" label="Dormose" color="#4ade80" hl={MAP_SHAPES.dormose} open={setActive}>
              <path className="wm-hit" d="M 148,188 C 130,228 122,292 126,360 C 130,425 150,468 178,482 C 196,492 215,486 218,468 C 224.6,477.2 237.1,486.3 254,493.8 C 254,493.8 248,478 244,466 C 236,442 240,416 237,388 C 234,360 236,334 238,312 C 228,302 218,288 212,270 C 207,236 200,210 186,198 Z" />
              <text className="wm-label" x="180" y="345" fill="rgba(134,239,172,0.92)" fontSize="7.5" letterSpacing="1" textAnchor="middle" transform="rotate(-90 180 345)">DORMOSE</text>
            </Region>

            {/* ── TERRA PRIMUS: FEYVEY ── */}
            <Region id="feyvey" label="FeyVey Territories" color="#a78bfa" hl={MAP_SHAPES.feyvey} open={setActive}>
              <path className="wm-hit" d="M 186,198 C 200,210 207,236 212,270 C 218,288 228,302 238,312 C 262,318 300,322 332,326 C 362,330 386,342 400,354 C 394,326 393,288 402,266 C 410,246 432,236 442,220 C 438,192 422,170 394,158 C 362,146 322,142 282,145 C 242,148 210,168 186,198 Z" />
              <text className="wm-label" x="308" y="210" fill="rgba(196,181,253,0.95)" fontSize="8" letterSpacing="1.5" textAnchor="middle">FEYVEY TERRITORIES</text>
            </Region>

            {/* ── TERRA PRIMUS: REGALUS ── */}
            <Region id="regalus" label="Regalus Heartlands" color="#fbbf24" hl={MAP_SHAPES.regalus} open={setActive}>
              <path className="wm-hit" d="M 238,312 C 236,334 234,360 237,388 C 240,416 236,442 244,466 C 248,478 254,493.8 254,493.8 C 262.9,497.8 273,501.2 284,504 C 316,512 352,510 382,500 C 412,490 434,468 440,444 C 448,426 446,412 434,406 C 414,398 400,378 400,354 C 386,342 362,330 332,326 C 300,322 262,318 238,312 Z" />
              <text className="wm-label" x="310" y="415" fill="rgba(253,224,71,0.92)" fontSize="8" letterSpacing="1.5" textAnchor="middle">REGALUS HEARTLANDS</text>
            </Region>

            <text className="wm-label" x="195" y="168" fill="rgba(226,232,240,0.55)" fontSize="8.6" letterSpacing="2">TERRA PRIMUS</text>

            {/* ── ABYSSAL SCAR ── */}
            <Region id="scar" label="Abyssal Scar" color="#ef4444" hl={MAP_SHAPES.scar} open={setActive}>
              <path className="wm-hit" d="M 454.6,188 L 456.4,203 L 459.6,218 L 464.7,233 L 472.1,248 L 481.6,263 L 492.2,278 L 502.2,293 L 509.7,308 L 513.0,323 L 511.1,338 L 504.6,353 L 495.0,368 L 484.4,383 L 474.5,398 L 466.5,413 L 460.8,428 L 457.1,443 L 455.0,458 L 453.9,473 L 453.5,483 L 485.5,483 L 485.9,473 L 487.0,458 L 489.1,443 L 492.8,428 L 498.5,413 L 506.5,398 L 516.4,383 L 527.0,368 L 536.6,353 L 543.1,338 L 545.0,323 L 541.7,308 L 534.2,293 L 524.2,278 L 513.6,263 L 504.1,248 L 496.7,233 L 491.6,218 L 488.4,203 L 486.6,188 Z" />
              <path d="M 472.7,198 L 474.7,210 L 477.8,222 L 482.1,234 L 488.0,246 L 495.2,258 L 503.5,270 L 512.0,282 L 519.8,294 L 526.0,306 L 529.4,318 L 529.7,330 L 526.7,342 L 521.0,354 L 513.4,366 L 504.9,378 L 496.6,390 L 489.1,402 L 483.0,414 L 478.4,426 L 475.1,438 L 472.9,450 L 471.6,462 L 470.8,474 L 470.8,474" fill="none" stroke="rgba(239,68,68,0.32)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlow)" style={{ animation: 'scarPulse 2.5s ease-in-out infinite' }} />
              <text className="wm-label" x="479" y="432" fill="rgba(252,165,165,0.9)" fontSize="7.5" letterSpacing="1.5" textAnchor="middle" writingMode="tb">ABYSSAL SCAR</text>
            </Region>

            {/* ── ASHEN DOMINION ── */}
            <Region id="ashen" label="Ashen Dominion" color="#dc2626" hl={MAP_SHAPES.ashen} open={setActive}>
              <path className="wm-hit" d="M 565,178 C 578,150 612,128 660,130 C 708,132 758,158 790,195 C 818,228 824,268 815,305 C 805,340 783,368 755,385 C 728,402 698,410 668,412 L 660,452 C 648,472 628,484 602,486 C 576,488 552,474 538,452 C 524,430 520,402 526,382 C 534,362 558,350 564,328 C 570,306 560,286 546,268 C 534,254 526,236 526,214 C 527,198 536,176 565,178 Z" />
              <text className="wm-label" x="685" y="268" fill="rgba(209,213,219,0.85)" fontSize="6.9" letterSpacing="1" textAnchor="middle">GREY EXPANSE</text>
              <text className="wm-label" x="685" y="278" fill="rgba(156,163,175,0.75)" fontSize="5.8" letterSpacing="0.8" textAnchor="middle">NULL ZONE</text>
              <text className="wm-label" x="578" y="410" fill="rgba(252,165,165,0.85)" fontSize="6.3" letterSpacing="0.8" textAnchor="middle">MAWLANDS</text>
              <text className="wm-label" x="692" y="148" fill="rgba(248,113,113,0.95)" fontSize="9.2" letterSpacing="2" textAnchor="middle">ASHEN DOMINION</text>
            </Region>

            {/* ── OCEANUS VASTARA ── */}
            <Region id="oceanus" label="Oceanus Vastara" color="#06b6d4" hl={MAP_SHAPES.oceanus} open={setActive}>
              {ISLES.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} className="wm-hit" cx={cx} cy={cy} rx={rx + 4} ry={ry + 4} />
              ))}
              <circle cx="242" cy="530" r="2.5" fill="#22d3ee" opacity="0.8" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
              <text className="wm-label" x="240" y="521" fill="rgba(103,232,249,0.92)" fontSize="6.9" letterSpacing="0.8" textAnchor="middle">TIDALUS</text>
              <text className="wm-label" x="350" y="548" fill="rgba(103,232,249,0.8)" fontSize="8" letterSpacing="2" textAnchor="middle">OCEANUS VASTARA</text>
            </Region>

            {/* ── REDWAKE DUNES ── */}
            <Region id="redwake" label="Redwake Dunes" color="#fb7185" hl={MAP_SHAPES.redwake} open={setActive}>
              <path className="wm-hit" d="M 436,489 C 448,480 469.5,481 488.6,488 C 510.1,495 531.7,498 555.6,498 C 579.5,498 598.6,494 620.2,495 C 639.3,496 656,497 663.2,503 C 668,509 658.4,515 644.1,517 C 627.3,520 613,522 596.2,519 C 574.7,515 550.8,515 526.9,513 C 505.4,512 476.7,510 455.1,504 C 440.8,500 431.2,495 436,489 Z" />
              <text className="wm-label" x="551" y="507" fill="rgba(253,164,175,0.92)" fontSize="6.3" letterSpacing="1" textAnchor="middle">REDWAKE DUNES</text>
            </Region>

            {/* ── EMBERFELL ── */}
            <Region id="emberfell" label="Emberfell" color="#f97316" hl={MAP_SHAPES.emberfell} open={setActive}>
              <path className="wm-hit" d="M 680,480 C 690,460 715,448 748,448 C 782,448 808,464 818,486 C 828,508 816,532 794,542 C 772,552 742,550 716,540 C 690,530 670,510 680,480 Z" />
              <circle cx="734" cy="486" r="3.2" fill="rgba(255,140,60,0.7)" filter="url(#softGlow)" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} />
              <circle cx="764" cy="478" r="2.6" fill="rgba(255,140,60,0.6)" filter="url(#softGlow)" style={{ animation: 'pulse 2.2s ease-in-out 0.6s infinite' }} />
              <text className="wm-label" x="746" y="522" fill="rgba(253,186,116,0.95)" fontSize="8" letterSpacing="1.5" textAnchor="middle">EMBERFELL</text>
            </Region>

            {/* ── SKYSPIRE ZENITH: Primeridia floats over Pratvia, its own island ── */}
            <Region id="skyspire" label="Skyspire Zenith" color="#4fc3f7" hl={MAP_SHAPES.pratvia} open={setActive}>
              <path className="wm-hit" d="M 444,264 C 462,258 482,264 490,280 C 500,300 500,330 496,350 C 492,372 480,388 462,390 C 444,392 430,382 426,364 C 420,342 420,310 424,290 C 428,274 434,266 444,264 Z" />
              <text className="wm-label" x="462" y="383" fill="rgba(240,171,252,0.9)" fontSize="5.8" letterSpacing="1" textAnchor="middle">PRATVIA</text>
              <g style={{ animation: 'floatUp 4s ease-in-out infinite' }}>
                <image href={MAP_IMG.skyspire} x={SKY_BOX.x} y={SKY_BOX.y} width={SKY_BOX.w} height={SKY_BOX.h} />
                <path className="wm-hit" d="M 416.5,298.5 C 421.0,285.0 439.0,276.0 460.0,274.5 C 482.5,273.0 500.5,283.5 503.5,297.0 C 506.5,313.5 496.0,330.0 476.5,337.5 C 463.0,342.0 443.5,340.5 430.0,333.0 C 416.5,324.0 412.0,312.0 416.5,298.5 Z" />
                <text className="wm-label" x="460" y="248" fill="rgba(125,211,252,0.95)" fontSize="7.5" letterSpacing="1.4" textAnchor="middle">SKYSPIRE ZENITH</text>
                <text className="wm-label" x="460" y="255.5" fill="rgba(125,211,252,0.72)" fontSize="5.3" letterSpacing="1" textAnchor="middle">PRIMERIDIA · NEUTRAL</text>
              </g>
            </Region>

            {/* ── OATHLESS SKY (pocket dimension) ── */}
            <Region id="oathless" label="Oathless Sky" color="#a855f7" open={setActive} float slow>
              <image href={MAP_IMG.storm} x={898 - STORM_R} y={185 - STORM_R} width={STORM_R * 2} height={STORM_R * 2}
                style={{ animation: 'spinRing 140s linear infinite', transformOrigin: '898px 185px' }} />
              <circle className="wm-hit" cx="898" cy="185" r="40" />
              <circle cx="898" cy="185" r="10" fill="rgba(46,16,101,0.55)" stroke="rgba(192,132,252,0.7)" strokeWidth="0.8" />
              <text className="wm-label" x="898" y="189.5" fill="rgba(233,213,255,0.95)" fontSize="12.6" fontWeight="700" textAnchor="middle">K</text>
              <text className="wm-label" x="898" y="236" fill="rgba(216,180,254,0.92)" fontSize="6.9" letterSpacing="1.2" textAnchor="middle">OATHLESS SKY</text>
              <text className="wm-label" x="898" y="244" fill="rgba(216,180,254,0.7)" fontSize="5.8" letterSpacing="0.8" textAnchor="middle">POCKET DIMENSION</text>
            </Region>

            {/* ── RIVER OF ECHOES ── */}
            <path d={MAP_SHAPES.echo} className="wm-echo" />
            <text className="wm-label" x="262" y="408" fill="rgba(165,226,250,0.85)" fontSize="6.3" letterSpacing="0.6" textAnchor="middle">RIVER OF ECHOES</text>
            {/* Astral Threshold */}
            <polygon points="265,348 269,338 273,348" fill="rgba(245,158,11,0.75)" stroke="rgba(4,7,14,0.6)" strokeWidth="0.6" />
            <circle cx="269" cy="338" r="2" fill="rgba(251,191,36,0.95)" style={{ animation: 'pulse 2s ease-in-out infinite' }} />

            {/* ── CITY MARKERS ── */}
            <g filter="url(#cityGlow)" onClick={() => setActive('regalus')} style={{ cursor: 'pointer' }}>
              <circle cx="298" cy="428" r="9" fill="none" stroke="rgba(251,191,36,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 2.8s ease-in-out infinite' }} />
              <circle cx="298" cy="428" r="3.5" fill="#fbbf24" opacity="0.95" style={{ animation: 'cityPulse 2.8s ease-in-out infinite' }} />
            </g>
            <text className="wm-label" x="298" y="446" fill="rgba(253,224,71,0.95)" fontSize="7.5" letterSpacing="1" textAnchor="middle">SOLHAVEN</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('feyvey')} style={{ cursor: 'pointer' }}>
              <circle cx="335" cy="222" r="9" fill="none" stroke="rgba(167,139,250,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 3.2s ease-in-out 0.5s infinite' }} />
              <circle cx="335" cy="222" r="3.5" fill="#c4b5fd" opacity="0.95" style={{ animation: 'cityPulse 3.2s ease-in-out 0.5s infinite' }} />
            </g>
            <text className="wm-label" x="335" y="240" fill="rgba(221,214,254,0.95)" fontSize="7.5" letterSpacing="1" textAnchor="middle">ILLUMIS</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('dormose')} style={{ cursor: 'pointer' }}>
              <circle cx="170" cy="372" r="3.5" fill="#86efac" opacity="0.92" style={{ animation: 'cityPulse 3.5s ease-in-out 1s infinite' }} />
            </g>
            <text className="wm-label" x="188" y="376" fill="rgba(134,239,172,0.92)" fontSize="6.9" letterSpacing="0.8">ROOTHOLD</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('ashen')} style={{ cursor: 'pointer' }}>
              <circle cx="688" cy="322" r="9" fill="none" stroke="rgba(248,113,113,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 3s ease-in-out 0.3s infinite' }} />
              <circle cx="688" cy="322" r="3.5" fill="#f87171" opacity="0.92" style={{ animation: 'cityPulse 3s ease-in-out 0.3s infinite' }} />
            </g>
            <text className="wm-label" x="688" y="340" fill="rgba(252,165,165,0.95)" fontSize="7.5" letterSpacing="1" textAnchor="middle">HOLLOWSPIRE</text>

            {/* Compass */}
            <g transform="translate(978,514)">
              <circle r="22" fill="rgba(5,8,16,0.72)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8" />
              <path d="M 0,-16 L 0,-8 M 0,8 L 0,16 M -16,0 L -8,0 M 8,0 L 16,0" stroke="rgba(245,158,11,0.45)" strokeWidth="0.8" />
              <polygon points="0,-18 -3,-10 3,-10" fill="rgba(245,158,11,0.75)" />
              <text className="wm-label" y="30" fill="rgba(245,158,11,0.7)" fontSize="8" letterSpacing="1" textAnchor="middle">N</text>
            </g>

            {/* Scale */}
            <g transform="translate(-10,544)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <text className="wm-label" x="30" y="-7" fill="rgba(245,158,11,0.75)" fontSize="6.3" letterSpacing="0.8" textAnchor="middle">~2,000 KM</text>
            </g>
          </svg>
          </div>
          <div className="wm-swipe">SWIPE TO EXPLORE · TAP A NAME TO OPEN IT</div>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,8,16,0.9)' }}>
            {([
              { key: 'frozen', label: 'FROZEN WASTES', color: '#7ecef4' },
              { key: 'dormose', label: 'DORMOSE', color: '#4ade80' },
              { key: 'feyvey', label: 'FEYVEY TERRITORIES', color: '#a78bfa' },
              { key: 'regalus', label: 'REGALUS HEARTLANDS', color: '#fbbf24' },
              { key: 'ashen', label: 'ASHEN DOMINION', color: '#dc2626' },
              { key: 'scar', label: 'ABYSSAL SCAR', color: '#ef4444' },
              { key: 'oceanus', label: 'OCEANUS VASTARA', color: '#06b6d4' },
              { key: 'skyspire', label: 'SKYSPIRE ZENITH ↑', color: '#4fc3f7' },
              { key: 'emberfell', label: 'EMBERFELL', color: '#f97316' },
              { key: 'redwake', label: 'REDWAKE DUNES', color: '#fb7185' },
              { key: 'oathless', label: 'OATHLESS SKY ⊕', color: '#a855f7' },
            ] as { key: RegionKey; label: string; color: string }[]).map(l => (
              <button key={l.key} type="button" className="wm-legend" onClick={() => setActive(l.key)}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, opacity: 0.65, flexShrink: 0 }} />
                <span style={{ fontSize: 8.5, letterSpacing: '0.2em', fontFamily: 'Cinzel, serif' }}>{l.label}</span>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '10px', fontSize: 7.5, letterSpacing: '0.35em', color: '#334155', fontFamily: 'Cinzel, serif' }}>
            VERALLUS · KNOWN WORLD SURVEY · INTERCONTINENTAL PEACE COUNCIL CARTOGRAPHY DIVISION
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.3em', color: '#334155', fontFamily: 'Cinzel, serif' }}>CLICK ANY REGION TO OPEN ITS ARCHIVE</span>
        </div>
      </div>

      {/* ── DETAIL PANEL OVERLAY ── */}
      {active && R && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', animation: 'overlayFade 0.2s ease' }}
          onClick={e => { if (e.target === e.currentTarget) setActive(null) }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,5,12,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setActive(null)} />
          <div style={{
            position: 'relative', zIndex: 10, width: 'min(400px, 95vw)', height: '100vh',
            background: 'linear-gradient(135deg,rgba(8,12,24,0.98) 0%,rgba(5,8,16,0.98) 100%)',
            borderLeft: '1px solid rgba(79,195,247,0.15)', overflowY: 'auto',
            animation: 'panelSlide 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Panel Header */}
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(8,12,24,0.98)', backdropFilter: 'blur(10px)', zIndex: 2 }}>
              <button onClick={() => setActive(null)} style={{
                position: 'absolute', top: 22, right: 22, width: 32, height: 32,
                borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
              }}>✕</button>
              <div style={{ fontSize: 8, letterSpacing: '0.38em', marginBottom: 8, fontFamily: 'Cinzel, serif', color: R.color }}>{R.eye}</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'Cinzel, serif', color: R.color, lineHeight: 1.2 }}>{R.name}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#64748b', fontFamily: 'Cinzel, serif' }}>{R.sub}</div>
              <div style={{ marginTop: 10 }}>
                <span style={{ fontSize: 8, letterSpacing: '0.22em', padding: '4px 10px', borderRadius: 3, background: `rgba(${R.rgb},0.1)`, border: `1px solid rgba(${R.rgb},0.25)`, color: R.color, fontFamily: 'Cinzel, serif' }}>{R.status}</span>
              </div>
            </div>

            {/* Panel Body */}
            <div key={active} style={{ padding: '22px 28px 40px' }}>
              {/* Overview */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>OVERVIEW</div>
                <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.82 }}><SpoilerText text={R.desc} /></p>
              </div>

              {/* Stats */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>AT A GLANCE</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {R.stats.map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: R.color }}>{s.v}</div>
                      <div style={{ fontSize: 9, letterSpacing: '0.18em', color: '#475569', fontFamily: 'Cinzel, serif' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>KEY LOCATIONS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {R.locations.map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.c, flexShrink: 0, marginTop: 4 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2, color: l.c }}>{l.n}</div>
                        <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}><SpoilerText text={l.d} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              {R.warn && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>DANGER</div>
                  <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: 'rgba(127,29,29,0.12)', border: '1px solid rgba(127,29,29,0.3)', borderRadius: 6 }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>⚠</span>
                    <div style={{ fontSize: 12, color: '#fca5a5', lineHeight: 1.6 }}><SpoilerText text={R.warn.text} /></div>
                  </div>
                </div>
              )}

              {/* Arah connection */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ARAH&apos;S CONNECTION</div>
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.18)', borderRadius: 6 }}>
                  <span style={{ color: '#4fc3f7', flexShrink: 0 }}>◈</span>
                  <div style={{ fontSize: 12, color: '#7dd3fc', lineHeight: 1.6 }}><SpoilerText text={R.arah} /></div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {R.tags.map((t, i) => (
                  <span key={i} style={{ fontSize: 9, letterSpacing: '0.18em', padding: '4px 10px', borderRadius: 3, background: `rgba(${R.rgb},0.08)`, border: `1px solid rgba(${R.rgb},0.22)`, color: R.color, fontFamily: 'Cinzel, serif' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}