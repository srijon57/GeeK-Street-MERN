import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RatingStar from "./RatingStar";
import "./ReviewPage.css";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import BackToTop from "../../components/BackToTop/BackToTop";
const ReviewPage = () => {
    const [productName, setProductName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [starRating, setStarRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(8);// Number of visible reviews
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
            let errorMessage = "Error deleting review";
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

    // Pagination logic
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const totalPages = pageNumbers.length;
        const visiblePages = 3; // Number of visible pages
        const halfVisible = Math.floor(visiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        if (endPage - startPage + 1 < visiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + visiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - visiblePages + 1);
            }
        }

        const pages = [];
        if (startPage > 1) {
            pages.push(
                <button key="prev" onClick={() => paginate(currentPage - 1)}>
                    Previous
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => paginate(currentPage + 1)}>
                    Next
                </button>
            );
        }

        return pages;
    };

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
                {renderPageNumbers()}
            </div>
            <BackToTop/>
        </div>
    );
};

export default ReviewPage;
