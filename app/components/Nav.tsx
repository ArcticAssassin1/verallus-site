'use client'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'THE WORLD', href: '#world' },
  { label: 'CHARACTERS', href: '#characters' },
  { label: 'RACES', href: '#races' },
  { label: 'POWER', href: '#power' },
  { label: 'FACTIONS', href: '#factions' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'LORE VAULT', href: '#lore' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      background: scrolled ? 'rgba(5,8,16,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(79,195,247,0.1)' : '1px solid transparent',
      transition: 'all 0.4s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 28px',
        display: 'flex', alignItems: 'center', height: 64,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 6,
            border: '1px solid rgba(79,195,247,0.32)',
            background: 'rgba(79,195,247,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#4fc3f7', fontSize: 15, fontWeight: 700, fontFamily: 'Cinzel, serif' }}>V</span>
          </div>
          <span style={{ color: '#b0bec5', fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', fontFamily: 'Cinzel, serif' }}>VERALLUS</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: 24, marginLeft: 'auto', alignItems: 'center' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.2em',
              color: '#64748b', textDecoration: 'none', transition: 'color 0.25s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4fc3f7')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}