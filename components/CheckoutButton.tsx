"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ 
  totalAmount, 
  customerDetails 
}: { 
  totalAmount: number, 
  customerDetails?: any 
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Get Order ID
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await res.json();

      if (!data.success) {
        alert("Server error. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Configure Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.order.amount, 
        currency: data.order.currency,
        name: "Namoh Crockery Mart",
        description: "Premium HORECA Supplies",
        order_id: data.order.id, 
        
        // 3. Payment Success Handler
        handler: async function (response: any) {
          // In production, call your /api/checkout/verify endpoint here first!
          
          // Redirect to a success page
          router.push(`/order-success?payment_id=${response.razorpay_payment_id}`);
        },
        
        prefill: {
          // Added ? to prevent crashes if customerDetails is empty
          name: customerDetails?.fullName || session?.user?.name || "Guest Customer",
          email: session?.user?.email || "",
          contact: customerDetails?.phone || ""
        },
        theme: {
          color: "#0f1b2e", 
        },
      };

      // 4. Open popup
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong opening the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full bg-[#c69c4e] text-white font-extrabold py-5 rounded-xl hover:bg-[#b0883d] transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {loading ? "Connecting securely..." : `Pay ₹${(totalAmount || 0).toLocaleString()} Securely`}
    </button>
  );
}