import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../Api'; // Import your fetch function
import './SearchStyles.css'; // Import the CSS file

const CategoryFilter = ({ setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                console.log('Fetched Categories:', data); // Log fetched categories
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        loadCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        console.log('Category Clicked:', categoryId); // Log category click
        setSelectedCategory(categoryId);
    };

    return (
        <div className="category-filter">
            <h3>Categories</h3>
            <ul>
                {categories.map(category => (
                    <li
                        key={category.category_id}
                        onClick={() => handleCategoryClick(category.category_id)}
                        className="category-item"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;
