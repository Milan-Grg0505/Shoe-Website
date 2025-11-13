import React from 'react'
import BlogCard from './BlogCard'

const BlogSection = ({ title, blogs }) => {

  return (
    <>
      <section className='my-8'>
        <div className="container">
          <div className='text-center'>
            <h2 className='text-2xl font-normal mb-7  border-b-2 inline-block border-black '>{title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (

              <BlogCard key={index} blogs={blog} />

            ))}

          </div>
        </div>
      </section>
    </>
  )
}

export default BlogSection