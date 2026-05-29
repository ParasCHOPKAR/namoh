import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const dynamic = 'force-dynamic';

export async function GET() { 
  console.log("==== 1. HITTING /api/orders ====");
  
  try {
    await connectDB();
    console.log("==== 2. DB Connected ====");

    const session = await getServerSession(authOptions);
    console.log("==== 3. Session User ====", session?.user?.email || "No session");

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Please log in to view your orders." }, { status: 401 });
    }

    let query: any = {};
    
    // @ts-ignore - bypassing strict type check for custom role
    if (session.user.role !== "admin") {
      query.userEmail = session.user.email;
    }

    console.log("==== 4. Searching Orders for ====", query);
    const orders = await Order.find(query).sort({ createdAt: -1 });
    
    console.log(`==== 5. SUCCESS! Found ${orders.length} orders ====`);
    return NextResponse.json({ success: true, orders }, { status: 200 });

  } catch (error: any) {
    console.error("==== FATAL API ERROR ====", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}