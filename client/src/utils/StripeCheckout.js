  import React from 'react';
  import { loadStripe } from '@stripe/stripe-js';
  import axios from 'axios';
  import { useShop } from '../context/ShopContext';
  import { Button } from '../component/Button';

  const stripePromise = loadStripe('pk_test_51NHl9gEobVR8O8G7xgMInVUrKXqtt5rFDEJzgvsnA2eETCRyQluaBjiZsThAkdY3VSVOyYO05DHhM9JjMvsJlqVY00tiO0Ddki');

  export const StripeCheckout = ({ id, quantity, amount }) => {

    const { cartItems } = useShop()

    const customerId = localStorage.getItem('customerId')
    const token = localStorage.getItem('token')

    const handleCheckout = async () => {
      const stripe = await stripePromise;

      // Call your server to create a Checkout Session
      try {
        const response = await axios.post(
          'http://localhost:3001/payment/checkout-session',
          { amount: amount * 100, quantity: quantity, products: cartItems, customerId: customerId }, // Change this for production
          {
            headers: {
              'Content-Type': 'application/json',
               Authorization: token
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
        <Button
          isDisabled={false}
          onClick={handleCheckout}
          size="medium"
          variant="primary"
          isLoading={false}
          text="Checkout"
          className="additionalClass"
        />
      </div>
    );
  };
