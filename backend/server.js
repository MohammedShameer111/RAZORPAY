import express from 'express';  // Add this import if not already present
import cors from 'cors';        // Update this to import
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

// Use dotenv to load environment variables
dotenv.config({ path: 'config/config.env' });

const app = express();
const port = process.env.PORT || 3000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

// Use the CORS middleware
app.use(cors({
  origin: 'https://razorpay-5-96rl.onrender.com',
  credentials: true,
}));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
