import React, { useEffect, useState } from 'react';
import { productsData } from './components/Data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentSuccess from './components/PaymentSuccess';
import Product from './components/Product';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the backend URL from the environment variable
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    // Check if the apiUrl is defined
    if (!apiUrl) {
      setError('Backend URL is not defined.');
      return;
    }

    // Fetch data from the backend API
    fetch(`${apiUrl}/api/v1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log('Data received:', data);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product product={productsData} />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
