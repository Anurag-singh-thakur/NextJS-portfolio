// app/sections/BlogSection.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaCode, FaLaptopCode, FaDatabase, FaNodeJs, FaReact, 
  FaHackerrank, FaGithub, FaArrowRight 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiHtml5, SiCss3, 
  SiCplusplus, SiMongodb, SiLeetcode 
} from 'react-icons/si';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import { Blog } from '../types';
import { calculateReadTime } from '../utils/readTime';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function truncateDescription(description: string, maxLength: number = 100) {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
}

const FLOATING_ICONS = [
  { icon: <FaCode size={60} />, className: 'text-green-400', position: { top: '20%', left: '10%' } },
  { icon: <FaLaptopCode size={60} />, className: 'text-blue-400', position: { top: '80%', left: '90%' } },
  { icon: <FaDatabase size={60} />, className: 'text-red-400', position: { top: '30%', left: '50%' } },
  { icon: <FaNodeJs size={60} />, className: 'text-yellow-400', position: { top: '15%', left: '70%' } },
  { icon: <FaReact size={60} />, className: 'text-cyan-400', position: { top: '70%', left: '20%' } },
  { icon: <SiJavascript size={60} />, className: 'text-yellow-500', position: { top: '40%', left: '80%' } },
  { icon: <SiTypescript size={60} />, className: 'text-blue-500', position: { top: '60%', left: '30%' } },
  { icon: <SiHtml5 size={60} />, className: 'text-orange-500', position: { top: '25%', left: '60%' } },
];

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  useEffect(() => {
    async function fetchBlogs() {
      const blogsData = await client.fetch(`*[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        description,
        images,
        author,
        publishedAt,
        tags,
        content,
        slug {
          current
        }
      }`);
      
      setBlogs(blogsData);
      
      // Initialize image indices
      const initialImageIndices = blogsData.reduce((acc: any, blog: Blog) => {
        acc[blog._id] = 0;
        return acc;
      }, {});
      setCurrentImageIndex(initialImageIndices);
    }

    fetchBlogs();
  }, []);

  const handleNextImage = (blogId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [blogId]: (prev[blogId] + 1) % totalImages
    }));
  };

  const handlePrevImage = (blogId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [blogId]: prev[blogId] === 0 ? totalImages - 1 : prev[blogId] - 1
    }));
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="blogs" className="min-h-screen text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          My Blogs
        </motion.h2>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog, index) => {
            const readTime = calculateReadTime(blog.content);
            
            return (
              <motion.div 
                key={blog._id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-[#1e2433] rounded-xl overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="relative h-48 w-full">
                  {blog.images && blog.images.length > 0 ? (
                    <>
                      <img 
                        src={urlFor(blog.images[currentImageIndex[blog._id]]).url()} 
                        alt={blog.title} 
                        className="w-full h-full object-cover"
                      />
                      {blog.images.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-black bg-opacity-50">
                          <motion.button 
                            onClick={() => handlePrevImage(blog._id, blog.images.length)}
                            className="text-white hover:text-gray-300"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaArrowRight className="transform rotate-180" />
                          </motion.button>
                          <span className="text-white text-sm">
                            {`${currentImageIndex[blog._id] + 1} / ${blog.images.length}`}
                          </span>
                          <motion.button 
                            onClick={() => handleNextImage(blog._id, blog.images.length)}
                            className="text-white hover:text-gray-300"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaArrowRight />
                          </motion.button>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {truncateDescription(blog.description)}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <Link 
                      href={`/blogs/${blog.slug.current}`} 
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      Read More <FaArrowRight className="ml-2" />
                    </Link>
                    <div className="text-sm text-gray-400 flex items-center space-x-2">
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{readTime} min read</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Icons */}
      {FLOATING_ICONS.map((item, index) => (
        <motion.div 
          key={index} 
          variants={floatingVariants} 
          initial="initial" 
          animate="animate" 
          className={`absolute z-0 opacity-20 ${item.className}`} 
          style={{ 
            position: 'absolute', 
            top: item.position.top, 
            left: item.position.left,
            transform: 'none'
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </section>
  );
}