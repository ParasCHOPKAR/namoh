"use client";

import React from "react";
// Image import removed since we are using video now
import { ShieldCheck, PackageSearch, Gem, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full flex flex-col bg-zinc-50">
      
      {/* --- HERO VIDEO (CLEAN) --- */}
      <div className="relative w-full h-[70vh] min-h-[550px] overflow-hidden bg-zinc-900">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          {/* REPLACE WITH YOUR ACTUAL VIDEO FILE NAME IN THE PUBLIC FOLDER */}
          <source src="/hero-video-02.mp4" />
        </video>

        {/* Optional: Add a subtle dark overlay if you want to put text over it later */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}

      </div>

      {/* --- BOTTOM TRUST BADGE BAR --- */}
      <div className="w-full bg-white border-y border-zinc-200 py-6 md:py-8 z-20">
        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          
          <div className="flex items-center gap-4 px-4 lg:justify-center">
            <div className="text-[#c69c4e]"><PackageSearch size={36} strokeWidth={1.5} /></div>
            <div>
              <h4 className="text-[#0f1b2e] font-bold text-sm uppercase tracking-wide">Wide Range of Products</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Everything for HORECA under one roof.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 lg:justify-center">
            <div className="text-[#c69c4e]"><Gem size={36} strokeWidth={1.5} /></div>
            <div>
              <h4 className="text-[#0f1b2e] font-bold text-sm uppercase tracking-wide">Premium Quality</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Carefully selected for professionals.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 lg:justify-center">
            <div className="text-[#c69c4e]"><ShieldCheck size={36} strokeWidth={1.5} /></div>
            <div>
              <h4 className="text-[#0f1b2e] font-bold text-sm uppercase tracking-wide">Competitive Pricing</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Best value for your business.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 lg:justify-center">
            <div className="text-[#c69c4e]"><Truck size={36} strokeWidth={1.5} /></div>
            <div>
              <h4 className="text-[#0f1b2e] font-bold text-sm uppercase tracking-wide">Fast & Reliable Delivery</h4>
              <p className="text-zinc-500 text-xs mt-0.5">On-time, every time.</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}