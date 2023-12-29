const express = require('express');
const payment = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const bodyParser = require('body-parser');


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
                name: 'Parfums De Marley', // Use the actual product name here
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

      // Check if the necessary properties existr

        const { name, email, status } = paymentIntentSucceeded.shipping;

        console.log(`Name: ${name}`);
        console.log(paymentIntentSucceeded.shipping.address)
        console.log(`Email: ${email}`);
        console.log(`Payment Status: ${status}`)

        // console.log('Incomplete paymentIntentSucceeded object structure:', paymentIntentSucceeded );

        // console.log(`Customer Details \n Name ${paymentIntentSucceeded.customer_details.name} \n Email ${paymentIntentSucceeded.customer_details.email}`)
        // console.log(`Shipping \n ${paymentIntentSucceeded.customer_details.address} `)
        // console.log(`Payment Status \n ${paymentIntentSucceeded.payment_status} `)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


module.exports = payment