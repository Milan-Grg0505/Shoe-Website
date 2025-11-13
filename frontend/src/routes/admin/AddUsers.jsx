import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});  // For storing validation errors

  const navigate = useNavigate();

  const validateForm = () => {
    const errorMessages = {};

    // Name validation
    if (!name.trim()) {
      errorMessages.name = "Name is required.";
    } else if (/\d/.test(name)) {
      errorMessages.name = "Name should not contain numbers.";
    }

    // Email validation
    if (!email.trim()) {
      errorMessages.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.email = "Email is invalid.";
    }

    // Address validation
    if (!address.trim()) {
      errorMessages.address = "Address is required.";
    }

    // Phone validation
    if (!phone.trim()) {
      errorMessages.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      errorMessages.phone = "Phone number must be 10 digits.";
    }

    // Password validation
    if (!password.trim()) {
      errorMessages.password = "Password is required.";
    } else if (password.length < 8) {
      errorMessages.password = "Password must be at least 8 characters long.";
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0; // If there are no errors, form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if the form is invalid
    }

    try {
      await axios.post("http://localhost:8000/api/user/add", {
        name: name,
        email: email,
        address: address,
        phone: phone,
        password: password,
       
      });
      toast.success("User added successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => navigate("/admin/users"), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='flex justify-center items-center py-8 px-6'>
        <div className="form-container py-4 px-6 w-[60%]">
          <form onSubmit={handleSubmit}>
            <h2 className='font-semibold text-2xl text-center mx-auto my-2'>Add Users</h2>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>User Name :</label>
              <input
                type="text"
                placeholder='Enter the name'
                className='border border-gray-400 rounded-md text-center py-3 px-4 w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Email :</label>
              <input
                type="text"
                className='border border-gray-400 rounded-md text-center py-3 px-4 w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Address :</label>
              <input
                type="text"
                className='border border-gray-400 rounded-md text-center py-3 px-4 w-full'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Password :</label>
              <input
                type="password"
                className='border border-gray-400 rounded-md text-center py-3 px-4 w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'>Phone:</label>
              <input
                type="number"
                className='border border-gray-400 rounded-md text-center py-3 px-4 w-full'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            {/* <div className='mb-3'>
              <label htmlFor="" className='block font-semibold text-xl'> Role:</label>
              <select className='border border-gray-400 rounded-md text-center py-3 px-4 w-full' name='featured'>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div> */}
            <div className='text-center'>
              <button
                type="submit"
                className='bg-[#000000] border px-5 uppercase font-semibold text-sm py-3 text-white w-full hover:bg-white hover:text-black my-2'
              >
                Add Users
              </button>
            </div>

          </form>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default AddUsers;
