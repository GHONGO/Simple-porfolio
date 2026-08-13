import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    // Removed 'Switch Theme' from here to handle it separately with icons
]

export default function Navbar() {
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
            className="fixed w-full z-50 bg-background/90 border-b border-border backdrop-blur-md"
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
                        <a href="#home" className="text-foreground font-bold block leading-tight">Griffin Hongo</a>
                        <span className="text-xs text-muted-foreground">Software Engineer</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {links.map(l => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="text-sm text-muted-foreground hover:text-foreground hover:font-semibold transition-colors cursor-pointer"
                        >
                            {l.label}
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

                    <a
                        href={cvUrl}
                        download="Griffin_Hongo's_Resume.pdf"
                        className="ml-4 inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        Download CV
                    </a>
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
                            className="block text-foreground hover:text-primary text-sm cursor-pointer"
                        >
                            {l.label}
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

                    <a
                        href={cvUrl}
                        download="Griffin_Hongo's_Resume.pdf"
                        onClick={() => setOpen(false)}
                        className="block mt-2 px-3 py-2 bg-primary text-primary-foreground rounded text-center text-sm font-bold"
                    >
                        Download CV
                    </a>
                </div>
            )}
        </div>
    )
}
