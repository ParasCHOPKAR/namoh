// app/api/order/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order"; // Make sure Order.ts has a capital O
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("Razorpay secret missing");

    // Cryptographic verification
    const rawString = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto.createHmac("sha256", secret).update(rawString).digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
    }

    // Save the authentic order to the database
    await connectDB();
    const newOrder = await Order.create({
      userEmail: session.user.email,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      orderStatus: "Paid",
      customerDetails: orderData.customerDetails,
      items: orderData.items, 
      pricing: orderData.pricing
    });

    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 200 });

  } catch (error: any) {
    console.error("Order verification error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}