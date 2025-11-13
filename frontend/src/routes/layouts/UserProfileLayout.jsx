import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import UserSideBar from '../../components/UserSideBar'


const UserProfileLayout = () => {
  return (
    <>
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className="sidebar lg:w-2/5">
            <UserSideBar />
          </div>

          <div className='lg:w-3/5'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileLayout