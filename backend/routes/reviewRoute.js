import express from 'express';
import Review from '../models/reviewModel.js';

const router = express.Router();

// Submit a review
router.post('/submit', async (req, res) => {
    const { productName, reviewText, starRating } = req.body;

    if (!productName || !reviewText || !starRating) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (isNaN(starRating) || starRating < 1 || starRating > 5) {
        return res.status(400).json({ message: 'Star rating must be between 1 and 5' });
    }

    try {
        const newReview = new Review({ productName, reviewText, starRating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error during review submission:', error);
        res.status(500).json({ message: 'Failed to submit review', error: error.message });
    }
});



// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
});

export default router;
