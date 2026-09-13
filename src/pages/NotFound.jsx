import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'
import NotFoundTerminal from '../components/NotFoundTerminal'
import NotFoundMap from '../components/NotFoundMap'
import NotFoundSystemStatus from '../components/NotFoundSystemStatus'

export default function NotFound() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [lines, setLines] = useState([])

  const pushLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const clearLines = useCallback(() => setLines([]), [])

  // Shared by the terminal (typed route commands) and the map (clicking
  // a node): announce the route, then navigate. Only ever called with a
  // key that exists in NOT_FOUND_ROUTES — never with raw user input.
  const goTo = useCallback(
    (key) => {
      const route = NOT_FOUND_ROUTES[key]
      if (!route) return
      pushLines(['Route found.', `Navigating to ${route.path}...`])
      window.setTimeout(
        () => navigate(route.path),
        prefersReducedMotion ? 0 : 450
      )
    },
    [navigate, pushLines, prefersReducedMotion]
  )

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative w-full min-h-[calc(100vh-6rem)] overflow-hidden pt-32 md:pt-28 pb-16 md:pb-24"
    >
      {/* Full-bleed map background — only from 1280px up (xl:). Verified
          against the text column's max-w-lg (512px) plus the page's
          px-6 padding: at 1024px (lg:) the "you are here" pin would land
          UNDER the text column, so the cutover is intentionally xl:, not
          lg:. Breaks out of the site's centered `container mx-auto px-6`
          (App.jsx's <main>) so it spans the full browser width. */}
      <div className="hidden xl:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen z-0">
        <NotFoundMap goTo={goTo} fullBleed />
      </div>

      {/*
        Three-tier layout:
        - base (<768px):  single column, content then map, stacked
        - md (768–1279px): two columns side by side, content | bounded map
        - xl (1280px+):    grid collapses to block; content floats over
                            the full-bleed map background instead
      */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:block items-start gap-10 md:gap-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <span className="inline-block rounded-md border border-border px-3 py-1 font-mono text-sm text-muted-foreground">
            404
          </span>

          <h1 id="not-found-heading" className="mt-4 text-4xl md:text-6xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent">
              Oops!
            </span>{' '}
            You&apos;re off the map.
          </h1>

          <p className="mt-4 text-muted-foreground text-lg max-w-md">
            The page you&apos;re looking for doesn&apos;t exist, but don&apos;t worry — you&apos;re
            not lost. Let&apos;s get you back on track.
          </p>

          <div className="mt-8">
            <NotFoundTerminal
              lines={lines}
              pushLines={pushLines}
              clearLines={clearLines}
              goTo={goTo}
            />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Try a command:
          </p>

          {/* Plain, unconditional escape hatch — works with no
              understanding of the terminal or the map. Icons stay
              neutral here (unlike the map) so the buttons read as one
              uniform group, matching the reference. */}
          <nav aria-label="Quick navigation" className="mt-3 flex flex-wrap gap-3">
            {Object.entries(NOT_FOUND_ROUTES).map(([key, route]) => {
              const Icon = route.icon
              return (
                <Link
                  key={key}
                  to={route.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  {route.label}
                </Link>
              )
            })}
          </nav>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
            Tip: you can also click the map markers on the right.
          </p>
        </motion.div>

        {/* Bounded map — visible stacked-below on phones and side-by-side
            on tablet/small-desktop; replaced by the full-bleed
            background layer once xl: takes over. */}
        <div className="xl:hidden rounded-lg bg-muted/30 p-3">
          <NotFoundMap goTo={goTo} />
        </div>
      </div>

      {/* System status — 1280px+ only, floating over the map's
          bottom-right, matching the reference. */}
      <div className="absolute bottom-6 right-6 hidden xl:block z-10">
        <NotFoundSystemStatus />
      </div>
    </section>
  )
}
