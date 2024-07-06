// src/api/api.js
import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/';

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

// User API functions
export const loginUser = (username, password) => {
    return api.post('/login', { username, password });
};

export const registerUser = (userData) => {
    return api.post('/register', userData);
};

// Product API functions
export const fetchProducts = () => {
    return api.get('/products');
};

export const addProduct = (productData) => {
    return api.post('/products', productData);
};

export const deleteProduct = (productId) => {
    return api.delete(`/products/${productId}`);
};

export const updateProduct = (productId, productData) => {
    return api.put(`/products/${productId}`, productData);
};
