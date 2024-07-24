import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import SearchComponent from './SearchComponent';
import CategoryFilter from './CategoryFilter';
import './SearchStyles.css'; // Import the CSS file
import ProductByCategory from './ProductByCategory';


const StyledComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const handlePriceChange = (minPrice, maxPrice) => {
        console.log(`Price range: ${minPrice} - ${maxPrice}`);
        // Optionally, fetch or update product list based on price range
    };

    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
        // Optionally, fetch or update product list based on search parameters
    };

   

    return (
        <div className="styled-component">
            <PriceRangeSlider onPriceChange={handlePriceChange} />
            <SearchComponent onSearch={handleSearch} />
            <div className="category-product-manager">
            <CategoryFilter onCategorySelect={handleCategorySelect} />
            {selectedCategory && <ProductByCategory categoryId={selectedCategory} />}
        </div>

        </div>
    );
};

export default StyledComponent;
