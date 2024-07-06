import React from 'react';

const ProductList = ({ products, onDeleteProduct }) => {
    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div><strong>Name:</strong> {product.product_name}</div>
                        <div><strong>Description:</strong> {product.product_description}</div>
                        <div><strong>Price:</strong> {product.product_price}</div>
                        <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
