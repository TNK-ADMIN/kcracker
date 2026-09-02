"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cpu, FileCode2, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroModel() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ingest" | "hook" | "source">("ingest");
  const [autoCycle, setAutoCycle] = useState(true);
  const [pulseLine, setPulseLine] = useState(0);

  // Multilingual Comments and Labels for the Code/Assembly HUD
  const getComments = () => {
    switch (lang) {
      case "vi":
        return {
          ingest_c1: "// Khởi tạo khung ngăn xếp",
          ingest_c2: "",
          ingest_c3: "// Cấp phát bộ nhớ đệm phân tích",
          ingest_c4: "// Tải điểm kiểm tra bảo mật",
          ingest_c5: "// Đánh giá luồng thực thi runtime",
          ingest_note: "Đã ánh xạ thành công điểm vào của module bảo mật tại 0x00401008. Sẵn sàng cho quy trình đánh giá an ninh chuyên sâu.",
          
          hook_c1: "// Giám sát khung bộ nhớ thực thi",
          hook_c2: "// Kiểm tra tính toàn vẹn module",
          hook_c3: "// Đánh giá cờ trạng thái an toàn",
          hook_c4: "// TỐI ƯU HÓA: Cân bằng luồng kiểm tra",
          hook_c5: "// Trạng thái kiểm thử hoàn tất",
          hook_note: "Đã xác định và điều chỉnh luồng kiểm tra logic an toàn. Hệ thống vận hành ổn định không còn phụ thuộc điều kiện ngoại vi.",
          
          source_head: `"""[BÁO CÁO PHÂN TÍCH PHẦN MỀM - KCRACKER.ASIA]"""`,
          source_auth: "# Đã hoàn tất kiểm thử an toàn",
          source_unmask: "# Giải cấu trúc và phân tích luồng bảo vệ phần mềm\n        # Khôi phục cấu trúc cây cú pháp trừu tượng (AST) nguyên bản",
          source_verified: `print(f"[+] Đã hoàn tất kiểm tra an toàn cho {self.application_id}")`,
          source_launch: `print("[*] Hoàn tất đánh giá an ninh phần mềm chuyên sâu...")`,
          source_note: "Khôi phục toàn diện hàm, lớp, biến và thư viện với khả năng đọc hiểu và tái cấu trúc hoàn chỉnh.",
          
          lbl_target: "MỤC TIÊU:",
          lbl_cfg: "47 KHỐI ĐIỀU KHIỂN",
          lbl_status: "TRẠNG THÁI:",
          lbl_opt: "TỐI ƯU HÓA:",
          lbl_ready: "BÀN GIAO MÃ NGUỒN:"
        };

      case "zh":
        return {
          ingest_c1: "// 初始化栈帧",
          ingest_c2: "",
          ingest_c3: "// 分配分析局部缓冲区",
          ingest_c4: "// 加载安全模块入口点",
          ingest_c5: "// 评估运行时执行流",
          ingest_note: "成功定位 0x00401008 处的安全入口点，准备进行深度安全评估。",

          hook_c1: "// 监控执行帧内存",
          hook_c2: "// 评估模块完整性",
          hook_c3: "// 检验安全状态标志",
          hook_c4: "// 优化: NOP 指令填充",
          hook_c5: "// 安全评估条件验证成功",
          hook_note: "安全逻辑校验已完成优化与调整，系统脱离外部约束平稳运行。",

          source_head: `"""[源码重构报告 - KCRACKER.ASIA]"""`,
          source_auth: "# 安全审计验证通过",
          source_unmask: "# 剥离虚拟机保护层\n        # 还原清晰且完全可读的抽象语法树 (AST)",
          source_verified: `print(f"[+] 软件安全评估完成: {self.application_id}")`,
          source_launch: `print("[*] 正在加载验证后的软件核心...")`,
          source_note: "完整恢复所有函数、类、变量及依赖，代码清晰易读具备完全可重构性。",

          lbl_target: "分析目标:",
          lbl_cfg: "47 个控制流节点",
          lbl_status: "状态:",
          lbl_opt: "优化:",
          lbl_ready: "交付成果:"
        };

      case "ru":
        return {
          ingest_c1: "// Инициализация стекового кадра",
          ingest_c2: "",
          ingest_c3: "// Выделение буфера анализа",
          ingest_c4: "// Загрузка точки входа защиты",
          ingest_c5: "// Оценка потока выполнения",
          ingest_note: "Точка входа модуля успешно сопоставлена по адресу 0x00401008. Готово к детальному аудиту.",

          hook_c1: "// Мониторинг кадра выполнения",
          hook_c2: "// Проверка целостности модуля",
          hook_c3: "// Оценка флагов безопасности",
          hook_c4: "// ОПТИМИЗАЦИЯ: NOP-заглушка",
          hook_c5: "// Условие аудита подтверждено",
          hook_note: "Логика проверки безопасности оптимизирована. Система стабильно работает без внешних ограничений.",

          source_head: `"""[ДОСЬЕ РЕКОНСТРУКЦИИ - KCRACKER.ASIA]"""`,
          source_auth: "# Проверка безопасности пройдена",
          source_unmask: "# Деобфусцированное чистое AST-дерево\n        # Полное снятие барьеров виртуализации",
          source_verified: `print(f"[+] Аудит безопасности завершен: {self.application_id}")`,
          source_launch: `print("[*] Запуск проверенного ядра ПО...")`,
          source_note: "Полное восстановление функций, классов и библиотек с чистой читаемостью кода.",

          lbl_target: "ЦЕЛЬ:",
          lbl_cfg: "47 УЗЛОВ CFG",
          lbl_status: "СТАТУС:",
          lbl_opt: "ОПТИМИЗАЦИЯ:",
          lbl_ready: "ГОТОВНОСТЬ:"
        };

      default: // en
        return {
          ingest_c1: "// Setup stack frame",
          ingest_c2: "",
          ingest_c3: "// Allocate local analysis buffer",
          ingest_c4: "// Load security entrypoint",
          ingest_c5: "// Evaluate runtime stream",
          ingest_note: "Successfully mapped security module entrypoint at 0x00401008. Ready for deep evaluation.",

          hook_c1: "// Monitor eval frame",
          hook_c2: "// Check module integrity",
          hook_c3: "// Evaluate safety flags",
          hook_c4: "// OPTIMIZATION: NOP sled",
          hook_c5: "// Audit condition verified",
          hook_note: "Safety logic checks successfully audited and optimized. Standalone execution verified.",

          source_head: `"""[RECONSTRUCTED DOSSIER - KCRACKER.ASIA]"""`,
          source_auth: "# Security audit verified",
          source_unmask: "# De-obfuscated and unmasked clean Abstract Syntax Tree (AST)\n        # Protection layer completely analyzed",
          source_verified: `print(f"[+] Security analysis complete for {self.application_id}")`,
          source_launch: `print("[*] Launching verified software core...")`,
          source_note: "All functions, classes, imports, and variables reconstructed with full human readability.",

          lbl_target: "TARGET:",
          lbl_cfg: "47 CFG NODES",
          lbl_status: "STATUS:",
          lbl_opt: "OPTIMIZATION:",
          lbl_ready: "DOSSIER READY:"
        };
    }
  };

  const c = getComments();

  const STAGES = [
    {
      id: "ingest",
      title: t("ws_tab_1"),
      target: "Application_Binary_Target.exe [x86_64]",
      cfg: c.lbl_cfg,
      asm: [
        { addr: "0x00401000", hex: "55", inst: "PUSH", op: "RBP", comment: c.ingest_c1 },
        { addr: "0x00401001", hex: "48 89 E5", inst: "MOV", op: "RBP, RSP", comment: c.ingest_c2 },
        { addr: "0x00401004", hex: "48 83 EC 30", inst: "SUB", op: "RSP, 0x30", comment: c.ingest_c3 },
        { addr: "0x00401008", hex: "48 8B 05 20", inst: "MOV", op: "RAX, [0x00402030]", comment: c.ingest_c4 },
        { addr: "0x0040100F", hex: "FF D0", inst: "CALL", op: "RAX", comment: c.ingest_c5 },
      ],
      note: c.ingest_note,
    },
    {
      id: "hook",
      title: t("ws_tab_2"),
      target: "MEMORY SANDBOX HOOK: PyEval_EvalFrameDefault",
      cfg: "INTEGRITY: AUDITED",
      asm: [
        { addr: "0x7FFE0010", hex: "48 8D 3D A0", inst: "LEA", op: "RDI, [PyEval_EvalFrame]", comment: c.hook_c1 },
        { addr: "0x7FFE0017", hex: "E8 40 12 00", inst: "CALL", op: "audit_frame_security", comment: c.hook_c2 },
        { addr: "0x7FFE001C", hex: "85 C0", inst: "TEST", op: "EAX, EAX", comment: c.hook_c3 },
        { addr: "0x7FFE001E", hex: "90 90", inst: "NOP", op: "NOP", comment: c.hook_c4 },
        { addr: "0x7FFE0020", hex: "B8 01 00 00", inst: "MOV", op: "EAX, 0x1", comment: c.hook_c5 },
      ],
      note: c.hook_note,
    },
    {
      id: "source",
      title: t("ws_tab_3"),
      target: "DECOMPILED AST RECONSTRUCTION: main_app.py",
      cfg: "100% RECOVERED",
      code: `import sys
import hashlib
from typing import Optional

class SecurityAuditManager:
    ${c.source_head}
    def __init__(self, application_id: str):
        self.application_id = application_id
        self.audit_verified = True  ${c.source_auth}
        
    def evaluate_software_integrity(self, node_fingerprint: str) -> bool:
        ${c.source_unmask}
        ${c.source_verified}
        return True

def run_application_analysis():
    auditor = SecurityAuditManager("ENTERPRISE_SOFTWARE_V9")
    if auditor.evaluate_software_integrity("AUDIT_NODE_VERIFIED"):
        ${c.source_launch}`,
      note: c.source_note,
    }
  ];

  useEffect(() => {
    if (!autoCycle) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === "ingest") return "hook";
        if (prev === "hook") return "source";
        return "ingest";
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [autoCycle]);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setPulseLine((p) => (p + 1) % 5);
    }, 600);
    return () => clearInterval(lineTimer);
  }, []);

  return (
    <div className="w-full flex flex-col rounded-3xl overflow-hidden border border-[#1f2937] bg-[#05070d] shadow-[0_0_50px_rgba(0,0,0,0.9)] relative">
      {/* Top Header Bar */}
      <div className="bg-[#0a0d16] px-4 py-3 border-b border-[#1f2937] flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-xs text-gray-300 font-bold flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-4 h-4 text-neon-cyan shrink-0" />
            <span className="truncate">{t("ws_title")}</span>
          </span>
        </div>

        <div className="shrink-0">
          <span className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-neon-green/10 border border-neon-green/40 text-neon-green font-bold animate-pulse whitespace-nowrap">
            {t("ws_live")}
          </span>
        </div>
      </div>

      {/* Stage Tab Navigation */}
      <div className="grid grid-cols-3 bg-[#080b12] border-b border-[#1f2937] text-xs font-mono">
        <button
          onClick={() => {
            setActiveTab("ingest");
            setAutoCycle(false);
          }}
          className={`py-2.5 px-2 border-r border-[#1f2937] flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === "ingest"
              ? "bg-[#101726] text-neon-cyan border-b-2 border-b-neon-cyan font-bold"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
          <span className="truncate text-[11px] sm:text-xs">{t("ws_tab_1")}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("hook");
            setAutoCycle(false);
          }}
          className={`py-2.5 px-2 border-r border-[#1f2937] flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === "hook"
              ? "bg-[#101726] text-neon-amber border-b-2 border-b-neon-amber font-bold"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
          <span className="truncate text-[11px] sm:text-xs">{t("ws_tab_2")}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("source");
            setAutoCycle(false);
          }}
          className={`py-2.5 px-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === "source"
              ? "bg-[#101726] text-neon-green border-b-2 border-b-neon-green font-bold"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
          <span className="truncate text-[11px] sm:text-xs">{t("ws_tab_3")}</span>
        </button>
      </div>

      {/* Main Interactive Code & Disassembly Viewport */}
      <div className="p-4 sm:p-5 font-mono text-xs h-[400px] sm:h-[420px] overflow-y-auto bg-[#04060a] space-y-2">
        <AnimatePresence mode="wait">
          {activeTab === "ingest" && (
            <motion.div
              key="ingest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="text-[11px] text-gray-500 pb-2 border-b border-[#141b2b] flex items-center justify-between gap-2">
                <span className="truncate">{c.lbl_target} {STAGES[0].target}</span>
                <span className="text-neon-cyan shrink-0">{STAGES[0].cfg}</span>
              </div>

              <div className="space-y-1.5">
                {STAGES[0].asm?.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 font-mono text-xs ${
                      pulseLine === idx ? "bg-[#0d1829] border border-neon-cyan/40 text-white" : "text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                      <span className="text-gray-600 select-none text-[11px]">{line.addr}</span>
                      <span className="text-neon-amber font-mono w-16 sm:w-20 text-[11px]">{line.hex}</span>
                      <span className="text-neon-cyan font-bold w-10 sm:w-12 text-[11px]">{line.inst}</span>
                      <span className="text-gray-200 text-[11px]">{line.op}</span>
                    </div>
                    {line.comment && <span className="text-gray-500 text-[10.5px] sm:text-[11px] italic">{line.comment}</span>}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#0a0f1d] rounded-xl border border-[#162238] text-[11px] text-gray-400">
                <span className="text-neon-cyan font-bold">[{c.lbl_status}]:</span> {STAGES[0].note}
              </div>
            </motion.div>
          )}

          {activeTab === "hook" && (
            <motion.div
              key="hook"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="text-[11px] text-gray-500 pb-2 border-b border-[#141b2b] flex items-center justify-between gap-2">
                <span className="truncate">{STAGES[1].target}</span>
                <span className="text-neon-amber font-bold shrink-0">{STAGES[1].cfg}</span>
              </div>

              <div className="space-y-1.5">
                {STAGES[1].asm?.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 font-mono text-xs ${
                      idx === 3 ? "bg-[#181105] border border-neon-amber text-neon-amber font-bold" : "text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                      <span className="text-gray-600 select-none text-[11px]">{line.addr}</span>
                      <span className="text-neon-amber font-mono w-16 sm:w-20 text-[11px]">{line.hex}</span>
                      <span className="text-neon-cyan font-bold w-10 sm:w-12 text-[11px]">{line.inst}</span>
                      <span className="text-gray-200 text-[11px]">{line.op}</span>
                    </div>
                    {line.comment && <span className="text-neon-green text-[10.5px] sm:text-[11px] italic">{line.comment}</span>}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#110e05] rounded-xl border border-[#2a1d05] text-[11px] text-neon-amber">
                <span className="font-bold">[{c.lbl_opt}]:</span> {STAGES[1].note}
              </div>
            </motion.div>
          )}

          {activeTab === "source" && (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="text-[11px] text-gray-500 pb-2 border-b border-[#141b2b] flex items-center justify-between gap-2">
                <span className="truncate">{STAGES[2].target}</span>
                <span className="text-neon-green font-bold shrink-0">{STAGES[2].cfg}</span>
              </div>

              <pre className="p-3 bg-[#080d17] rounded-xl border border-[#16233b] text-gray-200 text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <code>{STAGES[2].code}</code>
              </pre>

              <div className="p-3 bg-[#06140e] rounded-xl border border-[#0d3322] text-[11px] text-neon-green">
                <span className="font-bold">[{c.lbl_ready}]:</span> {STAGES[2].note}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Bottom Control Bar */}
      <div className="bg-[#0a0d16] p-3 border-t border-[#1f2937] flex items-center justify-between text-xs font-mono">
        <div className="text-gray-400 flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping shrink-0" />
          <span className="truncate">KCRACKER AUDIT ENGINE v5.0</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className={`px-3 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
              autoCycle ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10" : "border-gray-700 text-gray-400"
            }`}
          >
            {autoCycle ? t("ws_auto_on") : t("ws_auto_off")}
          </button>
        </div>
      </div>
    </div>
  );
}
