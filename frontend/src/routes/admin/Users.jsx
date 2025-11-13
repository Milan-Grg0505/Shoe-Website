import React, { useEffect, useState } from 'react'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users,setUsers] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:8000/api/user")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  },[]);

  const handleDelete = async (user) =>{
    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${user._id}`);
      toast.success("User deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUsers(() => users.filter(u=>u._id !=user._id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <main className='py-3 px-5'>
        <h2 className='text-2xl font-bold text-center my-2'>Users List</h2>

        <div className='text-end'>
          <Link to="addusers" className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '>Add Users</Link>
        </div>
        <div className='overflow-auto'>
          <table className='w-full border text-center text-nowrap border-collapse  table-striped'>
            <thead>
              <tr className='!bg-[#000000] text-white'>
                <th className='py-3'>User Name</th>
                <th className='py-3'>Email</th>
                <th className='py-3'>Address</th>
                <th className='py-3'>Phone</th>
                <th className='py-3'>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user,index)=>(
                <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                  <div className='flex gap-3 justify-center items-center '>
                    
                    <FontAwesomeIcon icon={faTrash} className='bg-[#F8F9FB] rounded-md p-3' onClick={() => handleDelete(user)}/>
                  </div>
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default Users