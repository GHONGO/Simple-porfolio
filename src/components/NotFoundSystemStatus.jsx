import React from 'react'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'

// Mirrors the terminal's checklist in a compact status-panel format, per
// the reference design. Green is used as a literal (not a theme token)
// because "status: OK" green is a near-universal convention — same
// justification as the terminal's traffic-light dots. dark: variants
// keep it readable on a white background in light mode.
export default function NotFoundSystemStatus() {
  return (
    <div className="w-52 sm:w-60 rounded-lg border border-border bg-card/95 backdrop-blur-sm p-4 font-mono text-[11px] leading-relaxed shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wide font-semibold">
          System status
        </span>
      </div>

      <p className="text-muted-foreground">&gt; Scanning available routes...</p>

      <ul className="mt-2 space-y-1">
        {Object.values(NOT_FOUND_ROUTES).map((route) => (
          <li key={route.path} className="flex items-center justify-between gap-3">
            <span className="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              ✓ {route.label}
            </span>
            <span className="text-muted-foreground truncate">{route.path}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3">
        <span className="text-emerald-600 dark:text-emerald-400">All systems operational.</span>{' '}
        <span className="text-muted-foreground">→ Choose a destination.</span>
      </p>
    </div>
  )
}
