'use client' // Ensure this is at the top

import { motion } from 'framer-motion';
import { FloatingDock } from './components/Header';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import BlogsSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import {
  IconHome,
  IconUser,
  IconSettings,
  IconMail,
  IconArticle,
  IconBriefcase,
} from '@tabler/icons-react';

const Home: React.FC = () => {
  const items = [
    { title: 'Home', icon: <IconHome />, href: '#home' },
    { title: 'About', icon: <IconUser />, href: '#about' },
    { title: 'Skills', icon: <IconSettings />, href: '#skills' },
    { title: 'Projects', icon: <IconBriefcase />, href: '#projects' },
    { title: 'Blogs', icon: <IconArticle />, href: '#blogs' },
    { title: 'Contact', icon: <IconMail />, href: '#contact' },
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
