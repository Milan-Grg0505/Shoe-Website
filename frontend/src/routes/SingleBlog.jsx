import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';



const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:8000/api/blog/${id}`)
      .then(res => {
        setBlogs(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, [id]);
  return (
    <>
      <section className='single-blog'>
        <div className="container p-10">
          <div className="blog w-4/5 mx-auto">
            <h2 className='uppercase font-semibold text-3xl my-3 text-center text-black'>{blog.title}</h2>
            <div className='my-4'>
              <img src={`http://localhost:8000/${blog.image}`} alt="" className='w-full h-[400px] object-contain' />
            </div>

            <div className="blog-description text-xl px-2 py-4 font-normal text-gray-500">
              <p>{blog.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleBlog