import React, { useContext, useState, useEffect } from "react";
import "./ProductSingleCard.css";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import RatingStar from "./RatingStar/RatingStar";
import axios from "axios";
import { useSnackbar } from "notistack";

const ProductSingleCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems } = useCart();
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const { enqueueSnackbar } = useSnackbar();

    const itemInCart = cartItems.find((item) => item._id === product._id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    useEffect(() => {
        setReviews(product.reviews || []);
    }, [product]);

    // Function to calculate average rating
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const averageRating = parseFloat(calculateAverageRating());

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

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleReviewSubmit = async () => {
        if (!newReview.rating || !newReview.comment.trim()) {
            enqueueSnackbar("Please provide both rating and comment.", {
                variant: "error",
            });
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/reviews/${product._id}/reviews`,
                newReview,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setReviews([...reviews, response.data]);
            setNewReview({ rating: 0, comment: "" });
            enqueueSnackbar("Review added successfully!", {
                variant: "success",
            });
        } catch (error) {
            console.error("Error adding review:", error);
            enqueueSnackbar("Error adding review. Please try again.", {
                variant: "error",
            });
        }
    };

    const handleReviewDelete = async (reviewId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASEURL}/reviews/${product._id}/reviews/${reviewId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setReviews(reviews.filter((review) => review._id !== reviewId));
            enqueueSnackbar("Review deleted successfully!", {
                variant: "success",
            });
        } catch (error) {
            console.error("Error deleting review:", error);
            enqueueSnackbar("Error deleting review. Please try again.", {
                variant: "error",
            });
        }
    };

    return (
        <>
            <div className="product-card">
                <figure className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                </figure>
                <div className="product-overlay" onClick={handleModalOpen}>
                    <span className="product-overlay-text">View Details</span>
                </div>
                <div className="product-card-body">
                    <h2 className="product-card-title">{product.name}</h2>
                    <div className="product-price">
                        BDT {product.priceInCents.toFixed(2)}
                    </div>
                    <div
                        className={`product-stock ${
                            product.quantity > 0 ? "in-stock" : "out-of-stock"
                        }`}
                    >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                    <div className="product-card-actions">
                        {user.isLoggedIn && product.quantity > 0 && (
                            <>
                                {quantity > 0 ? (
                                    <button
                                        className="product-btn product-btn-error"
                                        onClick={handleRemoveFromCart}
                                    >
                                        Remove from Cart
                                    </button>
                                ) : (
                                    <button
                                        className="product-btn product-btn-primary"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="product-modal-overlay"
                    onClick={handleModalClose}
                >
                    <div
                        className="product-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span
                            className="product-modal-close"
                            onClick={handleModalClose}
                        >
                            &times;
                        </span>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-modal-image"
                        />
                        <h2>{product.name}</h2>
                        <p>
                            {product.description || "No description available."}
                        </p>
                        <div className="product-price">
                            BDT {product.priceInCents.toFixed(2)}
                        </div>
                        {/* Average Rating inside Modal */}
                        <div className="average-rating">
                            <RatingStar
                                noOfStars={5}
                                rating={averageRating}
                                isReadOnly={true}
                            />
                            <span className="average-rating-number">
                                {averageRating}
                            </span>
                        </div>
                        <div
                            className={`product-stock ${
                                product.quantity > 0
                                    ? "in-stock"
                                    : "out-of-stock"
                            }`}
                        >
                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </div>
                        <div className="product-modal-actions">
                            {user.isLoggedIn && product.quantity > 0 && (
                                <>
                                    {quantity > 0 ? (
                                        <button
                                            className="product-btn product-btn-error"
                                            onClick={handleRemoveFromCart}
                                        >
                                            Remove from Cart
                                        </button>
                                    ) : (
                                        <button
                                            className="product-btn product-btn-primary"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="product-reviews">
                            {user.isLoggedIn && (
                                <div className="review-form">
                                    <h4>Add a Review</h4>
                                    <div className="rating-star-container">
                                        <RatingStar
                                            noOfStars={5}
                                            rating={newReview.rating}
                                            onChange={(rating) =>
                                                setNewReview({
                                                    ...newReview,
                                                    rating,
                                                })
                                            }
                                        />
                                    </div>
                                    <textarea
                                        name="comment"
                                        value={newReview.comment}
                                        onChange={handleReviewChange}
                                        placeholder="Write your review here..."
                                    />
                                    <button
                                        className="review-submit-btn"
                                        onClick={handleReviewSubmit}
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            )}
                            <h3>Reviews</h3>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="review-item"
                                    >
                                        <div className="review-rating">
                                            <RatingStar
                                                noOfStars={5}
                                                rating={review.rating}
                                                isReadOnly={true}
                                            />
                                            <span className="average-rating-number">
                                                {review.rating}
                                            </span>
                                        </div>
                                        <div className="review-comment">
                                            -{review.comment}
                                        </div>
                                        <div className="review-metadata">
                                            <span className="review-user">
                                                By: {review.user.email}
                                            </span>
                                            <span className="review-date">
                                                Date:{" "}
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {(user.role === "admin" ||
                                            review.user._id === user.id) && (
                                            <button
                                                className="review-delete-btn"
                                                onClick={() =>
                                                    handleReviewDelete(
                                                        review._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSingleCard;
