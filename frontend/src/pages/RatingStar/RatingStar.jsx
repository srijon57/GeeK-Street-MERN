import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './RatingStar.css';

const RatingStar = ({ noOfStars, rating, onChange }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (star) => {
        onChange(star);
    };

    return (
        <div className="rating-star">
            {[...Array(noOfStars)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => handleClick(currentRating)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            size={50}
                            color={
                                currentRating <= (hover || rating)
                                    ? '#ffc107'
                                    : '#e4e5e9'
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default RatingStar;
