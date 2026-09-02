"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Play, RotateCcw, Copy, Check, Cpu, Bug, Radio, Sparkles, Activity } from "lucide-react";

interface LogEntry {
  id: string;
  type: "input" | "output" | "system" | "error" | "code" | "hex";
  content: string;
}

const SAMPLE_DECOMPILED_CODE = `// ============================================================================
// AETHER DECOMPILER v4.8 [HIGH-ASSURANCE RECONSTRUCTED PSEUDO-C]
// Target: SecureEnclave_Stage1_BootROM.bin (SHA256: 7f8a92b...e41d)
// Arch: ARM64-v8.3A / Cryptographic Coprocessor MMIO Bus (0x50000000)
// ============================================================================

int __fastcall verify_stage2_signature(const uint8_t *payload, size_t len) {
    hw_sec_registers_t *sec_regs = (hw_sec_registers_t *)0x50004000;
    uint8_t derived_digest[32];
    uint32_t fuse_state;

    // Direct MMIO Hardware Fuse State Probe
    fuse_state = sec_regs->FUSE_OVERRIDE_STATUS;
    if ((fuse_state & FUSE_SECURE_LOCK_ENGAGED) == 0) {
        log_hw_telemetry("[CRITICAL] Hardware debug fuses unlocked via pin glitch!");
        return BYPASS_AUTH_SUCCESS; // [0-DAY DISCOVERY: VULN-ID: AETHER-2026-904]
    }

    // Hardware-accelerated constant-time SHA-256 verification
    hw_sha256_compute(payload, len - 256, derived_digest);

    if (constant_time_memcmp(derived_digest, payload + (len - 256), 32) != 0) {
        sec_regs->TAMPER_LATCH = TAMPER_FLAG_TRIPPED;
        trigger_fuse_burn_and_eprom_halt();
        return AUTH_FAILURE_HALT;
    }

    log_hw_telemetry("[+] Stage 2 cryptographic signature verified. Jumping to 0x80000000.");
    jump_to_kernel_entry((void *)0x80000000);
    return AUTH_SUCCESS;
}`;

const SAMPLE_DISASSEMBLY = `// Disassembly Offset 0x00007FF8012A (ARM64 / x86_64 mixed instruction trace)
0x00007FF8012A:  55                     push   rbp
0x00007FF8012B:  48 89 E5               mov    rbp, rsp
0x00007FF8012E:  48 81 EC 80 00 00 00   sub    rsp, 0x80
0x00007FF80135:  89 7D FC               mov    DWORD PTR [rbp-0x4], edi
0x00007FF80138:  48 89 75 F0            mov    QWORD PTR [rbp-0x10], rsi
0x00007FF8013C:  48 8B 05 C5 21 00 00   mov    rax, QWORD PTR [rip+0x21c5]
0x00007FF80143:  48 89 45 E8            mov    QWORD PTR [rbp-0x18], rax
0x00007FF80147:  E8 44 FE FF FF         call   <hw_probe_voltage_rail>
0x00007FF8014C:  85 C0                  test   eax, eax
0x00007FF8014E:  75 14                  jne    <patch_fuse_bypass_offset>
0x00007FF80150:  B8 01 00 00 00         mov    eax, 0x1
0x00007FF80155:  48 8B 4D E8            mov    rcx, QWORD PTR [rbp-0x18]
0x00007FF80159:  48 33 0D B0 21 00 00   xor    rcx, QWORD PTR [rip+0x21b0]
0x00007FF80160:  C9                     leave  
0x00007FF80161:  C3                     ret    `;

