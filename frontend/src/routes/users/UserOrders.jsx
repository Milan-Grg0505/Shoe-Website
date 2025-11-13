import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import LoadingSpinner from '../../components/LoadingSpinner';

const UserOrders = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Fetch user orders
    axios.get("http://localhost:8000/api/user/order", {
      withCredentials: true,
    })
      .then(res => {
        setOrder(res.data)
        setTimeout(() => {
          setLoading(false)

        }, 1000)
      })
      .catch(err => console.log(err));

    // Handle payment confirmation from query params
    const queryParameters = new URLSearchParams(window.location.search);
    const data = queryParameters.get("data");

    if (data) {
      try {
        const decodedString = atob(data); // Decode Base64 string
        const decodedData = JSON.parse(decodedString); // Parse JSON string into an object

        if (decodedData.signed_field_names) {
          const s = decodedData.signed_field_names
            .split(",")
            .map((fieldName) => {
              const fieldValue = fieldName === "total_amount"
                ? decodedData[fieldName].replace(/,/g, "") // Remove commas from `total_amount`
                : decodedData[fieldName];
              return `${fieldName}=${fieldValue}`;
            })
            .join(",");
          const hash = CryptoJS.HmacSHA256(s, "8gBm/:&EnhH.1/q");
          const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

          if (hashInBase64 === decodedData.signature) {
            axios.put(`http://localhost:8000/api/order/update/${decodedData.transaction_uuid}`, {
              paymentStatus: "completed",
            }, {
              withCredentials: true,
            });
          } else {
            console.error("Signature mismatch");
          }
        } else {
          console.error("signed_field_names is missing");
        }
      } catch (error) {
        console.error("Error decoding or parsing data:", error);
      }
    }
  }, []);

  // Redirect to order details page
  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  // Cancel order
  const handleCancelOrder = (orderId) => {
    axios.put(`http://localhost:8000/api/order/cancel/${orderId}`, {
      withCredentials: true,
    })
      .then(() => {
        setOrder((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
        alert("Order canceled successfully");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to cancel the order");
      });
  };

  return (
    <>
      <section className="order">
        <div className="container p-10">
          <div className="order-details border border-gray-300 py-10 px-5">
            <h2 className='font-semibold text-2xl uppercase border-b-2 border-dotted text-center'>Orders</h2>

            <div className="order overflow-x-auto mt-4 overflow-y-hidden ">
              {loading ? <LoadingSpinner /> :
                <table className='w-full border border-collapse border-gray-400 text-center text-nowrap'>
                  <thead>
                    <tr className='bg-[#000000] text-white border border-[#000000]'>
                      <th className='py-3'>Order</th>
                      <th className='py-3'>Date</th>
                      <th className='py-3'>Status</th>
                      <th className='py-3'>Payment Status</th>
                      <th className='py-3'>Total</th>
                      <th className='py-3'>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order && order.map((o, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{o.createdAt}</td>
                        <td>{o.status}</td>
                        <td>{o.paymentStatus}</td>
                        <td>Rs.{o.total}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEye}
                            className='text-xl mr-2 bg-[#F1F1F1] p-2 rounded-lg cursor-pointer'
                            onClick={() => handleViewOrder(o._id)}
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className='text-xl bg-[#F1F1F1] p-2 rounded-lg cursor-pointer'
                            onClick={() => handleCancelOrder(o._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserOrders;
