import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="mt-4 text-foreground">I’m a software engineer who treats code as a tool for solving real human problems. I focus on building products that feel fast, intuitive and effortless to use, not just functional, but thoughtfully designed.</p>

            <p className="mt-4 text-foreground">I specialize in creating clean, scalable, user centered applications using React, Node.js, and MongoDB. With hands on experience delivering end to end features, I’m comfortable moving from backend APIs to polished, responsive interfaces, always with performance and usability in mind.</p>

            <p className="mt-4 text-foreground">I care deeply about quality, clear architecture, readable code and experiences that simply feel right to the user. Whether I’m optimizing an API or refining a UI interaction, my goal is the same: ship reliable software that genuinely makes life easier.
When I’m not coding, I’m exploring emerging technologies and sharpening my UI/UX instincts. I don’t just build software, I build solutions designed to level up everyday experiences.</p>
            
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
