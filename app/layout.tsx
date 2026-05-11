import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// 1. IMPORT YOUR NAVBAR HERE
import Navbar from "@/components/layout/Navbar"; // <-- adjust the path if your Navbar is in a different folder
import Footer from "@/components/layout/Footer"; // <-- adjust the path if your Navbar is in a different folder
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIDA Foundation",
  description: "Pioneering Healthcare Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* Google Translate Required Elements */}
        <div id="google_translate_element" className="hidden"></div>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr,ta,te,kn,ml', 
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        {/* 2. PLACE THE NAVBAR COMPONENT HERE */}
        <Navbar />
        
        {/* The rest of your pages load inside {children} */}
        {children}
        <Footer  />
        
      </body>
    </html>
  );
}