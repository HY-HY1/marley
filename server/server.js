require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(
    bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' }));


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
const order = require('./route/orders')

app.use('/product', product)
app.use('/payment', payment)
app.use('/account', account)
app.use('/order', order)