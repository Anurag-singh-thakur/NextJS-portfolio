'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import { 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaNodeJs, 
  FaReact, 
  FaGithub, 
  FaHackerrank 
} from 'react-icons/fa'
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiSanity, 
  SiMongodb, 
  SiLeetcode 
} from 'react-icons/si'

const techIcons = [
  { icon: <FaCode size={40} />, className: 'text-green-400' },
  { icon: <FaLaptopCode size={40} />, className: 'text-blue-400' },
  { icon: <FaDatabase size={40} />, className: 'text-red-400' },
  { icon: <FaNodeJs size={40} />, className: 'text-yellow-400' },
  { icon: <FaReact size={40} />, className: 'text-cyan-400' },
  { icon: <SiJavascript size={40} />, className: 'text-yellow-500' },
  { icon: <SiTypescript size={40} />, className: 'text-blue-500' },
  { icon: <SiNextdotjs size={40} />, className: 'text-white' },
  { icon: <SiSanity size={40} />, className: 'text-red-500' },
  { icon: <SiMongodb size={40} />, className: 'text-green-500' },
  { icon: <FaGithub size={40} />, className: 'text-gray-400' },
  { icon: <FaHackerrank size={40} />, className: 'text-green-600' },
  { icon: <SiLeetcode size={40} />, className: 'text-orange-400' },
]

const HomeSection: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5])

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6 relative overflow-hidden"
    >
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
          }}
          className={`absolute z-0 ${item.className}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl relative z-10 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Anurag Kumar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="text-lg md:text-xl mt-2 text-blue-300 font-semibold"
          >
            MERN | TypeScript | Next.js | Sanity
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            className="mt-4 text-gray-300 leading-relaxed"
          >
            Welcome to my portfolio! I am a MERN stack developer with a strong knowledge of Data Structures and Algorithms (DSA). I also have expertise in Next.js, TypeScript, and Sanity. Here you can find my projects, skills, and blogs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
            className="mt-6 flex space-x-4"
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="lg:w-1/2 mt-6 lg:mt-0 flex justify-center"
          style={{ scale, rotate }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 1
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <img
              src='/images/p7.jpg'
              alt="Anurag Kumar"
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover 
                border-4 border-white
                shadow-2xl 
                transition-all duration-300 ease-in-out
                relative z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeSection

