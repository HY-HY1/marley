const express = require('express');
const product = express.Router();
const Product = require('../model/product');

product.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

product.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.find({id: id});
        if(!products) {
            console.log(products)
            return res.status(404)
        }
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = product;
