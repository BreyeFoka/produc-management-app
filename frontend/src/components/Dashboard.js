import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { fetchProducts, deleteProduct} from '../api/api';
import './Dashboard.css';

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
  const handleLogout = () => {
      localStorage.removeItem('token');
      setAuth(false);
  }
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
        <div className="dashboard">
            <header className="dashboard-header">
                <h2>Dashboard</h2>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <section className="dashboard-content">
                <ProductForm onAddProduct={handleAddProduct} currentProduct={currentProduct} />
                <ProductList products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />
            </section>
        </div>
  );
};

export default Dashboard;
