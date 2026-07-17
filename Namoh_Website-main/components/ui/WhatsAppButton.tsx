// src/components/ui/WhatsAppButton.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <Link 
      href="https://wa.me/91XXXXXXXXXX" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Contact support on WhatsApp"
    >
      <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" width={32} height={32} />
    </Link>
  );
}