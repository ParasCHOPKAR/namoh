"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CheckoutButton({ totalAmount, customerDetails }: { totalAmount: number, customerDetails: any }) {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Create Order on your backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await res.json();

      if (!data.success) throw new Error("Could not create Razorpay order");

      // 2. Setup Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Namoh Crockery Mart",
        description: "Premium HORECA Solutions",
        order_id: data.order.id,
        handler: async function (response: any) {
          // 3. THIS RUNS AFTER SUCCESSFUL PAYMENT - Send to Verify & Save Route
          const verifyRes = await fetch("/api/order/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                customerDetails: customerDetails,
                items: cart.map(item => ({
                  productId: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  // We map brand to category here based on your cart setup, 
                  // or ensure your CartContext stores the actual category.
                  category: item.brand 
                })),
                pricing: {
                  subTotal: totalAmount / 1.18, // Reverse calculating GST for example
                  tax: totalAmount - (totalAmount / 1.18),
                  shipping: totalAmount > 5000 ? 0 : 250,
                  total: totalAmount
                }
              }
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            router.push(`/order-success?payment_id=${response.razorpay_payment_id}`);
          } else {
            alert("Payment verified failed. Please contact support.");
          }
        },
        theme: { color: "#0f1b2e" },
      };

      // @ts-ignore - Razorpay is loaded via script tag in layout.tsx
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full bg-[#c69c4e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#b0883d] transition-colors flex items-center justify-center gap-2"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Pay Now"}
    </button>
  );
}