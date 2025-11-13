import React,{useState,useEffect} from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import axios from 'axios'
import BlogSection from '../components/BlogSection'


const Home = () => {
  const [products,setProducts] = useState([]);
  const [blogs,setBlogs] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:8000/api/product")
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));

    axios.get("http://localhost:8000/api/blog")
    .then(res => {
      setBlogs(res.data);
    })
    .catch(err => {
      console.error(err);

    });
  },[]);

  
  const featured = products.filter((p)=>p.featured);
  return (
    <>
      <Hero />
      <ProductSection products={products} title={"Our Products"}/>
      <BlogSection blogs={blogs} title={"Our Blogs"}/>
    </>
  )
}

export default Home