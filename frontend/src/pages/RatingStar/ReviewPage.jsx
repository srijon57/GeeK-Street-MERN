import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingStar from './RatingStar';
import './RatingStar.css';

const ReviewPage = () => {
    const [productName, setProductName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(null);
    const [reviews, setReviews] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/reviews/submit', {
                productName,
                reviewText,
                starRating
            });
            fetchReviews();
            setProductName('');
            setReviewText('');
            setStarRating(null);
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="review-page">
            <h1>Submit Your Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Star Rating:</label>
                    <RatingStar
                        noOfStars={5}
                        rating={starRating}
                        onChange={setStarRating}
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
            <h2>Reviews</h2>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review._id} className="review-item">
                        <h3>{review.productName}</h3>
                        <p>{review.reviewText}</p>
                        <p>Rating: {review.starRating} Stars</p>
                        <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
