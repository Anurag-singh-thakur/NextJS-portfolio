"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaPaperPlane, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaInstagram,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaPhone,
  FaMapMarkerAlt,
  FaCode
} from 'react-icons/fa';
import { 
  SiLeetcode, 
  SiHashnode,
  SiMedium,
  SiHackerrank
} from 'react-icons/si';

const CONTACT_OPTIONS = [
  {
    icon: <FaLinkedin size={40} />,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/your-profile',
    color: 'text-blue-600 hover:text-blue-800',
    description: 'Professional Network'
  },
  {
    icon: <FaGithub size={40} />,
    name: 'GitHub',
    href: 'https://github.com/your-username',
    color: 'text-gray-800 hover:text-gray-600',
    description: 'Code Repositories'
  },
  {
    icon: <SiLeetcode size={40} />,
    name: 'LeetCode', 
    href: 'https://leetcode.com/your-username',
    color: 'text-yellow-500 hover:text-yellow-700',
    description: 'Coding Challenges'
  },
  {
    icon: <FaCode size={40} />,
    name: 'GeeksforGeeks',
    href: 'https://auth.geeksforgeeks.org/user/your-username',
    color: 'text-green-500 hover:text-green-700',
    description: 'Coding Platform'
  },
  {
    icon: <SiHackerrank size={40} />,
    name: 'HackerRank',
    href: 'https://www.hackerrank.com/your-username',
    color: 'text-green-600 hover:text-green-800',
    description: 'Programming Skills'
  },
  {
    icon: <SiHashnode size={40} />,
    name: 'Hashnode',
    href: 'https://hashnode.com/@your-username',
    color: 'text-blue-700 hover:text-blue-900',
    description: 'Tech Blog'
  },
  {
    icon: <SiMedium size={40} />,
    name: 'Medium',
    href: 'https://medium.com/@your-username',
    color: 'text-black hover:text-gray-800',
    description: 'Articles & Thoughts'
  },
  {
    icon: <FaTwitter size={40} />,
    name: 'Twitter/X',
    href: 'https://twitter.com/your-username',
    color: 'text-blue-400 hover:text-blue-600',
    description: 'Social Media'
  },
  {
    icon: <FaInstagram size={40} />,
    name: 'Instagram',
    href: 'https://www.instagram.com/your-username',
    color: 'text-pink-500 hover:text-pink-700',
    description: 'Personal Moments'
  },
  {
    icon: <FaDiscord size={40} />,
    name: 'Discord',
    href: 'https://discord.com/users/your-username',
    color: 'text-purple-500 hover:text-purple-700',
    description: 'Community'
  },
  {
    icon: <FaWhatsapp size={40} />,
    name: 'WhatsApp',
    href: 'https://wa.me/your-phone-number',
    color: 'text-green-500 hover:text-green-600',
    description: 'Direct Messaging'
  },
  {
    icon: <FaEnvelope size={40} />,
    name: 'Email',
    href: 'mailto:your.email@example.com',
    color: 'text-red-500 hover:text-red-700',
    description: 'Direct Contact'
  },
  {
    icon: <FaPhone size={40} />,
    name: 'Phone',
    href: 'tel:+11234567890',
    color: 'text-green-500 hover:text-green-700',
    description: 'Call Me'
  }
];

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', 
        formRef.current || undefined, 
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen text-white py-16 relative overflow-hidden "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          Contact Me
        </motion.h2>

        {/* Contact Form - Apple-style Document */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className=" rounded-xl shadow-2xl border border-gray-800 overflow-hidden"
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

        {/* MacOS-style Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="fixed bottom-8 inset-x-0 flex justify-center z-50"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl px-4 py-3 inline-flex items-center space-x-4">
            {CONTACT_OPTIONS.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group ${contact.color}`}
                whileHover={{ 
                  scale: 1.2,
                  translateY: -10
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 10 
                }}
                onHoverStart={() => setSelectedContact(contact)}
                onHoverEnd={() => setSelectedContact(null)}
              >
                {React.cloneElement(contact.icon, { size: 30 })}
              </motion.a>
            ))}
          </div>
          
          {/* Hover Information */}
          <AnimatePresence>
            {selectedContact && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute left-1/2 transform -translate-x-1/2 -top-16 
                  bg-white/20 backdrop-blur-xl rounded-lg 
                  px-4 py-2 text-center shadow-lg"
              >
                <h4 className="text-sm font-semibold">{selectedContact.name}</h4>
                <p className="text-xs text-gray-300">{selectedContact.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;