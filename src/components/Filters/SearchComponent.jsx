// src/components/SearchComponent.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../Api'; // Import your fetch function
import './SearchStyles.css'; // Import the CSS file

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: products = [], error, isLoading } = useQuery({
        queryKey: ['searchProducts', searchTerm],
        queryFn: () => fetchProducts(searchTerm),
        enabled: !!searchTerm, // Only fetch when `searchTerm` is not empty
        keepPreviousData: true // Keep previous data while new data is loading
    });

    return (
        <div className="search-component">
            <h3>Search Products</h3>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button onClick={() => {}} className="search-button">Search</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching products: {error.message}</p>}
            <ul>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>{product.name} - {product.price}</li>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </ul>
        </div>
    );
};

export default SearchComponent;
