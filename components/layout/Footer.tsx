"use client";

import React from "react";
import { ShieldCheck, Send, MessageSquare, Users, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#030406] border-t border-[#1f2937] text-gray-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white font-black text-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0d1117] border border-neon-cyan/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-neon-cyan" />
              </div>
              <span className="text-base tracking-wider">KCRACKER.ASIA</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans max-w-sm">
              {t("foot_desc")}
            </p>
            <div className="text-[10px] text-neon-cyan font-mono bg-[#0d1117] p-2.5 rounded-xl border border-[#1f2937] inline-block">
              DOMAIN: KCRACKER.ASIA
            </div>
          </div>

          {/* Telegram Channels & Community */}
          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs">{t("foot_network")}</div>
            <ul className="space-y-2.5 text-gray-400 text-xs">
              <li>
                <a
                  href="https://t.me/kcracker007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-cyan transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>{t("foot_channel")}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/cybercrlm3chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-amber transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-neon-amber" />
                  <span>{t("foot_group")}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/tnk_k07vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-green transition-colors flex items-center gap-1.5 font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neon-green" />
                  <span>{t("foot_admin")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Vectors */}
          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs">{t("foot_core")}</div>
            <ul className="space-y-2.5 text-gray-400 text-xs">
              <li><a href="#capabilities" className="hover:text-neon-cyan transition-colors">PyArmor 7 Structure Recovery</a></li>
              <li><a href="#capabilities" className="hover:text-neon-cyan transition-colors">PyArmor 8/9 Memory JIT Audit</a></li>
              <li><a href="#capabilities" className="hover:text-neon-cyan transition-colors">PyInstaller PYZ Decompression</a></li>
              <li><a href="#capabilities" className="hover:text-neon-cyan transition-colors">Nuitka, Go & Rust Binary Audit</a></li>
            </ul>
          </div>

          {/* Direct Contact Admin Box */}
          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs">{t("foot_requests")}</div>
            <div className="text-xs text-gray-300 space-y-2 font-mono">
              <div className="text-white font-bold">{t("foot_contact_btn")}</div>
              <a
                href="https://t.me/tnk_k07vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/20 transition-all font-bold"
              >
                <Send className="w-4 h-4" />
                <span>@tnk_k07vn</span>
              </a>
              <div className="text-neon-green pt-1 flex items-center gap-1 font-bold text-[11px]">
                <FileCheck className="w-3.5 h-3.5 text-neon-green" />
                <span>{t("foot_sla")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#161f2e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} {t("foot_rights")}
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-400">ADMIN: @tnk_k07vn</span>
            <span className="text-neon-cyan font-bold">KCRACKER.ASIA // ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
