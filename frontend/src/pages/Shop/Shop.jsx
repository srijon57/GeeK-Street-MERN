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
    const [sortOrder, setSortOrder] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/product`);
                setProduct(response.data.data);
                setFilteredProducts(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
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

        // Sorting logic
        if (sortOrder === "priceHighToLow") {
            filtered.sort((a, b) => parseFloat(b.priceInCents) - parseFloat(a.priceInCents));
        } else if (sortOrder === "priceLowToHigh") {
            filtered.sort((a, b) => parseFloat(a.priceInCents) - parseFloat(b.priceInCents));
        } else if (sortOrder === "alphabeticAsc") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "alphabeticDesc") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        filterProducts();
    }, [product, category, searchTerm, sortOrder]);
    //Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="shop-container">
            {loading && <Spinner />}

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
                    <label className="label">
                        <span className="label-text">Search</span>
                    </label>
                    <Search onSearch={setSearchTerm} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sort By</span>
                    </label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="">Select</option>
                        <option value="priceHighToLow">Price High to Low</option>
                        <option value="priceLowToHigh">Price Low to High</option>
                        <option value="alphabeticAsc">Alphabetic A-Z</option>
                        <option value="alphabeticDesc">Alphabetic Z-A</option>
                    </select>
                </div>
            </div>
            {!loading && filteredProducts.length === 0 && (
                <h3 className="No-product">
                    No products available in this name. <span>Please
                    check back later.</span>
                </h3>
            )}
            {!loading && filteredProducts.length > 0 && (
                <ProductCard product={currentProducts} />
            )}

            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Shop;
