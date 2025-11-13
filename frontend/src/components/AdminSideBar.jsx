import { faHouse, faShop, faUser, faLayerGroup, faGift, faMask } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBloggerB } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <>
      <aside className='fixed overflow-auto h-screen w-[20%] border-r-2 border-gray-950 shadow-md bg-black text-white'>
        <div className='py-2 px-4'>
          <ul>
            <li className='mt-2 py-2 border-b'><Link><img src="/image/logo1.jpg" alt="" className='bg-white py-2 px-4 my-2' /></Link></li>
            <li className='mt-2 py-2'>
              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faHouse} />
              </span>
              <Link to="dashboard">Dashboard</Link></li>
            <li className='mt-2 py-2'>
              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faShop} />
              </span>
              <Link to="products">Products</Link></li>
            <li className='mt-2 py-2'>
              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <Link to="users">Users</Link></li>
            <li className='mt-2 py-2'>

              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faLayerGroup} />
              </span>
              <Link to='categories'>Categories</Link></li>
            <li className='mt-2 py-2'>

              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faGift} />
              </span>
              <Link to="orders">Orders</Link></li>
            <li className='mt-2 py-2'>
              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faBloggerB} />
              </span>
              <Link to="blogs"> Blogs</Link></li>
            <li className='mt-2 py-2'>
              <span className='w-8 inline-block'>
                <FontAwesomeIcon icon={faMask} />
              </span>
              <Link to="heroes"> Hero</Link></li>
          </ul>
        </div>


      </aside>
    </>
  )
}

export default AdminSideBar