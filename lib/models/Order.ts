import mongoose, { Schema, Document, models } from "mongoose";

export interface IOrder extends Document {
  userEmail: string; // Linking to the user
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  orderStatus: "Pending" | "Paid" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  customerDetails: {
    fullName: string; phone: string; pinCode: string; city: string; state: string; streetAddress: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string; // <-- ADDED THIS FOR CATEGORY SORTING
  }>;
  pricing: { subTotal: number; tax: number; shipping: number; total: number; };
}

const OrderSchema = new Schema<IOrder>({
    userEmail: { type: String, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    orderStatus: { type: String, default: "Pending" },
    customerDetails: {
      fullName: String, phone: String, pinCode: String, city: String, state: String, streetAddress: String,
    },
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        category: String, // <-- SAVED HERE
    }],
    pricing: {
      subTotal: Number, tax: Number, shipping: Number, total: Number,
    }
  }, { timestamps: true });

export default models.Order || mongoose.model<IOrder>("Order", OrderSchema);