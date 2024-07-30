import React, { useState, useEffect } from 'react';
import ProductFilter from '../components/Filters/ProductFilter';
import Pl from '../components/products/Pl'; // Component to display the list of products
import { fetchProducts } from '../Api';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts('');
                console.log('Fetched Products:', products); // Log fetched products
                setProducts(products);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Products</h1>
            <ProductFilter selectedCategory={selectedCategory} /> {/* Include filter component */}
            <Pl products={products} /> {/* Component to display products */}
        </div>
    );
};

export default ProductPage;
