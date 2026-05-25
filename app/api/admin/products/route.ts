// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function POST(req: Request) {
  try {
    console.log("Attempting to connect to database...");
    await connectDB();
    console.log("Database connected successfully.");

    const body = await req.json();
    console.log("Received data from form:", body);

    const newProduct = await Product.create(body);
    console.log("Product saved successfully:", newProduct);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    
  } catch (error: any) {
    console.error("FATAL ERROR saving product:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add product" }, 
      { status: 500 }
    );
  }
}