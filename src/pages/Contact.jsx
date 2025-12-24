import React, { useEffect, useState } from 'react'
import ContactForm from '../components/ContactForm'

export default function Contact() {
    const [activeTab, setActiveTab] = useState('message')
    
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        document.body.appendChild(script)
        
        return () => {
            document.body.removeChild(script)
        }
    }, [])
    
    // Reinitialize Calendly when switching to schedule tab
    useEffect(() => {
        if (activeTab === 'schedule' && window.Calendly) {
            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/williamghongo/schedule-meeting',
                parentElement: document.querySelector('.calendly-inline-widget')
            })
        }
    }, [activeTab])
    
    return (
        <section className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="text-gray-400 mt-2">Want to work together? Send me a message or schedule a meeting.</p>
            
            {/* Tab Navigation */}
            <div className="mt-6 flex gap-2 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('message')}
                    className={`px-6 py-3 font-semibold transition-colors ${
                        activeTab === 'message'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    Send Message
                </button>
                <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-6 py-3 font-semibold transition-colors ${
                        activeTab === 'schedule'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                    Schedule Meeting
                </button>
            </div>
            
            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'message' && <ContactForm />}
                {activeTab === 'schedule' && (
                    <div 
                        className="calendly-inline-widget" 
                        data-url="https://calendly.com/williamghongo/schedule-meeting"
                        style={{ minWidth: '320px', height: '700px' }}
                    ></div>
                )}
            </div>
        </section>
    )
}