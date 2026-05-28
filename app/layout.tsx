import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/context/CartContext"; // 1. IMPORT THIS

import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namoh Crockery Mart | Premium HORECA Solutions",
  description: "Complete HORECA solutions for every need.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {/* 2. WRAP EVERYTHING IN CART PROVIDER */}
          <CartProvider>
            
            <div id="google_translate_element" className="hidden"></div>
            {/* ... keep your existing translation scripts here ... */}
            
            <Navbar />
            {children}
            <Footer />

          </CartProvider>
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}