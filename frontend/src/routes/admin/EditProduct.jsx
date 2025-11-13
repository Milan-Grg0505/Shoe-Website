import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`, { withCredentials: true })
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Validate form data
  const validateForm = (formData) => {
    const newErrors = {};

    // Validate name
    if (!formData.get('name').trim()) {
      newErrors.name = 'Product name is required.';
    }

    // Validate image (if provided, must be less than 2MB)
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size must be under 2MB.';
    }

    // Validate price
    if (!formData.get('price') || parseFloat(formData.get('price')) <= 0) {
      newErrors.price = 'Valid price is required.';
    }

    // Validate quantity
    if (!formData.get('quantity') || parseInt(formData.get('quantity')) <= 0) {
      newErrors.quantity = 'Valid quantity is required.';
    }

    // Validate stocks
    if (!formData.get('stocks') || parseInt(formData.get('stocks')) < 0) {
      newErrors.stocks = 'Stocks cannot be negative.';
    }

    // Validate discount rate
    const discountRate = formData.get('discountRate');
    if (discountRate && (discountRate < 0 || discountRate > 100)) {
      newErrors.discountRate = 'Discount rate must be between 0 and 100.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate the form data
    if (!validateForm(formData)) {
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/product/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast.success('Product updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setTimeout(() => navigate('/admin/products'), 3000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product. Please try again.', {
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
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="flex justify-center items-center py-4 px-6">
        <div className="form-container border py-4 px-6 w-[60%]">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <h2 className="font-bold text-2xl text-center mx-auto my-2">Edit Products</h2>

            {/* Name Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Items Name:</label>
              <input
                type="text"
                name="name"
                value={product.name || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter the product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Image Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Image:</label>
              <input
                type="file"
                name="image"
                className={`border rounded-md text-center py-2 px-4 w-full bg-white ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Thumbnails */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Thumbnails:</label>
              <input type="file" multiple name="thumbnails" className="border rounded-md text-center py-2 px-4 w-full" />
            </div>

            {/* Price Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Price:</label>
              <input
                type="number"
                name="price"
                value={product.price || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Category:</label>
              <select
                name="category"
                className="border rounded-md text-center py-2 px-4 w-full"
                value={product.category || ''}
                onChange={handleChange}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Featured:</label>
              <select
                name="featured"
                className="border rounded-md text-center py-2 px-4 w-full"
                value={product.featured || ''}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Top Seller */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Top Seller:</label>
              <select
                name="topSeller"
                className="border rounded-md text-center py-2 px-4 w-full"
                value={product.topSeller || ''}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Quantity Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.quantity ? 'border-red-500' : ''}`}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Discount Rate Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Discount Rate:</label>
              <input
                type="number"
                name="discountRate"
                value={product.discountRate || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.discountRate ? 'border-red-500' : ''}`}
              />
              {errors.discountRate && <p className="text-red-500 text-sm mt-1">{errors.discountRate}</p>}
            </div>

            {/* Stocks Field */}
            <div className="mb-3">
              <label className="block font-bold text-xl">Stocks:</label>
              <input
                type="number"
                name="stocks"
                value={product.stocks || ''}
                onChange={handleChange}
                className={`border rounded-md text-center py-2 px-4 w-full ${errors.stocks ? 'border-red-500' : ''}`}
              />
              {errors.stocks && <p className="text-red-500 text-sm mt-1">{errors.stocks}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button className="bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] inline-block my-2">
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default EditProduct;
