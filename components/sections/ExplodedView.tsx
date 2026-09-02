"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Layers, Binary, ArrowRight, CheckCircle2, Zap, FileCode2, KeyRound } from "lucide-react";

const STEPS = [
  {
    id: 1,
    stepTag: "STAGE 01 // INGESTION & UNPACKING",
    title: "Binary Analysis & Archive Extraction",
    subtitle: "PyInstaller PYZ Extraction, PE/ELF Header Triage & Format Detection",
    description:
      "We identify protection wrappers, decrypt PyInstaller/py2exe PYZ bytecode archives, reconstruct missing magic header signatures, and isolate raw compiled blobs.",
    icon: Box,
    badgeColor: "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10",
    telemetry: [
      { label: "Target Formats", value: "PyInstaller, ELF, PE32+, Mach-O" },
      { label: "Extraction Tooling", value: "Custom PYZ Archive Extractor" },
      { label: "Metadata Status", value: "Magic Headers Reconstructed" },
    ],
    codePreview: `[INGEST_01] Reading packed binary payload (Size: 42.8 MB)...
[INGEST_01] Detected Packaging: PyInstaller v5.13 + Python 3.11 Runtime
[INGEST_01] Extracted PYZ Archive: 142 compiled module objects (.pyc)
[INGEST_01] Reconstructing marshal headers: 0xA70D0D0A (Python 3.11 Fixed)`,
  },
  {
    id: 2,
    stepTag: "STAGE 02 // DE-OBFUSCATION & JIT DUMP",
    title: "PyArmor 7/8/9 Decryption & Memory Interception",
    subtitle: "JIT Evaluator Hooks & Dynamic Bytecode Unmasking",
    description:
      "For PyArmor 7/8/9, we hook runtime evaluators directly in memory sandbox, bypassing anti-tamper heuristics and dumping clean, unmasked execution frames.",
    icon: Layers,
    badgeColor: "text-neon-amber border-neon-amber/40 bg-neon-amber/10",
    telemetry: [
      { label: "PyArmor Target", value: "PyArmor 8.5.2 Enterprise" },
      { label: "Memory Hook", value: "PyEval_EvalFrameDefault Intercept" },
      { label: "Bytecode Yield", value: "100% Raw AST Frames Dumped" },
    ],
    codePreview: `[PYARMOR_HOOK] Attached low-overhead memory hook to Python runtime...
[PYARMOR_HOOK] Intercepted PyCodeObject for module 'core_engine.py'
[PYARMOR_HOOK] Bypassed HWID license check at instruction offset 0x004F
[PYARMOR_HOOK] Reconstructed full opcode tree into standard Python AST`,
  },
  {
    id: 3,
    stepTag: "STAGE 03 // NATIVE PATCH & SOURCE HANDOVER",
    title: "Source Recovery OR Native Binary Patching",
    subtitle: "Clean .py Handover OR Native Crack for Nuitka, Go & Rust",
    description:
      "For PyArmor & PyInstaller: We deliver 100% human-readable Python source files (.py). For Nuitka, Go & Rust: We generate standalone cracked binaries with neutralized license locks.",
    icon: Binary,
    badgeColor: "text-neon-green border-neon-green/40 bg-neon-green/10",
    telemetry: [
      { label: "Source Recovery", value: "Full .py (PyArmor/PyInstaller)" },
      { label: "Native Crack", value: "Patched .exe (Nuitka/Go/Rust)" },
      { label: "Deliverable Quality", value: "Production Verified & Tested" },
    ],
    codePreview: `# --- RECOVERED SOURCE HANDOVER (PyArmor / PyInstaller) ---
def authenticate_user(license_key: str) -> bool:
    # Source completely recovered with variable names & imports
    session = NetworkSession(timeout=30)
    return True # License verification lock bypassed cleanly

# --- NATIVE BINARY CRACK (Nuitka / Go / Rust) ---
# Offset 0x00401A20: 74 12 (JZ) -> 90 90 (NOP NOP) [CRACK VERIFIED]`,
  },
];

export default function ExplodedView() {
  const [activeStep, setActiveStep] = useState(1);
  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  return (
    <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
          <Zap className="w-4 h-4" />
          <span>METHODOLOGY // 3-STAGE REVERSE ENGINEERING PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Surgical Deconstruction Workflow
        </h2>
        <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
          From encrypted PyArmor scripts and packed PyInstaller executables to full source code restoration or native binary cracking.
        </p>
      </div>

      {/* Interactive Step Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isSelected = step.id === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "bg-[#121824] border-neon-cyan shadow-[0_0_30px_rgba(0,245,212,0.2)]"
                  : "glass-card border-charcoal-border hover:border-gray-600 opacity-80 hover:opacity-100"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-amber to-neon-green" />
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-gray-400 tracking-wider">{step.stepTag}</span>
                <span
                  className={`p-2.5 rounded-xl border ${
                    isSelected
                      ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan"
                      : "border-gray-800 bg-gray-900 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-gray-400 font-mono">{step.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card p-6 sm:p-10 rounded-3xl border border-charcoal-border neon-border-cyan relative overflow-hidden"
        >
          {/* Left Column: Stage Explanation & Telemetry */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-block px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold mb-4 border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10">
                {current.stepTag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                {current.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                {current.description}
              </p>

              {/* Stage Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.telemetry.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#050608] p-3.5 rounded-xl border border-[#1f2937]"
                  >
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-xs font-mono font-bold text-neon-cyan mt-1">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Progression Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#1f2937]">
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                  className="px-5 py-2.5 rounded-xl border border-charcoal-border text-xs font-mono text-gray-300 hover:text-white hover:border-gray-600 transition-colors cursor-pointer"
                >
                  &larr; Previous Stage
                </button>
              )}
              {activeStep < 3 ? (
                <button
                  onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
                  className="px-6 py-2.5 rounded-xl bg-neon-cyan text-obsidian text-xs font-mono font-bold hover:bg-[#00d8bc] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                >
                  Advance to Next Stage
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="#capabilities"
                  className="px-6 py-2.5 rounded-xl bg-neon-green text-obsidian text-xs font-mono font-bold hover:bg-[#0ea573] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  Explore 6 Supported Vectors
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Code & Visual Diagnostics HUD */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-[#050608] rounded-2xl border border-[#1f2937] p-5 flex-1 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between border-b border-[#1f2937] pb-3.5 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="text-gray-200">DECOMPILER LOG: STAGE_{activeStep}.LOG</span>
                </div>
                <span className="text-[11px] font-mono text-neon-amber font-bold">AIR-GAPPED LAB</span>
              </div>

              <pre className="font-mono text-xs text-gray-200 leading-relaxed overflow-x-auto p-3.5 bg-[#0a0d13] rounded-xl border border-[#161f2e]">
                <code>{current.codePreview}</code>
              </pre>

              <div className="mt-4 pt-3 border-t border-[#1f2937] flex items-center justify-between text-[11px] font-mono text-gray-500">
                <div>TARGET: <span className="text-gray-300">PyArmor / Nuitka / Go / Rust</span></div>
                <div className="text-neon-cyan font-bold">STATUS: REVERSED</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
