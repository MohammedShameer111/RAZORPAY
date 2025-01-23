import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import paymentRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config({ path: "config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000; // Set the default backend port to 5000

// Initialize Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Define allowed origins for CORS (Production + Development)
const allowedOrigins = [
  "https://razorpay-5-96rl.onrender.com", // Production
  "http://localhost:5173", // Development
];

app.use(cors({ origin: frontendURL, credentials: true }));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", paymentRoutes);

// Root API Test Route
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
