'use client'
import { useState } from 'react'
import { REGIONS } from '../data/regions'
import SpoilerText, { SpoilerToggle } from './Spoiler'

type RegionKey = keyof typeof REGIONS

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

          <svg viewBox="0 0 960 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
            <defs>
              <radialGradient id="ocean" cx="45%" cy="55%" r="65%">
                <stop offset="0%" stopColor="#040c1c" />
                <stop offset="100%" stopColor="#020709" />
              </radialGradient>
              <pattern id="oceanGrid" x="0" y="0" width="32" height="28" patternUnits="userSpaceOnUse">
                <path d="M 32,0 L 16,14 L 32,28 M 0,0 L 16,14 L 0,28" fill="none" stroke="rgba(79,195,247,0.04)" strokeWidth="0.5" />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="cityGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="scarGlow">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Ocean */}
            <rect width="960" height="560" fill="url(#ocean)" />
            <rect width="960" height="560" fill="url(#oceanGrid)" />
            <ellipse cx="480" cy="280" rx="400" ry="250" fill="rgba(79,195,247,0.018)" />

            {/* ── FROZEN WASTES ── */}
            <g onClick={() => setActive('frozen')} style={{ cursor: 'pointer' }}>
              <path
                d="M 42,148 C 25,122 15,88 28,55 C 40,25 72,8 118,6 C 162,4 205,20 232,50 C 255,75 258,108 242,138 C 225,165 192,175 155,172 C 118,170 72,162 42,148 Z"
                fill="rgba(126,206,244,0.12)" stroke="#7ecef4" strokeWidth="1.2" strokeOpacity="0.5"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(126,206,244,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(126,206,244,0.12)')}
              />
              {/* Ice texture */}
              <path d="M 65,80 L 95,58 M 108,52 L 135,68 M 148,48 L 172,72 M 185,58 L 205,82" stroke="rgba(200,240,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 48,118 L 82,105 M 95,100 L 132,94 M 145,92 L 185,100" stroke="rgba(200,240,255,0.15)" strokeWidth="0.7" strokeLinecap="round" />
              <text x="138" y="152" fill="rgba(126,206,244,0.65)" fontFamily="Cinzel, serif" fontSize="7.5" letterSpacing="1.5" textAnchor="middle">FROZEN WASTES</text>
            </g>

            {/* ── TERRA PRIMUS — DORMOSE ── */}
            <g onClick={() => setActive('dormose')} style={{ cursor: 'pointer' }}>
              <path
                d="M 148,188 C 130,228 122,292 126,360 C 130,425 150,468 178,482 C 196,492 215,486 218,468 C 222,450 215,420 218,385 C 221,350 224,308 220,270 C 215,234 205,208 186,198 Z"
                fill="rgba(74,222,128,0.12)" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.42"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(74,222,128,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(74,222,128,0.12)')}
              />
              <path d="M 165,255 L 165,285 M 158,268 L 172,268 M 165,300 L 165,328 M 158,312 L 172,312 M 165,342 L 165,368 M 158,354 L 172,354" stroke="rgba(74,222,128,0.2)" strokeWidth="0.9" strokeLinecap="round" />
              <text x="180" y="345" fill="rgba(74,222,128,0.55)" fontFamily="Cinzel, serif" fontSize="6.5" letterSpacing="1" textAnchor="middle" transform="rotate(-90 180 345)">DORMOSE</text>
            </g>

            {/* ── TERRA PRIMUS — FEYVEY ── */}
            <g onClick={() => setActive('feyvey')} style={{ cursor: 'pointer' }}>
              <path
                d="M 186,198 C 205,208 215,234 220,270 C 232,260 260,246 292,240 C 324,234 360,237 392,252 C 416,262 432,280 436,302 C 442,275 444,248 442,220 C 438,192 422,170 394,158 C 362,146 322,142 282,145 C 242,148 210,168 186,198 Z"
                fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.42"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(167,139,250,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(167,139,250,0.12)')}
              />
              <path d="M 265,178 L 280,198 M 295,170 L 310,195 M 335,168 L 350,192 M 368,178 L 385,205" stroke="rgba(167,139,250,0.15)" strokeWidth="0.8" strokeLinecap="round" />
              <text x="308" y="210" fill="rgba(167,139,250,0.6)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="1.5" textAnchor="middle">FEYVEY TERRITORIES</text>
            </g>

            {/* ── TERRA PRIMUS — REGALUS ── */}
            <g onClick={() => setActive('regalus')} style={{ cursor: 'pointer' }}>
              <path
                d="M 220,270 C 224,308 221,350 218,385 C 215,420 222,450 218,468 C 228,482 252,496 284,504 C 316,512 352,510 382,500 C 412,490 434,468 440,444 C 446,420 442,392 438,364 C 434,336 432,315 436,302 C 432,280 416,262 392,252 C 360,237 324,234 292,240 C 260,246 232,260 220,270 Z"
                fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.42"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(251,191,36,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(251,191,36,0.12)')}
              />
              {/* Regalus spiral hint */}
              <path d="M 295,375 C 305,365 320,363 330,375 C 340,387 335,403 323,407" stroke="rgba(251,191,36,0.2)" strokeWidth="1" fill="none" />
              <text x="310" y="415" fill="rgba(251,191,36,0.6)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="1.5" textAnchor="middle">REGALUS HEARTLANDS</text>
            </g>

            {/* Internal Terra Primus borders */}
            <path d="M 220,270 C 260,246 292,240 324,234 C 360,237 392,252 436,302" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" strokeDasharray="4 5" />
            <path d="M 218,188 L 222,270" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 6" />
            <text x="195" y="168" fill="rgba(255,255,255,0.12)" fontFamily="Cinzel, serif" fontSize="7.5" letterSpacing="2">TERRA PRIMUS</text>

            {/* ── ABYSSAL SCAR ── */}
            <g onClick={() => setActive('scar')} style={{ cursor: 'pointer' }}>
              <rect x="445" y="188" width="60" height="295" rx="4" fill="rgba(127,29,29,0.15)" style={{ animation: 'corruptFog 4s ease-in-out infinite' }} />
              <rect x="455" y="200" width="40" height="272" rx="2" fill="rgba(185,28,28,0.12)" style={{ animation: 'corruptFog 3.5s ease-in-out 0.8s infinite' }} />
              <rect x="472" y="192" width="4" height="284" rx="2" fill="rgba(220,38,38,0.38)" style={{ animation: 'scarPulse 2.5s ease-in-out infinite' }} filter="url(#scarGlow)" />
              {[225, 278, 330, 382, 432].map((y, i) => (
                <path key={i} d={`M 452,${y} C 462,${y + 15} 472,${y} 482,${y + 15}`} stroke="rgba(220,38,38,0.22)" strokeWidth="1" fill="none" />
              ))}
              <text x="474" y="342" fill="rgba(239,68,68,0.7)" fontFamily="Cinzel, serif" fontSize="6.5" letterSpacing="1.5" textAnchor="middle" writingMode="tb">ABYSSAL SCAR</text>
            </g>

            {/* ── ASHEN DOMINION ── */}
            <g onClick={() => setActive('ashen')} style={{ cursor: 'pointer' }}>
              <path
                d="M 525,178 C 538,150 572,128 620,130 C 668,132 718,158 750,195 C 778,228 784,268 775,305 C 765,340 743,368 715,385 C 688,402 658,410 628,412 L 620,452 C 608,472 588,484 562,486 C 536,488 512,474 498,452 C 484,430 480,402 482,374 C 484,346 498,325 512,308 C 498,290 488,268 484,244 C 480,220 484,198 494,182 C 504,168 518,178 525,178 Z"
                fill="rgba(220,38,38,0.1)" stroke="#dc2626" strokeWidth="1.2" strokeOpacity="0.42"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(220,38,38,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(220,38,38,0.1)')}
              />
              {/* Grey Expanse overlay */}
              <ellipse cx="645" cy="272" rx="75" ry="60" fill="rgba(107,114,128,0.18)" stroke="rgba(107,114,128,0.32)" strokeWidth="0.8" strokeDasharray="3 3" />
              <text x="645" y="268" fill="rgba(156,163,175,0.6)" fontFamily="Cinzel, serif" fontSize="6" letterSpacing="1" textAnchor="middle">GREY EXPANSE</text>
              <text x="645" y="278" fill="rgba(107,114,128,0.5)" fontFamily="Cinzel, serif" fontSize="5" letterSpacing="0.8" textAnchor="middle">NULL ZONE</text>
              {/* Mawlands */}
              <path d="M 482,374 C 495,358 518,348 542,355 C 566,362 585,380 590,402 C 595,422 585,444 566,454 C 547,464 522,460 506,444 C 490,428 480,402 482,374 Z"
                fill="rgba(127,29,29,0.28)" stroke="rgba(220,38,38,0.38)" strokeWidth="0.8" strokeDasharray="2 3" />
              <text x="538" y="410" fill="rgba(252,165,165,0.5)" fontFamily="Cinzel, serif" fontSize="5.5" letterSpacing="0.8" textAnchor="middle">MAWLANDS</text>
              <text x="652" y="148" fill="rgba(220,38,38,0.65)" fontFamily="Cinzel, serif" fontSize="8" letterSpacing="2" textAnchor="middle">ASHEN DOMINION</text>
            </g>

            {/* ── OCEANUS VASTARA (islands) ── */}
            <g onClick={() => setActive('oceanus')} style={{ cursor: 'pointer' }}>
              {[
                { cx: 180, cy: 522, rx: 22, ry: 11 },
                { cx: 242, cy: 530, rx: 18, ry: 9 },
                { cx: 298, cy: 520, rx: 14, ry: 8 },
                { cx: 348, cy: 534, rx: 10, ry: 6 },
                { cx: 395, cy: 524, rx: 8, ry: 5 },
                { cx: 458, cy: 536, rx: 6, ry: 4 },
                { cx: 515, cy: 525, rx: 10, ry: 6 },
                { cx: 565, cy: 534, rx: 8, ry: 5 },
              ].map((island, i) => (
                <ellipse key={i} cx={island.cx} cy={island.cy} rx={island.rx} ry={island.ry}
                  fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.38" />
              ))}
              <circle cx="242" cy="530" r="2.5" fill="#06b6d4" opacity="0.75" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
              <text x="240" y="521" fill="rgba(6,182,212,0.55)" fontFamily="Cinzel, serif" fontSize="6" letterSpacing="0.8" textAnchor="middle">TIDALUS</text>
              <text x="350" y="548" fill="rgba(6,182,212,0.42)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="2" textAnchor="middle">OCEANUS VASTARA</text>
            </g>

            {/* ── SKYSPIRE ZENITH (floating) ── */}
            <g onClick={() => setActive('skyspire')} style={{ cursor: 'pointer', animation: 'floatUp 4s ease-in-out infinite' }}>
              <ellipse cx="408" cy="115" rx="62" ry="8" fill="rgba(79,195,247,0.06)" />
              <path d="M 355,75 C 360,58 380,46 408,44 C 436,42 458,54 462,70 C 466,84 454,98 432,103 C 415,108 390,107 372,100 C 355,93 348,88 355,75 Z"
                fill="rgba(79,195,247,0.15)" stroke="#4fc3f7" strokeWidth="1.2" strokeOpacity="0.58" filter="url(#glow)" />
              <path d="M 390,74 L 390,48 M 408,70 L 408,36 M 426,74 L 426,50" stroke="rgba(79,195,247,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              <polygon points="390,48 387,58 393,58" fill="rgba(79,195,247,0.65)" />
              <polygon points="408,36 405,48 411,48" fill="rgba(79,195,247,0.75)" />
              <polygon points="426,50 423,60 429,60" fill="rgba(79,195,247,0.58)" />
              <text x="408" y="128" fill="rgba(79,195,247,0.65)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="1.5" textAnchor="middle">SKYSPIRE ZENITH</text>
              <text x="408" y="137" fill="rgba(79,195,247,0.38)" fontFamily="Cinzel, serif" fontSize="5" letterSpacing="1" textAnchor="middle">FLOATING · NEUTRAL</text>
            </g>

            {/* ── EMBERFELL ── */}
            <g onClick={() => setActive('emberfell')} style={{ cursor: 'pointer' }}>
              <path d="M 640,480 C 650,460 675,448 708,448 C 742,448 768,464 778,486 C 788,508 776,532 754,542 C 732,552 702,550 676,540 C 650,530 630,510 640,480 Z"
                fill="rgba(249,115,22,0.15)" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.48"
                style={{ transition: 'fill 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.fill = 'rgba(249,115,22,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.fill = 'rgba(249,115,22,0.15)')}
              />
              <path d="M 688,482 L 675,455 M 712,478 L 702,450 M 728,485 L 722,462" stroke="rgba(249,115,22,0.38)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="698" cy="492" r="3" fill="rgba(251,146,60,0.55)" style={{ animation: 'pulse 1.8s ease-in-out infinite' }} />
              <circle cx="720" cy="487" r="2" fill="rgba(251,146,60,0.4)" style={{ animation: 'pulse 2.2s ease-in-out 0.6s infinite' }} />
              <text x="706" y="522" fill="rgba(249,115,22,0.62)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="1.5" textAnchor="middle">EMBERFELL</text>
            </g>

            {/* ── OATHLESS SKY (pocket dimension) ── */}
            <g onClick={() => setActive('oathless')} style={{ cursor: 'pointer', animation: 'floatUp 5.5s ease-in-out 0.8s infinite' }}>
              <circle cx="858" cy="185" r="32" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.35)" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="858" cy="185" r="22" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.25)" strokeWidth="0.8" strokeDasharray="2 5" style={{ animation: 'spinRing 8s linear infinite', transformOrigin: '858px 185px' }} />
              <circle cx="858" cy="185" r="12" fill="rgba(124,58,237,0.2)" stroke="rgba(168,85,247,0.55)" strokeWidth="1" />
              <text x="858" y="190" fill="rgba(168,85,247,0.75)" fontFamily="Cinzel, serif" fontSize="11" fontWeight="700" textAnchor="middle">K</text>
              <text x="858" y="228" fill="rgba(124,58,237,0.55)" fontFamily="Cinzel, serif" fontSize="6" letterSpacing="1.2" textAnchor="middle">OATHLESS SKY</text>
              <text x="858" y="237" fill="rgba(124,58,237,0.38)" fontFamily="Cinzel, serif" fontSize="5" letterSpacing="0.8" textAnchor="middle">POCKET DIMENSION</text>
            </g>

            {/* ── CITY MARKERS ── */}
            {/* Solhaven */}
            <g filter="url(#cityGlow)" onClick={() => setActive('regalus')} style={{ cursor: 'pointer' }}>
              <circle cx="298" cy="428" r="9" fill="none" stroke="rgba(251,191,36,0.22)" strokeWidth="0.8" style={{ animation: 'ringPulse 2.8s ease-in-out infinite' }} />
              <circle cx="298" cy="428" r="3.5" fill="#fbbf24" opacity="0.88" style={{ animation: 'cityPulse 2.8s ease-in-out infinite' }} />
              <text x="298" y="446" fill="rgba(251,191,36,0.75)" fontFamily="Cinzel, serif" fontSize="6.5" letterSpacing="1" textAnchor="middle">SOLHAVEN</text>
            </g>
            {/* Illumis */}
            <g filter="url(#cityGlow)" onClick={() => setActive('feyvey')} style={{ cursor: 'pointer' }}>
              <circle cx="335" cy="222" r="9" fill="none" stroke="rgba(167,139,250,0.22)" strokeWidth="0.8" style={{ animation: 'ringPulse 3.2s ease-in-out 0.5s infinite' }} />
              <circle cx="335" cy="222" r="3.5" fill="#a78bfa" opacity="0.88" style={{ animation: 'cityPulse 3.2s ease-in-out 0.5s infinite' }} />
              <text x="335" y="240" fill="rgba(167,139,250,0.75)" fontFamily="Cinzel, serif" fontSize="6.5" letterSpacing="1" textAnchor="middle">ILLUMIS</text>
            </g>
            {/* Roothold */}
            <g filter="url(#cityGlow)" onClick={() => setActive('dormose')} style={{ cursor: 'pointer' }}>
              <circle cx="170" cy="372" r="3.5" fill="#4ade80" opacity="0.82" style={{ animation: 'cityPulse 3.5s ease-in-out 1s infinite' }} />
              <text x="188" y="376" fill="rgba(74,222,128,0.65)" fontFamily="Cinzel, serif" fontSize="6" letterSpacing="0.8">ROOTHOLD</text>
            </g>
            {/* Hollowspire */}
            <g filter="url(#cityGlow)" onClick={() => setActive('ashen')} style={{ cursor: 'pointer' }}>
              <circle cx="648" cy="322" r="9" fill="none" stroke="rgba(220,38,38,0.2)" strokeWidth="0.8" style={{ animation: 'ringPulse 3s ease-in-out 0.3s infinite' }} />
              <circle cx="648" cy="322" r="3.5" fill="#dc2626" opacity="0.82" style={{ animation: 'cityPulse 3s ease-in-out 0.3s infinite' }} />
              <text x="648" y="340" fill="rgba(220,38,38,0.72)" fontFamily="Cinzel, serif" fontSize="6.5" letterSpacing="1" textAnchor="middle">HOLLOWSPIRE</text>
            </g>

            {/* ── SACRED SITES ── */}
            {/* River of Echoes */}
            <path d="M 248,378 C 258,368 272,362 285,370 C 295,376 298,388 290,396" stroke="rgba(79,195,247,0.45)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <text x="262" y="408" fill="rgba(79,195,247,0.42)" fontFamily="Cinzel, serif" fontSize="5.5" letterSpacing="0.6" textAnchor="middle">RIVER OF ECHOES</text>
            {/* Astral Threshold */}
            <polygon points="265,348 269,338 273,348" fill="rgba(245,158,11,0.55)" />
            <circle cx="269" cy="338" r="2" fill="rgba(245,158,11,0.85)" style={{ animation: 'pulse 2s ease-in-out infinite' }} />

            {/* Compass */}
            <g transform="translate(878,490)">
              <circle r="22" fill="rgba(5,8,16,0.8)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8" />
              <path d="M 0,-16 L 0,-8 M 0,8 L 0,16 M -16,0 L -8,0 M 8,0 L 16,0" stroke="rgba(245,158,11,0.35)" strokeWidth="0.8" />
              <polygon points="0,-18 -3,-10 3,-10" fill="rgba(245,158,11,0.6)" />
              <text y="30" fill="rgba(245,158,11,0.4)" fontFamily="Cinzel, serif" fontSize="7" letterSpacing="1" textAnchor="middle">N</text>
            </g>

            {/* Scale */}
            <g transform="translate(50,518)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(245,158,11,0.35)" strokeWidth="0.8" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(245,158,11,0.35)" strokeWidth="0.8" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(245,158,11,0.35)" strokeWidth="0.8" />
              <text x="30" y="-7" fill="rgba(245,158,11,0.4)" fontFamily="Cinzel, serif" fontSize="5.5" letterSpacing="0.8" textAnchor="middle">~2,000 KM</text>
            </g>
          </svg>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,8,16,0.9)' }}>
            {[
              { label: 'FROZEN WASTES', color: '#7ecef4' },
              { label: 'DORMOSE', color: '#4ade80' },
              { label: 'FEYVEY TERRITORIES', color: '#a78bfa' },
              { label: 'REGALUS HEARTLANDS', color: '#fbbf24' },
              { label: 'ASHEN DOMINION', color: '#dc2626' },
              { label: 'ABYSSAL SCAR', color: '#ef4444' },
              { label: 'OCEANUS VASTARA', color: '#06b6d4' },
              { label: 'SKYSPIRE ZENITH ↑', color: '#4fc3f7' },
              { label: 'EMBERFELL', color: '#f97316' },
              { label: 'OATHLESS SKY ⊕', color: '#a855f7' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color, opacity: 0.65, flexShrink: 0 }} />
                <span style={{ fontSize: 8.5, letterSpacing: '0.2em', color: '#64748b', fontFamily: 'Cinzel, serif' }}>{l.label}</span>
              </div>
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