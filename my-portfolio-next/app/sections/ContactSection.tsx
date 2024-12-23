'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  FaPaperPlane, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaInstagram,
  FaDiscord,
  FaWhatsapp,
  FaPhone,
  FaCode
} from 'react-icons/fa'
import { 
  SiLeetcode
} from 'react-icons/si'

const CONTACT_OPTIONS = [
  {
    icon: <FaLinkedin />,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anurag-kumar-b64140284/',
    color: 'text-blue-600 hover:text-blue-800',
    description: 'Professional Network'
  },
  {
    icon: <FaGithub />,
    name: 'GitHub',
    href: 'https://github.com/Anurag-singh-thakur',
    color: 'text-gray-800 hover:text-gray-600',
    description: 'Code Repositories'
  },
  {
    icon: <SiLeetcode />,
    name: 'LeetCode', 
    href: 'https://leetcode.com/u/anurag_rajput_013/',
    color: 'text-yellow-500 hover:text-yellow-700',
    description: 'Coding Challenges'
  },
  {
    icon: <FaCode />,
    name: 'GeeksforGeeks',
    href: 'https://www.geeksforgeeks.org/user/singhanutxbu/',
    color: 'text-green-500 hover:text-green-700',
    description: 'Coding Platform'
  },
  {
    icon: <FaTwitter />,
    name: 'Twitter/X',
    href: 'https://x.com/anurags013',
    color: 'text-blue-400 hover:text-blue-600',
    description: 'Social Media'
  },
  {
    icon: <FaInstagram />,
    name: 'Instagram',
    href: 'https://www.instagram.com/4nurag_rajput/profilecard/?igsh=aHc4azd4c2dxaG55',
    color: 'text-pink-500 hover:text-pink-700',
    description: 'Personal Moments'
  },
  {
    icon: <FaDiscord />,
    name: 'Discord',
    href: 'https://discord.com/users/your-username',
    color: 'text-purple-500 hover:text-purple-700',
    description: 'Community'
  },
  {
    icon: <FaWhatsapp />,
    name: 'WhatsApp',
    href: 'https://wa.me/9719877462',
    color: 'text-green-500 hover:text-green-600',
    description: 'Direct Messaging'
  },
  {
    icon: <FaEnvelope />,
    name: 'Email',
    href: 'mailto:singhanurag1309@gmail.com',
    color: 'text-red-500 hover:text-red-700',
    description: 'Direct Contact'
  },
  {
    icon: <FaPhone />,
    name: 'Phone',
    href: 'tel:+91 9719877462',
    color: 'text-green-500 hover:text-green-700',
    description: 'Call Me'
  }
]

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', 
        formRef.current! ,
        
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Email send error:', error)
      setStatus('error')
    }
  }

  return (
    <section 
      id="contact" 
      className="min-h-screen text-white py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Contact Me
        </motion.h2>

        {/* Contact Form - Apple-style Document */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl shadow-2xl border border-gray-800 overflow-hidden max-w-3xl mx-auto"
        >
          <div className="bg-[#2c2c2c] p-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Optional"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Purpose of Contact"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#2a3342] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message here..."
              />
            </div>
            
            {status === 'success' && (
              <div className="text-green-500 text-center mt-4">
                Message sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-500 text-center mt-4">
                Failed to send message. Please try again.
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-700">
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white 
                  ${status === 'sending' 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
              >
                {status === 'sending' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Responsive Contact Options */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Connect With Me</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center">
            {CONTACT_OPTIONS.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group ${contact.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center">
                  {React.cloneElement(contact.icon, { size: 40 })}
                  <span className="mt-2 text-xs text-center">{contact.name}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection

