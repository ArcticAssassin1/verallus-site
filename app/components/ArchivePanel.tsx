'use client'
import { useEffect } from 'react'

// The slide-in archive panel shared by the Characters and Races sections.

export const sectionLabel: React.CSSProperties = {
  fontSize: 8.5, letterSpacing: '0.35em', color: '#475569', fontFamily: 'Cinzel, serif',
  marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)',
}

export default function ArchivePanel({
  rgb, color, eyebrow, title, subtitle, chip, sigil, onClose, children, width = 440,
}: {
  rgb: string
  color: string
  eyebrow: string
  title: string
  subtitle?: string
  chip?: string
  sigil?: React.ReactNode
  onClose: () => void
  children: React.ReactNode
  width?: number
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', animation: 'overlayFade 0.2s ease' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,5,12,0.65)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div role="dialog" aria-label={title} style={{
        position: 'relative', zIndex: 10, width: `min(${width}px, 95vw)`, height: '100vh',
        background: 'linear-gradient(135deg,rgba(8,12,24,0.98) 0%,rgba(5,8,16,0.98) 100%)',
        borderLeft: `1px solid rgba(${rgb},0.2)`, overflowY: 'auto',
        animation: 'panelSlide 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ padding: '26px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(8,12,24,0.98)', backdropFilter: 'blur(10px)', zIndex: 2 }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: 'absolute', top: 22, right: 22, width: 32, height: 32,
            borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
          }}>✕</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingRight: 36 }}>
            {sigil}
            <div>
              <div style={{ fontSize: 8, letterSpacing: '0.34em', marginBottom: 6, fontFamily: 'Cinzel, serif', color }}>{eyebrow}</div>
              <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Cinzel, serif', color: '#e2e8f0', lineHeight: 1.2 }}>{title}</div>
              {subtitle && <div style={{ fontSize: 12.5, color, fontStyle: 'italic', marginTop: 4, opacity: 0.85 }}>{subtitle}</div>}
            </div>
          </div>
          {chip && (
            <div style={{ marginTop: 12 }}>
              <span style={{ fontSize: 8, letterSpacing: '0.22em', padding: '4px 10px', borderRadius: 3, background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.25)`, color, fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>{chip}</span>
            </div>
          )}
        </div>
        <div style={{ padding: '22px 28px 44px' }}>{children}</div>
      </div>
    </div>
  )
}
