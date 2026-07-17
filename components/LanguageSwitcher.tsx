"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import gsap from "gsap";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animation for the dropdown
  useEffect(() => {
    const menu = document.querySelector(".lang-menu");
    if (isOpen) {
      gsap.to(menu, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out", display: "block" });
    } else {
      gsap.to(menu, { autoAlpha: 0, y: -10, duration: 0.2, ease: "power2.in", display: "none" });
    }
  }, [isOpen]);

  // Function to handle translation
  const handleLanguageChange = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);

    // Find the hidden Google Translate dropdown in the DOM and force it to change
    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleSelect) {
      googleSelect.value = lang.code;
      googleSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-zinc-100 transition-colors duration-300 text-sm font-bold text-zinc-700"
      >
        <Globe className="w-4 h-4 text-[#004b87]" />
        <span className="hidden sm:inline-block">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* The Dropdown Menu */}
      <div className="lang-menu absolute top-full right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-xl rounded-2xl overflow-hidden opacity-0 hidden z-50">
        <div className="p-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-colors duration-200 ${
                currentLang.code === lang.code 
                  ? "bg-[#004b87]/10 text-[#004b87] font-bold" 
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <div className="flex flex-col items-start">
                <span>{lang.name}</span>
                <span className="text-[10px] text-zinc-400 font-medium">{lang.native}</span>
              </div>
              {currentLang.code === lang.code && <Check className="w-4 h-4 text-[#F28500]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}