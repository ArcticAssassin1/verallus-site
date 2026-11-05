'use client'
import { useState } from 'react'
import { GROUPS, type Character } from '../data/characters'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import ArchivePanel, { sectionLabel as label } from './ArchivePanel'

const ALL = GROUPS.flatMap(g => g.members)

export default function Characters() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const C = activeKey ? ALL.find(c => c.key === activeKey) ?? null : null

  return (
    <section id="characters" style={{ padding: '90px 0 80px', background: 'linear-gradient(180deg,#050810 0%,#070b17 45%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-purple" style={{ opacity: 0.35 }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: 'Cinzel, serif' }}>THE CAST</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>CHARACTERS</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 500, margin: '0 auto 22px', lineHeight: 1.82 }}>
          People shaped by history they did not choose, power they did not ask for, and love they did not plan. Open any card for the full archive.
        </p>
        <SpoilerToggle />
      </div>

      {/* Groups */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {GROUPS.map(g => (
          <div key={g.key} style={{ marginBottom: 54 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.34em', color: '#cbd5e1', fontFamily: 'Cinzel, serif', fontWeight: 600, whiteSpace: 'nowrap' }}>{g.title}</div>
              <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,rgba(245,158,11,0.35),transparent)' }} />
            </div>
            <p style={{ fontSize: 12.5, color: '#64748b', fontWeight: 300, lineHeight: 1.7, marginBottom: 18, maxWidth: 640 }}>{g.blurb}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(44%, 230px), 1fr))', gap: 14 }}>
              {g.members.map(c => <Card key={c.key} c={c} onOpen={() => setActiveKey(c.key)} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {C && <Panel c={C} onClose={() => setActiveKey(null)} />}
    </section>
  )
}

function Sigil({ c, size }: { c: Character; size: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid rgba(${c.rgb},0.55)`,
      background: `radial-gradient(circle at 50% 35%, rgba(${c.rgb},0.22), rgba(${c.rgb},0.04) 70%)`,
      boxShadow: `0 0 22px rgba(${c.rgb},0.22), inset 0 0 12px rgba(${c.rgb},0.15)`,
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', border: `1px dashed rgba(${c.rgb},0.22)` }} />
      <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: c.color, fontSize: size * (c.glyph.length > 2 ? 0.26 : 0.32), letterSpacing: '0.06em' }}>{c.glyph}</span>
    </div>
  )
}

function Card({ c, onOpen }: { c: Character; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="char-card"
      style={{ ['--rgb' as string]: c.rgb } as React.CSSProperties}
    >
      <div className="char-card-glow" />
      <Sigil c={c} size={54} />
      <div style={{ marginTop: 16, fontSize: 7.5, letterSpacing: '0.3em', color: c.color, fontFamily: 'Cinzel, serif', opacity: 0.85 }}>{c.role}</div>
      <div style={{ marginTop: 6, fontSize: 17, fontWeight: 700, color: '#e2e8f0', fontFamily: 'Cinzel, serif', letterSpacing: '0.06em', lineHeight: 1.25 }}>{c.name}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: '#94a3b8', fontWeight: 300, fontStyle: 'italic' }}>{c.epithet}</div>
      <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 9, letterSpacing: '0.16em', color: '#64748b', fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>{c.race}</div>
    </button>
  )
}

function Panel({ c, onClose }: { c: Character; onClose: () => void }) {
  return (
    <ArchivePanel rgb={c.rgb} color={c.color} eyebrow={c.role} title={c.name} subtitle={c.epithet} chip={c.race} sigil={<Sigil c={c} size={62} />} onClose={onClose}>
        <div key={c.key}>
          <div style={{ marginBottom: 24 }}>
            <div style={label}>OVERVIEW</div>
            <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85 }}><SpoilerText text={c.desc} /></p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={label}>AT A GLANCE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {c.stats.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: c.color }}><SpoilerText text={s.v} /></div>
                  <div style={{ fontSize: 9, letterSpacing: '0.16em', color: '#475569', fontFamily: 'Cinzel, serif' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {c.tells.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={label}>ON THE PAGE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {c.tells.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                    <span style={{ color: c.color, flexShrink: 0, fontSize: 9, marginTop: 3 }}>◆</span>
                    <span><SpoilerText text={t} /></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {c.bonds.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={label}>{c.key === 'sinharvesters' ? 'MEMBERS' : 'BONDS'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {c.bonds.map((b, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3, color: c.color }}><SpoilerText text={b.n} /></div>
                    <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.55 }}><SpoilerText text={b.d} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {c.quote && (
            <div style={{ padding: '16px 18px', borderLeft: `2px solid rgba(${c.rgb},0.6)`, background: `rgba(${c.rgb},0.05)`, borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontSize: 13.5, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300 }}>
                &ldquo;<SpoilerText text={c.quote.t} />&rdquo;
              </div>
              <div style={{ marginTop: 8, fontSize: 8.5, letterSpacing: '0.24em', color: c.color, fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>
                <SpoilerText text={c.quote.by} />
              </div>
            </div>
          )}
        </div>
    </ArchivePanel>
  )
}
