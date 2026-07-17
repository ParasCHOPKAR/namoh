"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  PackagePlus, Upload, LayoutDashboard, Settings, LogOut, 
  CheckCircle2, X, ClipboardList, Loader2, ChevronDown, 
  ChevronUp, MapPin, Phone, Mail, User, Search, Trash2, Edit 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";

// --- CATEGORY DATA ---
const NAV_LINKS = [
  { name: "KITCHENWARE", subItems: [{ name: "SS GN PAN", children: ["202 Grade"] }, { name: "PC GN PAN" }, { name: "Strainers" }, { name: "Chopping Board" }, { name: "Wok and Fry Pan" }, { name: "SS Kitchen Products" }, { name: "Pizza Tools" }, { name: "Knives, Cleavers & Scrappers" }, { name: "Electric Equipments" }, { name: "Laddle and Palta" }, { name: "Skimmer" }, { name: "Spares" } ] },
  { name: "GLASSWARE", subItems: [{ name: "ARCOROC" }, { name: "AELIER" }, { name: "ARIANE" }, { name: "DINEWELL" }, { name: "DINEX ORGANIC" }, { name: "OCEAN" }, { name: "SANAAI" }] },
  { name: "HOTELWARE", subItems: [{ name: "Spoons and Forks" }, { name: "Serving Tray" }, { name: "Stainless Steel Serve Ware" }, { name: "PC Products" }, { name: "Melamine Table Products" }, { name: "Wooden Serving Products" }, { name: "Polyrattan Basket" }, { name: "Squeeze Bottle" }, { name: "Tongs" }, { name: "Table Top Products" }, { name: "Printer" }] },
  { name: "BRANDS", subItems: [{ name: "Cambro" }, { name: "Coffee Grinder" }, { name: "Coffee Machines" }, { name: "Dipo Induction" }, { name: "Electrolux" }, { name: "Hamilton Beach" }, { name: "Hatco" }, { name: "Manitowoc" }, { name: "Molecular Equipments" }, { name: "Piping Hot" }, { name: "Robot Coupe" }, { name: "Roller Grill" }, { name: "Santos" }, { name: "Sirman" }, { name: "Trufrost & Butler" }, { name: "Winterhalter" }] },
  { name: "BARWARE", subItems: [{ name: "PC Bar Glass" }, { name: "Bar Accessories" }, { name: "Peg Measurer" }, { name: "Cocktail Shaker" }, { name: "Bar Spoon" }, { name: "Bucket" }] }
];

