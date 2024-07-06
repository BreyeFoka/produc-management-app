import React from 'react';

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
          {product.description}
          <button onClick={() => onEditProduct(product)}>Edit</button>
          <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
