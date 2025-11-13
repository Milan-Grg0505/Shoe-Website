import React from 'react'
import { Link } from 'react-router-dom'
Link

const Footer = () => {
  return (
    <>
      <footer className='bg-[#FFFFFF] text-[#727272]'>
        <div className="container border border-gray-300">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 p-1">
            <div className='border-r border-gray-300 px-10 py-8'>
              <div className='mb-4'>
                <img src="image/logo1.jpg" alt="" />
              </div>
              <div className='text-md font-medium'>
                Praesent nec nisl a purus blandit viverra. Pellentesque habitant morbi tristique senectuse.
              </div>
            </div>

            <div className='px-10 py-8 border-r border-gray-300'>
              <h2 className='font-semibold text-xl capitalize text-black'>Info</h2>

              <hr className='mt-4 mb-8 w-8' />

              <div className='mt-4'>
                <ul className='text-sm font-medium'>
                  <li className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>Custom Service</Link></li>
                  <li className='mt-3  hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>F.A.Q.'s</Link></li>
                  <li className='mt-3  hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>Order Tracking</Link></li>
                  <li className='mt-3  hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>Contact Us</Link></li>
                  <li className='mt-3  hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>Events</Link></li>
                  <li className='mt-3  hover:text-black hover:ml-2 transition-all ease-in-out duration-300'><Link>Popular</Link></li>
                </ul>
              </div>
            </div>

            <div className='border-r border-gray-300 px-10 py-8'>
              <h2 className='mb-4 font-semibold text-xl text-black'>Services</h2>
              <hr className='mt-4 mb-8 w-8' />

              <div className='text-sm font-medium'>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Sitemap</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Privacy Policy</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Your Account</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Advanced Search</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Term & Condition</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Contact Us</p>
              </div>

            </div>
            <div className= 'px-10 py-8'>
              <h2 className='font-semibold text-xl text-black'>Account</h2>
              <hr className='mt-4 mb-8 w-8' />

              <div className='text-sm font-medium'>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Sitemap</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Privacy Policy</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Your Account</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Advanced Search</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Term & Condition</p>
                <p className='mt-3 hover:text-black hover:ml-2 transition-all ease-in-out duration-300'>Contact Us</p>
              </div>

            </div>

          </div>

        </div>
        <div className='bg-[#FFFFFF] py-4 text-center'>
          <p className='font-medium text-[#333333] text-md'>	&#169; 2024 Shoe.made by <span className='text-[#72727272] font-semibold'>Milan Gurung</span></p>
        </div>

      </footer>
    </>
  )
}

export default Footer