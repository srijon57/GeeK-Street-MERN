import React, { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";

export const Homepage = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/product`)
            .then((response) => {
                setProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const latestProducts = product.slice(0, 3);

    return (
        <div>
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
                        We offer high-quality tech, including mobile devices,
                        gadgets, components, and laptops for purchase.
                        </p>
                        <a href="/shop" className="btn">
                            Shop
                        </a>
                    </div>
                </div>

                <ProductCard product={latestProducts} />
            </div>
        </div>
    );
};
