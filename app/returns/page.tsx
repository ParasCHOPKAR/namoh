"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCcw } from "lucide-react";

export default function ReturnsPage() {
  useEffect(() => {
    document.title = "Returns & Refunds | Namoh Crockery Mart";
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 lg:py-24">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-[#c69c4e] text-xs font-bold uppercase tracking-[0.25em] bg-[#c69c4e]/10 px-4 py-2 rounded-full inline-block mb-4">
            Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f1b2e] tracking-tight mb-4">
            Returns & Refunds
          </h1>
          <p className="text-zinc-500 font-medium max-w-xl mx-auto text-[15px] md:text-base leading-relaxed">
            Our comprehensive returns and refund policy for all commercial and retail purchases.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[1.5rem] border border-zinc-200 p-8 md:p-12 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 shadow-sm text-zinc-600 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-[#0f1b2e] mb-4 flex items-center gap-2">
              <RefreshCcw className="text-[#c69c4e]" size={20} />
              7-Day Return Policy
            </h2>
            <p className="leading-relaxed">
              We accept returns for defective, damaged, or incorrect shipments within 7 days of delivery. Due to the professional nature of commercial tableware and kitchenware, items must be in their <strong>unused, original packaging</strong>. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1b2e] mb-4">How to Request a Return</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Contact our customer support team via email or phone within 7 days of receiving your order.</li>
              <li>Provide your Order ID and photographic evidence if the item is damaged or defective.</li>
              <li>Once approved, securely pack the items in their original packaging.</li>
              <li>We will arrange a reverse pickup or provide you with a return shipping address.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1b2e] mb-4">Refund Process</h2>
            <p className="leading-relaxed">
              Once we receive your returned items, our quality control team will inspect them. If the return is approved, your refund will be processed to the original method of payment within 5-7 business days. Please note that shipping charges are non-refundable unless the return is due to our error.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1b2e] mb-4">Non-Returnable Items</h2>
            <p className="leading-relaxed">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2">
              <li>Custom branded or etched products.</li>
              <li>Items that have been used, washed, or altered.</li>
              <li>Clearance or final sale items.</li>
            </ul>
          </section>

        </div>

        {/* Customer Support CTA */}
        <div className="bg-[#0f1b2e] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl animate-in fade-in duration-1000">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c69c4e]/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <span className="text-[#c69c4e] text-xs font-bold uppercase tracking-wider block mb-2">
                Need Help?
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
                Want to initiate a return?
              </h3>
              <p className="text-zinc-400 font-medium text-sm md:text-[15px] leading-relaxed">
                Contact our customer care division directly. Our team will guide you through the return process.
              </p>
            </div>

            <Link 
              href="/contact" 
              className="bg-[#c69c4e] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#b0883d] transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-[#c69c4e]/20"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
