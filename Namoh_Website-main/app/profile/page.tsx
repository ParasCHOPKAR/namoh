"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, MapPin, Save, Loader2, CheckCircle2, Plus, Trash2, Star } from "lucide-react";

type Address = {
  fullName: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
  streetAddress: string;
  isDefault: boolean;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState<Address>({
    fullName: "", phone: "", pinCode: "", city: "", state: "Maharashtra", streetAddress: "", isDefault: false
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/user/profile");
          const data = await res.json();
          if (data.success && data.profile?.addresses) {
            setAddresses(data.profile.addresses);
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isDefault: e.target.checked });
  };

  const saveToDatabase = async (updatedAddresses: Address[]) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.profile.addresses);
        setMessage("Address book updated successfully!");
        setTimeout(() => setMessage(""), 3000);
        setShowForm(false);
      }
    } catch (error) {
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newAddresses = [...addresses];
    
    // If setting as default, remove default from others
    if (formData.isDefault || addresses.length === 0) {
      formData.isDefault = true;
      newAddresses = newAddresses.map(addr => ({ ...addr, isDefault: false }));
    }
    
    newAddresses.push(formData);
    saveToDatabase(newAddresses);
  };

  const deleteAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    if (newAddresses.length > 0 && addresses[index].isDefault) {
      newAddresses[0].isDefault = true; // Make the first one default if we deleted the default
    }
    saveToDatabase(newAddresses);
  };

  const setAsDefault = (index: number) => {
    const newAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    saveToDatabase(newAddresses);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8f9fa]">
        <Loader2 size={40} className="animate-spin text-[#c69c4e] mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 lg:py-16">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f1b2e] mb-2">My Profile</h1>
          <p className="text-zinc-500 font-medium">Manage your account details and address book.</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 overflow-hidden mb-8">
          <div className="bg-zinc-50/50 p-6 md:p-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#0f1b2e] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              {session?.user?.email?.charAt(0).toUpperCase() || <User />}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Logged in as</p>
              <p className="text-lg font-bold text-[#0f1b2e]">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
            <CheckCircle2 size={20} className="text-green-500" />
            <span className="font-bold text-sm">{message}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-[#0f1b2e] flex items-center gap-2">
            <MapPin className="text-[#c69c4e]" size={24} /> Saved Addresses
          </h2>
          {!showForm && (
            <button onClick={() => {
              setFormData({ fullName: "", phone: "", pinCode: "", city: "", state: "Maharashtra", streetAddress: "", isDefault: false });
              setShowForm(true);
            }} className="flex items-center gap-2 bg-[#0f1b2e] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#1a2b47] transition-colors">
              <Plus size={16} /> Add New
            </button>
          )}
        </div>

        {/* LIST OF ADDRESSES */}
        {!showForm && addresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr, index) => (
              <div key={index} className={`p-6 rounded-2xl border ${addr.isDefault ? 'border-[#c69c4e] bg-[#c69c4e]/5' : 'border-zinc-200 bg-white'} relative`}>
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 bg-[#c69c4e] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} /> Default
                  </span>
                )}
                <p className="font-bold text-[#0f1b2e] text-lg mb-1">{addr.fullName}</p>
                <p className="text-sm text-zinc-600 mb-1">{addr.streetAddress}</p>
                <p className="text-sm text-zinc-600 mb-1">{addr.city}, {addr.state} - {addr.pinCode}</p>
                <p className="text-sm text-zinc-600 font-medium mb-6">Phone: {addr.phone}</p>
                
                <div className="flex items-center gap-3 border-t border-zinc-100 pt-4">
                  {!addr.isDefault && (
                    <button onClick={() => setAsDefault(index)} className="text-xs font-bold text-[#c69c4e] hover:underline">Set as Default</button>
                  )}
                  <button onClick={() => deleteAddress(index)} className="text-xs font-bold text-red-500 hover:underline ml-auto flex items-center gap-1">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showForm && addresses.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 text-center text-zinc-500">
            You haven't saved any addresses yet.
          </div>
        )}

        {/* ADD NEW FORM */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-sm animate-in fade-in space-y-6">
            <h3 className="font-bold text-[#0f1b2e] text-lg border-b border-zinc-100 pb-4">Enter Address Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">PIN Code</label>
                <input required type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-[#0f1b2e] mb-2">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]">
                  <option>Maharashtra</option><option>Gujarat</option><option>Karnataka</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0f1b2e] mb-2">Complete Street Address</label>
              <input required type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="House/Flat No., Building Name, Street" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#c69c4e]" />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isDefault || addresses.length === 0} onChange={handleCheckbox} disabled={addresses.length === 0} className="w-5 h-5 accent-[#c69c4e]" />
              <span className="font-bold text-sm text-[#0f1b2e]">Make this my default shipping address</span>
            </label>

            <div className="pt-6 border-t border-zinc-100 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-colors">Cancel</button>
              <button disabled={saving} type="submit" className="bg-[#0f1b2e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a2b47] transition-all flex items-center gap-2">
                {saving ? "Saving..." : "Save Address"} <Save size={18} />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}