import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  await connectDB();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // Find or Create User
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name: "New User", otp, otpExpiry });
  else await User.updateOne({ email }, { otp, otpExpiry });

  // Setup Email (Use your Gmail or Resend)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: '"Namoh Crockery" <noreply@namoh.com>',
    to: email,
    subject: "Your Login OTP",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });

  return NextResponse.json({ message: "OTP sent!" });
}