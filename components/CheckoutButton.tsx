"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutButton({ totalAmount, customerDetails }: { totalAmount: number, customerDetails: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cart } = useCart(); // Notice we removed clearCart from here

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await res.json();

      if (!data.success) throw new Error("Could not create Razorpay order");

      const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const tax = subTotal * 0.18;
      const shipping = 0; 

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Namoh Horeca Solutions",
        description: "Premium HORECA Solutions",
        order_id: data.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/order/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                customerDetails: customerDetails,
                items: cart.map((item: any) => ({
                  productId: item.id || item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  category: item.brand || "Uncategorized"
                })),
                pricing: { subTotal, tax, shipping, total: totalAmount }
              }
            }),
          });

          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            // 👇 CRITICAL FIX: Only redirect! We will clear the cart on the next page.
            router.push(`/order-success?payment_id=${response.razorpay_payment_id}`);
          } else {
            alert("Payment verified failed. Please contact support.");
          }
        },
        theme: { color: "#0f1b2e" },
      };

      // @ts-ignore
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
      className="w-full bg-[#0f1b2e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1a2b47] transition-colors flex items-center justify-center gap-2 shadow-lg"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Proceed & Pay Now"}
    </button>
  );
}