import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Laptop, Database, FileCode, Blocks, ArrowRight } from 'lucide-react';

const HomeSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Icons */}
      {/* <div className="absolute inset-0">
        {[
          { Icon: Code, color: 'text-green-400' },
          { Icon: Laptop, color: 'text-blue-400' },
          { Icon: Database, color: 'text-red-400' },
          { Icon: FileCode, color: 'text-yellow-400' },
          { Icon: Blocks, color: 'text-purple-400' }
        ].map(({ Icon, color }, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              y: { repeat: Infinity, repeatType: 'loop', duration: 3 },
              opacity: { repeat: Infinity, repeatType: 'loop', duration: 3 }
            }}
            className={`absolute z-0 ${color} opacity-20`}
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`
            }}
          >
            <Icon size={60} />
          </motion.div>
        ))}
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-sm sm:text-base text-blue-400 font-medium mb-2">Welcome to my portfolio</h2>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Hi, I'm{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Anurag Kumar
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400">
                  Aspiring Full Stack Developer
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Currently pursuing B.Tech at Jaypee University, passionate about building web applications
                and solving complex problems through code.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  View My Work
                  <ArrowRight size={18} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              style={{ scale, opacity }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.8
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <img
                  src="/images/p7.jpg"
                  alt="Anurag Kumar"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;