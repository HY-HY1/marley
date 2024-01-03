const express = require('express');
const order = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const verifyToken = require('../middleware/verifyToken')

order.post('/', verifyToken, async  (req, res) => {
    const { email } = req.user;
    try {
        const sessions = await stripe.checkout.sessions.list({
            customer_details: email
            // payment_intent: 'pi_3OUA5iEobVR8O8G70sxqJG1A'
        });

        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = order;
