import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'


export default function Footer() {
    return (
        <footer className="bg-[var(--surface)] border-t border-gray-800 mt-12">
            <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
                <div className="text-sm text-gray-400">© {new Date().getFullYear()} Griffin Hongo. All rights reserved.</div>
                <div className="flex space-x-4 mt-3 md:mt-0">
                    <a href="https://github.com/GHONGO" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                    <a href="https://www.linkedin.com/in/griffin-hongo" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"> <FaLinkedin size={24} /></a>
                    <a href="https://wa.me/+254740719552" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={24} /></a>

                </div>
            </div>
        </footer>
    )
}


