// src/components/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../../Api'; // Import your fetch function
import './SearchStyles.css'; // Import the CSS file

const ProductByCategory = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categoryId) {
            console.log('Fetching products for category:', categoryId); // Log category ID
            setLoading(true);
            setError(null);
            const fetchProducts = async () => {
                try {
                    const fetchedProducts = await fetchProductsByCategory(categoryId);
                    console.log('Fetched Products:', fetchedProducts); // Log fetched products
                    setProducts(fetchedProducts);
                } catch (error) {
                    console.error('Error fetching products:', error.message);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [categoryId]);

    return (
        <div className="product-page">
            <h3>Products</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching products: {error}</p>}
            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name} - {product.price}</li>
                    ))}
                </ul>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default ProductByCategory;
