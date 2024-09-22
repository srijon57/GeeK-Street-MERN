import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { config } from "dotenv";
import { auth } from '../middleware/authMiddleware.js';
config();

const router = express.Router();

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
};

//ROUTE FOR REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validatePassword(password)) {
            return res
                .status(400)
                .json({
                    msg: "Password must be at least 6 characters long including alphabets and numbers.",
                });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiration = Date.now() + 12 * 60 * 60 * 1000; // 12 hours from now

        const newUser = new User({
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiration,
        });

        const savedUser = await newUser.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Please verify your email by clicking on the following link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            msg: "User registered successfully. Please check your email for verification.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//ROUTE FOR VERIFY EMAIL
router.get("/verify-email", async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ msg: "Email verified successfully" });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

//ROUTE FOR LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ msg: "Email not verified" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
            // Access Token
            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 } // 1 hour
            );
            // Refresh Token
            const refreshToken = jwt.sign(
                payload,
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' } // 7 days
            );

            res.json({
                accessToken, // access token
                refreshToken, // refresh token
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            return res.status(400).json({ msg: "Wrong Password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//ROUTE FOR REFRESH TOKEN
router.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ msg: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const payload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 } // 1 hour
        );

        res.json({ accessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(400).json({ msg: "Invalid refresh token" });
    }
});

// Generate OTP and send it to the user's email
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No user found with that email" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiration = Date.now() + 2 * 60 * 1000; // 2 minutes from now

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiration = otpExpiration;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. This OTP is valid for 2 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: "OTP sent to your email" });
    } catch (error) {
        console.error("Error in forgot-password route:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No user found with that email" });
        }

        if (
            user.resetPasswordOtp !== otp ||
            Date.now() > user.resetPasswordOtpExpiration
        ) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }

        // OTP is valid
        res.status(200).json({ msg: "OTP is valid" });
    } catch (error) {
        console.error("Error in verify-otp route:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Reset password
router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No user found with that email" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiration = undefined;
        await user.save();

        res.status(200).json({ msg: "Password reset successfully" });
    } catch (error) {
        console.error("Error in reset-password route:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Google OAuth routes
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        const payload = {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
        };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 } // 1 hour
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // 7 days
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/login?token=${accessToken}&refreshToken=${refreshToken}`
        );
    }
);

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
        const payload = {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
        };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 } // 1 hour
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // 7 days
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/login?token=${accessToken}&refreshToken=${refreshToken}`
        );
    }
);


// Get user info
router.get('/user-info', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
// Route to get user order history
router.get('/order-history', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ orderHistory: user.orderHistory });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
export { router as authRouter };
