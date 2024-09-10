import { config } from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productRoute from "./routes/productRoute.js";
import { authRouter } from "./controllers/authController.js";
import reviewRoute from './routes/reviewRoute.js';
import { salesRouter } from './routes/salesRoute.js';
import nodemailer from "nodemailer";
import passport from 'passport';
import session from 'express-session';
import './config/passport.js'; 

config();
const app = express();

app.use(cors());
app.use(express.json()); 

// Configure express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //for http if https it will be true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
    .connect(process.env.mongoDb)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

const parser = multer({ storage: storage });

// Route for uploading files to Cloudinary
app.post('/upload-image', parser.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        if (!req.file.path) {
            throw new Error('File uploaded, but no path available');
        }

        res.json({ secure_url: req.file.path });
    } catch (error) {
        console.error('Error during file upload: ', error);
        res.status(500).send('Internal server error');
    }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Ignore SSL certificate errors
    },
});

// Route for sending emails
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email', error: error.message });
    }
});

// API routes
app.use('/product', productRoute);
app.use('/auth', authRouter);
app.use('/reviews', reviewRoute);
app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
