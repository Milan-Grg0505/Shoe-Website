import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CheckOut = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();

  const [paymentMethod,setPaymentMethod] = useState("");
  const [error,setError] = useState();

  const carts = useSelector(store => store.cart.items);
  const total = useSelector(store => store.cart.total);
  useEffect(() => {

    const getUserDetails = async () =>{
      try {
        const response = await axios.get(`http://localhost:8000/api/user/get`,{
          withCredentials: true,
        })
        .then((res) =>{
          setUserDetails(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();
  })



const handleOrder = async () => {
    if(paymentMethod === ""){
      setError("please select a payment method");
      return ;
    }
    try {
     const res = await axios.post("http://localhost:8000/api/order/add", {
        user: userDetails._id,
        status: "pending",
        paymentStatus: "pending",
        items: carts,
        total: total,
        esewa : paymentMethod === "esewa",
      }, {
        withCredentials: true,
      })


       if(res.data.formData){
        esewa(res.data.formData);
       }
      
    } catch (error) {
      console.log(error);
    }
  }

  const esewa = (formData) =>{
    let form = document.createElement("form");
    form.setAttribute("action","https://rc-epay.esewa.com.np/api/epay/main/v2/form");
    form.setAttribute("method","post");

    for (const key in formData) {
      let field = document.createElement("input");
      field.setAttribute("type","hidden");
      field.setAttribute("name",key);
      field.setAttribute("value",formData[key]);
      form.appendChild(field)
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <section className='checkout'>
        <div className="container p-10">
          <div className=" flex flex-col md:flex-row gap-10">
            <div className="left-container w-1/2">
              <h2 className='font-semibold text-2xl uppercase'>Billing Details</h2>

              <div className="details mt-4">
                <table className='w-full border border-gray-400 bg-[#F7F7F7]'>
                  <tbody>
                    <tr className=' border border-gray-400 text-center'>
                      <td className='border border-gray-400'>Name</td>
                      <td>{userDetails && userDetails.name}</td>
                    </tr>
                    <tr className=' border border-gray-400 text-center'>
                      <td className=' border border-gray-400 text-center'>Email</td>
                      <td>{userDetails && userDetails.email}</td>
                    </tr>
                    <tr className=' border border-gray-400 text-center'>
                      <td className=' border border-gray-400 text-center'>Phone</td>
                      <td>{userDetails && userDetails.phone}</td>
                    </tr>
                    <tr className=' border border-gray-400 text-center'>
                      <td className=' border border-gray-400 text-center'>Address</td>
                      <td>{userDetails && userDetails.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="right-container w-1/2">
              <h2 className='font-semibold text-3xl uppercase'>Your Order Summary</h2>
              <div className='summary bg-[#F7F7F7] mt-4'>
                <table className='w-full'>
                  <thead>
                    <tr className='border border-gray-400 text-center'>
                      <td className='border border-gray-400'>Product</td>
                      <td>Total</td>
                    </tr>
                  </thead>

                  <tbody>
                    {carts.map((cart, index) => (

                      <tr className=' border border-gray-400 text-center' key={index}>
                        <td className='border border-gray-400'>{cart.name} x {cart.quantity}</td>
                        <td>Rs.{cart.price * cart.quantity}</td>
                      </tr>
                    ))}

                    <tr className=' border border-gray-400 text-center'>
                      <td className='border border-gray-400'>Total Amount</td>
                      <td>Rs.{total}</td>
                    </tr>
                  </tbody>
                </table>


                <div className='mt-4 px-4'>
                  <input type="radio" name="paymentMethod" value="cod" onClick={() => setPaymentMethod("cod")}/>
                  <label htmlFor="" className='ml-3 text-gray-500'>Cash on delivery</label>
                </div>

                <div className='mt-4 px-4'>
                  <input type="radio" name="paymentMethod" value="esewa" onClick={() => setPaymentMethod("esewa")}/>
                  <label htmlFor="" className='ml-3 text-gray-500'>Esewa</label>
                </div>

                <div className='esewa mt-4 px-4'>
                  <img src="image/esewa.png" alt="" className='w-[100px]' />
                </div>

                <p className='text-red-600'>{error}</p>

                <div className='order-btn mt-4'>
                  <button className='w-full bg-[#000000] text-[#FFFFFF] py-2 font-semibold uppercase text-center inline-block' onClick={handleOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CheckOut