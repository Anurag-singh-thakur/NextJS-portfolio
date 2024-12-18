export interface Skill {
  _id: string;
  name: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  images?: any[]; // Sanity image type
  githubLink?: string;
  liveLink?: string;
  technologies?: string[];
  features?: string[];
  challenges?: string[];
  learnings?: string[];
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
}