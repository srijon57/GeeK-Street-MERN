import express from 'express';
import { registerUser, loginUser,getUser } from '../Controllers/userController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js'; 

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUser);
export default router;
