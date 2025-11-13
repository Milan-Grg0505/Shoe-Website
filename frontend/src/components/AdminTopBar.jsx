import { faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
const AdminTopBar = () => {

  const handleLogout = async () =>{
    try {
      await axios.post("http://localhost:8000/api/auth/logout",{},{
        
        withCredentials: true,
      }).then(() => navigate("/login"))
     .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header className='flex justify-end gap-4 text-xl py-5 px-7 border-b shadow-md bg-black text-white '>
    
          <FontAwesomeIcon icon={faUserPlus}/>
          <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout}/>
      
      </header>
    </>
  )
}

export default AdminTopBar