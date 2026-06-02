import { useState, useEffect, useRef } from 'react';

// Audio synthesis disabled per user request
const playCyberSound = () => {};
const soundEnabled = false;

// Core Technical Article & Knowledge Base Content Database
const articlesData = {
  // Blog Category
  'how-nuitka-works': {
    title: 'How Nuitka Compiles Python Code to Native Binaries',
    category: 'Deobfuscation & Compilation',
    published: 'May 28, 2026',
    author: 'KCRACKER Research Team',
    breadcrumbs: ['Home', 'Blog', 'How Nuitka Works'],
    content: (
      <>
        <p>
          Nuitka is a highly optimized Python-to-C++ compiler. Unlike standard packers like PyInstaller, which simply bundle a Python interpreter with your source files in a zip archive, Nuitka actively translates Python scripts into highly optimized C++ code, which is then compiled into a native machine binary (<code>.exe</code>, <code>.dll</code>, or <code>.so</code>).
        </p>
        <p>
          This makes Nuitka compiled applications significantly faster and vastly more difficult to reverse engineer. In this article, we’ll explore how Nuitka’s compilation model works under the hood and how security analysts disassemble Nuitka-protected binaries.
        </p>
        
        <h2>1. The Translation Pipeline</h2>
        <p>
          When you execute Nuitka on a script, it performs several translation passes:
        </p>
        <ul>
          <li><strong>Syntax Parsing:</strong> Reads standard Python source files and builds a comprehensive Abstract Syntax Tree (AST).</li>
          <li><strong>Semantic Analysis:</strong> Optimizes variable scopes, resolves constant expressions, and builds C-level control flow structures.</li>
          <li><strong>C++ Generation:</strong> Converts the optimized internal representation into highly specific C++ code utilizing the official Python C-API. Each Python object becomes a <code>PyObject*</code> wrapper.</li>
          <li><strong>Compiler Build:</strong> Passes the generated C++ files to a local compiler (like gcc, MSVC, or clang) to output a native system machine executable.</li>
        </ul>

        <h2>2. Why Traditional Decompilers Fail</h2>
        <p>
          Because Nuitka compiles Python code into native C++ machine assembly, there are **no bytecode instruction objects (.pyc files)** left inside the executable. 
        </p>
        <p>
          Decompilers like PyCDC or uncompyle6 look specifically for bytecode structures. When run against a Nuitka binary, these decompilers find nothing to parse and fail completely. Reverse engineering a Nuitka executable requires decompiling native machine machine code in hex editor disassembly software or debuggers (like IDA Pro, Ghidra, or x64dbg).
        </p>

        <h2>3. Recovering Logic from Nuitka Binaries</h2>
        <p>
          Despite Nuitka compiling to native code, it is not completely invulnerable. Security researchers and our engineering team recover logic through specific analysis vectors:
        </p>
        <ul>
          <li><strong>Python C-API Hooking:</strong> Hook dynamic calls (e.g. <code>PyObject_Call</code>, <code>PyEval_EvalCode</code>) to inspect run-time parameters and dynamic imports in memory.</li>
          <li><strong>String & Constants Extraction:</strong> Intercept encrypted constants segments as they are unpacked into memory during initial runtime bootstrap sequences.</li>
          <li><strong>Control Flow Graph Analysis:</strong> Map out compiler-optimized C-API function blocks, trace argument passings, and reconstruct the original execution logic.</li>
        </ul>
      </>
    )
  },
  'packed-python-executables-explained': {
    title: 'Packed Python Executables Decoded: PyInstaller & More',
    category: 'Executable Formats',
    published: 'May 27, 2026',
    author: 'KCRACKER Support Team',
    breadcrumbs: ['Home', 'Blog', 'Packed Executables Decoded'],
    content: (
      <>
        <p>
          The most popular way to distribute Python desktop software is through executable packers. Frameworks like **PyInstaller, py2exe, and cx_Freeze** package a complete Python environment (including the interpreter, core libraries, dynamic dependencies, and custom source files) into a single, double-clickable file.
        </p>
        <p>
          While extremely convenient for deployment, these packed files provide virtually no security for your intellectual property. Let’s look at how these packers construct files and how easily they can be dissected.
        </p>

        <h2>1. Inside a PyInstaller Bundle</h2>
        <p>
          A PyInstaller executable operates as a self-extracting archive wrapper. When compiled as a single file, it contains a native C-based bootloader and a compressed payload block:
        </p>
        <ul>
          <li><strong>The Bootloader:</strong> A custom native binary loader. When run, it creates a temporary directory in the user’s temp folder (typically named <code>_MEIxxxxxx</code>) and extracts all bundled dependency DLLs and zip indexes into it.</li>
          <li><strong>The PYZ Archive:</strong> A compressed archive file containing obfuscated Python library modules.</li>
          <li><strong>Compiled Scripts:</strong> Your primary scripts are bundled as raw <code>.pyc</code> bytecode files inside a specific directory table.</li>
        </ul>

        <h2>2. The Unpacking Process</h2>
        <p>
          Recovering source code from standard PyInstaller bundles is highly automated. The process typically follows three core phases:
        </p>
        <ol>
          <li><strong>Archive Extraction:</strong> Extract the bundled payloads using tools like <code>pyinstxtractor</code>, which parses the executable headers, locates the offset tables, and writes out raw <code>.pyc</code> bytecodes.</li>
          <li><strong>Header Reconstruction:</strong> Repair missing 16-byte magic headers based on the Python version runtime signatures.</li>
          <li><strong>AST Decompilation:</strong> Pass reconstructed bytecode files through decompiler engines like PyCDC to output pristine, human-readable Python scripts.</li>
        </ol>

        <h2>3. Securing Packed Binaries</h2>
        <p>
          If your application relies strictly on standard PyInstaller packing, anyone can recover your complete source code in less than five minutes. To secure your intellectual property, you must combine packing with bytecode obfuscation layers (such as PyArmor) or compile critical security modules using C-extensions (like Cython or Nuitka) before packing them into your main bootloader.
        </p>
      </>
    )
  },
  'python-reverse-engineering-basics': {
    title: 'Python Reverse Engineering Basics: Bytecode & Decompilation',
    category: 'Reverse Engineering',
    published: 'May 26, 2026',
    author: 'KCRACKER Research Team',
    breadcrumbs: ['Home', 'Blog', 'Reverse Engineering Basics'],
    content: (
      <>
        <p>
          Python compiles source scripts into bytecode instructions executed by the Python Virtual Machine (PVM). Understanding how bytecode works is the key to reverse engineering protected Python applications.
        </p>
        <p>
          In this introductory guide, we’ll explore the foundation of Python reverse engineering, standard decompilation tools, and how obfuscated packages are analyzed by security experts.
        </p>

        <h2>The Structure of Python Bytecode</h2>
        <p>
          Python bytecode consists of instruction opcodes and parameters stored inside compiled <code>.pyc</code> files. A <code>.pyc</code> file contains:
        </p>
        <ol>
          <li><strong>A Magic Number:</strong> 4 bytes representing the specific Python version compiler version.</li>
          <li><strong>Modification Time & Size:</strong> Metadata indicating when the script was compiled.</li>
          <li><strong>The Marshal Object:</strong> The serialized Code Object containing variable tables, constant arrays, and the raw bytecode instruction stream.</li>
        </ol>
        
        <p>
          We can dissect a Python function's internal bytecode instructions using the built-in <code>dis</code> module:
        </p>

        <pre><code># Python disassembly demonstration
import dis

def verify_serial(key):
    if key == "KCRACKER-SECURE-KEY":
        return True
    return False

dis.dis(verify_serial)</code></pre>

        <p>
          The disassembly output shows the virtual machine stack operations:
        </p>
        <pre><code>              LOAD_FAST                0 (key)
              LOAD_CONST               1 ('KCRACKER-SECURE-KEY')
              COMPARE_OP               2 (==)
              POP_JUMP_IF_FALSE        else_branch
              LOAD_CONST               2 (True)
              RETURN_VALUE
else_branch:  LOAD_CONST               3 (False)
              RETURN_VALUE</code></pre>

        <h2>Standard Decompilation Toolchains</h2>
        <p>
          To automate code recovery from standard <code>.pyc</code> files, reverse engineers use automated decompilers. These parse the compiled code objects and reconstruct original AST structures:
        </p>
        <ul>
          <li><strong>Uncompyle6:</strong> Supports Python versions 1.0 through 3.8. It operates by performing semantic analysis on opcode structures and outputting clean syntax patterns.</li>
          <li><strong>Decompyle3:</strong> A specialized branch of uncompyle6 focused on modern Python 3.7 and 3.8 syntax optimization.</li>
          <li><strong>PyCDC (Python C++ Decompiler):</strong> A fast, C++ based decompiler supporting modern bytecode engines up to contemporary releases. Efficient, but can stumble on heavily obfuscated control structures.</li>
        </ul>

        <h2>Analyzing Obfuscated Modules</h2>
        <p>
          When standard decompilers run into obfuscated scripts, they crash or return incomplete chunks. Standard protections implement several bypass barriers:
        </p>
        <ul>
          <li><strong>Opcode Scrambling:</strong> Custom interpreters (like some variations of PyArmor) modify standard Python opcode values. For example, <code>LOAD_CONST</code> might be swapped from 100 to 142. Standard decompilers parse this incorrectly and fail.</li>
          <li><strong>Control Flow Flattening:</strong> Obfuscators insert fake conditional jumps, nested loops, or dead branches to make decompiler tools loop infinitely or crash.</li>
          <li><strong>Bytecode Stripping:</strong> Functions are cleared from RAM immediately after they execute, making dynamic memory dumping difficult.</li>
        </ul>
      </>
    )
  },
  'what-is-pyarmor': {
    title: 'What is PyArmor Obfuscation and How Does it Secure Python?',
    category: 'Obfuscation Systems',
    published: 'May 25, 2026',
    author: 'KCRACKER Support Team',
    breadcrumbs: ['Home', 'Blog', 'What is PyArmor?'],
    content: (
      <>
        <p>
          **PyArmor** is the industry standard for protecting Python applications. Standard obfuscation tools simply rename variables or flatten control flow, leaving bytecode open to simple decompilers. PyArmor, however, protects applications by actively securing Python bytecodes at runtime.
        </p>
        <p>
          In this article, we’ll explore how PyArmor works, the differences between its major version releases, and how our experts approach PyArmor analysis.
        </p>

        <h2>1. The Core Architecture</h2>
        <p>
          PyArmor secures Python scripts through a dynamic runtime wrapper. The core protection mechanisms include:
        </p>
        <ul>
          <li><strong>Bytecode Encryption:</strong> Every function body is encrypted with a custom algorithm. At startup, the script loads a native runtime extension module (e.g. <code>pyarmor_runtime.pyd</code> or <code>.so</code>).</li>
          <li><strong>Just-In-Time Decryption:</strong> When the Python virtual machine enters a function frame, the runtime extension intercepts execution, decrypts the bytecode frame in RAM, runs the code, and immediately re-encrypts it.</li>
          <li><strong>License Binding:</strong> PyArmor embeds an active license check block inside the dynamic runtime, validating authorization, expiry dates, and MAC/HDD hardware identifiers.</li>
        </ul>

        <h2>2. PyArmor 7 vs. PyArmor 8 & 9</h2>
        <p>
          PyArmor has evolved significantly over the years:
        </p>
        <ul>
          <li><strong>PyArmor 7 (Super Mode):</strong> Uses a C-extension to intercept evaluate frames. Our team has built advanced dynamic bypasses that dump clean bytecodes during the JIT frame entry window.</li>
          <li><strong>PyArmor 8 & 9 (Modern Enterprise):</strong> Replaces the legacy architecture with high-security JIT evaluation modes, virtual machine instruction mappings, and deep anti-tampering guards. It offers Pro and Enterprise licenses and binds code modules directly to customized native runtime engines.</li>
        </ul>

        <h2>3. Our Decryption & Reconstruction Service</h2>
        <p>
          Recovering source code from PyArmor protected scripts requires bypassing its active anti-debugging and anti-hooking protections.
        </p>
        <p>
          Our engineers construct custom memory hook bypasses that intercept the JIT evaluator. This allows us to capture the decrypted bytecodes in RAM, recover constant structures, resolve custom opcode maps, and rebuild pristine, original Python source files.
        </p>
      </>
    )
  },

  // Knowledge Base Category
  'supported-protections': {
    title: 'Supported Protections, Compilers & Version Specifications',
    category: 'Supported Tech',
    published: 'Last Updated: May 2026',
    author: 'KCRACKER Support Team',
    breadcrumbs: ['Home', 'Knowledge Base', 'Supported Protections'],
    content: (
      <>
        <p>
          KCRACKER provides professional reverse engineering, analysis, and source code recovery services for a wide range of protected Python configurations. Below is our complete, up-to-date technical catalog of supported protection versions, compilers, and executable wrappers.
        </p>

        <h2>1. PyArmor Protected Applications</h2>
        <p>
          PyArmor is a powerful tool used to obfuscate Python scripts, bind them to specific license keys, and protect them from simple decompilation. We support all main release branches:
        </p>
        <ul>
          <li><strong>PyArmor 7 (Legacy):</strong> 
            <ul>
              <li>Full support for standard obfuscation, advanced mode, and <strong>Super Mode</strong> builds.</li>
              <li>Restoration of dynamic license locks, execution time expiration limits, and hard drive MAC bindings.</li>
              <li>Complete reconstruction of function frames, variable names, and constants.</li>
            </ul>
          </li>
          <li><strong>PyArmor 8 & 9 (Modern Enterprise):</strong> 
            <ul>
              <li>Support for <strong>Basic</strong>, <strong>Pro</strong>, and <strong>Enterprise</strong> licenses.</li>
              <li>Dynamic decryption extraction for <strong>JIT (Just-In-Time) evaluation</strong> modules.</li>
              <li>Bypass of dynamic anti-debugging checks, memory hooks, and integrity validation layers.</li>
              <li>Reconstruction of custom virtual machine instructions and bytecode blocks.</li>
            </ul>
          </li>
        </ul>

        <h2>2. Nuitka Compiled Binaries</h2>
        <p>
          Nuitka converts Python scripts into native C++ code to run as compiled machine binaries. We provide comprehensive static and dynamic disassembly:
        </p>
        <ul>
          <li><strong>Compilation Modes:</strong> Support for standalone builds, onefile wrappers, and native shared libraries (<code>.so</code> / <code>.pyd</code>).</li>
          <li><strong>Commercial Extensions:</strong> Extraction of encrypted constant tables, strings, and system variables embedded inside commercial Nuitka builds.</li>
          <li><strong>Metadata Recovery:</strong> Recovery of underlying library directory hierarchies, structural call tables, and module names.</li>
        </ul>

        <h2>3. Python Packed Executables</h2>
        <p>
          Executable bundle packaging frameworks wrap runtime files inside native system loaders. We offer full recovery for:
        </p>
        <ul>
          <li><strong>PyInstaller (All Versions):</strong> Extracting PYZ indexes, repairing stripped bytecode headers, and resolving standard module paths.</li>
          <li><strong>py2exe & cx_Freeze:</strong> Extracting zipped resource overlays, parsing executable directories, and recovering original Python files.</li>
          <li><strong>Modern Custom Packers:</strong> Analysis of custom C-based bootloaders that unpack Python files at startup.</li>
        </ul>

        <h2>4. Other Python Compilers and Wrappers</h2>
        <p>
          We also support less common environments and custom compilation targets:
        </p>
        <ul>
          <li><strong>Cython Compiled Extensions:</strong> Reverse engineering of Cython generated <code>.pyd</code>/<code>.so</code> libraries. While direct decompilation to Python is not possible, we recover functional logic, variables, and API calls.</li>
          <li><strong>PyConcrete:</strong> Unwrapping encrypted <code>.pye</code> files by intercepting runtime import hooks and memory buffers.</li>
          <li><strong>Zip Safe & Encrypted Runtimes:</strong> Bypassing custom decryption logic injected inside standard Python bootstrap loaders.</li>
        </ul>
      </>
    )
  },
  'faq': {
    title: 'Frequently Asked Questions & Detailed Service Policies',
    category: 'Information',
    published: 'Last Updated: May 2026',
    author: 'KCRACKER Support Team',
    breadcrumbs: ['Home', 'Knowledge Base', 'FAQ'],
    content: (
      <>
        <p>
          Find detailed, technical answers to the most common questions regarding our reverse engineering methods, ordering procedures, safety protocols, and source codes delivery formats.
        </p>

        <h2>General Service Questions</h2>
        <h3>How do you recover source code from compiled executables?</h3>
        <p>
          Our recovery pipeline is highly specialized. For packed scripts (like PyInstaller), we extract raw bytecode frames, repair missing compiled signatures, and run AST decompilation. For obfuscators (like PyArmor), we execute targets inside isolated sandboxes, hook runtime evaluate frames in memory, and dump the decrypted codes dynamically. For machine code compilers (like Nuitka), we perform static binary analysis and trace runtime C-API calls to map and rebuild functional scripts.
        </p>
        
        <h3>Can you decompile and recover custom variables and function names?</h3>
        <p>
          Yes, in almost all PyArmor, PyInstaller, and zip-wrapped wrappers, original local variable tables, function definitions, and constants tables are preserved inside the bytecodes, allowing us to deliver completely reconstructed files. For Nuitka binaries, variable names are stripped by default, so we recover structural logic, constants, strings, and reconstruct the APIs with functional labels.
        </p>

        <h2>Delivery & Safety</h2>
        <h3>How are the completed projects delivered?</h3>
        <p>
          We deliver a comprehensive zip package containing:
        </p>
        <ul>
          <li>Reconstructed original Python source files (<code>.py</code> structure).</li>
          <li>Recovered local dependency libraries and imports.</li>
          <li>A technical analysis report documenting bypassed checks and compilation configurations.</li>
        </ul>

        <h3>Will you sign a Non-Disclosure Agreement (NDA)?</h3>
        <p>
          Absolutely. Many of our corporate clients require formal NDAs before submitting proprietary codebases. Contact our experts directly on Telegram to coordinate mutual NDA filings.
        </p>
      </>
    )
  },
  'delivery-process': {
    title: 'Delivery Process & Project Terms of Service',
    category: 'Operations',
    published: 'Last Updated: May 2026',
    author: 'Operations Director',
    breadcrumbs: ['Home', 'Knowledge Base', 'Delivery Process'],
    content: (
      <>
        <p>
          This document outlines the operational phases of our reverse engineering pipeline, payment policies, delivery milestones, and subsequent technical support services.
        </p>

        <h2>1. Initial Evaluation Phase</h2>
        <p>
          Every project begins with a complimentary initial analysis:
        </p>
        <ul>
          <li><strong>File Submission:</strong> You submit your protected executable or script through our secure Telegram portal.</li>
          <li><strong>Technological Check:</strong> Our engineers analyze the binary to detect obfuscators (PyArmor versions, Cython, custom wrappers) and PVM bytecode configurations.</li>
          <li><strong>Quote Delivery:</strong> Within 1–3 hours, we deliver a binding, custom quote detailing price, turnaround timeline, and specific deliverables.</li>
        </ul>

        <h2>2. Milestone & Decryption Phases</h2>
        <p>
          Once terms are accepted, our analysts proceed with isolated sandbox reverse engineering. To ensure complete transparency, we offer progress verification:
        </p>
        <ul>
          <li><strong>Progress Audits:</strong> For complex projects, we provide static structure screenshots, recovered module indexes, or dynamic console logs showing successful runtime interceptions.</li>
          <li><strong>Source Review:</strong> We can provide dynamic proof of decompilation (such as snippets of your custom configurations or specific functions) to verify code recovery before final payments.</li>
        </ul>

        <h2>3. Final Handover & Support</h2>
        <p>
          Upon payment clearance, the complete reconstructed zip bundle is handed over. We include exactly **7 days of complimentary post-project support** to assist your team in setting up local runtime dependencies, correcting import paths, or compiling modules.
        </p>
      </>
    )
  },
  'security-policy': {
    title: 'Security Policy & File Isolation Protocols',
    category: 'Privacy & Safety',
    published: 'Last Updated: May 2026',
    author: 'Chief Security Officer',
    breadcrumbs: ['Home', 'Knowledge Base', 'Security Policy'],
    content: (
      <>
        <p>
          In the field of reverse engineering and security auditing, trust and data protection are paramount. Many Python binaries submitted to us contain highly sensitive trade secrets, custom business logics, or proprietary API architectures. 
        </p>
        <p>
          To guarantee the absolute confidentiality of your intellectual property, KCRACKER operates under a strict, comprehensive Security and Isolation Policy. This document details our virtual machine architectures and data sanitization standards.
        </p>

        <h2>1. File Isolation & Dynamic Sandboxing</h2>
        <p>
          We do not analyze client files on network-connected production systems. All incoming executables are immediately quarantined:
        </p>
        <ul>
          <li><strong>Air-Gapped Virtual Machines:</strong> Analysis is conducted exclusively inside local virtualized guest OS environments (VMware ESXi sandboxes) running strictly offline with all network interface cards (NICs) disabled.</li>
          <li><strong>Firewall Protections:</strong> In rare cases where a binary requires network access to execute its dynamic decryption routines, it is routed through an isolated local proxy server that intercepts all traffic and blocks outbound calls to public IP spaces.</li>
          <li><strong>Zero Host Exposure:</strong> Client files never run directly on host machines, ensuring complete isolation from our internal networks.</li>
        </ul>

        <h2>2. Operational Data Handling</h2>
        <ul>
          <li><strong>Restricted Access:</strong> Only the designated senior reverse engineering analyst assigned to your ticket is permitted to view, execute, or process your files.</li>
          <li><strong>Confidentiality Covenants:</strong> Every KCRACKER employee and contract specialist operates under legally binding non-disclosure agreements (NDAs) that apply indefinitely to all client files, variable tables, database schema, and source algorithms.</li>
          <li><strong>No Cloud Uploads:</strong> We never leverage public AI systems or public scanning repositories (such as VirusTotal) to analyze your files. All reverse engineering, disassembly, and decompilation are performed using offline, localized databases and tools.</li>
          <li><strong>Permanent Sanitization (Day 8):</strong> On the 8th day post-handoff, our systems trigger an automated shredding utility. This utility:
            <ul>
              <li>Performs secure overwriting (standard DoD 5220.22-M sanitation protocol) on all local file blocks.</li>
              <li>Destroys the associated isolated virtual machine sandbox instance.</li>
              <li>Purges all memory logs and deobfuscation outputs.</li>
            </ul>
          </li>
        </ul>
      </>
    )
  }
};

