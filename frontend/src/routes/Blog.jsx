import React,{useState,useEffect} from 'react'
import BlogSection from '../components/BlogSection'
import axios from 'axios';

const Blog = () => {

  const [blogs,setBlogs] = useState([]);
  useEffect(()=> {

    axios.get("http://localhost:8000/api/blog")
    .then(res => {
      setBlogs(res.data);
    })
    .catch(err => {
      console.error(err);

    });
  },[]);
  
  return (
    <>
      <BlogSection blogs={blogs} title={"Our Blogs"}/>
    </>
  )
}

export default Blog