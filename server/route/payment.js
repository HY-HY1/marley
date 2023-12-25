const express = require('express');
const payment = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);

payment.post('/checkout-session', async (req, res) => {
    const { amount, productName, customerEmail, billing_address_collection, quantity } = req.body;
    console.log(amount)
  
    try {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'GBP',
              product_data: {
                name: 'productName', // Use the actual product name here
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        customer_email: customerEmail, // Use the provided customer email
        client_reference_id: `order_UK12345`,
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['GB'],
        },
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cart`,
      });
  
      res.json({ id: session.id,  });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = payment