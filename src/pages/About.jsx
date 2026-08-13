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
            
            <div className="mt-6 bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-6">Tech Skills</h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="md:border-r md:border-border md:pr-6">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-4">Frontend</h5>
                        <div className="grid grid-cols-3 gap-5">
                            <SkillIcon src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" label="React" />
                            <SkillIcon src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" label="Tailwind" />
                            <SkillIcon src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" label="Bootstrap" />
                        </div>
                    </div>

                    <div className="md:border-r md:border-border md:pr-6">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-4">Backend</h5>
                        <div className="grid grid-cols-3 gap-5">
                            <SkillIcon src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" label="Node.js" />
                            <SkillIcon src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" label="Express" />
                            <SkillIcon src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" label="MongoDB" />
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" label="SQL" />
                        </div>
                    </div>

                    <div className="md:border-r md:border-border md:pr-6">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-4">Tools</h5>
                        <div className="grid grid-cols-3 gap-5">
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/n8n.svg" label="n8n" />
                            <SkillIcon src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" label="Git" />
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" label="Postman" />
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wordpress.svg" label="Wordpress" />
                        </div>
                    </div>

                    <div>
                        <h5 className="text-sm font-semibold text-muted-foreground mb-4">Testing</h5>
                        <div className="grid grid-cols-3 gap-5">
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" label="Jest" />
                            <SkillIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" label="Cypress" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                    <h5 className="text-sm font-semibold text-muted-foreground mb-3">Practices</h5>
                    <div className="flex flex-wrap gap-2">
                        {['REST APIs', 'SEO'].map((tag) => (
                            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

function SkillIcon({ src, label }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <img src={src} alt={label} className="w-10 h-10 object-contain" />
            <span className="text-xs text-foreground text-center">{label}</span>
        </div>
    )
}
