import React from 'react'


import { productsData } from './components/Data'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import PaymentSuccess from './components/PaymentSuccess'
import Product from './components/Product'


const App = () => {
  return (
    <BrowserRouter>
 
    <Routes>
    <Route path='/' element={<Product product={productsData}/>}/>
      <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
    </Routes>

   </BrowserRouter>
  )
}

export default App
