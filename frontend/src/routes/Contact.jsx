import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';


const Contact = () => {
  return (
    <>
      <section>
        <div className='w-full'>
          <img src="image/contact.webp" alt="" className='w-full' />
        </div>
        <div className="container py-20 px-10">

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          

            <div className="left w-1/2 px-2">
              <h2 className='text-2xl font-bold uppercase section'>Contact Us</h2>

              <p className='text-md text-[#000000] mt-4'>If you would like to know more about our policies, you can consult our Terms and Conditions. You will also be able to follow your order (tracking number will be provided in an e-mail after ordering). You wish to return some items? <span className='text-[#72727272]'>Click here.</span></p>

              <div className='mt-4'>
                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faLocationDot} /> <p className='text-md text-[#72727272] py-4'>Address : Thali, Kathmandu</p>
                </div>

                <hr />

                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faEnvelope} /> <p className='text-md text-[#72727272] py-4'>puan@gmail.com</p>
                </div>

                <hr />

                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faPhone} /> <p className='text-md text-[#72727272] py-4'>+977986712434</p>
                </div>

              </div>

              <div>
                <h2 className='font-bold text-md'>Working Hours</h2>
                <p className='font-semibold text-md mt-2'>Monday-Saturday : <span className='text-md text-[#999999] mt-2 font-normal'>08:00AM - 6:00PM</span></p>
              </div>
            </div>

            <div className="right w-1/2">
              <h2 className='text-4xl font-semibold capitalize my-5 section'>Send us an message</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name..."
                  className="border bg-[#FFFFFF] text-md py-5 px-5 rounded-md w-full"
                />
              
              </div>

              <div className='mb-4'>
              <input type="number" placeholder="Your Email..." className="border bg-[#FFFFFF] text-sm py-5 px-5 rounded-md w-full" />
              </div>
             
              <div className="mt-4">
                <textarea
                  rows="4"
                  placeholder="Your Message..."
                  className="border bg-[#FFFFFF] text-md py-5 px-5 w-full resize-none outline-none rounded-md"
                ></textarea>
              </div>

              <div className="mt-4">
                <Link
                  to="addproducts"
                  className="bg-[#000000] border py-3 px-5 uppercase font-semibold text-md text-[#FFFFFF] rounded-md w-full my-2 inline-block text-center"
                >
                  Submit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
