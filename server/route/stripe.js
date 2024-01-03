const express = require('express');
const stripe = express.Router()
const Stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const verifyToken = require('../middleware/verifyToken')

stripe.post('/', verifyToken, async  (req, res) => {
    const { email } = req.user;
    try {
        const sessions = await Stripe.checkout.sessions.list({
            customer_details: email
            // payment_intent: 'pi_3OUA5iEobVR8O8G70sxqJG1A'
        });

        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

stripe.post('/customers', verifyToken, async (req,res) => {
    const { email } = req.user

    try {
        const customers = await Stripe.customers.list({
            email: email,
        })

        res.json({customers: customers})
    } catch (error) {

    }
})

stripe.get('/checkout-sessions', async (req, res) => {
    const { customerId } = req.body;

    try {
        const checkouts = await Stripe.checkout.sessions.list({
            customer: customerId
        });

        const checkoutIds = checkouts.data.map((checkout) => {
            return checkout.id;
        });

        res.send({ checkoutId: checkoutIds });
    } catch (error) {
        console.error('Error fetching checkouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

stripe.post('/items', async (req, res) => {
    const { checkoutIds } = req.body;

    try {
        if (!Array.isArray(checkoutIds)) {
            // If checkoutIds is not an array, handle the error
            throw new Error('checkoutIds must be an array');
        }

        const lineItemsPromises = checkoutIds.map(async (checkoutId) => {
            const items = await Stripe.checkout.sessions.listLineItems(checkoutId);
            return items.data;
        });

        // Wait for all promises to resolve
        const lineItemsArrays = await Promise.all(lineItemsPromises);

        // Concatenate line items arrays into a single array
        const allLineItems = lineItemsArrays.reduce((accumulator, current) => {
            return accumulator.concat(current);
        }, []);

        res.json({ lineItems: allLineItems });
    } catch (error) {
        console.error('Error fetching line items:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = stripe;
