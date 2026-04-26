'use client'
import { useEffect, useRef } from 'react'

const PILLS = [
  { label: 'THE WORLD', color: '#4fc3f7', rgb: '79,195,247', href: '#world' },
  { label: 'CHARACTERS', color: '#a855f7', rgb: '168,85,247', href: '#characters' },
  { label: 'RACES', color: '#f59e0b', rgb: '245,158,11', href: '#races' },
  { label: 'POWER SYSTEM', color: '#00e5ff', rgb: '0,229,255', href: '#power' },
  { label: 'FACTIONS', color: '#ef4444', rgb: '239,68,68', href: '#factions' },
  { label: 'TIMELINE', color: '#d97706', rgb: '217,119,6', href: '#timeline' },
  { label: 'LORE VAULT', color: '#7c3aed', rgb: '124,58,237', href: '#lore' },
]

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const COLORS = ['#4fc3f7', '#00e5ff', '#a855f7', '#f59e0b']
    for (let i = 0; i < 40; i++) {
      const r = Math.random()
      const c = r > .72 ? COLORS[0] : r > .5 ? COLORS[1] : r > .28 ? COLORS[2] : COLORS[3]
      const d = document.createElement('div')
      const sz = 0.8 + Math.random() * 2.2
      d.style.cssText = `
        position:absolute;border-radius:50%;
        left:${Math.random() * 100}%;top:${10 + Math.random() * 90}%;
        width:${sz}px;height:${sz}px;background:${c};
        opacity:${0.1 + Math.random() * 0.45};
        box-shadow:0 0 ${sz * 3}px ${c}80;
        --dx:${(Math.random() - 0.5) * 80}px;
        animation:particleFloat ${16 + Math.random() * 28}s linear ${Math.random() * 25}s infinite;
      `
      container.appendChild(d)
    }
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810', overflow: 'hidden' }}>
      {/* Aurora layers */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="dots-bg" />
        <div className="aurora-ice" />
        <div className="aurora-purple" />
        <div className="aurora-gold" />
        <div className="aurora-fog" />
        <div className="aurora-vignette" />
        <div className="aurora-bottom" />
      </div>

      {/* Particles */}
      <div ref={particlesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '120px 24px 90px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.48em', color: '#f59e0b', marginBottom: 24, opacity: 0.78, fontFamily: 'Cinzel, serif', animation: 'fadeUp 0.9s ease 1.3s both' }}>
          A WORLD OF SIX RACES &nbsp;·&nbsp; NINE ABSOLUTES &nbsp;·&nbsp; A TRUTH TEN THOUSAND YEARS BURIED
        </div>

        <h1 style={{
          fontSize: 'clamp(48px, 11vw, 118px)', fontWeight: 900, color: '#fff',
          letterSpacing: '0.16em', lineHeight: 0.88, marginBottom: 32,
          fontFamily: 'Cinzel Decorative, serif',
          animation: 'fadeUp 1s ease 0.4s both, titleGlow 5s ease-in-out 2.6s infinite',
        }}>
          VERALLUS
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 22, animation: 'fadeUp 0.7s ease 1.9s both' }}>
          <div style={{ height: 1, width: 75, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,.5))' }} />
          <svg width="9" height="9" viewBox="0 0 9 9"><polygon points="4.5,0 9,4.5 4.5,9 0,4.5" fill="#f59e0b" opacity=".6" /></svg>
          <div style={{ height: 1, width: 75, background: 'linear-gradient(90deg,rgba(245,158,11,.5),transparent)' }} />
        </div>

        <div style={{ fontSize: 10, letterSpacing: '0.22em', color: '#94a3b8', marginBottom: 20, opacity: 0.82, fontFamily: 'Cinzel, serif', animation: 'fadeUp 0.9s ease 2.1s both' }}>
          THE HISTORY THEY WROTE &nbsp;·&nbsp; AND THE HISTORY THEY ERASED
        </div>

        <p style={{ fontSize: 'clamp(13px,1.7vw,15px)', color: '#94a3b8', fontWeight: 300, lineHeight: 1.85, maxWidth: 540, margin: '0 auto 48px', animation: 'fadeUp 0.9s ease 2.3s both' }}>
          Six races. Ten tiers of power. A bending art extinct for ten thousand years —<br />
          waking up inside a sixteen-year-old boy who doesn&apos;t know what he is.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center', marginBottom: 64, animation: 'fadeUp 0.9s ease 2.5s both' }}>
          {PILLS.map(p => (
            <a key={p.href} href={p.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4, padding: '8px 14px', textDecoration: 'none',
              fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.19em', color: '#64748b',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `rgba(${p.rgb},0.08)`
                e.currentTarget.style.borderColor = p.color
                e.currentTarget.style.color = p.color
                e.currentTarget.style.boxShadow = `0 0 18px rgba(${p.rgb},0.2)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#64748b'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >{p.label}</a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 26, left: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10, animation: 'scrollBob 2.2s ease-in-out infinite' }}>
        <span style={{ fontSize: 7.5, letterSpacing: '0.42em', color: '#334155', fontFamily: 'Cinzel, serif' }}>EXPLORE</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </section>
  )
}