"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { 
  Search, Heart, ShoppingCart, User, Truck, 
  Download, Package, ChevronDown, Menu, LogOut, ChevronRight, Info, Phone, Shield
} from "lucide-react";

// --- EXPANDED NESTED NAVIGATION DATA ---
type NavItem = {
  name: string;
  path?: string;
  active?: boolean;
  dropdown?: boolean;
  subItems?: SubItem[];
};

type SubItem = string | {
  name: string;
  children?: (string | { name: string; children: string[] })[];
};

  const NAV_LINKS: NavItem[] = [
    { name: "HOME", path: "/", active: true },

    // ================= KITCHENWARE =================
    {
      name: "KITCHENWARE",
      path: "/category/kitchenware",
      dropdown: true,
      subItems: [
        {
          name: "SS GN PAN",
          children: ["202 Grade"]
        },
        { name: "PC GN PAN" },
        {
          name: "Strainers",
          children: [
            "Small Tea Strainer",
            "Small Conical Strainer",
            "Red Handle Strainer",
            "Spiral Strainer",
            "Net Strainer",
            "Conical Strainer"
          ]
        },
        { name: "Chopping Board" },
        { name: "Wok and Fry Pan" },
        { name: "SS Kitchen Products" },
        { name: "Pizza Tools" },
        { name: "Knives, Cleavers & Scrappers" },
        { name: "Electric Equipments" },
        { name: "Laddle and Palta" },
        { name: "Skimmer" },
        { name: "Spares" }
      ]
    },

    // ================= GLASSWARE =================
    {
      name: "GLASSWARE",
      path: "/category/glassware",
      dropdown: true,
      subItems: [
        { name: "ARCOROC" },
        { name: "AELIER" },
        {
          name: "ARIANE",
          children: ["Prime", "Urmi"]
        },
        { name: "DINEWELL" },
        { name: "DINEX ORGANIC" },
        {
          name: "OCEAN",
          children: [
            "Dine Bowl",
            "Dine Ice Cream Bowl",
            "Drink Shooter",
            { name: "Drink Stemware", children: [] },
            { name: "Tumbler", children: [] },
            { name: "Beer Glass and Mug", children: [] }
          ]
        },
        { name: "SANAAI" }
      ]
    },

    // ================= HOTELWARE =================
    {
      name: "HOTELWARE",
      path: "/category/hotelware",
      dropdown: true,
      subItems: [
        { name: "Spoons and Forks" },
        { name: "Serving Tray" },
        { name: "Stainless Steel Serve Ware" },
        {
          name: "PC Products",
          children: [
            "Glasses",
            "Cups and Bowls",
            "Dome Cover",
            "Salad Bowl",
            "Storage Container",
            "Compartment Tray",
            "Compact Adjustable Dish",
            "Utility Cart",
            "GN Pan Trolley"
          ]
        },
        {
          name: "Melamine Table Products",
          children: [
            "Round",
            "Square Round",
            "Urmi",
            "Matt Series",
            "Single & Double Serving",
            "Partition Plates",
            "Cream Dot Series",
            "Platter",
            "Pickle Sets"
          ]
        },
        { name: "Wooden Serving Products" },
        { name: "Polyrattan Basket" },
        { name: "Squeeze Bottle" },
        { name: "Tongs" },
        { name: "Table Top Products" },
        { name: "Printer" }
      ]
    },

    // ================= BRANDS =================
    {
      name: "BRANDS",
      path: "/category/brands",
      dropdown: true,
      subItems: [
        {
          name: "Cambro",
          children: [
            "Cambox",
            "Display Covers",
            "Glass Racks",
            "Ice Caddy",
            "Ingredient Bin",
            "Insulated Transport",
            "Isothermal Container",
            "Pizza Dough Box",
            "Portable Bar",
            "Serving Products",
            "Waste Pedals"
          ]
        },
        { name: "Coffee Grinder" },
        { name: "Coffee Machines" },
        { name: "Dipo Induction" },
        { name: "Electrolux" },
        { name: "Hamilton Beach" },
        { name: "Hatco" },
        { name: "Manitowoc" },
        {
          name: "Molecular Equipments",
          children: [
            "100% Chef",
            "Bamix",
            "Camerons",
            "Clifton Food Range",
            "Coravin",
            "Excalibur - Food Dehydrator",
            "Hotery",
            "ISI",
            "Polyscience Innovative Culinary Technology",
            "Sico Kitchenware",
            "Sousvide Tools",
            "Texturas",
            "Tou Foods"
          ]
        },
        { name: "Piping Hot" },
        { name: "Robot Coupe" },
        { name: "Roller Grill" },
        { name: "Santos" },
        { name: "Sirman" },
        {
          name: "Trufrost & Butler",
          children: [
            "Blenders",
            "Chest Freezer",
            "Confectionery",
            "Hot and Cold Dispensers",
            "Inductions"
          ]
        },
        { name: "Winterhalter" }
      ]
    },

    // ================= BARWARE =================
    {
      name: "BARWARE",
      path: "/category/barware",
      dropdown: true,
      subItems: [
        { name: "PC Bar Glass" },
        { name: "Bar Accessories" },
        { name: "Peg Measurer" },
        { name: "Cocktail Shaker" },
        { name: "Bar Spoon" },
        { name: "Bucket" }
      ]
    },

    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

// Helper to generate URL safe slugs
const createSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function Navbar() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const catMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (catMenuRef.current && !catMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex flex-col z-50 bg-white shadow-sm relative">
      
      {/* TIER 1: Top Bar */}
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
        </div>
      </div>

      {/* TIER 2: Main Search & Logo Bar */}
      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 py-2.5 lg:py-3 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 relative">
        
        <Link href="/" className="shrink-0 flex items-center justify-center mr-2 lg:mr-6 lg:w-[240px]">
          <div className="relative w-[100px] h-[50px] md:w-[130px] md:h-[65px] flex items-center justify-center">
            <Image 
              src="/logo/logo-02.jpeg"
              alt="Logo" 
              fill
              sizes="(max-width: 768px) 100px, 130px"
              className="object-contain object-center" 
              priority
            />
          </div>
        </Link>

        {/* Huge Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-4xl mx-2">
          <div className="flex w-full border border-zinc-300 rounded-full overflow-hidden focus-within:border-[#c69c4e] focus-within:ring-1 focus-within:ring-[#c69c4e] transition-all h-10">
            <input type="text" placeholder="Search for products, brands, or categories..." className="flex-1 px-6 text-sm focus:outline-none text-zinc-800 h-full" />
            <button className="bg-[#c69c4e] hover:bg-[#b0883d] transition-colors text-white px-8 flex items-center justify-center h-full">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5 xl:gap-6 shrink-0 ml-auto lg:ml-0">
          
          {/* DYNAMIC USER MENU */}
          {session ? (
            <div className="relative">
              {isProfileOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
              )}
              
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors relative z-50"
              >
                <div className="bg-[#0f1b2e] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  {session.user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-xs font-bold hidden xl:block">Account</span>
                <ChevronDown size={14} className={`hidden xl:block transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-zinc-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  
                  {/* Header */}
                  <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-100">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-0.5">Signed in as</p>
                    <p className="text-sm font-bold text-[#0f1b2e] truncate">{session.user?.email}</p>
                    {/* Admin Badge */}
                    {(session.user as any)?.role === "admin" && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#c69c4e]/10 text-[#c69c4e] text-[10px] font-bold rounded uppercase tracking-wider">
                        Administrator
                      </span>
                    )}
                  </div>
                  
                  {/* Standard User Links */}
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-[#c69c4e] hover:bg-zinc-50 rounded-xl transition-colors">
                      <User size={16} /> My Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-[#c69c4e] hover:bg-zinc-50 rounded-xl transition-colors">
                      <Package size={16} /> My Orders
                    </Link>
                  </div>
                  
                  {/* ADMIN ONLY LINK */}
                  {(session.user as any)?.role === "admin" && (
                    <div className="p-2 border-t border-zinc-100">
                      <Link href="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[#0f1b2e] bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors">
                        <Shield size={16} className="text-[#c69c4e]" /> Admin Dashboard
                      </Link>
                    </div>
                  )}

                  {/* Sign Out */}
                  <div className="p-2 border-t border-zinc-100">
                    <button onClick={() => { signOut(); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors">
              <User size={20} strokeWidth={1.5} />
              <span className="text-xs font-bold hidden xl:block">Login</span>
            </Link>
          )}

          {/* Wishlist & Cart */}
          <Link href="/wishlist" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors">
            <Heart size={20} strokeWidth={1.5} />
            <span className="text-xs font-bold hidden xl:block">Wishlist</span>
          </Link>
          
          <Link href="/cart" className="flex items-center gap-2 text-zinc-600 hover:text-[#0f1b2e] transition-colors relative">
            <ShoppingCart size={20} strokeWidth={1.5} />
            <span className="text-xs font-bold hidden xl:block">Cart</span>
            <span className="absolute -top-1.5 -right-2 lg:right-5 bg-[#c69c4e] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">0</span>
          </Link>
        </div>
      </div>

      {/* TIER 3: Category Links Bar */}
      <div className="border-t border-zinc-200 bg-white hidden lg:block relative z-40">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center h-[46px]">
          
          {/* ALL CATEGORIES TOGGLE */}
          <div className="relative h-full flex items-end" ref={catMenuRef}>
            <button 
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`flex items-center justify-between px-6 py-3 font-bold text-sm w-[240px] rounded-t-lg transition-colors h-full ${
                isCategoryMenuOpen ? "bg-[#c69c4e] text-white" : "bg-[#0f1b2e] text-white hover:bg-[#1a2b47]"
              }`}
            >
              <div className="flex items-center gap-3"><Menu size={18} /> ALL CATEGORIES</div>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* ATTRACTIVE LEFT DROPDOWN MENU */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 w-[240px] bg-white border border-zinc-200 shadow-xl rounded-b-lg overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                {NAV_LINKS.filter(l => l.dropdown).map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.path || "#"}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-zinc-700 border-b border-zinc-100 hover:bg-zinc-50 hover:text-[#c69c4e] transition-colors group"
                  >
                    {link.name}
                    <ChevronRight size={14} className="text-zinc-400 group-hover:text-[#c69c4e] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MAIN HORIZONTAL NAVIGATION WITH MULTI-LEVEL HOVER */}
          <nav className="flex items-center gap-1 xl:gap-2 ml-6 text-[13px] font-bold h-full">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group h-full flex items-center">
                
                <Link 
                  href={link.path || "#"} 
                  className={`flex items-center gap-1.5 uppercase px-4 py-2 rounded-md transition-colors ${
                    link.active ? "text-[#c69c4e]" : "text-[#0f1b2e] hover:bg-zinc-100 hover:text-[#c69c4e]"
                  }`}
                >
                  {link.name === "ABOUT US" && <Info size={14} />}
                  {link.name === "CONTACT" && <Phone size={14} />}
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* MULTI LEVEL DROPDOWN */}
                {link.dropdown && link.subItems && (
                  <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                    <div className="relative bg-white border border-zinc-200 shadow-xl rounded-xl min-w-[260px] py-2 before:absolute before:-top-2 before:left-6 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-t before:border-zinc-200">
                      
                      {link.subItems.map((item, i) => {
                        // Normalize the item (it could be a string or an object)
                        const isObject = typeof item === 'object' && item !== null;
                        const itemName = isObject ? (item as any).name : item;
                        const hasChildren = isObject && (item as any).children && (item as any).children.length > 0;
                        const itemSlug = createSlug(itemName);

                        return (
                          <div key={i} className="relative group/sub">
                            <Link
                              href={`${link.path}/${itemSlug}`}
                              className="flex items-center justify-between px-5 py-3 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#c69c4e] transition-all whitespace-nowrap"
                            >
                              {itemName}
                              {hasChildren && <ChevronRight size={14} />}
                            </Link>

                            {/* SUB DROPDOWN (2nd Level) */}
                            {hasChildren && (
                              <div className="absolute left-full top-0 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50 pl-1">
                                <div className="bg-white border border-zinc-200 shadow-xl rounded-xl min-w-[220px] py-2">
                                  
                                  {(item as any).children.map((child: any, idx: number) => {
                                    const isChildObject = typeof child === 'object' && child !== null;
                                    const childName = isChildObject ? child.name : child;
                                    const hasGrandChildren = isChildObject && child.children && child.children.length > 0;
                                    const childSlug = createSlug(childName);

                                    return (
                                      <div key={idx} className="relative group/third">
                                        <Link
                                          href={`${link.path}/${itemSlug}/${childSlug}`}
                                          className="flex items-center justify-between px-5 py-3 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#c69c4e] transition-all whitespace-nowrap"
                                        >
                                          {childName}
                                          {hasGrandChildren && <ChevronRight size={14} />}
                                        </Link>

                                        {/* THIRD LEVEL DROPDOWN */}
                                        {hasGrandChildren && (
                                          <div className="absolute left-full top-0 opacity-0 invisible group-hover/third:opacity-100 group-hover/third:visible transition-all duration-300 z-50 pl-1">
                                            <div className="bg-white border border-zinc-200 shadow-xl rounded-xl min-w-[200px] py-2">
                                              {child.children.map((third: string, t: number) => (
                                                <Link
                                                  key={t}
                                                  href={`${link.path}/${itemSlug}/${childSlug}/${createSlug(third)}`}
                                                  className="block px-5 py-3 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#c69c4e] transition-all whitespace-nowrap"
                                                >
                                                  {third}
                                                </Link>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}