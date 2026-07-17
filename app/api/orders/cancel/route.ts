import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();
    await connectDB();

    // Find the order, ensuring it belongs to the logged-in user
    const order = await Order.findOne({ _id: orderId, userEmail: session.user.email });
    
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Security Check: Only allow cancellation if it hasn't shipped yet
    const allowedStatuses = ["Pending", "Paid", "Processing"];
    if (!allowedStatuses.includes(order.orderStatus)) {
      return NextResponse.json({ success: false, message: "Order cannot be cancelled at this stage." }, { status: 400 });
    }

    // Update status to Cancelled
    order.orderStatus = "Cancelled";
    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Cancel Order Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}