const STATUS_OPTIONS = ["Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("add-product");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  // --- ADD PRODUCT STATE ---
  const [formData, setFormData] = useState({
    name: "", price: "", category: "KITCHENWARE", subCategory: "", image: "", description: "",
  });

  // --- ORDERS STATE ---
  const [orders, setOrders] = useState<any[]>([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // --- PRODUCTS STATE ---
  const [products, setProducts] = useState<any[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedChildCategory, setSelectedChildCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const handleMainCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setSelectedSubCategory("All");
    setSelectedChildCategory("All");
  };

  const handleSubCategoryChange = (val: string) => {
    setSelectedSubCategory(val);
    setSelectedChildCategory("All");
  };

  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        setFetchingOrders(true);
        try {
          const res = await fetch("/api/admin/orders");
          const data = await res.json();
          if (data.success) setOrders(data.orders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setFetchingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setFetchingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setFetchingProducts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "manage-products") {
      fetchProducts();
    }
  }, [activeTab]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.image) return alert("Please upload a product image first!");

    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct._id,
          name: editingProduct.name,
          price: Number(editingProduct.price),
          category: editingProduct.category,
          subCategory: editingProduct.subCategory,
          image: editingProduct.image,
          description: editingProduct.description,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(prevProducts => prevProducts.map(p => p._id === editingProduct._id ? data.product : p));
        setEditingProduct(null);
        alert("Product updated successfully!");
      } else {
        alert(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
        alert("Product deleted successfully!");
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order));
    
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: newStatus }), 
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) setExpandedOrderId(null);
    else setExpandedOrderId(orderId);
  };

  const availableSubCategories = useMemo(() => {
    const selectedCat = NAV_LINKS.find(cat => cat.name === formData.category);
    if (!selectedCat || !selectedCat.subItems) return [];
    return selectedCat.subItems.map(item => (typeof item === 'object' && item !== null && 'name' in item) ? item.name : item as string);
  }, [formData.category]);

  const filterAvailableSubCategories = useMemo(() => {
    if (selectedCategory === "All") return [];
    const cat = NAV_LINKS.find(c => c.name === selectedCategory);
    if (!cat || !cat.subItems) return [];
    return cat.subItems.map(item => (typeof item === 'object' && item !== null && 'name' in item) ? item.name : item as string);
  }, [selectedCategory]);

  const filterAvailableChildCategories = useMemo(() => {
    if (selectedCategory === "All" || selectedSubCategory === "All") return [];
    const cat = NAV_LINKS.find(c => c.name === selectedCategory);
    if (!cat || !cat.subItems) return [];
    const sub = cat.subItems.find(item => {
      if (typeof item === 'object' && item !== null && 'name' in item) {
        return item.name === selectedSubCategory;
      }
      return false;
    });
    if (!sub || typeof sub !== 'object' || !sub.children) return [];
    return sub.children;
  }, [selectedCategory, selectedSubCategory]);

  const editAvailableSubCategories = useMemo(() => {
    if (!editingProduct) return [];
    const selectedCat = NAV_LINKS.find(cat => cat.name === editingProduct.category);
    if (!selectedCat || !selectedCat.subItems) return [];
    return selectedCat.subItems.map(item => (typeof item === 'object' && item !== null && 'name' in item) ? item.name : item as string);
  }, [editingProduct?.category]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Main Category Match
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      // Sub & Child Category Match
      let matchesSub = true;
      if (selectedCategory !== "All" && selectedSubCategory !== "All") {
        if (selectedChildCategory !== "All") {
          matchesSub = product.subCategory === selectedChildCategory;
        } else {
          const cat = NAV_LINKS.find(c => c.name === selectedCategory);
          const sub = cat?.subItems.find(item => {
            if (typeof item === 'object' && item !== null && 'name' in item) {
              return item.name === selectedSubCategory;
            }
            return false;
          });
          
          if (sub && typeof sub === 'object' && 'children' in sub && sub.children) {
            matchesSub = product.subCategory === selectedSubCategory || sub.children.includes(product.subCategory);
          } else {
            matchesSub = product.subCategory === selectedSubCategory;
          }
        }
      }

      // Search Match
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        (product.name?.toLowerCase().includes(lowerSearch)) ||
        (product.category?.toLowerCase().includes(lowerSearch)) ||
        (product.subCategory?.toLowerCase().includes(lowerSearch));
        
      return matchesCategory && matchesSub && matchesSearch;
    });
  }, [products, selectedCategory, selectedSubCategory, selectedChildCategory, searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "category") setFormData({ ...formData, [name]: value, subCategory: "" });
    else setFormData({ ...formData, [name]: value });
  };

  useEffect(() => { document.body.style.overflow = 'unset'; }, [formData.image]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload a product image first!");

    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      if (res.ok) {
        setSuccessMsg("Product successfully added to catalog!");
        setFormData({ name: "", price: "", category: formData.category, subCategory: "", image: "", description: "" });
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-[#f8f9fa] items-stretch">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#0f1b2e] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c69c4e] rounded-lg flex items-center justify-center font-bold">N</div>
          <span className="font-bold tracking-widest uppercase">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("add-product")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "add-product" ? "bg-white/10 text-[#c69c4e]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
          >
            <PackagePlus size={18} /> Add Product
          </button>

          <button 
            onClick={() => setActiveTab("manage-products")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "manage-products" ? "bg-white/10 text-[#c69c4e]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
          >
            <Settings size={18} /> Manage Products
          </button>
          
          <button 
            onClick={() => setActiveTab("orders")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "orders" ? "bg-white/10 text-[#c69c4e]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
          >
            <ClipboardList size={18} /> Manage Orders
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl font-medium transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full p-6 lg:p-12 pb-24 overflow-y-auto">
        
        {/* ===================== VIEW: ADD PRODUCT ===================== */}
        {activeTab === "add-product" && (
          <div className="max-w-4xl mx-auto animate-in fade-in">
            <div className="mb-10 mt-4">
              <h1 className="text-3xl font-extrabold text-[#0f1b2e] mb-2">Add New Product</h1>
              <p className="text-zinc-500 font-medium">Publish a new item directly to the database.</p>
            </div>

            {successMsg && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-500" />
                <span className="font-bold">{successMsg}</span>
              </div>
            )}

            <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 overflow-hidden">
              <form onSubmit={handleProductSubmit} className="p-8 lg:p-10 space-y-8">
                
                {/* Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Main Category *</label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]">
                      {NAV_LINKS.map(link => <option key={link.name} value={link.name}>{link.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Sub-Category *</label>
                    <input required type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} list="subCategoryList" placeholder="Select or type..." className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]" />
                    <datalist id="subCategoryList">
                      {availableSubCategories.map((sub, idx) => <option key={idx} value={sub} />)}
                    </datalist>
                  </div>
                </div>

                {/* Name & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Specific Product Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Stand Mixer" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Price (₹) *</label>
                    <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]" />
                  </div>
                </div>

                {/* 👇 NEW: Product Description Textarea */}
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Product Description *</label>
                  <textarea 
                    required 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Enter detailed product description, dimensions, material, etc..." 
                    rows={5}
                    className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] transition-colors resize-y custom-scrollbar" 
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0f1b2e] block mb-2">Product Image *</label>
                  {!formData.image ? (
                    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(result: any) => { if (result.info?.secure_url) setFormData(prev => ({ ...prev, image: result.info.secure_url })); }}>
                      {({ open }) => (
                        <button type="button" onClick={() => open()} className="w-full flex flex-col items-center justify-center gap-2 p-8 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl hover:bg-zinc-100 hover:border-[#c69c4e] transition-all text-zinc-500 font-medium">
                          <Upload className="h-8 w-8 text-[#c69c4e] mb-2" /> Click to upload Image from PC
                        </button>
                      )}
                    </CldUploadWidget>
                  ) : (
                    <div className="relative border border-zinc-200 rounded-xl p-3 bg-zinc-50 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden border border-zinc-200 bg-white shrink-0">
                        <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-zinc-500 truncate">{formData.image}</p>
                        <p className="text-xs text-green-600 font-bold mt-1">✓ Uploaded successfully</p>
                      </div>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end border-t border-zinc-100">
                  <button disabled={loading} type="submit" className="bg-[#0f1b2e] hover:bg-[#1a2b47] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-all hover:shadow-lg hover:-translate-y-0.5">
                    {loading ? "Publishing..." : "Publish Product"} <PackagePlus size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== VIEW: MANAGE PRODUCTS ===================== */}
        {activeTab === "manage-products" && (
          <div className="max-w-6xl mx-auto animate-in fade-in">
            <div className="mb-10 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-[#0f1b2e] mb-2">Manage Products</h1>
                <p className="text-zinc-500 font-medium">View, search, filter, edit, and delete products in your catalog.</p>
              </div>
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name, category, or subcategory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] focus:ring-1 focus:ring-[#c69c4e] transition-all shadow-sm"
                />
              </div>
              
              {/* Main Category Dropdown */}
              <div className="w-full lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleMainCategoryChange(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] focus:ring-1 focus:ring-[#c69c4e] transition-all cursor-pointer shadow-sm"
                >
                  <option value="All">All Categories</option>
                  {NAV_LINKS.map((link) => (
                    <option key={link.name} value={link.name}>{link.name}</option>
                  ))}
                </select>
              </div>

              {/* Sub Category Dropdown */}
              <div className="w-full lg:w-52">
                <select
                  disabled={selectedCategory === "All"}
                  value={selectedSubCategory}
                  onChange={(e) => handleSubCategoryChange(e.target.value)}
                  className={`w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] focus:ring-1 focus:ring-[#c69c4e] transition-all cursor-pointer shadow-sm ${selectedCategory === "All" ? "opacity-50 cursor-not-allowed bg-zinc-50" : ""}`}
                >
                  <option value="All">All Sub Categories</option>
                  {filterAvailableSubCategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Child Category Dropdown */}
              {selectedCategory !== "All" && selectedSubCategory !== "All" && filterAvailableChildCategories.length > 0 && (
                <div className="w-full lg:w-56 animate-in fade-in slide-in-from-top-1 duration-200">
                  <select
                    value={selectedChildCategory}
                    onChange={(e) => setSelectedChildCategory(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] focus:ring-1 focus:ring-[#c69c4e] transition-all cursor-pointer shadow-sm"
                  >
                    <option value="All">All Child Categories</option>
                    {filterAvailableChildCategories.map((child) => (
                      <option key={child} value={child}>{child}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* TABLE STATE */}
            {fetchingProducts ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                <Loader2 size={40} className="animate-spin mb-4 text-[#c69c4e]" />
                <p className="font-bold tracking-wider uppercase text-sm">Loading Products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 font-medium shadow-sm">
                No products found matching your criteria.
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                        <th className="p-4">Product Image</th>
                        <th className="p-4">Product Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredProducts.map((product) => (
                        <tr key={product._id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="p-4">
                            <div className="h-12 w-12 rounded-lg overflow-hidden border border-zinc-150 bg-white shrink-0">
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-sm text-[#0f1b2e] max-w-xs md:max-w-md truncate">{product.name}</p>
                            {product.subCategory && (
                              <p className="text-xs text-zinc-400 font-medium mt-0.5">{product.subCategory}</p>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-[#c69c4e] text-base">₹{(product.price || 0).toLocaleString()}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Product"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== VIEW: MANAGE ORDERS ===================== */}
        {activeTab === "orders" && (
          <div className="max-w-6xl mx-auto animate-in fade-in">
            <div className="mb-10 mt-4 flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-[#0f1b2e] mb-2">Manage Orders</h1>
                <p className="text-zinc-500 font-medium">Track and update customer order statuses.</p>
              </div>
            </div>

            {fetchingOrders ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                <Loader2 size={40} className="animate-spin mb-4 text-[#c69c4e]" />
                <p className="font-bold tracking-wider uppercase text-sm">Loading Orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 font-medium">
                No orders have been placed yet.
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                        <th className="p-4">Order ID & Date</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {orders.map((order) => (
                        <React.Fragment key={order._id}>
                          {/* MAIN ROW */}
                          <tr className={`transition-colors ${expandedOrderId === order._id ? "bg-zinc-50" : "hover:bg-zinc-50/50"}`}>
                            <td className="p-4">
                              <button 
                                onClick={() => toggleOrderDetails(order._id)}
                                className="flex items-center gap-2 font-bold text-[#0f1b2e] text-sm hover:text-[#c69c4e] transition-colors text-left"
                              >
                                {expandedOrderId === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                {order.razorpayOrderId || order._id}
                              </button>
                              <p className="text-xs text-zinc-500 mt-1 ml-6">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-sm text-[#0f1b2e]">{order.customerDetails?.fullName || "N/A"}</p>
                              <p className="text-xs text-zinc-500">{order.customerDetails?.city}, {order.customerDetails?.state}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-[#c69c4e] text-base">₹{(order.pricing?.total || 0).toLocaleString()}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={order.orderStatus || "Pending"}
                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                className={`text-sm font-bold px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-colors cursor-pointer ${
                                  order.orderStatus === "Delivered" || order.orderStatus === "Paid" ? "bg-green-50 text-green-700 border-green-200" :
                                  order.orderStatus === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                  order.orderStatus === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" :
                                  "bg-yellow-50 text-yellow-700 border-yellow-200"
                                }`}
                              >
                                {STATUS_OPTIONS.map((status) => (
                                  <option key={status} value={status} className="bg-white text-zinc-800">{status}</option>
                                ))}
                              </select>
                            </td>
                          </tr>

                          {/* EXPANDED DETAILS ROW */}
                          {expandedOrderId === order._id && (
                            <tr className="bg-zinc-50/50">
                              <td colSpan={4} className="p-6 border-b border-zinc-200">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm animate-in slide-in-from-top-2 fade-in duration-200">
                                  
                                  {/* Column 1: Contact Info */}
                                  <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Customer Contact</h4>
                                    <div>
                                      <p className="font-bold text-[#0f1b2e] flex items-center gap-2"><User size={14} className="text-[#c69c4e]"/> {order.customerDetails?.fullName}</p>
                                      <p className="text-sm text-zinc-600 flex items-center gap-2 mt-2"><Mail size={14} className="text-[#c69c4e]"/> {order.userEmail}</p>
                                      <p className="text-sm text-zinc-600 flex items-center gap-2 mt-1"><Phone size={14} className="text-[#c69c4e]"/> {order.customerDetails?.phone}</p>
                                    </div>
                                  </div>
                                  
                                  {/* Column 2: Shipping Address */}
                                  <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Shipping Address</h4>
                                    <div className="text-sm text-zinc-600 flex items-start gap-2">
                                      <MapPin size={14} className="mt-0.5 shrink-0 text-[#c69c4e]" />
                                      <div>
                                        <p className="font-medium text-[#0f1b2e]">{order.customerDetails?.streetAddress}</p>
                                        <p className="mt-0.5">{order.customerDetails?.city}, {order.customerDetails?.state}</p>
                                        <p className="mt-0.5">PIN: {order.customerDetails?.pinCode}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Column 3: Order Items */}
                                  <div className="space-y-4 lg:border-l lg:border-zinc-100 lg:pl-6">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Purchased Items ({order.items?.length || 0})</h4>
                                    <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                      {order.items?.map((item: any) => (
                                        <div key={item.productId} className="flex items-center gap-3">
                                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-100" />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-[#0f1b2e] truncate">{item.name}</p>
                                            <p className="text-xs text-zinc-500 font-medium">Qty: {item.quantity} × ₹{item.price}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="pt-3 border-t border-zinc-100 flex justify-between font-bold text-sm text-[#0f1b2e]">
                                      <span>Total Paid:</span>
                                      <span className="text-[#c69c4e]">₹{order.pricing?.total?.toLocaleString()}</span>
                                    </div>
                                  </div>

                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* EDIT PRODUCT MODAL OVERLAY */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 p-8 space-y-6 relative animate-in zoom-in-95 duration-200 custom-scrollbar">
            <button 
              type="button"
              onClick={() => setEditingProduct(null)} 
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
            
            <div>
              <h2 className="text-2xl font-bold text-[#0f1b2e]">Edit Product</h2>
              <p className="text-zinc-500 text-sm mt-1">Modify product details below.</p>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-6">
              {/* Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Category *</label>
                  <select
                    required
                    name="category"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value, subCategory: "" })}
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]"
                  >
                    {NAV_LINKS.map(link => <option key={link.name} value={link.name}>{link.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Sub-Category *</label>
                  <input
                    required
                    type="text"
                    name="subCategory"
                    value={editingProduct.subCategory || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                    list="editSubCategoryList"
                    placeholder="Select or type..."
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]"
                  />
                  <datalist id="editSubCategoryList">
                    {editAvailableSubCategories.map((sub: string, idx: number) => <option key={idx} value={sub} />)}
                  </datalist>
                </div>
              </div>

              {/* Name & Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Product Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Price (₹) *</label>
                  <input
                    required
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Description *</label>
                <textarea
                  required
                  name="description"
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-medium text-[#0f1b2e] focus:outline-none focus:border-[#c69c4e] resize-y custom-scrollbar"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Product Image *</label>
                {!editingProduct.image ? (
                  <CldUploadWidget 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                    onSuccess={(result: any) => { 
                      if (result.info?.secure_url) {
                        setEditingProduct((prev: any) => ({ ...prev, image: result.info.secure_url }));
                      } 
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()} className="w-full flex flex-col items-center justify-center gap-2 p-6 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl hover:bg-zinc-100 hover:border-[#c69c4e] transition-all text-zinc-500 font-medium">
                        <Upload className="h-6 w-6 text-[#c69c4e] mb-1" /> Click to upload Image from PC
                      </button>
                    )}
                  </CldUploadWidget>
                ) : (
                  <div className="relative border border-zinc-200 rounded-xl p-3 bg-zinc-50 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-zinc-200 bg-white shrink-0">
                      <img src={editingProduct.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-500 truncate">{editingProduct.image}</p>
                      <p className="text-xs text-green-600 font-bold mt-1">✓ Uploaded successfully</p>
                    </div>
                    <button type="button" onClick={() => setEditingProduct((prev: any) => ({ ...prev, image: "" }))} className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button 
                  type="button" 
                  onClick={() => setEditingProduct(null)} 
                  className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="bg-[#0f1b2e] hover:bg-[#1a2b47] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-70 transition-all hover:shadow-md"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}