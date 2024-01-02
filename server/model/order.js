const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shipping: {
        address: {
            postcode: { type: String },
            addressOne: { type: String },
            addressTwo: { type: String },
            city: { type: String }
        },
        method: {
            type: String,
            enum: ['standard', 'express']
        }
    },
    payment: {
        amount: { type: Number },
        shippingCost: { type: Number },
        status: {
            type: String,
            enum: ['pending', 'completed', 'shipped']
        }
    },
    itemIDs: [{ type: Number }],
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Order', orderSchema);
