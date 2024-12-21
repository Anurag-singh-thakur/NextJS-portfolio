import { client } from '@/sanityClient';
import BlogDetailClient from './BlogDetailClient';
import { Blog } from '@/app/types';

export default async function BlogPage({ params }: { params: { slug: string } }) {
  // Await the params to ensure they are resolved before using them
  const { slug } = await params; // Await the params here

  const blog = await client.fetch(`*[_type == "blog" && slug.current == $slug][0]`, {
    slug: slug,
  });

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  return <BlogDetailClient initialBlog={blog} />;
}