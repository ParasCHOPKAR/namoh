import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const dynamic = 'force-dynamic';

// =======================================================================
// GET: Fetch orders for the currently logged-in user (or all for admin)
// =======================================================================
export async function GET() { 
  console.log("==== HITTING /api/orders GET ====");
  
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Please log in to view your orders." }, { status: 401 });
    }

    let query: any = {};
    
    // @ts-ignore - bypassing strict type check for custom role
    if (session.user.role !== "admin") {
      query.userEmail = session.user.email;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders }, { status: 200 });

  } catch (error: any) {
    console.error("==== FATAL API ERROR ====", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}