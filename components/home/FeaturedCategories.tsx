"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 👇 FIX: Updated paths to use Query Parameters (?category=NAME) instead of sub-folders
const CATEGORIES = [
  { 
    name: "Kitchenware", 
    path: "/category?category=KITCHENWARE", 
    img: "/home-product-image/product-01.png" 
  },
  { 
    name: "Glassware", 
    path: "/category?category=GLASSWARE", 
    img: "/home-product-image/product-02.png" 
  },
  { 
    name: "Hotelware", 
    path: "/category?category=HOTELWARE", 
    img: "/home-product-image/product-03.png" 
  },
  { 
    name: "Brands", 
    path: "/category?category=BRANDS", 
    img: "/home-product-image/product-04.png" 
  },
  { 
    name: "Barware", 
    path: "/category?category=BARWARE", 
    img: "/home-product-image/product-05.png" 
  }
];

export default function FeaturedCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animate Header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", 
            toggleActions: "play none none reverse", 
          },
        }
      );
    }

    // 2. Animate Cards with Stagger
    if (cardRefs.current.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current, 
            start: "top 70%", 
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 relative z-20 overflow-hidden">
      
      {/* HEADER */}
      <div ref={headerRef} className="max-w-[1600px] w-full mx-auto px-4 md:px-8 mb-10 md:mb-14 opacity-0">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0f1b2e] uppercase tracking-widest mb-3">
            Shop By Category
          </h3>
          
          <div className="flex items-center justify-center w-full max-w-md opacity-80">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c69c4e] to-[#c69c4e]"></div>
            <div className="mx-3 text-[#c69c4e] flex items-center justify-center">
              <svg width="30" height="15" viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L24 10L40 10L27 20L20 13L13 20L0 10L16 10L20 0Z" opacity="0.8"/>
              </svg>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c69c4e] to-[#c69c4e]"></div>
          </div>
        </div>
      </div>

      {/* 5-COLUMN GRID CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          
          {CATEGORIES.map((category, index) => (
            <div 
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="opacity-0 h-full flex flex-col"
            >
              <Link 
                href={category.path} 
                className="group flex flex-col flex-1 w-full h-full rounded-xl overflow-hidden bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-zinc-100 cursor-pointer"
              >
                
                {/* Image Section */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image 
                    src={category.img} 
                    alt={category.name} 
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                </div>

                {/* Bottom Label Section */}
                <div className="flex items-center justify-between px-4 py-4 md:py-5 bg-[#faf9f6] border-t border-zinc-50 mt-auto">
                  <h4 className="text-[#0f1b2e] font-bold text-xs md:text-sm uppercase tracking-wider">
                    {category.name}
                  </h4>
                  
                  {/* Gold Circular Arrow Button */}
                  <div className="w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full bg-[#c69c4e] text-white flex items-center justify-center group-hover:bg-[#0f1b2e] group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
                
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}