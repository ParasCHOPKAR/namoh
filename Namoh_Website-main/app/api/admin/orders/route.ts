import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; 
import Order from "@/lib/models/Order"; 

export async function GET() {
  try {
    await connectDB();
    // Fetch all orders, newest first
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json({ success: false, message: "Error fetching orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { orderId, orderStatus } = await req.json(); 
    
    // Update the specific order's status in MongoDB
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { orderStatus }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ success: false, message: "Error updating order" }, { status: 500 });
  }
}