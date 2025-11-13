import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Search from './Search.jsx';  // Import the Search component


const Header = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector(store => store.cart.items);
  const [showSearch, setShowSearch] = useState(false);  // State to toggle search visibility

  useEffect(() => {
    let total = 0;
    carts.forEach(item => total += item.quantity);
    setTotalQuantity(total);
  }, [carts]);

  const handleNav = () => {
    setNav(!nav);
  }

  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  //logout
  const handleLogout = () => {
     axios.post("http://localhost:8000/api/auth/logout", {},{
      withCredentials : true,
     }).then(() => navigate("/login"))
     .catch(err => console.log(err));
  }

  // Toggle the search visibility when the search icon is clicked
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <header className='py-8 shadow-md sticky z-20'>
        <div className="container font-semibold">
          <div className="flex justify-between items-center">
            <img src="image/logo1.jpg" alt="logo" className='w-[100px]' />
            <nav className='hidden md:block'>
              <ul className='flex items-center gap-5 text-sm uppercase'>
                <li className='hover:text-[#6A6C6C] duration-300'><Link to="/">Home</Link></li>
                <li className='hover:text-[#6A6C6C] duration-300'><Link to="blogs">Blogs</Link></li>
                <li className='dropdown relative cursor-pointer [&>span]:hover:text-[#6A6C6C] duration-300'>
                  <span>Collections<FontAwesomeIcon className='ml-2' icon={faAngleDown} /></span>
                  <ul className="dropdown-menu shadow-lg absolute text-nowrap min-w-fit p-2 w-[150px] pointer-events-none bg-white z-10 opacity-0 transition-all duration-200 ease-in">
                    {categories.map((category, index) => (
                      <li key={index}><Link to={`category/${category._id}`} className='hover:text-[#6A6C6C]'>{category.name}</Link></li>
                    ))}
                  </ul>
                </li>
                <li className='hover:text-[#6A6C6C] duration-300'><Link to="shop">Shop</Link></li>
                <li className='hover:text-[#6A6C6C] duration-300'><Link to="about">About</Link></li>
                <li className='hover:text-[#6A6C6C] duration-300'><Link to="contact">Contact</Link></li>
              </ul>
            </nav>

            <div>
              <ul className='flex items-center gap-5 text-lg'>
                {/* Clicking the search icon triggers the toggleSearch function */}
                <li> <img src="image/search_icon.png" alt="" onClick={toggleSearch} className="cursor-pointer w-[20px]" /></li>

                <li className=' dropdown relative cursor-pointer'><Link><img src="image/profile_icon.png" alt="" className='w-[20px]' /></Link>
                  <ul className='dropdown-menu shadow-lg absolute text-nowrap min-w-fit p-2 w-[150px] pointer-events-none top-7 right-0 bg-white z-10 opacity-0 transition-all duration-300 ease-in-out border border-gray-400 font-normal text-sm'>
                    <li className='hover:text-[#6A6C6C] duration-300'><Link to="login">Login</Link></li>
                    <li className='hover:text-[#6A6C6C] duration-300'><Link to="register">Register</Link></li>
                    <li className='hover:text-[#6A6C6C] duration-300' onClick={handleLogout}>Logout</li>
                  </ul>
                </li>
                <li className='relative'>
                  <span className='absolute w-5 h-5 rounded-full text-white flex items-center justify-center -top-2 -right-3 bg-[#FF6363]'>{totalQuantity}</span>
                  <Link to="addtocart"><img src="image/cart_icon.png" alt="" className='w-[20px]' /></Link>
                </li>
                <li><FontAwesomeIcon onClick={handleNav} className='md:hidden ' icon={faBars} /></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Conditionally render the Search component and pass setShowSearch and setSearchTerm to it */}
      {showSearch && <Search setShowSearch={setShowSearch} />}

      <aside className={`fixed top-0  p-4 h-screen overflow-auto w-[40vw] z-50 transition-all bg-white ease-in-out duration-200 ${nav ? "right-0" : "-right-full"}`} >
        <div className="text-end">
          <FontAwesomeIcon icon={faTimes} onClick={handleNav} />
        </div>
        <ul>
          <li className='pt-2 border-b-2'><Link to="/">Home</Link></li>
          <li className='pt-2 border-b-2'><Link to="blogs">Blogs</Link></li>
          <li onClick={handleDropdown} className='cursor-pointer pt-2 border-b-2'>Collections
            <FontAwesomeIcon className='ml-2' icon={faAngleDown} />
            <ul className={dropdown ? "block" : "hidden"}>
              <li className='pl-2 border-b-2 pt-2'><Link>Boot</Link></li>
              <li className='pl-2 border-b-2 pt-2'><Link>Sneakers</Link></li>
            </ul>
          </li>
          <li className='pt-2 border-b-2'><Link to="shop">Shops</Link></li>
          <li className='pt-2 border-b-2'><Link to="about">About Us</Link></li>
          <li className='pt-2 border-b-2'><Link to="contact">Contact Us</Link></li>
        </ul>
      </aside>

      <div className={`overflow-hidden top-0 left-0 z-40 fixed h-screen w-full bg-black opacity-50 ${nav ? "block" : "hidden"}`} onClick={handleNav}>
      </div>
    </>
  );
}

export default Header;
