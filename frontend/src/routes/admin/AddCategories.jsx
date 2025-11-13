import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategories = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      return "Category name is required.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/category/add",
        { name },
        {
          withCredentials: true,
        }
      );

      toast.success("Category added successfully...", {
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <section className="flex justify-center items-center py-8 px-6">
        <div className="form-container py-4 px-6 w-[60%]">
          <h2 className="font-bold text-2xl text-center mx-auto my-2">Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block font-bold text-xl">
                Category:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter the category name"
                className={`border ${
                  error ? "border-red-500" : "border-gray-400"
                } rounded-md text-center py-2 px-4 w-full`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(''); // Clear error while typing
                }}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="text-center">
              <button
                className="bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm text-white w-full rounded-md hover:bg-white hover:text-black my-2"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AddCategories;
