import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    
    // Validate name
    const name = formData.get('name');
    if (!name) newErrors.name = "Product name is required.";
    else if (name.length > 50) newErrors.name = "Name must not exceed 50 characters.";

    // Validate image
    const image = formData.get('image');
    if (!image) newErrors.image = "Product image is required.";
    else if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(image.type)) {
      newErrors.image = "Image must be a .jpg, .jpeg, .webp,or .png file.";
    } else if (image.size > 2 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 2MB.";
    }

    // Validate price
    const price = formData.get('price');
    if (!price) newErrors.price = "Product price is required.";
    else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    // Validate category
    const category = formData.get('category');
    if (!category) newErrors.category = "Category is required.";

    // Validate quantity
    const quantity = formData.get('quantity');
    if (!quantity) newErrors.quantity = "Quantity is required.";
    else if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive integer.";
    }

    // Validate stocks
    const stocks = formData.get('stocks');
    if (!stocks) newErrors.stocks = "Stocks are required.";
    else if (!Number.isInteger(Number(stocks)) || Number(stocks) <= 0) {
      newErrors.stocks = "Stocks must be a positive integer.";
    }

    // Validate discountRate (optional)
    const discountRate = formData.get('discountRate');
    if (discountRate && (Number(discountRate) < 0 || Number(discountRate) > 100)) {
      newErrors.discountRate = "Discount rate must be between 0 and 100.";
    }

    // Validate thumbnails (optional)
    // const thumbnails = formData.getAll('thumbnails');
    // thumbnails.forEach((file, index) => {
    //   if (file && !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    //     newErrors[`thumbnails_${index}`] = "Thumbnails must be .jpg, .jpeg, or .png files.";
    //   } else if (file && file.size > 2 * 1024 * 1024) {
    //     newErrors[`thumbnails_${index}`] = `Thumbnail ${index + 1} must be less than 2MB.`;
    //   }
    // });

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      await axios.post("http://localhost:8000/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      toast.success("Product added successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => navigate("/admin/products"), 3000);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <section className='flex justify-center items-center py-4 px-6'>
        <div className="form-container py-4 px-6 w-[50%]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className='font-bold text-2xl text-center mx-auto my-2'>Add Products</h2>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Items Name :</label>
              <input type="text" placeholder='Enter the name' className='border border-gray-400 rounded-md text-center py-2 px-4 w-full' name='name' />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Image :</label>
              <input type="file" className='border border-gray-400 rounded-md text-center py-3 px-4 w-full bg-white' name='image' />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Thumbnails :</label>
              <input type="file" multiple name="thumbnails" className='border border-gray-400 rounded-md text-center py-3 px-4 w-full bg-white' />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Price :</label>
              <input type="number" name='price' className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'> Category:</label>

              <select className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='category'>
                {categories?.map((category, index) => (
                  <option key={index} value={`${category._id}`}>{category.name}</option>
                ))}

              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'> Featured:</label>
              <select className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='featured'>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'> Top Seller:</label>
              <select className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='topSeller'>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl' > Quantity:</label>
              <input type="number" className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='quantity' />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'> Discount Rate:</label>
              <input type="number" className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='discountRate' />
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl' > Stocks:</label>
              <input type="number" className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name="stocks" />
              {errors.stocks && <p className="text-red-500 text-sm">{errors.stocks}</p>}
            </div>

            <div className='text-center'>
              <button className='bg-[#000000] border py-3 px-5 uppercase font-semibold text-sm text-white w-full rounded-md my-2 hover:bg-white hover:text-black'>Add Products</button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </section>

    </>
  )
}

export default AddProducts