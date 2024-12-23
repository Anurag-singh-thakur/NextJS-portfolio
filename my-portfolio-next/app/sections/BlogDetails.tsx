'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanityClient'
import { Blog } from '../types'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

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
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-white text-xl">Blog post not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-400 mb-8">
          <p>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          {blog.author && (
            <>
              <span className="mx-2">•</span>
              <p>By {blog.author}</p>
            </>
          )}
        </div>
        {blog.description && (
          <p className="text-xl text-gray-300 mb-8">{blog.description}</p>
        )}
        <div className="prose prose-invert max-w-none mb-8">
          {blog.content}
        </div>
        {blog.images && blog.images.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col items-center">
              {blog.images[currentImageIndex]?.asset?.url ? (
                <Image 
                  key={blog.images[currentImageIndex].asset._id}
                  src={blog.images[currentImageIndex].asset.url}
                  alt={`Blog image ${currentImageIndex + 1}`}
                  height={600}
                  width={600}
                  className="mb-4 rounded"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handlePreviousImage}
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Previous
                </button>
                <span>{currentImageIndex + 1} / {blog.images.length}</span>
                <button
                  onClick={handleNextImage}
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export default BlogDetails
