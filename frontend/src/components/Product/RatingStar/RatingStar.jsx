import React, { useState } from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import PropTypes from 'prop-types';
import './RatingStar.css';

const RatingStar = ({ noOfStars, rating, onChange = () => {}, isReadOnly = false }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (star) => {
        if (!isReadOnly && onChange) {
            onChange(star);
        }
    };

    // Function to round rating to the nearest half
    const roundToHalf = (num) => {
        return Math.round(num * 2) / 2;
    };

    const roundedRating = roundToHalf(rating);

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= noOfStars; i++) {
            if (i <= Math.floor(roundedRating)) {
                // Full Star
                stars.push(
                    <MdStar
                        key={i}
                        className="rating-star-icon"
                        size={24}
                        color="#f7c04a"
                        onMouseEnter={!isReadOnly ? () => setHover(i) : undefined}
                        onMouseLeave={!isReadOnly ? () => setHover(null) : undefined}
                        onClick={() => handleClick(i)}
                    />
                );
            } else if (i - 0.5 === roundedRating) {
                // Half Star
                stars.push(
                    <MdStarHalf
                        key={i}
                        className="rating-star-icon"
                        size={24}
                        color="#f7c04a"
                        onMouseEnter={!isReadOnly ? () => setHover(i) : undefined}
                        onMouseLeave={!isReadOnly ? () => setHover(null) : undefined}
                        onClick={() => handleClick(i)}
                    />
                );
            } else {
                // Empty Star
                stars.push(
                    <MdStarBorder
                        key={i}
                        className="rating-star-icon"
                        size={24}
                        color="#d0d0d0"
                        onMouseEnter={!isReadOnly ? () => setHover(i) : undefined}
                        onMouseLeave={!isReadOnly ? () => setHover(null) : undefined}
                        onClick={() => handleClick(i)}
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className="rating-star-container">
            {renderStars()}
        </div>
    );
};

RatingStar.propTypes = {
    noOfStars: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    isReadOnly: PropTypes.bool,
};

export default RatingStar;
