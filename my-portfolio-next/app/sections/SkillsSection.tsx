import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/sanityClient';
import { Skill } from '../types';
import imageUrlBuilder from '@sanity/image-url';
import { FaCode, FaLaptopCode, FaDatabase, FaNodeJs, FaReact, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiC, SiCplusplus, SiMongodb, SiLeetcode } from 'react-icons/si';

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

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsData = await client.fetch<Skill[]>('*[_type == "skill"]');
      setSkills(skillsData);
    };

    fetchSkills();

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

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl text-center md:text-left relative z-10"
      >
        <h2 className="text-4xl font-extrabold mb-4">My Skills</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            className="relative bg-zinc-800 p-4 md:p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img src={urlFor(skill.image).url()} alt={skill.name} className="h-24 w-24 object-contain mx-auto" />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
            >
              <p className="text-lg font-bold text-white">{skill.name}</p>
            </motion.div>
          </motion.div>
        ))}
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

export default SkillsSection;
