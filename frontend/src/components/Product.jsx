import React, { useEffect, useState } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Product({ product }) {
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("payment") === "success") {
      setSuccessMessage("✅ Payment was successful!");
      setTimeout(() => setSuccessMessage(''), 5000); // Hide message after 5 seconds
    }
  }, [location.search]);

  const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://razorpay-7.onrender.com";

  const checkoutHandler = async (amount) => {
    try {
      const { data: keyData } = await axios.get(`${API_BASE_URL}/api/v1/getKey`);
      const { key } = keyData;
      console.log(key);
      

      const { data: orderData } = await axios.post(`${API_BASE_URL}/api/v1/payment/process`, { amount });
      const { order } = orderData;
      console.log(order);
      

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'Razorpay',
        description: 'Test Transaction',
        order_id: order.id,
        callback_url: `${API_BASE_URL}/api/v1/paymentVerification`, 
        prefill: {
          name: 'Sameer',
          email: 'mohamedshamir988@example.com',
          contact: '9361400343'
        },
        theme: { color: '#F37254' },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className='logo'>
      <img src="../images/razor-logo.svg" alt="" />

     <div className='success'>
     {successMessage && <p className="success-message">{successMessage}</p>} {/* ✅ Show Success Message */}
     </div>

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