// Quarantined Mock Files Database inside air-gapped VM
const mockFiles = [
  { name: 'licensing_supermode_pyarmor7.pyc', size: '4.8 MB', type: 'pyarmor7', label: 'PyArmor 7 (Super Mode)' },
  { name: 'auth_agent_pyarmor8.exe', size: '14.2 MB', type: 'pyarmor8', label: 'PyArmor 8/9 (Pro/Enterprise)' },
  { name: 'compiler_optim_nuitka.dll', size: '28.5 MB', type: 'nuitka', label: 'Nuitka Static C-Extension' },
  { name: 'standalone_loader_pyinstaller.exe', size: '8.1 MB', type: 'pyinstaller', label: 'PyInstaller Packed Executable' }
];

// Custom Intersection Observer Hook for Bulletproof Scroll-driven animations
function useElementOnScreen(threshold = 0.05, triggerOnce = true) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) {
          observer.unobserve(entry.target);
        }
      }
    }, { threshold });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && !triggerOnce) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return [ref, isIntersecting];
}

// Unified, accessible Scroll-Reveal Component
function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, isVisible] = useElementOnScreen(0.05, true);

  return (
    <div
      ref={ref}
      className={`scroll-reveal reveal-${direction} ${isVisible ? "reveal-active" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Interactive 3D Perspective Tilt Card Component
function TiltCard({ children, className = "", delay = 0, direction = "up", style = {} }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 12; // 12 degrees max tilt
    const rotateY = ((x - centerX) / centerX) * 12; 

    const xPct = `${(x / rect.width) * 100}%`;
    const yPct = `${(y / rect.height) * 100}%`;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease',
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.65), 0 0 30px oklch(0.80 0.14 190 / 0.15)`,
      '--element-mouse-x': xPct,
      '--element-mouse-y': yPct
    });
  };

  const handleMouseEnter = () => {
    if (window.__kcrackerSoundEnabled) {
      playCyberSound('hover', true);
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
      boxShadow: 'none'
    });
  };

  return (
    <ScrollReveal delay={delay} direction={direction}>
      <div
        ref={cardRef}
        className={`${className} tilt-card-active`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ ...style, ...tiltStyle }}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}

