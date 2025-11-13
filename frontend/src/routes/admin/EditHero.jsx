import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditHero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState({});
  const [errors, setErrors] = useState({});

  // Fetch hero data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/heroes/${id}`, { withCredentials: true })
      .then((res) => setHero(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Validate the form data
  const validateForm = (formData) => {
    const newErrors = {};

    // Validate title
    if (!formData.get('title').trim()) {
      newErrors.title = 'Title is required.';
    }

    // Validate subtitle
    if (!formData.get('subTitle').trim()) {
      newErrors.subTitle = 'Subtitle is required.';
    }

    // Validate image size
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size must be under 2MB.';
    }

    // Validate button text
    if (!formData.get('buttonText').trim()) {
      newErrors.buttonText = 'Button text is required.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate form data
    if (!validateForm(formData)) {
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/heroes/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast.success('Hero edited successfully...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setTimeout(() => navigate('/admin/heroes'), 3000);
    } catch (error) {
      console.log(error);
      toast.error('Failed to edit hero. Please try again.', {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="flex justify-center items-center py-4 px-6">
        <div className="form-container border py-4 px-6 w-[60%]">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="font-bold text-2xl text-center mx-auto my-2">Edit Hero</h2>

            {/* Title Field */}
            <div className="mb-3">
              <label htmlFor="title" className="block font-bold text-xl">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={hero.title || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter the title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* SubTitle Field */}
            <div className="mb-3">
              <label htmlFor="subTitle" className="block font-bold text-xl">
                SubTitle:
              </label>
              <input
                type="text"
                name="subTitle"
                value={hero.subTitle || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.subTitle ? 'border-red-500' : ''}`}
                placeholder="Enter the subtitle"
              />
              {errors.subTitle && <p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>}
            </div>

            {/* Image Field */}
            <div className="mb-3">
              <label htmlFor="image" className="block font-bold text-xl">
                Image:
              </label>
              <input
                type="file"
                name="image"
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Button Text Field */}
            <div className="mb-3">
              <label htmlFor="buttonText" className="block font-bold text-xl">
                Button Text:
              </label>
              <input
                type="text"
                name="buttonText"
                value={hero.buttonText || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.buttonText ? 'border-red-500' : ''}`}
                placeholder="Enter button text"
              />
              {errors.buttonText && <p className="text-red-500 text-sm mt-1">{errors.buttonText}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button className="bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] inline-block my-2">
                Edit Hero
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default EditHero;
