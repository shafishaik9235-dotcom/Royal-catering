const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services with filters
router.get('/', async (req, res) => {
  try {
    const { category, cuisine, minPrice, maxPrice, search, featured } = req.query;
    
    let filter = { availability: true };
    
    if (category && category !== 'all') filter.category = category;
    if (cuisine && cuisine !== 'all') filter.cuisine = cuisine;
    if (featured === 'true') filter.featured = true;
    
    if (minPrice || maxPrice) {
      filter.pricePerPerson = {};
      if (minPrice) filter.pricePerPerson.$gte = parseInt(minPrice);
      if (maxPrice) filter.pricePerPerson.$lte = parseInt(maxPrice);
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    
    const services = await Service.find(filter);
    
    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET categories and cuisines
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    const cuisines = await Service.distinct('cuisine');
    res.json({ success: true, categories, cuisines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new service
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;