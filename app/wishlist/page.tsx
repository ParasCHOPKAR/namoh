"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, ArrowRight } from "lucide-react";

// Mock Data for UI demonstration
const INITIAL_WISHLIST = [
  {
    id: "w1",
    name: "Executive Chef's Knife - 8\" Damascus",
    brand: "Global",
    price: 6800,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=600&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "w2",
    name: "Tri-Ply Stainless Steel Frying Pan",
    brand: "Meyer",
    price: 2450,
    image: "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "w3",
    name: "Commercial Stand Mixer - 10L",
    brand: "KitchenAid PRO",
    price: 45000,
    image: "https://images.unsplash.com/photo-1593077755519-7bf55047b748?q=80&w=600&auto=format&fit=crop",
    inStock: false,
  }
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      
      {/* HEADER */}
      <div className="bg-[#0f1b2e] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight">My Wishlist</h1>
            <p className="text-zinc-400 font-medium">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          <Heart size={48} className="text-[#c69c4e] opacity-20" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mt-10">
        {wishlist.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-[2rem] p-16 text-center border border-zinc-100 shadow-sm flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6 text-zinc-300">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#0f1b2e] mb-3">Your wishlist is empty</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">Looks like you haven't saved any items yet. Start exploring our premium HORECA catalog to find what you need.</p>
            <Link href="/category/kitchenware" className="bg-[#c69c4e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#b0883d] transition-all hover:shadow-lg flex items-center gap-2">
              Explore Catalog <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* FILLED STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-[#c69c4e]/30 transition-all duration-300 group flex flex-col animate-in fade-in slide-in-from-bottom-4">
                
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-100 mb-4">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                      <span className="bg-[#0f1b2e] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">Out of Stock</span>
                    </div>
                  )}
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors z-20"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1">
                  <p className="text-xs font-bold text-[#c69c4e] tracking-widest uppercase mb-1">{item.brand}</p>
                  <Link href={`/product/${item.id}`} className="text-[#0f1b2e] font-bold text-[15px] leading-tight hover:underline mb-4 line-clamp-2">
                    {item.name}
                  </Link>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-extrabold text-[#0f1b2e]">₹{item.price.toLocaleString()}</span>
                    <button 
                      disabled={!item.inStock}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all ${
                        item.inStock 
                        ? "bg-zinc-100 text-[#0f1b2e] hover:bg-[#0f1b2e] hover:text-white" 
                        : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={16} /> <span className="text-sm">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}