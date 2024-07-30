// src/api.js

import axiosInstance from './AxiosConfig'; // Import your axios instance

export const fetchProducts = async (searchTerm) => {
    try {
        const response = await axiosInstance.get('/api/v1/products/search', {
            params: { data: searchTerm }
        });

        if (response.status === 200) {
            return Array.isArray(response.data) ? response.data : [];
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        return [];
    }
};

export const fetchProductsByCategory = async (category_id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/products/category/id/${category_id}`);

        console.log('Fetch Products by Category Response:', response); // Log the full response
        if (response.status === 200) {
            return Array.isArray(response.data) ? response.data : [];
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching products by category:', error.response?.data || error.message);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/category/list');
        if (response.status === 200) {
            return Array.isArray(response.data) ? response.data : [];
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        return [];
    }
};
