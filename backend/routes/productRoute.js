import express from "express";
import { Product } from "../models/productModel.js";
import { auth } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from 'cloudinary';
const router = express.Router();

// CREATE NEW PRODUCT ROUTE
router.post('/', auth, async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.image ||
            !request.body.quantity ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Required fields are missing'
            });
        }

        const newProduct = {
            name: request.body.name,
            priceInCents: request.body.priceInCents,
            description: request.body.description,
            image: request.body.image,
            quantity: request.body.quantity,
            category: request.body.category
        };

        const product = await Product.create(newProduct);

        return response.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET ALL PRODUCTS ROUTE
router.get('/', async (request, response) => {
    try {
        const products = await Product.find({}).populate('reviews.user', 'email');

        return response.status(200).json({
            data: products
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET PRODUCT ROUTE
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const product = await Product.findById(id).populate('reviews.user', 'email');

        return response.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// DELETE PRODUCT ROUTE
router.delete('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;

        // Find the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }

        // Extract the public ID from the image URL
        const imageUrl = product.image;
        const publicId = imageUrl.split('/').pop().split('.')[0];

        // Delete the product from MongoDB
        const result = await Product.findByIdAndDelete(id);

        if (result) {
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(`images/${publicId}`);

            response.status(200).json({ message: 'Product and image successfully deleted', deletedItem: result });
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// UPDATE PRODUCT ROUTE
router.put('/:id', auth, async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.category ||
            !request.body.quantity
        ) {
            return response.status(400).send({
                message: 'Required fields are missing'
            });
        }

        const { id } = request.params;

        const result = await Product.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Product not found' });
        }

        return response.status(200).send({ message: 'Product updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// UPDATE PRODUCT QUANTITY ROUTE
router.put('/update-quantity/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const { quantity } = request.body;

        const product = await Product.findById(id);

        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }

        product.quantity = quantity;
        await product.save();

        return response.status(200).json({ message: 'Product quantity updated', product });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
