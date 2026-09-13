import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Home as HomeIcon,
  Mail,
  MapPin,
  UserRound,
} from 'lucide-react'

const destinations = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    hash: '#home',
    description: 'Back to the start',
    icon: HomeIcon,
    tone: 'blue',
    x: 67,
    y: 20,
    pathD: 'M48 50 C52 42 58 31 67 20',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/',
    hash: '#projects',
    description: "See what I've built",
    icon: Code2,
    tone: 'violet',
    x: 84,
    y: 36,
    pathD: 'M48 50 C57 46 69 40 84 36',
  },
  {
    id: 'about',
    label: 'About',
    path: '/',
    hash: '#about',
    description: 'Learn more about me',
    icon: UserRound,
    tone: 'green',
    x: 86,
    y: 57,
    pathD: 'M48 50 C60 49 74 53 86 57',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/',
    hash: '#contact',
    description: 'Get in touch',
    icon: Mail,
    tone: 'amber',
    x: 70,
    y: 78,
    pathD: 'M48 50 C54 58 64 69 70 78',
  },
]

const commandMap = {
  home: '#home',
  projects: '#projects',
  about: '#about',
  contact: '#contact',
}

function navigateTo(hash) {
  window.location.href = `/${hash}`
}

export default function NotFound() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [activeDestination, setActiveDestination] = useState(null)
  const inputRef = useRef(null)

  const requestedPath = useMemo(() => {
    const path = window.location.pathname || '/'
    return `${path}${window.location.search}`
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase()
    if (!command) return

    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (command === 'help') {
      setHistory((items) => [...items, { command, output: 'Available: home, projects, about, contact, help, clear' }])
      setInput('')
      return
    }

    const destination = commandMap[command]
    if (destination) {
      setActiveDestination(command)
      setHistory((items) => [...items, { command, output: `Route found. Navigating to ${destination}...` }])
      setInput('')
      window.setTimeout(() => navigateTo(destination), 450)
      return
    }

    setHistory((items) => [...items, { command, output: 'Command not recognized. Try: help' }])
    setInput('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runCommand(input)
  }

  const handleDestination = (destination) => {
    setActiveDestination(destination.id)
    setHistory((items) => [
      ...items,
      { command: `route ${destination.id}`, output: `Route found. Navigating to ${destination.hash}...` },
    ])
    window.setTimeout(() => navigateTo(destination.hash), 450)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <MapBackground activeDestination={activeDestination} onSelect={handleDestination} />

      <Navbar overlay />

      <InteractiveCompass />

      <main className="relative z-10 min-h-screen px-4 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-[1500px] flex-col justify-between gap-8">
          <section className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-background/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-500 backdrop-blur-md sm:bg-background/65 dark:border-white/25">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                404
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight text-red-500 sm:text-6xl lg:text-7xl">
                You're off the map.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-7">
                The page you're looking for doesn't exist, but don't worry. You're not lost. Let's get you back on track.
              </p>
            </motion.div>

            <Terminal
              requestedPath={requestedPath}
              input={input}
              setInput={setInput}
              inputRef={inputRef}
              history={history}
              onSubmit={handleSubmit}
            />

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-[0.14em] text-emerald-500">TIP</span>
              <span className="text-emerald-600 dark:text-emerald-400">You can also use SYSTEM STATUS.</span>
            </div>
          </section>

          <section className="flex w-full flex-wrap justify-end gap-2 pb-2 lg:pr-[20rem]">
            {destinations.map((destination) => {
              const Icon = destination.icon
              return (
                <button
                  key={destination.id}
                  type="button"
                  onClick={() => handleDestination(destination)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/70 bg-background/45 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-card/80 sm:bg-background/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/25 dark:hover:border-white/50"
                >
                  <Icon size={16} className="text-primary transition-transform group-hover:scale-110" />
                  {destination.label}
                  <ArrowUpRight size={14} className="opacity-40 transition-opacity group-hover:opacity-100" />
                </button>
              )
            })}
          </section>
        </div>
      </main>

      <SystemStatus activeDestination={activeDestination} onSelect={handleDestination} />
    </div>
  )
}

function InteractiveCompass() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [bearingText, setBearingText] = useState('0° N')

  const spinCompass = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setBearingText('Finding bearing...')

    const randomOffset = Math.floor(Math.random() * 40 - 20)
    const nextRotation = rotation + 1080 + randomOffset
    setRotation(nextRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const degrees = Math.abs(Math.floor(((nextRotation % 360) + 360) % 360))
      setBearingText(`Bearing: ${degrees}° N`)
    }, 2200)
  }

  return (
    <aside className="fixed right-4 top-20 z-30 pointer-events-auto sm:right-8 sm:top-28">
      <button
        type="button"
        onClick={spinCompass}
        aria-label="Interactive compass - click to recalibrate bearing"
        title="Click compass to spin & recalibrate bearing"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-border/70 bg-background/45 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-red-500/50 hover:bg-background/70 sm:h-20 sm:w-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-white/30 dark:hover:border-red-500/80"
      >
        {/* Cardinal Points & Ring Ticks */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute top-1 text-[10px] font-black text-red-500 sm:top-1.5 sm:text-xs">N</span>
          <span className="absolute right-1.5 text-[9px] font-bold text-muted-foreground sm:right-2 sm:text-[10px]">E</span>
          <span className="absolute bottom-1 text-[9px] font-bold text-muted-foreground sm:bottom-1.5 sm:text-[10px]">S</span>
          <span className="absolute left-1.5 text-[9px] font-bold text-muted-foreground sm:left-2 sm:text-[10px]">W</span>

          {/* SVG Ring Ticks */}
          <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 3" />
            <line x1="77" y1="23" x2="73" y2="27" stroke="currentColor" strokeWidth="1" />
            <line x1="77" y1="77" x2="73" y2="73" stroke="currentColor" strokeWidth="1" />
            <line x1="23" y1="77" x2="27" y2="73" stroke="currentColor" strokeWidth="1" />
            <line x1="23" y1="23" x2="27" y2="27" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Spinning Needle */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full w-full items-center justify-center pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md">
            {/* North Point (Red) */}
            <polygon points="50,14 43,50 50,46" fill="#ef4444" />
            <polygon points="50,14 57,50 50,46" fill="#dc2626" />
            {/* South Point (Muted) */}
            <polygon points="50,86 43,50 50,54" fill="#94a3b8" />
            <polygon points="50,86 57,50 50,54" fill="#64748b" />
            {/* Brass Pivot */}
            <circle cx="50" cy="50" r="5.5" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="2.2" fill="#ef4444" />
          </svg>
        </motion.div>

        {/* Bearing Badge Tooltip */}
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[9px] text-muted-foreground shadow-md backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 sm:text-[10px] dark:border-white/25">
          {bearingText}
        </span>
      </button>
    </aside>
  )
}

