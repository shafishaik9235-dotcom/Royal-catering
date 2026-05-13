const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['wedding', 'corporate', 'birthday', 'anniversary', 'graduation', 'custom']
  },
  cuisine: {
    type: String,
    required: true,
    enum: ['continental', 'fusion', 'italian', 'mediterranean', 'american', 'chinese', 'indian']
  },
  description: {
    type: String,
    required: true
  },
  pricePerPerson: {
    type: Number,
    required: true,
    min: 0
  },
  minGuests: {
    type: Number,
    required: true,
    min: 1
  },
  maxGuests: {
    type: Number,
    required: true,
    max: 5000
  },
  menuItems: [{
    name: String,
    description: String,
    dietaryInfo: [String]
  }],
  images: [String],
  inclusions: [String],
  duration: {
    type: Number,
    default: 4
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);