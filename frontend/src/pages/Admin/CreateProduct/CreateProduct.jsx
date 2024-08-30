import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../../../components/Spinner/Spinner";
import "./createProduct.css";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [priceInCents, setPriceInCents] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);

    const [imgPreview, setImgPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImgPreview(null);
        }
    };

    const uploadFile = async () => {
        if (!img) {
            enqueueSnackbar("No image selected", { variant: "warning" });
            return;
        }

        const data = new FormData();
        data.append("file", img);

        try {
            const uploadUrl = `${import.meta.env.VITE_BASEURL}/upload-image`;
            const res = await axios.post(uploadUrl, data);

            const { secure_url } = res.data;
            console.log("Uploaded image url: ", secure_url);
            enqueueSnackbar("Image uploaded successfully", {
                variant: "success",
            });
            return secure_url;
        } catch (error) {
            console.error("Upload error", error);
            enqueueSnackbar("Failed to upload an image", { variant: "error" });
        }
    };

    const handleSaveProduct = async () => {
        if (!name || !priceInCents || !category) {
            enqueueSnackbar("Please fill all required fields", {
                variant: "warning",
            });
            return;
        }

        const price = parseInt(priceInCents);
        if (isNaN(price) || price <= 0) {
            enqueueSnackbar("Price must be a positive number", {
                variant: "warning",
            });
            return;
        }

        setLoading(true);

        try {
            const uploadedImageUrl = await uploadFile();
            if (!uploadedImageUrl) {
                throw new Error("Image upload failed");
            }

            const formData = {
                name,
                priceInCents,
                description,
                image: uploadedImageUrl,
                category,
            };

            await axios.post(`${import.meta.env.VITE_BASEURL}/product`, formData, config);

            enqueueSnackbar("Product saved successfully", {
                variant: "success",
            });
            navigate("/admin");
        } catch (error) {
            console.error("Error:", error);
            enqueueSnackbar(
                "Error saving product: " +
                    (error.response?.data?.message || error.message),
                { variant: "error" }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-container">
            {loading && <Spinner />}
            <div className="create-product-form">
                <Link to="/admin" className="create-product-back-button">
                    Back
                </Link>
                <h1 className="create-product-title">Create Product</h1>
                <div className="create-product-fields">
                    <label htmlFor="name" className="create-product-label">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="create-product-input"
                    />

                    <label htmlFor="priceInCents" className="create-product-label">
                        Price
                    </label>
                    <input
                        id="priceInCents"
                        type="number"
                        value={priceInCents}
                        onChange={(e) => setPriceInCents(e.target.value)}
                        className="create-product-input"
                    />

                    <label htmlFor="description" className="create-product-label">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="create-product-input"
                    />

                    <label htmlFor="category" className="create-product-label">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="create-product-select"
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

                    <label htmlFor="img" className="create-product-label">
                        Upload Image
                    </label>
                    <input
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="create-product-file"
                        required
                    />

                    {imgPreview && (
                        <div className="create-product-img-preview">
                            <img src={imgPreview} alt="Preview" />
                        </div>
                    )}

                    <button onClick={handleSaveProduct} className="create-product-save-button">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
