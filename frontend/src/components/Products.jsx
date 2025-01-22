import React from 'react';
import '../styles/products.css';
import axios from 'axios'
const Products = ({ product }) => {

  const checkoutHandler=async(amount)=>{
    
    const {data:keyData}=await axios.get("/api/v1/getKey")
    const {key}=keyData;
    console.log(key);

    const {data:orderData}=await axios.post("/api/v1/payment/process",{amount})
    const {order}=orderData;
    console.log(order);
    
    const options = {
      key, // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'razorpay',
      description: 'Test Transaction',
      order_id:order.id, // This is the order_id created in the backend
      callback_url:'/api/v1/paymentVerification', // Your success URL
      prefill: {
        name: 'sameer',
        email: 'mohamedshamir988@example.com',
        contact: '9361400343'
      },
      theme: {
        color: '#F37254'
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

  }
 
  
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

export default Products;
