'use client'
import { useMemo, useRef, useState } from 'react'
import {
  LAYERS, FOLDS, ECHO_WEB, OFFMAP, PRISM_COLORS, ZONES, THREAT_COLOR, CODEX, CODEX_CATS,
  type Site, type Layer, type Fold, type CodexCat, type CodexEntry,
} from '../data/lore'
import SpoilerText, { SpoilerToggle } from './Spoiler'
import ArchivePanel, { sectionLabel as label } from './ArchivePanel'

const cinzel = 'Cinzel, serif'
const css = (rgb: string) => ({ ['--rgb' as string]: rgb }) as React.CSSProperties

// Search reads only what a reader can already see: spoilers are left out of the match.
const plain = (s: string) => s.replace(/\{\{[\s\S]*?\}\}/g, ' ')
// Each word of the query has to start a word somewhere in the entry, so "ice" finds Iceheart, never "twice".
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const matcher = (q: string) => {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean).map(w => new RegExp(`(^|[^a-z0-9])${escape(w)}`, 'i'))
  return (text: string) => words.every(w => w.test(text))
}
const initial = (t: string) => t.replace(/^The /, '').charAt(0).toUpperCase()

export default function Lore() {
  const [open, setOpen] = useState<Site | null>(null)

  return (
    <section id="lore" style={{ padding: '90px 0 100px', background: 'linear-gradient(180deg,#050810 0%,#07061a 50%,#050810 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-purple" style={{ opacity: 0.35 }} />

      <div style={{ textAlign: 'center', marginBottom: 46, padding: '0 28px', position: 'relative' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '0.52em', color: '#a78bfa', opacity: 0.8, marginBottom: 12, fontFamily: cinzel }}>WHAT THE MAP CAN&apos;T SHOW</div>
        <h2 style={{ fontSize: 'clamp(20px,3.2vw,28px)', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.16em', marginBottom: 12, fontFamily: cinzel }}>LORE VAULT</h2>
        <p style={{ fontSize: 13.5, color: '#64748b', fontWeight: 300, maxWidth: 560, margin: '0 auto 22px', lineHeight: 1.82 }}>
          The map shows the surface of Verallus. The world runs much higher and much deeper, and some of it folds away where no map can follow. At the bottom of the vault, every term on this site, in one index.
        </p>
        <SpoilerToggle />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <Group id="depths" title="THE DEPTHS" blurb="Five geographical layers. The sky, the surface and the substratum stack on one another. The Echo Web lies over all of them, and the pocket dimensions fold off to the side. Anything with an arrow opens.">
          <Depths onOpen={setOpen} />
        </Group>

        <Group id="offmap" title="OFF THE MAP" blurb="Places the map leaves unmarked. Some are sacred, and some are best avoided.">
          <OffMap onOpen={setOpen} />
        </Group>

        <Group id="codex" title="THE CODEX" blurb="Every term on the site in one index. Search or filter, then follow a link into the section that tells the full story. Spoilers stay blurred here too." last>
          <Codex />
        </Group>
      </div>

      {open && <SitePanel s={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

function Group({ id, title, blurb, children, last }: { id: string; title: string; blurb: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div id={id} style={{ marginBottom: last ? 0 : 64, scrollMarginTop: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <div style={{ fontSize: 10.5, letterSpacing: '0.34em', color: '#cbd5e1', fontFamily: cinzel, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,rgba(124,58,237,0.45),transparent)' }} />
      </div>
      <p style={{ fontSize: 12.5, color: '#64748b', fontWeight: 300, lineHeight: 1.7, marginBottom: 18, maxWidth: 680 }}>{blurb}</p>
      {children}
    </div>
  )
}

// ── The Depths ──

// Fixed points for the Echo Web drawing, in percent of the column. Fixed so server and client agree.
const WEB_NODES: [number, number][] = [
  [94, 3], [97.5, 11], [91.5, 19], [96, 27], [92.5, 36], [98, 44], [93.5, 52],
  [97, 60], [91.5, 68], [95.5, 76], [92.5, 84], [97.5, 91], [93, 97],
]
const WEB_LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 7], [6, 7], [6, 8],
  [7, 9], [8, 9], [8, 10], [9, 11], [10, 11], [10, 12], [11, 12], [1, 2], [5, 6],
]

function Depths({ onOpen }: { onOpen: (s: Site) => void }) {
  const [lit, setLit] = useState<string[]>([])
  const [web, setWeb] = useState(false)
  const realms = ['SKY', 'SURFACE', 'SUBSTRATUM'] as const

  const hover = (keys: string[], isWeb = false) => ({
    onMouseEnter: () => { setLit(keys); setWeb(isWeb) },
    onMouseLeave: () => { setLit([]); setWeb(false) },
    onFocus: () => { setLit(keys); setWeb(isWeb) },
    onBlur: () => { setLit([]); setWeb(false) },
  })

  return (
    <div className="depths">
      <div className={`depths-col${web ? ' web-on' : ''}`}>
        <div className="web-overlay" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {WEB_LINKS.map(([a, b], i) => (
              <line key={i} x1={WEB_NODES[a][0]} y1={WEB_NODES[a][1]} x2={WEB_NODES[b][0]} y2={WEB_NODES[b][1]} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {WEB_NODES.map(([x, y], i) => (
            <span key={i} className="web-node" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.7}s` }} />
          ))}
        </div>

        {realms.map(realm => (
          <div key={realm} className={`realm realm-${realm.toLowerCase()}`}>
            <div className="realm-label" aria-hidden="true">{realm}</div>
            {LAYERS.filter(l => l.realm === realm).map(l => (
              <LayerRow key={l.key} l={l} lit={web || lit.includes(l.key)} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>

      <aside className="depths-folds" aria-label="Overlays and pocket dimensions">
        <button className="fold-card fold-web" style={css(ECHO_WEB.rgb)} onClick={() => onOpen(ECHO_WEB)} {...hover(LAYERS.map(l => l.key), true)}>
          <span className="fold-ring web" aria-hidden="true" />
          <span>
            <span className="fold-kind" style={{ color: ECHO_WEB.color }}>{ECHO_WEB.kind}</span>
            <span className="fold-name">{ECHO_WEB.name}</span>
            <span className="fold-short">{ECHO_WEB.short}</span>
          </span>
        </button>

        <div style={{ fontSize: 8.5, letterSpacing: '0.34em', color: '#64748b', fontFamily: cinzel, margin: '18px 0 10px' }}>FOLDED INTO REALITY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FOLDS.map(f => (
            <button key={f.key} className="fold-card" style={css(f.rgb)} onClick={() => onOpen(f)} {...hover(f.lights)}>
              <span className="fold-ring" aria-hidden="true" />
              <span>
                <span className="fold-kind" style={{ color: f.color }}>{f.kind}</span>
                <span className="fold-name">{f.name}</span>
                <span className="fold-short">{f.short}</span>
                <span className="fold-anchor">{f.anchor}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}

function LayerRow({ l, lit, onOpen }: { l: Layer; lit: boolean; onOpen: (s: Site) => void }) {
  const folds = FOLDS.filter(f => f.lights.includes(l.key))
  return (
    <div className={`layer${lit ? ' lit' : ''}${l.key === 'surface' ? ' surface' : ''}`} style={css(l.rgb)}>
      <div className="layer-range" style={{ color: l.color }}>{l.range}</div>
      <div className="layer-body">
        <div className="layer-name">{l.name}</div>
        <p className="layer-line">{l.line}</p>
        <div className="layer-chips">
          {l.features.map(f => <span key={f} className="layer-tag">{f}</span>)}
          {l.sites.map(s => (
            <button key={s.key} className="layer-open" style={css(s.rgb)} onClick={() => onOpen(s)}>{s.name} <span aria-hidden="true">›</span></button>
          ))}
          {folds.map(f => (
            <button key={f.key} className="layer-open" style={css(f.rgb)} onClick={() => onOpen(f)}>{f.name} <span aria-hidden="true">↗</span></button>
          ))}
          {l.onMap?.map(n => (
            <a key={n} href="#world" className="layer-map">{n === 'The world map' ? 'THE WORLD MAP ↑' : `${n.toUpperCase()} · ON THE MAP ↑`}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Off the map ──

function OffMap({ onOpen }: { onOpen: (s: Site) => void }) {
  return (
    <>
      <div className="offmap-grid">
        {OFFMAP.map(s => (
          <button key={s.key} onClick={() => onOpen(s)} className="race-card offmap-card" style={css(s.rgb)}>
            <div className="race-card-band" />
            <div style={{ fontSize: 8, letterSpacing: '0.26em', color: s.color, fontFamily: cinzel, opacity: 0.85, lineHeight: 1.5 }}>{s.where}</div>
            <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', lineHeight: 1.2 }}>{s.name}</div>
            <div style={{ marginTop: 7, fontSize: 12.5, color: '#94a3b8', fontWeight: 300, lineHeight: 1.55 }}>{s.short}</div>
            <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 8, letterSpacing: '0.24em', color: '#475569', fontFamily: cinzel }}>{s.kind} ›</div>
          </button>
        ))}
      </div>

      <div className="offmap-lower">
        <Prism />
        <Zones />
      </div>
    </>
  )
}

function Prism() {
  const [sel, setSel] = useState(0)
  const c = PRISM_COLORS[sel]
  return (
    <div className="vault-panel" style={css(c.rgb)}>
      <div style={{ fontSize: 8.5, letterSpacing: '0.32em', color: '#94a3b8', fontFamily: cinzel, marginBottom: 4 }}>THE SEVEN COLORS</div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 300, lineHeight: 1.6, marginBottom: 16 }}>What each color of a Prism Well strengthens, and what it costs.</div>
      <div className="prism-row" role="group" aria-label="Prism Well colors">
        {PRISM_COLORS.map((p, i) => (
          <button
            key={p.name}
            className={`prism-swatch${i === sel ? ' on' : ''}`}
            style={{ ...css(p.rgb), background: p.color }}
            aria-pressed={i === sel}
            aria-label={p.name}
            title={p.name}
            onClick={() => setSel(i)}
          />
        ))}
      </div>
      <div key={c.name} style={{ animation: 'tierFade 0.3s ease', marginTop: 18 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.name === 'Black' ? '#d4d4d8' : c.color, fontFamily: cinzel, letterSpacing: '0.08em', marginBottom: 12 }}>{c.name.toUpperCase()}</div>
        <div className="prism-grid">
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: '0.3em', color: '#475569', fontFamily: cinzel, marginBottom: 4 }}>STRENGTHENS</div>
            <div style={{ fontSize: 12.5, color: '#cbd5e1', fontWeight: 300, lineHeight: 1.6 }}>{c.effect}</div>
          </div>
          <div>
            <div style={{ fontSize: 7.5, letterSpacing: '0.3em', color: '#f87171', fontFamily: cinzel, marginBottom: 4, opacity: 0.85 }}>THE RISK</div>
            <div style={{ fontSize: 12.5, color: '#cbd5e1', fontWeight: 300, lineHeight: 1.6 }}>{c.risk}</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11.5, color: '#64748b', lineHeight: 1.6 }}>
        Safe only at Tier 6 and up. Below that, a well can kill. Luminant Wardens guard them.
      </div>
    </div>
  )
}

function Zones() {
  return (
    <div className="vault-panel" style={css('239,68,68')}>
      <div style={{ fontSize: 8.5, letterSpacing: '0.32em', color: '#94a3b8', fontFamily: cinzel, marginBottom: 4 }}>THE CORRUPTION ZONES</div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 300, lineHeight: 1.6, marginBottom: 14 }}>Places where ambient Sofra is so destabilized it harms anyone who visits. None of them happened naturally.</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
        {ZONES.map(z => {
          const t = THREAT_COLOR[z.threat]
          return (
            <li key={z.name} className="zone-row">
              <span className="zone-threat" style={{ ...css(t.rgb), color: t.color }}>{z.threat}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.04em' }}>{z.name}</span>
                  <span style={{ fontSize: 10.5, color: '#64748b' }}>{z.where}</span>
                </div>
                <div style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 300, lineHeight: 1.55, marginTop: 3 }}>{z.origin}</div>
              </div>
              {z.onMap
                ? <a href="#world" className="zone-tag">ON THE MAP ↑</a>
                : <span className="zone-tag off">OFF THE MAP</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ── The shared panel for layers, folds and off-map sites ──

function SitePanel({ s, onClose }: { s: Site; onClose: () => void }) {
  const fold = (FOLDS as Site[]).includes(s) ? (s as Fold) : null
  const where = OFFMAP.find(o => o.key === s.key)?.where
  return (
    <ArchivePanel
      rgb={s.rgb} color={s.color} eyebrow={s.kind} title={s.name} subtitle={s.short}
      chip={fold?.anchor ?? where} onClose={onClose} width={460}
      sigil={<span className="fold-ring big" style={css(s.rgb)} aria-hidden="true" />}
    >
      <div key={s.key}>
        <div style={{ marginBottom: 24 }}>
          <div style={label}>OVERVIEW</div>
          <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85 }}><SpoilerText text={s.desc} /></p>
        </div>

        {s.details && (
          <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.details.map(d => (
              <div key={d.l} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 8, letterSpacing: '0.24em', color: s.color, fontFamily: cinzel, marginBottom: 4, textTransform: 'uppercase' }}>{d.l}</div>
                <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6 }}><SpoilerText text={d.v} /></div>
              </div>
            ))}
          </div>
        )}

        {s.key === 'prism' && (
          <div style={{ marginBottom: 24 }}>
            <div style={label}>THE SEVEN COLORS</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {PRISM_COLORS.map(p => (
                <li key={p.name} style={{ display: 'flex', gap: 10, fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                  <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: '50%', background: p.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 8px rgba(${p.rgb},0.6)`, border: '1px solid rgba(255,255,255,0.2)' }} />
                  <span><span style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.name}.</span> {p.effect} Risk: {p.risk.charAt(0).toLowerCase() + p.risk.slice(1)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {s.sections?.map(sec => (
          <div key={sec.title} style={{ marginBottom: 24 }}>
            <div style={label}>{sec.title}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sec.items.map((x, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 12.5, color: '#94a3b8', lineHeight: 1.65 }}>
                  <span aria-hidden="true" style={{ color: s.color, flexShrink: 0, fontSize: 8, marginTop: 5 }}>◆</span>
                  <span><SpoilerText text={x} /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {s.mapRef && (
          <a href="#world" onClick={onClose} className="era-link" style={{ color: s.color, marginTop: 0 }}>{s.mapRef.toUpperCase()} ↑</a>
        )}
      </div>
    </ArchivePanel>
  )
}

// ── The Codex ──

function Codex() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<CodexCat | 'ALL'>('ALL')
  const [sel, setSel] = useState(() => CODEX.find(e => e.term === 'Sopher') ?? CODEX[0])
  const items = useRef(new Map<string, HTMLButtonElement | null>())
  const listRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: CODEX.length }
    for (const e of CODEX) c[e.cat] = (c[e.cat] ?? 0) + 1
    return c
  }, [])

  const shown = useMemo(() => {
    const hit = matcher(q)
    return CODEX.filter(e => (cat === 'ALL' || e.cat === cat) &&
      hit([e.term, ...(e.aka ?? []), e.kind ?? '', plain(e.tag ?? ''), plain(e.def)].join(' · ')))
  }, [q, cat])

  const letters = useMemo(() => {
    const groups: { l: string; entries: CodexEntry[] }[] = []
    for (const e of shown) {
      const l = /[A-Z]/.test(initial(e.term)) ? initial(e.term) : '#'
      const g = groups[groups.length - 1]
      if (g && g.l === l) g.entries.push(e)
      else groups.push({ l, entries: [e] })
    }
    return groups
  }, [shown])

  const pick = (e: CodexEntry, focus = false) => {
    setSel(e)
    if (focus) items.current.get(e.term)?.focus()
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
    }
  }

  // Following a "see also" link clears the filters so the entry is always in the list.
  const follow = (term: string) => {
    const e = CODEX.find(x => x.term === term)
    if (!e) return
    setQ(''); setCat('ALL'); setSel(e)
    requestAnimationFrame(() => {
      const btn = items.current.get(term)
      const list = listRef.current
      if (btn && list) list.scrollTo({ top: btn.offsetTop - list.clientHeight / 3, behavior: 'smooth' })
    })
  }

  const onKey = (ev: React.KeyboardEvent) => {
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return
    ev.preventDefault()
    const i = shown.findIndex(e => e.term === sel.term)
    const next = shown[Math.min(shown.length - 1, Math.max(0, i + (ev.key === 'ArrowDown' ? 1 : -1)))]
    if (next) pick(next, true)
  }

  const catInfo = (c: CodexCat) => CODEX_CATS.find(x => x.key === c)!
  const sc = catInfo(sel.cat)

  return (
    <div className="codex">
      <div className="codex-side">
        <label className="codex-search">
          <span aria-hidden="true" style={{ color: '#475569', fontSize: 13 }}>⌕</span>
          <input
            type="search" value={q} onChange={e => setQ(e.target.value)}
            placeholder={`Search ${CODEX.length} terms`} aria-label="Search the codex"
          />
        </label>

        <div className="codex-cats" role="group" aria-label="Filter by category">
          {(['ALL', ...CODEX_CATS.map(c => c.key)] as const).map(k => {
            const info = k === 'ALL' ? { color: '#cbd5e1', rgb: '203,213,225' } : catInfo(k)
            return (
              <button key={k} className={`codex-cat${cat === k ? ' on' : ''}`} style={css(info.rgb)} aria-pressed={cat === k} onClick={() => setCat(k)}>
                {k} <span style={{ opacity: 0.55 }}>{counts[k] ?? 0}</span>
              </button>
            )
          })}
        </div>

        <div className="codex-list" ref={listRef} onKeyDown={onKey} aria-label="Codex terms">
          {letters.length === 0 && (
            <div style={{ padding: '18px 14px', fontSize: 12, color: '#64748b' }}>Nothing matches. Try a shorter word, or clear the filter.</div>
          )}
          {letters.map(g => (
            <div key={g.l}>
              <div className="codex-letter">{g.l}</div>
              {g.entries.map(e => {
                const info = catInfo(e.cat)
                const on = e.term === sel.term
                return (
                  <button
                    key={e.term}
                    ref={el => { items.current.set(e.term, el) }}
                    className={`codex-item${on ? ' on' : ''}`}
                    style={css(info.rgb)}
                    aria-pressed={on}
                    onClick={() => pick(e)}
                  >
                    <span className="codex-dot" aria-hidden="true" />
                    <span>{e.term}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="codex-detail" ref={detailRef} aria-live="polite" style={css(sc.rgb)}>
        <div key={sel.term} style={{ animation: 'tierFade 0.3s ease' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <span className="codex-chip" style={{ color: sc.color }}>{sel.cat}</span>
            {sel.kind && <span style={{ fontSize: 8.5, letterSpacing: '0.22em', color: '#64748b', fontFamily: cinzel }}>{sel.kind}</span>}
          </div>
          <div style={{ fontSize: 'clamp(24px,3.4vw,32px)', fontWeight: 700, color: '#e2e8f0', fontFamily: cinzel, letterSpacing: '0.05em', lineHeight: 1.15, marginBottom: 8 }}>{sel.term}</div>
          {sel.tag && <div style={{ fontSize: 13.5, color: sc.color, fontStyle: 'italic', lineHeight: 1.55, marginBottom: 6, opacity: 0.9 }}><SpoilerText text={sel.tag} /></div>}
          {sel.aka && <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 6 }}>Also called {sel.aka.join(', ')}</div>}
          <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 300, lineHeight: 1.85, marginTop: 14 }}><SpoilerText text={sel.def} /></p>

          {sel.see && sel.see.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={label}>SEE ALSO</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sel.see.map(t => {
                  const target = CODEX.find(x => x.term === t)
                  if (!target) return null
                  return (
                    <button key={t} className="codex-see" style={css(catInfo(target.cat).rgb)} onClick={() => follow(t)}>{t}</button>
                  )
                })}
              </div>
            </div>
          )}

          <a href={sel.href} className="codex-go" style={{ color: sc.color }}>THE FULL STORY · {sel.where} ↑</a>
        </div>
      </div>
    </div>
  )
}
