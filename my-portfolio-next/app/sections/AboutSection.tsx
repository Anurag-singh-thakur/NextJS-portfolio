'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaNodeJs, 
  FaReact, 
  FaGithub, 
  FaHackerrank,
  FaUniversity,
  FaAward
} from 'react-icons/fa'
import { 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiC, 
  SiCplusplus, 
  SiMongodb, 
  SiLeetcode,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiKubernetes
} from 'react-icons/si'

const SKILLS = [
  { 
    category: 'Frontend', 
    skills: [
      { name: 'React', icon: <SiJavascript size={28} className="text-yellow-500" />, level: 95 },
      { name: 'Next.js', icon: <SiNextdotjs size={28} className="text-black" />, level: 90 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} className="text-teal-400" />, level: 88 },
      { name: 'HTML5', icon: <SiHtml5 size={28} className="text-orange-500" />, level: 98 },
      { name: 'CSS3', icon: <SiCss3 size={28} className="text-blue-500" />, level: 92 },
    ]
  },
  { 
    category: 'Backend', 
    skills: [
      { name: 'Node.js', icon: <FaNodeJs size={28} className="text-green-600" />, level: 90 },
      { name: 'MongoDB', icon: <SiMongodb size={28} className="text-green-500" />, level: 85 },
      { name: 'TypeScript', icon: <SiTypescript size={28} className="text-blue-500" />, level: 88 },
    ]
  },
  { 
    category: 'Programming', 
    skills: [
      { name: 'C', icon: <SiC size={28} className="text-purple-500" />, level: 95 },
      { name: 'C++', icon: <SiCplusplus size={28} className="text-blue-600" />, level: 92 },
      { name: 'Python', icon: <SiPython size={28} className="text-blue-400" />, level: 85 },
    ]
  },
  { 
    category: 'DevOps', 
    skills: [
      { name: 'Docker', icon: <SiDocker size={28} className="text-blue-600" />, level: 75 },
      { name: 'Kubernetes', icon: <SiKubernetes size={28} className="text-blue-400" />, level: 70 },
      { name: 'GitHub', icon: <FaGithub size={28} className="text-gray-600" />, level: 90 },
    ]
  }
]

const techIcons = [
  { icon: <FaCode size={40} />, className: 'text-green-400' },
  { icon: <FaLaptopCode size={40} />, className: 'text-blue-400' },
  { icon: <FaDatabase size={40} />, className: 'text-red-400' },
  { icon: <FaNodeJs size={40} />, className: 'text-yellow-400' },
  { icon: <FaReact size={40} />, className: 'text-cyan-400' },
  { icon: <SiJavascript size={40} />, className: 'text-yellow-500' },
  { icon: <SiTypescript size={40} />, className: 'text-blue-500' },
  { icon: <SiHtml5 size={40} />, className: 'text-orange-500' },
  { icon: <SiCss3 size={40} />, className: 'text-blue-400' },
  { icon: <SiC size={40} />, className: 'text-purple-500' },
  { icon: <SiCplusplus size={40} />, className: 'text-blue-600' },
  { icon: <SiMongodb size={40} />, className: 'text-green-500' },
  { icon: <SiNextdotjs size={40} />, className: 'text-black' },
  { icon: <SiTailwindcss size={40} />, className: 'text-teal-400' },
  { icon: <FaGithub size={40} />, className: 'text-gray-600' },
  { icon: <FaHackerrank size={40} />, className: 'text-green-600' },
  { icon: <SiLeetcode size={40} />, className: 'text-orange-400' },
]

const AboutSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const categories = SKILLS.map(s => s.category)
      const currentIndex = categories.indexOf(activeCategory)
      const nextIndex = (currentIndex + 1) % categories.length
      setActiveCategory(categories[nextIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [activeCategory])

  return (
    <section 
      id="about" 
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
      >
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <FaUniversity className="text-blue-300 mr-4" size={40} />
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">About Me</h2>
          <FaAward className="text-purple-300 ml-4" size={40} />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {SKILLS.map(({ category }) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILLS.find(s => s.category === activeCategory)?.skills.map((skill) => (
              <motion.div 
                key={skill.name}
                className="bg-white/20 p-4 rounded-xl flex flex-col items-center space-y-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl">{skill.icon}</div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredSkill === skill.name ? `${skill.level}%` : '0%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-medium">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default AboutSection

