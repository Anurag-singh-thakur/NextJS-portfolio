import React from 'react';
import { motion } from 'framer-motion';

const HomeSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 1, staggerChildren: 0.3 },
            },
          }}
          className="md:w-1/2"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-center md:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-5xl font-extrabold mb-4"
            >
              Anurag Kumar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="text-xl mt-2 text-gray-400"
            >
              MERN | TypeScript | Next.js | Sanity
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } } }}
              className="mt-4 text-gray-300"
            >
              Welcome to my portfolio! I am a MERN stack developer with a strong knowledge of Data Structures and Algorithms (DSA). I also have expertise in Next.js, TypeScript, and Sanity. Here you can find my projects, skills, and blogs.
            </motion.p>
          </motion.div>
        </motion.div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <motion.img
            src='/images/p7.jpg'
            alt="Anurag Kumar"
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
