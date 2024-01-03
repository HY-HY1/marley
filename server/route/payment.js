const express = require('express');
const payment = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const bodyParser = require('body-parser');
const Product = require('../model/product')
const Order = require('../model/order')


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
      // client_reference_id: `order_UK12345`,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      mode: 'payment',
      customer_creation : 'always',
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

payment.post('/webhook', async (request, response) => {
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
    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;
      const orderIdCharge = chargeSucceeded.metadata.orderId;
  
      try {
        const order = await Order.findOneAndUpdate(
          { orderId: orderIdCharge },
          {
            $set: {
              amount: chargeSucceeded.amount,
              'payment.chargeId': chargeSucceeded.id,
              'payment.paymentIntentId': chargeSucceeded.payment_intent,
              'payment.methodId': chargeSucceeded.payment_method,
              'payment.status': chargeSucceeded.status,
            },
            $addToSet: {
              'customer.email': chargeSucceeded.billing_details.email,
              'customer.name': chargeSucceeded.billing_details.name,
              'customer.address': chargeSucceeded.billing_details.address,
              // ... other customer details
            },
          },
          { new: true, upsert: true }
        );
  
        console.log('Order updated with charge:', order);
      } catch (error) {
        console.error('Error updating order:', error);
      }
      break;
  
    case 'customer.created':
      const customerCreated = event.data.object;
      const orderIdCustomerCreated = customerCreated.metadata.orderId;
  
      try {
        const order = await Order.findOneAndUpdate(
          { orderId: orderIdCustomerCreated },
          {
            $addToSet: {
              'customer.email': customerCreated.email,
              'customer.name': customerCreated.name,
              'customer.address': customerCreated.address,
              // ... other customer details
            },
          },
          { new: true, upsert: true }
        );
  
        console.log('Order updated with customer created:', order);
      } catch (error) {
        console.error('Error updating order:', error);
      }
      break;
  
    case 'customer.updated':
      const customerUpdated = event.data.object;
      const orderIdCustomerUpdated = customerUpdated.metadata.orderId;
  
      try {
        const order = await Order.findOneAndUpdate(
          { orderId: orderIdCustomerUpdated },
          {
            $set: {
              'customer.address': customerUpdated.address,
              // ... other customer details
            },
          },
          { new: true, upsert: true }
        );
  
        console.log('Order updated with customer updated:', order);
      } catch (error) {
        console.error('Error updating order:', error);
      }
      break;
  
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      const orderIdPaymentIntent = paymentIntentSucceeded.metadata.orderId;
  
      try {
        const order = await Order.findOneAndUpdate(
          { orderId: orderIdPaymentIntent },
          {
            $set: {
              'payment.paymentIntentId': paymentIntentSucceeded.id,
              'payment.status': paymentIntentSucceeded.status,
            },
          },
          { new: true, upsert: true }
        );
  
        console.log('Order updated with payment intent:', order);
      } catch (error) {
        console.error('Error updating order:', error);
      }
      break;
  
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


module.exports = payment