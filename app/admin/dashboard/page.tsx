"use client";

import React, { useState, useMemo } from "react";
import { PackagePlus, Upload, LayoutDashboard, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";

// --- CATEGORY DATA (Extracted from your Navbar) ---
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

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "", // The specific product name
    price: "",
    category: "KITCHENWARE", // Default main category
    subCategory: "", // This will be the dropdown/typeable field
    image: "",
    description: "",
  });

  // Calculate dynamic sub-categories based on the selected Main Category
  const availableSubCategories = useMemo(() => {
    const selectedCat = NAV_LINKS.find(cat => cat.name === formData.category);
    if (!selectedCat || !selectedCat.subItems) return [];
    
    // Extract just the names of the sub-items for the datalist
    return selectedCat.subItems.map(item => {
      if (typeof item === 'object' && item !== null && 'name' in item) {
        return item.name;
      }
      return item as string;
    });
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If they change the main category, clear the sub-category so it doesn't hold an invalid selection
    if (name === "category") {
      setFormData({ ...formData, [name]: value, subCategory: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price), // Convert price to number for database
        }),
      });

      if (res.ok) {
        setSuccessMsg("Product successfully added to catalog!");
        // Reset form but keep the selected category for faster data entry
        setFormData({ 
          name: "", price: "", 
          category: formData.category, 
          subCategory: "", image: "", description: "" 
        });
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        alert("Failed to add product. Check permissions.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#0f1b2e] text-white flex flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c69c4e] rounded-lg flex items-center justify-center font-bold">N</div>
          <span className="font-bold tracking-widest uppercase">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-[#c69c4e] rounded-xl font-medium transition-colors">
            <PackagePlus size={18} /> Add Product
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
            <LayoutDashboard size={18} /> View Catalog
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Settings size={18} /> Settings
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl font-medium transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-[#0f1b2e] mb-2">Add New Product</h1>
            <p className="text-zinc-500 font-medium">Publish a new item directly to the Namoh Crockery database.</p>
          </div>

          {successMsg && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
              
              {/* CATEGORY SELECTION ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                {/* Main Category */}
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Main Category *</label>
                  <select 
                    required 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-bold text-[#0f1b2e] cursor-pointer"
                  >
                    {NAV_LINKS.map(link => (
                      <option key={link.name} value={link.name}>{link.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sub-Category (Combobox / Datalist) */}
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Sub-Category Collection *</label>
                  <input 
                    required 
                    type="text" 
                    name="subCategory" 
                    value={formData.subCategory} 
                    onChange={handleChange} 
                    list="subCategoryList"
                    placeholder="Select from list or type custom name..." 
                    className="w-full px-5 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-bold text-[#0f1b2e]"
                  />
                  {/* Dynamic HTML Datalist */}
                  <datalist id="subCategoryList">
                    {availableSubCategories.map((sub, idx) => (
                      <option key={idx} value={sub} />
                    ))}
                  </datalist>
                  <p className="text-xs text-zinc-500 mt-2 font-medium">Type a name to search the dropdown, or type a custom name.</p>
                </div>
              </div>

              {/* NAME & PRICE ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specific Product Name */}
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Specific Product Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. 10L Heavy Duty Stand Mixer" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-bold text-[#0f1b2e]" />
                </div>
                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Price (₹) *</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-bold text-[#0f1b2e]" />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Image URL *</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-zinc-400"><Upload size={18} /></div>
                  <input required type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full pl-12 pr-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-medium text-[#0f1b2e]" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Product Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Enter technical specifications, dimensions, and material details..." className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] transition-all font-medium text-[#0f1b2e] resize-none"></textarea>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-zinc-100 flex justify-end">
                <button disabled={loading} type="submit" className="bg-[#0f1b2e] hover:bg-[#1a2b47] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? "Publishing..." : "Publish Product to Database"} <PackagePlus size={18} />
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

    </div>
  );
}