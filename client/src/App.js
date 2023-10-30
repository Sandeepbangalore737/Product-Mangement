import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductManagement from './Pages/addProducts/addProduct';
import ProductList from './Pages/addProducts/productList';
import ProductEdit from './Pages/addProducts/productEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductManagement />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productList/:productId" element={<ProductEdit />} />

      </Routes>
    </Router>
  );
}

export default App;

