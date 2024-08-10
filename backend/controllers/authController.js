import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
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

// Generate OTP and send it to the user's email
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'No user found with that email' });
        }

        // Generate OTP and expiration time
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiration = Date.now() + 2 * 60 * 1000; // 2 minutes from now

        // Save OTP and expiration time to the user's document
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiration = otpExpiration;
        await user.save();

        // Send the OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. This OTP is valid for 2 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error in forgot-password route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'No user found with that email' });
        }

        if (user.resetPasswordOtp !== otp || Date.now() > user.resetPasswordOtpExpiration) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        // OTP is valid
        res.status(200).json({ msg: 'OTP is valid' });
    } catch (error) {
        console.error('Error in verify-otp route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'No user found with that email' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiration = undefined;
        await user.save();

        res.status(200).json({ msg: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in reset-password route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});


export { router as authRouter };