import React, { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { client } from '@/sanityClient';
import { Project } from '../types';
import imageUrlBuilder from '@sanity/image-url';
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
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiSanity, 
  SiMongodb, 
  SiLeetcode 
} from 'react-icons/si';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const BACKGROUND_ICONS = [
  { icon: <FaCode size={60} />, className: 'text-green-400 opacity-100' },
  { icon: <FaLaptopCode size={60} />, className: 'text-blue-400 opacity-100' },
  { icon: <FaDatabase size={60} />, className: 'text-red-400 opacity-100' },
  { icon: <FaNodeJs size={60} />, className: 'text-yellow-400 opacity-100' },
  { icon: <FaReact size={60} />, className: 'text-cyan-400 opacity-100' },
  { icon: <SiJavascript size={60} />, className: 'text-yellow-500 opacity-100' },
  { icon: <SiTypescript size={60} />, className: 'text-blue-500 opacity-100' },
  { icon: <SiNextdotjs size={60} />, className: 'text-black opacity-100' },
  { icon: <SiSanity size={60} />, className: 'text-red-500 opacity-100' },
  { icon: <SiMongodb size={60} />, className: 'text-green-500 opacity-100' },
  { icon: <FaGithub size={60} />, className: 'text-gray-600 opacity-100' },
  { icon: <FaHackerrank size={60} />, className: 'text-green-600 opacity-100' },
  { icon: <SiLeetcode size={60} />, className: 'text-orange-400 opacity-100' },
];

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
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
    <motion.section 
      id="projects" 
      style={{ scale, opacity }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      {BACKGROUND_ICONS.map((item, index) => (
        <motion.div
          key={index}
          ref={(el) => { iconRefs.current[index] = el; }}
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className={`absolute z-0 ${item.className}`}
          style={{
            fontSize: `${Math.random() * 4 + 3}rem`
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl text-center md:text-left relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              className="bg-secondary/20 rounded-2xl border border-secondary/30 overflow-hidden 
                         transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                         hover:border-primary group flex flex-col"
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
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-black bg-opacity-50">
                        <span className="text-white text-sm">
                          {`${currentImageIndex[project._id] + 1} / ${project.images.length}`}
                        </span>
                        <div className="flex space-x-2">
                          <motion.button 
                            onClick={() => handlePrevImage(project._id, project.images.length)}
                            className="text-white hover:text-primary"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaArrowLeft />
                          </motion.button>
                          <motion.button 
                            onClick={() => handleNextImage(project._id, project.images.length)}
                            className="text-white hover:text-primary"
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
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary/80 mb-4 flex-grow">
                  {truncateDescription(project.description)}
                </p>
                
                <div className="flex flex-col space-y-3 mt-auto">
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/projects/${project._id}`} 
                      className="text-primary hover:underline flex items-center text-sm"
                    >
                      Read More <FaArrowRight className="ml-2" />
                    </Link>
                    
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <motion.a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-secondary/20 text-secondary/80 hover:text-primary 
                                     px-3 py-1 rounded-md text-sm flex items-center space-x-2
                                     border border-secondary/30 hover:border-primary transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
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
                          className="bg-secondary/20 text-secondary/80 hover:text-primary 
                                     px-3 py-1 rounded-md text-sm flex items-center space-x-2
                                     border border-secondary/30 hover:border-primary transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
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
  );
};

export default ProjectsSection;
