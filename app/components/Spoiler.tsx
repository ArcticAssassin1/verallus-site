'use client'
import { useState } from 'react'

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
  const [shown, setShown] = useState(false)
  return (
    <span
      role="button"
      tabIndex={0}
      title={shown ? 'Hide spoiler' : 'Spoiler: tap to reveal'}
      onClick={e => { e.stopPropagation(); setShown(s => !s) }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShown(s => !s) } }}
      style={{ cursor: 'pointer', position: 'relative' }}
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
