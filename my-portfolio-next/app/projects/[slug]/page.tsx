import { Metadata } from 'next';
import { client } from '@/sanityClient';
import { Project } from '@/app/types';
import ProjectDetailClient from './ProjectDetailClient';

async function getProjectDetails(slug: string) {
  if (!slug) {
    return null;
  }

  const project = await client.fetch<Project | null>(
    `*[_type == "project" && _id == $slug][0]{
      _id, 
      title, 
      description, 
      images, 
      githubLink, 
      liveLink,
      technologies,
      features,
      challenges,
      learnings
    }`,
    { slug }
  );
  return project;
}

export async function generateStaticParams() {
  const projects = await client.fetch<Project[]>('*[_type == "project"]{_id}');
  return projects.map((project) => ({
    slug: project._id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; 
  
  const project = await getProjectDetails(slug);
  
  return {
    title: project?.title ? `${project.title} | Project Details` : 'Project Not Found',
    description: project?.description ?? 'Project details not available'
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 
  
  const project = await getProjectDetails(slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return <ProjectDetailClient initialProject={project} />;
}
