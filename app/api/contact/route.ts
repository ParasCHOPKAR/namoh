// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // 1. Configure the email sender (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sent from your server
      to: 'admin.namohhoreca@gmail.com', // Sent TO the admin
      replyTo: email, // If you hit 'Reply' in Gmail, it replies to the customer
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #0f1b2e; max-w: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #c69c4e; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap; color: #374151;">${message}</p>
          </div>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}