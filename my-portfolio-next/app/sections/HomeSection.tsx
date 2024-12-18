import React, { useEffect, useRef } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
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

const HomeSection: React.FC = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

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

  const imageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1
      }
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      {[
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
      ].map((item, index) => (
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

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { 
                duration: 1, 
                staggerChildren: 0.3 
              },
            },
          }}
          className="md:w-1/2 bg-black/30 backdrop-blur-sm p-6 rounded-xl shadow-2xl"
        >
          <motion.div
            variants={{ 
              hidden: { opacity: 0, y: -20 }, 
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.5 } 
              } 
            }}
            className="text-center md:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-5xl font-extrabold mb-4 text-white"
            >
              Anurag Kumar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="text-xl mt-2 text-gray-300"
            >
              MERN | TypeScript | Next.js | Sanity
            </motion.p>
            <motion.p
              variants={{ 
                hidden: { opacity: 0, y: -10 }, 
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.5, 
                    delay: 0.6 
                  } 
                } 
              }}
              className="mt-4 text-gray-400"
            >
              Welcome to my portfolio! I am a MERN stack developer with a strong knowledge of Data Structures and Algorithms (DSA). I also have expertise in Next.js, TypeScript, and Sanity. Here you can find my projects, skills, and blogs.
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 mt-6 md:mt-0 flex justify-center"
          style={{ scale, rotate }}
        >
          <motion.img
            src='/images/p7.jpg'
            alt="Anurag Kumar"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            className="rounded-full w-80 h-80 object-cover 
              border-4 border-transparent 
              bg-gradient-to-r from-blue-500 to-purple-600 p-1
              shadow-2xl ring-4 ring-blue-500/30 
              transition-all duration-300 ease-in-out"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
