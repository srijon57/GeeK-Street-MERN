import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./deleteProduct.css"; 
import Spinner from "../../../components/Spinner/Spinner";

const DeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    // const token = localStorage.getItem("token");

    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    // };

    const handleDeleteProduct = () => {
        setLoading(true);

        axios
            .delete(
                `${import.meta.env.VITE_BASEURL}/product/${id}`,
                // config
            )
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Product Deleted", { variant: "success" });
                navigate("/admin");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error", { variant: "error" });
                console.log(error);
            });
    };

    return (
        <div className="delete-product-container">
            {loading && <Spinner/>}
            <Link
                to="/admin"
                className="back-button"
            >
                Back
            </Link>
            <h2 className="confirmation-text">
                Are You Sure You Want to Delete This Product?
            </h2>
            <button
                onClick={handleDeleteProduct}
                className="delete-button"
            >
                Yes, Delete
            </button>
        </div>
    );
};

export default DeleteProduct;
