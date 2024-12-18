// app/sections/BlogsSection.tsx
import React, { useEffect, useState } from 'react';
import ListDisplay from '../components/ListDisplay';
import { client } from '@/sanityClient';
import { Blog } from '../types';

const BlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await client.fetch<Blog[]>('*[_type == "blog"]');
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <section id="blogs">
      <ListDisplay title="Blogs" items={blogs} />
    </section>
  );
};

export default BlogsSection;