import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./editProduct.css";
import Spinner from "../../../components/Spinner/Spinner";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [priceInCents, setPriceInCents] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/product/${id}`)
            .then((response) => {
                setName(response.data.name);
                setPriceInCents(response.data.priceInCents);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                alert("An error happened. Check console");
            });
    }, [id]);

    const handleEditProduct = () => {
        const data = { name, priceInCents, description, category };
        setLoading(true);
        axios
            .put(`http://localhost:5000/product/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Product edited successfully", {
                    variant: "success",
                });
                navigate("/admin");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error", { variant: "error" });
                console.log(error);
            });
    };

    return (
        <div className='edit-product-container'>
        {loading && <Spinner/>}
        <div className="edit-product-form">
            <Link to="/admin" className="back-button">
                Back
            </Link>
            <h1 className="form-title">Edit Product</h1>
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />

                <label htmlFor="priceInCents" className="form-label">
                    Price in cents
                </label>
                <input
                    id="priceInCents"
                    type="number"
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(e.target.value)}
                    className="form-input"
                />

                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                />

                <label htmlFor="category" className="form-label">
                    Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                    required
                >
                    <option value="" disabled>
                        Select category
                    </option>
                    <option value="Phones">Phones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Components">Components</option>
                        <option value="Gadgets">Gadgets</option>
                </select>

                <button onClick={handleEditProduct} className="submit-button">
                    Save Changes
                </button>
            </div>
        </div>
        </div>
    );
};

export default EditProduct;
