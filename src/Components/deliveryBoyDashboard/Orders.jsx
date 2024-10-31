import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all')
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">My Orders 📦</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order.id} className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-lg text-gray-800">Order #{order.id}</h3>
              <p className="text-gray-600">Dish: {order.dish.title}</p>
              <p className="text-gray-600">Total Amount: {order.totalAmount} DT</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <button className="bg-orange-500 text-white py-1 px-2 mt-2 rounded-md">View Details</button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
