"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { 
  Search, Heart, ShoppingCart, User, Truck, 
  Download, Package, ChevronDown, Menu, Tag 
} from "lucide-react";

const NAV_LINKS = [
  { name: "HOME", path: "/", active: true },
  { name: "KITCHENWARE", path: "/category/kitchenware", dropdown: true },
  { name: "GLASSWARE", path: "/category/glassware", dropdown: true },
  { name: "HOTELWARE", path: "/category/hotelware", dropdown: true },
  { name: "BRANDS", path: "/category/brands", dropdown: true },
  { name: "BARWARE", path: "/category/barware", dropdown: true },
];

export default function Navbar() {
  return (
    <header className="w-full flex flex-col z-50 bg-white shadow-sm relative">
      
      {/* TIER 1: Top Bar (Dark Navy) */}
      <div className="bg-[#0f1b2e] text-white/90 text-[11px] md:text-xs py-1.5 px-4 md:px-8 flex justify-between items-center font-medium tracking-wide">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[#c69c4e]">★</span>
          Trusted by Professionals, Chosen for Excellence.
        </div>
        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          <Link href="/bulk" className="flex items-center gap-1.5 hover:text-[#c69c4e] transition-colors">
            <Package size={14} /> Bulk Orders
          </Link>
          <Link href="/catalog" className="hidden sm:flex items-center gap-1.5 hover:text-[#c69c4e] transition-colors">
            <Download size={14} /> Download Catalog
          </Link>
          <Link href="/track" className="hidden sm:flex items-center gap-1.5 hover:text-[#c69c4e] transition-colors">
            <Truck size={14} /> Track Order
          </Link>
          <span className="w-[1px] h-3 bg-white/20 hidden sm:block"></span>
      
        </div>
      </div>

      {/* TIER 2: Main Search & Logo Bar */}
      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 py-2.5 lg:py-3 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 relative">
        
        {/* Perfectly Sized Logo Placement */}
        <Link href="/" className="shrink-0 flex items-center justify-center mr-2 lg:mr-6 lg:w-[240px]">
          <div className="relative w-[100px] h-[50px] md:w-[130px] md:h-[65px] flex items-center justify-center">
            <Image 
              src="/logo/logo-02.jpeg"
              alt="Logo" 
              fill
              className="object-contain object-center" 
              priority
            />
          </div>
        </Link>

        {/* Huge Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-4xl mx-2">
          <div className="flex w-full border border-zinc-300 rounded-full overflow-hidden focus-within:border-[#c69c4e] focus-within:ring-1 focus-within:ring-[#c69c4e] transition-all h-10">
            <input 
              type="text" 
              placeholder="Search for products, categories, brands..." 
              className="flex-1 px-6 text-sm focus:outline-none text-zinc-800 h-full"
            />
            <div className="border-l border-zinc-300 bg-zinc-50 flex items-center h-full">
              <select className="bg-transparent pl-4 pr-8 text-sm text-zinc-600 focus:outline-none cursor-pointer appearance-none h-full">
                <option>All Categories</option>
                <option>Kitchenware</option>
                <option>Glassware</option>
              </select>
            </div>
            <button className="bg-[#c69c4e] hover:bg-[#b0883d] transition-colors text-white px-8 flex items-center justify-center h-full">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right Icons (Login, Wishlist & Cart) */}
        <div className="flex items-center gap-5 xl:gap-6 shrink-0 ml-auto lg:ml-0">
          
          {/* NEW: Login Button */}
          <Link href="/login" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors">
            <div className="relative">
              <User size={20} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold hidden xl:block">Login</span>
          </Link>

          <Link href="/wishlist" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors pl-1">
            <div className="relative">
              <Heart size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-[#c69c4e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
            <span className="text-xs font-bold hidden xl:block">Wishlist</span>
          </Link>
          
          <Link href="/cart" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors pl-1">
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-[#c69c4e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </div>
            <span className="text-xs font-bold hidden xl:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search (Shows only on small screens) */}
      <div className="lg:hidden px-4 pb-3">
        <div className="flex w-full border border-zinc-300 rounded-lg overflow-hidden h-10">
          <input type="text" placeholder="Search..." className="flex-1 px-4 text-sm focus:outline-none h-full" />
          <button className="bg-[#c69c4e] text-white px-4 flex items-center justify-center h-full">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* TIER 3: Category Links Bar */}
      <div className="border-t border-zinc-200 bg-white hidden lg:block">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center relative">
          
          {/* ALL CATEGORIES BUTTON */}
          <button className="bg-[#0f1b2e] text-white flex items-center justify-between px-6 py-2.5 font-bold text-sm tracking-wide hover:bg-[#1a2b47] transition-colors w-[240px] shrink-0 rounded-t-md">
            <div className="flex items-center gap-3">
              <Menu size={18} />
              ALL CATEGORIES
            </div>
            <ChevronDown size={16} className="opacity-50" />
          </button>

          {/* Main Links */}
          <nav className="flex items-center gap-6 xl:gap-8 ml-8 text-[12px] xl:text-[13px] font-bold tracking-wide">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`flex items-center gap-1 uppercase transition-colors py-2.5 ${link.active ? "text-[#c69c4e]" : "text-[#0f1b2e] hover:text-[#c69c4e]"}`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="opacity-50" />}
              </Link>
            ))}
            
            <Link href="/offers" className="flex items-center gap-1.5 uppercase text-[#0f1b2e] hover:text-[#c69c4e] transition-colors py-2.5 ml-2 xl:ml-4">
              <Tag size={14} className="text-[#c69c4e]" /> OFFERS
            </Link>
            <Link href="/contact" className="uppercase text-[#0f1b2e] hover:text-[#c69c4e] transition-colors py-2.5 ml-2 xl:ml-4">
              CONTACT US
            </Link>
          </nav>
        </div>
      </div>

    </header>
  );
}