const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../models/Order');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderId, amount, currency = 'usd' } = req.body;
    
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        orderId: order.orderId,
        customerEmail: order.customer.email
      },
      receipt_email: order.customer.email,
      payment_method_types: ['card'],
      description: `Catering Order ${order.orderId}`
    });

    // Update order with payment intent ID
    order.payment.stripePaymentIntentId = paymentIntent.id;
    order.payment.status = 'processing';
    await order.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Confirm payment (webhook alternative)
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findOneAndUpdate(
        { 'payment.stripePaymentIntentId': paymentIntentId },
        {
          'payment.status': 'completed',
          'payment.transactionId': paymentIntent.id,
          'payment.paidAt': new Date(),
          orderStatus: 'confirmed'
        },
        { new: true }
      );
      
      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        order
      });
    } else {
      res.json({
        success: false,
        message: `Payment status: ${paymentIntent.status}`
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment methods
router.get('/payment-methods', async (req, res) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      type: 'card',
      limit: 10
    });
    res.json({ success: true, data: paymentMethods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Refund payment
router.post('/refund', async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;
    
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined
    });
    
    await Order.findOneAndUpdate(
      { 'payment.stripePaymentIntentId': paymentIntentId },
      { 'payment.status': 'refunded' }
    );
    
    res.json({
      success: true,
      message: 'Refund processed successfully',
      refund
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;