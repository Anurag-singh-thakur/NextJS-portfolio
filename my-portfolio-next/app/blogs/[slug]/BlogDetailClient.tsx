"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaArrowLeft, FaCalendar, FaUser, FaClock, 
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import { Blog } from '@/app/types';
import { calculateReadTime } from '@/app/utils/readTime';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function BlogDetailClient({ 
  initialBlog 
}: { 
  initialBlog: Blog | null 
}) {
  const [blog, setBlog] = useState<Blog | null>(initialBlog);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const handleNextImage = () => {
    if (blog?.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % blog.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (blog?.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? blog.images.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    setBlog(initialBlog);
  }, [initialBlog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  const publishedDate = new Date(blog.publishedAt);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readTime = calculateReadTime(blog.content);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="relative mb-8">
          <Link href="/" className="absolute -top-2 left-0 text-white hover:text-gray-300 transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center bg-[#1e2433] px-4 py-2 rounded-full shadow-md hover:bg-[#2a3342] transition-colors"
            >
              <FaArrowLeft className="mr-2" /> 
              <span className="text-sm font-medium"></span>
            </motion.div>
          </Link>
        </div>

        {/* Blog Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{blog.title}</h1>
          
          {/* Blog Metadata */}
          <div className="flex justify-center space-x-6 text-gray-400 mb-6">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        {blog.images && blog.images.length > 0 && (
          <motion.div 
            variants={itemVariants} 
            className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl relative group"
          >
            <div className="w-full h-[500px] relative">
              <img 
                src={urlFor(blog.images[currentImageIndex]).url()} 
                alt={`${blog.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Buttons */}
            {blog.images.length > 1 && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  onClick={handleNextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <FaChevronRight />
                </motion.button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full z-10">
                  {currentImageIndex + 1} / {blog.images.length}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Blog Content */}
        <motion.div 
          variants={itemVariants} 
          className="max-w-4xl mx-auto prose prose-invert"
        >
          <div className="bg-[#1e2433] p-8 rounded-xl text-gray-300 leading-relaxed">
            {blog.content}
          </div>
        </motion.div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div 
            variants={itemVariants} 
            className="max-w-4xl mx-auto mt-12"
          >
            <h3 className="text-2xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
