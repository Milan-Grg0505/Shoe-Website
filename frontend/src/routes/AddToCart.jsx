import React, { useEffect } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuantity, ClearItems, DeleteItem } from '../stores/cart';
import { Link } from 'react-router-dom';





const AddToCart = () => {
  const carts = useSelector(store => store.cart.items);
  const total = useSelector(store => store.cart.total);


  // console.log(carts);
  const dispatch = useDispatch();
  const handleMinusQuantity = (id, quantity) => {
    dispatch(changeQuantity({
      productId: id,
      quantity: quantity - 1
    }));
  }
  const handlePlusQuantity = (id, quantity) => {
    dispatch(changeQuantity({
      productId: id,
      quantity: quantity + 1
    }));
  }

  const deleteItem = (id) => {
    dispatch(DeleteItem({
      productId: id,
    }));
  }




  return (
    <>
      <div className="container cart my-4">
        <h2 className='font-bold text-2xl text-center my-3'>Cart</h2>
        <div className='overflow-auto'>
          <table className='w-full border border-collapse border-gray-400 text-center text-nowrap'>
            <thead>
              <tr className='bg-[#000000] text-white'>
                <th className='py-3'>Image</th>
                <th className='py-3'>Product</th>
                <th className='py-3'>Price</th>
                <th className='py-3'>Quantity</th>
                <th className='py-3'>Total</th>
                <th className='py-3'>Remove</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((item, index) => (
                <tr key={index}>
                  <td><img src={`http://localhost:8000/${item.image}`} alt="" className='w-[100px] h-auto m-auto'></img> </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="flex border border-gray-400 justify-center items-center w-[100px] m-auto">
                      <button className='p-4 text-xl font-bold text-gray-500' onClick={() => handleMinusQuantity(item.productId, item.quantity)}>-</button>
                      <input type="number" className='w-full outline-none' value={item.quantity} />
                      <button className='p-4 text-xl font-bold text-gray-500' onClick={() => handlePlusQuantity(item.productId, item.quantity)}>+</button>
                    </div>
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td><FontAwesomeIcon icon={faTrash} className='text-xl' onClick={() => deleteItem(item.productId)} /></td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>

        <div className='flex justify-between items-center py-4 gap-2'>
          <div className="continueShopping mr-auto">
            <Link to="/shop" className='bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm text-[#FFFFFF]'>Continue Shopping</Link>
          </div>


          <button className='bg-[#000000] border py-2 px-5 uppercase font-semibold text-sm text-[#FFFFFF]' onClick={() => dispatch(ClearItems())}>Clear Cart</button>

          <div>
          </div>

        </div>

        <div className="ml-auto md:w-[40vw] bg-[#F8F8F8]">
          <h2 className='text-xl mb-2 py-4 px-3 mx-2'>Cart Totals</h2>

          <div className='flex justify-between items-center  px-3 py-2 border-b-[1px] border-gray-400 text-sm'>
            <p>Total</p>
            <p className='text-[#FFFFFFF]'>Rs. {total} </p>
          </div>

          <Link to="/checkout" className='w-full bg-[#000000] text-[#FFFFFF] py-2 font-semibold uppercase text-center inline-block'>
            Proceed checkout
          </Link>
        </div>


      </div>
    </>
  )
}

export default AddToCart