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

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, _id, ...updateData } = body;
    const productId = id || _id;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required for update" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
  } catch (error: any) {
    console.error("FATAL ERROR updating product:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id, _id } = await req.json();
    const productId = id || _id;

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("FATAL ERROR deleting product:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}