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

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const totalPages = pageNumbers.length;
        const visiblePages = 4; // Number of visible pages
        const halfVisible = Math.floor(visiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        if (endPage - startPage + 1 < visiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + visiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - visiblePages + 1);
            }
        }

        const pages = [];
        if (startPage > 1) {
            pages.push(
                <button key="prev" onClick={() => paginate(currentPage - 1)}>
                    Previous
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => paginate(currentPage + 1)}>
                    Next
                </button>
            );
        }

        return pages;
    };

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
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default Shop;
