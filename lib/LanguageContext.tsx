"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "vi" | "zh" | "ru";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Header
    nav_services: "// 01. SERVICES & VECTORS",
    nav_channel: "CHANNEL",
    nav_group: "GROUP",
    nav_contact: "CONSULT TECH (@tnk_k07vn)",
    brand_sub: "SOFTWARE SECURITY AUDIT & ANALYSIS HUB",
    lead_status: "LEAD ANALYST: KCRACKER // ACTIVE",
    
    // Hero
    hero_badge_sub: "OFFICIAL SOFTWARE SECURITY AUDIT & ANALYSIS HUB",
    hero_title_1: "SECURITY AUDIT",
    hero_title_2: "& SOURCE RECOVERY.",
    hero_desc: "Advanced binary security evaluation & de-obfuscation services by KCRACKER. Comprehensive structure analysis for PyArmor 7/8/9, PyInstaller, Nuitka, Golang, and Rust.",
    metric_1_val: "100%",
    metric_1_label: "Recovery Rate",
    metric_1_sub: "PyArmor & PyInstaller",
    metric_2_val: "EXPERT",
    metric_2_label: "Binary Audit",
    metric_2_sub: "Nuitka, Go, Rust",
    metric_3_val: "12-24H",
    metric_3_label: "Turnaround",
    metric_3_sub: "Full Dossier",
    
    // Social connect buttons
    btn_channel: "Channel",
    btn_group: "Group Chat",
    btn_admin: "Tech Specialist",
    btn_order: "ORDER VIA TELEGRAM (@tnk_k07vn)",
    btn_view_services: "SERVICES DIRECTORY",
    trust_1: "Strict Confidentiality Guaranteed",
    trust_2: "Verified Telegram Network",
    trust_3: "KCRACKER.ASIA",

    // Workspace Terminal HUD
    ws_title: "KCRACKER // SOFTWARE SECURITY ANALYSIS WORKSPACE",
    ws_live: "LIVE AUDIT",
    ws_tab_1: "01. Binary Structure",
    ws_tab_2: "02. Security Audit",
    ws_tab_3: "03. Source Recovery (.py)",
    ws_auto_on: "AUTO AUDIT: ON",
    ws_auto_off: "MANUAL STEP",

    // Capabilities Section
    cap_badge: "SOFTWARE SECURITY EVALUATION & ANALYSIS CATALOG",
    cap_title: "Structure Analysis & Security Auditing",
    cap_desc: "Clear scope demarcation between full source code reconstruction and native binary security evaluation.",
    cap_banner_1: "FULL SOURCE CODE RECONSTRUCTION (.PY):",
    cap_banner_1_sub: "PyArmor 7, PyArmor 8/9, PyInstaller",
    cap_banner_2: "NATIVE BINARY EVALUATION & PATCHING:",
    cap_banner_2_sub: "Nuitka, Golang, Rust",

    // Services Cards
    srv_py7_badge: "ANALYSIS & SOURCE RECOVERY",
    srv_py7_title: "PyArmor 7 Structure Analysis & Recovery",
    srv_py7_tag: "Comprehensive decryption & source recovery for PyArmor 7 applications",
    srv_py7_desc: "Deep analysis of runtime execution barriers, restoring clean and fully readable Python Abstract Syntax Trees (AST).",
    srv_py7_c1: "Supports Advanced and Super Mode builds",
    srv_py7_c2: "Reconstructs variables, functions, loops, and imports",
    srv_py7_c3: "Evaluates integrity checks and execution constraints",
    srv_py7_c4: "Standard turnaround handover within 12 - 24 hours",
    srv_py7_out: "Full Source (.py) & Analysis Dossier",
    srv_py7_time: "12 - 24 Hours",

    srv_py8_badge: "ANALYSIS & SOURCE RECOVERY",
    srv_py8_title: "PyArmor 8/9 Security Audit & Recovery",
    srv_py8_tag: "Advanced structure de-obfuscation for enterprise PyArmor 8 and 9 wrappers",
    srv_py8_desc: "Utilizes runtime JIT Evaluator memory hooks to evaluate security boundaries and unmask execution frames in sandbox RAM.",
    srv_py8_c1: "Bypasses environment detection and dynamic integrity monitors",
    srv_py8_c2: "Dumps raw unencrypted frames directly from sandbox RAM",
    srv_py8_c3: "Reconstructs VM mapping algorithms and custom bytecodes",
    srv_py8_c4: "Full support for Pro and Enterprise license builds",
    srv_py8_out: "Full Source (.py) & Analysis Dossier",
    srv_py8_time: "24 - 48 Hours",

    srv_pyinst_badge: "UNPACKING & ARCHIVE RECOVERY",
    srv_pyinst_title: "Python Packed Executables (PyInstaller)",
    srv_pyinst_tag: "Decompression and project recovery for standard Python wrappers",
    srv_pyinst_desc: "Extracts full PYZ bytecode archives from PyInstaller, py2exe, and cx_Freeze binaries, rebuilding header metadata signatures.",
    srv_pyinst_c1: "Extracts full PYZ bytecode archives",
    srv_pyinst_c2: "Rebuilds stripped compiled header metadata signatures",
    srv_pyinst_c3: "Reconstructs original directory structure and modules",
    srv_pyinst_c4: "Delivered cleanly in 12–24 hours",
    srv_pyinst_out: "Original Project Hierarchy & Source Files",
    srv_pyinst_time: "12 - 24 Hours",

    srv_nuitka_badge: "SECURITY AUDIT & OPTIMIZATION",
    srv_nuitka_title: "Nuitka C++ Compiled Executable Audit",
    srv_nuitka_tag: "Security audit & control flow mapping for native Nuitka binaries",
    srv_nuitka_desc: "Nuitka transforms Python directly into native C++ code. We trace C-API bindings, evaluate safety checks, and refine binary execution.",
    srv_nuitka_c1: "Analyzes encrypted embedded resource overlays",
    srv_nuitka_c2: "Maps module metadata hierarchy and C-API bindings",
    srv_nuitka_c3: "Locates and extracts static constant assets in dynamic RAM",
    srv_nuitka_c4: "Optimizes integrity verification and execution conditions",
    srv_nuitka_out: "Binary Patch & Technical Analysis Dossier",
    srv_nuitka_time: "48 Hours",

    srv_go_badge: "SECURITY AUDIT & OPTIMIZATION",
    srv_go_title: "Golang Binary Security Evaluation",
    srv_go_tag: "Pclntab reconstruction, type recovery for Go applications",
    srv_go_desc: "Statically linked Go binaries lack traditional symbols. We reconstruct runtime type metadata (pclntab) and evaluate security logic.",
    srv_go_c1: "Reconstructs stripped Go type metadata and pclntab symbols",
    srv_go_c2: "Analyzes Garble / Go-obfuscated control flow graphs",
    srv_go_c3: "Evaluates and optimizes server authentication routines",
    srv_go_c4: "Produces standalone patched executable with intact runtime",
    srv_go_out: "Optimized Binary & Security Report",
    srv_go_time: "24 - 48 Hours",

    srv_rust_badge: "SECURITY AUDIT & OPTIMIZATION",
    srv_rust_title: "Rust Native Binary Analysis & Audit",
    srv_rust_tag: "LLVM vtable analysis, memory integrity audit for Rust binaries",
    srv_rust_desc: "Highly optimized Rust binaries with aggressive inlining. We locate critical verification functions and refine safety routines.",
    srv_rust_c1: "Recovers vtables and mangled symbol callchains",
    srv_rust_c2: "Evaluates self-protection and memory integrity watchdogs",
    srv_rust_c3: "Analyzes verification logic and secure communication protocols",
    srv_rust_c4: "Generates custom loader or tuned standalone executable",
    srv_rust_out: "Tuned Executable / Loader & Technical Dossier",
    srv_rust_time: "48 - 72 Hours",

    // Compliance
    comp_badge: "SAFETY & CONFIDENTIALITY STANDARDS",
    comp_title: "Professional Security Audit Standards",
    comp_desc: "KCRACKER.ASIA conducts software security evaluations in dedicated air-gapped laboratory environments, enforcing strict enterprise data protection principles.",
    comp_t1: "Isolated Sandbox Processing",
    comp_t1_desc: "Fully air-gapped test enclaves ensuring strict client confidentiality and preventing data leakage.",
    comp_t2: "Deep-Tech Integrity Verification",
    comp_t2_desc: "High-assurance formal verification and comprehensive binary control flow graph evaluation.",
    comp_t3: "Air-Gapped Lab Infrastructure",
    comp_t3_desc: "Dedicated hardware nodes with certified cryptographic erasure upon project delivery.",
    comp_t4: "Non-Disclosure & IP Protection",
    comp_t4_desc: "Strict mutual confidentiality agreements safeguarding proprietary client software architectures.",

    // Footer
    foot_desc: "Specialized software structure analysis, security evaluation, and source code recovery by KCRACKER. Supporting PyArmor 7/8/9, Nuitka, Go, and Rust.",
    foot_network: "// TELEGRAM NETWORK",
    foot_channel: "Announcement Channel: @kcracker007",
    foot_group: "Discussion Group: @cybercrlm3chat",
    foot_admin: "Direct Consultation: @tnk_k07vn",
    foot_core: "// CORE COMPETENCIES",
    foot_requests: "// INTAKE & INQUIRIES",
    foot_contact_btn: "CONSULTATION:",
    foot_sla: "12 - 24H RAPID REPORT DELIVERY",
    foot_rights: "KCRACKER.ASIA. All security analysis rights reserved.",
  },

  vi: {
    // Header
    nav_services: "// 01. DANH MỤC DỊCH VỤ",
    nav_channel: "KÊNH TIN",
    nav_group: "NHÓM CHAT",
    nav_contact: "TƯ VẤN KỸ THUẬT (@tnk_k07vn)",
    brand_sub: "TRUNG TÂM PHÂN TÍCH & KIỂM THỬ BẢO MẬT PHẦN MỀM",
    lead_status: "CHUYÊN VIÊN: KCRACKER // HOẠT ĐỘNG",

    // Hero
    hero_badge_sub: "TRUNG TÂM PHÂN TÍCH & KIỂM THỬ BẢO MẬT PHẦN MỀM CHUYÊN SÂU",
    hero_title_1: "KIỂM THỬ BẢO MẬT",
    hero_title_2: "& PHÂN TÍCH MÃ NGUỒN.",
    hero_desc: "Dịch vụ chuyên sâu bởi KCRACKER: Đánh giá an ninh nhị phân, giải cấu trúc bảo vệ đóng gói và phục hồi cấu trúc mã nguồn hoàn chỉnh cho PyArmor 7/8/9, PyInstaller, Nuitka, Golang và Rust.",
    metric_1_val: "100%",
    metric_1_label: "Tỷ Lệ Phục Hồi",
    metric_1_sub: "PyArmor & PyInstaller",
    metric_2_val: "CHUYÊN SÂU",
    metric_2_label: "Kiểm Thử Nhị Phân",
    metric_2_sub: "Nuitka, Go, Rust",
    metric_3_val: "12-24H",
    metric_3_label: "Thời Gian Bàn Giao",
    metric_3_sub: "Báo Cáo Hoàn Chỉnh",

    // Social connect buttons
    btn_channel: "Kênh Thông Tin",
    btn_group: "Nhóm Trao Đổi",
    btn_admin: "Chuyên Viên Tư Vấn",
    btn_order: "YÊU CẦU PHÂN TÍCH QUA TELEGRAM (@tnk_k07vn)",
    btn_view_services: "DANH MỤC DỊCH VỤ",
    trust_1: "Bảo Mật & Cam Kết Tuyệt Đối",
    trust_2: "Kênh Telegram Xác Thực",
    trust_3: "KCRACKER.ASIA",

    // Workspace Terminal HUD
    ws_title: "KCRACKER // KHÔNG GIAN PHÂN TÍCH AN TOÀN PHẦN MỀM",
    ws_live: "KIỂM THỬ TRỰC TIẾP",
    ws_tab_1: "01. Phân Tích Cấu Trúc",
    ws_tab_2: "02. Đánh Giá Bảo Mật",
    ws_tab_3: "03. Phục Hồi Mã Nguồn (.py)",
    ws_auto_on: "TỰ ĐỘNG PHÂN TÍCH: BẬT",
    ws_auto_off: "ĐIỀU KHIỂN THỦ CÔNG",

    // Capabilities Section
    cap_badge: "DANH MỤC DỊCH VỤ KIỂM THỬ BẢO MẬT & PHÂN TÍCH PHẦN MỀM",
    cap_title: "Phân Tích Cấu Trúc & Đánh Giá An Ninh",
    cap_desc: "Bảng phân loại phạm vi kỹ thuật rõ ràng giữa phục hồi mã nguồn hoàn chỉnh và kiểm thử tinh chỉnh tệp nhị phân chuyên sâu.",
    cap_banner_1: "PHỤC HỒI MÃ NGUỒN (.PY) HOÀN CHỈNH:",
    cap_banner_1_sub: "PyArmor 7, PyArmor 8/9, PyInstaller",
    cap_banner_2: "KIỂM THỬ & BẢN VÁ NHỊ PHÂN NATIVE:",
    cap_banner_2_sub: "Nuitka, Golang, Rust",

    // Services Cards
    srv_py7_badge: "PHÂN TÍCH & PHỤC HỒI MÃ NGUỒN",
    srv_py7_title: "Phân Tích & Giải Mã Cấu Trúc PyArmor 7",
    srv_py7_tag: "Dịch vụ giải mã và phục hồi mã nguồn toàn diện cho các ứng dụng PyArmor 7",
    srv_py7_desc: "Phân tích chuyên sâu rào cản runtime, gỡ bỏ các ràng buộc thực thi và tái tạo cây cú pháp trừu tượng (AST) Python rõ ràng, dễ đọc hiểu.",
    srv_py7_c1: "Hỗ trợ cấu trúc bản dựng Advanced và Super Mode",
    srv_py7_c2: "Tái cấu trúc đầy đủ biến, hàm, luồng lặp và thư viện",
    srv_py7_c3: "Đánh giá tính toàn vẹn và tối ưu hóa điều kiện thực thi",
    srv_py7_c4: "Tiến độ bàn giao tiêu chuẩn trong vòng 12 - 24 giờ",
    srv_py7_out: "Mã Nguồn Đầy Đủ (.py) & Báo Cáo Phân Tích",
    srv_py7_time: "12 - 24 Giờ",

    srv_py8_badge: "PHÂN TÍCH & PHỤC HỒI MÃ NGUỒN",
    srv_py8_title: "Đánh Giá An Ninh & Giải Mã PyArmor 8/9",
    srv_py8_tag: "Phân tích cấu trúc nâng cao cho các lớp bảo vệ doanh nghiệp PyArmor 8 và 9",
    srv_py8_desc: "Sử dụng kỹ thuật giám sát bộ nhớ JIT Evaluator để đánh giá cơ chế bảo mật và trích xuất khung thực thi nguyên bản trực tiếp từ môi trường cô lập.",
    srv_py8_c1: "Vượt qua các bộ lọc kiểm tra môi trường và giám sát động",
    srv_py8_c2: "Trích xuất trực tiếp các khung thực thi từ bộ nhớ sandbox",
    srv_py8_c3: "Tái tạo thuật toán ánh xạ VM và luồng bytecode tùy chỉnh",
    srv_py8_c4: "Hỗ trợ đầy đủ các bản dựng Pro và Enterprise",
    srv_py8_out: "Mã Nguồn Đầy Đủ (.py) & Báo Cáo Phân Tích",
    srv_py8_time: "24 - 48 Giờ",

    srv_pyinst_badge: "GIẢI NÉN & KHÔI PHỤC DỰ ÁN",
    srv_pyinst_title: "Phân Tích File Đóng Gói Python (PyInstaller)",
    srv_pyinst_tag: "Giải nén và phục hồi kịch bản cho các trình bao đóng gói Python tiêu chuẩn",
    srv_pyinst_desc: "Trích xuất toàn bộ kho lưu trữ PYZ từ các file thực thi PyInstaller, py2exe và cx_Freeze, phục hồi các trường tiêu đề và giải nén bytecode hoàn chỉnh.",
    srv_pyinst_c1: "Trích xuất đầy đủ kho lưu trữ bytecode PYZ",
    srv_pyinst_c2: "Tái tạo cấu trúc chữ ký tiêu đề biên dịch bị lược bỏ",
    srv_pyinst_c3: "Khôi phục nguyên bản cây thư mục và các module dự án",
    srv_pyinst_c4: "Bàn giao trọn gói trong 12–24 giờ",
    srv_pyinst_out: "Cấu Trúc Dự Án Nguyên Bản & File Mã Nguồn",
    srv_pyinst_time: "12 - 24 Giờ",

    srv_nuitka_badge: "KIỂM THỬ BẢO MẬT & TỐI ƯU HÓA",
    srv_nuitka_title: "Đánh Giá An Ninh File Biên Dịch C++ Nuitka",
    srv_nuitka_tag: "Kiểm thử bảo mật, phân tích luồng điều khiển cho file nhị phân Nuitka",
    srv_nuitka_desc: "Nuitka biên dịch Python trực tiếp sang mã máy C++. Chúng tôi định vị các liên kết C-API, đánh giá các điểm kiểm tra an toàn và tinh chỉnh luồng thực thi trong file nhị phân.",
    srv_nuitka_c1: "Phân tích các lớp tài nguyên nhúng được mã hóa",
    srv_nuitka_c2: "Ánh xạ cây phân cấp module và các hàm C-API liên kết",
    srv_nuitka_c3: "Định vị và trích xuất hằng số tĩnh trong bộ nhớ động",
    srv_nuitka_c4: "Tối ưu hóa các điểm kiểm tra tính toàn vẹn và bản quyền",
    srv_nuitka_out: "Bản Vá Nhị Phân & Hồ Sơ Phân Tích Kỹ Thuật",
    srv_nuitka_time: "48 Giờ",

    srv_go_badge: "KIỂM THỬ BẢO MẬT & TỐI ƯU HÓA",
    srv_go_title: "Phân Tích & Kiểm Thử File Nhị Phân Golang",
    srv_go_tag: "Tái tạo bảng pclntab, phân tích kiểu dữ liệu cho ứng dụng Go",
    srv_go_desc: "Các file Go liên kết tĩnh không có symbol truyền thống. Chúng tôi khôi phục metadata kiểu dữ liệu runtime (pclntab), phân tích luồng goroutine và đánh giá bảo mật logic.",
    srv_go_c1: "Tái tạo metadata kiểu dữ liệu Go và bảng ký hiệu pclntab",
    srv_go_c2: "Phân tích đồ thị luồng điều khiển của Garble / Go-obfuscator",
    srv_go_c3: "Đánh giá và tối ưu hóa các điểm xác thực kết nối máy chủ",
    srv_go_c4: "Tạo bản thực thi độc lập với tính toàn vẹn runtime nguyên vẹn",
    srv_go_out: "File Thực Thi Đã Tinh Chỉnh & Báo Cáo An Ninh",
    srv_go_time: "24 - 48 Giờ",

    srv_rust_badge: "KIỂM THỬ BẢO MẬT & TỐI ƯU HÓA",
    srv_rust_title: "Đánh Giá An Toàn & Phân Tích Nhị Phân Rust",
    srv_rust_tag: "Phân tích vtable LLVM, kiểm tra tính toàn vẹn bộ nhớ cho file Rust",
    srv_rust_desc: "Các file Rust tối ưu hóa cao với inlining phức tạp. Chúng tôi định vị các hàm then chốt qua panic strings, theo dõi vtable của trait và tinh chỉnh điểm kiểm tra bảo mật.",
    srv_rust_c1: "Khôi phục vtable và chuỗi gọi hàm của các symbol bị mangled",
    srv_rust_c2: "Đánh giá cơ chế tự bảo vệ và kiểm tra tính toàn vẹn bộ nhớ",
    srv_rust_c3: "Phân tích logic kiểm tra bản quyền và giao thức bảo mật",
    srv_rust_c4: "Cung cấp loader bản vá hoặc file nhị phân độc lập đã hiệu chỉnh",
    srv_rust_out: "File Đã Hiệu Chỉnh / Loader & Báo Cáo Kỹ Thuật",
    srv_rust_time: "48 - 72 Giờ",

    // Compliance
    comp_badge: "TIÊU CHUẨN AN TOÀN & BẢO MẬT",
    comp_title: "Tiêu Chuẩn Kiểm Thử Chuyên Nghiệp",
    comp_desc: "KCRACKER.ASIA vận hành hệ thống kiểm thử bảo mật và phân tích phần mềm trong môi trường độc lập, tuân thủ các nguyên tắc bảo mật thông tin nghiêm ngặt cho doanh nghiệp và nhà phát triển.",
    comp_t1: "Cô Lập Dữ Liệu",
    comp_t1_desc: "Môi trường kiểm thử cô lập hoàn toàn (Air-gapped Sandbox), đảm bảo an toàn dữ liệu tuyệt đối.",
    comp_t2: "Kiểm Định Chuyên Sâu",
    comp_t2_desc: "Phương pháp kiểm thử chuẩn xác cao, phân tích luồng thực thi chuyên sâu và đánh giá tính toàn vẹn.",
    comp_t3: "An Toàn Bảo Mật",
    comp_t3_desc: "Tất cả các tệp phân tích được xử lý trong hệ thống lab chuyên dụng và thực hiện xóa hủy dữ liệu an toàn.",
    comp_t4: "Cam Kết Bảo Mật",
    comp_t4_desc: "Cam kết tuân thủ quy định bảo mật, bảo vệ quyền sở hữu cấu trúc và thông tin dự án.",

    // Footer
    foot_desc: "Dịch vụ phân tích cấu trúc, kiểm thử an toàn và phục hồi mã nguồn phần mềm chuyên sâu bởi KCRACKER. Hỗ trợ PyArmor 7/8/9, Nuitka, Go và Rust.",
    foot_network: "// MẠNG LƯỚI TELEGRAM",
    foot_channel: "Kênh Thông Báo: @kcracker007",
    foot_group: "Nhóm Thảo Luận: @cybercrlm3chat",
    foot_admin: "Tư Vấn Trực Tiếp: @tnk_k07vn",
    foot_core: "// NĂNG LỰC CỐT LÕI",
    foot_requests: "// TIẾP NHẬN YÊU CẦU",
    foot_contact_btn: "LIÊN HỆ TƯ VẤN:",
    foot_sla: "BÀN GIAO BÁO CÁO TRONG 12 - 24H",
    foot_rights: "KCRACKER.ASIA. Mọi quyền phân tích & kiểm thử được bảo lưu.",
  },

  zh: {
    // Header
    nav_services: "// 01. 服务与方向",
    nav_channel: "频道",
    nav_group: "群组",
    nav_contact: "技术咨询 (@tnk_k07vn)",
    brand_sub: "软件安全审计与分析中心",
    lead_status: "首席分析师: KCRACKER // 在线",

    // Hero
    hero_badge_sub: "官方软件安全审计与深度分析中心",
    hero_title_1: "安全审计",
    hero_title_2: "& 源码深度恢复.",
    hero_desc: "由 KCRACKER 提供的专业二进制安全评估与去混淆服务。支持 PyArmor 7/8/9、PyInstaller、Nuitka、Golang 与 Rust 的完整结构分析与源码还原。",
    metric_1_val: "100%",
    metric_1_label: "恢复完整率",
    metric_1_sub: "PyArmor 与 PyInstaller",
    metric_2_val: "深度审计",
    metric_2_label: "二进制分析",
    metric_2_sub: "Nuitka, Go, Rust",
    metric_3_val: "12-24H",
    metric_3_label: "交付周期",
    metric_3_sub: "完整技术报告",

    // Social connect buttons
    btn_channel: "官方频道",
    btn_group: "讨论群组",
    btn_admin: "技术专家",
    btn_order: "通过 TELEGRAM 下单 (@tnk_k07vn)",
    btn_view_services: "查看服务目录",
    trust_1: "严格保密承诺",
    trust_2: "Telegram 官方认证",
    trust_3: "KCRACKER.ASIA",

    // Workspace Terminal HUD
    ws_title: "KCRACKER // 软件安全分析工作台",
    ws_live: "实时审计",
    ws_tab_1: "01. 二进制分析",
    ws_tab_2: "02. 安全评估",
    ws_tab_3: "03. 源码还原 (.py)",
    ws_auto_on: "自动分析: 开启",
    ws_auto_off: "手动切换",

    // Capabilities Section
    cap_badge: "软件安全评估与分析目录",
    cap_title: "结构分析与安全审计",
    cap_desc: "在完整源码重构与原生二进制安全评估之间建立清晰的技术边界。",
    cap_banner_1: "完整源码恢复 (.PY):",
    cap_banner_1_sub: "PyArmor 7, PyArmor 8/9, PyInstaller",
    cap_banner_2: "原生二进制评估与补丁:",
    cap_banner_2_sub: "Nuitka, Golang, Rust",

    // Services Cards
    srv_py7_badge: "分析与源码恢复",
    srv_py7_title: "PyArmor 7 结构分析与解密",
    srv_py7_tag: "面向 PyArmor 7 应用程序的全面解密与源码恢复服务",
    srv_py7_desc: "深入分析运行时执行屏障，消除反调试钩子，并还原清晰易读的 Python 抽象语法树 (AST)。",
    srv_py7_c1: "支持 Advanced 及 Super Mode 构建架构",
    srv_py7_c2: "完整重构变量、函数、循环结构与依赖导入",
    srv_py7_c3: "评估完整性校验与执行约束",
    srv_py7_c4: "标准交付周期 12 - 24 小时",
    srv_py7_out: "完整源代码 (.py) 及分析报告",
    srv_py7_time: "12 - 24 小时",

    srv_py8_badge: "分析与源码恢复",
    srv_py8_title: "PyArmor 8/9 安全审计与深度恢复",
    srv_py8_tag: "针对 PyArmor 8/9 企业级封装的高级反混淆技术",
    srv_py8_desc: "利用 JIT Evaluator 内存钩子评估安全边界，并在沙箱内存中直接转储未混淆的代码帧。",
    srv_py8_c1: "绕过环境检测与动态完整性监视器",
    srv_py8_c2: "直接从沙箱 RAM 转储未加密执行帧",
    srv_py8_c3: "重构虚拟机映射算法与自定义字节码",
    srv_py8_c4: "全面支持 Pro 与 Enterprise 授权构建",
    srv_py8_out: "完整源代码 (.py) 及分析报告",
    srv_py8_time: "24 - 48 小时",

    srv_pyinst_badge: "解包与工程还原",
    srv_pyinst_title: "Python 打包可执行程序 (PyInstaller)",
    srv_pyinst_tag: "针对标准 Python 打包封装的解包与脚本还原",
    srv_pyinst_desc: "从 PyInstaller、py2exe 及 cx_Freeze 二进制文件中提取完整 PYZ 归档，重建头部元数据签名。",
    srv_pyinst_c1: "提取完整 PYZ 字节码归档",
    srv_pyinst_c2: "重建被剥离的已编译头部元数据签名",
    srv_pyinst_c3: "恢复原始目录层次结构与模块",
    srv_pyinst_c4: "12-24 小时内干净交付",
    srv_pyinst_out: "原始项目结构与源代码文件",
    srv_pyinst_time: "12 - 24 小时",

    srv_nuitka_badge: "安全审计与优化",
    srv_nuitka_title: "Nuitka C++ 编译程序安全评估",
    srv_nuitka_tag: "Nuitka 原生二进制的安全审计与控制流映射",
    srv_nuitka_desc: "Nuitka 将 Python 直接转换为原生 C++ 代码。我们跟踪 C-API 绑定，评估安全检查并微调执行逻辑。",
    srv_nuitka_c1: "分析加密的嵌入式资源层",
    srv_nuitka_c2: "映射模块元数据层级与 C-API 绑定",
    srv_nuitka_c3: "在动态 RAM 中定位并提取静态常量资产",
    srv_nuitka_c4: "优化完整性验证与授权逻辑",
    srv_nuitka_out: "二进制补丁及技术分析报告",
    srv_nuitka_time: "48 小时",

    srv_go_badge: "安全审计与优化",
    srv_go_title: "Golang 二进制安全评估与分析",
    srv_go_tag: "Go 应用程序的 pclntab 重构与类型恢复",
    srv_go_desc: "静态链接的 Go 二进制文件缺乏传统符号。我们恢复运行时类型元数据 (pclntab) 并评估安全逻辑。",
    srv_go_c1: "重构被剥离的 Go 类型元数据与 pclntab 符号",
    srv_go_c2: "分析 Garble / Go 混淆控制流图",
    srv_go_c3: "评估并优化服务器心跳与授权验证例程",
    srv_go_c4: "生成具备完整运行时完整性的独立可执行文件",
    srv_go_out: "优化后可执行文件及安全报告",
    srv_go_time: "24 - 48 小时",

    srv_rust_badge: "安全审计与优化",
    srv_rust_title: "Rust 原生二进制安全分析与审计",
    srv_rust_tag: "Rust 二进制的 LLVM vtable 分析与内存完整性审计",
    srv_rust_desc: "高度优化的 Rust 二进制文件具有激进的内联。我们通过 panic 字符串定位关键验证函数并微调例程。",
    srv_rust_c1: "恢复 vtable 及被混淆的符号调用链",
    srv_rust_c2: "评估自保护机制与内存完整性监视器",
    srv_rust_c3: "分析验证逻辑与安全通信协议",
    srv_rust_c4: "生成定制 Loader 或微调后独立可执行文件",
    srv_rust_out: "调优后可执行文件 / Loader 及技术报告",
    srv_rust_time: "48 - 72 小时",

    // Compliance
    comp_badge: "安全与保密标准",
    comp_title: "专业安全审计标准",
    comp_desc: "KCRACKER.ASIA 在专用的物理隔离实验室环境中执行软件安全评估，严格执行企业级数据保护原则。",
    comp_t1: "物理隔离处理",
    comp_t1_desc: "完全物理隔离的测试沙箱环境，确保严格的客户机密性并防止数据泄露。",
    comp_t2: "深度完整性验证",
    comp_t2_desc: "高可靠性形式化验证与全面的二进制控制流图评估。",
    comp_t3: "实验室安全基础设施",
    comp_t3_desc: "专用硬件节点，在项目交付后执行权威加密清除。",
    comp_t4: "严格保密与 IP 保护",
    comp_t4_desc: "双向保密协议，严格保护客户专属软件架构与代码资产。",

    // Footer
    foot_desc: "由 KCRACKER 提供的专业软件结构分析、安全评估与源代码恢复服务。支持 PyArmor 7/8/9、Nuitka、Go 与 Rust。",
    foot_network: "// TELEGRAM 官方网络",
    foot_channel: "公告频道: @kcracker007",
    foot_group: "讨论群组: @cybercrlm3chat",
    foot_admin: "直接咨询: @tnk_k07vn",
    foot_core: "// 核心能力",
    foot_requests: "// 需求接入",
    foot_contact_btn: "咨询专家:",
    foot_sla: "12 - 24 小时快速交付报告",
    foot_rights: "KCRACKER.ASIA. 保留所有分析与评估权利。",
  },

  ru: {
    // Header
    nav_services: "// 01. УСЛУГИ И НАПРАВЛЕНИЯ",
    nav_channel: "КАНАЛ",
    nav_group: "ГРУППА",
    nav_contact: "ТЕХ. КОНСУЛЬТАЦИЯ (@tnk_k07vn)",
    brand_sub: "ЦЕНТР АУДИТА БЕЗОПАСНОСТИ И АНАЛИЗА ПО",
    lead_status: "ВЕДУЩИЙ АНАЛИТИК: KCRACKER // ОНЛАЙН",

    // Hero
    hero_badge_sub: "ОФИЦИАЛЬНЫЙ ЦЕНТР АУДИТА БЕЗОПАСНОСТИ И АНАЛИЗА ПО",
    hero_title_1: "АУДИТ БЕЗОПАСНОСТИ",
    hero_title_2: "& ВОССТАНОВЛЕНИЕ КОДА.",
    hero_desc: "Профессиональный анализ бинарных файлов и деобфускация от KCRACKER. Полная реконструкция структуры для PyArmor 7/8/9, PyInstaller, Nuitka, Golang и Rust.",
    metric_1_val: "100%",
    metric_1_label: "Восстановление",
    metric_1_sub: "PyArmor & PyInstaller",
    metric_2_val: "ЭКСПЕРТ",
    metric_2_label: "Бинарный аудит",
    metric_2_sub: "Nuitka, Go, Rust",
    metric_3_val: "12-24Ч",
    metric_3_label: "Сроки отчета",
    metric_3_sub: "Полное досье",

    // Social connect buttons
    btn_channel: "Канал",
    btn_group: "Чат-группа",
    btn_admin: "Специалист",
    btn_order: "ЗАКАЗАТЬ В TELEGRAM (@tnk_k07vn)",
    btn_view_services: "КАТАЛОГ УСЛУГ",
    trust_1: "Полная конфиденциальность",
    trust_2: "Проверенный Telegram-хаб",
    trust_3: "KCRACKER.ASIA",

    // Workspace Terminal HUD
    ws_title: "KCRACKER // РАБОЧАЯ СРЕДА АНАЛИЗА БЕЗОПАСНОСТИ ПО",
    ws_live: "АКТИВНЫЙ АУДИТ",
    ws_tab_1: "01. Анализ структуры",
    ws_tab_2: "02. Аудит безопасности",
    ws_tab_3: "03. Исходный код (.py)",
    ws_auto_on: "АВТО-АНАЛИЗ: ВКЛ",
    ws_auto_off: "РУЧНОЙ ШАГ",

    // Capabilities Section
    cap_badge: "КАТАЛОГ ОЦЕНКИ БЕЗОПАСНОСТИ И АНАЛИЗА ПО",
    cap_title: "Структурный анализ и аудит безопасности",
    cap_desc: "Четкое разграничение между полной реконструкцией исходного кода и анализом нативных бинарных файлов.",
    cap_banner_1: "ПОЛНОЕ ВОССТАНОВЛЕНИЕ ИСХОДНОГО КОДА (.PY):",
    cap_banner_1_sub: "PyArmor 7, PyArmor 8/9, PyInstaller",
    cap_banner_2: "ОЦЕНКА И ПАТЧИНГ НАТИВНЫХ БИНАРНЫХ ФАЙЛОВ:",
    cap_banner_2_sub: "Nuitka, Golang, Rust",

    // Services Cards
    srv_py7_badge: "АНАЛИЗ И ВОССТАНОВЛЕНИЕ КОДА",
    srv_py7_title: "Анализ и дешифрование структуры PyArmor 7",
    srv_py7_tag: "Комплексное дешифрование и восстановление кода приложений PyArmor 7",
    srv_py7_desc: "Глубокий анализ барьеров времени выполнения, снятие антиотладочных хуков и восстановление читаемого Python AST.",
    srv_py7_c1: "Поддержка сборок Advanced и Super Mode",
    srv_py7_c2: "Полная реконструкция переменных, функций, циклов и импортов",
    srv_py7_c3: "Оценка целостности и оптимизация условий выполнения",
    srv_py7_c4: "Стандартный срок выполнения 12 - 24 часа",
    srv_py7_out: "Полный исходный код (.py) и технический отчет",
    srv_py7_time: "12 - 24 Часа",

    srv_py8_badge: "АНАЛИЗ И ВОССТАНОВЛЕНИЕ КОДА",
    srv_py8_title: "Аудит безопасности и анализ PyArmor 8/9",
    srv_py8_tag: "Продвинутая деобфускация для корпоративной защиты PyArmor 8 и 9",
    srv_py8_desc: "Использование хуков JIT Evaluator для оценки границ безопасности и выгрузки кадров выполнения из изолированной памяти RAM.",
    srv_py8_c1: "Обход проверки окружения и динамических мониторов целостности",
    srv_py8_c2: "Прямой дамп нешифрованных кадров из памяти песочницы",
    srv_py8_c3: "Реконструкция алгоритмов VM и пользовательского байт-кода",
    srv_py8_c4: "Полная поддержка версий Pro и Enterprise",
    srv_py8_out: "Полный исходный код (.py) и технический отчет",
    srv_py8_time: "24 - 48 Часов",

    srv_pyinst_badge: "РАСПАКОВКА И ВОССТАНОВЛЕНИЕ",
    srv_pyinst_title: "Анализ упакованных Python EXE (PyInstaller)",
    srv_pyinst_tag: "Распаковка и восстановление скриптов из стандартных упаковщиков",
    srv_pyinst_desc: "Извлечение полных PYZ-архивов из PyInstaller, py2exe и cx_Freeze, восстановление поврежденных метаданных заголовков.",
    srv_pyinst_c1: "Извлечение полных архивов байт-кода PYZ",
    srv_pyinst_c2: "Восстановление сигнатур заголовков компиляции",
    srv_pyinst_c3: "Восстановление структуры каталогов и модулей",
    srv_pyinst_c4: "Чистая передача в течение 12–24 часов",
    srv_pyinst_out: "Оригинальная структура проекта и исходные файлы",
    srv_pyinst_time: "12 - 24 Часа",

    srv_nuitka_badge: "АУДИТ БЕЗОПАСНОСТИ И ОПТИМИЗАЦИЯ",
    srv_nuitka_title: "Аудит исполняемых файлов C++ Nuitka",
    srv_nuitka_tag: "Аудит безопасности и маппинг потока управления Nuitka",
    srv_nuitka_desc: "Nuitka компилирует Python напрямую в C++. Мы отслеживаем вызовы C-API, оцениваем проверки безопасности и оптимизируем логику.",
    srv_nuitka_c1: "Анализ зашифрованных встроенных ресурсов",
    srv_nuitka_c2: "Маппинг метаданных модулей и связок C-API",
    srv_nuitka_c3: "Поиск и извлечение статических констант в динамической памяти",
    srv_nuitka_c4: "Оптимизация процедур верификации и проверок лицензии",
    srv_nuitka_out: "Бинарный патч и технический отчет",
    srv_nuitka_time: "48 Часов",

    srv_go_badge: "АУДИТ БЕЗОПАСНОСТИ И ОПТИМИЗАЦИЯ",
    srv_go_title: "Анализ и аудит бинарных файлов Golang",
    srv_go_tag: "Реконструкция pclntab и восстановление типов для Go",
    srv_go_desc: "Статические Go-файлы не содержат стандартных символов. Мы восстанавливаем метаданные типов (pclntab) и анализируем логику защиты.",
    srv_go_c1: "Реконструкция типов данных Go и символов pclntab",
    srv_go_c2: "Анализ графов потока управления Garble/Go-obfuscator",
    srv_go_c3: "Оценка и оптимизация процедур проверки лицензий",
    srv_go_c4: "Создание автономного исполняемого файла с целостной средой",
    srv_go_out: "Оптимизированный бинарный файл и отчет безопасности",
    srv_go_time: "24 - 48 Часов",

    srv_rust_badge: "АУДИТ БЕЗОПАСНОСТИ И ОПТИМИЗАЦИЯ",
    srv_rust_title: "Анализ безопасности нативных файлов Rust",
    srv_rust_tag: "Анализ vtable LLVM, аудит целостности памяти для Rust",
    srv_rust_desc: "Высокооптимизированные бинарники Rust с инлайнингом. Мы находим ключевые функции через строки panic и оптимизируем логику.",
    srv_rust_c1: "Восстановление таблиц vtable и искаженных имен символов",
    srv_rust_c2: "Оценка механизмов самозащиты и целостности памяти",
    srv_rust_c3: "Анализ логики валидации и протоколов связи",
    srv_rust_c4: "Создание загрузчика-патча или оптимизированного файла",
    srv_rust_out: "Оптимизированный бинарный файл / Лоадер и отчет",
    srv_rust_time: "48 - 72 Часа",

    // Compliance
    comp_badge: "СТАНДАРТЫ БЕЗОПАСНОСТИ И КОНФИДЕНЦИАЛЬНОСТИ",
    comp_title: "Профессиональные стандарты аудита",
    comp_desc: "KCRACKER.ASIA проводит оценку безопасности программного обеспечения в изолированной лабораторной среде с соблюдением строгих принципов защиты данных.",
    comp_t1: "Изолированная обработка",
    comp_t1_desc: "Полностью изолированная среда песочницы (Air-gapped), исключающая утечку данных.",
    comp_t2: "Глубокая верификация",
    comp_t2_desc: "Высокоточный анализ графа потока управления и комплексная оценка целостности.",
    comp_t3: "Лабораторная безопасность",
    comp_t3_desc: "Выделенные аппаратные узлы с гарантированным криптографическим уничтожением данных после передачи.",
    comp_t4: "Защита интеллектуальной собственности",
    comp_t4_desc: "Строгие соглашения о неразглашении для защиты программных архитектур клиентов.",

    // Footer
    foot_desc: "Профессиональный структурный анализ, оценка безопасности и восстановление исходного кода от KCRACKER. Поддержка PyArmor 7/8/9, Nuitka, Go и Rust.",
    foot_network: "// TELEGRAM СЕТЬ",
    foot_channel: "Инфо-канал: @kcracker007",
    foot_group: "Чат сообщества: @cybercrlm3chat",
    foot_admin: "Прямая консультация: @tnk_k07vn",
    foot_core: "// КЛЮЧЕВЫЕ КОМПЕТЕНЦИИ",
    foot_requests: "// ПРИЕМ ЗАЯВОК",
    foot_contact_btn: "СВЯЗАТЬСЯ СО СПЕЦИАЛИСТОМ:",
    foot_sla: "БЫСТРАЯ ПЕРЕДАЧА ОТЧЕТА ЗА 12 - 24Ч",
    foot_rights: "KCRACKER.ASIA. Все права на анализ и аудит защищены.",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("kcracker_lang") as Language;
    if (saved && ["en", "vi", "zh", "ru"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("kcracker_lang", newLang);
  };

  const t = (key: string): string => {
    return DICTIONARY[lang]?.[key] || DICTIONARY.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
