"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Compliance() {
  const { t } = useLanguage();

  const certifications = [
    {
      title: t("comp_t1"),
      desc: t("comp_t1_desc"),
      badge: "AIR-GAPPED",
      accent: "border-neon-cyan/40 text-neon-cyan",
    },
    {
      title: t("comp_t2"),
      desc: t("comp_t2_desc"),
      badge: "VERIFIED",
      accent: "border-neon-green/40 text-neon-green",
    },
    {
      title: t("comp_t3"),
      desc: t("comp_t3_desc"),
      badge: "SECURE LAB",
      accent: "border-neon-amber/40 text-neon-amber",
    },
    {
      title: t("comp_t4"),
      desc: t("comp_t4_desc"),
      badge: "CONFIDENTIAL",
      accent: "border-purple-400/40 text-purple-400",
    },
  ];

  return (
    <section id="compliance" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1f2937]/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/40 bg-neon-green/10 text-neon-green text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <ShieldCheck className="w-4 h-4" />
            <span>{t("comp_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("comp_title")}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
            {t("comp_desc")}
          </p>

          <div className="pt-3 flex flex-wrap gap-2.5">
            <span className="px-3.5 py-2 rounded-xl glass-card text-xs font-mono text-gray-200 flex items-center gap-2 border border-[#1f2937]">
              <CheckCircle2 className="w-4 h-4 text-neon-green" /> {t("trust_1")}
            </span>
            <span className="px-3.5 py-2 rounded-xl glass-card text-xs font-mono text-gray-200 flex items-center gap-2 border border-[#1f2937]">
              <CheckCircle2 className="w-4 h-4 text-neon-green" /> {t("comp_t1")}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certifications.map((c, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl border border-[#1f2937] hover:border-neon-cyan/50 transition-all hover:shadow-[0_0_25px_rgba(0,245,212,0.12)]"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#050608] border ${c.accent} mb-3 shadow-sm`}>
                {c.badge}
              </span>
              <h3 className="text-base font-bold text-white mb-1.5">{c.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
