import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductManagement() {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: 'Select Category',
    brand: '',
    price: 0,
    mrp: 0,
    discount: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    console.log("event::::",event.target.value);
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/addProduct', newProduct);
      console.log('Product saved:', response.data);
      navigate('/productList');
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="container">
      <h1 className="mb-4">Product Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={newProduct.productName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          >
            <option value="Select Category" disabled>
              Select Category
            </option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={newProduct.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>MRP</label>
          <input
            type="number"
            className="form-control"
            name="mrp"
            value={newProduct.mrp}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            className="form-control"
            name="discount"
            value={newProduct.discount}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProductManagement;

