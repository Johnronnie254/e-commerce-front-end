import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://online-market-msht.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []); 

  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.imageUrl} className="card-img-top" alt={`Product ${product.id}`} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <img className="half-size-image" src={product.image_url} alt={product.name} />
                <p className="card-text">Price: ${product.price}</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
