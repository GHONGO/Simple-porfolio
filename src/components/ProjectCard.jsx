import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
    return (
        <motion.a
            href={project.link || '#'} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            className="block bg-card border border-border rounded-lg overflow-hidden"
        >
            <div className="h-44 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
                {project.image ? <img src={project.image} alt={project.title} className="object-cover h-full w-full" loading="lazy" />
                    : <div className="text-foreground">{project.title}</div>}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <h3 className="font-semibold text-sm text">{project.login}</h3>
                <p className="text-sm text-foreground mt-1">{project.summary}</p>
                <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-foreground">{project.tech.join(' • ')}</div>
                    <div className="text-xs text-primary">View</div>
                </div>
            </div>
        </motion.a>
    )
}
