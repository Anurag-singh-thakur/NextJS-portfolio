import React , { useState }  from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, User, Briefcase, GraduationCap, MapPin } from 'lucide-react';
const AboutSection: React.FC = () => {

  const handleEmailClick = () => {
    window.location.href = 'mailto:singhanurag1309@gmail.com?subject=Regarding Your Portfolio';
  };

  return (
    <section className="min-h-screen bg-black py-10 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Profile Image Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-blue-500/20 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <Image
                    src="/Images/147986964.png"
                    alt="Profile"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    className="absolute top-0 left-0" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-4">
                <motion.a
                  whileHover={{ y: -5 }}
                  target='_blank'
                  href="https://github.com/Anurag-singh-thakur"
                  className="bg-gray-800 p-3 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -5 }}
                  href="https://www.linkedin.com/in/anurag-kumar-b64140284/"
                  target='_blank'
                  className="bg-gray-800 p-3 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                onClick={handleEmailClick}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-3 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Full Stack Developer | DSA | TypeScript | Next.JS </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Passionate about creating elegant solutions to complex problems. With over 2 years of experience
                in full-stack development, I specialize in building scalable web applications and mentoring
                development teams.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800/50 p-2 rounded-lg">
                    <Briefcase size={20} className="text-blue-400" />
                  </div>
                  <span>Computer Science Student at Jaypee University </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800/50 p-2 rounded-lg">
                    <GraduationCap size={20} className="text-purple-400" />
                  </div>
                  <span>B.Tech in Computer Science💻</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800/50 p-2 rounded-lg">
                    <MapPin size={20} className="text-green-400" />
                  </div>
                  <span>Agra, IN</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800/50 p-2 rounded-lg">
                    <User size={20} className="text-yellow-400" />
                  </div>
                  <span>Open to Opportunities</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                onClick={handleEmailClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity"
                >
                  <Mail size={18} />
                  <span>Contact Me</span>
                </motion.button>
                <motion.a
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  href="https://drive.google.com/file/d/1Jkwf0Hj4iniR1XfDTs2Aq-x_jpXkhL22/view?usp=sharing" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="px-6 py-3 bg-gray-800 rounded-full text-gray-300 font-medium flex items-center space-x-2 hover:bg-gray-700 transition-colors"
>
  <ExternalLink size={18} />
  <span>View Resume</span>
</motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;