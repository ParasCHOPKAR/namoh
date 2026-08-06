"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, HelpCircle, PhoneCall, Mail, MessageSquare, 
  ArrowRight, BookOpen, CheckCircle2, Clock
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
  category: "general" | "orders" | "commercial" | "products";
};

const FAQ_DATA: FAQItem[] = [
  {
    category: "general",
    question: "What is Namoh Horeca Solutions?",
    answer: "Namoh Horeca Solutions is a premium provider of complete commercial kitchenware, glassware, hotelware, and barware. We cater to the hospitality, restaurant, catering (HORECA), and professional food service industries, offering curated collections from leading global brands."
  },
  {
    category: "general",
    question: "Where is your showroom located?",
    answer: "Our main showroom is located at Sr No.429, Siddhi Height, Guruwar Peth, Krishna Hatti Chowk, Pune-411042. We welcome businesses and hospitality professionals to visit us to inspect the quality of our collections firsthand."
  },
  {
    category: "general",
    question: "What are your business hours?",
    answer: "We are open Monday through Saturday from 9:00 AM to 6:00 PM. We are closed on Sundays and national public holidays."
  },
  {
    category: "orders",
    question: "How long does shipping take?",
    answer: "Orders are typically processed within 24–48 hours. Standard domestic delivery across India takes between 3 to 7 business days, depending on your city and state. Remote areas may require additional transit time."
  },
  {
    category: "orders",
    question: "How can I track my order?",
    answer: "Once your order is processed and ready for dispatch, you will receive a tracking link via email. You can also track your order status directly from the 'Track Order' option in the top navbar or footer of our website by entering your Order ID."
  },
  {
    category: "orders",
    question: "What is your return and refund policy?",
    answer: "We accept returns for defective, damaged, or incorrect shipments within 7 days of delivery. Due to the professional nature of commercial tableware and kitchenware, items must be in unused, original packaging. Please reach out to customer support to register a return request."
  },
  {
    category: "commercial",
    question: "Do you offer wholesale discounts for bulk orders?",
    answer: "Yes, we offer special tier-based wholesale pricing and custom commercial quotations for large volumes, hospitality launches, and corporate supply. Please contact our commercial sales specialists via the Contact page or Bulk Orders form."
  },
  {
    category: "commercial",
    question: "Can you assist with custom logo branding or personalization?",
    answer: "Yes! We provide custom branding (logo printing and etching) on select glassware, ceramics, hotelware, and serverware for bulk orders. Additional lead times apply for customized hospitality goods."
  },
  {
    category: "commercial",
    question: "Do you provide consultancy for outfitting new restaurants?",
    answer: "Absolutely. Our expert HORECA team offers consultation services to help outfit new cafes, restaurants, bars, and hotels. We assist with product selection, quantity planning, and logistics scheduling to fit your launch timeline."
  },
  {
    category: "products",
    question: "Are your glassware and tableware items dishwasher safe?",
    answer: "Most of our professional glassware (including Ocean and Arcoroc) and melamine hotelware are commercial dishwasher safe. Specific premium glassware or custom metallic-rimmed plates may require handwashing to prolong their finish. Care instructions are provided on product packaging."
  },
  {
    category: "products",
    question: "What brands do you represent?",
    answer: "We represent a wide range of leading global commercial brands, including Cambro, Ocean, DineWell, Electrolux, Winterhalter, Sirman, Hatco, Dipo Induction, and Arcoroc, ensuring professional grade quality and compliance."
  },
  {
    category: "products",
    question: "Do your products come with commercial warranties?",
    answer: "Electrical and mechanical kitchen equipment (such as coffee machines, grinders, and induction cooktops) come with standard manufacturer commercial warranties, typically ranging from 1 to 2 years. Tableware, glassware, and plastics are checked for defect-free dispatch but do not carry long-term warranties."
  }
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "general", label: "General" },
  { id: "orders", label: "Orders & Shipping" },
  { id: "commercial", label: "Bulk & Commercial" },
  { id: "products", label: "Products & Quality" }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    document.title = "Frequently Asked Questions | Namoh Crockery Mart";
  }, []);

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const filteredFAQs = activeCategory === "all" 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16 lg:py-24">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-[#c69c4e] text-xs font-bold uppercase tracking-[0.25em] bg-[#c69c4e]/10 px-4 py-2 rounded-full inline-block mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f1b2e] tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-500 font-medium max-w-xl mx-auto text-[15px] md:text-base leading-relaxed">
            Quickly find answers to common questions about our products, ordering process, bulk discounts, and shipping services.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndexes([]); // Close all on category switch
              }}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#0f1b2e] text-white shadow-md shadow-[#0f1b2e]/10 scale-[1.03]"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, idx) => {
              // Map index to the original list or keep unique per category view
              const isOpen = openIndexes.includes(idx);

              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-[1.5rem] border transition-all duration-300 ${
                    isOpen 
                      ? "border-[#c69c4e]/40 shadow-[0_10px_30px_rgba(198,156,78,0.06)]" 
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 md:py-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="font-extrabold text-[#0f1b2e] text-[15px] md:text-[17px] leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200/60 flex items-center justify-center shrink-0 text-[#0f1b2e] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#c69c4e]/10 text-[#c69c4e] border-[#c69c4e]/20" : ""
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[300px] border-t border-zinc-100" : "max-h-0"
                  }`}>
                    <p className="px-6 py-5 text-zinc-500 font-medium text-sm md:text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center bg-white rounded-[2rem] border border-zinc-200 p-12 flex flex-col items-center">
              <HelpCircle size={40} className="text-zinc-200 mb-3" />
              <p className="font-bold text-[#0f1b2e]">No questions found</p>
              <p className="text-xs text-zinc-500 mt-1">Try switching to another category tab.</p>
            </div>
          )}
        </div>

        {/* Customer Support CTA */}
        <div className="bg-[#0f1b2e] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl animate-in fade-in duration-1000">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c69c4e]/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <span className="text-[#c69c4e] text-xs font-bold uppercase tracking-wider block mb-2">
                Still have questions?
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
                Can't find what you are looking for?
              </h3>
              <p className="text-zinc-400 font-medium text-sm md:text-[15px] leading-relaxed">
                Contact our commercial sales and customer care division directly. Our team of HORECA experts will be happy to assist you.
              </p>
            </div>

            <Link 
              href="/contact" 
              className="bg-[#c69c4e] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#b0883d] transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-[#c69c4e]/20"
            >
              Get Support <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
