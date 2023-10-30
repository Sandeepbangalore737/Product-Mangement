import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/getProduct/${productId}`);
        setProduct(response.data);
        setEditedProduct({ ...response.data });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateProduct/${productId}`, editedProduct);
      navigate('/productList');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={editedProduct.productName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={editedProduct.category}
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
            value={editedProduct.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>MRP</label>
          <input
            type="number"
            className="form-control"
            name="mrp"
            value={editedProduct.mrp}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            className="form-control"
            name="discount"
            value={editedProduct.discount}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
     <div class='d-flex'>
     <Link to="/productList" class="mr-5">Back to Product List</Link>
      <Link to="/">Back to Add Product</Link>
     </div>
    </div>
  );
}

export default ProductEdit;
