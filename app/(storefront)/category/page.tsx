"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, ShoppingCart, Heart, Package, Loader2, Search, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext"; 

// --- CATEGORY DATA ---
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
    name: "BRANDS",
    subItems: [
      { name: "Cambro", children: ["Cambox", "Display Covers", "Glass Racks", "Ice Caddy", "Ingredient Bin", "Insulated Transport", "Isothermal Container", "Pizza Dough Box", "Portable Bar", "Serving Products", "Waste Pedals"] },
      { name: "Coffee Grinder" }, { name: "Coffee Machines" }, { name: "Dipo Induction" }, { name: "Electrolux" }, { name: "Hamilton Beach" }, { name: "Hatco" }, { name: "Manitowoc" },
      { name: "Molecular Equipments", children: ["100% Chef", "Bamix", "Camerons", "Clifton Food Range", "Coravin", "Excalibur - Food Dehydrator", "Hotery", "ISI", "Polyscience Innovative Culinary Technology", "Sico Kitchenware", "Sousvide Tools", "Texturas", "Tou Foods"] },
      { name: "Piping Hot" }, { name: "Robot Coupe" }, { name: "Roller Grill" }, { name: "Santos" }, { name: "Sirman" },
      { name: "Trufrost & Butler", children: ["Blenders", "Chest Freezer", "Confectionery", "Hot and Cold Dispensers", "Inductions"] },
      { name: "Winterhalter" }
    ]
  },
  {
    name: "BARWARE",
    subItems: [
      { name: "PC Bar Glass" }, { name: "Bar Accessories" }, { name: "Peg Measurer" }, { name: "Cocktail Shaker" }, { name: "Bar Spoon" }, { name: "Bucket" }
    ]
  }
];

