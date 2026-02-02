import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="mt-4 text-foreground">I’m a Software Engineer who believes that code is a tool for solving human problems. I specialize in building clean, scalable and user centered applications moving beyond 'just functional' to create experiences that are fast and intuitive.</p>

            <p className="mt-4 text-foreground">With a core stack of React, Node.js, and MongoDB, I’ve spent the last few years refining my ability to architect end to end products. Whether I’m optimizing a backend API for speed or polishing a responsive interface, my goal is always the same: shipping high quality work that makes life easier for the end user.</p>

            <p className="mt-4 text-foreground">When I’m not at my desk, I’m exploring emerging tech or refining my UI/UX concepts. I don't just build software; I build solutions that level up every day.

            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border p-4 rounded">
                    <h4 className="font-semibold">Skills</h4>
                    <ul className="mt-2 text-foreground space-y-1">
                        <li>React </li>
                        <li>Tailwind • Bootstrap</li>
                        <li>Node.js • Express</li>
                        <li>MongoDB</li>
                        <li>SQL</li>
                        <li>APIs</li>
                        <li>Testing</li>
                        <li>Version Control</li>
                        <li>Automations</li>
                        <li>SEO</li>
                    </ul>
                </div>
                <div className="bg-card border border-border p-4 rounded">
                    <h4 className="font-semibold">Tools</h4>
                    <ul className="mt-2 text-foreground space-y-1">
                        <li>N8N</li>
                        <li>Git & GitHub</li>
                        <li>Postman</li>
                        <li>Wordpress</li>
                    </ul>
                </div>
            </div>
        </motion.section>
    )
}
