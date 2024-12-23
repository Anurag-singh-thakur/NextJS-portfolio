'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanityClient'
import { Blog } from '../types'
import { Loader2, ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BlogDetails = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (slug) {
      async function fetchBlogDetails() {
        setIsLoading(true)
        try {
          const blogData = await client.fetch(`*[_type == "blog" && slug.current == $slug][0]{
            _id,
            title,
            description,
            content,
            author,
            publishedAt,
            images[] {
              asset -> {
                _id,
                url
              }
            }
          }`, { slug })
          setBlog(blogData)
        } catch (error) {
          console.error("Error fetching blog details:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchBlogDetails()
    }
  }, [slug])

  const handlePreviousImage = () => {
    if (blog?.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        blog?.images && blog.images.length > 0 ? (prevIndex === 0 ? blog.images.length - 1 : prevIndex - 1) : prevIndex
    )
    }
  }

  const handleNextImage = () => {
    if (blog?.images && blog.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        blog?.images && blog.images.length > 0 ? (prevIndex === blog.images.length - 1 ? 0 : prevIndex + 1) : prevIndex
    )
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b]">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b]">
        <p className="text-white text-xl">Blog post not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-white hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2" />
          </motion.div>
        </Link>

        <article className="bg-secondary/20 rounded-xl border border-secondary/30 p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
          <div className="flex items-center text-gray-400 mb-8">
            <Calendar className="mr-2" />
            <p>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            {blog.author && (
              <>
                <span className="mx-2">•</span>
                <User className="mr-2" />
                <p>{blog.author}</p>
              </>
            )}
          </div>
          {blog.description && (
            <p className="text-xl text-gray-300 mb-8 italic">{blog.description}</p>
          )}
          <div className="prose prose-invert max-w-none mb-12">
            {blog.content}
          </div>
          {blog.images && blog.images.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-col items-center">
                {blog.images[currentImageIndex]?.asset?.url ? (
                  <div className="relative w-full h-[400px] md:h-[600px]">
                    <Image 
                      key={blog.images[currentImageIndex].asset._id}
                      src={blog.images[currentImageIndex].asset.url}
                      alt={`Blog image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
                <div className="flex items-center gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePreviousImage}
                    className="bg-secondary/20 text-white px-4 py-2 rounded-full border border-secondary/30 hover:border-primary transition-all flex items-center"
                  >
                    <ArrowLeft className="mr-2" /> 
                  </motion.button>
                  <span className="text-gray-400">
                    {currentImageIndex + 1} / {blog.images.length}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextImage}
                    className="bg-secondary/20 text-white px-4 py-2 rounded-full border border-secondary/30 hover:border-primary transition-all flex items-center"
                  >
                  <ArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export default BlogDetails

