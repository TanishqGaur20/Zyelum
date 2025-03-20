const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;