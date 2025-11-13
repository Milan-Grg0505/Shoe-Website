import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/product")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);
  const handleDelete = async (product) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/delete/${product._id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setProducts(() => products.filter(p => p._id != product._id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className='py-3 px-5'>
        <h2 className='text-2xl font-bold text-center my-2'>Product List</h2>

        <div className='text-end'>
          <Link to="addproducts" className='bg-[#282222] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '>Add Product</Link>
        </div>
        <div className='overflow-auto'>
          <table className='w-full border text-center text-nowrap border-collapse table-striped'>
            <thead>
              <tr className='!bg-[#000000] text-white'>
                <th className='py-3'>Item Name</th>
                <th className='py-3'>Image</th>
                <th className='py-3'>Price</th>
                <th className='py-3'>Category</th>
                <th className='py-3'>Quantity</th>
                <th className='py-3'>Stocks</th>
                <th className='py-3'>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>
                    <img src={`http://localhost:8000/${p.image}`} alt="image" className="w-[100px] h-auto m-auto" />
                  </td>
                  <td>Rs.{p.price}</td>
                  <td>Sneaker</td>
                  <td>{p.quantity}</td>
                  <td>{p.stocks}</td>
                  <td>
                    <div className='flex gap-3 justify-center items-center '>
                      <button className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2 '>
                        <Link to={`edit/${p._id}`}><FontAwesomeIcon icon={faPen} className='mr-1' />Edit </Link></button>
                      <FontAwesomeIcon icon={faTrash} className='bg-[#F8F9FB] rounded-md p-3' onClick={() => handleDelete(p)} />
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

export default Products