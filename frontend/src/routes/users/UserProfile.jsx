import axios from 'axios';
import React,{useState,useEffect} from 'react'

const UserProfile = () => {

  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    
    const getUserDetails = async () =>{
      try {
        const response = await axios.get("http://localhost:8000/api/user/get",{
          withCredentials: true,
        })
        .then((res) =>{
          setUserDetails(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();
  })

  return (
    <>
      <section>
        <div className="container p-10">
          <div className="accountDetails border border-gray-400 py-10 px-5">
            <h2 className='font-semibold text-2xl uppercase border-b-2 border-dotted text-center'>Account Details</h2>
            <form action="">
              <div className='mt-4'>
                <input type="text" placeholder='Name' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' value={userDetails && userDetails.name}/>
              </div> 
              <div className='mt-4'> 
                <input type="text" placeholder='Email' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' value={userDetails && userDetails.email}/>
              </div>
              <div className='mt-4'>
                <input type="text" placeholder='Address' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' value={userDetails && userDetails.address}/>
              </div>
              <div className='mt-4'>
                <input type="text" placeholder='Phone' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' value={userDetails && userDetails.phone}/>
              </div>
            </form>

            <div className='password mt-8'>
              <h2 className='font-semibold text-lg uppercase border-b-2 border-dotted'>Password Change</h2>
              <form action="">
                <div className='mt-4'>
                 
                  <input type="text" placeholder='Current Password' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' />
                </div>

                <div className='flex gap-2'>
                  <div className='mt-4 flex-grow'>
                    <input type="text" placeholder='New Password' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' />
                  </div>
                  <div className='mt-4 flex-grow'>
                    <input type="text" placeholder='Change Password' className='border border-gray-400 rounded-md py-3 px-4 w-full focus:border-[#000000] focus:bg-white' />
                  </div>
                </div>

              </form>
            </div>

            <div className='mt-4 text-center'>
              <button className='bg-[#000000] w-full rounded-md border py-2 px-5 uppercase font-semibold text-sm text-[#FFFFFF]'>
                Save Changes
              </button>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default UserProfile