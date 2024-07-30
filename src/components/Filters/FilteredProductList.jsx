import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosConfig'; // Import your axios instance
import PriceRangeSlider from './PriceRangeSlider'; // Adjust path as needed
import SearchComponent from './SearchComponent'; // Adjust path as needed
import CategoryFilter from './CategoryFilter'; // Adjust path as needed
import './SearchStyles.css'; // Import the CSS file

const FilteredProductList = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error('Error fetching all products:', error.message);
            }
        };

        fetchAllProducts();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let results = allProducts;

            if (searchTerm) {
                results = results.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (selectedCategory) {
                results = results.filter(product =>
                    product.category_id === selectedCategory
                );
            }

            results = results.filter(product =>
                product.price >= minPrice && product.price <= maxPrice
            );

            setFilteredProducts(results);
        };

        applyFilters();
    }, [minPrice, maxPrice, searchTerm, selectedCategory, allProducts]);

    return (
        <div className="filtered-product-list">
            <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
            <SearchComponent setSearchTerm={setSearchTerm} />
            <CategoryFilter setSelectedCategory={setSelectedCategory} />

            <div className="product-list">
                <h3>Products</h3>
                {filteredProducts.length > 0 ? (
                    <ul>
                        {filteredProducts.map(product => (
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
        </div>
    );
};

export default FilteredProductList;
