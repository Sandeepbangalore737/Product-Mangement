import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);


    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteProduct/${productId}`).then(axios.get('http://localhost:5000/getProducts'));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigate = useNavigate();

  
  const handleEdit = async (productId) => {
    try {   
      await axios.put(`http://localhost:5000/updateProduct/${productId}`);
      navigate(`/productList/${productId}`);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  
  return (
    <div className="container my-5">
      <h1 className="mb-4">Product List</h1>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product._id} className="list-group-item">
            <strong>{product.productName}</strong>
            <br />
            Category: {product.category}
            <br />
            Brand: {product.brand}
            <br />
            Price: Rs.{product.price}
            <br />
            MRP: Rs.{product.mrp}
            <br />
            Discount: {product.discount}%
            <br/>
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleEdit(product._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

