import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHero = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (formData) => {
    const errorMessages = {};

    // Title validation
    if (!formData.get('title')?.trim()) {
      errorMessages.title = "Title is required.";
    }

    // SubTitle validation
    if (!formData.get('subTitle')?.trim()) {
      errorMessages.subTitle = "Subtitle is required.";
    }

    // Image validation
    const imageFile = formData.get('image');
    if (!imageFile) {
      errorMessages.image = "Image is required.";
    } else if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(imageFile.type)) {
      errorMessages.image = "Image must be a JPG ,JPEG, WEBP or PNG file.";
    }

    // Description validation
    if (!formData.get('description')?.trim()) {
      errorMessages.description = "Description is required.";
    }

    // Button text validation
    if (!formData.get('buttonText')?.trim()) {
      errorMessages.buttonText = "Button text is required.";
    }

    return errorMessages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate the form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/heroes/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Hero added successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => navigate("/admin/heroes"), 3000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add hero.", {
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
    <>
      <section className="flex justify-center items-center py-4 px-6">
        <div className="form-container py-4 px-6 w-[60%]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="font-bold text-2xl text-center mx-auto my-2">Add Hero</h2>

            <div className="mb-3">
              <label htmlFor="title" className="block font-bold text-xl">
                Title:
              </label>
              <input
                type="text"
                placeholder="Enter the title"
                className="border border-gray-400 rounded-md text-center py-3 px-4 w-full"
                name="title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="subTitle" className="block font-bold text-xl">
                SubTitle:
              </label>
              <input
                type="text"
                placeholder="Enter the subtitle"
                className="border border-gray-400 rounded-md text-center py-3 px-4 w-full"
                name="subTitle"
              />
              {errors.subTitle && <p className="text-red-500 text-sm">{errors.subTitle}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="block font-bold text-xl">
                Image:
              </label>
              <input
                type="file"
                className="border border-gray-400 rounded-md text-center py-3 px-4 w-full bg-white"
                name="image"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="block font-bold text-xl">
                Description:
              </label>
              <textarea
                rows="8"
                className="w-full resize-none border border-gray-400 outline-none rounded-md p-2"
                name="description"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="buttonText" className="block font-bold text-xl">
                Button Text:
              </label>
              <input
                type="text"
                placeholder="Enter button text"
                className="border border-gray-400 rounded-md text-center py-3 px-4 w-full"
                name="buttonText"
              />
              {errors.buttonText && <p className="text-red-500 text-sm">{errors.buttonText}</p>}
            </div>

            <div className="text-center">
              <button className="bg-[#000000] border py-3 px-5 uppercase font-semibold text-sm text-white w-full rounded-md my-2 hover:bg-white hover:text-black">
                Add Hero
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddHero;
