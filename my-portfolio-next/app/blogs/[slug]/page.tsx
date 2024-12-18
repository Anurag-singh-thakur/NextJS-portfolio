"use server";

import { client } from '@/sanityClient';
import BlogDetailClient from './BlogDetailClient';

export default async function BlogDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const blog = await client.fetch(`*[_type == "blog" && slug.current == "${params.slug}"][0]`);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  return <BlogDetailClient initialBlog={blog} />;
}
