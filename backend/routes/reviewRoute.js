import express from 'express';
import Review from '../models/reviewModel.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit a review (logged-in users only)
router.post('/', auth, async (req, res) => {
    const { productName, reviewText, starRating } = req.body;
    const userId = req.user.id;

    if (!productName || !reviewText || !starRating) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (isNaN(starRating) || starRating < 1 || starRating > 5) {
        return res.status(400).json({ message: 'Star rating must be between 1 and 5' });
    }

    try {
        const newReview = new Review({ productName, reviewText, starRating, user: userId });
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
        const reviews = await Review.find().populate({
            path: 'user',
            select: 'email'  
        }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
});


// Delete a review (admin only & the creator)
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const review = await Review.findById(id).populate('user');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (req.user.role !== 'admin' && review.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Only the author of this review can delete it.' });
        }

        await Review.findByIdAndDelete(id); 
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review:', error); 
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
});

export default router;
