
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import { productsData } from './components/Data';
import PaymentSuccess from './components/PaymentSuccess';
import Product from './components/Product';

const App = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   // ✅ Automatically switch between local and production URLs
//   const API_BASE_URL = import.meta.env.MODE === "development"
//     ? import.meta.env.VITE_API_BASE_URL
//     : import.meta.env.VITE_API_PROD_URL;

//   useEffect(() => {
//     const apiUrl = `${API_BASE_URL}/api/v1/`;

//     axios.get(apiUrl)
//       .then((response) => {
//         setData(response.data);
//         console.log('Data received:', response.data);
//       })
//       .catch((error) => {
//         setError(error.message || 'Failed to fetch data');
//         console.error('Error fetching data:', error);
//       });
//   }, []);
   



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
