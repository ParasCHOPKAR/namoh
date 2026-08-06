import React from "react";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";

// 👇 THIS PREVENTS VERCEL FROM CACHING A 404
export const dynamic = "force-dynamic";

// We use 'any' here so it works flawlessly across all Next.js versions
export default async function InvoicePage({ params }: any) {
  try {
    await connectDB();

    // 👇 THE BULLETPROOF FIX: 
    // This safely waits for the params (Next.js 15) and automatically grabs 
    // the ID no matter what you named the bracketed folder!
    const resolvedParams = await params;
    const orderId = resolvedParams?.id || resolvedParams?.orderId || Object.values(resolvedParams)[0] as string;

    const order = await Order.findById(orderId);

    if (!order) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-200 text-center">
            <h1 className="text-xl font-bold text-red-600 mb-2">Invoice Not Found</h1>
            <p className="text-zinc-500">Could not locate order ID: <strong>{orderId || "UNKNOWN"}</strong></p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-zinc-100 p-8 print:p-0 print:bg-white flex justify-center">
        
        {/* Auto-print script */}
        <script dangerouslySetInnerHTML={{ __html: `window.onload = function() { window.print(); }` }} />

        <div className="bg-white w-full max-w-3xl p-10 md:p-16 shadow-lg print:shadow-none">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-200 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-black text-[#0f1b2e] tracking-tighter">TAX INVOICE</h1>
              <p className="text-zinc-500 font-medium mt-1">Namoh Horeca Solutions</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-zinc-800">Order ID:</p>
              <p className="text-sm text-zinc-500 font-mono mb-2">{order.razorpayOrderId || order._id}</p>
              <p className="text-sm font-bold text-zinc-800">Date:</p>
              <p className="text-sm text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Billed To / Shipped To</p>
              <p className="font-bold text-[#0f1b2e]">{order.customerDetails?.fullName}</p>
              <p className="text-sm text-zinc-600 mt-1">{order.customerDetails?.streetAddress}</p>
              <p className="text-sm text-zinc-600">{order.customerDetails?.city}, {order.customerDetails?.state} - {order.customerDetails?.pinCode}</p>
              <p className="text-sm text-zinc-600 mt-2">Phone: {order.customerDetails?.phone}</p>
              <p className="text-sm text-zinc-600">Email: {order.userEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Sold By</p>
              <p className="font-bold text-[#0f1b2e]">Namoh Horeca Solutions</p>
              <p className="text-sm text-zinc-600 mt-1">Sr No.429, Siddhi Height, Guruwar Peth, Krishna Hatti Chowk</p>
              <p className="text-sm text-zinc-600">Pune-411042</p>
              <p className="text-sm text-zinc-600 mt-2">GSTIN: 27AABCU9603R1ZM</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-zinc-50 border-y border-zinc-200">
                <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase">Item Description</th>
                <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-center">Qty</th>
                <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-right">Unit Price</th>
                <th className="py-3 px-4 text-xs font-bold text-zinc-600 uppercase text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {order.items.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-4 px-4 text-sm font-bold text-[#0f1b2e]">{item.name}</td>
                  <td className="py-4 px-4 text-sm text-zinc-600 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-zinc-600 text-right">₹{item.price.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm font-bold text-[#0f1b2e] text-right">₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end border-t border-zinc-200 pt-6">
            <div className="w-64 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium">₹{order.pricing?.subTotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>GST (18%)</span>
                <span className="font-medium">₹{order.pricing?.tax?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-3 text-lg font-black text-[#0f1b2e]">
                <span>Grand Total</span>
                <span>₹{order.pricing?.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-zinc-200 text-center text-xs text-zinc-400">
            <p>This is a computer-generated invoice and does not require a physical signature.</p>
            <p className="mt-1">Thank you for shopping with Namoh Horeca Solutions!</p>
          </div>

        </div>
      </div>
    );
  } catch (error: any) {
    // Failsafe error boundary
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-200 text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">Server Error</h1>
          <p className="text-zinc-500">{error.message}</p>
        </div>
      </div>
    );
  }
}