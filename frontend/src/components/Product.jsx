
import React from 'react'
import '../styles/Products.css'
import axios from 'axios';


function Product({ product }) {
  const API_BASE_URL = import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_PROD_URL;

    const checkoutHandler = async (amount) => {
      try {
        // ✅ Fetch Razorpay key
        const { data: keyData } = await axios.get(`${API_BASE_URL}/api/v1/getKey`);
        const { key } = keyData;
    
        // ✅ Create payment order
        const { data: orderData } = await axios.post(`${API_BASE_URL}/api/v1/payment/process`, { amount });
        const { order } = orderData;
    
        const options = {
          key, 
          amount, 
          currency: 'INR',
          name: 'razorpay',
          description: 'Test Transaction',
          order_id: order.id,
          handler: async function (response) {
            // ✅ Send payment details to backend for verification
            const { data } = await axios.post(`${API_BASE_URL}/api/v1/paymentVerification`, response);
    
            if (data.success) {
              // ✅ Redirect user after successful verification
              window.location.href = data.redirectURL;
            } else {
              alert("Payment verification failed!");
            }
          },
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
    <img src="../images/razor-logo.svg" alt="" />

    <div className='products-container'>
   
      {product.map((item) => (
        <div className="product-card" key={item.id}> {/* Add a unique key */}
          <img className='product-image' src={item.image} alt={item.title} />
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">Price <strong>{item.price}</strong>/-</p>
          <button onClick={()=>checkoutHandler(item.price)} className="pay-button">Pay</button>
        </div>
      ))}
    </div>
    </div>
  );
};


export default Product
