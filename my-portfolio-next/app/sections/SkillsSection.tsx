import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { client } from '@/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaNodeJs, 
  FaReact, 
  FaGithub, 
  FaHackerrank 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiSanity, 
  SiMongodb, 
  SiLeetcode 
} from 'react-icons/si';

// Image URL builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const BACKGROUND_ICONS = [
  { icon: <FaCode size={60} />, className: 'text-green-400' },
  { icon: <FaLaptopCode size={60} />, className: 'text-blue-400' },
  { icon: <FaDatabase size={60} />, className: 'text-red-400' },
  { icon: <FaNodeJs size={60} />, className: 'text-yellow-400' },
  { icon: <FaReact size={60} />, className: 'text-cyan-400' },
  { icon: <SiJavascript size={60} />, className: 'text-yellow-500' },
  { icon: <SiTypescript size={60} />, className: 'text-blue-500' },
  { icon: <SiNextdotjs size={60} />, className: 'text-black' },
  { icon: <SiSanity size={60} />, className: 'text-red-500' },
  { icon: <SiMongodb size={60} />, className: 'text-green-500' },
  { icon: <FaGithub size={60} />, className: 'text-gray-600' },
  { icon: <FaHackerrank size={60} />, className: 'text-green-600' },
  { icon: <SiLeetcode size={60} />, className: 'text-orange-400' },
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

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await client.fetch(`
          *[_type == "skill"] {
            _id,
            name,
            image
          }
        `);

        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    // Randomize icon positions
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
    <motion.section 
      id="skills" 
      style={{ scale, opacity }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
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
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10 w-full"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Technical Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              className="bg-secondary/20 rounded-xl p-4 flex flex-col items-center justify-center 
                         border border-secondary/30 hover:border-primary 
                         transition-all duration-300 ease-in-out transform hover:-translate-y-2 
                         hover:shadow-lg"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <img 
                  src={urlFor(skill.image).url()} 
                  alt={skill.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-sm font-semibold text-center text-secondary/80">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;
