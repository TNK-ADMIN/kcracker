import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kcracker.asia"),
  title: {
    default: "KCRACKER.ASIA | Software Security Audit, Decompilation & Source Code Recovery Hub",
    template: "%s | KCRACKER.ASIA",
  },
  description:
    "KCRACKER.ASIA - Tier-1 Software Security Evaluation, PyArmor 7/8/9 Decryption, PyInstaller Archive Unpacking, and Native Binary Analysis for Nuitka C++, Golang, and Rust.",
  
  // Multilingual SEO Keywords for Global Search Engines & AI Bots
  keywords: [
    // English keywords
    "KCRACKER",
    "KCRACKER.ASIA",
    "kcracker",
    "kcracker007",
    "tnk_k07vn",
    "Software Security Audit",
    "Source Code Recovery",
    "Binary Decompilation",
    "PyArmor Decryption",
    "PyArmor 7 Decryption",
    "PyArmor 8 Decryption",
    "PyArmor 9 Decryption",
    "PyArmor source code recovery",
    "PyInstaller unpacker",
    "PyInstaller PYZ extract",
    "py2exe unpack",
    "cx_Freeze extract",
    "Nuitka binary audit",
    "Nuitka decompilation",
    "Nuitka crack patch",
    "Golang reverse engineering",
    "Go pclntab recovery",
    "Rust binary audit",
    "Rust vtable analysis",
    "Binary deobfuscation",
    "JIT Evaluator hook",

    // Vietnamese keywords (Tiếng Việt)
    "phân tích mã nguồn",
    "kiểm thử an toàn phần mềm",
    "dịch ngược phần mềm",
    "giải mã pyarmor",
    "phục hồi mã nguồn pyarmor",
    "giải mã pyarmor 7",
    "giải mã pyarmor 8",
    "giải mã pyarmor 9",
    "trích xuất pyinstaller",
    "lấy source code pyinstaller",
    "phân tích nuitka",
    "phân tích golang",
    "phân tích rust",
    "bản vá phần mềm",
    "kcracker việt nam",

    // Chinese keywords (中文 - Baidu & Google CN)
    "软件安全审计",
    "源码恢复",
    "逆向工程",
    "PyArmor解密",
    "PyArmor 7解密",
    "PyArmor 8解密",
    "PyArmor 9源码还原",
    "PyArmor Enterprise解密",
    "PyInstaller解包",
    "PyInstaller提取源码",
    "PYZ解压",
    "Nuitka反编译",
    "Nuitka二进制分析",
    "Go语言逆向",
    "Golang符号表恢复",
    "Rust逆向工程",
    "二进制去混淆",

    // Russian keywords (Русский - Yandex & Google RU)
    "аудит безопасности программ",
    "восстановление исходного кода",
    "декомпиляция",
    "дешифрование PyArmor",
    "восстановление PyArmor 7",
    "восстановление PyArmor 8 9",
    "PyArmor Enterprise декомпиляция",
    "распаковка PyInstaller",
    "извлечение PYZ архива",
    "декомпиляция Nuitka",
    "анализ бинарных файлов Go",
    "реверс инжиниринг Rust",
    "деобфускация",
    "патчинг бинарных файлов"
  ],

  authors: [{ name: "KCRACKER Special Operations Team", url: "https://t.me/kcracker007" }],
  creator: "KCRACKER",
  publisher: "KCRACKER.ASIA",

  alternates: {
    canonical: "https://kcracker.asia",
    languages: {
      "en-US": "https://kcracker.asia",
      "vi-VN": "https://kcracker.asia",
      "zh-CN": "https://kcracker.asia",
      "ru-RU": "https://kcracker.asia",
      "x-default": "https://kcracker.asia",
    },
  },

  openGraph: {
    title: "KCRACKER.ASIA // Software Security Audit & Source Code Recovery",
    description:
      "Global deep-tech reverse engineering portal. 100% full source recovery for PyArmor 7/8/9 & PyInstaller. Specialized binary audits for Nuitka, Go, and Rust.",
    url: "https://kcracker.asia",
    siteName: "KCRACKER.ASIA",
    locale: "en_US",
    alternateLocale: ["vi_VN", "zh_CN", "ru_RU"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KCRACKER.ASIA // Software Security Audit & Source Recovery",
    description:
      "Deep-tech security audit, PyArmor 7/8/9 source recovery, PyInstaller extraction, and native binary analysis.",
    creator: "@kcracker007",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ultra Rich Schema.org JSON-LD (ProfessionalService + WebSite + FAQPage + OfferCatalog)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://kcracker.asia/#website",
        "url": "https://kcracker.asia",
        "name": "KCRACKER.ASIA",
        "alternateName": [
          "KCRACKER LABS",
          "KCRACKER Security",
          "KCRACKER Reverse Engineering",
          "KCRACKER 软件安全",
          "KCRACKER Аудит ПО"
        ],
        "description": "Professional Software Security Auditing, PyArmor Decryption, and Binary Source Code Recovery Hub.",
        "inLanguage": ["en", "vi", "zh", "ru"]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://kcracker.asia/#organization",
        "name": "KCRACKER.ASIA",
        "url": "https://kcracker.asia",
        "logo": "https://kcracker.asia/favicon.ico",
        "knowsAbout": [
          "Software Security Audit",
          "Reverse Engineering",
          "PyArmor Decryption",
          "Python Source Code Recovery",
          "PyInstaller Unpacking",
          "Nuitka Binary Analysis",
          "Golang Reverse Engineering",
          "Rust Binary Evaluation"
        ],
        "disambiguatingDescription": "KCRACKER.ASIA is a software security and reverse engineering service portal. It is NOT related to food, crackers, snacks, Kellogg, or KrackerKing.",
        "sameAs": [
          "https://t.me/kcracker007",
          "https://t.me/cybercrlm3chat",
          "https://t.me/tnk_k07vn"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "technical support",
          "url": "https://t.me/tnk_k07vn",
          "availableLanguage": ["English", "Vietnamese", "Chinese", "Russian"]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Security Evaluation & Binary Source Recovery Catalog",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PyArmor 7/8/9 Decryption & Full Source Code Recovery",
                "alternateName": [
                  "Giải mã và phục hồi mã nguồn PyArmor 7/8/9 (.py)",
                  "PyArmor 7/8/9 源码还原与 JIT 解密",
                  "Восстановление и дешифрование PyArmor 7/8/9 в исходный код"
                ],
                "description": "Full source code extraction and AST reconstruction for PyArmor protected Python applications."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PyInstaller / Packed Executable Decompression (PYZ Extraction)",
                "alternateName": [
                  "Giải nén và phục hồi file PyInstaller PYZ",
                  "PyInstaller 解包与 PYZ 源码提取",
                  "Распаковка PyInstaller и извлечение PYZ"
                ],
                "description": "Full PYZ archive extraction and project hierarchy restoration."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Native Binary Security Audit (Nuitka, Golang, Rust)",
                "alternateName": [
                  "Kiểm thử bảo mật và phân tích nhị phân Nuitka, Go, Rust",
                  "Nuitka、Golang、Rust 原生二进制安全评估与优化",
                  "Аудит безопасности нативных бинарных файлов Nuitka, Golang, Rust"
                ],
                "description": "Deep-tech binary control flow graph evaluation, symbol reconstruction, and integrity patching."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://kcracker.asia/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you recover 100% full original source code from PyArmor 7, 8, and 9?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For PyArmor 7, PyArmor 8, PyArmor 9 (including Pro and Enterprise editions), we hook the runtime JIT Evaluator and memory sandbox to dump clean execution frames, reconstructing the full Abstract Syntax Tree (AST) into readable .py source files."
            }
          },
          {
            "@type": "Question",
            "name": "How does PyInstaller and packed executable unpacking work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We unpack standard Python packaging binaries (PyInstaller, py2exe, cx_Freeze) by extracting the entire embedded PYZ bytecode archive, restoring stripped magic header signatures, and decompiling bytecode into original project file hierarchies."
            }
          },
          {
            "@type": "Question",
            "name": "What deliverables are provided for Nuitka, Golang, and Rust binary audits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nuitka, Go, and Rust compile directly to native machine code. We provide surgical binary patches, custom loaders, decompiled pseudocode, pclntab type maps, and complete technical security audit reports."
            }
          },
          {
            "@type": "Question",
            "name": "What is the standard turnaround time for project delivery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard PyArmor and PyInstaller source code recoveries are delivered within 12 to 24 hours. Complex native binary audits typically require 24 to 48 hours."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="author" href="https://kcracker.asia/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-obsidian text-gray-100 min-h-screen selection:bg-neon-cyan selection:text-obsidian`}
      >
        {children}
      </body>
    </html>
  );
}
