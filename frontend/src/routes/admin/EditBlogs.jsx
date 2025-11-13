import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBlogs = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [errors, setErrors] = useState({});  // State to store validation errors

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blog/${id}`, {
      withCredentials: true,
    })
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors on form submit
    setErrors({});

    let formErrors = {};
    const formData = new FormData(e.target);

    // Validation: Check for empty title
    if (!blog.title || blog.title.trim() === "") {
      formErrors.title = "Title cannot be empty.";
    }

   // Validate image (if provided, must be less than 2MB)
   const imageFile = formData.get('image');
   if (imageFile && imageFile.size > 2 * 1024 * 1024) {
     formErrors.image = 'Image size must be under 2MB.';
   }


    // Validation: Check for description
    if (!blog.description || blog.description.trim() === "") {
      formErrors.description = "Description cannot be empty.";
    }

    // If there are errors, set them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Blog edited successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => navigate("/admin/blogs"), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  return (
    <>
      <section className='flex justify-center items-center py-8 px-6'>
        <div className="form-container border py-4 px-6 w-[60%]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className='font-bold text-2xl text-center mx-auto my-2'>Edit Blogs</h2>

            {/* Title Input */}
            <div className='mb-3'>
              <label htmlFor="" className='block font-bold text-xl'>Title :</label>
              <input
                type="text"
                placeholder='Enter the title'
                className='border border-gray-400 rounded-md text-center py-2 px-4 w-full'
                name='title'
                value={blog.title}
                onChange={handleChange}
              />
              {/* Display validation error for title */}
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Image Input */}
            <div className='mb-3'>
              <label htmlFor="" className='block font-bold text-xl'>Image :</label>
              <input
                type="file"
                className='border border-gray-400 rounded-md text-center py-2 px-4 w-full'
                name='image'
              />
              {/* Display validation error for image */}
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Description Input */}
            <div className='mb-3'>
              <label htmlFor="" className='block font-bold text-xl'>Description :</label>
              <textarea
                rows="8"
                className='w-full resize-none border border-gray-400 outline-none rounded-md p-2'
                name='description'
                value={blog.description}
                onChange={handleChange}
              />
              {/* Display validation error for description */}
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className='text-center'>
              <button className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] inline-block my-2 '>Edit Blog</button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default EditBlogs;
