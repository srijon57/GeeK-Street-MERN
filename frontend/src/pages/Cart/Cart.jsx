import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from "../../context/CartContext";
import './Cart.css'; 

const Cart = () => {
    const { cartItems, decreaseCartItemQuantity } = useCart();
    const navigate = useNavigate(); 

    if (cartItems.length === 0) {
        return <div className='cart-empty-message'>Your cart is empty.</div>;
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);

    const handleCheckout = () => {
        navigate('/payment'); 
    };

    return (
        <div className='cart-container'>
            <h2 className='cart-title'>Shopping Cart</h2>

            <div className='cart-grid'>
                {cartItems.map((item, index) => (
                    <div key={index} className='cart-item'>
                        <img src={item.image} alt={item.name} className='cart-image' />
                        <h2 className='cart-item-title'>{item.name}</h2>
                        <p className='cart-item-price'>Price: BDT {(item.priceInCents).toFixed(2)}</p>
                        <div className='cart-item-quantity'>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => decreaseCartItemQuantity(item._id)} className='cart-remove-button'>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='cart-total'>
                <p className='cart-total-price'>Total Price: BDT {(totalPrice).toFixed(2)}</p>
            </div>

            <button className='cart-checkout-button' onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
