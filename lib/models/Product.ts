    // lib/models/Product.ts
// lib/models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String }, // <--- MUST look exactly like this
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  image: { type: String, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  badge: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);