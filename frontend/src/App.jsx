import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { productsData } from './components/Data';
import PaymentSuccess from './components/PaymentSuccess';
import Product from './components/Product';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://razorpay-7.onrender.com/api/v1';

    axios.get(apiUrl)
      .then((response) => {
        setData(response.data); // ✅ Use `response.data` instead of `response.json()`
        console.log('Data received:', response.data);
      })
      .catch((error) => {
        setError(error.message || 'Failed to fetch data');
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product product={productsData} />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </Router>
  );
};

export default App;
