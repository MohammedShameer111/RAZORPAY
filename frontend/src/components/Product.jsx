import React, { useEffect, useState } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Product({ product }) {
  const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://razorpay-7.onrender.com";

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paymentSuccess = query.get("paymentSuccess");
  const reference = query.get("reference");

  // State to manage success message visibility
  const [showMessage, setShowMessage] = useState(paymentSuccess);

  useEffect(() => {
    if (paymentSuccess) {
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
        window.history.replaceState(null, "", "/"); // Remove query params from URL
      }, 5000);
    }
  }, [paymentSuccess]);

  const checkoutHandler = async (amount) => {
    try {
      // ✅ Fetch Razorpay key
      const { data: keyData } = await axios.get(`${API_BASE_URL}/api/v1/getKey`);
      const { key } = keyData;
      console.log("Razorpay Key:", key);

      // ✅ Create payment order
      const { data: orderData } = await axios.post(`${API_BASE_URL}/api/v1/payment/process`, { amount });
      const { order } = orderData;
      console.log("Order Data:", order);

      const options = {
        key, // Razorpay key
        amount: amount * 100, // Convert amount to paise (₹500 = 50000 paise)
        currency: 'INR',
        name: 'razorpay',
        description: 'Test Transaction',
        order_id: order.id, // Order ID from backend
        callback_url: `${API_BASE_URL}/api/v1/paymentVerification`, // Payment verification URL
        prefill: {
          name: 'Sameer',
          email: 'mohamedshamir988@example.com',
          contact: '9361400343'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className='logo'>
      <img src="../images/razor-logo.svg" alt="Razorpay Logo" />

      {/* ✅ Show success message if payment was successful */}
      {showMessage && (
        <div className="payment-success-message">
          <p>🎉 Payment Successful! Reference ID: <strong>{reference}</strong></p>
        </div>
      )}

      <div className='products-container'>
        {product.map((item) => (
          <div className="product-card" key={item.id}>
            <img className='product-image' src={item.image} alt={item.title} />
            <h3 className="product-title">{item.title}</h3>
            <p className="product-price">Price <strong>{item.price}</strong>/-</p>
            <button onClick={() => checkoutHandler(item.price)} className="pay-button">Pay</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