export default function TerminalConsole() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: "sys-init",
      type: "system",
      content:
        "AETHER REVERSE LABS // INTERACTIVE DIAGNOSTIC TERMINAL v4.8.2\nType 'help' for diagnostics or click the quick action chips above.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const addLog = (type: LogEntry["type"], content: string) => {
    setHistory((prev) => [...prev, { id: Math.random().toString(), type, content }]);
  };

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    addLog("input", `$ ${trimmed}`);
    setInputVal("");

    const [cmd, ...args] = trimmed.toLowerCase().split(" ");

    switch (cmd) {
      case "help":
        addLog(
          "output",
          `Aether Laboratory Diagnostic Instructions:
  help                  - Show this diagnostic menu
  decompile --sample    - Run live microcode decompiler with recovered pseudo-C & ARM64 ASM
  sniff -i jtag         - Stream live raw hardware bus baud traffic & SPI/JTAG frames
  analyze --binary      - Execute Shannon entropy, crypto signature, and import table scan
  disasm --target       - Inspect low-level binary disassembly trace
  specs                 - Show Aether Reverse Labs laboratory specifications & certifications
  clear                 - Wipe the terminal output buffer`
        );
        break;

      case "clear":
        setHistory([]);
        break;

      case "decompile":
        setIsTyping(true);
        addLog("system", "[*] INGESTING BINARY: SecureEnclaveBootROM_v4.bin (128 KB)...");
        addLog("system", "[*] RECONSTRUCTING CONTROL FLOW GRAPH (CFG)... Found 47 basic blocks.");
        
        setTimeout(() => {
          addLog("code", SAMPLE_DECOMPILED_CODE);
          addLog("system", "[+] DECOMPILATION COMPLETE: Identified 1 Hardened Auth Bypass (VULN-ID: AETHER-2026-904)");
          setIsTyping(false);
        }, 600);
        break;

      case "disasm":
        addLog("system", "[*] DISASSEMBLING INSTRUCTION STREAM AT BASE 0x00007FF8012A...");
        addLog("code", SAMPLE_DISASSEMBLY);
        break;

      case "sniff":
        setIsTyping(true);
        addLog("system", "[*] ATTACHING LOGIC ANALYZER TO JTAG TCK/TMS/TDI/TDO CHANNELS (Baud: 12.0 MHz)...");
        
        let counter = 0;
        const interval = setInterval(() => {
          counter++;
          const hexLine = `[JTAG_FRAME_${counter.toString().padStart(3, "0")}] TMS=1 TDI=${(Math.random() > 0.5 ? "1" : "0")} | ADDR: 0x${Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, "0")} DATA: ${Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0")).join(" ")} [STATUS: ACK]`;
          addLog("hex", hexLine);

          if (counter >= 6) {
            clearInterval(interval);
            addLog("system", "[+] JTAG TAP STATE TRANSITION: Shift-DR -> Exit1-DR -> Update-DR (Capture Complete)");
            setIsTyping(false);
          }
        }, 280);
        break;

      case "analyze":
        addLog("system", "[*] STARTING DEEP BINARY FORENSIC SCAN...");
        addLog(
          "output",
          `+-----------------------------------------------------------+
| BINARY METADATA & CRYPTOGRAPHIC TELEMETRY                 |
+-----------------------------------------------------------+
| Target Architecture: ARM64 / Little Endian                |
| Shannon Entropy:     7.92 / 8.00 (High - Packed/Encrypted)|
| Security Mitigations: DEP/NX [ENABLE], PAC [BYPASSED], SMEP|
| Cryptographic Keys:  AES-256-XTS S-Box Found at 0x48F0    |
| Zero-Day Risk Score: CRITICAL (9.6/10)                    |
+-----------------------------------------------------------+`
        );
        break;

      case "specs":
        addLog(
          "output",
          `AETHER REVERSE LABS HARDWARE & FACILITY SPECIFICATIONS:
- Cleanroom: Class 100 / ISO 5 Micro-Electronics Facility (Zurich)
- FIB/SEM: Focused Ion Beam Zeiss Crossbeam 550 for Silicon Delayering
- Logic Analyzers: Saleae Pro 16 + Teledyne LeCroy 40GHz Real-Time Oscilloscopes
- Certifications: ISO/IEC 27001, Common Criteria EAL6+ Certified Testing`
        );
        break;

      default:
        addLog(
          "error",
          `Command not recognized: '${cmd}'. Type 'help' to inspect supported reverse engineering toolset.`
        );
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  const copyLatestCode = () => {
    navigator.clipboard.writeText(SAMPLE_DECOMPILED_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-neon-cyan font-mono text-xs uppercase tracking-widest mb-2">
            <Radio className="w-4 h-4 animate-pulse text-neon-cyan" />
            <span>Interactive Diagnostic Shell</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Live Disassembly Sandbox
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl">
            Execute real-time microcode deconstruction, logic analyzer bus dumps, and vulnerability audits directly in the browser sandbox.
          </p>
        </div>

        {/* Quick Command Trigger Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCommand("decompile --sample")}
            className="px-3.5 py-2 text-xs font-mono bg-[#121824] hover:bg-[#1a2333] text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,245,212,0.15)] cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-neon-cyan fill-neon-cyan" />
            decompile --sample
          </button>
          <button
            onClick={() => handleCommand("sniff -i jtag")}
            className="px-3.5 py-2 text-xs font-mono bg-[#121824] hover:bg-[#1a2333] text-neon-amber border border-neon-amber/40 hover:border-neon-amber rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,183,3,0.15)] cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-neon-amber" />
            sniff -i jtag
          </button>
          <button
            onClick={() => handleCommand("analyze --binary")}
            className="px-3.5 py-2 text-xs font-mono bg-[#121824] hover:bg-[#1a2333] text-neon-green border border-neon-green/40 hover:border-neon-green rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer"
          >
            <Bug className="w-3.5 h-3.5 text-neon-green" />
            analyze --binary
          </button>
        </div>
      </div>

      {/* Terminal Container */}
      <div className="rounded-2xl overflow-hidden border border-[#1f2937] bg-[#050608] shadow-[0_0_50px_rgba(0,0,0,0.9)] neon-border-cyan relative">
        {/* Terminal Header Bar */}
        <div className="bg-[#0b0e14] px-5 py-3.5 border-b border-[#1f2937] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-gray-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              aether-shell@rev-lab-04:~ (ARM64 / JTAG-TAP-0x3F)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={copyLatestCode}
              className="text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-neon-green" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
            <button
              onClick={() => handleCommand("clear")}
              className="text-xs font-mono text-gray-400 hover:text-neon-amber flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Clear Terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Terminal Console Output Screen */}
        <div
          className="p-6 font-mono text-xs sm:text-sm h-[460px] overflow-y-auto space-y-3 bg-[#050608] text-gray-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((log) => {
            if (log.type === "input") {
              return (
                <div key={log.id} className="text-neon-cyan flex items-start gap-2">
                  <span className="text-gray-500 select-none">&gt;</span>
                  <span className="font-bold text-white">{log.content}</span>
                </div>
              );
            }
            if (log.type === "system") {
              return (
                <div key={log.id} className="text-neon-amber font-mono text-xs font-medium">
                  {log.content}
                </div>
              );
            }
            if (log.type === "error") {
              return (
                <div key={log.id} className="text-red-400 font-mono text-xs">
                  {log.content}
                </div>
              );
            }
            if (log.type === "hex") {
              return (
                <div key={log.id} className="text-neon-green font-mono text-xs tracking-wider bg-[#0a1017] p-1.5 rounded border border-[#142333]">
                  {log.content}
                </div>
              );
            }
            if (log.type === "code") {
              return (
                <pre
                  key={log.id}
                  className="bg-[#0b0f17] p-4 rounded-xl border border-neon-cyan/20 text-gray-200 overflow-x-auto text-xs leading-relaxed font-mono shadow-inner"
                >
                  <code>{log.content}</code>
                </pre>
              );
            }
            return (
              <div key={log.id} className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {log.content}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-neon-cyan text-xs">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
              <span>[RECEIVING REAL-TIME BUS TELEMETRY STREAM...]</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-[#0b0e14] p-3.5 border-t border-[#1f2937] flex items-center gap-3">
          <span className="text-neon-cyan font-mono text-base font-black select-none pl-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'decompile --sample', 'sniff -i jtag', 'analyze --binary'..."
            className="flex-1 bg-transparent text-sm font-mono text-white placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal || "help")}
            className="px-5 py-2 bg-neon-cyan text-obsidian text-xs font-mono font-black rounded-lg hover:bg-[#00d8bc] transition-colors shadow-[0_0_15px_rgba(0,245,212,0.3)] cursor-pointer"
          >
            EXECUTE
          </button>
        </div>
      </div>
    </section>
  );
}
