'use client'
import { createContext, useContext, useState } from 'react'

// Site-wide spoiler state: off by default, so every {{spoiler}} starts blurred.
const SpoilerContext = createContext<{ all: boolean; setAll: (v: boolean) => void }>({ all: false, setAll: () => {} })

export function SpoilerProvider({ children }: { children: React.ReactNode }) {
  const [all, setAll] = useState(false)
  return <SpoilerContext.Provider value={{ all, setAll }}>{children}</SpoilerContext.Provider>
}

// A small switch for section headers: reveals or hides every spoiler on the page.
export function SpoilerToggle() {
  const { all, setAll } = useContext(SpoilerContext)
  return (
    <button
      onClick={() => setAll(!all)}
      aria-pressed={all}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.24em',
        padding: '7px 12px', borderRadius: 4,
        border: `1px solid ${all ? 'rgba(168,85,247,0.55)' : 'rgba(255,255,255,0.1)'}`,
        background: all ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.03)',
        color: all ? '#c084fc' : '#64748b', transition: 'all 0.25s',
      }}
    >
      <span style={{
        width: 26, height: 14, borderRadius: 7, position: 'relative', flexShrink: 0,
        background: all ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.1)', transition: 'background 0.25s',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: all ? 14 : 2, width: 10, height: 10, borderRadius: '50%',
          background: all ? '#e9d5ff' : '#475569', transition: 'left 0.25s',
        }} />
      </span>
      {all ? 'SPOILERS SHOWN' : 'SPOILERS HIDDEN'}
    </button>
  )
}

// Renders text where any {{...}} segment is a spoiler: blurred until tapped.
// Example: 'Arah grew up here. {{His grandmother dies at the end of Book 2.}}'
export default function SpoilerText({ text }: { text: string }) {
  const parts = text.split(/(\{\{[\s\S]+?\}\})/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{{') && p.endsWith('}}')
          ? <Spoiler key={i}>{p.slice(2, -2)}</Spoiler>
          : <span key={i}>{p}</span>
      )}
    </>
  )
}

function Spoiler({ children }: { children: string }) {
  const { all } = useContext(SpoilerContext)
  const [own, setOwn] = useState(false)
  const shown = all || own
  return (
    <span
      role="button"
      tabIndex={0}
      title={shown ? 'Hide spoiler' : 'Spoiler: tap to reveal'}
      onClick={e => { e.stopPropagation(); if (!all) setOwn(s => !s) }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!all) setOwn(s => !s) } }}
      style={{ cursor: all ? 'default' : 'pointer', position: 'relative' }}
    >
      <span style={{
        fontFamily: 'Cinzel, serif', fontSize: 7.5, letterSpacing: '0.2em',
        padding: '1px 6px', marginRight: 5, borderRadius: 3, verticalAlign: '1px',
        border: '1px solid rgba(168,85,247,0.45)', color: '#c084fc',
        background: 'rgba(168,85,247,0.1)', whiteSpace: 'nowrap',
      }}>{shown ? 'SPOILER' : 'SPOILER · TAP'}</span>
      <span style={{
        filter: shown ? 'none' : 'blur(5px)',
        userSelect: shown ? 'auto' : 'none',
        transition: 'filter 0.3s',
      }}>{children}</span>
    </span>
  )
}
