import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
};

//ROUTE FOR REGISTER
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validatePassword(password)) {
            return res.status(400).json({ msg: 'Password must be at least 6 characters long and include numbers.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token, msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


//ROUTE FOR LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (error, token) => {
                    if (error) throw error;

                    res.json({
                        token,
                        user: { id: user._id, email: user.email, role: user.role }
                    });
                }
            );
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


export { router as authRouter };