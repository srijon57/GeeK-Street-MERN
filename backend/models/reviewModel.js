import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    reviewText: { type: String, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
