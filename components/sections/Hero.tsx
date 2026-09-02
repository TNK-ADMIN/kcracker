"use client";

import React from "react";
import HeroModel from "@/components/canvas/HeroModel";
import { ShieldCheck, ArrowUpRight, Layers, Send, MessageSquare, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dynamic Background Multi-chromatic Light Cones */}
      <div className="absolute top-10 left-1/4 w-[550px] h-[350px] bg-[#00f5d4]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-28 right-1/4 w-[450px] h-[300px] bg-[#7928ca]/18 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-48 left-1/2 w-[350px] h-[250px] bg-[#ffb703]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Top Telemetry Flash Announcement */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neon-cyan/50 bg-[#0d1117]/90 text-xs font-mono shadow-[0_0_25px_rgba(0,245,212,0.25)]">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
          <span className="text-neon-cyan font-bold">KCRACKER.ASIA</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-200 font-medium">{t("hero_badge_sub")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-5 space-y-6 z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-black text-white tracking-tight leading-[1.1] break-words hyphens-auto">
            {t("hero_title_1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-amber neon-glow-text break-words">
              {t("hero_title_2")}
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
            {t("hero_desc")}
          </p>

          {/* High-density Telemetry Metrics Bento - Auto-wrapping & Fully Visible Text */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            <div className="glass-card p-3 sm:p-3.5 rounded-2xl border border-[#1f2937] hover:border-neon-cyan/50 transition-all flex flex-col justify-between">
              <div className="text-lg sm:text-xl xl:text-2xl font-mono font-black text-neon-cyan tracking-tight whitespace-nowrap">{t("metric_1_val")}</div>
              <div className="text-[9.5px] sm:text-[10px] font-mono text-gray-400 uppercase mt-1 font-bold leading-tight">{t("metric_1_label")}</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-neon-green mt-0.5 font-semibold leading-tight">{t("metric_1_sub")}</div>
            </div>

            <div className="glass-card p-3 sm:p-3.5 rounded-2xl border border-[#1f2937] hover:border-purple-500/50 transition-all flex flex-col justify-between">
              <div className="text-base sm:text-lg xl:text-xl font-mono font-black text-purple-400 tracking-tight whitespace-nowrap">{t("metric_2_val")}</div>
              <div className="text-[9.5px] sm:text-[10px] font-mono text-gray-400 uppercase mt-1 font-bold leading-tight">{t("metric_2_label")}</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-purple-300 mt-0.5 font-semibold leading-tight">{t("metric_2_sub")}</div>
            </div>

            <div className="glass-card p-3 sm:p-3.5 rounded-2xl border border-[#1f2937] hover:border-neon-green/50 transition-all flex flex-col justify-between">
              <div className="text-lg sm:text-xl xl:text-2xl font-mono font-black text-neon-green tracking-tight whitespace-nowrap">{t("metric_3_val")}</div>
              <div className="text-[9.5px] sm:text-[10px] font-mono text-gray-400 uppercase mt-1 font-bold leading-tight">{t("metric_3_label")}</div>
              <div className="text-[9px] sm:text-[9.5px] font-mono text-neon-cyan mt-0.5 font-semibold leading-tight">{t("metric_3_sub")}</div>
            </div>
          </div>

          {/* Social Quick Connect Hub */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
            <a
              href="https://t.me/kcracker007"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 sm:p-3 rounded-2xl border border-[#1f2937] hover:border-neon-cyan/60 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white truncate w-full">{t("btn_channel")}</span>
              <span className="text-[8.5px] sm:text-[9px] font-mono text-neon-cyan truncate w-full">@kcracker007</span>
            </a>

            <a
              href="https://t.me/cybercrlm3chat"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 sm:p-3 rounded-2xl border border-[#1f2937] hover:border-neon-amber/60 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-neon-amber mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white truncate w-full">{t("btn_group")}</span>
              <span className="text-[8.5px] sm:text-[9px] font-mono text-neon-amber truncate w-full">@cybercrlm3chat</span>
            </a>

            <a
              href="https://t.me/tnk_k07vn"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 sm:p-3 rounded-2xl border border-[#1f2937] hover:border-neon-green/60 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-neon-green mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white truncate w-full">{t("btn_admin")}</span>
              <span className="text-[8.5px] sm:text-[9px] font-mono text-neon-green truncate w-full">@tnk_k07vn</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a
              href="https://t.me/tnk_k07vn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-neon-cyan text-obsidian font-mono text-xs sm:text-sm font-black hover:bg-[#00d8bc] transition-all shadow-[0_0_30px_rgba(0,245,212,0.45)] hover:shadow-[0_0_45px_rgba(0,245,212,0.7)] flex items-center gap-2 group cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t("btn_order")}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#capabilities"
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#0d1117] hover:bg-[#121824] text-white border border-[#1f2937] hover:border-neon-cyan/60 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Layers className="w-4 h-4 text-neon-cyan" />
              <span>{t("btn_view_services")}</span>
            </a>
          </div>

          {/* Trust Footnote */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400 pt-2 border-t border-[#1f2937]/70">
            <span className="flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-neon-green" /> {t("trust_1")}
            </span>
            <span className="text-gray-700">&bull;</span>
            <span className="text-gray-300">{t("trust_2")}</span>
            <span className="text-gray-700">&bull;</span>
            <span className="text-neon-cyan font-bold">{t("trust_3")}</span>
          </div>
        </div>

        {/* Right Column: Interactive Analysis Workspace */}
        <div className="lg:col-span-7 relative w-full overflow-hidden">
          <div className="relative glass-card rounded-3xl p-2.5 sm:p-3 border border-charcoal-border neon-border-cyan overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)]">
            {/* Corner Blueprint Cyber Markers */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-neon-cyan z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-neon-cyan z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-neon-cyan z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-neon-cyan z-20 pointer-events-none" />

            <HeroModel />
          </div>
        </div>
      </div>
    </section>
  );
}
