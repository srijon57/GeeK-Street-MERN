import React from "react";
import Image1 from "./sale.png";
import Image2 from "./shopping.png";
import Image3 from "./women.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.css"; // Add your custom CSS for the slider styles

const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "Upto 50% off on all Men's Wear",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quidem explicabo consequatur voluptas, quas vitae amet! Praesentium cumque tempore natus.",
    },
    {
        id: 2,
        img: Image2,
        title: "Upto 30% off on all Women's Wear",
        description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat provident necessitatibus consectetur, quia repudiandae molestias laborum fuga.",
    },
    {
        id: 3,
        img: Image3,
        title: "70% off on all Products Sale",
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur magnam dolorum cupiditate ipsa fugit sequi, dicta placeat perferendis numquam quasi pariatur totam.",
    },
];

const Hero = () => {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <>
            <div className="hero-content">
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div key={data.id}>
                            <div className="grid-container">
                                <ul className="Grid-ul">
                                    <li>
                                        <h1 className="title">{data.title}</h1>
                                        <p className="description">
                                            {data.description}
                                        </p>
                                    </li>
                                    <li>
                                        <img
                                            src={data.img}
                                            alt=""
                                            className="hero-image"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Hero;
