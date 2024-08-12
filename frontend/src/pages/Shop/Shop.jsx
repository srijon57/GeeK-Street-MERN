import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Search from "../../components/search/search";
import Spinner from "../../components/Spinner/Spinner";
import "./shop_style.css";

const Shop = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/product`);
                setProduct(response.data.data);
                setFilteredProducts(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchProducts();
    }, []);

    const filterProducts = () => {
        if (!Array.isArray(product)) {
            console.error("Products is not an array:", product);
            return;
        }

        let filtered = [...product];

        if (category !== "") {
            filtered = filtered.filter((item) => item.category === category);
        }

        if (searchTerm !== "") {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        filterProducts();
    }, [product, category, searchTerm]);

    return (
        <div className="shop-container">
            {loading && <Spinner />} {/* Show spinner while loading */}

            {!loading && filteredProducts.length === 0 && (
                <h3 style={{ textAlign: "center", margin: "0 auto", color: "white" }}>
                    No products available. Please{" "}
                    <span style={{ color: "rgb(80, 255, 198)" }}>check back later</span>.
                </h3>
            )}

            <div className="filters">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="">All</option>
                        <option value="Phones">Phones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Components">Components</option>
                        <option value="Gadgets">Gadgets</option>
                    </select>
                </div>

                <div className="form-control">
                    <Search onSearch={setSearchTerm} />
                </div>
            </div>

            {!loading && filteredProducts.length > 0 && (
                <ProductCard product={filteredProducts} />
            )}
        </div>
    );
};

export default Shop;
