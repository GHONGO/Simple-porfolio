import React from 'react'
import { Link } from 'react-router-dom'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'

const CURRENT_POSITION = { x: 18, y: 50 }

const DESTINATIONS = [
  { key: 'home', x: 50, y: 18 },
  { key: 'projects', x: 82, y: 38 },
  { key: 'about', x: 82, y: 66 },
  { key: 'contact', x: 50, y: 86 },
]

// Lines are purely decorative (aria-hidden). Every real interaction is a
// normal <Link> — keyboard-focusable, screen-reader-visible, works even
// if a click handler fails for any reason.
//
// aspect-square on narrow screens gives labels more vertical room than a
// wide 4:3 box would; aspect-[4/3] kicks in once the map has a full
// desktop column to itself (md:).
export default function NotFoundMap({ goTo }) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {DESTINATIONS.map((d) => (
          <line
            key={d.key}
            x1={CURRENT_POSITION.x}
            y1={CURRENT_POSITION.y}
            x2={d.x}
            y2={d.y}
            stroke="var(--border)"
            strokeWidth="0.6"
            strokeDasharray="2.5 2.5"
          />
        ))}
      </svg>

      {/* current (invalid) location */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
        style={{ left: `${CURRENT_POSITION.x}%`, top: `${CURRENT_POSITION.y}%` }}
      >
        <span className="w-3 h-3 rounded-full bg-muted-foreground ring-4 ring-muted-foreground/15" />
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground whitespace-nowrap">
          You are here
        </span>
      </div>

      {DESTINATIONS.map((d) => {
        const route = NOT_FOUND_ROUTES[d.key]
        return (
          <Link
            key={d.key}
            to={route.path}
            onClick={(e) => {
              // Intercept so the terminal can announce the route before
              // navigating — see NotFound.jsx's goTo(). Still a real
              // <a href>, so it degrades gracefully and stays keyboard
              // operable if JS handling ever fails.
              e.preventDefault()
              goTo(d.key)
            }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-full p-2.5 min-w-[44px] min-h-[44px] justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <span className="w-3 h-3 rounded-full bg-primary transition-transform duration-200 group-hover:scale-125" />
            <span className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap opacity-75 group-hover:opacity-100">
              {route.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
