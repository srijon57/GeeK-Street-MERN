import React, { useContext, useState } from 'react';
import './ProductSingleCard.css';
import { useCart } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const ProductSingleCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemInCart = cartItems.find(item => item._id === product._id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card">
        <figure className="image-container">
          <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover object-top" />
          <div className="overlay" onClick={handleModalOpen}>
            <span className="overlay-text">View Details</span>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          
          <div className="price">BDT {(product.priceInCents).toFixed(2)}</div>
          <div className="card-actions">
            {user.isLoggedIn && (
              <>
                {quantity > 0 ? (
                  <button className="btn btn-error" onClick={handleRemoveFromCart}>
                    Remove from Cart
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content">
            <span className="modal-close" onClick={handleModalClose}>&times;</span>
            <img src={product.image} alt={product.name} className="modal-image" />
            <h2>{product.name}</h2>
            <p>{product.description || 'No description available.'}</p>
            <div className="price">BDT {(product.priceInCents).toFixed(2)}</div>
            <div className="card-actions">
              {user.isLoggedIn && (
                <>
                  {quantity > 0 ? (
                    <button className="btn btn-error" onClick={handleRemoveFromCart}>
                      Remove from Cart
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSingleCard;
