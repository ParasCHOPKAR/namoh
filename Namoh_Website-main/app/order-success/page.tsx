"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart(); // 👇 Added clearCart here

  useEffect(() => {
    // 1. Clear the cart safely now that we are off the checkout page
    clearCart();

    // 2. Redirect to the Orders page after 4 seconds
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 4000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it only runs once

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fa] px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-zinc-200 text-center max-w-md animate-in zoom-in-95 duration-500">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-70"></div>
          <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-[#0f1b2e] mb-2 flex items-center justify-center gap-2">
          Payment Successful <PartyPopper className="text-[#c69c4e]" size={28} />
        </h1>
        <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
          Thank you for your purchase! Your order has been placed and is currently being processed.
        </p>
        <div className="flex items-center justify-center gap-3 text-sm font-bold text-[#c69c4e] uppercase tracking-wider bg-[#c69c4e]/10 py-3 px-6 rounded-full inline-flex">
          <Loader2 size={18} className="animate-spin" /> Redirecting to your orders...
        </div>
      </div>
    </div>
  );
} 