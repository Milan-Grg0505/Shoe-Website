import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../stores/cart'
import QuickView from './QuickView'

const ProductCard = ({ product }) => {
  const [quick, setQuick] = useState(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const carts = useSelector(store => store.cart.items);
  console.log(carts);

  const { _id, image, name, price } = product;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: _id,
      quantity: 1,
      image: image,
      name: name,
      price: parseInt(price)
    }));
  }
  const handleQuick = (p) => {
    setQuick(p)
    setQuickOpen(true);
  }

  return (
    <>
      {quickOpen &&
        <QuickView product={quick} quickOpen={quickOpen} setQuickOpen={setQuickOpen} />
      }
      <article className='product-card relative text-center group'>
        <div className="product-image h-[300px] relative overflow-hidden">
          <Link to={`/product/${product._id}`}><img src={`http://localhost:8000/${product.image}`} alt="" className='w-full h-full object-cover hover:scale-125 transition-all ease-in-out delay-150 ' /></Link>


          <div className="product-btn absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-3 opacity-0 pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:bottom-6 z-20">
            <button className='flex items-center justify-center h-[50px] w-[50px] rounded-full add-cart-btn text-[#000000] bg-white hover:bg-black hover:text-white transition-all ease-in-out' onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faShoppingBag} className='text-xl' />
            </button>
            <button className='flex items-center justify-center h-[50px] w-[50px] rounded-full add-cart-btn text-[#000000] bg-white hover:bg-black hover:text-white transition-all ease-in-out' onClick={() => handleQuick(product)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl' />
            </button>
          </div>

          {product.discountRate &&
            <span className='absolute py-1 px-4 bg-red-500 text-white top-3 left-4 rounded-md text-sm'>-{product.discountRate}%</span>
          }
          {product.featured &&
            <span className='absolute py-1 px-4 bg-blue-500 text-white top-3 right-4 rounded-md text-sm'>Featured</span>
          }
        </div>
        <div className="product-description pl-2">
          <h3 className='text-md font-semibold mt-2'>{product.name}</h3>
          <p className='font-normal text-[#FF7272] text-sm mt-2'>Rs.{product.price}</p>
        </div>
      </article>
    </>
  )
}

export default ProductCard