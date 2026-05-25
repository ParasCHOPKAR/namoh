// app/api/products/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

// THIS IS CRUCIAL: It forces Next.js to fetch fresh data every single time
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    await connectDB();
    
    // Fetch ALL products from the database, newest first
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}