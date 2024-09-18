import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/search/search";
import Spinner from "../../components/Spinner/Spinner";
import "./admin.css";

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASEURL}/product`)
            .then((response) => {
                setProducts(response.data.data);
                setFilteredProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
            setCurrentPage(1);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container2">
            <Search onSearch={handleSearch} />
            <div className="table-container">
                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <>
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>
                                        <Link to="/admin/product/create" className="add-item-btn">
                                            Add Item +
                                        </Link>
                                    </th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product) => (
                                    <tr key={product._id} className="product-row">
                                        <td>
                                            <div className="avatar">
                                                <div className="avatar-image">
                                                    <img src={product.image} alt={product.title} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">{product.name}</td>
                                        <td className="table-cell">{product.priceInCents}</td>
                                        <td className="table-cell">{product.description}</td>
                                        <td className="table-cell">{product.category}</td>
                                        <td className="table-cell">{product.quantity}</td>
                                        <td className="table-cell">
                                            <div className="action-buttons">
                                                <Link
                                                    to={`/admin/product/edit/${product._id}`}
                                                    className="edit-btn"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    to={`/admin/product/delete/${product._id}`}
                                                    className="delete-btn"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="admin-pagination">
                            <button
                                className="pagination-btn"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="pagination-btn"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
