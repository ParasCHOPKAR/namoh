import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AuthProvider from "@/components/providers/AuthProvider";

// IMPORT YOUR COMPONENTS HERE
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namoh Crockery Mart | Premium HORECA Solutions",
  description: "Complete HORECA solutions for every need. Premium quality kitchenware, glassware, hotelware, and barware trusted by hospitality professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
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

          {/* NAVBAR */}
          <Navbar />
          
          {/* MAIN PAGE CONTENT */}
          {children}
          
          {/* FOOTER */}
          <Footer />

        </AuthProvider>
        
      </body>
    </html>
  );
}