import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { Product } from "../models/productModel.js";

const router = express.Router();

// Add a review
router.post("/:productId/reviews", auth, async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const newReview = {
            user: req.user.id,
            rating,
            comment,
        };

        product.reviews.push(newReview);
        await product.save();

        const populatedReview = await Product.findById(productId).populate('reviews.user', 'email');
        res.status(201).json(populatedReview.reviews[populatedReview.reviews.length - 1]);
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a review
router.delete("/:productId/reviews/:reviewId", auth, async (req, res) => {
    const { productId, reviewId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const review = product.reviews.find(
            (r) => r._id.toString() === reviewId
        );
        if (!review) {
            return res.status(404).json({ msg: "Review not found" });
        }

        if (
            req.user.role === "admin" ||
            review.user.toString() === req.user.id
        ) {
            product.reviews = product.reviews.filter(
                (r) => r._id.toString() !== reviewId
            );
            await product.save();
            res.status(200).json({ msg: "Review deleted" });
        } else {
            res.status(403).json({
                msg: "Not authorized to delete this review",
            });
        }
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

export default router;
