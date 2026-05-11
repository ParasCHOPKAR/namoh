"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart, Eye, ShoppingCart, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- EXPANDED REALISTIC MOCK DATA ---
const TRENDING_PRODUCTS = [
  {
    id: 1,
    category: "Kitchenware",
    brand: "Culinary Pro",
    name: "Tri-Ply Stainless Steel Wok",
    price: "₹3,200",
    oldPrice: "₹4,500",
    badge: "SALE",
    badgeColor: "bg-red-500 text-white",
    img: "https://images.unsplash.com/photo-1584990347449-a6ebaa333cd3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Glassware",
    brand: "Arcoroc",
    name: "Premium Crystal Wine Glasses (Set of 6)",
    price: "₹2,800",
    oldPrice: null,
    badge: "NEW",
    badgeColor: "bg-zinc-950 text-white",
    img: "https://images.unsplash.com/photo-1574849318991-0322d99d1238?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Hotelware",
    brand: "Dinewell",
    name: "Matte Black Melamine Dinner Set",
    price: "₹5,400",
    oldPrice: null,
    badge: "BEST SELLER",
    badgeColor: "bg-[#3E5C54] text-white",
    img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Barware",
    brand: "Mixology Edge",
    name: "Professional Copper Cocktail Shaker",
    price: "₹1,850",
    oldPrice: "₹2,200",
    badge: "TRENDING",
    badgeColor: "bg-orange-500 text-white",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Kitchenware",
    brand: "Chef's Choice",
    name: "Damascus Steel Chef Knife 8\"",
    price: "₹4,100",
    oldPrice: null,
    badge: "LIMITED",
    badgeColor: "bg-zinc-800 text-white",
    img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Hotelware",
    brand: "Sanaai",
    name: "Acacia Wood Serving Platter",
    price: "₹1,450",
    oldPrice: "₹1,800",
    badge: "SALE",
    badgeColor: "bg-red-500 text-white",
    img: "https://images.unsplash.com/photo-1606850257322-ce537ff6122e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "Glassware",
    brand: "Ocean",
    name: "Highball Cocktail Glasses (Set of 4)",
    price: "₹1,200",
    oldPrice: null,
    badge: null,
    badgeColor: "",
    img: "https://images.unsplash.com/photo-1543362905-f24f2b1d7465?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Barware",
    brand: "Mixology Edge",
    name: "Crystal Ice Bucket with Tongs",
    price: "₹3,600",
    oldPrice: null,
    badge: "NEW",
    badgeColor: "bg-zinc-950 text-white",
    img: "https://images.unsplash.com/photo-1582269438759-450f242cc3d7?q=80&w=800&auto=format&fit=crop",
  }
];

const FILTERS = ["All", "Kitchenware", "Glassware", "Hotelware", "Barware"];

export default function TrendingProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter logic
  const filteredProducts = activeFilter === "All" 
    ? TRENDING_PRODUCTS 
    : TRENDING_PRODUCTS.filter(p => p.category === activeFilter);

  // --- GSAP SCROLL ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".trending-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".filter-pill", { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "-=0.4")
      .from(".product-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.2");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32 border-t border-zinc-100 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header section */}
        <div className="trending-header text-center mb-10">
          <h4 className="text-orange-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-orange-500/50"></span>
            Curated For You
            <span className="w-12 h-[1px] bg-orange-500/50"></span>
          </h4>
          <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight">
            Trending Now
          </h3>
        </div>

        {/* Dynamic Interactive Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-pill px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-zinc-950 text-white border border-zinc-950 shadow-md" 
                  : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-950 hover:text-zinc-950"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid (with simple fade-in key for React re-rendering on filter) */}
        <div key={activeFilter} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
          
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group flex flex-col cursor-pointer">
              
              {/* Image Container with Advanced Hover Actions */}
              <div className="relative aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Dynamic Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`${product.badgeColor} text-[10px] font-extrabold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-sm backdrop-blur-md bg-opacity-90`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Floating Side Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                  <button className="w-9 h-9 bg-white text-zinc-950 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg" title="Add to Wishlist">
                    <Heart size={16} strokeWidth={2} />
                  </button>
                  <button className="w-9 h-9 bg-white text-zinc-950 rounded-full flex items-center justify-center hover:bg-[#3E5C54] hover:text-white transition-colors shadow-lg delay-75" title="Quick View">
                    <Eye size={16} strokeWidth={2} />
                  </button>
                </div>

                {/* Quick Add Bottom Button */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-zinc-950 border border-transparent hover:border-zinc-950 hover:bg-zinc-950 hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2">
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Details & Pricing */}
              <div className="space-y-1.5 px-1">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                    {product.brand}
                  </p>
                </div>
                <h4 className="text-zinc-900 font-bold text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 pr-4">
                  {product.name}
                </h4>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[#3E5C54] font-extrabold text-lg">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-zinc-400 line-through text-sm font-medium">{product.oldPrice}</span>
                  )}
                </div>
              </div>

            </div>
          ))}

        </div>
        
        {/* Centered CTA Button */}
        <div className="mt-20 flex justify-center">
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-3 border border-zinc-200 bg-white text-zinc-950 font-bold text-sm uppercase tracking-[0.2em] px-10 py-4 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all duration-300 rounded-full shadow-sm hover:shadow-xl"
          >
            View Full Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}