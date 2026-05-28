import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();

    // Razorpay expects the amount in paise (smallest unit). 
    // Multiply ₹ by 100.
    const options = {
      amount: amount * 100, 
      currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ success: true, order }, { status: 200 });
    
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ success: false, error: "Payment initiation failed" }, { status: 500 });
  }
}