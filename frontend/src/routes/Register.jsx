import axios from 'axios';
import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneError("");
    setAddressError("");

    // Validation Checks
    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    }

    if (!phone || isNaN(phone)) {
      setPhoneError("Please enter a valid phone number");
      valid = false;
    }

    if (!address) {
      setAddressError("Address is required");
      valid = false;
    }

    if (!valid) return; // Stop the form submission if validation fails

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        { name, email, password, phone, address,image }
      );

      console.log(response.data); // For debugging, log the entire response

      // Navigate based on successful registration
      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      toast.error(err.response?.data?.message || "Registration failed", {
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
      <section className="flex justify-center items-center py-8 px-6">
        <div className="form-container py-4 px-6 w-[50%]">
          <form onSubmit={handleSubmit}>

            <h2 className='text-4xl capitalize font-semibold text-black mb-6 text-center'>Create Account</h2>
            <p className='text-sm text-[#727272] text-center mb-12'>Please fill in the fields below</p>

            <div className='mb-7'>
              <input
                type="text"
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className="border border-gray-400 rounded-md py-3 px-4 w-full"
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>

            <div className='mb-7'>
              <input
                type="text"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className="border border-gray-400 rounded-md py-3 px-4 w-full"
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>

            <div className='mb-7'>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className="border border-gray-400 rounded-md py-3 px-4 w-full"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <div className='mb-7'>
              <input
                type="text"
                name='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
                className="border border-gray-400 rounded-md py-3 px-4 w-full"
              />
              {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
            </div>

            <div className='mb-7'>
              <input
                type="number"
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone'
                className="border border-gray-400 rounded-md py-3 px-4 w-full"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

            <div className="text-center mb-4">
              <button
                type="submit"
                className="border-2 border-gray-800 rounded-md w-full py-3 px-5 uppercase tracking-wider text-sm my-2 hover:bg-black hover:text-white "
              >
                Register
              </button>
            </div>

            <div className='flex gap-2 items-center justify-center'>
              <p className='text-sm text-[#727272]'>Already have an account?</p>
              <p className='underline uppercase tracking-wide text-sm'>
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Toastify container */}
      <ToastContainer />
    </>
  );
};

export default Register;
