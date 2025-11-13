import React, { useState, useEffect } from 'react'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/blog")
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (blog) => {
    try {
      await axios.delete(`http://localhost:8000/api/blog/delete/${blog._id}`, {
        withCredentials: true,
      });

      toast.success("Blog deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setBlogs(() => blogs.filter(b => b._id != blog._id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <main className='py-3 px-5'>
        <h2 className='text-2xl font-bold text-center my-2'>Blogs List</h2>

        <div className='text-end'>
          <Link to="addblogs" className='bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '>Add Blogs</Link>
        </div>
        <div className='overflow-auto'>
          <table className='w-full border text-center text-nowrap border-collapse table-striped'>
            <thead>
              <tr className='!bg-[#000000] text-white'>
                <th className='py-3'>Title</th>
                <th className='py-3'>Image</th>
                <th className='py-3'>Description</th>
                <th className='py-3'>Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, index) => (
                <tr key={index}>
                  <td>{blog.title}</td>
                  <td>
                    <img src={`http://localhost:8000/${blog.image}`} alt="" className="w-[100px] h-auto m-auto" />
                  </td>
                  <td>{blog.description}</td>
                  <td>
                    <div className='flex gap-3 justify-center items-center '>
                      <button className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] inline-block my-2 '>
                        <Link to={`edit/${blog._id}`}><FontAwesomeIcon icon={faPen} className='mr-1' />
                          Edit
                        </Link>
                      </button>
                      <FontAwesomeIcon icon={faTrash} className='bg-[#F8F9FB] rounded-md p-3' onClick={() => handleDelete(blog)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </main>
    </>
  )
}

export default Blogs