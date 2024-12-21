'use client'

import React, { useEffect, useState } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import { client } from '@/sanityClient'
import { Project } from '../types'
import imageUrlBuilder from '@sanity/image-url'
import { 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaNodeJs, 
  FaReact, 
  FaGithub, 
  FaHackerrank, 
  FaArrowRight, 
  FaArrowLeft,
  FaExternalLinkAlt
} from 'react-icons/fa'
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiSanity, 
  SiMongodb, 
  SiLeetcode 
} from 'react-icons/si'
import Link from 'next/link'

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

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await client.fetch<Project[]>('*[_type == "project"]{_id, title, description, images, githubLink, liveLink}')
      setProjects(projectsData)
      const initialImageIndices = projectsData.reduce((acc, project) => {
        acc[project._id] = 0
        return acc
      }, {} as { [key: string]: number })
      setCurrentImageIndex(initialImageIndices)
    }
    fetchProjects()
  }, [])

  const handleNextImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }))
  }

  const handlePrevImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalImages) % totalImages
    }))
  }

  const truncateDescription = (description: string, maxWords: number = 20) => {
    const words = description.split(' ')
    return words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...' 
      : description
  }

  return (
    <motion.section 
      id="projects" 
      style={{ scale, opacity }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white px-4 py-16 md:px-6 lg:px-8 relative overflow-hidden"
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
        className="w-full max-w-7xl relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Projects
        </h2>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
                         transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                         hover:shadow-blue-500/20 group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <>
                    <motion.img 
                      src={urlFor(project.images[currentImageIndex[project._id]]).url()} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    {project.images.length > 1 && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-black/50 backdrop-blur-sm">
                        <span className="text-white text-sm">
                          {`${currentImageIndex[project._id] + 1} / ${project.images.length}`}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button 
                            onClick={() => handlePrevImage(project._id, project.images.length)}
                            className="text-white hover:text-blue-400 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaArrowLeft />
                          </motion.button>
                          <motion.button 
                            onClick={() => handleNextImage(project._id, project.images.length)}
                            className="text-white hover:text-blue-400 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaArrowRight />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
    
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-blue-300 mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow text-sm">
                  {truncateDescription(project.description)}
                </p>
                
                <div className="flex flex-col space-y-3 mt-auto">
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/projects/${project._id}`} 
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm font-medium"
                    >
                      Read More <FaArrowRight className="ml-2" />
                    </Link>
                    
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <motion.a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-white/10 text-gray-300 hover:text-white hover:bg-blue-500/20
                                     px-3 py-1 rounded-md text-sm flex items-center space-x-2
                                     transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                          <span>GitHub</span>
                        </motion.a>
                      )}
                      
                      {project.liveLink && (
                        <motion.a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-white/10 text-gray-300 hover:text-white hover:bg-purple-500/20
                                     px-3 py-1 rounded-md text-sm flex items-center space-x-2
                                     transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default ProjectsSection

