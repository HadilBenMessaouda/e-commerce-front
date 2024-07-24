// src/components/CategoryFilter.jsx

import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../Api'; // Import your fetch function
import './SearchStyles.css'; // Import the CSS file

const CategoryFilter = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchCategories()
            .then(data => {
                console.log('Fetched Categories:', data); // Log fetched categories
                setCategories(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            console.log('Selected Category:', selectedCategory); // Log selected category
            onCategorySelect(selectedCategory); // Trigger filter by selected category
        }
    }, [selectedCategory, onCategorySelect]);

    return (
        <div className="category-filter">
            <h3>Categories</h3>
            <ul>
                {categories.map(category => (
                    <li
                        key={category.category_id}
                        onClick={() => setSelectedCategory(category.category_id)}
                        className={selectedCategory === category.category_id ? 'selected' : ''}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;
