import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    reviewText: { type: String, required: true },
    starRating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
