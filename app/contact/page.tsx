"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, Package, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        // Clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
      } else {
        alert("Failed to send message. Please check your configuration and try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while sending the message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0f1b2e] text-white pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#c69c4e]/20 to-transparent rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#c69c4e]">★</span> WE ARE HERE TO HELP
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c69c4e] to-[#e8c37d]">Touch</span>
          </h1>
          <p className="text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Whether you are outfitting a new restaurant, need a bulk quotation, or have a question about an existing order, our dedicated HORECA specialists are ready to assist.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION (Cards + Form) */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE: Info Cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Headquarters Card */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-zinc-100 group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-zinc-50 text-[#0f1b2e] rounded-2xl flex items-center justify-center mb-6 border border-zinc-100 group-hover:bg-[#0f1b2e] group-hover:text-white transition-colors duration-300">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1b2e] mb-3">Headquarters</h3>
              <p className="text-zinc-600 font-medium leading-relaxed mb-4">
                123 Commercial Hub,<br />
                Industrial Area Phase 1,<br />
                Pune, Maharashtra 411001
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-[#c69c4e]">
                <Clock size={16} /> Mon-Sat, 9:00 AM - 6:00 PM
              </div>
            </div>

            {/* Direct Lines Card */}
            <div className="bg-[#0f1b2e] p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c69c4e]/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="w-12 h-12 bg-white/10 text-[#c69c4e] rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-5">Direct Lines</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="text-zinc-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-1">Bulk & Wholesale</p>
                    <a href="tel:+919876543210" className="text-lg font-bold hover:text-[#c69c4e] transition-colors">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="text-zinc-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-1">General Inquiries</p>
                    <a href="tel:+919876543211" className="text-lg font-bold hover:text-[#c69c4e] transition-colors">+91 98765 43211</a>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <Mail className="text-zinc-400 shrink-0 mt-0.5" size={18} />
                  <a href="mailto:admin.namohhoreca@gmail.com" className="text-[15px] font-semibold hover:text-[#c69c4e] transition-colors">admin.namohhoreca@gmail.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-zinc-100">
            
            {isSubmitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-extrabold text-[#0f1b2e] mb-4">Request Sent Successfully!</h3>
                <p className="text-zinc-500 text-lg max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. Our commercial sales team will review your inquiry and get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#0f1b2e] font-bold rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0f1b2e] mb-2">Send us a message</h2>
                <p className="text-zinc-500 mb-8 font-medium">Fill out the form below and we will route your request to the appropriate department.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-[#0f1b2e] mb-2 ml-1">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe" 
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium placeholder:font-normal"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-[#0f1b2e] mb-2 ml-1">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com" 
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium placeholder:font-normal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-[#0f1b2e] mb-2 ml-1">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" 
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium placeholder:font-normal"
                      />
                    </div>
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-[#0f1b2e] mb-2 ml-1">Nature of Inquiry *</label>
                      <select 
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Bulk Order Request</option>
                        <option>Product Information</option>
                        <option>Track Existing Order</option>
                        <option>Partnership / Distribution</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2e] mb-2 ml-1">Message *</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today? Please include any relevant details like quantity needed or specific item codes." 
                      rows={5}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium placeholder:font-normal resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-[#c69c4e] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#b0883d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {isLoading ? (
                      <>Sending... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Submit Request <Send size={18} /></>
                    )}
                  </button>

                  <p className="text-xs text-zinc-400 font-medium text-center sm:text-left mt-4">
                    Your data is secure. By submitting, you agree to our Privacy Policy.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </section>
      
    </div>
  );
}