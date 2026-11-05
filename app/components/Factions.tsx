'use client'
import { useState } from 'react'
import { FACTION_GROUPS, ALIGN, type Faction, type Alignment } from '../data/factions'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import ArchivePanel, { sectionLabel as label } from './ArchivePanel'

const ALL = FACTION_GROUPS.flatMap(g => g.members)
const LEGEND: Alignment[] = ['HEROIC', 'NEUTRAL', 'COMPLEX', 'ANTAGONISTIC', 'SHADOW', 'HISTORICAL']

function Chip({ a }: { a: Alignment }) {
  const { color, rgb } = ALIGN[a]
  return (
    <span style={{
      fontSize: 7.5, letterSpacing: '0.26em', padding: '3px 8px', borderRadius: 3,
      background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.3)`, color, fontFamily: 'Cinzel, serif',
    }}>{a}</span>
  )
}

export default function Factions() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const F = activeKey ? ALL.find(f => f.key === activeKey) ?? null : null

  return (
    <section id="factions" style={{ padding: '90px 0 80px', background: 'linear-gradient(180deg,#050810 0%,#0a0710 50%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-fog" style={{ opacity: 0.5 }} />

      <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: 'Cinzel, serif' }}>POWER AND ALLEGIANCE</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: 'Cinzel, serif' }}>FACTIONS</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 520, margin: '0 auto 22px', lineHeight: 1.82 }}>
          Who holds power, who challenges it, and who works outside it entirely. Every card is colored by where it stands.
        </p>
        <SpoilerToggle />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 22 }}>
          {LEGEND.map(a => <Chip key={a} a={a} />)}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {FACTION_GROUPS.map(g => (
          <div key={g.key} style={{ marginBottom: 54 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.34em', color: '#cbd5e1', fontFamily: 'Cinzel, serif', fontWeight: 600, whiteSpace: 'nowrap' }}>{g.title}</div>
              <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,rgba(245,158,11,0.35),transparent)' }} />
            </div>
            <p style={{ fontSize: 12.5, color: '#64748b', fontWeight: 300, lineHeight: 1.7, marginBottom: 18, maxWidth: 640 }}>{g.blurb}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 14 }}>
              {g.members.map(f => <FactionCard key={f.key} f={f} onOpen={() => setActiveKey(f.key)} />)}
            </div>
          </div>
        ))}
      </div>

      {F && <FactionPanel f={F} onClose={() => setActiveKey(null)} />}
    </section>
  )
}

function FactionCard({ f, onOpen }: { f: Faction; onOpen: () => void }) {
  const { color, rgb } = ALIGN[f.align]
  return (
    <button onClick={onOpen} className="race-card faction-card" style={{ ['--rgb' as string]: rgb } as React.CSSProperties}>
      <div className="race-card-band" />
      <Chip a={f.align} />
      <div style={{ marginTop: 12, fontSize: 19, fontWeight: 700, color: '#e2e8f0', fontFamily: 'Cinzel, serif', letterSpacing: '0.06em', lineHeight: 1.2 }}>{f.name}</div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: '#94a3b8', fontWeight: 300, lineHeight: 1.55 }}><SpoilerText text={f.role} /></div>
      <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {f.stats.slice(0, 2).map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color }}><SpoilerText text={s.v} /></div>
            <div style={{ fontSize: 8, letterSpacing: '0.16em', color: '#475569', fontFamily: 'Cinzel, serif', marginTop: 2, textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </button>
  )
}

function FactionPanel({ f, onClose }: { f: Faction; onClose: () => void }) {
  const { color, rgb } = ALIGN[f.align]
  return (
    <ArchivePanel rgb={rgb} color={color} eyebrow={f.align} title={f.name} onClose={onClose} width={460}>
      <div key={f.key}>
        <div style={{ marginBottom: 20, fontSize: 13, color, fontStyle: 'italic', lineHeight: 1.6 }}><SpoilerText text={f.role} /></div>

        <div style={{ marginBottom: 24 }}>
          <div style={label}>OVERVIEW</div>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85 }}><SpoilerText text={f.desc} /></p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={label}>AT A GLANCE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {f.stats.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color }}><SpoilerText text={s.v} /></div>
                <div style={{ fontSize: 9, letterSpacing: '0.16em', color: '#475569', fontFamily: 'Cinzel, serif' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {f.sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 24 }}>
            <div style={label}>{sec.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {sec.items.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.65 }}>
                  <span style={{ color, flexShrink: 0, fontSize: 9, marginTop: 3 }}>◆</span>
                  <span><SpoilerText text={t} /></span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {f.links.length > 0 && (
          <div>
            <div style={label}>{f.key === 'elite6' ? 'THE CURRENT SIX' : 'CONNECTIONS'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {f.links.map((l, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3, color }}><SpoilerText text={l.n} /></div>
                  <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.55 }}><SpoilerText text={l.d} /></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ArchivePanel>
  )
}
