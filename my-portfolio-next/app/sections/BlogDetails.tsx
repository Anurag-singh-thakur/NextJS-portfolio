import React from 'react'
import { useRouter } from 'next/router'
import { client } from '@/sanityClient'
import { Blog } from '../types'
const BlogDetails = () => {
 const router = useRouter()
 const { slug } = router.query
  const [blog, setBlog] = React.useState<Blog | null>(null)
  React.useEffect(() => {
   if (slug) {
     async function fetchBlogDetails() {
       const blogData = await client.fetch(`*[_type == "blog" && slug.current == $slug][0] {
         _id,
         title,
         description,
         content,
         author,
         publishedAt
       }`, { slug })
        setBlog(blogData)
     }
      fetchBlogDetails()
   }
 }, [slug])
  if (!blog) return <div>Loading...</div>
  return (
   <div className="p-6">
     <h1 className="text-3xl font-bold">{blog.title}</h1>
     <p className="text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</p>
     <p className="text-gray-700">{blog.content}</p>
   </div>
 )
}
export default BlogDetails; 