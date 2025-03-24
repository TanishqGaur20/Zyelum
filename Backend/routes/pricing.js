const express = require("express");
const router = express.Router();
const Pricing = require("../models/pricing");

router.get("/pricing", async (req, res) => {
  try {
    const monthlyPlans = await Pricing.find({ type: "monthly" });
    const annualPlans = await Pricing.find({ type: "annual" });
    res.json({ monthly: monthlyPlans, annual: annualPlans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/pricing", async (req, res) => {
  try {
    const pricing = new Pricing(req.body);
    const newPricing = await pricing.save();
    res.status(201).json(newPricing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
