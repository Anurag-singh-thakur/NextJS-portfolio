"use client";

import React, { useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaCode,
  FaLaptopCode,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiReact, 
  SiNodedotjs 
} from 'react-icons/si';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import { Project } from '@/app/types';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const BACKGROUND_ICONS = [
  { 
    icon: <FaCode size={60} />,
    className: 'text-green-400 opacity-100',
    position:{top: '10%' , left : '5%' }
 },
  { icon: 
  <FaLaptopCode size={60} />,
   className: 'text-blue-400 opacity-100',
   position:{top: '10%' , left : '5%' }
   },
  { icon: <FaDatabase size={60} />,
   className: 'text-red-400 opacity-100' ,
   position:{top: '20%' , left : '85%' }
  },
  { icon: <SiJavascript size={60} />, className: 'text-yellow-500 opacity-100' , position:{top: '50%' , left : '15%' } },
  { icon: <SiTypescript size={60} />, className: 'text-blue-500 opacity-100' , position:{top: '60%' , left : '85%' } },
  { icon: <SiNextdotjs size={60} />, className: 'text-black opacity-100' , position:{top: '70%' , left : '5%' } },
  { icon: <SiReact size={60} />, className: 'text-cyan-400 opacity-100' , position:{top: '80%' , left : '85%' } },
  { icon: <SiNodedotjs size={60} />, className: 'text-green-600 opacity-100' , position:{top: '90%' , left : '15%' } },
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

export default function ProjectDetailClient({ 
  initialProject 
}: { 
  initialProject: Project | null 
}) {
  const [project, setProject] = React.useState<Project | null>(initialProject);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
    <motion.div 
      style={{ scale, opacity }}
      className="min-h-screen w-full bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      {BACKGROUND_ICONS.map((item, index) => (
        <motion.div
          key={index}
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className={`absolute z-0 ${item.className}`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            fontSize: `${Math.random() * 4 + 3}rem`
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="relative mb-8">
          <Link href="/" className="inline-block text-white hover:text-primary transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center bg-secondary/20 px-4 py-2 rounded-full border border-secondary/30 hover:border-primary transition-all"
            >
              <FaArrowLeft className="mr-2" /> 
              <span className="text-sm font-medium"></span>
            </motion.div>
          </Link>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-200">
            {project.title}
          </h1>
        </div>
        {project.images && project.images.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl relative group">
            <div className="w-full h-[500px] relative">
              <motion.img 
                src={urlFor(project.images[currentImageIndex]).url()} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-110"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              />
            </div>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <motion.button
                  onClick={handlePrevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-secondary/20 text-secondary/80 hover:text-primary 
                             p-3 rounded-full border border-secondary/30 hover:border-primary 
                             transition-all z-10"
                >
                  <FaChevronLeft />
                </motion.button>

                <span className="text-neutral-300 text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </span>

                <motion.button
                  onClick={handleNextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-secondary/20 text-secondary/80 hover:text-primary 
                             p-3 rounded-full border border-secondary/30 hover:border-primary 
                             transition-all z-10"
                >
                  <FaChevronRight />
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* Project Links */}
        <div className="flex justify-center space-x-4 mb-12">
          {project.githubLink && (
            <motion.a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary/20 text-secondary/80 hover:text-primary 
                         px-6 py-3 rounded-md text-sm flex items-center 
                         border border-secondary/30 hover:border-primary transition-all"
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
              className="bg-secondary/20 text-secondary/80 hover:text-primary 
                         px-6 py-3 rounded-md text-sm flex items-center 
                         border border-secondary/30 hover:border-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </motion.a>
          )}
        </div>

        {/* Project Details */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Description */}
          <div className="bg-secondary/20 p-8 rounded-xl border border-secondary/30">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-secondary/30 pb-2">
              Description
            </h2>
            <p className="text-secondary/80 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-secondary/20 p-8 rounded-xl border border-secondary/30">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-secondary/30 pb-2">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-secondary/30 text-secondary/80 px-4 py-2 rounded-full text-sm 
                               border border-secondary/40 hover:border-primary transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="bg-secondary/20 p-8 rounded-xl border border-secondary/30">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-secondary/30 pb-2">
                Key Features
              </h2>
              <ul className="list-disc list-inside text-secondary/80 space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="pl-2 hover:text-primary transition-colors">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-secondary/20 p-8 rounded-xl border border-secondary/30">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-secondary/30 pb-2">
                Challenges Overcome
              </h2>
              <ul className="list-disc list-inside text-secondary/80 space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="pl-2 hover:text-primary transition-colors">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
