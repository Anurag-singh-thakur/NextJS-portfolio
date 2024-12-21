'use client'

import React, { useState, useEffect } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import { client } from '@/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
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

// Image URL builder
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

const BACKGROUND_ICONS = [
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

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([])
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await client.fetch(`
          *[_type == "skill"] {
            _id,
            name,
            image
          }
        `)
        setSkills(skillsData)
      } catch (error) {
        console.error("Error fetching skills:", error)
      }
    }

    fetchSkills()
  }, [])

  return (
    <motion.section 
      id="skills" 
      style={{ scale, opacity }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6 relative overflow-hidden"
    >
      {BACKGROUND_ICONS.map((item, index) => (
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
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10 w-full"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Technical Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center 
                         border border-white/20 hover:border-blue-400 
                         transition-all duration-300 ease-in-out transform hover:-translate-y-2 
                         hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/5 rounded-full p-3">
                <img 
                  src={urlFor(skill.image).url()} 
                  alt={skill.name} 
                  className="max-w-full max-h-full object-contain filter invert"
                />
              </div>
              <h3 className="text-sm font-semibold text-center text-blue-300">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default SkillsSection