function Terminal({ requestedPath, input, setInput, inputRef, history, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="mt-6 w-full max-w-[650px] overflow-hidden rounded-xl border border-border/70 bg-background/40 shadow-2xl shadow-black/10 backdrop-blur-xl sm:mt-8 sm:bg-background/60 dark:border-white/25 dark:shadow-white/5"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-background/30 px-4 py-3 text-xs font-mono text-muted-foreground backdrop-blur-md dark:border-white/15">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 tracking-wide">PORTFOLIO TERMINAL: 404</span>
      </div>

      <div className="min-h-[240px] px-4 py-4 font-mono text-xs leading-6 sm:min-h-[260px] sm:px-5 sm:py-5 sm:text-sm">
        <div className="text-foreground">
          <span className="text-primary">$</span> locate {requestedPath || '/unknown-route'}
        </div>
        <div className="mt-3 text-muted-foreground">Searching for the requested page...</div>
        <div className="mt-1 flex items-center gap-3 text-primary">
          <span className="tracking-[0.18em]">████████████████████</span>
          <span>100%</span>
        </div>
        <div className="mt-2 text-red-500">✕ 404 - Page not found</div>
        <div className="mt-2 text-muted-foreground">Checking available routes...</div>
        <div className="mt-1 space-y-0.5">
          <div><span className="text-emerald-500">✓</span> /</div>
          <div><span className="text-emerald-500">✓</span> /#projects</div>
          <div><span className="text-emerald-500">✓</span> /#about</div>
          <div><span className="text-emerald-500">✓</span> /#contact</div>
        </div>

        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`} className="mt-2">
            <div><span className="text-primary">$</span> {entry.command}</div>
            <div className="text-muted-foreground">{entry.output}</div>
          </div>
        ))}

        <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 dark:border-white/15">
          <span className="text-primary">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="404 terminal command"
            autoComplete="off"
            spellCheck="false"
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
            placeholder="type 'help'"
          />
          <button type="submit" className="sr-only">Run command</button>
        </form>
      </div>
    </motion.div>
  )
}

function SystemStatus({ activeDestination, onSelect }) {
  const [isClosed, setIsClosed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640
    }
    return false
  })

  if (isClosed) {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsClosed(false)}
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-500 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-background/80 sm:bottom-5 sm:right-5 lg:right-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/30"
        aria-label="Open system status"
        title="Click to expand system status"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        <span>System status</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 text-muted-foreground"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </motion.button>
    )
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="fixed bottom-4 right-4 z-30 w-[240px] overflow-hidden rounded-xl border border-border/70 bg-background/40 p-3.5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:bottom-5 sm:right-5 sm:w-[270px] sm:bg-background/65 sm:p-4 lg:right-8 dark:border-white/25 dark:shadow-white/5"
      aria-label="System route status"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          System status
        </div>
        <button
          type="button"
          onClick={() => setIsClosed(true)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Close system status"
          title="Minimize system status"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2 border-b border-border/60 pb-2.5 font-mono text-xs text-muted-foreground sm:pb-3 dark:border-white/15">
        <ChevronRight size={13} />
        Scanning available routes...
      </div>
      <div className="mt-2 space-y-1.5 font-mono text-xs">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination)}
            className={`flex w-full items-center justify-between rounded px-1.5 py-1 text-left transition-colors hover:bg-secondary/70 ${activeDestination === destination.id ? 'bg-secondary/80 font-medium' : ''}`}
          >
            <span className="flex items-center gap-2 text-emerald-500">
              <Check size={13} /> {destination.label}
            </span>
            <span className="text-primary/80">{destination.hash}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 border-t border-border/60 pt-2.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 sm:pt-3 dark:border-white/15">
        All systems operational.
      </div>
    </motion.aside>
  )
}

function MapBackground({ activeDestination, onSelect }) {
  const handleMarkerClick = (e, destination) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(destination)
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-75 dark:opacity-55"
        aria-hidden="true"
      >
        <defs>
          <pattern id="map-grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="currentColor" strokeWidth="0.035" className="text-foreground/10" />
          </pattern>
          <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.45" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill="url(#map-grid)" />

        <path d="M0 24 C16 20 24 31 38 26 S63 17 78 26 S93 31 100 26" fill="none" stroke="currentColor" strokeWidth="0.12" className="text-foreground/10" />
        <path d="M0 69 C14 64 26 74 39 68 S67 58 78 69 S92 78 100 70" fill="none" stroke="currentColor" strokeWidth="0.12" className="text-foreground/10" />
        <path d="M20 0 C26 16 20 31 26 47 S37 72 31 100" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-foreground/10" />
        <path d="M58 0 C52 19 62 32 57 48 S52 79 60 100" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-foreground/10" />

        <path d="M92 -4 C86 13 95 23 90 37 S80 58 86 71 S95 91 88 104" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-primary/10" />
        <path d="M92 -4 C86 13 95 23 90 37 S80 58 86 71 S95 91 88 104" fill="none" stroke="currentColor" strokeWidth="0.32" strokeDasharray="1.5 1.2" className="text-primary/25" />

        {destinations.map((destination) => (
          <motion.path
            key={destination.id}
            d={destination.pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth={activeDestination === destination.id ? '0.38' : '0.25'}
            strokeDasharray="1.7 1.1"
            filter={activeDestination === destination.id ? 'url(#route-glow)' : undefined}
            className={
              destination.tone === 'blue'
                ? 'text-blue-500/80'
                : destination.tone === 'violet'
                  ? 'text-violet-500/80'
                  : destination.tone === 'green'
                    ? 'text-emerald-500/80'
                    : 'text-amber-500/80'
            }
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25 + destinations.indexOf(destination) * 0.12 }}
          />
        ))}
      </svg>

      {/* Map marker & description card acting as a link */}
      <a
        href="/#home"
        onClick={(e) => handleMarkerClick(e, destinations[0])}
        className="pointer-events-auto absolute left-[48%] top-[50%] -translate-x-1/2 -translate-y-1/2 group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded-full cursor-pointer"
        aria-label="You are here - Click to return home"
        title="Return to Home"
      >
        <div className="relative transition-transform duration-200 group-hover:scale-110">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-[-18px] rounded-full bg-red-500/20"
          />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-red-500/50 bg-background/45 text-red-500 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:border-red-500 group-hover:bg-red-500/10 group-hover:shadow-red-500/20 sm:bg-background/65 dark:border-red-500/70">
            <MapPin size={22} />
          </div>
        </div>

        <div className="absolute left-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background/45 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-200 group-hover:border-red-500/50 group-hover:bg-card group-hover:scale-105 group-hover:shadow-md sm:block sm:bg-background/65 dark:border-white/25 dark:group-hover:border-red-500/70">
          <span className="text-red-500">You are here</span>
          <span className="ml-2 text-muted-foreground transition-colors group-hover:text-foreground">(but not where you should be)</span>
        </div>
      </a>

      {destinations.map((destination) => {
        const Icon = destination.icon
        return (
          <button
            key={destination.id}
            type="button"
            onClick={(e) => handleMarkerClick(e, destination)}
            className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 text-left transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeDestination === destination.id ? 'scale-105' : ''
              }`}
            style={{ left: `${destination.x}%`, top: `${destination.y}%` }}
            aria-label={`Go to ${destination.label}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-background/45 shadow-lg backdrop-blur-md sm:bg-background/65 ${toneClasses[destination.tone]}`}>
                <Icon size={18} />
              </div>
              <div className="hidden min-w-[145px] rounded-lg border border-border/70 bg-background/45 px-3 py-2 shadow-lg backdrop-blur-md sm:block sm:bg-background/65 dark:border-white/25">
                <div className="text-sm font-semibold text-foreground">{destination.label}</div>
                <div className="text-xs text-muted-foreground">{destination.description}</div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

const toneClasses = {
  blue: 'border-blue-500/50 text-blue-500',
  violet: 'border-violet-500/50 text-violet-500',
  green: 'border-emerald-500/50 text-emerald-500',
  amber: 'border-amber-500/50 text-amber-500',
}
