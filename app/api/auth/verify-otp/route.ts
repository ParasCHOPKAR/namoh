// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    await connectDB();

    // Check if the OTP is valid
    const userWithOTP = await User.findOne({ email, otp, otpExpiry: { $gt: new Date() } });

    if (!userWithOTP) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // Determine Role (Make the very first user an admin)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    // Update the user: clear the OTP and set their role if they are new
    await User.findOneAndUpdate(
      { email },
      { 
        $unset: { otp: "", otpExpiry: "" },
        $setOnInsert: { name: email.split('@')[0], role: role } // Give a basic name
      },
      { upsert: true, new: true } // 'upsert' creates the user if they don't exist
    );

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}