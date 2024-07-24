// src/AxiosConfig.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090', 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Get the token from local storage or wherever you store it
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Check if token is expired
            const isTokenExpired = await checkTokenExpiry(token);
            if (!isTokenExpired) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                // Handle token refresh or logout the user
                // Example: await refreshToken();
                // Or redirect to login page
                console.error('JWT token expired');
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to check if JWT token is expired
const checkTokenExpiry = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

export default axiosInstance;
