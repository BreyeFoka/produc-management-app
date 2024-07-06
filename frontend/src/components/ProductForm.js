import React, { useState } from 'react';
import { addProduct } from '../api/api';

const ProductForm = ({ onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await addProduct({ product_name: productName, product_description: productDescription, product_price: productPrice });
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            onAddProduct(); // Refresh the product list
        } catch (error) {
            console.error("Failed to add product", error);
        }
    };

    return (
        <form onSubmit={handleAddProduct}>
            <h2>Add Product</h2>
            <div>
                <label>Product Name:</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
                <label>Product Description:</label>
                <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </div>
            <div>
                <label>Product Price:</label>
                <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
