const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['monthly', 'annual'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  btnText: {
    type: String,
    required: true
  },
  trail: String,
  features: [String],
  suggested: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Pricing', pricingSchema);