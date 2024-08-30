import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RatingStar from "./RatingStar";
import "./ReviewPage.css";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const ReviewPage = () => {
    const [productName, setProductName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [starRating, setStarRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(8);
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_BASEURL}/reviews`,
                {
                    productName,
                    reviewText,
                    starRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            fetchReviews();
            setProductName("");
            setReviewText("");
            setStarRating(null);
            enqueueSnackbar("Review submitted successfully!", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar(
                error.response
                    ? error.response.data.message
                    : "Error submitting review",
                { variant: "error" }
            );
        }
    };

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/reviews`
            );
            setReviews(response.data);
            setIsAdmin(true);
        } catch (error) {
            enqueueSnackbar(
                error.response
                    ? error.response.data.message
                    : "Error fetching reviews",
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASEURL}/reviews/${reviewId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            fetchReviews();
            enqueueSnackbar("Review deleted successfully!", {
                variant: "success",
            });
        } catch (error) {
            let errorMessage = "Only author of this review can delete";
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [user]);

    // Get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="review-page-container">
            {user.isLoggedIn && (
                <div className="review-form-container">
                    <h1 className="review-form-heading">Submit Your Review</h1>
                    <form onSubmit={handleSubmit} className="review-form">
                        <div className="form-group">
                            <label className="form-label">Product Name:</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Review:</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                                className="form-textarea"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Star Rating:</label>
                            <RatingStar
                                noOfStars={5}
                                rating={starRating}
                                onChange={setStarRating}
                                className="rating-star-component"
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}
            <h2 className="reviews-heading">Reviews</h2>
            {loading ? (
                <div className="overlay">
                    <div className="lds-circle">
                        <div></div>
                    </div>
                </div>
            ) : (
                <div className="reviews-list">
                    {currentReviews.map((review) =>
                        review ? (
                            <div key={review._id} className="review-item">
                                <h3 className="review-product-name">
                                    {review.productName}
                                </h3>
                                <p className="review-text">
                                    {review.reviewText}
                                </p>
                                <p className="review-rating">
                                    Rating: {review.starRating} Stars
                                </p>
                                <p className="review-user-email">
                                    User: {review.user.email}
                                </p>
                                <p className="review-date">
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                {user.isLoggedIn &&
                                    (isAdmin ||
                                        review.user._id === user.id) && (
                                        <div className="review-actions">
                                            <button
                                                onClick={() =>
                                                    handleDelete(review._id)
                                                }
                                                className="delete-button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                            </div>
                        ) : null
                    )}
                </div>
            )}
            <div className="review-pagination">
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
