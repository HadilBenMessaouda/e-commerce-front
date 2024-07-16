// src/AxiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090', // Replace with your backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from local storage or wherever you store it
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
