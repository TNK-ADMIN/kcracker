"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Search, 
  Code2, 
  CheckCircle2, 
  Send 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function FAQ() {
  const { lang, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const FAQ_DATA = [
    {
      q: {
        en: "Can you recover 100% full original source code from PyArmor 7, 8, and 9?",
        vi: "Dịch vụ có thể khôi phục 100% mã nguồn Python gốc từ PyArmor 7, 8 và 9 không?",
        zh: "你们能从 PyArmor 7、8 和 9 中 100% 完整恢复原始 Python 源代码吗？",
        ru: "Можете ли вы восстановить 100% исходный код Python из PyArmor 7, 8 и 9?"
      },
      a: {
        en: "Yes. For PyArmor 7, PyArmor 8, PyArmor 9 (including Pro and Enterprise editions), we hook the runtime JIT Evaluator and memory sandbox to dump clean execution frames, reconstructing the full Abstract Syntax Tree (AST) into readable .py source files with all classes, functions, and logic intact.",
        vi: "Chính xác. Đối với PyArmor 7, 8 và 9 (bao gồm cả bản Pro và Enterprise), chúng tôi hook trực tiếp vào JIT Evaluator trong bộ nhớ sandbox để trích xuất các khung thực thi, tái cấu trúc toàn bộ cây cú pháp AST thành tệp mã nguồn .py hoàn chỉnh với đầy đủ class, hàm và logic nguyên bản.",
        zh: "可以。针对 PyArmor 7、8 及 9（包括 Pro 和 Enterprise 企业版），我们通过挂钩运行时 JIT Evaluator 并在沙箱内存中转储未加密执行帧，将完整的抽象语法树 (AST) 重构为可读的 .py 源代码，完整保留所有类、函数与业务逻辑。",
        ru: "Да. Для PyArmor 7, 8 и 9 (включая версии Pro и Enterprise) мы перехватываем кадры выполнения в JIT Evaluator через изолированную память RAM и реконструируем полное дерево AST в чистые исходные файлы .py со всеми классами, функциями и логикой."
      }
    },
    {
      q: {
        en: "How does PyInstaller and packed executable unpacking work?",
        vi: "Quy trình giải nén và phục hồi file đóng gói PyInstaller diễn ra như thế nào?",
        zh: "PyInstaller 和打包可执行文件的解包恢复流程是怎样的？",
        ru: "Как происходит распаковка и восстановление файлов PyInstaller?"
      },
      a: {
        en: "We unpack standard Python packaging binaries (PyInstaller, py2exe, cx_Freeze) by extracting the entire embedded PYZ bytecode archive, restoring stripped magic header signatures, and decompiling bytecode into original project file hierarchies.",
        vi: "Chúng tôi giải nén các tệp đóng gói Python (PyInstaller, py2exe, cx_Freeze) bằng cách trích xuất toàn bộ kho lưu trữ bytecode PYZ, khôi phục các magic header bị lược bỏ và dịch ngược bytecode về cấu trúc thư mục dự án nguyên bản.",
        zh: "我们通过提取内嵌的完整 PYZ 字节码归档，修复被剥离的 Magic Header 头签名，并将字节码反编译恢复为原始工程的目录与模块结构。",
        ru: "Мы распаковываем упакованные исполняемые файлы (PyInstaller, py2exe, cx_Freeze), извлекая полный архив PYZ, восстанавливая заголовки компиляции и декомпилируя байт-код в исходную структуру файлов проекта."
      }
    },
    {
      q: {
        en: "What deliverables are provided for Nuitka, Golang, and Rust binary audits?",
        vi: "Kết quả bàn giao cho các file nhị phân Nuitka C++, Golang và Rust bao gồm những gì?",
        zh: "针对 Nuitka、Golang 和 Rust 原生二进制审计，最终交付什么成果？",
        ru: "Что предоставляется по результатам анализа бинарных файлов Nuitka, Go и Rust?"
      },
      a: {
        en: "Nuitka, Go, and Rust compile directly to native machine code. Full Python source recovery is not applicable for compiled native binaries; instead, we provide surgical binary patches, custom loaders, decompiled pseudocode, pclntab type maps, and complete technical security audit reports.",
        vi: "Nuitka, Go và Rust biên dịch trực tiếp sang mã máy native (C++/LLVM). Vì vậy, kết quả bàn giao sẽ không phải là source code Python mà là bản vá nhị phân độc lập, loader tuỳ chỉnh, bản ánh xạ kiểu dữ liệu pclntab và báo cáo kỹ thuật kiểm thử an toàn toàn diện.",
        zh: "Nuitka、Go 和 Rust 直接编译为原生机器码。原生二进制不适用于纯 Python 源码还原；我们提供精准的二进制补丁、定制 Loader、反编译伪代码、pclntab 符号类型映射表以及完整的技术安全审计报告。",
        ru: "Nuitka, Go и Rust компилируются напрямую в машинный код. Полное восстановление исходного кода Python здесь неприменимо; мы предоставляем точечные бинарные патчи, кастомные загрузчики, декомпилированный псевдокод, карты pclntab и технические отчеты аудита."
      }
    },
    {
      q: {
        en: "What is the standard turnaround time for project delivery?",
        vi: "Thời gian xử lý và bàn giao dự án tiêu chuẩn là bao lâu?",
        zh: "标准项目的分析与交付周期是多久？",
        ru: "Каковы стандартные сроки выполнения и передачи отчета?"
      },
      a: {
        en: "Standard PyArmor and PyInstaller source code recoveries are delivered within 12 to 24 hours. Complex native binary audits (Nuitka, Golang, Rust) typically require 24 to 48 hours depending on control flow complexity.",
        vi: "Các dự án phục hồi mã nguồn PyArmor và PyInstaller tiêu chuẩn được bàn giao trong vòng 12 đến 24 giờ. Các phân tích nhị phân native phức tạp (Nuitka, Go, Rust) thường mất từ 24 đến 48 giờ tùy theo độ phức tạp của luồng điều khiển.",
        zh: "标准的 PyArmor 与 PyInstaller 源码恢复通常在 12 至 24 小时内完成交付。复杂的原生二进制审计（Nuitka、Golang、Rust）通常需要 24 至 48 小时。",
        ru: "Стандартное восстановление PyArmor и PyInstaller выполняется в течение 12–24 часов. Комплексный аудит нативных файлов (Nuitka, Go, Rust) занимает 24–48 часов в зависимости от сложности графа потока управления."
      }
    },
    {
      q: {
        en: "How do I place an inquiry or request a technical security evaluation?",
        vi: "Làm thế nào để gửi yêu cầu phân tích hoặc đặt lịch kiểm thử bảo mật?",
        zh: "如何提交分析需求或联系技术专家下单？",
        ru: "Как отправить запрос на анализ или связаться со специалистом?"
      },
      a: {
        en: "You can reach out directly to our Lead Analyst via Telegram: @tnk_k07vn or join our official community channel @kcracker007 and group @cybercrlm3chat for rapid consultation.",
        vi: "Bạn có thể liên hệ trực tiếp với Chuyên viên Kỹ thuật qua Telegram: @tnk_k07vn hoặc tham gia Kênh thông báo chính thức @kcracker007 và Nhóm trao đổi @cybercrlm3chat để được tư vấn nhanh nhất.",
        zh: "您可以直接通过 Telegram 联系首席分析专家: @tnk_k07vn，或加入我们的官方公告频道 @kcracker007 与技术交流群 @cybercrlm3chat 获取快速评估支持。",
        ru: "Вы можете связаться напрямую с ведущим аналитиком в Telegram: @tnk_k07vn или подписаться на официальный канал @kcracker007 и чат @cybercrlm3chat для оперативной консультации."
      }
    }
  ];

  const getHeading = () => {
    switch (lang) {
      case "vi":
        return {
          badge: "CÂU HỎI THƯỜNG GẶP & GIẢI ĐÁP KỸ THUẬT",
          title: "Câu Hỏi Thường Gặp Về Dịch Vụ Phân Tích & Giải Mã",
          desc: "Giải đáp chi tiết các thắc mắc về năng lực phục hồi mã nguồn, quy trình kiểm thử và thời gian bàn giao."
        };
      case "zh":
        return {
          badge: "常见问题与技术解答",
          title: "软件安全审计与源码恢复常见问题",
          desc: "关于 PyArmor 源码提取、PyInstaller 解包及原生二进制审计的深度技术答疑。"
        };
      case "ru":
        return {
          badge: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
          title: "Часто задаваемые вопросы по аудиту и дешифрованию",
          desc: "Подробные ответы о возможностях восстановления исходного кода, сроках и безопасности."
        };
      default:
        return {
          badge: "FREQUENTLY ASKED QUESTIONS",
          title: "Technical Knowledge & Frequently Asked Questions",
          desc: "Comprehensive answers regarding PyArmor source extraction, binary audits, and turnaround SLA."
        };
    }
  };

  const h = getHeading();

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#1f2937]/80">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
          <HelpCircle className="w-4 h-4" />
          <span>{h.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {h.title}
        </h2>
        <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {h.desc}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          const questionText = item.q[lang] || item.q.en;
          const answerText = item.a[lang] || item.a.en;

          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-neon-cyan/50 shadow-[0_0_30px_rgba(0,245,212,0.15)] bg-[#0c121e]" : "border-[#1f2937] hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neon-cyan font-bold shrink-0">
                    {`0${idx + 1}.`}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {questionText}
                  </span>
                </div>
                <div className={`p-1.5 rounded-lg bg-[#070a10] border border-[#1f2937] shrink-0 transition-transform ${isOpen ? "rotate-180 text-neon-cyan border-neon-cyan/40" : "text-gray-400"}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans border-t border-[#141d2e] pt-4 animate-in fade-in duration-150">
                  <p>{answerText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Telegram Consultation CTA */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-card border border-neon-cyan/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,245,212,0.1)]">
        <div className="text-left space-y-1">
          <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-neon-green" />
            <span>Have a Custom Binary Analysis Target?</span>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Direct 1-on-1 confidential consultation with Lead Operator KCRACKER.
          </div>
        </div>

        <a
          href="https://t.me/tnk_k07vn"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-neon-cyan text-obsidian font-mono text-xs font-black hover:bg-[#00d8bc] transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.5)] shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>CONTACT ADMIN (@tnk_k07vn)</span>
        </a>
      </div>
    </section>
  );
}