// Helper to get all child categories recursively
function getAllChildSubcategories(categoryName: string, subName: string): string[] {
  const result: string[] = [subName];
  const cat = NAV_LINKS.find(c => c.name.toUpperCase() === categoryName.toUpperCase());
  if (!cat || !cat.subItems) return result;

  const findChildren = (items: any[]) => {
    for (const item of items) {
      const isObject = typeof item === 'object' && item !== null;
      const itemName = isObject ? (item as any).name : item;
      
      if (itemName.toLowerCase() === subName.toLowerCase()) {
        if (isObject && (item as any).children) {
          (item as any).children.forEach((child: any) => {
            const childName = typeof child === 'object' ? child.name : child;
            result.push(childName);
            if (typeof child === 'object' && child.children) {
              child.children.forEach((grandChild: any) => {
                result.push(typeof grandChild === 'object' ? grandChild.name : grandChild);
              });
            }
          });
        }
        return true;
      }
      
      if (isObject && (item as any).children) {
         findChildren((item as any).children);
      }
    }
  };
  
  findChildren(cat.subItems);
  return result;
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); 
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("ALL PRODUCTS");
  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState<number>(100000);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlSubCategory = searchParams.get("sub");
    const urlSearch = searchParams.get("search") || searchParams.get("q") || "";

    if (urlCategory) {
      setActiveCategory(decodeURIComponent(urlCategory).toUpperCase());
    } else {
      setActiveCategory("ALL PRODUCTS");
    }

    if (urlSubCategory) {
      setActiveSubCategories([decodeURIComponent(urlSubCategory)]);
    } else {
      setActiveSubCategories([]);
    }

    if (urlSearch) {
      setSearchQuery(decodeURIComponent(urlSearch));
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.products);
          
          if (data.products.length > 0) {
            const highest = Math.max(...data.products.map((p: any) => p.price || 0));
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

  // Reset to Page 1 whenever ANY filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategories, searchQuery, maxPrice]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubCategories([]); 
  };

  const toggleSubCategory = (sub: string) => {
    setActiveSubCategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const availableSubCategories = useMemo(() => {
    if (activeCategory === "ALL PRODUCTS") {
      const allUniqueSubs = Array.from(new Set(products.map(p => p.subCategory).filter(Boolean)));
      return allUniqueSubs.sort();
    }
    
    const productsInActiveCategory = products.filter(p => p.category?.toUpperCase() === activeCategory);
    const uniqueSubs = Array.from(new Set(productsInActiveCategory.map(p => p.subCategory).filter(Boolean)));
    
    return uniqueSubs.sort();
  }, [activeCategory, products]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "ALL PRODUCTS" || (product.category && product.category.toUpperCase() === activeCategory);
    
    let matchesSubCategory = true;
    if (activeSubCategories.length > 0) {
      matchesSubCategory = activeSubCategories.some(activeSub => {
        const allAllowedSubs = getAllChildSubcategories(activeCategory, activeSub);
        return product.subCategory && allAllowedSubs.some(allowedSub => 
          allowedSub.toLowerCase() === product.subCategory.trim().toLowerCase()
        );
      });
    }
      
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = (product.price || 0) <= maxPrice;
    
    return matchesCategory && matchesSubCategory && matchesSearch && matchesPrice;
  });

  // PAGINATION MATH
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back to the top of the catalog when changing pages
    window.scrollTo({ top: 300, behavior: 'smooth' }); 
  };

  const clearFilters = () => {
    setActiveCategory("ALL PRODUCTS");
    setActiveSubCategories([]);
    setSearchQuery("");
    setMaxPrice(absoluteMaxPrice);
    setCurrentPage(1);
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
        <aside className="w-full lg:w-[280px] shrink-0 sticky top-24 h-fit max-h-[85vh] overflow-y-auto custom-scrollbar pb-4 z-20">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
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
                  {availableSubCategories.map((sub: any) => (
                    <label key={sub} className="flex items-start gap-3 cursor-pointer group">
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
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 mb-6">
            <p className="text-zinc-500 font-medium text-sm">
              Showing <span className="text-[#0f1b2e] font-bold text-base">{filteredProducts.length}</span> results 
              {filteredProducts.length > itemsPerPage && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>

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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:border-[#c69c4e]/30 transition-all duration-300 group flex flex-col animate-in fade-in zoom-in-95"
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 mb-4 border border-zinc-100">
                      <Image 
                        src={
                          product.image && 
                          (product.image.startsWith('http://') || product.image.startsWith('https://')) && 
                          !product.image.includes('google.com/imgres')
                            ? product.image 
                            : "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={product.name || "Product"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        unoptimized={product.image?.includes('kommodo.ai') || product.image?.includes('5.imimg.com')} 
                      />
                      
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[#0f1b2e] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 shadow-sm">
                          {product.badge}
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <button 
                          onClick={() => toggleWishlist(product)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                            isInWishlist(product._id) 
                              ? 'bg-[#c69c4e] text-white' 
                              : 'bg-white text-[#0f1b2e] hover:bg-[#c69c4e] hover:text-white'
                          }`}
                          title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart size={18} className={isInWishlist(product._id) ? "fill-white" : ""} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      {product.subCategory && (
                        <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-1">{product.subCategory}</p>
                      )}
                      
                      <Link href={`/product/${product._id}`} className="text-[#0f1b2e] font-bold text-[16px] leading-tight hover:text-[#c69c4e] transition-colors mb-4 line-clamp-2">
                        {product.name}
                      </Link>
                      
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100">
                        <span className="text-[18px] font-extrabold text-[#0f1b2e]">₹{(product.price || 0).toLocaleString()}</span>
                        
                        <button 
                          onClick={() => addToCart(product)} 
                          className="bg-zinc-100 hover:bg-[#0f1b2e] hover:text-white text-[#0f1b2e] w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                          title="Add to cart"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 👇 SMART PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-12 pt-8 border-t border-zinc-200">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-zinc-200 font-bold text-sm text-[#0f1b2e] disabled:opacity-40 hover:bg-zinc-50 transition-colors shrink-0"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1 flex-wrap justify-center">
                    {(() => {
                      const pages = [];
                      const showEllipsis = totalPages > 7;

                      if (!showEllipsis) {
                        // If 7 or fewer pages, show them all
                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                      } else {
                        // Smart sliding window for many pages
                        if (currentPage <= 4) {
                          pages.push(1, 2, 3, 4, 5, '...', totalPages);
                        } else if (currentPage >= totalPages - 3) {
                          pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                        } else {
                          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                        }
                      }

                      return pages.map((page, index) =>
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-1 md:px-2 text-zinc-400 font-bold tracking-widest">
                            ...
                          </span>
                        ) : (
                          <button
                            key={`page-${page}`}
                            onClick={() => handlePageChange(page as number)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg font-bold transition-all shrink-0 text-sm md:text-base ${
                              currentPage === page
                                ? "bg-[#c69c4e] text-white shadow-md shadow-[#c69c4e]/20"
                                : "text-[#0f1b2e] hover:bg-zinc-100"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      );
                    })()}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-zinc-200 font-bold text-sm text-[#0f1b2e] disabled:opacity-40 hover:bg-zinc-50 transition-colors shrink-0"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-[#c69c4e]" />
          <p className="text-[#0f1b2e] font-bold tracking-widest uppercase">Loading Catalog...</p>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}