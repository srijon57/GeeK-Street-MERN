import React, { useState } from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import './RatingStar.css';

const RatingStar = ({ noOfStars, rating, onChange, isReadOnly = false }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (star) => {
        if (!isReadOnly) {
            onChange(star);
        }
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
                        {currentRating <= (hover || rating) ? (
                            <MdStar
                                className="rating-star-icon"
                                size={40}
                                color="#f7c04a"
                                onMouseEnter={!isReadOnly ? () => setHover(currentRating) : undefined}
                                onMouseLeave={!isReadOnly ? () => setHover(null) : undefined}
                            />
                        ) : (
                            <MdStarBorder
                                className="rating-star-icon"
                                size={40}
                                color="#d0d0d0"
                                onMouseEnter={!isReadOnly ? () => setHover(currentRating) : undefined}
                                onMouseLeave={!isReadOnly ? () => setHover(null) : undefined}
                            />
                        )}
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
