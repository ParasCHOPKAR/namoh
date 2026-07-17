import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Script from "next/script";
// 👇 FIX 1: Added curly braces to properly import the named export
import { AuthProvider } from "@/components/providers/AuthProvider"; 

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namoh Horeca Solutions | Premium Crockery Mart",
  description: "Complete HORECA solutions for every need.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* AuthProvider now handles Session, Cart, AND Wishlist automatically! */}
        <AuthProvider>
          
          <div id="google_translate_element" className="hidden"></div>
          {/* ... keep your existing translation scripts here ... */}

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
          <ScrollToTop />

        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}