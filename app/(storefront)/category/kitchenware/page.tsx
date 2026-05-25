"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ShoppingCart, Heart, Package, Loader2, Search, ChevronRight } from "lucide-react";

// --- CATEGORY DATA (BRANDS REMOVED) ---
const NAV_LINKS = [
  {
    name: "KITCHENWARE",
    subItems: [
      { name: "SS GN PAN", children: ["202 Grade"] },
      { name: "PC GN PAN" },
      { name: "Strainers", children: ["Small Tea Strainer", "Small Conical Strainer", "Red Handle Strainer", "Spiral Strainer", "Net Strainer", "Conical Strainer"] },
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
  {
    name: "GLASSWARE",
    subItems: [
      { name: "ARCOROC" }, { name: "AELIER" }, { name: "ARIANE", children: ["Prime", "Urmi"] },
      { name: "DINEWELL" }, { name: "DINEX ORGANIC" },
      { name: "OCEAN", children: ["Dine Bowl", "Dine Ice Cream Bowl", "Drink Shooter", { name: "Drink Stemware", children: [] }, { name: "Tumbler", children: [] }, { name: "Beer Glass and Mug", children: [] }] },
      { name: "SANAAI" }
    ]
  },
  {
    name: "HOTELWARE",
    subItems: [
      { name: "Spoons and Forks" }, { name: "Serving Tray" }, { name: "Stainless Steel Serve Ware" },
      { name: "PC Products", children: ["Glasses", "Cups and Bowls", "Dome Cover", "Salad Bowl", "Storage Container", "Compartment Tray", "Compact Adjustable Dish", "Utility Cart", "GN Pan Trolley"] },
      { name: "Melamine Table Products", children: ["Round", "Square Round", "Urmi", "Matt Series", "Single & Double Serving", "Partition Plates", "Cream Dot Series", "Platter", "Pickle Sets"] },
      { name: "Wooden Serving Products" }, { name: "Polyrattan Basket" }, { name: "Squeeze Bottle" }, { name: "Tongs" }, { name: "Table Top Products" }, { name: "Printer" }
    ]
  },
  {
    name: "BARWARE",
    subItems: [
      { name: "PC Bar Glass" }, { name: "Bar Accessories" }, { name: "Peg Measurer" }, { name: "Cocktail Shaker" }, { name: "Bar Spoon" }, { name: "Bucket" }
    ]
  }
];

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering State
  const [activeCategory, setActiveCategory] = useState("ALL PRODUCTS");
  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Price Slider State
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState<number>(100000);

  // 1. Fetch ALL products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.products);
          
          // Calculate the highest price in the database for the slider
          if (data.products.length > 0) {
            const highest = Math.max(...data.products.map((p: any) => p.price || 0));
            // Ensure slider goes at least to 1000 even if products are cheap
            const finalMax = highest > 1000 ? highest : 1000; 
            setAbsoluteMaxPrice(finalMax);
            setMaxPrice(finalMax);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Handle Category Selection
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubCategories([]); // Clear subcategories when switching main category
  };

  const toggleSubCategory = (sub: string) => {
    setActiveSubCategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  // 3. Extract subcategories for the currently selected category
  const availableSubCategories = useMemo(() => {
    if (activeCategory === "ALL PRODUCTS") return [];
    const catData = NAV_LINKS.find(c => c.name === activeCategory);
    if (!catData || !catData.subItems) return [];
    
    return catData.subItems.map(item => typeof item === 'object' && item !== null ? item.name : item as string);
  }, [activeCategory]);

  // 4. Filter the products Robustly
  const filteredProducts = products.filter(product => {
    // Check Category Match
    const matchesCategory = activeCategory === "ALL PRODUCTS" || (product.category && product.category.toUpperCase() === activeCategory);
    
    // Check SubCategory Match (Case Insensitive)
    const matchesSubCategory = activeSubCategories.length === 0 || 
      (product.subCategory && activeSubCategories.some(sub => sub.toLowerCase() === product.subCategory.toLowerCase()));
    
    // Check Search & Price
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = (product.price || 0) <= maxPrice;
    
    return matchesCategory && matchesSubCategory && matchesSearch && matchesPrice;
  });

  const clearFilters = () => {
    setActiveCategory("ALL PRODUCTS");
    setActiveSubCategories([]);
    setSearchQuery("");
    setMaxPrice(absoluteMaxPrice);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      
      {/* HEADER */}
      <div className="bg-[#0f1b2e] text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Master Catalog</h1>
            <p className="text-zinc-400 max-w-xl text-lg">
              Browse our entire collection of premium HORECA supplies.
            </p>
          </div>
          
          {/* Catalog Search Bar */}
          <div className="w-full md:w-[400px] relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#c69c4e] transition-colors"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 sticky top-24">
            <div className="flex items-center justify-between font-extrabold text-[#0f1b2e] text-lg mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2"><Filter size={20} className="text-[#c69c4e]" /> Filters</div>
            </div>

            {/* PRICE FILTER (SLIDER) */}
            <div className="mb-8">
              <h3 className="font-bold text-[#0f1b2e] mb-4 text-sm uppercase tracking-wider">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max={absoluteMaxPrice} 
                step="50"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#c69c4e]"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-3 font-bold">
                <span>₹0</span>
                <span className="text-[#0f1b2e] text-sm">Up to ₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* MAIN CATEGORIES */}
            <div className="mb-8">
              <h3 className="font-bold text-[#0f1b2e] mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleCategoryChange("ALL PRODUCTS")}
                  className={`text-left px-3 py-2 rounded-lg font-bold text-sm transition-colors ${activeCategory === "ALL PRODUCTS" ? "bg-[#0f1b2e] text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                >
                  All Products
                </button>
                {NAV_LINKS.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg font-bold text-sm transition-colors ${activeCategory === cat.name ? "bg-[#0f1b2e] text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
                  >
                    {cat.name}
                    {activeCategory === cat.name && <ChevronRight size={14} className="text-[#c69c4e]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC SUB-CATEGORIES (Checkboxes) */}
            {availableSubCategories.length > 0 && (
              <div className="mb-8 animate-in fade-in slide-in-from-left-4">
                <h3 className="font-bold text-[#0f1b2e] mb-4 text-sm uppercase tracking-wider">Sub-Categories</h3>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {availableSubCategories.map((sub) => (
                    <label key={sub} className="flex items-start gap-3 cursor-pointer group">
                      {/* Custom Checkbox Input */}
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={activeSubCategories.includes(sub)}
                        onChange={() => toggleSubCategory(sub)}
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 mt-0.5 ${activeSubCategories.includes(sub) ? "bg-[#c69c4e] border-[#c69c4e]" : "border-zinc-300 group-hover:border-[#c69c4e]"}`}>
                        {activeSubCategories.includes(sub) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${activeSubCategories.includes(sub) ? "text-[#0f1b2e] font-bold" : "text-zinc-600 group-hover:text-[#0f1b2e]"}`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <button onClick={clearFilters} className="w-full bg-zinc-100 text-[#0f1b2e] font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors">
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* RIGHT SIDE: PRODUCT GRID */}
        <div className="flex-1">
          
          {/* Results Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 mb-6">
            <p className="text-zinc-500 font-medium text-sm">
              Showing <span className="text-[#0f1b2e] font-bold text-base">{filteredProducts.length}</span> results
            </p>
          </div>

          {/* DYNAMIC CONTENT */}
          {loading ? (
            <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-zinc-400 bg-white rounded-2xl border border-zinc-200 shadow-sm">
              <Loader2 size={40} className="animate-spin mb-4 text-[#c69c4e]" />
              <p className="font-bold tracking-wider uppercase text-sm">Loading Catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="w-full min-h-[400px] bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                <Package size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-[#0f1b2e] mb-2">No products found</h3>
              <p className="text-zinc-500">There are no products in the database that match these filters.</p>
              <button onClick={clearFilters} className="mt-6 text-[#c69c4e] font-bold hover:underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product._id} 
                  className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:border-[#c69c4e]/30 transition-all duration-300 group flex flex-col animate-in fade-in zoom-in-95"
                >
                  {/* Product Image */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 mb-4 border border-zinc-100">
                    <Image 
                      src={product.image || "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop"} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Optional Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#0f1b2e] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 shadow-sm">
                        {product.badge}
                      </div>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button className="w-10 h-10 bg-white text-[#0f1b2e] rounded-full flex items-center justify-center shadow-lg hover:bg-[#c69c4e] hover:text-white transition-colors">
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    {/* Sub Category Tag */}
                    {product.subCategory && (
                      <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-1">{product.subCategory}</p>
                    )}
                    
                    <Link href={`/product/${product._id}`} className="text-[#0f1b2e] font-bold text-[16px] leading-tight hover:text-[#c69c4e] transition-colors mb-4 line-clamp-2">
                      {product.name}
                    </Link>
                    
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100">
                      <span className="text-[18px] font-extrabold text-[#0f1b2e]">₹{(product.price || 0).toLocaleString()}</span>
                      <button className="bg-zinc-100 hover:bg-[#0f1b2e] hover:text-white text-[#0f1b2e] w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}