import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./admin.css"; 

const Admin = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

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

    return (
        <div className="container2">
            <div className="table-container">
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
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, index) => (
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
                                <td className="table-cell">
                                    <div className="action-buttons">
                                        <Link to={`/admin/product/edit/${product._id}`} className="edit-btn">
                                            Edit
                                        </Link>
                                        <Link to={`/admin/product/delete/${product._id}`} className="delete-btn">
                                            Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
