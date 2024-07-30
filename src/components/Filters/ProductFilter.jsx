import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig'; // Update path as needed
import { fetchProductsByCategory } from '../../Api'; // Adjust import if needed

const ProductFilter = ({ selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/categories'); // Update the endpoint as needed
        console.log('Fetched Categories:', response.data); // Log fetched categories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      console.log('Selected Category for Filtering:', selectedCategory); // Log selected category
      const handleFilter = async () => {
        try {
          const filteredProducts = await fetchProductsByCategory(selectedCategory);
          console.log('Filtered Products:', filteredProducts); // Log filtered products
          setProducts(filteredProducts);
        } catch (error) {
          setError(error.message);
        }
      };

      handleFilter();
    }
  }, [selectedCategory]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Filtered Products</h3>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.product_id}>
              <img src={product.imageURL} alt={product.name} width="100" />
              <div>{product.name}</div>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductFilter;
