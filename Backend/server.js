const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pricingRoutes = require("./routes/pricing");
const testimonialRoutes = require("./routes/testimonial");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
mongoose
  .connect(
    "mongodb://gyelum:gyelum@cluster0-shard-00-00.hp38n.mongodb.net:27017,cluster0-shard-00-01.hp38n.mongodb.net:27017,cluster0-shard-00-02.hp38n.mongodb.net:27017/?replicaSet=atlas-xp5ppn-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", pricingRoutes);
app.use("/api", testimonialRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
