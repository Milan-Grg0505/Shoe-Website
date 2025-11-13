import React, { useEffect, useState } from 'react'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (category) => {
    try {
      await axios.delete(`http://localhost:8000/api/category/delete/${category._id}`, {
        withCredentials: true,
      });
      toast.success("Category deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCategories(() => categories.filter(c => c._id != category._id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <main className='py-3 px-5'>
        <h2 className='text-2xl font-bold text-center my-2'>Categories List</h2>

        <div className='text-end'>
          <Link to="addcategories" className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '> Add Category</Link>
        </div>
        <div className='overflow-auto'>
          <table className='w-full border text-center text-nowrap border-collapse table-striped'>
            <thead>
              <tr className='!bg-[#000000] text-white'>
                <th className='py-3'>Categories</th>
                <th className='py-3'>No of Products</th>
                <th className='py-3'>Action</th>
              </tr>
            </thead>


            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>10</td>
                <td>
                  <div className='flex gap-3 justify-center items-center '>
                    <button className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '>
                      <Link to={`edit/${category._id}`}><FontAwesomeIcon icon={faPen} className='mr-1' />Edit </Link></button>
                    <FontAwesomeIcon icon={faTrash} className='bg-[#F8F9FB] rounded-md p-3'
                      onClick={() => handleDelete(category)} />
                  </div>
                </td>
              </tr>
            ))}


          </table>
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default Categories