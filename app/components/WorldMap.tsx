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
          <svg viewBox="0 0 960 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
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
            <image href={MAP_IMG.relief} x="0" y="0" width="960" height="560" preserveAspectRatio="none" />

            {/* ── FROZEN WASTES ── */}
            <Region id="frozen" label="Frozen Wastes" color="#7ecef4" hl={MAP_SHAPES.frozen} open={setActive}>
              <path className="wm-hit" d="M 42,148 C 25,122 15,88 28,55 C 40,25 72,8 118,6 C 162,4 205,20 232,50 C 255,75 258,108 242,138 C 225,165 192,175 155,172 C 118,170 72,162 42,148 Z" />
              <text className="wm-label" x="138" y="152" fill="rgba(186,230,253,0.95)" fontSize="7.5" letterSpacing="1.5" textAnchor="middle">FROZEN WASTES</text>
            </Region>

            {/* ── TERRA PRIMUS: DORMOSE ── */}
            <Region id="dormose" label="Dormose" color="#4ade80" hl={MAP_SHAPES.dormose} open={setActive}>
              <path className="wm-hit" d="M 148,188 C 130,228 122,292 126,360 C 130,425 150,468 178,482 C 196,492 215,486 218,468 C 222,450 215,420 218,385 C 221,350 224,308 220,270 C 215,234 205,208 186,198 Z" />
              <text className="wm-label" x="180" y="345" fill="rgba(134,239,172,0.92)" fontSize="6.5" letterSpacing="1" textAnchor="middle" transform="rotate(-90 180 345)">DORMOSE</text>
            </Region>

            {/* ── TERRA PRIMUS: FEYVEY ── */}
            <Region id="feyvey" label="FeyVey Territories" color="#a78bfa" hl={MAP_SHAPES.feyvey} open={setActive}>
              <path className="wm-hit" d="M 186,198 C 205,208 215,234 220,270 C 232,260 260,246 292,240 C 324,234 360,237 392,252 C 416,262 432,280 436,302 C 442,275 444,248 442,220 C 438,192 422,170 394,158 C 362,146 322,142 282,145 C 242,148 210,168 186,198 Z" />
              <text className="wm-label" x="308" y="210" fill="rgba(196,181,253,0.95)" fontSize="7" letterSpacing="1.5" textAnchor="middle">FEYVEY TERRITORIES</text>
            </Region>

            {/* ── TERRA PRIMUS: REGALUS ── */}
            <Region id="regalus" label="Regalus Heartlands" color="#fbbf24" hl={MAP_SHAPES.regalus} open={setActive}>
              <path className="wm-hit" d="M 220,270 C 224,308 221,350 218,385 C 215,420 222,450 218,468 C 228,482 252,496 284,504 C 316,512 352,510 382,500 C 412,490 434,468 440,444 C 446,420 442,392 438,364 C 434,336 432,315 436,302 C 432,280 416,262 392,252 C 360,237 324,234 292,240 C 260,246 232,260 220,270 Z" />
              <text className="wm-label" x="310" y="415" fill="rgba(253,224,71,0.92)" fontSize="7" letterSpacing="1.5" textAnchor="middle">REGALUS HEARTLANDS</text>
            </Region>

            <text className="wm-label" x="195" y="168" fill="rgba(226,232,240,0.55)" fontSize="7.5" letterSpacing="2">TERRA PRIMUS</text>

            {/* ── ABYSSAL SCAR ── */}
            <Region id="scar" label="Abyssal Scar" color="#ef4444" hl={MAP_SHAPES.scar} open={setActive}>
              <rect className="wm-hit" x="445" y="188" width="37" height="295" />
              <rect x="457" y="196" width="12" height="278" rx="6" fill="rgba(239,68,68,0.32)" filter="url(#softGlow)" style={{ animation: 'scarPulse 2.5s ease-in-out infinite' }} />
              <text className="wm-label" x="474" y="342" fill="rgba(252,165,165,0.9)" fontSize="6.5" letterSpacing="1.5" textAnchor="middle" writingMode="tb">ABYSSAL SCAR</text>
            </Region>

            {/* ── ASHEN DOMINION ── */}
            <Region id="ashen" label="Ashen Dominion" color="#dc2626" hl={MAP_SHAPES.ashen} open={setActive}>
              <path className="wm-hit" d="M 525,178 C 538,150 572,128 620,130 C 668,132 718,158 750,195 C 778,228 784,268 775,305 C 765,340 743,368 715,385 C 688,402 658,410 628,412 L 620,452 C 608,472 588,484 562,486 C 536,488 512,474 498,452 C 484,430 480,402 482,374 C 484,346 498,325 512,308 C 498,290 488,268 484,244 C 480,220 484,198 494,182 C 504,168 518,178 525,178 Z" />
              <text className="wm-label" x="645" y="268" fill="rgba(209,213,219,0.85)" fontSize="6" letterSpacing="1" textAnchor="middle">GREY EXPANSE</text>
              <text className="wm-label" x="645" y="278" fill="rgba(156,163,175,0.75)" fontSize="5" letterSpacing="0.8" textAnchor="middle">NULL ZONE</text>
              <text className="wm-label" x="538" y="410" fill="rgba(252,165,165,0.85)" fontSize="5.5" letterSpacing="0.8" textAnchor="middle">MAWLANDS</text>
              <text className="wm-label" x="652" y="148" fill="rgba(248,113,113,0.95)" fontSize="8" letterSpacing="2" textAnchor="middle">ASHEN DOMINION</text>
            </Region>

            {/* ── OCEANUS VASTARA ── */}
            <Region id="oceanus" label="Oceanus Vastara" color="#06b6d4" hl={MAP_SHAPES.oceanus} open={setActive}>
              {ISLES.map(([cx, cy, rx, ry], i) => (
                <ellipse key={i} className="wm-hit" cx={cx} cy={cy} rx={rx + 4} ry={ry + 4} />
              ))}
              <circle cx="242" cy="530" r="2.5" fill="#22d3ee" opacity="0.8" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
              <text className="wm-label" x="240" y="521" fill="rgba(103,232,249,0.92)" fontSize="6" letterSpacing="0.8" textAnchor="middle">TIDALUS</text>
              <text className="wm-label" x="350" y="548" fill="rgba(103,232,249,0.8)" fontSize="7" letterSpacing="2" textAnchor="middle">OCEANUS VASTARA</text>
            </Region>

            {/* ── EMBERFELL ── */}
            <Region id="emberfell" label="Emberfell" color="#f97316" hl={MAP_SHAPES.emberfell} open={setActive}>
              <path className="wm-hit" d="M 640,480 C 650,460 675,448 708,448 C 742,448 768,464 778,486 C 788,508 776,532 754,542 C 732,552 702,550 676,540 C 650,530 630,510 640,480 Z" />
              <circle cx="694" cy="486" r="3.2" fill="rgba(255,140,60,0.7)" filter="url(#softGlow)" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} />
              <circle cx="724" cy="478" r="2.6" fill="rgba(255,140,60,0.6)" filter="url(#softGlow)" style={{ animation: 'pulse 2.2s ease-in-out 0.6s infinite' }} />
              <text className="wm-label" x="706" y="522" fill="rgba(253,186,116,0.95)" fontSize="7" letterSpacing="1.5" textAnchor="middle">EMBERFELL</text>
            </Region>

            {/* ── SKYSPIRE ZENITH (floating) ── */}
            <Region id="skyspire" label="Skyspire Zenith" color="#4fc3f7" open={setActive} float>
              <image href={MAP_IMG.skyspire} x={SKY_BOX.x} y={SKY_BOX.y} width={SKY_BOX.w} height={SKY_BOX.h} />
              <path className="wm-hit" d="M 350,70 C 356,52 380,40 408,38 C 438,36 462,50 466,68 C 470,90 456,112 430,122 C 412,128 386,126 368,116 C 350,104 344,88 350,70 Z" />
              <text className="wm-label" x="408" y="146" fill="rgba(125,211,252,0.95)" fontSize="7" letterSpacing="1.5" textAnchor="middle">SKYSPIRE ZENITH</text>
              <text className="wm-label" x="408" y="154" fill="rgba(125,211,252,0.7)" fontSize="5" letterSpacing="1" textAnchor="middle">FLOATING · NEUTRAL</text>
            </Region>

            {/* ── OATHLESS SKY (pocket dimension) ── */}
            <Region id="oathless" label="Oathless Sky" color="#a855f7" open={setActive} float slow>
              <image href={MAP_IMG.storm} x={858 - STORM_R} y={185 - STORM_R} width={STORM_R * 2} height={STORM_R * 2}
                style={{ animation: 'spinRing 140s linear infinite', transformOrigin: '858px 185px' }} />
              <circle className="wm-hit" cx="858" cy="185" r="40" />
              <circle cx="858" cy="185" r="10" fill="rgba(46,16,101,0.55)" stroke="rgba(192,132,252,0.7)" strokeWidth="0.8" />
              <text className="wm-label" x="858" y="189.5" fill="rgba(233,213,255,0.95)" fontSize="11" fontWeight="700" textAnchor="middle">K</text>
              <text className="wm-label" x="858" y="236" fill="rgba(216,180,254,0.92)" fontSize="6" letterSpacing="1.2" textAnchor="middle">OATHLESS SKY</text>
              <text className="wm-label" x="858" y="244" fill="rgba(216,180,254,0.7)" fontSize="5" letterSpacing="0.8" textAnchor="middle">POCKET DIMENSION</text>
            </Region>

            {/* ── RIVER OF ECHOES ── */}
            <path d={MAP_SHAPES.echo} className="wm-echo" />
            <text className="wm-label" x="262" y="408" fill="rgba(165,226,250,0.85)" fontSize="5.5" letterSpacing="0.6" textAnchor="middle">RIVER OF ECHOES</text>
            {/* Astral Threshold */}
            <polygon points="265,348 269,338 273,348" fill="rgba(245,158,11,0.75)" stroke="rgba(4,7,14,0.6)" strokeWidth="0.6" />
            <circle cx="269" cy="338" r="2" fill="rgba(251,191,36,0.95)" style={{ animation: 'pulse 2s ease-in-out infinite' }} />

            {/* ── CITY MARKERS ── */}
            <g filter="url(#cityGlow)" onClick={() => setActive('regalus')} style={{ cursor: 'pointer' }}>
              <circle cx="298" cy="428" r="9" fill="none" stroke="rgba(251,191,36,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 2.8s ease-in-out infinite' }} />
              <circle cx="298" cy="428" r="3.5" fill="#fbbf24" opacity="0.95" style={{ animation: 'cityPulse 2.8s ease-in-out infinite' }} />
            </g>
            <text className="wm-label" x="298" y="446" fill="rgba(253,224,71,0.95)" fontSize="6.5" letterSpacing="1" textAnchor="middle">SOLHAVEN</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('feyvey')} style={{ cursor: 'pointer' }}>
              <circle cx="335" cy="222" r="9" fill="none" stroke="rgba(167,139,250,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 3.2s ease-in-out 0.5s infinite' }} />
              <circle cx="335" cy="222" r="3.5" fill="#c4b5fd" opacity="0.95" style={{ animation: 'cityPulse 3.2s ease-in-out 0.5s infinite' }} />
            </g>
            <text className="wm-label" x="335" y="240" fill="rgba(221,214,254,0.95)" fontSize="6.5" letterSpacing="1" textAnchor="middle">ILLUMIS</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('dormose')} style={{ cursor: 'pointer' }}>
              <circle cx="170" cy="372" r="3.5" fill="#86efac" opacity="0.92" style={{ animation: 'cityPulse 3.5s ease-in-out 1s infinite' }} />
            </g>
            <text className="wm-label" x="188" y="376" fill="rgba(134,239,172,0.92)" fontSize="6" letterSpacing="0.8">ROOTHOLD</text>
            <g filter="url(#cityGlow)" onClick={() => setActive('ashen')} style={{ cursor: 'pointer' }}>
              <circle cx="648" cy="322" r="9" fill="none" stroke="rgba(248,113,113,0.35)" strokeWidth="0.8" style={{ animation: 'ringPulse 3s ease-in-out 0.3s infinite' }} />
              <circle cx="648" cy="322" r="3.5" fill="#f87171" opacity="0.92" style={{ animation: 'cityPulse 3s ease-in-out 0.3s infinite' }} />
            </g>
            <text className="wm-label" x="648" y="340" fill="rgba(252,165,165,0.95)" fontSize="6.5" letterSpacing="1" textAnchor="middle">HOLLOWSPIRE</text>

            {/* Compass */}
            <g transform="translate(878,490)">
              <circle r="22" fill="rgba(5,8,16,0.72)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8" />
              <path d="M 0,-16 L 0,-8 M 0,8 L 0,16 M -16,0 L -8,0 M 8,0 L 16,0" stroke="rgba(245,158,11,0.45)" strokeWidth="0.8" />
              <polygon points="0,-18 -3,-10 3,-10" fill="rgba(245,158,11,0.75)" />
              <text className="wm-label" y="30" fill="rgba(245,158,11,0.7)" fontSize="7" letterSpacing="1" textAnchor="middle">N</text>
            </g>

            {/* Scale */}
            <g transform="translate(50,518)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
              <text className="wm-label" x="30" y="-7" fill="rgba(245,158,11,0.75)" fontSize="5.5" letterSpacing="0.8" textAnchor="middle">~2,000 KM</text>
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