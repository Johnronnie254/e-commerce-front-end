import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://online-market-msht.onrender.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add product: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 'Product created successfully') {
          console.log('Product added successfully:', data.product);
        } else {
          console.error('Error adding product:', data.error);
        }
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="productImage"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
