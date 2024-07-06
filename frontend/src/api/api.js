// api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your API endpoint

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/products/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    await axios.put(`${BASE_URL}/products/${id}`, updatedProduct);
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (newProduct) => {
  try {
    await axios.post(`${BASE_URL}/products`, newProduct);
  } catch (error) {
    throw error;
  }
};
