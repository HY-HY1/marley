const express = require('express');
const payment = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const bodyParser = require('body-parser');
const Product = require('../model/product')



payment.post('/checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    // Fetch product details based on product IDs
    const productDetails = await Product.find({ id: { $in: products.map(p => p.id) } });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1OTtWJEobVR8O8G7fZgxA5V2' },
        { shipping_rate: 'shr_1OTtWiEobVR8O8G7PIa30PYh' },
      ],
      line_items: productDetails.map((product, index) => ({
        price_data: {
          currency: 'GBP',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: products[index].quantity || 1, // Default to 1 if quantity is not provided
      })),
      client_reference_id: `order_UK12345`,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cart`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  const endpointSecret = "whsec_4ef1eccaef59526d87e3ebcb7e979004e3782f32b2e1baaf2deb7f36388f49a0";

// Use bodyParser middleware

payment.post('/webhook', (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    // Use request.rawBody for raw body
    const rawBody = request.rawBody;
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    console.error(`Raw Request Body: ${request.rawBody}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;

      console.log('ReqBody',request.body)
      console.log('Event Data \n', event.data)

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


module.exports = payment