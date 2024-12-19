import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaNodeJs, 
  FaReact, 
  FaGithub, 
  FaHackerrank,
  FaUniversity,
  FaAward,
  FaChartBar
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiC, 
  SiCplusplus, 
  SiMongodb, 
  SiLeetcode,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiKubernetes
} from 'react-icons/si';

const floatingVariants = {
  initial: { 
    y: 0,
    opacity: 0.2
  },
  animate: {
    y: [0, -20, 0],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
      },
      opacity: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
      }
    },
  },
};

const SKILLS = [
  { 
    category: 'Frontend', 
    skills: [
      { name: 'React', icon: <SiJavascript size={40} className="text-yellow-500" />, level: 95 },
      { name: 'Next.js', icon: <SiNextdotjs size={40} className="text-black" />, level: 90 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} className="text-teal-400" />, level: 88 },
      { name: 'HTML5', icon: <SiHtml5 size={40} className="text-orange-500" />, level: 98 },
      { name: 'CSS3', icon: <SiCss3 size={40} className="text-blue-500" />, level: 92 },
    ]
  },
  { 
    category: 'Backend', 
    skills: [
      { name: 'Node.js', icon: <FaNodeJs size={40} className="text-green-600" />, level: 90 },
      { name: 'MongoDB', icon: <SiMongodb size={40} className="text-green-500" />, level: 85 },
      { name: 'TypeScript', icon: <SiTypescript size={40} className="text-blue-500" />, level: 88 },
    ]
  },
  { 
    category: 'Programming', 
    skills: [
      { name: 'C', icon: <SiC size={40} className="text-purple-500" />, level: 95 },
      { name: 'C++', icon: <SiCplusplus size={40} className="text-blue-600" />, level: 92 },
      { name: 'Python', icon: <SiPython size={40} className="text-blue-400" />, level: 85 },
    ]
  },
  { 
    category: 'DevOps', 
    skills: [
      { name: 'Docker', icon: <SiDocker size={40} className="text-blue-600" />, level: 75 },
      { name: 'Kubernetes', icon: <SiKubernetes size={40} className="text-blue-400" />, level: 70 },
      { name: 'GitHub', icon: <FaGithub size={40} className="text-gray-600" />, level: 90 },
    ]
  }
];

const AboutSection: React.FC = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const [activeCategory, setActiveCategory] = useState('Frontend');

  useEffect(() => {
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

  const techIcons = [
    { icon: <FaCode size={60} />, className: 'text-green-400 opacity-100' },
    { icon: <FaLaptopCode size={60} />, className: 'text-blue-400 opacity-100' },
    { icon: <FaDatabase size={60} />, className: 'text-red-400 opacity-100' },
    { icon: <FaNodeJs size={60} />, className: 'text-yellow-400 opacity-100' },
    { icon: <FaReact size={60} />, className: 'text-cyan-400 opacity-100' },
    { icon: <SiJavascript size={60} />, className: 'text-yellow-500 opacity-100' },
    { icon: <SiTypescript size={60} />, className: 'text-blue-500 opacity-100' },
    { icon: <SiHtml5 size={60} />, className: 'text-orange-500 opacity-100' },
    { icon: <SiCss3 size={60} />, className: 'text-blue-400 opacity-100' },
    { icon: <SiC size={60} />, className: 'text-purple-500 opacity-100' },
    { icon: <SiCplusplus size={60} />, className: 'text-blue-600 opacity-100' },
    { icon: <SiMongodb size={60} />, className: 'text-green-500 opacity-100' },
    { icon: <SiNextdotjs size={60} />, className: 'text-black opacity-100' },
    { icon: <SiTailwindcss size={60} />, className: 'text-teal-400 opacity-100' },
    { icon: <FaGithub size={60} />, className: 'text-gray-600 opacity-100' },
    { icon: <FaHackerrank size={60} />, className: 'text-green-600 opacity-100' },
    { icon: <SiLeetcode size={60} />, className: 'text-orange-400 opacity-100' },
  ];

  return (
    <section 
      id="about" 
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      {techIcons.map((item, index) => (
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
        style={{ scale, opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl relative z-10 bg-black/30 backdrop-blur-sm p-8 rounded-xl shadow-2xl"
      >
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <FaUniversity className="text-blue-500 mr-4" size={50} />
          <h2 className="text-4xl font-extrabold">About Me</h2>
          <FaAward className="text-green-500 ml-4" size={50} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl text-gray-300 mb-4">
              I am Anurag Kumar, a 4th semester student at Jaypee University of Engineering and Technology, Guna, MP, India. I am a passionate MERN stack developer with a strong foundation in Data Structures and Algorithms (DSA) and expertise in Next.js, TypeScript, and Sanity.
            </p>
            <p className="text-gray-400 mb-4">
              My journey in the world of coding started with a keen interest in building dynamic and responsive web applications. Over the past years, I have honed my skills in full-stack development, creating seamless user experiences with a focus on performance and scalability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex mb-4 space-x-2">
              {SKILLS.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    activeCategory === category.category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {SKILLS.find(s => s.category === activeCategory)?.skills.map((skill) => (
                  <motion.div 
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 p-3 rounded-lg flex items-center space-x-3"
                  >
                    {skill.icon}
                    <div className="flex-grow">
                      <div className="text-sm font-semibold">{skill.name}</div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
