"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { Globe, Check, ChevronDown } from "lucide-react";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono text-xs z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d1117] border border-[#1f2937] hover:border-neon-cyan/60 text-gray-200 transition-all cursor-pointer shadow-sm"
        aria-label="Select Language"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="font-bold uppercase tracking-wider">{current.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180 text-neon-cyan" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[#0a0d16] border border-[#1f2937] shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1.5 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {LANGUAGES.map((item) => {
            const isSelected = item.code === lang;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLang(item.code);
                  setOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#121a2b] text-neon-cyan font-bold"
                    : "text-gray-300 hover:bg-[#101420] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.flag}</span>
                  <span className="text-xs">{item.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-neon-cyan" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
