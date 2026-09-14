import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
    // Removed 'Switch Theme' from here to handle it separately with icons
]

export default function Navbar({ overlay = false }) {
    const cvUrl = "/Griffin%20Hongo%27s%20RESUME.pdf";
    const [isDark, setIsDark] = useState(false);

    // Sync state with DOM on mount
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = (e) => {
        if (e) e.preventDefault();
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 border-b border-border backdrop-blur-md transition-colors duration-300 ${overlay ? 'bg-background/55' : 'bg-background/90'}`}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text
                                x="12"
                                y="17"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="700"
                                fontFamily="Inter, sans-serif"
                                fill="currentColor"
                            >
                                GH
                            </text>
                        </svg>
                    </div>
                    <div>
                        <a href="/#home" className="text-foreground font-bold block leading-tight">Griffin Hongo</a>
                        <span className="text-xs text-muted-foreground">Software Engineer</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {links.map(l => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="group relative py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            <span>{l.label}</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full rounded-full" />
                        </a>
                    ))}

                    {/* Theme Toggle Icon */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-secondary transition-colors focus:outline-none"
                        title="Toggle Theme"
                    >
                        {isDark ? (
                            // Sun Icon (Show when dark, to switch to light)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41-1.41"></path>
                                <path d="m19.07 4.93-1.41-1.41"></path>
                            </svg>
                        ) : (
                            // Moon Icon (Show when light, to switch to dark)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </svg>
                        )}
                    </button>

                    <DownloadCVButton cvUrl={cvUrl} className="ml-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md shadow-sm hover:opacity-95" />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <MobileMenu links={links} cvUrl={cvUrl} toggleTheme={toggleTheme} isDark={isDark} />
                </div>
            </div>
        </motion.nav>
    )
}

function MobileMenu({ links, cvUrl, toggleTheme, isDark }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <button onClick={() => setOpen(v => !v)} className="p-2 rounded bg-secondary hover:bg-secondary/80 transition text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded shadow-lg p-3 space-y-2">
                    {links.map(l => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="group relative block w-fit py-1 text-foreground text-sm font-medium cursor-pointer"
                        >
                            <span>{l.label}</span>
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full rounded-full" />
                        </a>
                    ))}

                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={(e) => {
                            toggleTheme(e);
                            setOpen(false);
                        }}
                        className="w-full flex items-center justify-start gap-2 text-foreground hover:text-primary text-sm cursor-pointer py-1"
                    >
                        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41-1.41"></path>
                                <path d="m19.07 4.93-1.41-1.41"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </svg>
                        )}
                    </button>

                    <DownloadCVButton
                        cvUrl={cvUrl}
                        className="w-full mt-2 bg-primary text-primary-foreground font-bold text-sm rounded shadow-sm"
                        onComplete={() => setOpen(false)}
                    />
                </div>
            )}
        </div>
    )
}

function DownloadCVButton({ cvUrl, className = '', onComplete }) {
    const [status, setStatus] = useState('idle') // 'idle' | 'downloading' | 'completed'
    const [progress, setProgress] = useState(0)

    const handleDownload = (e) => {
        if (e) e.preventDefault()
        if (status !== 'idle') return

        setStatus('downloading')
        setProgress(0)

        const duration = 1800 // 1.8 seconds
        const startTime = performance.now()

        const animateProgress = (currentTime) => {
            const elapsed = currentTime - startTime
            const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100)
            setProgress(currentProgress)

            if (currentProgress < 100) {
                requestAnimationFrame(animateProgress)
            } else {
                setStatus('completed')

                // Trigger actual PDF file download
                const link = document.createElement('a')
                link.href = cvUrl
                link.download = "Griffin_Hongo's_Resume.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                if (onComplete) {
                    setTimeout(() => onComplete(), 1000)
                }

                // Reset back to idle state after 2.5s
                setTimeout(() => {
                    setStatus('idle')
                    setProgress(0)
                }, 2500)
            }
        }

        requestAnimationFrame(animateProgress)
    }

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={status === 'downloading'}
            className={`relative overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none ${className}`}
            title={status === 'completed' ? 'Resume Downloaded!' : 'Download Resume'}
            aria-label="Download CV"
        >
            {/* Animated Progress Fill (Left-to-Right) */}
            <span
                className="absolute inset-y-0 left-0 bg-emerald-500/85 dark:bg-emerald-600/85 transition-all duration-75 ease-linear pointer-events-none"
                style={{ width: `${progress}%` }}
            />

            {/* Label & Icons */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 px-4 py-2">
                {status === 'idle' && (
                    <>
                        <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download CV</span>
                    </>
                )}

                {status === 'downloading' && (
                    <span className="font-mono text-xs font-semibold text-primary-foreground tracking-wide whitespace-nowrap">
                        Downloading... {progress}%
                    </span>
                )}

                {status === 'completed' && (
                    <span className="flex items-center gap-1 text-xs font-bold text-white whitespace-nowrap">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Downloaded 100%</span>
                    </span>
                )}
            </span>
        </button>
    )
}
