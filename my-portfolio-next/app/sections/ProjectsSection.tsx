import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/sanityClient';
import { Project } from '../types';
import imageUrlBuilder from '@sanity/image-url';
import { FaCode, FaLaptopCode, FaDatabase, FaNodeJs, FaReact, FaGithub, FaHackerrank, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiC, SiCplusplus, SiMongodb, SiLeetcode } from 'react-icons/si';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
      },
    },
  },
};

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await client.fetch<Project[]>('*[_type == "project"]{_id, title, description, images, githubLink, liveLink}');
      setProjects(projectsData);
      const initialImageIndices = projectsData.reduce((acc, project) => {
        acc[project._id] = 0;
        return acc;
      }, {} as { [key: string]: number });
      setCurrentImageIndex(initialImageIndices);
    };
    fetchProjects();

    const positions = iconRefs.current.map(() => {
      const x = Math.random() * 90 + 5;
      const y = Math.random() * 90 + 5;
      return { x, y };
    });

    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        const { x, y } = positions[index];
        icon.style.top = `${y}%`;
        icon.style.left = `${x}%`;
      }
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const handleNextImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: prev[projectId] < totalImages - 1
        ? prev[projectId] + 1
        : 0
    }));
  };

  const handlePrevImage = (projectId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: prev[projectId] > 0 
        ? prev[projectId] - 1 
        : (prev[projectId] || 0)
    }));
  };

  const truncateDescription = (description: string, maxWords: number = 20) => {
    const words = description.split(' ');
    return words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...' 
      : description;
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants} 
        className="w-full max-w-6xl text-center md:text-left relative z-10"
      >
        <motion.h2 className="text-4xl font-extrabold mb-8 text-center" variants={itemVariants}>
          My Projects
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6" 
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div 
              key={project._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 flex flex-col h-full" 
              variants={itemVariants} 
              whileHover="hover"
            >
              <div className="relative h-48 w-full">
                {project.images && project.images.length > 0 ? (
                  <>
                    <img 
                      src={urlFor(project.images[currentImageIndex[project._id]]).url()} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    {project.images.length > 1 && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-black bg-opacity-50">
                        <motion.button 
                          onClick={() => handlePrevImage(project._id, project.images.length)}
                          className="text-white hover:text-gray-300"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaArrowLeft />
                        </motion.button>
                        <span className="text-white text-sm">
                          {`${currentImageIndex[project._id] + 1} / ${project.images.length}`}
                        </span>
                        <motion.button 
                          onClick={() => handleNextImage(project._id, project.images.length)}
                          className="text-white hover:text-gray-300"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaArrowRight />
                        </motion.button>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {truncateDescription(project.description)}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <Link 
                    href={`/projects/${project._id}`} 
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    Read More <FaArrowRight className="ml-2" />
                  </Link>
                  <div className="flex space-x-2">
                    <motion.a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-indigo-600 text-white text-sm py-2 px-4 rounded-full shadow hover:bg-indigo-700 transition-all"
                      variants={buttonVariants} 
                      whileHover="hover" 
                      whileTap="tap"
                    >
                      GitHub
                    </motion.a>
                    <motion.a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-green-600 text-white text-sm py-2 px-4 rounded-full shadow hover:bg-green-700 transition-all"
                      variants={buttonVariants} 
                      whileHover="hover" 
                      whileTap="tap"
                    >
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Icons */}
      {[
        { icon: <FaCode size={60} />, className: 'text-green-400' },
        { icon: <FaLaptopCode size={60} />, className: 'text-blue-400' },
        { icon: <FaDatabase size={60} />, className: 'text-red-400' },
        { icon: <FaNodeJs size={60} />, className: 'text-yellow-400' },
        { icon: <FaReact size={60} />, className: 'text-cyan-400' },
        { icon: <SiJavascript size={60} />, className: 'text-yellow-500' },
        { icon: <SiTypescript size={60} />, className: 'text-blue-500' },
        { icon: <SiHtml5 size={60} />, className: 'text-orange-500' },
        { icon: <SiCss3 size={60} />, className: 'text-blue-400' },
        { icon: <SiCplusplus size={60} />, className: 'text-blue-400' },
        { icon: <SiMongodb size={60} />, className: 'text-green-400' },
        { icon: <FaGithub size={60} />, className: 'text-black' },
        { icon: <FaHackerrank size={60} />, className: 'text-green-400' },
        { icon: <SiLeetcode size={60} />, className: 'text-orange-400' },
      ].map((item, index) => (
        <motion.div 
          key={index} 
          ref={(el) => { iconRefs.current[index] = el; }} 
          variants={floatingVariants} 
          initial="initial" 
          animate="animate" 
          className={`absolute z-0 opacity-20 ${item.className}`} 
          style={{ position: 'absolute' }}
        >
          {item.icon}
        </motion.div>
      ))}
    </section>
  );
};

export default ProjectsSection;
