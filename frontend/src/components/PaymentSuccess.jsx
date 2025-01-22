import React from 'react'
import '../styles/PaymentSuccess.css'
import { useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
  const query=new URLSearchParams(useLocation().search);
  const reference=query.get("reference");
  return (
    <div className='payment-success-container'>
      <div className="payment-success-card">
        <h1 className="payment-success-title">Payment Succesfull</h1>
        <p className="payment-success-message">
          Thank your for your payment. your transaction is success.
        </p>
        {reference && (
          <p className='payment-success-reference'>
            <strong>Reference ID:</strong>{reference}
          </p>
        )}
      </div>
      
    </div>
  )
}

export default PaymentSuccess
