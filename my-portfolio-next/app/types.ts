export interface Skill {
  _id: string; // Unique identifier for the skill
  name: string; 
}

export interface Project {
  _id: string; // Unique identifier for the project
  title: string; // Title of the project
  description: string; // Description of the project
  images?: any[]; // Optional: Array of images related to the project (Sanity image type)
  githubLink?: string; // Optional: Link to the project's GitHub repository
  liveLink?: string; // Optional: Link to the live project
  technologies?: string[]; // Optional: Array of technologies used in the project
  features?: string[]; // Optional: Array of features of the project
  challenges?: string[]; // Optional: Array of challenges faced during the project
  learnings?: string[]; // Optional: Array of learnings from the project
}

export interface Blog {
  _id: string; 
  title: string; 
  slug: { 
      current: string; 
  };
  description: string; 
  content: string; 
  images?: any[]; 
  author: string; 
  publishedAt: string; 
  tags?: string[]; 
  readTime?: number; 
}