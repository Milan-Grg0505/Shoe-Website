import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    axios.get(`http://localhost:8000/api/category/${id}`)
      .then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors on form submit
    setErrors({});

    let formErrors = {};

    // Validate category name
    if (!category.name || category.name.trim() === "") {
      formErrors.name = "Category name cannot be empty.";
    }

    // If there are errors, display them and prevent submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/category/update/${id}`, {
        name: category.name,
      }, {
        withCredentials: true,
      });

      toast.success("Categories edited successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => navigate("/admin/categories"), 3000);

      // On successful update, navigate and reset errors
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory, 
      [name]: value, 
    }));
  };

  return (
    <>
      <section className='flex justify-center items-center py-8 px-6'>
        <div className="form-container border py-4 px-6 w-[60%]">
          <h2 className='font-bold text-2xl text-center mx-auto my-2'>Edit Category</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="" className='block font-bold text-xl'>Category :</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder='Enter the name' 
                className='border border-gray-400 rounded-md text-center py-2 px-4 w-full' 
                value={category.name || ""} 
                onChange={handleChange} 
              />
              {/* Display validation error for category name */}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className='text-center'>
              <button className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] inline-block my-2 '>Edit Category</button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default EditCategories;
