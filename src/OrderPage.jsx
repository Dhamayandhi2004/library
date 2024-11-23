import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = 'user@example.com'; // Replace with actual login email logic

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:5000/orders?email=${userEmail}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [userEmail]);

  return (
    <div className="orders-page-container">
      <h2>Your Orders</h2>
      <ul>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map(order => (
            <li key={order.id}>
              <h3>{order.bookName}</h3>
              <p>Status: {order.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrdersPage;
