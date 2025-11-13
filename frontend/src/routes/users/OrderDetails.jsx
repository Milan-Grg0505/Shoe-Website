import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/order/${id}`, {
      withCredentials: true,
    })
      .then(res => setOrder(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <p>Total: Rs.{order.total}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default OrderDetails;
