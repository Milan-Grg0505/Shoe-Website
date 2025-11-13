import React, { useEffect, useState } from 'react'
import { faShop, faUser, faLayerGroup, faGift } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBloggerB } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'


const Dashboard = () => {

  const [data,setData] = useState({product:0,user:0,categories:0,order:0,blog:0});

  useEffect(() => {
    axios.get("http://localhost:8000/api/product").then(res => setData((prev) => ({
      ...prev, 
      product: res.data.length,
      
    })))
    axios.get("http://localhost:8000/api/user").then(res => setData((prev) => ({
      ...prev, 
      user: res.data.length,
      
    })))
    axios.get("http://localhost:8000/api/blog").then(res => setData((prev) => ({
      ...prev, 
      blog: res.data.length,
      
    })))
    axios.get("http://localhost:8000/api/category").then(res => setData((prev) => ({
      ...prev, 
      categories: res.data.length,
      
    })))
    axios.get("http://localhost:8000/api/order").then(res => setData((prev) => ({
      ...prev, 
      order: res.data.length,
      
    })))
  })
  return (
    <>
      <main className='p-6'>
   
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className='flex dashboard-card gap-3 shadow-md py-6 px-10 items-center bg-white rounded-md'>
            <FontAwesomeIcon icon={faShop} className='text-2xl'/>
                <div>
                  <h2 className='text-xl font-bold'>Products</h2>
                  <p className='text-md font-semibold'>{data.product}</p>
                </div>
            </div>
            <div className='flex dashboard-card gap-3 shadow-md py-6 px-10 items-center bg-white rounded-md'>
            <FontAwesomeIcon icon={faUser} className='text-2xl'/>
                <div>
                  <h2 className='text-xl font-bold'>Users</h2>
                  <p className='text-md font-semibold'>{data.user}</p>
                </div>
            </div>
            <div className='flex dashboard-card gap-3 shadow-md py-6 px-10 items-center bg-white rounded-md'>
            <FontAwesomeIcon icon={faLayerGroup} className='text-2xl'/>
                <div>
                  <h2 className='text-xl font-bold'>Categories</h2>
                  <p className='text-md font-semibold'>{data.categories}</p>
                </div>
            </div>
            <div className='flex dashboard-card gap-3 items-center shadow-md py-6 px-10 bg-white'>
            <FontAwesomeIcon icon={faGift} className='text-2xl'/>
                <div>
                  <h2 className='text-xl font-bold'>Orders</h2>
                  <p className='text-md font-semibold'>{data.order}</p>
                </div>
            </div>
            <div className='flex dashboard-card gap-3 shadow-md py-6 px-10 items-center bg-white rounded-md'>
            <FontAwesomeIcon icon={faBloggerB} className='text-2xl'/>
                <div>
                  <h2 className='text-xl font-bold'>Blogs</h2>
                  <p className='text-md font-semibold'>{data.blog}</p>
                </div>
            </div>
          </div>
     
      </main>
    </>
  )
}

export default Dashboard