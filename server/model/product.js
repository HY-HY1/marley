const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // MongoDB default unique identifier
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: {
    type: {
      type: { type: String, default: 'eau de parfum' }, // Assuming a default type
      sizes: {
        default: { type: Number, default: 125 },
        size: { type: [Number], default: [] },
      },
      description: { type: String, default: '' },
      images: {
        default: { type: String, default: '' },
        image: { type: [String], default: [] },
      },
      notes: {
        default: { type: String, default: '' },
        top: { type: [String], default: [] },
        heart: { type: [String], default: [] },
        base: { type: [String], default: [] },
        time: { type: String, default: '' },
      },
    },
  },
});

module.exports = mongoose.model('Product', productSchema);
