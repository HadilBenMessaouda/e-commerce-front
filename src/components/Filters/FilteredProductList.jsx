// src/components/FilteredProductList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig';
import PriceRangeSlider from './PriceRangeSlider';
import ProductByCategory from './ProductByCategory';
import SearchComponent from './SearchComponent';
import './SearchStyles.css';

const FilteredProductList = () => {
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchFilteredProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/v1/products/filter', {
                params: {
                    minPrice,
                    maxPrice,
                    searchTerm,
                    categoryId: selectedCategory
                }
            });

            if (response.status === 200) {
                setProducts(response.data);
            } else {
                console.error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching filtered products:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, [minPrice, maxPrice, searchTerm, selectedCategory]);

    return (
        <div className="filtered-product-list">
            <h2>Filtered Product List</h2>
            <PriceRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />
            <ProductByCategory categoryId={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="product-list">
                {products.length > 0 ? (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <strong>{product.name}</strong> - {product.description} - ${product.price}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default FilteredProductList;
