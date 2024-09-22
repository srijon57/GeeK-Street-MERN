import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    resetPasswordOtp: String,
    resetPasswordOtpExpiration: Date,
    verificationToken: String,
    verificationTokenExpiration: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    orderHistory: [
        {
            productName: String,
            totalPrice: Number,
            customerName: String,
            date: Date,
            status: {
                type: String,
                enum: ["Pending", "Canceled", "Delivered"],
                default: "Pending"
            }
        }
    ]
});

export default mongoose.model('User', userSchema);
