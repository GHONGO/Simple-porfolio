import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { NOT_FOUND_ROUTES } from '../data/notFoundRoutes'
import NotFoundTerminal from '../components/NotFoundTerminal'
import NotFoundMap from '../components/NotFoundMap'

export default function NotFound() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [lines, setLines] = useState([])

  const pushLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const clearLines = useCallback(() => setLines([]), [])

  // Shared by the terminal ("projects" command) and the map (clicking a
  // node): announce the route, then navigate. Only ever called with a
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
      className="w-full min-h-[calc(100vh-6rem)] pt-32 md:pt-28 pb-16 md:pb-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-sm text-muted-foreground">404</span>
          <h1 id="not-found-heading" className="mt-2 text-4xl md:text-6xl font-bold text-foreground">
            You&apos;re off the map.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-md">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you somewhere useful.
          </p>

          <div className="mt-8">
            <NotFoundTerminal
              lines={lines}
              pushLines={pushLines}
              clearLines={clearLines}
              goTo={goTo}
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Try typing a command above, or use a shortcut below.
          </p>

          {/* Plain, unconditional escape hatch — works with no
              understanding of the terminal or the map. */}
          <nav aria-label="Quick navigation" className="mt-3 flex flex-wrap gap-3">
            {Object.entries(NOT_FOUND_ROUTES).map(([key, route]) => {
              const Icon = route.icon
              return (
                <Link
                  key={key}
                  to={route.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary hover:border-foreground/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  <Icon className={`w-4 h-4 ${route.colorClass}`} aria-hidden="true" />
                  {route.label}
                </Link>
              )
            })}
          </nav>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
          className="rounded-lg border border-border bg-card p-4 md:p-6"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">
            Where you can go
          </h2>
          <NotFoundMap goTo={goTo} />
          <p className="mt-4 text-xs text-muted-foreground">
            Tip: click a marker to jump straight there.
          </p>
        </motion.div>
      </div>
    </section>
  )
}