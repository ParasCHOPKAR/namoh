"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- Import Image
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Updated Data Array with image paths
// Next.js maps the public folder to the root path "/"
const BRANDS = [
  { name: "CAMBRO", img: "/brand-logo/1.png" },
  { name: "COFFEE GRINDER", img: "/brand-logo/2.jpg" },
  { name: "COFFEE MACHINES", img: "/brand-logo/3.jpg" },
  { name: "DIPO INDUCTION", img: "/brand-logo/4.webp" },
  { name: "ELECTROLUX", img: "/brand-logo/1.png" },
  { name: "COFFEE GRINDER", img: "/brand-logo/2.jpg" },
  { name: "COFFEE MACHINES", img: "/brand-logo/3.jpg" },
  { name: "DIPO INDUCTION", img: "/brand-logo/4.webp" },
  { name: "MOLECULAR EQUIPMENTS", img: "/brand-logo/1.png" },
  { name: "COFFEE GRINDER", img: "/brand-logo/2.jpg" },
  { name: "COFFEE MACHINES", img: "/brand-logo/3.jpg" },
  { name: "DIPO INDUCTION", img: "/brand-logo/4.webp" },
  { name: "SANTOS", img: "/brand-logo/1.png" },
  { name: "COFFEE GRINDER", img: "/brand-logo/2.jpg" },
];

export default function TopBrands() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animate Header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 2. Animate Brand Cards with a fast stagger
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05, // Fast cascade effect
          ease: "back.out(1.2)", // Slight bounce for premium feel
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 3. Animate the "View All Brands" Button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4, // Waits for the cards to start animating
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Smooth scroll handler for the arrow buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-20 relative z-20 overflow-hidden">
      
      {/* HEADER: Centered with Decorative Gold Ornament */}
      <div ref={headerRef} className="max-w-[1600px] w-full mx-auto px-4 md:px-8 mb-10 md:mb-12 opacity-0">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[#0f1b2e] uppercase tracking-widest mb-3">
            Top Brands
          </h3>
          
          {/* Custom Decorative Divider */}
          <div className="flex items-center justify-center w-full max-w-md opacity-80">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c69c4e] to-[#c69c4e]"></div>
            <div className="mx-3 text-[#c69c4e] flex items-center justify-center hover:scale-110 transition-transform duration-500 cursor-default">
              <svg width="30" height="15" viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L24 10L40 10L27 20L20 13L13 20L0 10L16 10L20 0Z" opacity="0.8"/>
              </svg>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c69c4e] to-[#c69c4e]"></div>
          </div>
        </div>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative flex items-center group">
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll("left")} 
          className="absolute left-0 md:left-2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[#c69c4e] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-zinc-100 hover:bg-[#0f1b2e] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={scrollRef} 
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory py-6 px-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {BRANDS.map((brand, index) => (
            <div 
              key={index} 
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              // Enhanced hover states
              className="group/card relative w-[160px] md:w-[220px] h-[80px] md:h-[100px] shrink-0 snap-center rounded-xl border border-zinc-100 bg-white shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#c69c4e]/40 transition-all duration-300 flex items-center justify-center p-4 cursor-pointer overflow-hidden opacity-0"
            >
              {/* Subtle Gold Accent line that slides in on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#c69c4e] scale-x-0 origin-left group-hover/card:scale-x-100 transition-transform duration-500 ease-out z-20" />
              
              {/* Image implementation */}
              <div className="relative w-full h-full flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300">
                <Image 
                  src={brand.img}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="(max-width: 768px) 160px, 220px"
                  className="object-contain mix-blend-multiply" 
                />
              </div>
              
              {/* Fallback Text (Hidden if image loads, but good for accessibility/SEO) */}
              <span className="sr-only">{brand.name}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll("right")} 
          className="absolute right-0 md:right-2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[#c69c4e] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-zinc-100 hover:bg-[#0f1b2e] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>

      </div>

      {/* VIEW ALL BRANDS BUTTON */}
      <div ref={buttonRef} className="flex justify-center mt-10 md:mt-12 opacity-0">
        <Link 
          href="/brands" 
          className="group inline-flex items-center gap-4 bg-[#0f1b2e] text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] px-8 py-4 md:px-10 md:py-5 hover:bg-[#c69c4e] transition-colors duration-500 rounded-sm shadow-xl hover:shadow-[0_10px_30px_rgba(198,156,78,0.3)]"
        >
          View All Brands
          <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300 relative">
            <ArrowRight size={14} className="absolute -right-1 top-1/2 -translate-y-1/2" />
          </span>
        </Link>
      </div>

    </section>
  );
}