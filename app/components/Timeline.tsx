'use client'
import { useEffect, useRef, useState } from 'react'
import { ERAS, HIDDEN, BOOKS, type Era, type Book } from '../data/timeline'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import { TIER_COLOR } from './Power'

const cinzel = 'Cinzel, serif'

// The deep-time ruler is logarithmic: each step left reaches ten times further back.
const LOG_MAX = Math.log10(20001)
const pct = (years: number) => (1 - Math.log10(years + 1) / LOG_MAX) * 100
// Six significant digits, the precision browsers keep for CSS percentages, so server and client styles match on hydration.
const p6 = (n: number) => `${Number(n.toPrecision(6))}%`
const TICKS = [
  { y: 10000, l: '10,000' },
  { y: 1000, l: '1,000' },
  { y: 100, l: '100' },
  { y: 10, l: '10' },
  { y: 0, l: 'BOOK 1' },
]

export default function Timeline() {
  const [sel, setSel] = useState('iv')
  const idx = ERAS.findIndex(e => e.key === sel)
  const era = ERAS[idx]
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  // On phones the tab row scrolls sideways. Keep the selected era in view without moving the page.
  useEffect(() => {
    const tab = tabs.current[idx]
    const row = tab?.parentElement
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [idx])

  const go = (i: number, focus = false) => {
    const next = Math.min(ERAS.length - 1, Math.max(0, i))
    setSel(ERAS[next].key)
    if (focus) tabs.current[next]?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1, true) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1, true) }
    if (e.key === 'Home') { e.preventDefault(); go(0, true) }
    if (e.key === 'End') { e.preventDefault(); go(ERAS.length - 1, true) }
  }

  return (
    <section id="timeline" style={{ padding: '90px 0 80px', background: 'linear-gradient(180deg,#050810 0%,#060b15 50%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-ice" style={{ opacity: 0.4 }} />

      <div style={{ textAlign: 'center', marginBottom: 46, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#f59e0b', opacity: 0.7, marginBottom: 12, fontFamily: cinzel }}>TEN ERAS AND A SILENCE</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: cinzel }}>TIMELINE</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 540, margin: '0 auto 22px', lineHeight: 1.82 }}>
          Every wound in Arah&apos;s world traces back to a choice someone made before he was born. Sometimes centuries before. Sometimes millennia.
        </p>
        <SpoilerToggle />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <Group title="DEEP TIME" blurb="Years before Book 1, on a logarithmic scale: every step to the left reaches ten times further back. The last hundred years fill half the line. Pick an era.">
          <Ruler sel={sel} onPick={setSel} />

          <div className="era-tabs" role="tablist" aria-label="Eras of Verallus" onKeyDown={onKey}>
            {ERAS.map((e, i) => {
              const on = e.key === sel
              return (
                <button
                  key={e.key}
                  ref={el => { tabs.current[i] = el }}
                  role="tab"
                  id={`era-tab-${e.key}`}
                  aria-selected={on}
                  aria-controls="era-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setSel(e.key)}
                  className={`era-tab${on ? ' on' : ''}${e.lane === 2 ? ' bg' : ''}`}
                  style={{ ['--rgb' as string]: e.rgb } as React.CSSProperties}
                >
                  <span className="era-tab-n" style={{ color: e.color }}>{e.n}</span>
                  <span className="era-tab-name">{e.short}</span>
                </button>
              )
            })}
          </div>

          <EraDetail era={era} prev={ERAS[idx - 1]} next={ERAS[idx + 1]} onGo={k => setSel(k)} />
        </Group>

        <Group title="HIDDEN HISTORIES" blurb="What most of Verallus believes, and what actually happened. The truths are spoilers, some of them for the whole series.">
          <div className="hh-grid">
            {HIDDEN.map(h => (
              <div key={h.topic} className="hh-card">
                <div className="hh-top">
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', marginBottom: 10 }}>{h.topic}</div>
                  <div style={{ fontSize: 7.5, letterSpacing: '0.3em', color: '#475569', fontFamily: cinzel, marginBottom: 5 }}>WHAT THE WORLD BELIEVES</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 300, lineHeight: 1.6 }}>{h.believed}</div>
                </div>
                <div className="hh-bottom">
                  <div style={{ fontSize: 7.5, letterSpacing: '0.3em', color: '#c084fc', fontFamily: cinzel, marginBottom: 5 }}>WHAT HAPPENED</div>
                  <div style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 300, lineHeight: 1.6 }}><SpoilerText text={h.truth} /></div>
                </div>
              </div>
            ))}
          </div>
        </Group>

        <div id="books" style={{ scrollMarginTop: 80 }}>
          <Group title="THE SIX BOOKS" blurb="The Age of Resonance, book by book. Arah climbs the tiers as he goes, and almost everything past Book 1 is a spoiler." last>
            <div className="book-grid">
              {BOOKS.map(b => <BookCard key={b.n} b={b} />)}
            </div>
          </Group>
        </div>
      </div>
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

// A strip of deep time. Pointer users can pick an era on it; the tabs below are the accessible control.
function Ruler({ sel, onPick }: { sel: string; onPick: (k: string) => void }) {
  const cur = ERAS.find(e => e.key === sel)!
  const mid = (pct(cur.span[0]) + pct(cur.span[1])) / 2
  const dotTop = cur.lane === 1 ? 37 : 25

  return (
    <div className="tl-ruler" aria-hidden="true">
      <div className="tl-ruler-label" style={{ left: p6(mid), transform: `translateX(-${p6(mid)})`, color: cur.color }}>
        {cur.n} · {cur.short.toUpperCase()}
      </div>

      {ERAS.map(e => {
        const a = pct(e.span[0])
        const b = pct(e.span[1])
        const mark = b - a < 0.8
        const on = e.key === sel
        return (
          <div
            key={e.key}
            className={`tl-seg lane-${e.lane}${mark ? ' mark' : ''}${on ? ' on' : ''}`}
            title={`${e.n} · ${e.name}`}
            onClick={() => onPick(e.key)}
            style={{
              ['--rgb' as string]: e.rgb,
              left: p6(a),
              width: mark ? undefined : p6(b - a),
              transform: mark ? `translateX(${a > 99 ? -100 : -50}%)` : undefined,
            } as React.CSSProperties}
          />
        )
      })}

      {cur.events.filter(ev => ev.at !== undefined).map((ev, i) => {
        const x = pct(ev.at!)
        return (
          <span key={i} className="tl-dot" style={{
            ['--rgb' as string]: cur.rgb, left: p6(x), top: dotTop,
            transform: `translateX(${x > 99 ? -100 : -50}%)`,
          } as React.CSSProperties} />
        )
      })}

      <div className="tl-axis" />
      {TICKS.map(t => {
        const x = pct(t.y)
        return (
          <div key={t.l} className="tl-tick" style={{ left: p6(x) }}>
            <span style={{ transform: `translateX(${x > 99 ? -100 : -50}%)` }}>{t.l}</span>
          </div>
        )
      })}
    </div>
  )
}

function EraDetail({ era, prev, next, onGo }: { era: Era; prev?: Era; next?: Era; onGo: (k: string) => void }) {
  return (
    <div
      id="era-panel"
      role="tabpanel"
      aria-labelledby={`era-tab-${era.key}`}
      className="era-detail"
      style={{ ['--rgb' as string]: era.rgb } as React.CSSProperties}
    >
      <div key={era.key} className="era-detail-grid" style={{ animation: 'tierFade 0.35s ease' }}>
        <div>
          <div style={{ fontSize: 'clamp(46px,7vw,66px)', lineHeight: 0.9, fontWeight: 700, color: era.color, fontFamily: cinzel, textShadow: `0 0 30px rgba(${era.rgb},0.35)` }}>{era.n}</div>
          <div style={{ fontSize: 8.5, letterSpacing: '0.34em', color: era.color, fontFamily: cinzel, opacity: 0.85, marginTop: 12 }}>ERA {era.n}</div>
          <div style={{ fontSize: 'clamp(19px,2.4vw,23px)', fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', lineHeight: 1.2, margin: '4px 0 8px' }}>{era.name}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, lineHeight: 1.55 }}><SpoilerText text={era.period} /></div>
          <span style={{ display: 'inline-block', fontSize: 7.5, letterSpacing: '0.24em', padding: '4px 9px', borderRadius: 3, background: `rgba(${era.rgb},0.1)`, border: `1px solid rgba(${era.rgb},0.3)`, color: era.color, fontFamily: cinzel }}>{era.status}</span>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.8, marginTop: 16 }}><SpoilerText text={era.summary} /></p>
          {era.key === 'x' && (
            <a href="#books" className="era-link" style={{ color: era.color }}>THE SIX BOOKS ↓</a>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {prev && <button className="era-step" onClick={() => onGo(prev.key)}>‹ {prev.n} · {prev.short}</button>}
            {next && <button className="era-step" onClick={() => onGo(next.key)}>{next.n} · {next.short} ›</button>}
          </div>
        </div>

        <ol className="era-events">
          {era.events.map((ev, i) => (
            <li key={i} className="era-ev">
              <span className="era-ev-dot" aria-hidden="true" />
              <div style={{ fontSize: 8.5, letterSpacing: '0.24em', color: era.color, fontFamily: cinzel, opacity: 0.9, textTransform: 'uppercase' }}>{ev.when}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.04em', margin: '4px 0 6px', lineHeight: 1.3 }}><SpoilerText text={ev.title} /></div>
              {ev.d && <p style={{ fontSize: 12.5, color: '#94a3b8', fontWeight: 300, lineHeight: 1.75 }}><SpoilerText text={ev.d} /></p>}
              {ev.items && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginTop: ev.d ? 10 : 2 }}>
                  {ev.items.map((x, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                      <span aria-hidden="true" style={{ color: era.color, flexShrink: 0, fontSize: 8, marginTop: 4 }}>◆</span>
                      <span><SpoilerText text={x} /></span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function BookCard({ b }: { b: Book }) {
  const [lo, hi] = b.tiers
  const top = TIER_COLOR[hi]
  return (
    <div className="book-card" style={{ ['--rgb' as string]: top.rgb } as React.CSSProperties}>
      <div className="race-card-band" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 8.5, letterSpacing: '0.34em', color: top.color, fontFamily: cinzel }}>BOOK {b.n}</div>
        {b.phase && <span style={{ fontSize: 7, letterSpacing: '0.22em', padding: '3px 7px', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', color: '#64748b', fontFamily: cinzel }}>{b.phase}</span>}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.04em', lineHeight: 1.25, margin: '8px 0 14px' }}>{b.title}</div>

      <div className="book-tiers" role="img" aria-label={`Tier ${lo} to ${hi}${b.tierNote ? `, ${b.tierNote}` : ''}`}>
        {TIER_COLOR.map((c, t) => {
          const inRange = t >= lo && t <= hi
          const brief = inRange && t === hi && !!b.tierNote
          return (
            <span key={t} className={`book-tier${inRange ? ' in' : ''}${brief ? ' brief' : ''}`} style={{ ['--rgb' as string]: c.rgb } as React.CSSProperties} />
          )
        })}
      </div>
      <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#475569', fontFamily: cinzel, marginTop: 6, marginBottom: 14 }}>
        {b.tierNote ? `TIER ${lo}, ${b.tierNote.toUpperCase()}` : `TIER ${lo} TO ${hi}`}
      </div>

      {b.shape && <div style={{ fontSize: 12.5, color: top.color, fontStyle: 'italic', lineHeight: 1.55, marginBottom: 12, opacity: 0.9 }}>{b.shape}</div>}
      {b.note && <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.55, marginBottom: 12 }}>{b.note}</div>}

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {b.threads.map((x, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
            <span aria-hidden="true" style={{ color: top.color, flexShrink: 0, fontSize: 8, marginTop: 4 }}>◆</span>
            <span><SpoilerText text={x} /></span>
          </li>
        ))}
      </ul>
    </div>
  )
}