// Live-updating Cybernetic Oscilloscope Telemetry Waveform Visualizer
function TelemetryGraph() {
  const [points, setPoints] = useState([]);
  const phaseRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      phaseRef.current += 0.2;
      const newPoints = [];
      const width = 300;
      const height = 70;
      const segments = 50;
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        // High-fidelity wave mapping combining sine, cosine, and dynamic frequency modulation
        const sinVal = Math.sin((i / 3) - phaseRef.current);
        const cosVal = Math.cos((i / 5) + phaseRef.current * 0.7);
        const y = (height / 2) + sinVal * 18 + cosVal * 6;
        newPoints.push(`${x},${y}`);
      }
      setPoints(newPoints);
    }, 40); // 25fps fluid updates

    return () => clearInterval(interval);
  }, []);

  const pathD = points.length > 0 ? `M ${points.join(' L ')}` : '';

  return (
    <div className="telemetry-graph-container" style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontFamily: 'ui-monospace, monospace', color: 'var(--text-light)', marginBottom: '0.65rem', letterSpacing: '0.02em' }}>
        <span>OSCILLOSCOPE_CHANNEL_A</span>
        <span style={{ color: 'var(--accent-cyan)' }}>[LIVE_DECRYPT_TRACE_ACTIVE]</span>
      </div>
      <svg width="100%" height="70" viewBox="0 0 300 70" style={{ display: 'block', background: 'oklch(0.05 0.002 240)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
        {/* Technical grids */}
        <line x1="0" y1="35" x2="300" y2="35" stroke="oklch(0.18 0.008 240)" strokeDasharray="2,4" />
        <line x1="0" y1="17.5" x2="300" y2="17.5" stroke="oklch(0.12 0.008 240)" strokeDasharray="2,4" />
        <line x1="0" y1="52.5" x2="300" y2="52.5" stroke="oklch(0.12 0.008 240)" strokeDasharray="2,4" />
        <line x1="75" y1="0" x2="75" y2="70" stroke="oklch(0.18 0.008 240)" strokeDasharray="2,4" />
        <line x1="150" y1="0" x2="150" y2="70" stroke="oklch(0.18 0.008 240)" strokeDasharray="2,4" />
        <line x1="225" y1="0" x2="225" y2="70" stroke="oklch(0.18 0.008 240)" strokeDasharray="2,4" />
        
        {/* Glow and Wave paths */}
        <path d={pathD} fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 0px 3px var(--accent-cyan))' }} />
      </svg>
    </div>
  );
}

