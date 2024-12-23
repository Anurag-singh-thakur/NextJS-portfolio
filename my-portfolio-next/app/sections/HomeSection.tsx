'use client'

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HomeSection: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-center">
      <div className="container mx-auto px-4 py-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg sm:text-xl text-blue-400 font-medium mb-2">Welcome to my portfolio</h2>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Hi, I&apos;m{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Anurag Kumar
            </span>
          </h1>
          <p className="text-3xl sm:text-4xl text-gray-300 mb-4">
            Aspiring Full Stack Developer
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto"
          >
            Currently pursuing B.Tech at Jaypee University, passionate about building web applications
            and solving complex problems through code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity text-lg sm:text-xl shadow-lg"
            >
              View My Work
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;