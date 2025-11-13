import { faCartArrowDown, faGauge, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const UserSideBar = () => {
 
  return (
    <>
      <div className="container p-10">
        <div className="sidebar">

          <ul>
            <li className='pr-20 pl-4 py-3 border border-gray-500 uppercase text-md hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all ease-in-out duration-300'>
              <Link to="dashboard" className='block'>
                <FontAwesomeIcon icon={faGauge} className='mr-4'/>
                Dashboard
              </Link>
            </li>
            <li className='pr-20 pl-4 py-3 border border-gray-500 text-md border-t-0 hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all ease-in-out duration-300'>
              <Link to="orders" className='block'>
                <FontAwesomeIcon icon={faCartArrowDown} className='mr-4'/>
                Orders
              </Link>
            </li>
            <li className='pr-20 pl-4 py-3 border border-gray-500 uppercase text-md border-t-0 hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all ease-in-out duration-300'>
              <Link to="profile" className='block'>
                <FontAwesomeIcon icon={faUserPen} className='mr-4'/>
                Account Details
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default UserSideBar