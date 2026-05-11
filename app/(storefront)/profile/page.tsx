import React from "react";
import Link from "next/link";
import { 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  UserCircle 
} from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-zinc-50 pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">My Account</h1>
          <p className="text-zinc-500 mt-2">Manage your orders, addresses, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm sticky top-28">
              
              {/* User Mini Profile */}
              <div className="flex items-center gap-4 p-4 mb-4 border-b border-zinc-100">
                <div className="w-12 h-12 bg-[#3E5C54]/10 rounded-full flex items-center justify-center text-[#3E5C54]">
                  <UserCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-950 text-sm">Guest User</h3>
                  <p className="text-xs text-zinc-500">guest@namoh.com</p>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="space-y-1">
                <Link href="/profile" className="flex items-center justify-between px-4 py-3 bg-[#3E5C54] text-white rounded-xl text-sm font-medium transition-colors">
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span>Orders</span>
                  </div>
                </Link>
                <Link href="#" className="flex items-center justify-between px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl text-sm font-medium transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </div>
                </Link>
                <Link href="#" className="flex items-center justify-between px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl text-sm font-medium transition-colors">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>Addresses</span>
                  </div>
                </Link>
                <Link href="#" className="flex items-center justify-between px-4 py-3 text-zinc-600 hover:bg-zinc-50 rounded-xl text-sm font-medium transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </div>
                </Link>
                
                <div className="pt-4 mt-4 border-t border-zinc-100">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>

            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-8">
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-zinc-950">3</p>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600">
                  <Heart size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Wishlist Items</p>
                  <p className="text-2xl font-bold text-zinc-950">12</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="font-bold text-zinc-950 text-lg">Recent Orders</h2>
                <Link href="#" className="text-sm text-[#3E5C54] font-medium hover:underline">View All</Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-600">
                  <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-lg">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4 text-right rounded-tr-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    
                    {/* Mock Order 1 */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900">#ORD-9483</td>
                      <td className="px-6 py-4">May 02, 2026</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Delivered</span>
                      </td>
                      <td className="px-6 py-4 font-medium">₹12,450</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#3E5C54] hover:text-zinc-950 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>

                    {/* Mock Order 2 */}
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900">#ORD-8271</td>
                      <td className="px-6 py-4">Apr 15, 2026</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Processing</span>
                      </td>
                      <td className="px-6 py-4 font-medium">₹4,200</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#3E5C54] hover:text-zinc-950 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}