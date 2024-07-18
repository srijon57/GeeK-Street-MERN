import React from 'react';
import './ProductCard.css';
import ProductSingleCard from './ProductSingleCard';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card-grid product-card-container">
      {Array.isArray(product) && product.map((item) => (
        <ProductSingleCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default ProductCard;
