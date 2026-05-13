const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST create new order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    const orderId = 'ORD-' + Date.now();
    
    const order = new Order({
      ...orderData,
      orderId: orderId,
      orderStatus: 'pending',
      payment: {
        status: 'pending',
        method: 'stripe'
      }
    });

    await order.save();
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// GET order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;