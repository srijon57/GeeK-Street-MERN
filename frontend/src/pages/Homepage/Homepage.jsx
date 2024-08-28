import React, { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Spinner from "../../components/Spinner/Spinner";
import { FaExchangeAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";

export const Homepage = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASEURL}/product`)
            .then((response) => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const latestProducts = product.slice(0, 6);

    return (
        <div>
            {/* Bubble animation HTML */}
            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>

            <div>
                <Hero />
            </div>
            <div className="home-container">
                <div className="hero-content">
                    <div className="max-w-md">
                        <h1 className="text-5xl">
                            Welcome to{" "}
                            <span className="text-teal-700">GEEK STREET</span>
                        </h1>
                        <p className="py-6">
                            We offer high-quality tech, including mobile
                            devices, gadgets, components, and laptops for
                            purchase.
                        </p>
                        <h3>
                            Please{" "}
                            <span className="sign-in-text">
                                Sign-In
                            </span>{" "}
                            to buy products
                        </h3>
                        <br></br>
                        <a href="/shop" className="btn">
                            Shop
                        </a>
                    </div>
                </div>

                <div className="featured-products-container">
                    <h2 className="featured-products-title">
                        Featured Products
                    </h2>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <ProductCard product={latestProducts} />
                )}
            </div>
            <div className="features-container2">
                <div className="feature-item">
                    <FaExchangeAlt className="feature-icon" />
                    <h3 className="feature-title">Easy Exchange Policy</h3>
                    <p className="feature-description">
                        We offer hassle free exchange policy
                    </p>
                </div>
                <div className="feature-item">
                    <FaUndoAlt className="feature-icon" />
                    <h3 className="feature-title">7 Days Return Policy</h3>
                    <p className="feature-description">
                        We provide 7 days free return policy
                    </p>
                </div>
                <div className="feature-item">
                    <FaHeadset className="feature-icon" />
                    <h3 className="feature-title">Best Customer Support</h3>
                    <p className="feature-description">
                        We provide 24/7 customer support
                    </p>
                </div>
            </div>
        </div>
    );
};
