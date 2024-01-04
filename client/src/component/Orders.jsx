import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export const Orders = () => {
  const [checkoutSessions, setCheckoutSessions] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await axios.post(
          'http://localhost:3001/payment/orders',
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status > 203) {
          return;
        }

        // Set the checkout sessions in state
        setCheckoutSessions(response.data.checkoutSessions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []); // Added an empty dependency array to ensure useEffect runs only once

  return (
    <div>
      <h2>Orders</h2>
      {checkoutSessions.map((session) => (
       <Link to={`orders/${session.id}`}>
         <div key={session.id}>
          <ul>
            {session.lineItems.map((lineItem) => (
              <li key={lineItem.id}>
                Product: {lineItem.description}, Quantity: {lineItem.quantity}, Product ID: {lineItem.productId}
              </li>
            ))}
          </ul>
        </div>
       </Link>
      ))}
    </div>
  );
};