function App() {
  // Global spatial coordinates tracker for 4D grid background parallax
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      const winWHalf = window.innerWidth / 2;
      const winHHalf = window.innerHeight / 2;
      
      const doc = document.documentElement;
      doc.style.setProperty('--mouse-x', `${xPct}%`);
      doc.style.setProperty('--mouse-y', `${yPct}%`);
      doc.style.setProperty('--mouse-x-px', `${e.clientX}`);
      doc.style.setProperty('--mouse-y-px', `${e.clientY}`);
      doc.style.setProperty('--win-w-half', `${winWHalf}px`);
      doc.style.setProperty('--win-h-half', `${winHHalf}px`);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Navigation & Page State
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Side Drawer States for Seamless Single-page Landing Page
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerArticle, setDrawerArticle] = useState(null);

  const openArticleDrawer = (key) => {
    if (articlesData[key]) {
      setDrawerArticle(key);
      setDrawerOpen(true);
    }
  };

  const closeArticleDrawer = () => {
    setDrawerOpen(false);
  };

  // Listen for Escape key press to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hidden file input reference for upload
  const fileInputRef = useRef(null);

  // Scroll to navbar on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Python Reverse Engineering & Decryption Services | KCRACKER";
  }, [activePage]);

  // Navbar scrolled effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fluctuating Telemetry Diagnostics variables
  const [telemetry, setTelemetry] = useState({
    cpu: 42.6,
    hashRate: 1284,
    uptime: 148.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        cpu: parseFloat((38.0 + Math.random() * 14.0).toFixed(1)),
        hashRate: Math.floor(1210 + Math.random() * 190),
        uptime: parseFloat((prev.uptime + 1.5).toFixed(1))
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Workstation Console State
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileListOpen, setFileListOpen] = useState(false);
  const [decompileState, setDecompileState] = useState('idle'); // idle, mounted, decompiling, completed
  
  // Real Uploaded File telemetry variables
  const [realHexMagic, setRealHexMagic] = useState('');
  const [realTextContent, setRealTextContent] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  const [consoleLines, setConsoleLines] = useState([
    { text: "KCRACKER WORKSTATION CONSOLE v4.5 // SANDBOX ACTIVE", color: "var(--primary)" },
    { text: "[sys_init] target sandbox VM running air-gapped on ESXi_Host_12", color: "var(--text-light)" },
    { text: "[status] SECURE SANDBOX IS EMPTY. SELECT MODULE OR DRAG-DROP REAL FILE TO MOUNT...", color: "var(--accent-cyan)" }
  ]);

  // Dynamic code streaming buffer states
  const [streamedLines, setStreamedLines] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hexStreamLines, setHexStreamLines] = useState([]);

  // Hexadecimal row generator helper
  const generateHexRow = (index, fileType) => {
    const address = `0x${(index * 16).toString(16).toUpperCase().padStart(4, '0')}`;
    let bytes = [];
    let ascii = '';
    
    for (let i = 0; i < 16; i++) {
      let b = Math.floor(Math.random() * 256);
      if (index === 0 && i < 4) {
        if (fileType === 'pyarmor8' || fileType === 'pyinstaller' || fileType === 'nuitka') {
          const pe = [0x4D, 0x5A, 0x90, 0x00];
          b = pe[i];
        } else if (fileType === 'pyarmor7') {
          const pyc = [0x55, 0x0D, 0x0D, 0x0A];
          b = pyc[i];
        }
      }
      const hex = b.toString(16).toUpperCase().padStart(2, '0');
      bytes.push(hex);
      ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
    }
    
    const byteStr1 = bytes.slice(0, 8).join(' ');
    const byteStr2 = bytes.slice(8, 16).join(' ');
    return `${address}:  ${byteStr1}  ${byteStr2}  | ${ascii}`;
  };

  // File parsing logic using standard HTML5 APIs
  const processRealFile = (file) => {
    if (decompileState !== 'idle' && decompileState !== 'mounted') return;

    // Reset previous states
    setRealHexMagic('');
    setRealTextContent('');

    // Read the first 16 bytes for hexadecimal header analysis
    const hexReader = new FileReader();
    hexReader.onload = (e) => {
      const buffer = new Uint8Array(e.target.result);
      let hexString = '';
      for (let i = 0; i < buffer.length; i++) {
        hexString += buffer[i].toString(16).toUpperCase().padStart(2, '0') + ' ';
      }
      setRealHexMagic(hexString.trim());
    };
    hexReader.readAsArrayBuffer(file.slice(0, 16));

    // Determine if it is a text-based Python file to stream contents, else treat as binary
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isText = fileExtension === 'py' || fileExtension === 'txt' || fileExtension === 'json' || file.type.startsWith('text/');

    if (isText) {
      const textReader = new FileReader();
      textReader.onload = (e) => {
        setRealTextContent(e.target.result);
      };
      textReader.readAsText(file);
    }

    // Classify file type based on magic headers or extensions
    let signature = 'Custom User Uploaded Binary';
    let type = 'user-binary';
    
    if (fileExtension === 'pyc') {
      signature = 'Compiled Python Bytecode Object (.pyc)';
      type = 'pyc';
    } else if (fileExtension === 'py' || isText) {
      signature = 'Raw Python Source Script (.py)';
      type = 'py-source';
    } else if (fileExtension === 'exe' || fileExtension === 'dll') {
      signature = 'Windows Portable Executable binary (Nuitka/PyInstaller)';
      type = 'pe-binary';
    }

    const payload = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: type,
      label: signature
    };

    setSelectedFile(payload);
    setDecompileState('mounted');

    playCyberSound('click', window.__kcrackerSoundEnabled);

    // Dynamically print telemetry analysis inside command line
    setConsoleLines([
      { text: `[mounted] forensic quarantine block mapped for: ${file.name}`, color: "var(--accent-emerald)" },
      { text: `[metadata] size: ${(file.size / 1024).toFixed(1)} KB // format: ${file.type || 'application/octet-stream'}`, color: "var(--text-main)" },
      { text: `[hex_sig] reading offsets 0x00-0x0F: loading signature headers...`, color: "var(--text-light)" },
      { text: `[action] payload ready. press 'INITIATE SECURE DEOBFUSCATION' to parse...`, color: "var(--accent-cyan)" }
    ]);
  };

  // Drag and drop event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processRealFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processRealFile(e.target.files[0]);
    }
  };

  // Handle Mock File mounting sequence
  const handleMountFile = (file) => {
    if (decompileState !== 'idle' && decompileState !== 'mounted') return;
    
    setSelectedFile(file);
    setFileListOpen(false);
    setDecompileState('mounted');
    playCyberSound('click', window.__kcrackerSoundEnabled);
    setConsoleLines([
      { text: `[mounted] isolated quarantine block created for: ${file.name}`, color: "var(--accent-emerald)" },
      { text: `[metadata] size: ${file.size} // signature: ${file.label}`, color: "var(--text-main)" },
      { text: `[status] sandbox loaded at RAM virtual_offset 0x5D39FA1E`, color: "var(--text-light)" },
      { text: `[action] ready. press 'INITIATE SECURE DEOBFUSCATION' to begin...`, color: "var(--accent-cyan)" }
    ]);
    setStreamedLines([]);
    setRealHexMagic('');
    setRealTextContent('');
  };

  // Perform typewriter line-by-line streaming of decompiled code
  const startCodeStreaming = () => {
    const code = getDecompiledCodeOutput();
    const lines = code.split('\n');
    setStreamedLines([]);
    setIsStreaming(true);
    
    let currentLineIdx = 0;
    const streamInterval = setInterval(() => {
      if (currentLineIdx < lines.length) {
        setStreamedLines(prev => [...prev, lines[currentLineIdx]]);
        currentLineIdx++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 80); // Quick streaming timing
  };

  // Handle Decompilation Simulation Sequence based on selected file
  const handleDecompile = () => {
    if (!selectedFile || decompileState !== 'mounted') return;

    setDecompileState('decompiling');
    playCyberSound('click', window.__kcrackerSoundEnabled);
    setConsoleLines(prev => [
      ...prev,
      { text: `[sandbox] quarantine locked. launching bypass sandbox hooks...`, color: "var(--accent-cyan)" }
    ]);

    // Customize progress status logs depending on obfuscation type
    let steps = [];
    if (selectedFile.type === 'pyarmor7') {
      steps = [
        { text: "● [0.8s] [sandbox] loading pyarmor7 Super Mode runtime evaluation bypass...", color: "var(--text-main)" },
        { text: "● [1.6s] [memory_hook] capturing decrypted compiled code frames in RAM...", color: "var(--text-main)" },
        { text: "● [2.4s] [decompiler] restoring 16-byte magic number signature (Python 3.8)...", color: "var(--text-main)" },
        { text: "● [3.2s] [decompiler] mapping variables mapping and global constants arrays...", color: "var(--text-main)" },
        { text: "● [4.0s] [decompiler] compiling AST syntax tree to python source modules...", color: "var(--text-main)" },
        { text: "✔ [4.8s] [success] supermode bytecodes reconstructed successfully!", color: "var(--accent-emerald)" }
      ];
    } else if (selectedFile.type === 'pyarmor8') {
      steps = [
        { text: "● [0.8s] [sandbox] bypassing dynamic anti-debugging and anti-hooking threads...", color: "var(--text-main)" },
        { text: "● [1.6s] [sandbox] intercepting dynamic JIT (Just-In-Time) evaluation module...", color: "var(--text-main)" },
        { text: "● [2.4s] [decompiler] mapping custom dynamic opcode scrambler configurations...", color: "var(--text-main)" },
        { text: "● [3.2s] [memory_hook] extracting decrypted bytecode blocks at runtime...", color: "var(--text-main)" },
        { text: "● [4.0s] [decompiler] solving control flow flattening algorithms...", color: "var(--text-main)" },
        { text: "✔ [4.8s] [success] pyarmor 8/9 pro decompilation audit finalized!", color: "var(--accent-emerald)" }
      ];
    } else if (selectedFile.type === 'nuitka') {
      steps = [
        { text: "● [0.8s] [disasm] loading Nuitka compiled C++ native machine executable...", color: "var(--text-main)" },
        { text: "● [1.6s] [memory_hook] extracting encrypted constants overlay in static sections...", color: "var(--text-main)" },
        { text: "● [2.4s] [disasm] tracing official Python C-API calls (PyEval_EvalCode, etc.)...", color: "var(--text-main)" },
        { text: "● [3.2s] [decompiler] mapping library directory trees and C-API bindings...", color: "var(--text-main)" },
        { text: "● [4.0s] [decompiler] reconstructing semantic logical flow into functional Python...", color: "var(--text-main)" },
        { text: "✔ [4.8s] [success] nuitka native logic reconstructed successfully!", color: "var(--accent-emerald)" }
      ];
    } else if (selectedFile.type === 'pyinstaller') {
      steps = [
        { text: "● [0.8s] [unpacker] loading PyInstaller loader wrapper package...", color: "var(--text-main)" },
        { text: "● [1.6s] [unpacker] parsing offset index tables and locating PYZ archive...", color: "var(--text-main)" },
        { text: "● [2.4s] [unpacker] extracting bundled files to secure temporary sandbox...", color: "var(--text-main)" },
        { text: "● [3.2s] [decompiler] repairing stripped magic byte code signatures...", color: "var(--text-main)" },
        { text: "● [4.0s] [decompiler] resolving imported local modules and packages...", color: "var(--text-main)" },
        { text: "✔ [4.8s] [success] pyinstaller PYZ source index fully extracted!", color: "var(--accent-emerald)" }
      ];
    } else {
      // Logic specifically tailored to analyze user uploaded files
      steps = [
        { text: `● [0.8s] [forensic] mounting secure air-gapped quarantine block index...`, color: "var(--text-main)" },
        { text: `● [1.6s] [hex_sig] parsed signatures: ${realHexMagic || '00 00 00 00 00 00'}`, color: "var(--text-light)" },
        { text: `● [2.4s] [sandbox] loading active runtime evaluator and hooking evaluation frames...`, color: "var(--text-main)" },
        { text: `● [3.2s] [disasm] solving scrambled compiler structures and layout graphs...`, color: "var(--text-main)" },
        { text: `● [4.0s] [decompiler] synthesizing AST tree back into clean python structures...`, color: "var(--text-main)" },
        { text: `✔ [4.8s] [success] static analysis finalized: source code extracted cleanly!`, color: "var(--accent-emerald)" }
      ];
    }

    setHexStreamLines([]);
    let hexIndex = 0;
    const hexInterval = setInterval(() => {
      setHexStreamLines(prev => {
        const next = [...prev, generateHexRow(hexIndex, selectedFile.type)];
        if (next.length > 7) {
          next.shift();
        }
        return next;
      });
      hexIndex++;
    }, 100);

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setConsoleLines(prev => [...prev, { text: step.text, color: step.color }]);
        if (idx === steps.length - 1) {
          clearInterval(hexInterval);
          setDecompileState('completed');
          playCyberSound('success', window.__kcrackerSoundEnabled);
          startCodeStreaming();
        }
      }, (idx + 1) * 800);
    });
  };

  // Get Recovered Code output based on selected file
  const getDecompiledCodeOutput = () => {
    if (!selectedFile) return "";
    
    // If user uploaded a real text python file, display its actual content!
    if (realTextContent && (selectedFile.type === 'py-source' || selectedFile.type === 'user-binary')) {
      return realTextContent;
    }

    switch (selectedFile.type) {
      case 'pyarmor7':
        return `def verify_license(key):
    # PyArmor 7 dynamic memory hooks bypassed successfully
    import hashlib
    hashed_input = hashlib.sha256(key.encode()).hexdigest()
    if hashed_input == "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918":
        print("[+] Access Authorized: Product Key Valid")
        return True
    print("[-] Verification Failed: Access Denied")
    return False`;
      case 'pyarmor8':
        return `def extract_jit_constants():
    # PyArmor 8/9 Pro dynamic VM evaluation hook bypass
    # Bypassed active debugger locks and resolved custom opcodes
    payload_map = {
        'API_HOST': "https://secure-node.kcracker.asia",
        'AUTH_TOKEN': "kcracker_998394_sha512_auth_block",
        'VM_FLAG': True
    }
    return payload_map`;
      case 'nuitka':
        return `def recover_nuitka_metadata():
    # Nuitka standalone C++ C-API evaluation table mapped
    # Restored constant directories and resolved native function references
    try:
        from kcracker_core import resolve_c_api
        module_call_tree = resolve_c_api(target_block="submodule_entry")
        print("[+] Recompiled call structure active: 24 active components")
        return module_call_tree
    except ImportError:
        return "Internal metadata table mapped successfully"`;
      case 'pyinstaller':
        return `import sys
import os

def bootstrap_pyinstaller():
    # Unpacked PyInstaller bootloader payload successfully
    # Restored stripped 16-byte magic headers for Python 3.11 PYZ index
    temp_dir = os.path.dirname(sys.executable)
    extracted_modules = ['main', 'config_loader', 'updater', 'crypto_utils']
    print(f"[+] Reconstructed {len(extracted_modules)} modules cleanly!")
    return extracted_modules`;
      default:
        // Binary files fallback decompiler outputs
        return `def decrypted_binary_payload():
    # Dynamic forensic static decompilation complete
    # Magic Hex Signature: ${realHexMagic || '4d 5a 90 00'}
    # Reconstructed function calls cleanly
    constants_pool = ["sys_auth", "bypass_integrity", "shred_temp"]
    print("[+] Forensic decompiler extraction authorized")
    return constants_pool`;
    }
  };

  // Reset Console
  const resetConsole = () => {
    setSelectedFile(null);
    setDecompileState('idle');
    setStreamedLines([]);
    setRealHexMagic('');
    setRealTextContent('');
    setConsoleLines([
      { text: "KCRACKER WORKSTATION CONSOLE v4.5 // SANDBOX ACTIVE", color: "var(--primary)" },
      { text: "[sys_init] target sandbox VM running air-gapped on ESXi_Host_12", color: "var(--text-light)" },
      { text: "[status] SECURE SANDBOX IS EMPTY. SELECT MODULE OR DRAG-DROP REAL FILE TO MOUNT...", color: "var(--accent-cyan)" }
    ]);
  };

  // Services Showcase Tab State
  const [activeTab, setActiveTab] = useState('pyarmor7');

  // FAQ Accordion Active Index State
  const [faqActiveIndex, setFaqActiveIndex] = useState(null);
  const toggleFaq = (index) => {
    setFaqActiveIndex(faqActiveIndex === index ? null : index);
  };

  // Safe navigation wrapper
  const navigateTo = (page, article = null) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (article) {
      openArticleDrawer(article);
    }
  };

  return (
    <>
      {/* 4D Vector Parallax Background Grid */}
      <div className="interactive-parallax-bg"></div>

      {/* Top Cyber Ticker Tape */}
      <div className="ticker-tape-container">
        <div className="ticker-tape-wrapper">
          <span className="ticker-tape-text">
            [SECURE_NODE_12] ONLINE // CPU_LOAD: NORMAL // PYARMOR_9 BYPASS: VERIFIED // NUITKA 2.1 DISASSEMBLY: COMPLETED // AIR-GAP VM PROTECTION: 100% // PRIVACY RATING: MAXIMUM // DATA SHREDDING: ENFORCED // NO_OUTBOUND_TRAFFIC // [SECURE_NODE_12] ONLINE // CPU_LOAD: NORMAL // PYARMOR_9 BYPASS: VERIFIED // NUITKA 2.1 DISASSEMBLY: COMPLETED // AIR-GAP VM PROTECTION: 100% // PRIVACY RATING: MAXIMUM // DATA SHREDDING: ENFORCED // NO_OUTBOUND_TRAFFIC
          </span>
        </div>
      </div>

      {/* Sticky Opaque Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ top: scrolled ? '0px' : '32px' }}>
        <div className="container nav-container">
          <a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); }} className="logo" style={{ cursor: 'pointer' }}>
            <span className="logo-icon">K</span>
            <span>KCRACKER</span>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); }} className={`nav-link ${activePage === 'home' && !drawerOpen ? 'active' : ''}`}>Home</a></li>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="nav-link">Services</a></li>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="nav-link">Why KCRACKER</a></li>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); setMobileMenuOpen(false); openArticleDrawer('supported-protections'); }} className={`nav-link ${drawerOpen && drawerArticle === 'supported-protections' ? 'active' : ''}`}>Protections</a></li>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); setMobileMenuOpen(false); openArticleDrawer('faq'); }} className={`nav-link ${drawerOpen && drawerArticle === 'faq' ? 'active' : ''}`}>FAQs</a></li>
            <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="nav-link">Contact</a></li>

            {/* Mobile Actions Drawer */}
            <li className="nav-actions-mobile">
              <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-telegram btn-sm" onClick={() => playCyberSound('click')}>Telegram Chat</a>
              <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" onClick={() => playCyberSound('click')}>Submit Project</a>
            </li>
          </ul>

          <div className="nav-actions">
            <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" onClick={() => playCyberSound('click')}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.25.294.26.006.554-.1.882-.32 2.247-1.52 3.38-2.28 3.398-2.282.014-.002.033.006.022.022-.01.016-1.12 1.042-1.693 1.57-.179.166-.3.278-.324.302-.055.053-.111.103-.165.152l-.014.013c-.417.375-.73.656-.125 1.055.291.19.524.35.756.508.252.17.502.34.846.565.18.118.35.244.524.364.36.246.693.476 1.093.439.23-.022.47-.238.59-.882.28-1.503.78-4.488.92-5.952a1.815 1.815 0 0 0-.022-.458.26.26 0 0 0-.083-.153.256.256 0 0 0-.178-.052c-.22.008-.553.123-1.694.598z"/>
              </svg>Telegram
            </a>
            <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" onClick={() => playCyberSound('click')}>Request Service</a>
          </div>

          <button className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={() => { playCyberSound('click', soundEnabled); setMobileMenuOpen(!mobileMenuOpen); }} aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
          {/* Hero Section */}
          <section className="hero" id="home">
            <div className="container hero-grid">
              <div className="hero-content">
                <h1>Expert Python <span>Reverse Engineering</span> & Advanced Decryption Services</h1>
                <p>
                  Recover compiled bytecodes, map C++ compiler expansions, and bypass multi-stage runtime protections under secure, air-gapped sandboxes. We reverse engineer PyArmor, Nuitka, and PyInstaller executables cleanly.
                </p>
                <div className="hero-actions">
                  <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => playCyberSound('click', soundEnabled)}>Request Service</a>
                  <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg" onClick={() => playCyberSound('click', soundEnabled)}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.25.294.26.006.554-.1.882-.32 2.247-1.52 3.38-2.28 3.398-2.282.014-.002.033.006.022.022-.01.016-1.12 1.042-1.693 1.57-.179.166-.3.278-.324.302-.055.053-.111.103-.165.152l-.014.013c-.417.375-.73.656-.125 1.055.291.19.524.35.756.508.252.17.502.34.846.565.18.118.35.244.524.364.36.246.693.476 1.093.439.23-.022.47-.238.59-.882.28-1.503.78-4.488.92-5.952a1.815 1.815 0 0 0-.022-.458.26.26 0 0 0-.083-.153.256.256 0 0 0-.178-.052c-.22.008-.553.123-1.694.598z"/>
                    </svg>Telegram Direct
                  </a>
                </div>
              </div>
 
              {/* Playable Decompiler Terminal Visual */}
              <div className="hero-visual">
                <div className="dashboard-mockup-wrapper">
                  <div className="dashboard-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span className="mockup-dot red"></span>
                      <span className="mockup-dot yellow"></span>
                      <span className="mockup-dot green"></span>
                    </div>
                    <div className="mockup-title">kcracker_analyzer.sh</div>
                    <div style={{ width: '32px' }}></div>
                  </div>
                  
                  <div className="mockup-body">
                    
                    {/* Interactive Dropzone Sandbox Dropdown (Supports drag-drop real files or clicks) */}
                    <div 
                      className={`dropzone-container ${isDragActive ? 'active' : ''}`} 
                      onClick={() => { playCyberSound('click', soundEnabled); fileInputRef.current.click(); }}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <span className="dropzone-icon">🔒</span>
                      {selectedFile ? (
                        <>
                          <h4 style={{ color: 'var(--accent-cyan)' }}>[MOUNTED] {selectedFile.name}</h4>
                          <p>Size: {selectedFile.size} // Click or Drop to mount another binary module</p>
                        </>
                      ) : (
                        <>
                          <h4>FORENSIC DRAG-DROP STATIC ANALYZER</h4>
                          <p>Drop a real (.py, .pyc, .exe) file here or click to select...</p>
                        </>
                      )}
 
                      {/* Hidden browser file input */}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileInput}
                      />
 
                      {/* Quarantined system mock files trigger overlay */}
                      <div 
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '0.85rem',
                          gap: '0.75rem'
                        }}
                      >
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                          onClick={(e) => { e.stopPropagation(); playCyberSound('click', soundEnabled); setFileListOpen(!fileListOpen); }}
                        >
                          Mount System Sandbox Module ▾
                        </button>
                      </div>

                      {/* Mock files selector drawer */}
                      {fileListOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          width: '100%',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                          zIndex: 100,
                          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                          padding: '0.50rem'
                        }}>
                          {mockFiles.map((file, idx) => (
                            <div 
                              key={idx} 
                              onClick={(e) => { e.stopPropagation(); handleMountFile(file); }}
                              style={{
                                padding: '0.65rem 1rem',
                                color: '#FFFFFF',
                                fontFamily: 'monospace',
                                fontSize: '0.85rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                borderBottom: idx !== mockFiles.length - 1 ? '1px solid var(--border)' : 'none',
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <span>⚡ {file.name}</span>
                              <span style={{ color: 'var(--accent-cyan)' }}>{file.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="code-window">
                      <div className="code-window-scanner"></div>
                      <div className="code-title">
                        <span>LIVE DECOMPILER CONSOLE // AIR-GAP VM</span>
                        <span style={{ color: decompileState === 'decompiling' ? 'var(--accent-cyan)' : decompileState === 'completed' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                          ● {decompileState.toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Terminal Lines output */}
                      {consoleLines.map((line, idx) => (
                        <div key={idx} className="code-line">
                          <span className="line-number">{idx + 1}</span>
                          <span className="code-content" style={{ color: line.color }}>{line.text}</span>
                        </div>
                      ))}

                      {/* Display streaming hex block during decompilation */}
                      {decompileState === 'decompiling' && hexStreamLines.length > 0 && (
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.25rem', paddingTop: '1.25rem', animation: 'tabFadeIn 0.3s var(--ease-out-expo)' }}>
                          <div className="code-line" style={{ marginBottom: '0.5rem' }}>
                            <span className="line-number">&gt;_</span>
                            <span className="code-content" style={{ color: 'oklch(0.70 0.18 300)', fontWeight: 'bold' }}>
                              [DECRYPTING] MEMORY_SECTOR_DUMP_STREAM
                            </span>
                          </div>
                          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: '0.78rem', color: 'oklch(0.70 0.18 300 / 0.85)', lineHeight: '1.45', whiteSpace: 'pre-wrap', textAlign: 'left', paddingLeft: '2.1rem' }}>
                            {hexStreamLines.map((line, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'oklch(0.70 0.18 300 / 0.3)', userSelect: 'none' }}>{(idx + 1).toString().padStart(2, '0')}</span>
                                <span>{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Display compiled React result with high-speed typewriter streaming */}
                      {decompileState === 'completed' && (
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.25rem', paddingTop: '1.25rem' }}>
                          <div className="code-line">
                            <span className="line-number">&gt;_</span>
                            <span className="code-content" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                              [OUTPUT] RECONSTRUCTED_SOURCE.PY {isStreaming ? "▒" : ""}
                            </span>
                          </div>
                          
                          {/* Real file magic offsets diagnostics header if available */}
                          {realHexMagic && (
                            <div className="code-line" style={{ color: 'var(--text-light)', fontSize: '0.78rem', margin: '0.5rem 0' }}>
                              <span className="line-number">&gt;_</span>
                              <span>[MAGIC_SIG] {realHexMagic}</span>
                            </div>
                          )}

                          <pre style={{ margin: '0.50rem 0 0 0', padding: '0', background: 'transparent', border: 'none' }}>
                            <code className="code-content" style={{ fontSize: '0.82rem', background: 'none', border: 'none', padding: '0' }}>
                              {streamedLines.map((line, idx) => (
                                <div key={idx} className="code-line" style={{ display: 'flex', gap: '1rem', marginBottom: '0.25rem' }}>
                                  <span className="line-number" style={{ color: 'var(--border)' }}>{idx + 1}</span>
                                  <span style={{ color: 'var(--text-main)', textAlign: 'left', whiteSpace: 'pre' }}>{line}</span>
                                </div>
                              ))}
                              {isStreaming && (
                                <span className="terminal-cursor">█</span>
                              )}
                            </code>
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="console-btn-row">
                      <div className="decompiler-status-indicator">
                        <span className="pulse-dot"></span>
                        <span>Sandbox air-gapped isolation locked</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.50rem' }}>
                        {decompileState === 'completed' ? (
                          <button className="btn btn-secondary btn-sm" onClick={resetConsole}>Shred & Reset</button>
                        ) : (
                          <button 
                            className="btn console-action-btn btn-sm" 
                            onClick={handleDecompile}
                            disabled={decompileState !== 'mounted'}
                          >
                            Initiate Dynamic Bypass
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
            
            {/* High-tech breathing scroll guide */}
            <div className="scroll-guide" onClick={() => { playCyberSound('click', soundEnabled); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>[SCROLL_DOWN_TO_DECRYPT]</span>
              <span>⇣</span>
            </div>
          </section>

          {/* Re-designed Services Tabbed Section */}
          <section className="section-bg" id="services">
            <div className="container">
              <ScrollReveal direction="up">
                <div className="section-header">
                  <h2>Decryption Packages & Services</h2>
                  <p>Choose from our specialized Python reverse engineering and decryption packages, tailored specifically to target obfuscation layers.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <div className="tabs-container">
                  <div className="tabs-list">
                    <button className={`tab-btn ${activeTab === 'pyarmor7' ? 'active' : ''}`} onClick={() => { playCyberSound('click', soundEnabled); setActiveTab('pyarmor7'); }}>PyArmor 7</button>
                    <button className={`tab-btn ${activeTab === 'pyarmor8' ? 'active' : ''}`} onClick={() => { playCyberSound('click', soundEnabled); setActiveTab('pyarmor8'); }}>PyArmor 8/9</button>
                    <button className={`tab-btn ${activeTab === 'pyinstaller' ? 'active' : ''}`} onClick={() => { playCyberSound('click', soundEnabled); setActiveTab('pyinstaller'); }}>PyInstaller</button>
                    <button className={`tab-btn ${activeTab === 'nuitka' ? 'active' : ''}`} onClick={() => { playCyberSound('click', soundEnabled); setActiveTab('nuitka'); }}>Nuitka Static</button>
                  </div>

                  <div className="tab-pane">
                  {activeTab === 'pyarmor7' && (
                    <TiltCard className="service-showcase-card">
                      <span className="showcase-badge popular depth-lg">Popular</span>
                      <div className="showcase-info-col depth-md">
                        <div>
                          <div className="showcase-header-row">
                            <span className="showcase-icon-inline depth-lg">⚡</span>
                            <h3 className="depth-md">PyArmor 7 Decryption</h3>
                          </div>
                          <p className="depth-sm">
                            Complete decryption service for legacy PyArmor 7 scripts and applications. We bypass execution runtime barriers and extract fully reconstructed bytecodes.
                          </p>
                          <ul className="showcase-features-list depth-sm">
                            <li>Supports Advanced and Super Mode builds</li>
                            <li>Reconstructs variables, functions, and loop imports</li>
                            <li>Restores execution timeline checks and license locks</li>
                            <li>Standard 24-hour turnaround handover</li>
                          </ul>
                        </div>
                      </div>
                      <div className="showcase-price-col depth-md">
                        <span className="showcase-price-label">Starting at</span>
                        <span className="showcase-price-value">$25</span>
                        <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => playCyberSound('click', soundEnabled)}>Request on Telegram</a>
                      </div>
                    </TiltCard>
                  )}

                  {activeTab === 'pyarmor8' && (
                    <TiltCard className="service-showcase-card">
                      <span className="showcase-badge premium depth-lg">Premium</span>
                      <div className="showcase-info-col depth-md">
                        <div>
                          <div className="showcase-header-row">
                            <span className="showcase-icon-inline depth-lg">🔒</span>
                            <h3 className="depth-md">PyArmor 8/9 Decryption</h3>
                          </div>
                          <p className="depth-sm">
                            Advanced reverse engineering for modern PyArmor 8 and 9 enterprise protections. We hook customized JIT evaluators to bypass security mechanisms cleanly.
                          </p>
                          <ul className="showcase-features-list depth-sm">
                            <li>Bypasses dynamic anti-debugging and anti-tamper filters</li>
                            <li>Dumps raw decrypted frames directly from sandbox RAM</li>
                            <li>Reconstructs VM mapping algorithms and custom bytecodes</li>
                            <li>Full support for Pro and Enterprise license builds</li>
                          </ul>
                        </div>
                      </div>
                      <div className="showcase-price-col depth-md">
                        <span className="showcase-price-label">Starting at</span>
                        <span className="showcase-price-value">$45</span>
                        <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => playCyberSound('click', soundEnabled)}>Request on Telegram</a>
                      </div>
                    </TiltCard>
                  )}

                  {activeTab === 'pyinstaller' && (
                    <TiltCard className="service-showcase-card">
                      <span className="showcase-badge fast depth-lg">Fast Delivery</span>
                      <div className="showcase-info-col depth-md">
                        <div>
                          <div className="showcase-header-row">
                            <span className="showcase-icon-inline depth-lg">📦</span>
                            <h3 className="depth-md">Python Packed Executables</h3>
                          </div>
                          <p className="depth-sm">
                            Decompression and script recovery for standard Python packaging wrappers, including PyInstaller, py2exe, and cx_Freeze executables.
                          </p>
                          <ul className="showcase-features-list depth-sm">
                            <li>Extracts full PYZ bytecode archives</li>
                            <li>Rebuilds stripped compiled header metadata signatures</li>
                            <li>Reconstructs original directory structure and modules</li>
                            <li>Delivered cleanly in 12–24 hours</li>
                          </ul>
                        </div>
                      </div>
                      <div className="showcase-price-col depth-md">
                        <span className="showcase-price-label">Starting at</span>
                        <span className="showcase-price-value">$30</span>
                        <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => playCyberSound('click', soundEnabled)}>Request on Telegram</a>
                      </div>
                    </TiltCard>
                  )}

                  {activeTab === 'nuitka' && (
                    <TiltCard className="service-showcase-card">
                      <span className="showcase-badge advanced depth-lg">Advanced</span>
                      <div className="showcase-info-col depth-md">
                        <div>
                          <div className="showcase-header-row">
                            <span className="showcase-icon-inline depth-lg">⚙️</span>
                            <h3 className="depth-md">Nuitka Static Unpacking</h3>
                          </div>
                          <p className="depth-sm">
                            Expert reverse engineering and logic mapping for C++ compiled Nuitka executables. We trace C-API function blocks and recover constant structures securely.
                          </p>
                          <ul className="showcase-features-list depth-sm">
                            <li>Bypasses encrypted embedded resources overlays</li>
                            <li>Maps module metadata hierarchy and C-API bindings</li>
                            <li>Extracts encrypted static constant assets in dynamic RAM</li>
                            <li>Complete analysis report and functional logic recovery</li>
                          </ul>
                        </div>
                      </div>
                      <div className="showcase-price-col depth-md">
                        <span className="showcase-price-label">Starting at</span>
                        <span className="showcase-price-value">$100</span>
                        <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => playCyberSound('click', soundEnabled)}>Request on Telegram</a>
                      </div>
                    </TiltCard>
                  )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Why Choose KCRACKER — Asymmetric Telemetry & Specs Panel */}
          <section id="features">
            <div className="container">
              <ScrollReveal direction="up">
                <div className="section-header">
                  <h2>System Diagnostics & Specifications</h2>
                  <p>Our reverse engineering systems operate within offline air-gapped sandboxes, leveraging dynamic instrumentation to recover compiler expansions and bypass binary obfuscation layers cleanly.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <div className="telemetry-panel">
                {/* Left side: Clinical Diagnostics Telemetry Panel with fluctuating values */}
                <TiltCard className="telemetry-diagnostic">
                  <div className="depth-md">
                    <div className="telemetry-diagnostic-header">
                      <h3>[SYSTEM_TELEMETRY_LOG]</h3>
                      <span className="decompiler-status-indicator">
                        <span className="pulse-dot"></span> Active Sandbox
                      </span>
                    </div>
                    <p style={{ fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                      Real-time fluctuating telemetry indexes representing dynamic ESXi processor allocation, throughput rates, and system integrity traces:
                    </p>
                    <div className="telemetry-diagnostic-grid depth-sm">
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">Security Protocol</span>
                        <span className="diagnostic-value" style={{ color: 'var(--accent-emerald)' }}>✔ Isolated VM</span>
                      </div>
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">VM CPU Utilization</span>
                        <span className="diagnostic-value" style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>{telemetry.cpu.toFixed(1)}%</span>
                      </div>
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">Active Decrypt Rates</span>
                        <span className="diagnostic-value" style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>{telemetry.hashRate.toLocaleString('en-US')} H/s</span>
                      </div>
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">Unpack Format</span>
                        <span className="diagnostic-value">Pristine AST Output</span>
                      </div>
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">Sanitizing Standard</span>
                        <span className="diagnostic-value">DoD Secure Overwrite</span>
                      </div>
                      <div className="diagnostic-item">
                        <span className="diagnostic-label">VM Session Uptime</span>
                        <span className="diagnostic-value" style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>{telemetry.uptime.toFixed(1)}s</span>
                      </div>
                    </div>
                    <TelemetryGraph />
                  </div>
                  <div className="depth-sm" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text-light)' }}>HOST_VM_SANDBOX_12</span>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>PORT_8400_ACTIVE</span>
                  </div>
                </TiltCard>

                {/* Right side: Stacked Clinical Tech Specifications */}
                <div className="telemetry-specs">
                  <TiltCard className="spec-item" delay={80}>
                    <span className="spec-icon depth-lg">🛠️</span>
                    <div className="depth-md">
                      <h4>Dynamic Virtual Evaluation</h4>
                      <p>We trace Python C-API execution registers and dump active frame bytecode arrays directly from isolated RAM pipelines, bypassing encryption checks.</p>
                    </div>
                  </TiltCard>

                  <TiltCard className="spec-item" delay={160}>
                    <span className="spec-icon depth-lg">🛡️</span>
                    <div className="depth-md">
                      <h4>Air-Gapped Quarantine Isolation</h4>
                      <p>All analysis runs inside offline guest operating systems. We do not expose metadata signatures and secure-shred guest disk sectors 8 days post-handover.</p>
                    </div>
                  </TiltCard>

                  <TiltCard className="spec-item" delay={240}>
                    <span className="spec-icon depth-lg">📊</span>
                    <div className="depth-md">
                      <h4>Verified High-Fidelity Deliverables</h4>
                      <p>We output completely compiled submodules, rebuilt local variable frames, clean package trees, and detailed technological configuration logs.</p>
                    </div>
                  </TiltCard>
                </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Clinical Automated Workflow Stage Tracer */}
          <section className="section-bg" id="workflow">
            <div className="container">
              <ScrollReveal direction="up">
                <div className="section-header">
                  <h2>Pipeline Workflow Stages</h2>
                  <p>Our systematic reverse engineering operations follow a verified pipeline to guarantee high-security evaluation and clean source recovery.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <div className="workflow-timeline">
                <div className="workflow-step">
                  <span className="step-number">[STAGE-01] SECURE QUARANTINE</span>
                  <TiltCard className="workflow-card" delay={80}>
                    <h3 className="depth-md">Payload Submission & Audit</h3>
                    <p className="depth-sm">Submit your protected payload via our secure portal. Our engineers isolate the binary in an offline guest VM and deliver a formal quote within 1–3 hours.</p>
                  </TiltCard>
                </div>

                <div className="workflow-step">
                  <span className="step-number">[STAGE-02] SANDBOX INTERCEPTION</span>
                  <TiltCard className="workflow-card" delay={160}>
                    <h3 className="depth-md">Dynamic JIT Bypass & Dump</h3>
                    <p className="depth-sm">We run the target inside offline sandboxes, hook active evaluation registers, solve custom bytecode opcode maps, and extract decrypted code frames from RAM.</p>
                  </TiltCard>
                </div>

                <div className="workflow-step">
                  <span className="step-number">[STAGE-03] SOURCE SYNTHESIS</span>
                  <TiltCard className="workflow-card" delay={240}>
                    <h3 className="depth-md">AST Decompilation & Handover</h3>
                    <p className="depth-sm">We repair compile magic headers, map dependency imports, reconstruct functional Python script structures, and deliver the final ZIP package.</p>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

          {/* FAQ Accordion Section */}
          <section id="faq">
            <div className="container">
              <ScrollReveal direction="up">
                <div className="section-header">
                  <h2>Frequently Asked Questions</h2>
                  <p>Find quick answers to common questions about our Python reverse engineering services, turnaround timelines, and safety policies.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <div className="faq-list">
                  {[
                    { q: "What protections do you support?", a: "We officially support deobfuscating and unpacking PyArmor (versions 7, 8, and 9), Nuitka compiled C-extensions, PyInstaller packers, py2exe, Cython wrappers, and generic obfuscated Python scripts." },
                    { q: "How long does delivery take?", a: "Most standard packed executables and basic PyArmor 7 scripts are completed within 24 hours. Advanced commercial builds (PyArmor 8/9 enterprise or complex Nuitka encryption) typically require 48 hours for deep static analysis." },
                    { q: "Are submitted files confidential?", a: "Yes, absolutely. All client interactions, source scripts, executables, and extracted data remain strictly private, are loaded in isolated virtual environments, and are permanently purged post-delivery." },
                    { q: "Do you support commercial protected binaries?", a: "Yes. We support enterprise commercial builds, heavily encrypted payloads, multi-stage runtime packed wrappers, dynamic anti-tampering guards, and virtual machine-protected entry blocks." }
                  ].map((faq, idx) => (
                    <div key={idx} className={`faq-item ${faqActiveIndex === idx ? 'active' : ''}`}>
                      <button className="faq-question" onClick={() => { playCyberSound('click', soundEnabled); toggleFaq(idx); }} aria-expanded={faqActiveIndex === idx}>
                        <h3>{faq.q}</h3>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <div className="faq-answer-content">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Asymmetric Telegram Communication Hub */}
          <section className="section-bg" id="contact">
            <div className="container">
              <ScrollReveal direction="up">
                <div className="section-header">
                  <h2>Secure Handovers & Communication</h2>
                  <p>We communicate exclusively through encrypted messaging channels to ensure absolute metadata privacy and swift technical turnaround.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <div className="contact-grid-telegram">
                {/* Left side: Large Primary Direct Contact Card */}
                <TiltCard className="contact-card contact-primary" delay={80}>
                  <div>
                    <div className="contact-icon telegram-brand depth-lg" style={{ marginBottom: '1.25rem', width: '48px', height: '48px', fontSize: '1.3rem' }}>✈</div>
                    <div className="contact-details depth-md">
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Direct Operations Support</h3>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.75rem', color: 'var(--text-muted)' }}>
                        Consult directly with our lead reverse engineering analysts for custom quotes, enterprise NDAs, active analysis updates, and final ZIP handovers.
                      </p>
                    </div>
                  </div>
                  <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" className="btn btn-primary depth-md" style={{ display: 'inline-flex', width: 'auto', alignSelf: 'flex-start' }} onClick={() => playCyberSound('click', soundEnabled)}>Initiate Secure Handoff</a>
                </TiltCard>

                {/* Right side: Technical Stack channels */}
                <div className="contact-stack">
                  <TiltCard className="contact-sub-card" delay={160}>
                    <div className="contact-icon telegram-brand depth-lg">✈</div>
                    <div className="contact-details depth-md">
                      <h3>Community Operations Chat</h3>
                      <p>Discuss obfuscation structures, share samples, and collaborate with peers.</p>
                      <a href="https://t.me/cybercrlm3chat" target="_blank" rel="noopener noreferrer" onClick={() => playCyberSound('click', soundEnabled)}>Join Community Chat →</a>
                    </div>
                  </TiltCard>

                  <TiltCard className="contact-sub-card" delay={240}>
                    <div className="contact-icon telegram-brand depth-lg">✈</div>
                    <div className="contact-details depth-md">
                      <h3>Vulnerability Bulletin Channel</h3>
                      <p>Receive immediate alerts, zero-day threat analysis, and platform notices.</p>
                      <a href="https://t.me/kcracker007" target="_blank" rel="noopener noreferrer" onClick={() => playCyberSound('click', soundEnabled)}>Subscribe Channel →</a>
                    </div>
                  </TiltCard>
                </div>
                </div>
              </ScrollReveal>
            </div>
          </section>


      {/* Premium Obsidian Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>
                <span className="logo-icon">K</span>
                <span>KCRACKER</span>
              </h3>
              <p>Professional reverse engineering and Python decryption services focused on protected Python applications, packed executables, and advanced binary analysis.</p>
            </div>

            <div className="footer-nav">
              <h4>Research Resources</h4>
              <ul className="footer-links">
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); }}>Services</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Features</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('home'); setTimeout(() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Workflow</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'faq'); }}>General FAQs</a></li>
              </ul>
            </div>

            <div className="footer-nav">
              <h4>Knowledge Base</h4>
              <ul className="footer-links">
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'supported-protections'); }}>Supported Protections</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'faq'); }}>Detailed FAQ</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'delivery-process'); }}>Delivery Process</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'security-policy'); }}>Security Policy</a></li>
              </ul>
            </div>

            <div className="footer-nav">
              <h4>Latest Research Articles</h4>
              <ul className="footer-links">
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('blog', 'what-is-pyarmor'); }}>What is PyArmor?</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('blog', 'how-nuitka-works'); }}>How Nuitka Compiles Code</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('blog', 'python-reverse-engineering-basics'); }}>Reverse Engineering Basics</a></li>
                <li><a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('blog', 'packed-python-executables-explained'); }}>Packed Executables Decoded</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 KCRACKER — Reverse Engineering Services. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'security-policy'); }}>Privacy Policy</a>
              <a onClick={() => { playCyberSound('click', soundEnabled); navigateTo('kb', 'delivery-process'); }}>Terms of Service</a>
              <a href="https://t.me/tnk_k07vn" target="_blank" rel="noopener noreferrer" onClick={() => playCyberSound('click', soundEnabled)}>Telegram Direct</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Clinical Right-Side Slide Drawer overlay for research & KB articles */}
      <div className={`drawer-backdrop ${drawerOpen ? 'active' : ''}`} onClick={closeArticleDrawer}></div>
      <aside className={`forensic-drawer ${drawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h2>{drawerArticle && articlesData[drawerArticle] ? articlesData[drawerArticle].title : "TECHNICAL DOCUMENT"}</h2>
          <button className="drawer-close-btn" onClick={closeArticleDrawer}>[ESC_CLOSE_]</button>
        </div>
        <div className="drawer-body article-content">
          {drawerArticle && articlesData[drawerArticle] ? (
            <>
              <div className="breadcrumbs" style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                <span>Home</span> &gt; <span>{articlesData[drawerArticle].breadcrumbs[1]}</span> &gt; <span>{articlesData[drawerArticle].breadcrumbs[2]}</span>
              </div>
              <div className="article-meta" style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <span>{articlesData[drawerArticle].published}</span>
                <span>Author: {articlesData[drawerArticle].author}</span>
              </div>
              {articlesData[drawerArticle].content}
            </>
          ) : (
            <p>Select a research article or KB guide to load isolated metadata.</p>
          )}
        </div>
      </aside>
    </>
  );
}

export default App;
