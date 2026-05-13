const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    unique: true,
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { 
      venue: String, 
      street: String, 
      city: String,
      state: String,
      zipCode: String 
    }
  },
  event: {
    type: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, default: '6:00 PM' },
    endTime: { type: String, default: '10:00 PM' },
    guestCount: { type: Number, required: true },
    specialRequests: String
  },
  services: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    name: String,
    quantity: Number,
    pricePerUnit: Number,
    subtotal: Number
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  payment: {
    status: { 
      type: String, 
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'], 
      default: 'pending' 
    },
    method: { 
      type: String, 
      enum: ['stripe', 'cash', 'bank_transfer'], 
      default: 'stripe' 
    },
    stripePaymentIntentId: String,
    transactionId: String,
    paidAt: Date
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  cancellationReason: String,
  sessionId: String
}, { 
  timestamps: true 
});

// Generate order ID before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const prefix = 'ORD';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderId = `${prefix}-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);