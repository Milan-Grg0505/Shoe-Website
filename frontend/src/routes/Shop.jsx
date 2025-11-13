import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orders, setOrders] = useState();

  const [filterOpen,setFilterOpen] = useState(false);

  const handleSortChange = (e) => {
    setOrders(e.target.value);

  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/product")
      .then(res => (
        setProducts(res.data)
      ))

      .catch(err => console.log(err));
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedSelectedCategories);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category._id)
      );
    }

    if (minPrice !== '') {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchLower)
      );
    }

    switch (orders) {
      case 'htl':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break;
      case 'lth':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break;

      case 'asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break;

      case 'desc':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))
        break;

      default:

        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, minPrice, maxPrice, orders,search]);
  return (
    <>
      <section className='my-10'>
        <div className="container py-4 px-8">
          <div className="flex justify-center gap-4">

            <div className={`filter w-1/5 max-lg:fixed max-lg:top-0 max-lg:w-2/5 max-lg:p-2 z-20 ${filterOpen ? "right-0" : "-right-full"} transition-all duration-300 bg-white h-screen`} >
            <div className='text-end px-2 lg:hidden'>

            <FontAwesomeIcon icon={faTimes} onClick={()=>setFilterOpen(!filterOpen)} />
            </div>
              <h2 className='text-2xl font-semibold my-3 uppercase'> Filters</h2>

              <div className='border-2 py-2 px-4'>
                <h3 className='font-semibold text-xl'>Categories</h3>

                {categories.map((category, index) => (

                  <div className='mt-2 flex gap-2 text-gray-500' key={index}>
                    <input type="checkbox" value={category._id} onChange={() => handleCategoryChange(category._id)} />
                    <label htmlFor="">{category.name}</label>
                  </div>
                ))}
              </div>

              <div className='border-2 py-2 px-4 mt-4'>
                <h3 className='font-semibold text-2xl uppercase my-3'>Filter By price</h3>

                <div className='mt-2'>
                  <label htmlFor="" className='text-gray-500'>Max-Price</label>
                  <input type="number" className='w-full outline-none border-2 rounded-md px-2 py-1' name='maxPrice' onChange={handlePriceChange} />
                </div>
                <div className='mt-2'>
                  <label htmlFor="" className='text-gray-500'>Min-Price</label>
                  <input type="number" className='w-full outline-none border-2 rounded-md px-2 py-1' name='minPrice' onChange={handlePriceChange} />
                </div>
              </div>
            </div>

            <div className="shop w-4/5 py-4 px-6 max-lg:w-full">
              <div className="title flex justify-between items-center flex-wrap gap-4">
                <h2 className='section-title text-3xl font-semibold uppercase'><span className='text-gray-400'>All</span> collections</h2>

                <div className='flex gap-3 items-center'>
                  <button onClick={()=>setFilterOpen(!filterOpen)} className='bg-[#333333] border py-2 px-5 uppercase font-semibold text-sm text-[#E3A51E] lg:hidden' >Filters</button>
                  <div className='border-2 rounded-md py-2 px-4'>

                    <label htmlFor="" className='font-semibold uppercase'>Sort By : </label>
                    <select name="" id="" className='outline-none' onChange={handleSortChange} value={orders}>
                      <option value="htl">Price : High to Low</option>
                      <option value="lth">Price : Low to High </option>
                      <option value="asc">Ascending </option>
                      <option value="desc">Descending </option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="products mt-8">
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((p, index) => (

                    <ProductCard key={index} product={p} />
                  ))}

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop