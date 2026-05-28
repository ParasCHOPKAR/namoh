"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, MapPin, Truck, CreditCard, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CheckoutButton from "@/components/CheckoutButton";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Example Cart Data
  const cartItems = [
    { id: "1", name: "Premium SS GN Pan", price: 1200, quantity: 2, image: "/logo/logo-02.jpeg" },
    { id: "2", name: "Commercial Pizza Tool Set", price: 3400, quantity: 1, image: "/logo/logo-02.jpeg" }
  ];
  
  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subTotal * 0.18; // 18% GST
  const shipping = subTotal > 5000 ? 0 : 250;
  const total = subTotal + tax + shipping;

  // Form State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "Maharashtra",
    streetAddress: "",
    landmark: ""
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.streetAddress) {
      alert("Please fill in all mandatory address fields.");
      return;
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Simple Secure Header */}
      <div className="bg-white border-b border-zinc-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40">
        <button onClick={() => step === 2 ? setStep(1) : router.back()} className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] font-medium transition-colors">
          <ArrowLeft size={18} /> {step === 2 ? "Back to Address" : "Back to Cart"}
        </button>
        <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
          <ShieldCheck size={18} /> Secure SSL Checkout
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-8 lg:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Main Form Area */}
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 font-bold ${step >= 1 ? "text-[#0f1b2e]" : "text-zinc-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#0f1b2e] text-white" : "bg-zinc-200"}`}>1</div>
              Delivery
            </div>
            <div className="h-px bg-zinc-300 w-12"></div>
            <div className={`flex items-center gap-2 font-bold ${step >= 2 ? "text-[#0f1b2e]" : "text-zinc-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#0f1b2e] text-white" : "bg-zinc-200"}`}>2</div>
              Payment
            </div>
          </div>

          {step === 1 ? (
            // --- STEP 1: ADDRESS FORM ---
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-zinc-200 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-extrabold text-[#0f1b2e] mb-6 flex items-center gap-3">
                <MapPin className="text-[#c69c4e]" /> Delivery Address
              </h2>
              
              <form onSubmit={proceedToPayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Full Name *</label>
                    <input required type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={address.phone} onChange={handleAddressChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">PIN Code *</label>
                    <input required type="text" name="pinCode" value={address.pinCode} onChange={handleAddressChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">City *</label>
                    <input required type="text" name="city" value={address.city} onChange={handleAddressChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">State *</label>
                    <select name="state" value={address.state} onChange={handleAddressChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors">
                      <option>Maharashtra</option>
                      <option>Gujarat</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Complete Street Address *</label>
                  <input required type="text" name="streetAddress" value={address.streetAddress} onChange={handleAddressChange} placeholder="House/Flat No., Building Name, Street" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e] transition-colors" />
                </div>

                <div className="pt-6 border-t border-zinc-100 flex justify-end">
                  <button type="submit" className="bg-[#0f1b2e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a2b47] transition-colors flex items-center gap-2">
                    Proceed to Payment <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // --- STEP 2: PAYMENT SECTION ---
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-zinc-200 animate-in fade-in slide-in-from-right-8">
              <h2 className="text-2xl font-extrabold text-[#0f1b2e] mb-2 flex items-center gap-3">
                <CreditCard className="text-[#c69c4e]" /> Complete Payment
              </h2>
              <p className="text-zinc-500 mb-8">You will be redirected to the secure Razorpay gateway.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
                <Truck className="text-blue-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-[#0f1b2e] text-sm">Delivery to:</p>
                  <p className="text-zinc-600 text-sm mt-1">{address.fullName}, {address.phone}</p>
                  <p className="text-zinc-600 text-sm">{address.streetAddress}, {address.city}, {address.state} - {address.pinCode}</p>
                </div>
              </div>

              {/* THIS IS WHERE YOUR COMPONENT IS USED */}
              <CheckoutButton totalAmount={total} customerDetails={address} />
              
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-zinc-200 sticky top-24">
            <h3 className="font-extrabold text-[#0f1b2e] text-lg mb-6 pb-4 border-b border-zinc-100">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-lg overflow-hidden shrink-0 border border-zinc-100 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0f1b2e] line-clamp-2">{item.name}</p>
                    <p className="text-xs text-zinc-500 mt-1">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="text-sm font-bold text-[#0f1b2e]">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-100 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium">₹{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>GST (18%)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200 flex justify-between items-center">
              <span className="text-lg font-extrabold text-[#0f1b2e]">Total</span>
              <span className="text-2xl font-extrabold text-[#c69c4e]">₹{total.toLocaleString()}</span>
            </div>
            
            {step === 1 && (
              <p className="text-xs text-center text-zinc-400 mt-6 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> Payments are 100% secure
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}