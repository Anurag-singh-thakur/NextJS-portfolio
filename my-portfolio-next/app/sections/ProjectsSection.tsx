import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/sanityClient';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await client.fetch<Project[]>('*[_type == "project"]{_id, title, description, images, githubLink, liveLink}');
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
