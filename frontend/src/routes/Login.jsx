import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data); // For debugging, log the entire response


      // Navigate based on user role or other criteria
      if (response.data.user.role === "admin") {
        toast.success("Login successfull...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => navigate("/admin/dashboard"), 3000);

      } else {
        toast.success("Login successfull...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => navigate("/"), 3000);
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
      });// Set an appropriate error message
    }
  };


  return (
    <section className="flex justify-center items-center py-8 px-6">
      <div className="form-container py-4 px-6 w-[50%]">
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold text-4xl text-center mx-auto mb-7">Sign In</h2>
          <p className='text-sm text-[#727272] text-center mb-12'>If you have an account with us, please sign in.</p>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-7">

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 rounded-md py-3 px-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-7">

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded-md py-3 px-4 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="border-2 border-gray-800 rounded-md w-full py-3 px-5 uppercase tracking-wider text-sm mb-4 hover:bg-black hover:text-white "
            >
              Sign In
            </button>
          </div>

          <div className='flex justify-between items-center flex-wrap'>
            <div className="flex gap-2 flex-wrap">
              <p className='text-sm text-[#727272]'>Don't have an account?</p>
              <p className='underline uppercase tracking-wide text-sm'><Link to="/register">Sign In</Link></p>
            </div>

            <p className="underline uppercase tracking-wide text-sm">Forget your password?</p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>


  );
};

export default Login;
