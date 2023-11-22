import React from 'react';
import './App.scss';
import LoginForm from '../../pages/LoginForm/LoginForm';
import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../../pages/Products/ProductsPage';
import CustomersPage from '../../pages/Customers/CustomersPage';
import OrdersPage from '../../pages/Orders/OrdersPage';

function App() {
  return (
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/products' element={<ProductsPage />}/>
      <Route path='/customers' element={<CustomersPage />}/>
      <Route path='/orders' element={<OrdersPage />}/>
    </Routes>
  );
}

export default App;
