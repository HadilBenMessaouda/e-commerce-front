// src/components/PriceRangeSlider.jsx
/*import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig'; // Import your axios instance
import './SearchStyles.css'; // Import the CSS file

const PriceRangeSlider = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByPriceRange = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/products/search/price/between`, {
                    params: { from: minPrice, to: maxPrice }
                });
                if (response.status === 200) {
                    setProducts(response.data);
                    console.log('Products in price range:', response.data);
                } else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching products:', error.response?.data || error.message);
            }
        };

        fetchProductsByPriceRange();
    }, [minPrice, maxPrice]);

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    return (
        <div className="price-range-slider">
            <h3>Price Range</h3>
            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="slider"
                />
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="slider"
                />
                <div className="price-values">
                    <span>Min: ${minPrice}</span>
                    <span>Max: ${maxPrice}</span>
                </div>
            </div>
            <div className="product-list">
                <h3>Products</h3>
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
        </div>
    );
};

export default PriceRangeSlider;*/
 // src/components/PriceRangeSlider.jsx
import React from 'react';
import './SearchStyles.css'; // Import the CSS file

const PriceRangeSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    return (
        <div className="price-range-slider">
            <h3>Price Range</h3>
            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="slider"
                />
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="slider"
                />
                <div className="price-values">
                    <span>Min: ${minPrice}</span>
                    <span>Max: ${maxPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeSlider;
