'use client'
import { useRef, useState } from 'react'
import {
  FOUNDATIONS, TIERS, CATEGORIES, BENDING_PATHS, BENDING_STAGES, BENDING_TOPICS,
  CORRUPTION_STAGES, CORRUPTION_TOPICS, BEYOND, type Topic,
} from '../data/power'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import ArchivePanel, { sectionLabel as label } from './ArchivePanel'

const ALL_TOPICS = [...FOUNDATIONS, ...CATEGORIES, ...BENDING_TOPICS, ...CORRUPTION_TOPICS, ...BEYOND]

// Tier colors climb from slate through blue and violet to gold.
const TIER_COLOR: { color: string; rgb: string }[] = [
  { color: '#64748b', rgb: '100,116,139' },
  { color: '#7dd3fc', rgb: '125,211,252' },
  { color: '#4fc3f7', rgb: '79,195,247' },
  { color: '#38bdf8', rgb: '56,189,248' },
  { color: '#60a5fa', rgb: '96,165,250' },
  { color: '#818cf8', rgb: '129,140,248' },
  { color: '#a78bfa', rgb: '167,139,250' },
  { color: '#c084fc', rgb: '192,132,252' },
  { color: '#e879f9', rgb: '232,121,249' },
  { color: '#f59e0b', rgb: '245,158,11' },
  { color: '#fde68a', rgb: '253,230,138' },
]

// Roughly how many people reach each tier (Tier 0 = never awaken). Bars are log-scaled.
const REACH = [40e6, 10e6, 5e6, 1e6, 1e5, 1e4, 1e3, 200, 100, 10, 1]
const REACH_LABEL = ['~40M never awaken', '~10M', '~5M', '~1M', '~100,000', '~10,000', '~1,000', '~200', '~100', '~10', '1 on record']
const barPct = (n: number) => `${Math.max(4, ((Math.log10(n) + 0.6) / 8.3) * 100)}%`

const STAGE_COLOR = [
  { color: '#fbbf24', rgb: '251,191,36' },
  { color: '#f97316', rgb: '249,115,22' },
  { color: '#ef4444', rgb: '239,68,68' },
]

const cinzel = 'Cinzel, serif'

