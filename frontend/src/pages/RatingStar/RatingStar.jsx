import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './RatingStar.css';

const RatingStar = ({ noOfStars, rating, onChange }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (star) => {
        onChange(star);
    };

    return (
        <div className="rating-star-container">
            {[...Array(noOfStars)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index} className="rating-star-label">
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => handleClick(currentRating)}
                            className="rating-star-input"
                        />
                        <FaStar
                            className="rating-star-icon"
                            size={40}
                            color={
                                currentRating <= (hover || rating)
                                    ? '#f7c04a'
                                    : '#d0d0d0'
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            <div className="rating-star-text">
                {rating ? `Rating: ${rating}` : 'Rate here'}
            </div>
        </div>
    );
};

export default RatingStar;
