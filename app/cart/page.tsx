"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import real cart data

export default function CartPage() {
  // Grab the real cart data and functions from our Context!
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculations based on REAL data
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18; 
  const total = subtotal + gst;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f8f9fa] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm border border-zinc-100 mb-6 text-zinc-300">
          <ShoppingCart size={50} />
        </div>
        <h2 className="text-3xl font-extrabold text-[#0f1b2e] mb-4">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto text-center font-medium">
          Ready to equip your kitchen? Browse our premium catalog and add some items to your cart.
        </p>
        <Link href="/category" className="bg-[#0f1b2e] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#1a2b47] transition-all hover:shadow-xl hover:-translate-y-1">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f1b2e] mb-10 tracking-tight">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT: REAL CART ITEMS */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 sm:p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
                
                <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-zinc-50 shrink-0 border border-zinc-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 flex flex-col text-center sm:text-left w-full">
                  <p className="text-[11px] font-bold text-[#c69c4e] tracking-widest uppercase mb-1">{item.brand}</p>
                  <Link href={`/product/${item.id}`} className="text-[#0f1b2e] font-bold text-lg leading-tight hover:underline mb-2 line-clamp-2">
                    {item.name}
                  </Link>
                  <p className="text-zinc-500 font-medium text-sm mb-4">Price: ₹{item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-[#0f1b2e] hover:bg-zinc-200 rounded-lg transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-[#0f1b2e]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-[#0f1b2e] hover:bg-zinc-200 rounded-lg transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="font-extrabold text-[#0f1b2e] text-lg">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors p-2" title="Remove item">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:w-1/3">
            <div className="bg-[#0f1b2e] text-white rounded-[2rem] p-8 lg:p-10 sticky top-24 shadow-2xl shadow-[#0f1b2e]/20">
              <h2 className="text-2xl font-bold mb-8 tracking-tight border-b border-white/10 pb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm font-medium text-zinc-300 mb-8">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-white font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="text-white font-bold">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#c69c4e] font-bold">Calculated at Checkout</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8 flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-extrabold text-[#c69c4e]">₹{total.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="w-full bg-[#c69c4e] hover:bg-[#b0883d] text-white py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 text-lg mb-6">
                Proceed to Checkout <ArrowRight size={20} />
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400">
                <ShieldCheck size={16} className="text-green-400" />
                Secure, SSL-encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}