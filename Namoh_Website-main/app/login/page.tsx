"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // For modern inline errors instead of alerts
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStep(2);
      } else {
        setErrorMsg("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        await signIn("credentials", { 
          email, 
          redirect: false 
        });
        router.push("/");
        router.refresh(); 
      } else {
        setErrorMsg("Invalid or expired OTP code.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 py-12 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#0f1b2e] -skew-y-2 origin-top-left -z-0"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full max-w-md relative z-10 border border-zinc-100">
        
        {/* Logo or Brand Mark space */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#0f1b2e] text-[#c69c4e] rounded-full flex items-center justify-center text-2xl shadow-lg">
            ★
          </div>
        </div>

        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-extrabold text-[#0f1b2e] text-center mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-zinc-500 text-center mb-8 text-sm">
              Enter your email to receive a secure login code.
            </p>

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-zinc-800 font-medium placeholder:font-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {errorMsg && <p className="text-red-500 text-sm font-medium text-center">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#0f1b2e] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#1a2b47] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Continue with Email"}
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => { setStep(1); setOtp(""); setErrorMsg(""); }}
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#0f1b2e] transition-colors mb-4 font-medium"
            >
              <ArrowLeft size={16} /> Wrong email?
            </button>

            <h1 className="text-3xl font-extrabold text-[#0f1b2e] mb-2 tracking-tight">
              Verify your email
            </h1>
            <p className="text-zinc-500 mb-8 text-sm">
              We've sent a 6-digit secure code to <span className="font-bold text-zinc-800">{email}</span>.
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Authentication Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <ShieldCheck size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="• • • • • •"
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69c4e] focus:border-transparent transition-all text-center tracking-[0.5em] text-2xl font-bold text-zinc-800"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Forces numbers only
                  />
                </div>
              </div>

              {errorMsg && <p className="text-red-500 text-sm font-medium text-center">{errorMsg}</p>}
a
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full bg-[#c69c4e] aext-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#b0883d] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify & Sign In"}
              </button>
            </form>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-400 font-medium">
            Secure login provided by Namoh Crockery Mart
          </p>
        </div>

      </div>
    </div>
  );
}