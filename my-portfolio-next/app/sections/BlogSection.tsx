import React, { useEffect, useState } from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanityClient'
import { Blog } from '../types'
import { calculateReadTime } from '../utils/readTime'
import Image from 'next/image'

const builder = imageUrlBuilder(client)

interface ImageSource {
  _id: string;
  asset: {
    _id:string,
    url:string
  };
}

function urlFor(source: ImageSource | string) {
  return builder.image(source)
}

function truncateDescription(description: string, maxWords: number = 20) {
  const words = description.split(' ')
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    async function fetchBlogs() {
      const blogsData: Blog[] = await client.fetch(`*[_type == "blog"] | order(publishedAt desc) {
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
      }`)

      setBlogs(blogsData)

      const initialImageIndices = blogsData.reduce((acc: { [key: string]: number }, blog: Blog) => {
        acc[blog._id] = 0
        return acc
      }, {})
      setCurrentImageIndex(initialImageIndices)
    }

    fetchBlogs()
  }, [])

  const handleNextImage = (blogId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [blogId]: (prev[blogId] + 1) % totalImages,
    }))
  }

  const handlePrevImage = (blogId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [blogId]: prev[blogId] === 0 ? totalImages - 1 : prev[blogId] - 1,
    }))
  }

  return (
    <motion.section
      id="blogs"
      style={{ scale, opacity }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl text-center relative z-10 mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Read My Blogs</h2>
        <p className="text-lg text-gray-400">
          Explore my thoughts, tutorials, and insights on various topics.
        </p>
      </motion.div>

      <motion.div className="w-full max-w-6xl text-center md:text-left relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const readTime = calculateReadTime(blog.content)
            const publishedDate = new Date(blog.publishedAt).toLocaleDateString()

            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden 
                           transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary group flex flex-col"
              >
                <div className="relative">
                  {blog.images && blog.images.length > 0 && (
                    <Image
                      src={urlFor(blog.images[currentImageIndex[blog._id]]).url()}
                      alt={blog.title}
                      width={640}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                    <button
                      onClick={() => {
                        if (blog.images) {
                          handlePrevImage(blog._id, blog.images.length)
                        } else {
                          console.warn('No images available')
                        }
                      }}
                      className="bg-gray-700 hover:bg-gray-600 rounded-full p-1"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => {
                        if (blog.images) {
                          handleNextImage(blog._id, blog.images.length)
                        } else {
                          console.warn('No images available')
                        }
                      }}
                      className="bg-gray-700 hover:bg-gray-600 rounded-full p-1"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-gray-300">{truncateDescription(blog.description)}</p>
                  <p className="text-yellow-400 text-lg font-bold">{readTime} min read</p>
                  <p className="text-gray-500 text-sm italic">{publishedDate}</p>
                  <Link
                    href={`/blog/${blog.slug.current}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="flex items-center mt-2 text-blue-400 hover:underline"
                  >
                    Read More <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}