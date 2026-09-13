import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'

const POSITIONS = {
  // Bounded card — used on mobile/tablet, below the content, in its own
  // small box. Same layout as before: stacked column, labels extend
  // rightward from a left-anchored current marker.
  bounded: {
    current: { x: 10, y: 50 },
    destinations: [
      { key: 'home', x: 34, y: 14 },
      { key: 'projects', x: 34, y: 38 },
      { key: 'about', x: 34, y: 62 },
      { key: 'contact', x: 34, y: 86 },
    ],
  },
  // Full-bleed — used on large screens as the page's background layer,
  // with the text column floating over the left ~40% of it. Positions
  // are shifted right so nothing sits under the text, and pulled in from
  // the far corners so nothing sits under the compass (top-right) or the
  // system status panel (bottom-right) either.
  fullBleed: {
    current: { x: 48, y: 46 },
    destinations: [
      { key: 'home', x: 62, y: 14 },
      { key: 'projects', x: 80, y: 26 },
      { key: 'about', x: 78, y: 54 },
      { key: 'contact', x: 54, y: 82 },
    ],
  },
}

function Compass() {
  return (
    <div
      className="absolute top-3 right-3 w-12 h-12 rounded-full border border-border bg-card/70 backdrop-blur-sm flex items-center justify-center z-10"
      aria-hidden="true"
    >
      <span className="absolute top-1 text-[8px] font-mono text-muted-foreground">N</span>
      <span className="absolute bottom-1 text-[8px] font-mono text-muted-foreground">S</span>
      <span className="absolute left-1.5 text-[8px] font-mono text-muted-foreground">W</span>
      <span className="absolute right-1.5 text-[8px] font-mono text-muted-foreground">E</span>
      <svg width="12" height="12" viewBox="0 0 14 14">
        <path d="M7 1 L10 9 L7 7 L4 9 Z" fill="var(--foreground)" />
      </svg>
    </div>
  )
}

// Decorative "map" texture — a handful of faint curved lines, not an
// actual map. Purely aria-hidden, colored with the existing --border
// token so it never needs its own light/dark handling.
function MapTexture() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    >
      <path d="M-5 22 C 20 10, 40 34, 60 16 S 95 28, 110 12" stroke="var(--border)" strokeWidth="0.4" fill="none" />
      <path d="M-5 58 C 25 68, 45 44, 70 64 S 95 54, 110 74" stroke="var(--border)" strokeWidth="0.4" fill="none" />
      <path d="M14 -5 C 18 28, 6 50, 22 78 S 16 108, 32 116" stroke="var(--border)" strokeWidth="0.35" fill="none" />
    </svg>
  )
}

// Every real interaction is a normal <Link> — keyboard-focusable,
// screen-reader-visible, works even if a click handler fails.
//
// fullBleed=false (default): a bounded card, used on mobile/tablet below
// the content — aspect-square/aspect-[4/3], rounded corners, its own box.
//
// fullBleed=true: fills its positioned ancestor completely (the <section>
// in NotFound.jsx does the actual full-viewport-width breakout) and adds
// a left-edge fade toward --background so the map visibly recedes under
// the floating text column instead of fighting it for attention.
export default function NotFoundMap({ goTo, fullBleed = false }) {
  const { current, destinations } = fullBleed ? POSITIONS.fullBleed : POSITIONS.bounded

  return (
    <div
      className={
        fullBleed
          ? 'relative w-full h-full overflow-hidden'
          : 'relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-lg'
      }
    >
      <MapTexture />

      {fullBleed && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent w-3/5"
          aria-hidden="true"
        />
      )}

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {destinations.map((d) => {
          const route = NOT_FOUND_ROUTES[d.key]
          const midX = (current.x + d.x) / 2
          const midY = (current.y + d.y) / 2
          return (
            <g key={d.key}>
              <line
                x1={current.x}
                y1={current.y}
                x2={d.x}
                y2={d.y}
                stroke={route.lineColor}
                strokeOpacity="0.5"
                strokeWidth="0.6"
                strokeDasharray="2.5 2.5"
              />
              <circle cx={midX} cy={midY} r="0.8" fill={route.lineColor} fillOpacity="0.7" />
            </g>
          )
        })}
      </svg>

      <Compass />

      {/* current (invalid) location */}
      <div
        className="absolute -translate-y-1/2 flex items-center gap-2 max-w-[62%]"
        style={{ left: `${current.x}%`, top: `${current.y}%` }}
      >
        <span className="relative flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-destructive/10 border border-destructive/30">
          <span
            className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
          <MapPin className="relative w-4 h-4 text-destructive" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs sm:text-sm font-semibold text-destructive whitespace-nowrap">
            You are here
          </span>
          <span className="block text-[10px] text-muted-foreground">
            (But not where you should be)
          </span>
        </span>
      </div>

      {destinations.map((d) => {
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
            className="group absolute -translate-y-1/2 flex items-center gap-2 max-w-[64%] rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <span
              className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-full border transition-transform duration-200 group-hover:scale-110 ${route.badgeClass}`}
            >
              <Icon className={`w-4 h-4 ${route.colorClass}`} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                {route.label}
              </span>
              <span className="block text-[10px] text-muted-foreground">
                {route.subtitle}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
