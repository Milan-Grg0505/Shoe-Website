import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../stores/cart'


const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [imageSlider, setImageSlider] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/${id}`)
      .then(res => {
        setProduct(res.data)
        console.log(res.data)
        setImageSlider(`http://localhost:8000/${res.data.image}`)
      })
      .catch(err => console.log(err));
  }, [id]);


  const [count, setCount] = useState(1);
  const increaseCount = () => {
    setCount(count + 1);
  }
  const decreaseCount = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);

  }

  const carts = useSelector(store => store.cart.items);
  console.log(carts);

  const { _id, image, name, price } = product;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: _id,
      quantity: count,
      image: image,
      name: name,
      price: price
    }));
  }


  return (
    <>
      <section className="product-single">
        <div className="container">
          <div className="flex gap-2 flex-wrap lg:flex-nowrap justify-center">
            <div className="container-left lg:w-2/5 py-2">
              <div>
                <img src={imageSlider} alt="shoe2" className='object-contain' />
              </div>
              <div className="flex gap-2 mt-2">
                <div className='h-fit mb-2 w-1/4'>
                  <img src={`http://localhost:8000/${product.image}`} alt="shoe1" className='w-full h-full object-contain' onClick={(e) => setImageSlider(e.target.src)} />
                </div>
                {product.thumbnails && product?.thumbnails?.split(",").map((thumbnail, index) => (

                  <div className='h-fit mb-2 border border-gray-500 w-1/4' key={index}>
                    <img src={`http://localhost:8000/${thumbnail}`} alt="shoe1" className='w-full h-full object-contain' onClick={(e) => setImageSlider(e.target.src)} />
                  </div>
                ))}

              </div>


            </div>

            <div className="container-right lg:w-1/2 py-2 px-4">

              <h2 className='text-2xl font-bold mt-4'>{product.name}</h2>

              <div className="product-category mt-4">
                <h2 className='font-bold text-sm mt-4'>Category : <span className='text-[#797979] text-sm'>{product?.category?.name} </span></h2>

              </div>

              <div className="ratings flex gap-1 mt-4">
                <FontAwesomeIcon icon={faStar} className='text-[#FF532E]' />
                <FontAwesomeIcon icon={faStar} className='text-[#FF532E]' />
                <FontAwesomeIcon icon={faStar} className='text-[#FF532E]' />
                <FontAwesomeIcon icon={faStar} className='text-[#FF532E]' />
                <FontAwesomeIcon icon={farStar} className='text-[#FF532E]' />
                <span>(100)</span>
              </div>
              <p className='text-xl font-bold my-5'>{product.price}</p>
              <p className='text-sm mt-4 text-[#797979]'>{product.description}</p>

              <div className="quantity mt-4 ">
                <h2 className='font-bold text-sm'>Quantity:</h2>

                <div className='flex gap-4 section-cart items-center'>
                  <div className='w-[80px] mt-4'>
                    <input type="text" className='w-full border border-gray-400 outline-none text-sm font-semibold text-center p-2' value={count} />
                    <div className='flex'>
                      <button className='w-1/2 border border-gray-500 text-xl font-bold' onClick={increaseCount}>+</button>
                      <button className='w-1/2 border border-gray-500 text-xl font-bold' onClick={decreaseCount}>-</button>
                    </div>
                  </div>

                  <button className='border bg-black py-4 px-10 text-white text-semibold text-sm mt-4 inline-block' onClick={handleAddToCart}>Add to Cart</button>
                </div>


                <hr className='mt-4 border-none h-[2px] bg-[#797979]' />

                <p className='font-bold text-sm mt-6'>Stocks : <span className='text-red-400 text-sm'>{product.stocks}</span></p>
                <p className='text-[#797979] text-sm mt-4'>100% Original Product.</p>
                <p className='text-[#797979] text-sm mt-4'>Cash Delivery Available on this product.</p>
                <p className='text-[#797979] text-sm mt-4' >Easy exchange policy within 7 days.</p>
              </div>
            </div>
          </div>

          <div>

          </div>
        </div>
      </section>
    </>
  )
}

export default SingleProduct