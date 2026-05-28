"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Home, Receipt, Loader2 } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  
  // Generate a mock order ID for visual purposes
  const mockOrderId = "NCM-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-[80vh] bg-[#f8f9fa] flex items-center justify-center p-4 py-12">
      <div className="bg-white max-w-2xl w-full rounded-[2.5rem] shadow-sm border border-zinc-200 p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border-[8px] border-green-50/50">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f1b2e] mb-4 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-lg text-zinc-500 mb-10 max-w-lg mx-auto">
          Thank you for your order. We are currently processing it and will send a confirmation email shortly.
        </p>

        {/* Order Details Card */}
        <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 mb-10 border border-zinc-100 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-5 mb-5 gap-2">
            <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-wider text-sm">
              <Receipt size={18} className="text-[#c69c4e]" />
              Order Reference
            </div>
            <div className="font-extrabold text-[#0f1b2e] text-xl">{mockOrderId}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-zinc-500 font-bold uppercase tracking-wider text-sm">
              Transaction ID
            </div>
            <div className="text-sm font-mono bg-white px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 shadow-sm">
              {paymentId || "Processing..."}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/orders" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0f1b2e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a2b47] transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <Package size={18} /> View My Orders
          </Link>
          <Link 
            href="/category" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#0f1b2e] border-2 border-[#0f1b2e] px-8 py-3.5 rounded-xl font-bold hover:bg-zinc-50 transition-all hover:-translate-y-1"
          >
            <Home size={18} /> Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

// Wrapping in Suspense is required by Next.js when using useSearchParams
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fa] gap-4">
        <Loader2 size={48} className="animate-spin text-[#c69c4e]" />
        <p className="font-bold text-[#0f1b2e] uppercase tracking-widest">Verifying Payment...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}