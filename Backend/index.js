import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import "dotenv/config";
import userRoutes from './Routes/userRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 5175;

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', userRoutes);
