import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaDatabase, FaNodeJs, FaReact, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiC, SiCplusplus, SiMongodb, SiLeetcode } from 'react-icons/si';

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

const AboutSection: React.FC = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const positions = iconRefs.current.map(() => {
      const x = Math.random() * 90 + 5; // Ensuring icons stay within the viewport
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

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl text-center md:text-left relative z-10"
      >
        <h2 className="text-4xl font-extrabold mb-4">About Me</h2>
        <p className="text-xl mt-2 text-gray-400">
          I am Anurag Kumar, a 4th semester student at Jaypee University of Engineering and Technology, Guna, MP, India. I am a passionate MERN stack developer with a strong foundation in Data Structures and Algorithms (DSA) and expertise in Next.js, TypeScript, and Sanity.
        </p>
        <p className="mt-4 text-gray-300">
          My journey in the world of coding started with a keen interest in building dynamic and responsive web applications. Over the past years, I have honed my skills in full-stack development, creating seamless user experiences with a focus on performance and scalability.
        </p>
        <p className="mt-4 text-gray-300">
          I thrive on learning new technologies and continuously improving my craft. When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or engaging with the developer community.
        </p>
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
        { icon: <SiC size={60} />, className: 'text-purple-500' },
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

export default AboutSection;
