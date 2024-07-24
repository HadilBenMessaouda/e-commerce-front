// src/components/ProductsList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig';
import './ProductsList.css'; // Import the updated CSS file

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        if (!token) {
          throw new Error('JWT token not found');
        }

        const response = await axiosInstance.get('/api/v1/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="product-list-container">
      <div className="product-flex-container">
        {products.map(product => (
          <div key={product.product_id} className="product-card">
            <img src={product.imageURL} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
