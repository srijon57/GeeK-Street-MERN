import React, { useEffect, useState } from "react";
import "./Home.css";

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = [
    "https://via.placeholder.com/800x400?text=Product+1",
    "https://via.placeholder.com/800x400?text=Product+2",
    "https://via.placeholder.com/800x400?text=Product+3",
    "https://via.placeholder.com/800x400?text=Product+4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % photos.length);
    }, 3000); // Change the interval time (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [currentIndex, photos.length]);

  return (
    <div className="homepage">
      <div className="image-carousel">
        <img src={photos[currentIndex]} alt={`Product ${currentIndex + 1}`} />
      </div>
      <div className="title-line">
        <div className="line"></div>
        <div className="title">FEATURED PRODUCTS</div>
        <div className="line"></div>
      </div>
      <div className="featured-shop">
        <div className="row">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="product" key={index}>
              <img src={`https://via.placeholder.com/400x300?text=Product+${index + 1}`} alt={`Product ${index + 1}`} />
              <button>Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
