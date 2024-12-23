import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { Project } from '../types';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import Image from 'next/image';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < (project.images?.length || 1) - 1 ? prev + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : (project.images?.length || 1) - 1
    );
  };

  const truncateDescription = (description: string, maxWords: number = 20) => {
    const words = description.split(' ');
    return words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...' 
      : description;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      viewport={{ once: true }}
      className="bg-black overflow-hidden border border-gray-700 rounded-lg 
                 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                 hover:border-primary group flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <>
             <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image
          src={urlFor(project.images[currentImageIndex]).url()} 
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </motion.div>
            {project.images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-black/60">
                <span className="text-white text-xs">
                  {`${currentImageIndex + 1} / ${project.images.length}`}
                </span>
                <div className="flex space-x-2">
                  <motion.button 
                    onClick={handlePrevImage}
                    className="text-white hover:text-primary"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowLeft />
                  </motion.button>
                  <motion.button 
                    onClick={handleNextImage}
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

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 flex-grow text-sm">
          {truncateDescription(project.description)}
        </p>
        
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
                className="bg-gray-800 text-gray-300 hover:text-primary 
                           px-3 py-1 rounded-md text-xs flex items-center space-x-2
                           border border-gray-700 hover:border-primary transition-all"
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
                className="bg-gray-800 text-gray-300 hover:text-primary 
                           px-3 py-1 rounded-md text-xs flex items-center space-x-2
                           border border-gray-700 hover:border-primary transition-all"
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
    </motion.div>
  );
};