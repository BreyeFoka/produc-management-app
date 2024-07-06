import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/api';
import './ProductForm.css'

const ProductForm = ({ onAddProduct, currentProduct }) => {
  const [product, setProduct] = useState({ name: '', description:'', price: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      setProduct({ ...currentProduct });
      setIsEditing(true);
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(product.id, product);
      } else {
        await createProduct(product);
      }
      setProduct({ name: '', description:'', price: 0 });
      setIsEditing(false);
      onAddProduct();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
    <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="product-input"
        required
    />
    <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="product-input"
        required
    />
    <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="product-input"
        required
    />
    <button type="submit" className="product-button">
        {isEditing ? 'Update' : 'Add'} Product
    </button>
</form>
  );
};

export default ProductForm;
