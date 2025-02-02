import { instance } from '../server.js';
import crypto from 'crypto';

export const processPayment = async (req, res) => {
  try {
    const { amount } = req.body; // Extract amount from request body

    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Convert amount to paise (Razorpay uses smallest currency unit)
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    // ✅ Correct frontend URL
    const frontendURL =
      process.env.NODE_ENV === "production"
        ? "https://razorpay-5-96rl.onrender.com"
        : "http://localhost:5173";

    if (isAuthentic) {
      console.log("Redirecting to:", `${frontendURL}/?payment=success`);

      // ✅ Redirect to the **home page (`/`)** with `?payment=success`
      return res.redirect(`${frontendURL}/?payment=success`);
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
