"use client";

import React from "react";
import { 
  Zap, 
  Lock, 
  Package, 
  Settings, 
  Binary, 
  ShieldAlert, 
  CheckCircle2, 
  FileCode2, 
  ShieldCheck,
  type LucideIcon 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Capabilities() {
  const { t } = useLanguage();

  const SERVICES = [
    {
      id: "pyarmor-7",
      badge: t("srv_py7_badge"),
      isFullSource: true,
      title: t("srv_py7_title"),
      tagline: t("srv_py7_tag"),
      description: t("srv_py7_desc"),
      icon: Zap,
      borderHover: "hover:border-neon-cyan hover:shadow-[0_0_35px_rgba(0,245,212,0.2)]",
      capabilities: [
        t("srv_py7_c1"),
        t("srv_py7_c2"),
        t("srv_py7_c3"),
        t("srv_py7_c4"),
      ],
      targetOutput: t("srv_py7_out"),
      turnaround: t("srv_py7_time"),
    },
    {
      id: "pyarmor-8-9",
      badge: t("srv_py8_badge"),
      isFullSource: true,
      title: t("srv_py8_title"),
      tagline: t("srv_py8_tag"),
      description: t("srv_py8_desc"),
      icon: Lock,
      borderHover: "hover:border-neon-amber hover:shadow-[0_0_35px_rgba(255,183,3,0.2)]",
      capabilities: [
        t("srv_py8_c1"),
        t("srv_py8_c2"),
        t("srv_py8_c3"),
        t("srv_py8_c4"),
      ],
      targetOutput: t("srv_py8_out"),
      turnaround: t("srv_py8_time"),
    },
    {
      id: "packed-executables",
      badge: t("srv_pyinst_badge"),
      isFullSource: true,
      title: t("srv_pyinst_title"),
      tagline: t("srv_pyinst_tag"),
      description: t("srv_pyinst_desc"),
      icon: Package,
      borderHover: "hover:border-neon-green hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]",
      capabilities: [
        t("srv_pyinst_c1"),
        t("srv_pyinst_c2"),
        t("srv_pyinst_c3"),
        t("srv_pyinst_c4"),
      ],
      targetOutput: t("srv_pyinst_out"),
      turnaround: t("srv_pyinst_time"),
    },
    {
      id: "nuitka",
      badge: t("srv_nuitka_badge"),
      isFullSource: false,
      title: t("srv_nuitka_title"),
      tagline: t("srv_nuitka_tag"),
      description: t("srv_nuitka_desc"),
      icon: Settings,
      borderHover: "hover:border-purple-500 hover:shadow-[0_0_35px_rgba(121,40,202,0.2)]",
      capabilities: [
        t("srv_nuitka_c1"),
        t("srv_nuitka_c2"),
        t("srv_nuitka_c3"),
        t("srv_nuitka_c4"),
      ],
      targetOutput: t("srv_nuitka_out"),
      turnaround: t("srv_nuitka_time"),
    },
    {
      id: "golang",
      badge: t("srv_go_badge"),
      isFullSource: false,
      title: t("srv_go_title"),
      tagline: t("srv_go_tag"),
      description: t("srv_go_desc"),
      icon: Binary,
      borderHover: "hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]",
      capabilities: [
        t("srv_go_c1"),
        t("srv_go_c2"),
        t("srv_go_c3"),
        t("srv_go_c4"),
      ],
      targetOutput: t("srv_go_out"),
      turnaround: t("srv_go_time"),
    },
    {
      id: "rust",
      badge: t("srv_rust_badge"),
      isFullSource: false,
      title: t("srv_rust_title"),
      tagline: t("srv_rust_tag"),
      description: t("srv_rust_desc"),
      icon: ShieldAlert,
      borderHover: "hover:border-orange-500 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)]",
      capabilities: [
        t("srv_rust_c1"),
        t("srv_rust_c2"),
        t("srv_rust_c3"),
        t("srv_rust_c4"),
      ],
      targetOutput: t("srv_rust_out"),
      turnaround: t("srv_rust_time"),
    },
  ];

  return (
    <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-mono mb-4 shadow-[0_0_20px_rgba(0,245,212,0.15)]">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("cap_badge")}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t("cap_title")}
        </h2>
        <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
          {t("cap_desc")}
        </p>

        {/* Scope Matrix Banner */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a121e] border border-neon-cyan/40 text-neon-cyan shadow-sm">
            <FileCode2 className="w-4 h-4" />
            <span className="font-bold">{t("cap_banner_1")}</span>
            <span className="text-gray-300">{t("cap_banner_1_sub")}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140e1c] border border-purple-500/40 text-purple-300 shadow-sm">
            <ShieldAlert className="w-4 h-4" />
            <span className="font-bold">{t("cap_banner_2")}</span>
            <span className="text-gray-300">{t("cap_banner_2_sub")}</span>
          </div>
        </div>
      </div>

      {/* Grid of 6 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {SERVICES.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className={`glass-card p-7 rounded-3xl border border-[#1f2937] ${item.borderHover} transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider ${
                      item.isFullSource
                        ? "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10"
                        : "text-purple-300 border-purple-500/40 bg-purple-500/10"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <div className="p-2.5 rounded-xl bg-gray-900/90 border border-gray-800 text-gray-300 group-hover:text-neon-cyan transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-neon-amber mb-3">{item.tagline}</p>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>

                {/* Key Bullet Points */}
                <div className="space-y-2 mb-6">
                  {item.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-mono">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          item.isFullSource ? "text-neon-cyan" : "text-purple-400"
                        }`}
                      />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Telemetry Card Footer */}
              <div className="bg-[#050608] p-3.5 rounded-2xl border border-[#1f2937] space-y-1.5">
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                  <span className="text-gray-500">{t("srv_py7_out").includes("Dossier") ? "DELIVERABLE:" : "KẾT QUẢ:"}</span>
                  <span
                    className={`font-bold ${
                      item.isFullSource ? "text-neon-cyan" : "text-purple-300"
                    }`}
                  >
                    {item.targetOutput}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                  <span className="text-gray-500">{t("srv_py7_out").includes("Dossier") ? "TURNAROUND:" : "THỜI GIAN:"}</span>
                  <span className="text-white font-semibold">{item.turnaround}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
