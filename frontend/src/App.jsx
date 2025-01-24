
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import { productsData } from './components/Data';
import Product from './components/Product';
import PaymentSuccess from './components/PaymentSuccess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product product={productsData} />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
      {/* {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} */}
    </Router>
  );
};

export default App;
