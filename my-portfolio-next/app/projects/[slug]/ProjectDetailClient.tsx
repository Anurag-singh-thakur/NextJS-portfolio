"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import { Project } from '@/app/types';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function ProjectDetailClient({ 
  initialProject 
}: { 
  initialProject: Project | null 
}) {
  const [project, setProject] = React.useState<Project | null>(initialProject);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const handleNextImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % project.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="relative mb-8">
          <Link href="/" className="absolute -top-2 left-0 text-white hover:text-gray-300 transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center bg-[#1e2433] px-4 py-2 rounded-full shadow-md hover:bg-[#2a3342] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> 
              <span className="text-sm font-medium"></span>
            </motion.div>
          </Link>
        </div>

        {/* Project Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{project.title}</h1>
          <div className="flex justify-center space-x-4 mt-6">
            {project.githubLink && (
              <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center hover:bg-indigo-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="mr-2" /> GitHub
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center hover:bg-green-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt className="mr-2" /> Live Demo
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.div 
            variants={itemVariants} 
            className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl relative group"
          >
            <div className="w-full h-[500px] relative">
              <img 
                src={urlFor(project.images[currentImageIndex]).url()} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <FaChevronRight />
                </motion.button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full z-10">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Project Details */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Description */}
          <motion.div variants={itemVariants} className="bg-[#1e2433] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </motion.div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#1e2433] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#1e2433] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="pl-2">{feature}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#1e2433] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Challenges Overcome</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="pl-2">{challenge}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Learnings */}
          {project.learnings && project.learnings.length > 0 && (
            <motion.div variants={itemVariants} className="bg-[#1e2433] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Key Learnings</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="pl-2">{learning}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
