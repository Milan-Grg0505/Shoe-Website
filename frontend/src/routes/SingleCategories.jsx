import React,{useEffect,useState} from 'react'
import ProductSection from '../components/ProductSection.jsx'
import { useParams } from 'react-router-dom';
import axios from 'axios';



const SingleCategories = () => {
  const {id} = useParams();
  const [category,setCategory] = useState({});
  useEffect(()=> {
    axios.get(`http://localhost:8000/api/category/${id}`)
    .then(res => setCategory(res.data))
    .catch(err => console.log(err));
  },[id]);

  const [products,setProducts] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:8000/api/product")
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));
  },[]);

  const filter = products.filter((p)=>p.category._id == id);
  // console.log(filter)
  // console.log(products)
  return (
    <>
      <ProductSection products ={filter} title={category.name}/>
    </>
  )
}

export default SingleCategories