"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  // Grab the real data from our contexts!
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

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
            <Link href="/category" className="bg-[#c69c4e] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#b0883d] transition-all hover:shadow-lg flex items-center gap-2">
              Explore Catalog <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* FILLED STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-[#c69c4e]/30 transition-all duration-300 group flex flex-col animate-in fade-in slide-in-from-bottom-4">
                
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 mb-4 border border-zinc-100">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white text-zinc-400 rounded-full flex items-center justify-center shadow-md hover:text-red-500 hover:bg-red-50 transition-colors z-20"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1">
                  <p className="text-xs font-bold text-[#c69c4e] tracking-widest uppercase mb-1">Wishlist Item</p>
                  <Link href={`/product/${item.id}`} className="text-[#0f1b2e] font-bold text-[15px] leading-tight hover:underline mb-4 line-clamp-2">
                    {item.name}
                  </Link>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-extrabold text-[#0f1b2e]">₹{item.price.toLocaleString()}</span>
                    <button 
                      onClick={() => {
                        // 1. Add to Cart
                        addToCart({
                          _id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          subCategory: "Wishlist Item"
                        });
                        // 2. Remove from wishlist once added to cart
                        removeFromWishlist(item.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all bg-zinc-100 text-[#0f1b2e] hover:bg-[#0f1b2e] hover:text-white"
                    >
                      <ShoppingCart size={16} /> <span className="text-sm">Move to Cart</span>
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