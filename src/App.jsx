import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Squares from './components/Squares'

export default function App() {
  return (
    /* 1. Changed bg-black to bg-background and text-white to text-foreground */
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground font-inter selection:bg-cyan-500 selection:text-black scroll-smooth transition-colors duration-300">

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div className="w-full h-full opacity-10">
          <Squares
            direction="diagonal"
            speed={0.5}
            squareSize={40}
            /* 2. These might need manual logic or CSS variables to change, 
               but for now, we'll keep them subtle */
            borderColor="var(--border)"
            hoverFillColor="var(--accent)"
          />
        </div>

        {/* 3. Changed from-black to from-background to match the theme flip */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="container mx-auto px-6 w-full max-w-[100vw] overflow-hidden">
          <section id="home" className="w-full min-h-screen flex flex-col justify-start md:justify-center pt-32 md:pt-20">
            <Home />
          </section>

          <section id="about" className="min-h-screen flex items-center justify-center py-12 md:py-20">
            <About />
          </section>

          <section id="projects" className="min-h-screen py-12 md:py-20">
            <Projects />
          </section>

          <section id="contact" className="min-h-[80vh] flex items-center justify-center py-12 md:py-20">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
