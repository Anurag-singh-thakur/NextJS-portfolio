'use client' 
import { motion } from 'framer-motion';
import { FloatingDock } from './components/Header';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import BlogsSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import { 
  PiHouseLight, 
  PiUserLight, 
  PiCodeLight, 
  PiBriefcaseLight, 
  PiBookOpenLight, 
  PiPaperPlaneLight 
} from 'react-icons/pi';

const Home: React.FC = () => {
  const items = [
    { 
      title: 'Home', 
      icon: <PiHouseLight size={40} className="text-blue-600 group-hover:text-blue-800 transition-colors" />, 
      href: '#home' 
    },
    { 
      title: 'About', 
      icon: <PiUserLight size={40} className="text-green-600 group-hover:text-green-800 transition-colors" />, 
      href: '#about' 
    },
    { 
      title: 'Skills', 
      icon: <PiCodeLight size={40} className="text-purple-600 group-hover:text-purple-800 transition-colors" />, 
      href: '#skills' 
    },
    { 
      title: 'Projects', 
      icon: <PiBriefcaseLight size={40} className="text-orange-600 group-hover:text-orange-800 transition-colors" />, 
      href: '#projects' 
    },
    { 
      title: 'Blogs', 
      icon: <PiBookOpenLight size={40} className="text-red-600 group-hover:text-red-800 transition-colors" />, 
      href: '#blogs' 
    },
    { 
      title: 'Contact', 
      icon: <PiPaperPlaneLight size={40} className="text-teal-600 group-hover:text-teal-800 transition-colors" />, 
      href: '#contact' 
    },
  ];

  const pageVariants = {
    initial: {
      opacity: 0,
      y: '100vh'
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: '-100vh'
    }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 50,
    damping: 20
  };

  return (
    <div className="relative w-full h-full">
      <FloatingDock
        items={items}
        desktopClassName="fixed top-4 left-1/2 transform -translate-x-1/2 z-20"
        mobileClassName="fixed bottom-10 right-10 z-20"
      />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogsSection />
        <ContactSection />
      </motion.div>
    </div>
  );
};

export default Home;
