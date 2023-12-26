import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useShop } from '../context/ShopContext';

const stripePromise = loadStripe('pk_test_51NHl9gEobVR8O8G7xgMInVUrKXqtt5rFDEJzgvsnA2eETCRyQluaBjiZsThAkdY3VSVOyYO05DHhM9JjMvsJlqVY00tiO0Ddki');

export const StripeCheckout = ({ id, quantity, amount }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your server to create a Checkout Session
    try {
      const response = await axios.post(
        'http://localhost:3001/payment/checkout-session',
        { amount: amount * 100 }, // Change this for production
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const session = response.data; // Use response.data to get the response data
    
      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // Handle errors
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} >Checkout with Stripe</button>
    </div>
  );
};