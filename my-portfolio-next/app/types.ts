export interface Skill {
  _id: string; 
  name: string; 
}
export interface Project {
  _id: string;
  title: string;
  description: string; 
  images?: string[]; 
  githubLink?: string; 
  liveLink?: string ;
  technologies?: string[]; 
  features?: string[];
  challenges?: string[]; 
  learnings?: string[]; 
}
export interface Blog {
  _id: string; 
  title: string; 
  slug: { 
      current: string; 
  };
  description: string; 
  content: string; 
  images?: Blogimage[]; 
  author: string; 
  publishedAt: string; 
  tags?: string[]; 
  readTime?: number; 
}

export interface Blogimage{
  asset:{
    _id:string,
    url:string
  };
  _id:string
  
}
  
