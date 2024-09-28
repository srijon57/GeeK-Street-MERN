import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Spinner from "../../components/Spinner/Spinner";
import { FaExchangeAlt, FaUndoAlt, FaHeadset, FaPlus, FaMinus, FaMobileAlt, FaLaptop, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { BsCpuFill } from "react-icons/bs";
export const Homepage = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [openQuestion, setOpenQuestion] = useState(null);

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

    const latestProducts = [...product].reverse().slice(0, 9);

    const questions = [
        {
            question: "Q: How much do deliveries cost?",
            answer: "A: Deliveries cost ৳50 for inside served cities and ৳100 for outside served cities."
        },
        {
            question: "Q: What are your delivery hours?",
            answer: "A: Our delivery hours are from 9 AM to 6 PM, Saturday to Thursday."
        },
        {
            question: "Q: What is your policy on refunds?",
            answer: "A: We offer a full refund within 30 days of purchase, provided the item is in its original condition."
        },
        {
            question: "Q: What about the prices?",
            answer: "A: Our prices are competitive and we offer regular discounts and promotions."
        },
        {
            question: "Q: Which cites do you serve ?",
            answer: "A: We serve in Dhaka, Khulna, Sylhet, Rajshahi, Chattogram, Mymensingh, Jessore and Barisal."
        }
    ];

    return (
        <div>
            {/* Bubble animation*/}
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
                        {user.isLoggedIn ? (
                            <h3>Thank you for choosing Geek Street BD.</h3>
                        ) : (
                            <h3>
                                Please{" "}
                                <Link to="/Login" className="sign-in-text">
                                    Sign-In
                                </Link>{" "}
                                to buy products
                            </h3>
                        )}
                        <br></br>
                        <Link to="/shop" className="btn">
                            Shop
                        </Link>
                    </div>
                </div>

                <div className="explore-categories-container">
                    <h2 className="explore-categories-title">Explore Popular Categories</h2>
                    <div className="categories-list">
                        <Link to="/shop?category=Phones" className="category-item">
                            <FaMobileAlt className="category-icon" />
                            <span>Phones</span>
                        </Link>
                        <Link to="/shop?category=Laptops" className="category-item">
                            <FaLaptop className="category-icon" />
                            <span>Laptops</span>
                        </Link>
                        <Link to="/shop?category=Components" className="category-item">
                            <BsCpuFill  className="category-icon" />
                            <span>Components</span>
                        </Link>
                        <Link to="/shop?category=Gadgets" className="category-item">
                            <FaGamepad className="category-icon" />
                            <span>Gadgets</span>
                        </Link>
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
            

            <div className="common-questions-container">
                <h2 className="common-questions-title">Common Questions</h2>
                {questions.map((q, index) => (
                    <div key={index} className="question-item">
                        <div className="question-header" onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
                            <h3>{q.question}</h3>
                            {openQuestion === index ? <FaMinus /> : <FaPlus />}
                        </div>
                        {openQuestion === index && (
                            <div className="question-answer">
                                <p>{q.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
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
