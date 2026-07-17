"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, CheckCircle2, Loader2, ArrowRight, Receipt, XCircle, Download, Printer } from "lucide-react";

type OrderItem = { _id: string; productId: string; name: string; price: number; quantity: number; image: string; };
type Order = { _id: string; razorpayOrderId: string; orderStatus: string; createdAt: string; items: OrderItem[]; pricing: { total: number; }; };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
        else setError(data.message || "Failed to load orders.");
      } catch (err: any) {
        setError(`Network Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 👇 NEW: Handle Order Cancellation
  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    // Optimistic UI Update (makes it feel instant)
    setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: "Cancelled" } : o));

    try {
      const res = await fetch("/api/orders/cancel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      });
      const data = await res.json();
      
      if (!data.success) {
        alert(data.message);
        window.location.reload(); // Revert UI if API fails
      }
    } catch (error) {
      alert("Failed to cancel order.");
      window.location.reload();
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
      case "Delivered":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200"><CheckCircle2 size={14} /> {status}</span>;
      case "Processing":
      case "Shipped":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200"><Clock size={14} /> {status}</span>;
      case "Cancelled":
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider border border-red-200"><XCircle size={14} /> {status}</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold uppercase tracking-wider border border-zinc-200"><Clock size={14} /> {status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 lg:py-16">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f1b2e] tracking-tight mb-2">Order History</h1>
          <p className="text-zinc-500 font-medium">View and track your previous purchases.</p>
        </div>

        {loading && (
          <div className="min-h-[40vh] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-zinc-200 shadow-sm">
            <Loader2 size={40} className="animate-spin text-[#c69c4e] mb-4" />
          </div>
        )}

        {!loading && error && <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 font-medium text-center">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-zinc-100 shadow-sm flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6 text-zinc-300"><Package size={40} /></div>
            <h2 className="text-2xl font-bold text-[#0f1b2e] mb-3">No orders found</h2>
            <Link href="/category" className="bg-[#0f1b2e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a2b47] transition-all flex items-center gap-2">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                
                {/* Order Header */}
                <div className="bg-zinc-50/50 p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">
                      <Receipt size={14} className="text-[#c69c4e]" /> Order Placed
                    </div>
                    <div className="text-[#0f1b2e] font-bold">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-zinc-400 text-xs mt-1 font-mono">ID: {order.razorpayOrderId || order._id}</div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2">
                    {renderStatusBadge(order.orderStatus)}
                    <div className="text-xl font-extrabold text-[#c69c4e]">₹{order.pricing?.total?.toLocaleString()}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="relative w-20 h-20 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.productId}`} className="text-[#0f1b2e] font-bold text-[15px] hover:text-[#c69c4e] transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <div className="text-zinc-500 text-sm mt-1 font-medium">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</div>
                        </div>
                        <div className="font-bold text-[#0f1b2e] hidden sm:block">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 👇 NEW: Action Buttons Footer */}
                <div className="bg-zinc-50/50 p-4 border-t border-zinc-100 flex flex-wrap items-center justify-end gap-3">
                  <Link 
                    href={`/invoice/${order._id}`} 
                    target="_blank" 
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-[#0f1b2e] rounded-xl text-sm font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-colors shadow-sm"
                  >
                    <Download size={16} className="text-[#c69c4e]" /> Download Invoice
                  </Link>

                  {/* ONLY show cancel button if status is Pending, Paid, or Processing */}
                  {["Pending", "Paid", "Processing"].includes(order.orderStatus) && (
                    <button 
                      onClick={() => handleCancelOrder(order._id)} 
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={16} /> Cancel Order
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}