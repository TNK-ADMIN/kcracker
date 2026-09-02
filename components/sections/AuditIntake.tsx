"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, UploadCloud, FileCode2, CheckCircle2, AlertTriangle, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const ARCHITECTURES = [
  { id: "mcu", label: "MCU / Embedded Silicon (ARM/RISC-V/ESP32)", desc: "Flash dump, JTAG extraction, microcode" },
  { id: "bin", label: "Executable / Native Binary (PE/ELF/Mach-O)", desc: "Decompilation, anti-tamper bypass, DRM" },
  { id: "wasm", label: "WebAssembly / Bytecode VM", desc: "Bytecode devirtualization & memory audit" },
  { id: "bus", label: "Proprietary Bus / Automotive CAN / RF", desc: "Signal packet framing & dissector writing" },
];

export default function AuditIntake() {
  const [selectedArch, setSelectedArch] = useState("mcu");
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [targetName, setTargetName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [objective, setObjective] = useState("vulnerability");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f5d4", "#ffb703", "#10b981", "#7928ca"],
      });
    }, 1000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <section id="intake" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
          <ShieldCheck className="w-4 h-4" />
          <span>SCOPED INGESTION // SECURE ENGAGEMENT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Request Project Scoping
        </h2>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          All inquiries are guarded under automatic mutual NDA with end-to-end PGP encrypted communication channels.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-7 sm:p-12 border border-[#1f2937] neon-border-cyan relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-16 space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-neon-green/15 border border-neon-green text-neon-green mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white">Target Scope Received & Queued</h3>
            <p className="text-gray-300 max-w-lg mx-auto text-sm font-mono leading-relaxed">
              Ticket ID: <span className="text-neon-cyan font-bold">AETHER-ENG-{Math.floor(100000 + Math.random() * 900000)}</span>
              <br />
              Our Lead Reverse Engineer will review your binary specifications and transmit a formal Statement of Work (SOW) within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFileName(null);
              }}
              className="px-7 py-3 bg-[#121824] hover:bg-[#1f2937] text-neon-cyan border border-neon-cyan/40 rounded-xl text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,245,212,0.2)] cursor-pointer"
            >
              Submit Another Scope
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Target Architecture Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-3">
                1. Select Target Hardware / Binary Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ARCHITECTURES.map((arch) => (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => setSelectedArch(arch.id)}
                    className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedArch === arch.id
                        ? "bg-[#121824] border-neon-cyan shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                        : "bg-[#050608] border-[#1f2937] hover:border-gray-600 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{arch.label}</span>
                      {selectedArch === arch.id && <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f5d4]" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-mono">{arch.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement Objectives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Target System / Chip Identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STM32H753 / libsecure_core.so"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full bg-[#050608] border border-[#1f2937] focus:border-neon-cyan rounded-xl p-3.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                  Corporate / Security Lead Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="security@enterprise.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#050608] border border-[#1f2937] focus:border-neon-cyan rounded-xl p-3.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Objective Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                Primary Reverse Engineering Objective
              </label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-[#050608] border border-[#1f2937] focus:border-neon-cyan rounded-xl p-3.5 text-sm font-mono text-white focus:outline-none"
              >
                <option value="vulnerability">Zero-Day Vulnerability Research & Exploit Verification</option>
                <option value="interoperability">Clean-Room Interoperability & Protocol Emulation</option>
                <option value="drm_bypass">Anti-Tamper, DRM & Obfuscation Deconstruction</option>
                <option value="silicon_xray">Silicon Delayering & Physical Netlist Extraction</option>
                <option value="forensics">Firmware Forensics & Malicious Implant Discovery</option>
              </select>
            </div>

            {/* Encrypted Sample Dropzone */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                Sample / Memory Dump Dropzone (Optional PGP/AES Encrypted Payload)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                  dragActive
                    ? "border-neon-cyan bg-neon-cyan/10"
                    : "border-[#1f2937] hover:border-neon-cyan/50 bg-[#050608]/90"
                }`}
                onClick={() => {
                  const name = prompt("Enter sample filename to simulate encrypted upload:", "firmware_dump_v2.bin");
                  if (name) setFileName(name);
                }}
              >
                <UploadCloud className="w-9 h-9 text-neon-cyan mx-auto mb-2 opacity-80" />
                <div className="text-xs font-mono text-gray-300">
                  {fileName ? (
                    <span className="text-neon-cyan font-bold flex items-center justify-center gap-2">
                      <FileCode2 className="w-4 h-4" /> Attached: {fileName}
                    </span>
                  ) : (
                    <>
                      <span className="text-neon-cyan font-bold">Click to upload</span> or drag and drop firmware image / sample
                      <div className="text-gray-500 text-[11px] mt-1">Accepts: .BIN, .HEX, .ELF, .DLL, .SO, .PCAP (Max 2GB AES-GCM Encrypted)</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Scope Details */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-2">
                Project Specifics & Constraints
              </label>
              <textarea
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe known hardware interfaces, baud rates, packaging, target timelines, and compliance requirements..."
                className="w-full bg-[#050608] border border-[#1f2937] focus:border-neon-cyan rounded-xl p-3.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none"
              />
            </div>

            {/* Mutual NDA Enforcement */}
            <div className="p-4.5 rounded-2xl bg-[#050608] border border-[#1f2937] flex items-start gap-3.5">
              <input
                type="checkbox"
                id="nda-toggle"
                checked={ndaAgreed}
                onChange={(e) => setNdaAgreed(e.target.checked)}
                className="mt-1 accent-[#00f5d4] w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="nda-toggle" className="text-xs text-gray-300 leading-relaxed cursor-pointer">
                <span className="font-bold text-white flex items-center gap-1.5 mb-0.5">
                  <Lock className="w-3.5 h-3.5 text-neon-green" />
                  Auto-Enforce Mutual Non-Disclosure Agreement (M-NDA v4.1)
                </span>
                By submitting this scope, both parties agree to strict ISO 27001 data isolation, air-gapped lab handling, and zero disclosure of client proprietary binaries or silicon designs.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !ndaAgreed}
              className={`w-full py-4.5 rounded-2xl font-mono text-sm font-black flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-neon-cyan text-obsidian hover:bg-[#00d8bc] shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:shadow-[0_0_45px_rgba(0,245,212,0.7)] cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                  <span>ENCRYPTING & DISPATCHING SCOPE...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>DISPATCH AUDIT INTAKE TO SPECIAL OPS TEAM</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
