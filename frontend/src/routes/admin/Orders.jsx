import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/order")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);


  // Delete order by ID
  const handleDelete = async (order) => {
    try {
      await axios.delete(`http://localhost:8000/api/order/delete/${order._id}`, {
        withCredentials: true,
      });
      toast.success("Orders deleted successfully...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setOrders(() => orders.filter((o) => o._id !== order._id));
    } catch (error) {
      console.log(error);
    }
  };

  // Update order status
  const handlePaymentStatusChange = async (order, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/order/update/${order._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update the state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === order._id ? { ...o, status: newStatus } : o
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Update order status
  const handleStatusChange = async (order, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/order/updateOrder/${order._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update the state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o._id === order._id ? { ...o, status: newStatus } : o
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="py-3 px-5">
        <h2 className="text-2xl font-bold text-center my-2">Order List</h2>

        <div className="overflow-auto">
          <table className="w-full border text-center text-nowrap border-collapse table-striped">
            <thead>
              <tr className="!bg-[#000000] text-white">
                <th className="py-3">Order ID</th>
                <th className="py-3">User</th>
                <th className="py-3">Total</th>
                <th className="py-3">Status</th>
                <th className="py-3">Payment Status</th>
                <th className="py-3">Date</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || "N/A"}</td>
                  <td>Rs.{order.total}</td>
                  <td>
                    <select
                      defaultValue={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  </td>
                  <td>
                    <select
                      defaultValue={order.paymentStatus}
                      onChange={(e) => handlePaymentStatusChange(order, e.target.value)}
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-3 justify-center items-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="bg-[#F8F9FB] rounded-md p-3"
                        onClick={() => handleDelete(order)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Orders;
