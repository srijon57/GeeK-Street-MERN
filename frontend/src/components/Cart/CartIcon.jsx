import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartIcon.css"; // Ensure this imports your new CSS

const CartIcon = () => {
    const { cartItems } = useCart() || { cartItems: [] };

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="cart-icon">
            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                >
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                            {totalQuantity}
                        </span>
                    </div>
                </div>
                {totalQuantity > 0 && (
                    <div
                        tabIndex={0}
                        className="dropdown-content card card-compact bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span className="font-bold text-lg">
                                {totalQuantity} item(s)
                            </span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartIcon;
