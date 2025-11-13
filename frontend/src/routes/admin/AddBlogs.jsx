import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlogs = () => {
  const navigate = useNavigate();

  // Error state
  const [errors, setErrors] = useState({
    title: '',
    image: '',
    description: '',
  });

  // Validation function
  const validateForm = (formData) => {
    const newErrors = {
      title: '',
      image: '',
      description: '',
    };

    // Validate title
    if (!formData.get('title').trim()) {
      newErrors.title = 'Title is required.';
    }

    // Validate image
    const image = formData.get('image');
    if (!image) newErrors.image = "Product image is required.";
    else if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(image.type)) {
      newErrors.image = "Image must be a .jpg, .jpeg, .webp,or .png file.";
    } else if (image.size > 2 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 2MB.";
    }
    
    // Validate description
    if (!formData.get('description').trim()) {
      newErrors.description = 'Description is required.';
    }

    setErrors(newErrors);

    // Return true if no errors exist
    return !newErrors.title && !newErrors.image && !newErrors.description;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate form data
    if (!validateForm(formData)) {
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast.success('Blog added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setTimeout(() => navigate('/admin/blogs'), 3000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add blog. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <section className="flex justify-center items-center py-8 px-6">
        <div className="form-container py-4 px-6 w-[60%]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="font-bold text-2xl text-center mx-auto my-2">Add Blogs</h2>

            {/* Title Field */}
            <div className="mb-3">
              <label htmlFor="title" className="block font-bold text-xl">
                Title:
              </label>
              <input
                type="text"
                placeholder="Enter the blog title"
                className={`border rounded-md text-center py-2 px-4 w-full ${
                  errors.title && 'border-red-500'
                }`}
                name="title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Image Field */}
            <div className="mb-3">
              <label htmlFor="image" className="block font-bold text-xl">
                Image:
              </label>
              <input
                type="file"
                className={`border rounded-md text-center py-2 px-4 w-full bg-white ${
                  errors.image && 'border-red-500'
                }`}
                name="image"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Description Field */}
            <div className="mb-3">
              <label htmlFor="description" className="block font-bold text-xl">
                Description:
              </label>
              <textarea
                rows="8"
                className={`resize-none border outline-none rounded-md p-2 w-full ${
                  errors.description && 'border-red-500'
                }`}
                name="description"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm mt-2 text-white hover:bg-white hover:text-black w-full rounded-md"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddBlogs;