export default function Power() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const T = activeKey ? ALL_TOPICS.find(t => t.key === activeKey) ?? null : null
  const open = (k: string) => setActiveKey(k)

  return (
    <section id="power" style={{ padding: '90px 0 80px', background: 'linear-gradient(180deg,#050810 0%,#060a16 50%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-fog" style={{ opacity: 0.45 }} />

      <div style={{ textAlign: 'center', marginBottom: 46, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: cinzel }}>SOPHER AND SOFRA</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: cinzel }}>POWER</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 520, margin: '0 auto 22px', lineHeight: 1.82 }}>
          How power works in Verallus, and what it costs the people who use it.
        </p>
        <SpoilerToggle />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <Group title="FOUNDATIONS" blurb="Two energies, and the gods behind them. Every living thing has Sopher. Only the awakened have Sofra.">
          <CardGrid>{FOUNDATIONS.map(t => <TopicCard key={t.key} t={t} onOpen={() => open(t.key)} />)}</CardGrid>
        </Group>

        <Group title="THE TEN TIERS" blurb="Fifty million people live in Verallus, and about ten million ever awaken. Each tier is rarer than the one below it, and every one has a price. Pick a tier.">
          <TierLadder />
          <p style={{ fontSize: 11.5, color: '#475569', marginTop: 14, lineHeight: 1.6 }}>
            Demigods skip the bottom of the ladder. Their breakthroughs start at Tier 7.
          </p>
        </Group>

        <Group title="THE SEVEN CATEGORIES" blurb="Awakening reveals a category. Nobody picks one. Tier matters in all of them: working against a higher-tier opponent, patient or target gets harder the wider the gap.">
          <CardGrid>{CATEGORIES.map(t => <TopicCard key={t.key} t={t} onOpen={() => open(t.key)} />)}</CardGrid>
        </Group>

        <Group title="BENDING" blurb="The lost category. It runs on a gene most people don't know exists, and most of the world thinks it's a fairy tale.">
          <div style={label}>FOUR PATHS, BASE TO EVOLVED</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 12, marginBottom: 30 }}>
            {BENDING_PATHS.map(p => <BendPath key={p.base} p={p} />)}
          </div>

          <div style={label}>DEVELOPMENT STAGES</div>
          <div className="bend-stages">
            {BENDING_STAGES.map(s => (
              <div key={s.n} className="bend-stage" style={{ ['--a' as string]: String(0.12 + s.n * 0.11) } as React.CSSProperties}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#7ecef4', fontFamily: cinzel }}>STAGE {s.n}</div>
                <div style={{ fontSize: 12.5, color: '#e2e8f0', fontWeight: 600, margin: '4px 0 4px', fontFamily: cinzel, letterSpacing: '0.04em' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>

          <CardGrid>{BENDING_TOPICS.map(t => <TopicCard key={t.key} t={t} onOpen={() => open(t.key)} />)}</CardGrid>
        </Group>

        <Group title="CORRUPTION" blurb="Sofra that has lost the Sopher holding it together. It starts as a flicker. It ends with the person gone.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 12, marginBottom: 14 }}>
            {CORRUPTION_STAGES.map((s, i) => {
              const { color, rgb } = STAGE_COLOR[i]
              return (
                <div key={s.n} style={{ position: 'relative', overflow: 'hidden', padding: '18px 18px 18px 22px', borderRadius: 10, background: `linear-gradient(150deg, rgba(${rgb},0.08), rgba(255,255,255,0.01) 60%)`, border: `1px solid rgba(${rgb},0.2)` }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `rgba(${rgb},0.85)` }} />
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.3em', color, fontFamily: cinzel }}>STAGE {s.n}</div>
                    <span style={{ fontSize: 7.5, letterSpacing: '0.2em', padding: '3px 8px', borderRadius: 3, background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.3)`, color, fontFamily: cinzel, textTransform: 'uppercase' }}>{s.reversible}</span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', margin: '8px 0 8px' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.65, fontWeight: 300 }}><SpoilerText text={s.d} /></div>
                </div>
              )
            })}
          </div>
          <CardGrid>{CORRUPTION_TOPICS.map(t => <TopicCard key={t.key} t={t} onOpen={() => open(t.key)} />)}</CardGrid>
        </Group>

        <Group title="BEYOND THE TIERS" blurb="The things the tier table can't hold." last>
          <CardGrid>{BEYOND.map(t => <TopicCard key={t.key} t={t} onOpen={() => open(t.key)} />)}</CardGrid>
        </Group>
      </div>

      {T && <TopicPanel t={T} onClose={() => setActiveKey(null)} />}
    </section>
  )
}

function Group({ title, blurb, children, last }: { title: string; blurb: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : 58 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <div style={{ fontSize: 10.5, letterSpacing: '0.34em', color: '#cbd5e1', fontFamily: cinzel, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,rgba(245,158,11,0.35),transparent)' }} />
      </div>
      <p style={{ fontSize: 12.5, color: '#64748b', fontWeight: 300, lineHeight: 1.7, marginBottom: 18, maxWidth: 660 }}>{blurb}</p>
      {children}
    </div>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 14 }}>{children}</div>
}

function TopicCard({ t, onOpen }: { t: Topic; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="race-card power-card" style={{ ['--rgb' as string]: t.rgb } as React.CSSProperties}>
      <div className="race-card-band" />
      <div style={{ fontSize: 8, letterSpacing: '0.3em', color: t.color, fontFamily: cinzel, opacity: 0.85 }}>{t.eyebrow}</div>
      <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', lineHeight: 1.2 }}>{t.name}</div>
      <div style={{ marginTop: 7, fontSize: 12.5, color: '#94a3b8', fontWeight: 300, lineHeight: 1.55 }}><SpoilerText text={t.hook} /></div>
      {t.stats && (
        <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: t.color }}>{s.v}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.16em', color: '#475569', fontFamily: cinzel, marginTop: 2, textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

function TopicPanel({ t, onClose }: { t: Topic; onClose: () => void }) {
  return (
    <ArchivePanel rgb={t.rgb} color={t.color} eyebrow={t.eyebrow} title={t.name} onClose={onClose} width={460}>
      <div key={t.key}>
        <div style={{ marginBottom: 20, fontSize: 13, color: t.color, fontStyle: 'italic', lineHeight: 1.6 }}><SpoilerText text={t.hook} /></div>

        <div style={{ marginBottom: 24 }}>
          <div style={label}>OVERVIEW</div>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85 }}><SpoilerText text={t.desc} /></p>
        </div>

        {t.stats && (
          <div style={{ marginBottom: 24 }}>
            <div style={label}>AT A GLANCE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3, color: t.color }}>{s.v}</div>
                  <div style={{ fontSize: 8.5, letterSpacing: '0.14em', color: '#475569', fontFamily: cinzel, textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {t.sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 24 }}>
            <div style={label}>{sec.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {sec.items.map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.65 }}>
                  <span style={{ color: t.color, flexShrink: 0, fontSize: 9, marginTop: 3 }}>◆</span>
                  <span><SpoilerText text={x} /></span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ArchivePanel>
  )
}

function TierLadder() {
  const [sel, setSel] = useState(1)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const t = TIERS[sel]
  const { color, rgb } = TIER_COLOR[sel]

  const move = (n: number) => {
    const next = Math.min(10, Math.max(0, n))
    setSel(next)
    refs.current[next]?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); move(sel + 1) }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); move(sel - 1) }
    if (e.key === 'Home') { e.preventDefault(); move(0) }
    if (e.key === 'End') { e.preventDefault(); move(10) }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 18 }}>
        {[{ v: '50M', l: 'People in Verallus' }, { v: '~10M', l: 'Can use Sofra' }, { v: '1 in 5', l: 'Ever awaken' }].map(s => (
          <div key={s.l}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', fontFamily: cinzel }}>{s.v}</div>
            <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#475569', fontFamily: cinzel, marginTop: 2, textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="tier-ladder">
        <div className="tier-list" role="tablist" aria-label="Sofra tiers" aria-orientation="vertical" onKeyDown={onKey}>
          {TIERS.map(x => {
            const c = TIER_COLOR[x.n]
            const on = x.n === sel
            return (
              <button
                key={x.n}
                ref={el => { refs.current[x.n] = el }}
                role="tab"
                id={`tier-tab-${x.n}`}
                aria-selected={on}
                aria-controls="tier-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setSel(x.n)}
                className={`tier-btn${on ? ' on' : ''}`}
                style={{ ['--rgb' as string]: c.rgb } as React.CSSProperties}
              >
                <span className="tier-num" style={{ color: c.color }}>{x.n}</span>
                <span className="tier-name">{x.name}</span>
                <span className="tier-bar" aria-hidden="true"><span style={{ width: barPct(REACH[x.n]) }} /></span>
              </button>
            )
          })}
        </div>

        <div
          id="tier-panel"
          role="tabpanel"
          aria-labelledby={`tier-tab-${sel}`}
          className="tier-detail"
          style={{ ['--rgb' as string]: rgb } as React.CSSProperties}
        >
          <div key={sel} style={{ animation: 'tierFade 0.35s ease' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
              <div style={{ fontSize: 'clamp(44px,7vw,64px)', lineHeight: 0.9, fontWeight: 700, color, fontFamily: cinzel, textShadow: `0 0 30px rgba(${rgb},0.35)` }}>{t.n}</div>
              <div style={{ paddingBottom: 4 }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.34em', color, fontFamily: cinzel, opacity: 0.85 }}>TIER {t.n}</div>
                <div style={{ fontSize: 'clamp(19px,2.6vw,24px)', fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.06em' }}>{t.name}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 18 }}>{t.rarity} · {REACH_LABEL[t.n]}</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18 }}>
              {[{ v: t.level, l: 'Sofra level' }, { v: t.phys, l: 'Physical' }, { v: t.sofra, l: 'Sofra output' }].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color, marginBottom: 3 }}>{s.v}</div>
                  <div style={{ fontSize: 8, letterSpacing: '0.16em', color: '#475569', fontFamily: cinzel, textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.8, marginBottom: t.cost ? 20 : 0 }}><SpoilerText text={t.desc} /></p>

            {t.cost && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: 10 }}>
                {[{ l: 'THE COST', v: t.cost }, { l: 'THE CEILING', v: t.ceiling }, { l: 'THE COUNTER', v: t.counter }].map(b => (
                  <div key={b.l} style={{ padding: '12px 14px', borderRadius: 8, background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.14)` }}>
                    <div style={{ fontSize: 8, letterSpacing: '0.3em', color, fontFamily: cinzel, marginBottom: 6 }}>{b.l}</div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.6 }}>{b.v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function BendPath({ p }: { p: (typeof BENDING_PATHS)[number] }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '16px 16px 14px 20px', borderRadius: 10, background: `linear-gradient(150deg, rgba(${p.rgb},0.07), rgba(255,255,255,0.01) 60%)`, border: `1px solid rgba(${p.rgb},0.18)` }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, rgba(${p.rgb},0.35), rgba(${p.rgb},0.95))` }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 7.5, letterSpacing: '0.26em', color: '#475569', fontFamily: cinzel }}>BASE</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#cbd5e1', fontFamily: cinzel, margin: '3px 0 5px' }}>{p.base.replace('bending', '')}</div>
          <div style={{ fontSize: 10.5, color: '#64748b', lineHeight: 1.45 }}>{p.baseCost}</div>
        </div>
        <div aria-hidden="true" style={{ color: p.color, fontSize: 16, paddingTop: 14, opacity: 0.8 }}>→</div>
        <div>
          <div style={{ fontSize: 7.5, letterSpacing: '0.26em', color: p.color, fontFamily: cinzel }}>EVOLVED</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: p.color, fontFamily: cinzel, margin: '3px 0 5px' }}>{p.evolved.replace('bending', '')}</div>
          <div style={{ fontSize: 10.5, color: '#64748b', lineHeight: 1.45 }}>{p.evolvedCost}</div>
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 11.5, color: '#94a3b8', lineHeight: 1.55 }}>{p.note}</div>
    </div>
  )
}
