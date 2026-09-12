import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'

const CURRENT_POSITION = { x: 18, y: 50 }

const DESTINATIONS = [
  { key: 'home', x: 50, y: 18 },
  { key: 'projects', x: 82, y: 38 },
  { key: 'about', x: 82, y: 66 },
  { key: 'contact', x: 50, y: 86 },
]

// Lines are purely decorative (aria-hidden) and colored per-destination
// using each route's lineColor (a --chart-N CSS variable — already part
// of the theme, not a new palette). Every real interaction is a normal
// <Link> — keyboard-focusable, screen-reader-visible, works even if a
// click handler fails for any reason.
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
        {DESTINATIONS.map((d) => {
          const route = NOT_FOUND_ROUTES[d.key]
          return (
            <line
              key={d.key}
              x1={CURRENT_POSITION.x}
              y1={CURRENT_POSITION.y}
              x2={d.x}
              y2={d.y}
              stroke={route.lineColor}
              strokeOpacity="0.45"
              strokeWidth="0.7"
              strokeDasharray="2.5 2.5"
            />
          )
        })}
      </svg>

      {/* current (invalid) location */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
        style={{ left: `${CURRENT_POSITION.x}%`, top: `${CURRENT_POSITION.y}%` }}
      >
        <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-destructive/10 border border-destructive/30">
          <span
            className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
          <MapPin className="relative w-4 h-4 text-destructive" aria-hidden="true" />
        </span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground whitespace-nowrap">
          You are here
        </span>
      </div>

      {DESTINATIONS.map((d) => {
        const route = NOT_FOUND_ROUTES[d.key]
        const Icon = route.icon
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
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <span
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-transform duration-200 group-hover:scale-110 ${route.badgeClass}`}
            >
              <Icon className={`w-4 h-4 ${route.colorClass}`} aria-hidden="true" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap opacity-80 group-hover:opacity-100">
              {route.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}