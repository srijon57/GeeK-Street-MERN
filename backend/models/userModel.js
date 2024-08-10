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
});

export default mongoose.model('User', userSchema);
