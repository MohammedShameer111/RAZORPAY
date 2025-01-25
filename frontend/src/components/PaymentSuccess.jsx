import React, { useEffect } from 'react';
import '../styles/PaymentSuccess.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // ✅ Redirect to home page after 5 seconds
    }, 5000);
    
    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className='payment-success-container'>
      <div className="payment-success-card">
        <h1 className="payment-success-title">🎉 Payment Successful!</h1>
        <p className="payment-success-message">
          Thank you for your payment. Your transaction was successful.
        </p>
        {reference && (
          <p className='payment-success-reference'>
            <strong>Reference ID:</strong> {reference}
          </p>
        )}
        <p className="redirect-message">Redirecting to homepage in 5 seconds...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
