"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight, ShieldCheck, Send } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050608]/90 border-b border-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - KCRACKER.ASIA */}
        <a href="#" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#0d1117] border border-neon-cyan/50 flex items-center justify-center group-hover:border-neon-cyan shadow-[0_0_20px_rgba(0,245,212,0.35)] transition-all">
            <ShieldCheck className="w-5 h-5 text-neon-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-black tracking-wider text-white group-hover:text-neon-cyan transition-colors">
              KCRACKER<span className="text-neon-cyan">.ASIA</span>
            </span>
            <span className="font-mono text-[9px] text-neon-amber uppercase tracking-widest font-bold">
              {t("brand_sub")}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs">
          <a
            href="#capabilities"
            className="text-gray-300 hover:text-neon-cyan transition-colors flex items-center gap-1 font-semibold"
          >
            <span>{t("nav_services")}</span>
          </a>
          <a
            href="https://t.me/kcracker007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:underline flex items-center gap-1.5 font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("nav_channel")}</span>
          </a>
          <a
            href="https://t.me/cybercrlm3chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-amber hover:underline flex items-center gap-1.5 font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("nav_group")}</span>
          </a>
        </nav>

        {/* Header Right Actions & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href="https://t.me/tnk_k07vn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-neon-cyan text-obsidian font-mono text-xs font-black hover:bg-[#00d8bc] transition-all shadow-[0_0_20px_rgba(0,245,212,0.35)] flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("nav_contact")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger & Lang */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1117] border-b border-[#1f2937] px-5 py-6 space-y-4 font-mono text-sm">
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-neon-cyan font-bold"
          >
            {t("nav_services")}
          </a>
          <a
            href="https://t.me/kcracker007"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-neon-cyan font-bold"
          >
            TELEGRAM CHANNEL: @kcracker007
          </a>
          <a
            href="https://t.me/cybercrlm3chat"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-neon-amber font-bold"
          >
            COMMUNITY GROUP: @cybercrlm3chat
          </a>
          <div className="pt-4 border-t border-[#1f2937]">
            <a
              href="https://t.me/tnk_k07vn"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 rounded-xl bg-neon-cyan text-obsidian font-black flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t("nav_contact")}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
