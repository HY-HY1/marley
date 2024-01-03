const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  payment: {
    chargeId: { type: String },
    paymentIntentId: { type: String },
    methodId: { type: String },
    status: { type: String },
  },
  customer: {
    customerId: { type: String },
    email: { type: String },
    name: { type: String },
    address: {
      city: { type: String },
      country: { type: String },
      line1: { type: String },
      line2: { type: String },
      postalCode: { type: String },
      state: { type: String },
    },
    shipping: {
      name: { type: String },
      address: {
        city: { type: String },
        country: { type: String },
        line1: { type: String },
        line2: { type: String },
        postalCode: { type: String },
        state: { type: String },
      },
    },
  },
  // ... other fields
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
