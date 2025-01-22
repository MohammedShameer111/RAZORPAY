import React from 'react'
import Products from './components/products'
import { productsData } from './components/Data'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import PaymentSuccess from './components/PaymentSuccess'


const App = () => {
  return (
    <BrowserRouter>
 
    <Routes>
      <Route path='/' element={<Products product={productsData}/>}/>
      <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
    </Routes>

   </BrowserRouter>
  )
}

export default App
