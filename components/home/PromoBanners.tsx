"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Data array for the 4 promotional cards
const PROMOS = [
  {
    title: "NEW ARRIVALS",
    subtitle: "EXPLORE THE LATEST PRODUCTS",
    buttonText: "SHOP NOW",
    link: "/home-product-image/second-section-01.png",
    img: "/home-product-image/second-section-01.png", // Placeholder: Replace with your actual image path
    bgClass: "bg-[#0f1b2e]",
    titleClass: "text-white",
    subtitleClass: "text-white/90 uppercase",
    btnClass: "border-[#c69c4e] text-[#c69c4e] hover:bg-[#c69c4e] hover:text-[#0f1b2e]",
  },
  {
    title: "BEST SELLERS",
    subtitle: "TRUSTED BY PROFESSIONALS",
    buttonText: "SHOP NOW",
    link: "/best-sellers",
    img: "/home-product-image/second-section-02.png", 
    bgClass: "bg-[#c69c4e]",
    titleClass: "text-white",
    subtitleClass: "text-white/90 uppercase",
    btnClass: "border-white/60 text-white hover:bg-white hover:text-[#c69c4e]",
  },
  {
    title: "BULK ORDERS",
    subtitle: "SPECIAL PRICING FOR BUSINESS",
    buttonText: "ENQUIRE NOW",
    link: "/bulk-orders",
    img: "/home-product-image/second-section-03.png", 
    bgClass: "bg-[#0f1b2e]",
    titleClass: "text-white",
    subtitleClass: "text-white/90 uppercase",
    btnClass: "border-[#c69c4e] text-[#c69c4e] hover:bg-[#c69c4e] hover:text-[#0f1b2e]",
  },
  {
    title: "DOWNLOAD OUR CATALOG",
    subtitle: "Explore our complete product range.",
    buttonText: "DOWNLOAD NOW",
    link: "/catalog",
    img: "/home-product-image/second-section-04.png", 
    bgClass: "bg-[#faf9f6] border border-zinc-200",
    titleClass: "text-[#0f1b2e]",
    subtitleClass: "text-zinc-600", // Sentence case for this specific card
    btnClass: "border-[#c69c4e] text-[#c69c4e] hover:bg-[#c69c4e] hover:text-white",
  }
];

export default function PromoBanners() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // GSAP Staggered Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
    <section ref={sectionRef} className="bg-white py-12 md:py-16 relative z-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          
          {PROMOS.map((promo, index) => (
            <Link 
              key={index} 
              href={promo.link}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              // Opacity-0 prevents flash before animation
              className={`group relative overflow-hidden rounded-xl p-6 md:p-8 flex flex-col justify-between h-[220px] md:h-[240px] shadow-sm hover:shadow-xl transition-all duration-300 opacity-0 ${promo.bgClass}`}
            >
              
              {/* Text Content (Z-10 keeps it above the image) */}
              <div className="relative z-10 w-[65%]">
                <h3 className={`text-lg md:text-xl font-extrabold tracking-wide mb-1 md:mb-2 leading-tight ${promo.titleClass}`}>
                  {promo.title}
                </h3>
                <p className={`text-[10px] md:text-xs font-bold tracking-wider leading-snug mb-6 ${promo.subtitleClass}`}>
                  {promo.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-auto">
                <button className={`px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-solid rounded-[2px] transition-colors duration-300 backdrop-blur-sm ${promo.btnClass}`}>
                  {promo.buttonText}
                </button>
              </div>

              {/* Product Image - Positioned absolutely to the right */}
              <div className="absolute bottom-2 -right-4 w-[55%] h-[85%] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
                <Image 
                  src={promo.img} 
                  alt={promo.title} 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain object-bottom right-0 drop-shadow-2xl" 
                />
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}