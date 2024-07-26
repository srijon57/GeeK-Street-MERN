import React from 'react';
import { useCart } from "../../context/CartContext";
import axios from "axios";
import './Cart.css'; // Import your CSS file for styles

const Cart = () => {
    const { cartItems, decreaseCartItemQuantity, addToCart, clearCart } = useCart();

    if (cartItems.length === 0) {
        return <div className='cart-empty-message'>Your cart is empty.</div>;
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);

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
                            <p className='cart-item-remove'>
                            <button onClick={() => decreaseCartItemQuantity(item._id)} className='cart-remove-button'>Remove</button>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='cart-total'>
                <p className='cart-total-price'>Total Price: BDT {(totalPrice).toFixed(2)}</p>
            </div>

            <button className='cart-checkout-button'>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
