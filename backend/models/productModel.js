import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  priceInCents: { type: Number, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Phones", "Laptops", "Components", "Gadgets"],
  },
  reviews: [reviewSchema]
});

export const Product = mongoose.model("Product", productSchema);
