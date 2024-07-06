import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { fetchProducts, deleteProduct } from '../api/api';

const Dashboard = ({ setAuth }) => {
    const [products, setProducts] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };

    const fetchProductList = async () => {
        try {
            const response = await fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <ProductForm onAddProduct={fetchProductList} />
            <ProductList products={products} onDeleteProduct={handleDeleteProduct} />
        </div>
    );
};

export default Dashboard;
