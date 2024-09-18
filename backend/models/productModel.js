import mongoose from "mongoose";

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
});

export const Product = mongoose.model("Product", productSchema);
