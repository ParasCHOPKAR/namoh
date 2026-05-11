"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Truck, ShieldCheck, Clock, CreditCard, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_FEATURES = [
  {
    icon: Truck,
    title: "Nationwide Shipping",
    desc: "Fast, secure delivery across India."
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Commercial-grade durability guaranteed."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Dedicated assistance for your orders."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    desc: "Encrypted transactions for peace of mind."
  }
];

export default function BrandExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Trust Features Animation
    gsap.from(".trust-item", {
      scrollTrigger: {
        trigger: ".trust-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    // 2. Brand Story Split-Reveal Animation
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    storyTl.fromTo(".story-image-mask", 
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1.2, ease: "power4.inOut" }
    )
    .fromTo(".story-image", 
      { scale: 1.2 },
      { scale: 1, duration: 1.2, ease: "power3.out" }, 
      "-=1.2"
    )
    .from(".story-content > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.6");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      
      {/* --- 1. TRUST INDICATORS (Top Banner) --- */}
      <div className="bg-[#0f1b2e] text-white py-16 relative">
        {/* Subtle top gold border for separation */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c69c4e] to-transparent opacity-50" />
        
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="trust-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {TRUST_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="trust-item group flex flex-col items-center text-center px-4 pt-8 sm:pt-0 first:pt-0">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#c69c4e] group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#c69c4e] group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(198,156,78,0)] group-hover:shadow-[0_0_20px_rgba(198,156,78,0.4)]">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-2 text-white group-hover:text-[#c69c4e] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed max-w-[250px] font-light">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- 2. BRAND STORY SPLIT LAYOUT --- */}
      <div ref={storyRef} className="py-24 lg:py-32 max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Cinematic Image Reveal */}
          <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-2xl mx-auto lg:mx-0">
            <div className="story-image-mask absolute inset-0 overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop" 
                alt="Culinary Excellence" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="story-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b2e]/30 to-transparent" />
            </div>
            
            {/* Floating Detail Badge - Now in Navy & Gold */}
            <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white p-4 md:p-6 rounded-full shadow-[0_20px_50px_rgba(15,27,46,0.15)] z-10 hidden sm:block">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#c69c4e] flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
                {/* Decorative inner spin ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#c69c4e]/50 animate-[spin_20s_linear_infinite]" />
                
                <span className="text-[#0f1b2e] font-serif text-3xl md:text-4xl font-bold relative z-10">10+</span>
                <span className="text-[#c69c4e] text-[9px] md:text-[10px] uppercase tracking-widest font-bold mt-1 relative z-10">Years of<br/>Excellence</span>
              </div>
            </div>
          </div>

          {/* Right: Brand Content */}
          <div className="story-content flex flex-col justify-center max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h4 className="text-[#c69c4e] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 md:mb-6 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-10 h-[1px] bg-[#c69c4e]"></span>
              The Namoh Standard
            </h4>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f1b2e] uppercase tracking-tight leading-[1.1] mb-8">
              Where <span className="text-[#c69c4e] font-serif italic font-medium lowercase tracking-normal">art</span> meets everyday function.
            </h2>
            
            <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-light mb-10">
              <p>
                Founded on the belief that every meal deserves a beautiful canvas, Namoh Crockery Mart bridges the gap between commercial-grade durability and high-end residential aesthetics.
              </p>
              <p>
                From equipping top-tier hospitality venues to curating the perfect dining room for your home, our collections are meticulously sourced to ensure they stand the test of time, both in style and strength.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link 
                href="/about" 
                className="group inline-flex items-center gap-4 bg-[#0f1b2e] text-white font-bold text-sm uppercase tracking-[0.2em] px-10 py-5 hover:bg-[#c69c4e] transition-colors duration-500 rounded-sm shadow-xl hover:shadow-[0_10px_30px_rgba(198,156,78,0.3)]"
              >
                Read Our Story
                <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300 relative">
                  <ArrowRight size={14} className="absolute -right-1 top-1/2 -translate-y-1/2" />
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}