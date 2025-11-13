import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminTopBar from '../../components/AdminTopBar';
import AdminSideBar from '../../components/AdminSideBar';


const AdminLayout = () => {
  return (
    <>
    <div className='bg-[#F3F3F9] min-h-screen'>
      <AdminSideBar />
      <div className='w-[80%] ml-auto'>
        <AdminTopBar />
        <Outlet />
      </div>
    </div>

    </>
  )
}

export default AdminLayout