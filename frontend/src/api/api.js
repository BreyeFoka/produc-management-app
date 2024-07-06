import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Setup axios instance
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


// API functions
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await api.put(`/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    const response = await api.post('/products/', newProduct);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const userRegister = async (newUser) => {
  try {
    const response = await api.post('/auth/register', newUser);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const userlogin = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token } = response.data;
    // Store the token
    localStorage.setItem('x-access-token', token);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
