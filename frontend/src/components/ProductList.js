import React from 'react';
import './ProductList.css'

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <ul className="product-list">
    {products.map(product => (
        <li key={product.id} className="product-item">
            <span className="product-info">
                <span className="product-name">{product.name}</span> - 
                <span className="product-price">${product.price}</span>
                <span className="product-description">{product.description}</span>
            </span>
            <div className="product-actions">
                <button onClick={() => onEditProduct(product)} className="product-button edit-button">Edit</button>
                <button onClick={() => onDeleteProduct(product.id)} className="product-button delete-button">Delete</button>
            </div>
        </li>
    ))}
</ul>
  );
};

export default ProductList;
