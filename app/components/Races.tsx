'use client'
import { useState } from 'react'
import { RACE_GROUPS, type Race } from '../data/races'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import ArchivePanel, { sectionLabel as label } from './ArchivePanel'

const ALL = RACE_GROUPS.flatMap(g => g.members)

export default function Races() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const R = activeKey ? ALL.find(r => r.key === activeKey) ?? null : null

  return (
    <section id="races" style={{ padding: '90px 0 80px', background: 'linear-gradient(180deg,#050810 0%,#08090f 50%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-gold" style={{ opacity: 0.4 }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: 'Cinzel, serif' }}>PEOPLES OF VERALLUS</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>RACES</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 520, margin: '0 auto 22px', lineHeight: 1.82 }}>
          Every people on Verallus was shaped by the Terra Split, the Shattered Century, and generations of war and uneasy peace. Open any people for its archive.
        </p>
        <SpoilerToggle />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {RACE_GROUPS.map(g => (
          <div key={g.key} style={{ marginBottom: 54 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.34em', color: '#cbd5e1', fontFamily: 'Cinzel, serif', fontWeight: 600, whiteSpace: 'nowrap' }}>{g.title}</div>
              <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,rgba(245,158,11,0.35),transparent)' }} />
            </div>
            <p style={{ fontSize: 12.5, color: '#64748b', fontWeight: 300, lineHeight: 1.7, marginBottom: 18, maxWidth: 640 }}>{g.blurb}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))', gap: 14 }}>
              {g.members.map(r => <RaceCard key={r.key} r={r} onOpen={() => setActiveKey(r.key)} />)}
            </div>
          </div>
        ))}
      </div>

      {R && <RacePanel r={R} onClose={() => setActiveKey(null)} />}
    </section>
  )
}

function RaceCard({ r, onOpen }: { r: Race; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="race-card" style={{ ['--rgb' as string]: r.rgb } as React.CSSProperties}>
      <div className="race-card-band" />
      <div style={{ fontSize: 7.5, letterSpacing: '0.32em', color: r.color, fontFamily: 'Cinzel, serif', opacity: 0.85 }}>{r.region}</div>
      <div style={{ marginTop: 8, fontSize: 24, fontWeight: 700, color: '#e2e8f0', fontFamily: 'Cinzel, serif', letterSpacing: '0.08em', lineHeight: 1.15 }}>{r.name}</div>
      <div style={{ marginTop: 4, fontSize: 12.5, color: '#94a3b8', fontWeight: 300, fontStyle: 'italic' }}>{r.epithet}</div>
      {r.motto && (
        <div style={{ marginTop: 14, fontSize: 11.5, color: '#7c8aa0', fontStyle: 'italic', lineHeight: 1.6, borderLeft: `2px solid rgba(${r.rgb},0.35)`, paddingLeft: 10 }}>
          &ldquo;{r.motto}&rdquo;
        </div>
      )}
      {!r.motto && r.hook && (
        <div style={{ marginTop: 14, fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, fontWeight: 300 }}>{r.hook}</div>
      )}
      <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        {r.stats.slice(0, 3).map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: r.color }}><SpoilerText text={s.v} /></div>
            <div style={{ fontSize: 8, letterSpacing: '0.16em', color: '#475569', fontFamily: 'Cinzel, serif', marginTop: 2, textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </button>
  )
}

function RacePanel({ r, onClose }: { r: Race; onClose: () => void }) {
  return (
    <ArchivePanel rgb={r.rgb} color={r.color} eyebrow={r.region} title={r.name} subtitle={r.epithet} onClose={onClose} width={460}>
      <div key={r.key}>
        {r.motto && (
          <div style={{ marginBottom: 24, padding: '14px 16px', borderLeft: `2px solid rgba(${r.rgb},0.6)`, background: `rgba(${r.rgb},0.05)`, borderRadius: '0 6px 6px 0', fontSize: 13, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.7, fontWeight: 300 }}>
            &ldquo;{r.motto}&rdquo;
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={label}>OVERVIEW</div>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85 }}><SpoilerText text={r.desc} /></p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={label}>AT A GLANCE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {r.stats.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: r.color }}><SpoilerText text={s.v} /></div>
                <div style={{ fontSize: 9, letterSpacing: '0.16em', color: '#475569', fontFamily: 'Cinzel, serif' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {r.sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 24 }}>
            <div style={label}>{sec.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {sec.items.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.65 }}>
                  <span style={{ color: r.color, flexShrink: 0, fontSize: 9, marginTop: 3 }}>◆</span>
                  <span><SpoilerText text={t} /></span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {r.people.length > 0 && (
          <div>
            <div style={label}>PEOPLE IN THE STORY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {r.people.map((p, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3, color: r.color }}><SpoilerText text={p.n} /></div>
                  <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.55 }}><SpoilerText text={p.d} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ArchivePanel>
  )
}
