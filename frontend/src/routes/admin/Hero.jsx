import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/heroes")
      .then((res) => setHeroes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (hero) => {
    try {
      await axios.delete(`http://localhost:8000/api/heroes/delete/${hero._id}`, {
        withCredentials: true,
      });
      toast.success("Hero deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setHeroes(() => heroes.filter((h) => h._id !== hero._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="py-3 px-5">
        <h2 className="text-2xl font-bold text-center my-2">Hero List</h2>

        <div className="text-end">
          <Link
            to="addheroes"
            className="bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2"
          >
            Add Hero
          </Link>
        </div>
        <div className="overflow-auto">
          <table className="w-full border text-center text-nowrap border-collapse table-striped">
            <thead>
              <tr className="!bg-[#000000] text-white">
                <th className="py-3">Title</th>
                <th className="py-3">SubTitle</th>
                <th className="py-3">Image</th>
                <th className="py-3">Description</th>
                <th className="py-3">Button Text</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {heroes.map((h, index) => (
                <tr key={index}>
                  <td>{h.title}</td>
                  <td>{h.subTitle}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/${h.image}`}
                      alt="hero"
                      className="w-[100px] h-auto m-auto"
                    />
                  </td>
                  <td>{h.description}</td>
                  <td>{h.buttonText}</td>
                  <td>
                    <div className="flex gap-3 justify-center items-center">
                      <button className="bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-white inline-block my-2">
                        <Link to={`edit/${h._id}`}>
                          <FontAwesomeIcon icon={faPen} className="mr-1" />Edit
                        </Link>
                      </button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="bg-[#F8F9FB] rounded-md p-3 cursor-pointer"
                        onClick={() => handleDelete(h)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default Hero;
