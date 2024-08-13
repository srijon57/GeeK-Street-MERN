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
    }
});

export default mongoose.model('User', userSchema);
