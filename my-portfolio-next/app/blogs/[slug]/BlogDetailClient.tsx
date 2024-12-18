"use client";

import React, { useState, useEffect } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaChevronLeft, 
  FaChevronRight,
  FaCode,
  FaLaptopCode,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiReact, 
  SiNodedotjs 
} from 'react-icons/si';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';
import { Blog } from '@/app/types';
import { calculateReadTime } from '@/app/utils/readTime';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const BACKGROUND_ICONS = [
  { icon: <FaCode size={60} />, className: 'text-green-400 opacity-100' },
  { icon: <FaLaptopCode size={60} />, className: 'text-blue-400 opacity-100' },
  { icon: <FaDatabase size={60} />, className: 'text-red-400 opacity-100' },
  { icon: <SiJavascript size={60} />, className: 'text-yellow-500 opacity-100' },
  { icon: <SiTypescript size={60} />, className: 'text-blue-500 opacity-100' },
  { icon: <SiNextdotjs size={60} />, className: 'text-black opacity-100' },
  { icon: <SiReact size={60} />, className: 'text-cyan-400 opacity-100' },
  { icon: <SiNodedotjs size={60} />, className: 'text-green-600 opacity-100' },
];

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
      },
    },
  },
};

export default function BlogDetailClient({ 
  initialBlog 
}: { 
  initialBlog: Blog | null 
}) {
  const [blog, setBlog] = useState<Blog | null>(initialBlog);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
    <motion.div 
      style={{ scale, opacity }}
      className="min-h-screen w-full bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      {BACKGROUND_ICONS.map((item, index) => (
        <motion.div
          key={index}
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className={`absolute z-0 ${item.className}`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            fontSize: `${Math.random() * 4 + 3}rem`
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="relative mb-8">
          <Link href="/" className="inline-block text-white hover:text-primary transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center bg-secondary/20 px-4 py-2 rounded-full border border-secondary/30 hover:border-primary transition-all"
            >
              <FaArrowLeft className="mr-2" /> 
              <span className="text-sm font-medium"></span>
            </motion.div>
          </Link>
        </div>

        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-200">
            {blog.title}
          </h1>
        </div>

        {/* Image Gallery */}
        {blog.images && blog.images.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl relative group">
            <div className="w-full h-[500px] relative">
              <motion.img 
                src={urlFor(blog.images[currentImageIndex]).url()} 
                alt={`${blog.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-110"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              />
            </div>

            {/* Navigation Buttons */}
            {blog.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <motion.button
                  onClick={handlePrevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-secondary/20 text-secondary/80 hover:text-primary 
                             p-3 rounded-full border border-secondary/30 hover:border-primary 
                             transition-all z-10"
                >
                  <FaChevronLeft />
                </motion.button>

                <span className="text-neutral-300 text-sm">
                  {currentImageIndex + 1} / {blog.images.length}
                </span>

                <motion.button
                  onClick={handleNextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-secondary/20 text-secondary/80 hover:text-primary 
                             p-3 rounded-full border border-secondary/30 hover:border-primary 
                             transition-all z-10"
                >
                  <FaChevronRight />
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* Blog Metadata */}
        <div className="flex justify-center space-x-6 text-neutral-400 mb-12">
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

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="bg-secondary/20 p-8 rounded-xl border border-secondary/30 text-secondary/80 leading-relaxed">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4 border-b border-secondary/30 pb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-secondary/30 text-secondary/80 px-4 py-2 rounded-full text-sm 
                             border border-secondary/40 hover:border-primary transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
