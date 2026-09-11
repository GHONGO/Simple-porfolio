import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'

const buildIntroLines = () => [
  '$ locate /unknown-route',
  'Searching for requested page...',
  '✕ 404 — route not found',
  'Checking available routes...',
  ...Object.values(NOT_FOUND_ROUTES).map(
    (r) => `✓ ${r.label.padEnd(10, ' ')}${r.path}`
  ),
]

const HELP_LINES = [
  'Available commands:',
  '  home       go to the home page',
  '  projects   view projects',
  '  about      read about me',
  '  contact    get in touch',
  '  help       show this list',
  '  clear      clear the terminal',
]

// Terminal is intentionally "dumb": it only ever echoes fixed strings and
// looks commands up in NOT_FOUND_ROUTES. User input is never interpreted
// as HTML/JS and never used to build a URL directly.
export default function NotFoundTerminal({ lines, pushLines, clearLines, goTo }) {
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState('')
  const logRef = useRef(null)
  const introStarted = useRef(false)

  // Reveal the diagnostic intro once, on mount.
  useEffect(() => {
    if (introStarted.current) return
    introStarted.current = true

    const introLines = buildIntroLines()

    if (prefersReducedMotion) {
      pushLines(introLines)
      return
    }

    let index = 0
    const id = window.setInterval(() => {
      pushLines([introLines[index]])
      index += 1
      if (index >= introLines.length) window.clearInterval(id)
    }, 200)

    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [lines])

  function handleSubmit(e) {
    e.preventDefault()
    const raw = value.trim()
    setValue('')
    if (!raw) return

    pushLines([`$ ${raw}`])
    const command = raw.toLowerCase()

    if (command === 'help') {
      pushLines(HELP_LINES)
      return
    }
    if (command === 'clear') {
      clearLines()
      return
    }
    if (NOT_FOUND_ROUTES[command]) {
      goTo(command)
      return
    }
    pushLines(['Command not recognized.', 'Try: help'])
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">portfolio — 404</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-56 md:h-64 overflow-y-auto px-4 py-3 font-mono text-xs md:text-sm space-y-1"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap text-foreground/90">
            {line || '\u00A0'}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
        <label htmlFor="notfound-terminal-input" className="text-muted-foreground font-mono text-sm select-none">
          $
        </label>
        <input
          id="notfound-terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="type 'help'"
          autoComplete="off"
          spellCheck="false"
          className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </form>
    </div>
  )
}
