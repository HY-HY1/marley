require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

const URI = process.env.URI;

// Use async/await syntax for database connection
(async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');

        app.listen(3001, () => {
            console.log('Server running on port 3000');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
})();

const product = require('./route/product')
const payment = require('./route/payment')
const account = require('./route/account')

app.use('/product', product)
app.use('/payment', payment)
app.use('/account', account)