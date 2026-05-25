import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Utensils, Package, Award, ChevronRight, CheckCircle2, Target, Eye } from "lucide-react";

export const metadata = {
  title: "About Us | Namoh Crockery Mart",
  description: "Learn about Namoh Crockery Mart, your premium partner for complete HORECA solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-hidden">
      
      {/* 1. ANIMATED HERO SECTION */}
      <section className="relative bg-[#0f1b2e] text-white py-28 lg:py-40 overflow-hidden">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#c69c4e]/20 to-transparent rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1a2b47] to-transparent rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-bold tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#c69c4e]">★</span> ESTABLISHED EXCELLENCE
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 leading-[1.1]">
            Elevating the Art of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c69c4e] to-[#e8c37d]">Hospitality</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            The trusted procurement partner for premium restaurants, hotels, and cafes. We engineer environments for culinary success.
          </p>
        </div>
      </section>

      {/* 2. ASYMMETRICAL STORY & LEGACY */}
      <section className="py-24 lg:py-32 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image Container with floating offset */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="relative h-[500px] lg:h-[650px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0f1b2e]/10 border-8 border-white z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-700 ease-out">
              <Image 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional Chef Plating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b2e]/90 via-[#0f1b2e]/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-bold text-3xl mb-1">Precision.</p>
                <p className="text-[#c69c4e] font-bold tracking-[0.2em] text-xs">IN EVERY DETAIL</p>
              </div>
            </div>
            {/* Decorative back-box */}
            <div className="absolute top-8 -right-8 w-full h-full rounded-[2rem] border-2 border-[#c69c4e]/30 -z-10 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
          </div>
          
          {/* Text Content */}
          <div className="w-full lg:w-7/12 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#c69c4e]"></span>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Our Blueprint</h2>
            </div>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0f1b2e] mb-8 leading-[1.15] tracking-tight">
              Built for the <br /> <span className="text-[#c69c4e]">Commercial Kitchen.</span>
            </h3>
            
            <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-medium">
              <p>
                What started as a vision to supply high-quality equipment to local cafes has evolved into a comprehensive, nationwide supply chain. We understand that in a professional setting, downtime is not an option.
              </p>
              
              <ul className="space-y-5 my-10">
                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                  <div className="bg-zinc-100 p-2 rounded-lg text-[#c69c4e] shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <strong className="text-[#0f1b2e] block text-xl mb-1">Industrial Grade Durability</strong>
                    <span className="text-sm text-zinc-500">Sourcing materials designed to withstand thousands of service cycles without compromising integrity.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                  <div className="bg-zinc-100 p-2 rounded-lg text-[#c69c4e] shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <strong className="text-[#0f1b2e] block text-xl mb-1">Aesthetic Brilliance</strong>
                    <span className="text-sm text-zinc-500">Curating tableware that elevates the presentation of every dish and enhances the dining experience.</span>
                  </div>
                </li>
              </ul>

              <div className="pl-6 border-l-4 border-[#c69c4e] py-2">
                <p className="font-bold text-[#0f1b2e] text-xl italic leading-snug">
                  "We don't just sell crockery; we provide the infrastructure for your culinary success."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: MISSION & VISION SECTION */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="group relative bg-zinc-50 rounded-[2.5rem] p-10 lg:p-14 overflow-hidden hover:shadow-2xl hover:shadow-[#0f1b2e]/5 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                <Target size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#0f1b2e] text-[#c69c4e] rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-[#0f1b2e] mb-4 tracking-tight">Our Mission</h3>
                <p className="text-zinc-600 text-lg leading-relaxed font-medium">
                  To empower hospitality professionals by providing uninterrupted access to world-class tools and equipment. We strive to be the invisible force behind every seamless service, delivering reliability, quality, and innovation directly to your kitchen.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-[#0f1b2e] rounded-[2.5rem] p-10 lg:p-14 overflow-hidden hover:shadow-2xl hover:shadow-[#c69c4e]/20 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 text-white">
                <Eye size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 text-[#c69c4e] rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Eye size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Our Vision</h3>
                <p className="text-zinc-300 text-lg leading-relaxed font-medium">
                  To redefine the standard of HORECA procurement globally. We envision a future where sourcing premium hospitality supplies is effortless, transparent, and instantly scalable, allowing chefs and hoteliers to focus entirely on their craft.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MODERN GLASSMORPHIC FEATURES GRID */}
      <section className="bg-[#0f1b2e] py-24 lg:py-32 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#c69c4e]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] mb-6 text-zinc-400">
              WHY PARTNER WITH US
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">The Namoh Standard</h2>
            <p className="text-zinc-400 text-lg font-medium">Streamlining procurement with unmatched reliability and a curated inventory of global brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Cards with staggered animation and hover effects */}
            {[
              { icon: ShieldCheck, title: "Rigorous Quality", desc: "Every item passes strict commercial resilience testing for daily heavy use." },
              { icon: Utensils, title: "Curated Selection", desc: "From heavy machinery to elegant fine-dining tableware, all in one place." },
              { icon: Package, title: "Volume Logistics", desc: "Specialized shipping and tiered pricing structures for large-scale rollouts." },
              { icon: Award, title: "Global Partners", desc: "Authorized distributors for elite brands like Milton, Borosil, and Ocean." }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-[#c69c4e]/50 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white/5 text-[#c69c4e] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#c69c4e] group-hover:text-white transition-colors duration-300">
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 4. FLOATING CALL TO ACTION */}
      <section className="py-24 lg:py-32 max-w-[1000px] mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-10 lg:p-20 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-700">
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-zinc-100 relative z-10">
            <span className="text-3xl text-[#0f1b2e]">★</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f1b2e] mb-6 tracking-tight relative z-10">Ready to upgrade your service?</h2>
          <p className="text-zinc-500 mb-12 max-w-xl mx-auto text-lg font-medium relative z-10">
            Connect with our enterprise team today for custom quotations, volume discounts, and dedicated account management.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/catalog" className="bg-[#0f1b2e] hover:bg-[#1a2b47] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
              Explore Catalog
            </Link>
            <Link href="/contact" className="bg-white hover:bg-zinc-50 text-[#0f1b2e] border-2 border-zinc-200 px-8 py-4 rounded-2xl font-bold transition-all hover:border-[#c69c4e] flex items-center gap-2 w-full sm:w-auto justify-center group">
              Contact Sales <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}