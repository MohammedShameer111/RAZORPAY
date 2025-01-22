import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: 'config/config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Initialize Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

// Define allowed origins (Production + Development)
const allowedOrigins = [
  'https://razorpay-5-96rl.onrender.com', // Production
  'http://localhost:5173', // Development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy does not allow this origin.'));
    }
  },
  credentials: true,
}));

// ✅ Add API Route
app.get('/api/v1', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
