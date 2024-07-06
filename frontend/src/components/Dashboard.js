import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { fetchProducts, deleteProduct, updateProduct } from '../api/api';

const Dashboard = ({ setAuth }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const productList = await fetchProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    fetchProductList(); // Refresh product list after adding/editing
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <ProductForm onAddProduct={handleAddProduct} currentProduct={currentProduct} />
      <ProductList products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />
    </div>
  );
};

export default Dashboard;
