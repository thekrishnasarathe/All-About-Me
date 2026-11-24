import type { PortfolioData, SectionId } from "./types";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Krishna Sarathe",
    role: "Applied AI & Full-Stack Software Engineer • B.Tech CSE (AI & Data Science)",
    about:
      "B.Tech CSE (AI & Data Science) undergraduate at Scope Global Skills University (CGPA: 8.26/10) and 1st Place National Hackathon Winner (BGI 2026, 100+ teams). Former SDE Intern at QuantNexa.ai where I independently delivered three end-to-end applied AI & full-stack systems backed by 220+ automated tests. Focused on deterministic AI workflows, Python/FastAPI backends, React interfaces, and strengthening core DSA & ML fundamentals.",
    goal: "Building high-impact intelligent systems, contributing to superintelligence research & AI engineering, and pursuing GATE DS-AI."
  },

  experience: [
    {
      role: "Software Development Engineer (SDE) Intern",
      company: "QuantNexa.ai Pvt. Ltd.",
      location: "Remote",
      period: "Oct 2026 – Nov 2026",
      type: "Internship",
      badge: "220+ Automated Tests · 3 Flagship Systems Delivered",
      summary:
        "Independently created and shipped three production-grade applied AI & full-stack systems under technical lead guidance, deployed live on Render & Vercel with zero hallucinations and comprehensive test suites.",
      deliverables: [
        {
          title: "SmartEd Studio v3.0 (AstraGrade)",
          subtitle: "AI Handwritten Script Evaluator & Academic Assessment Platform",
          statusBadge: "60/60 Pytest Passed",
          metrics: "<2.0s Ingestion · 3-Layer Scoring · 100% Pass",
          summary:
            "Engineered an automated university exam grading workstation achieving <2.0s multi-core ingestion with CLAHE contrast preprocessing, hybrid OCR, and a 3-layer deterministic scoring engine (lexical, semantic embeddings, discrete rubric verification) eliminating grading hallucinations.",
          highlights: [
            "Engineered <2.0s multi-core ingestion with CLAHE contrast preprocessing and hybrid OCR.",
            "Built 3-layer deterministic scoring engine eliminating hallucinations.",
            "Designed split-view teacher verification desk with live 1–10 strictness calibration and Scribe digital ink annotations.",
            "Shipped retroactive cohort rubric recalculation, ReportLab running ledger PDF/CSV exports, and 60/60 passing Pytest tests."
          ],
          techStack: ["Python", "FastAPI", "React.js", "Vite", "Gemini 3.1 Flash-Lite", "OpenCV", "pypdfium2", "ReportLab", "SQLite", "Pytest"]
        },
        {
          title: "Meet Intelligence",
          subtitle: "Zero-Cost Google Meet Bot & Real-Time Intelligence Extension",
          statusBadge: "135+ Tests · Live on Render",
          metrics: "6,000 TPM Rate-Limiter · 170k+ Tokens · Zero-Echo Audio",
          liveUrl: "https://meet-intelligence-api.onrender.com/dashboard",
          githubUrl: "https://github.com/thekrishnasarathe/Meet-Intelligence",
          summary:
            "Re-architected a Chrome extension prototype into a link-join Playwright bot + Manifest V3 side panel with zero-echo audio isolation, capturing speaker-attributed Hindi/Hinglish transcripts, camera/mic telemetry, and desktop/mobile device detection.",
          highlights: [
            "Multi-tiered zero-echo audio isolation allowing user and bot on the exact same PC/account without feedback.",
            "Speaker-separated transcripts in Hindi Devanagari, English, and Hinglish with initial letter avatar support.",
            "Designed 6,000 TPM Map-Reduce Groq pipeline summarizing 170,000+ token calls under strict 7,000-token caps.",
            "Interactive live web dashboard on Render, multi-model fallback, and 135+ automated tests."
          ],
          techStack: ["Python", "FastAPI", "Playwright", "Chrome Extension (MV3)", "Groq API (LLaMA 3.3)", "SQLite", "Render"]
        },
        {
          title: "Sentinelytics v3.0",
          subtitle: "Social Media & E-Commerce Sentiment Intelligence Platform",
          statusBadge: "27/27 Pytest Passed",
          metrics: "4,500+ Items in 1.31s · <0.02s PDF/CSV Export",
          summary:
            "Built a dual-domain diagnostic engine across YouTube, Instagram, Amazon, and Flipkart processing 4,500+ items in 1.31s via a 4-step Hinglish/spam preprocessor and text–emoji sarcasm conflict detector.",
          highlights: [
            "Domain-adaptive 2-tier NLP with DeepMoji-style text–emoji conflict and sarcasm detection.",
            "4-step linguistic preprocessor: URL/spam stripping, emoji weighting, Hinglish normalization, and negation preservation.",
            "Cross-filtering Recharts analytics ribbon, SQLite history comparison hub, and MV3 live DOM collector.",
            "Sub-second (<0.02s) ReportLab executive PDF and multi-table CSV exporters with 27/27 passing Pytest tests."
          ],
          techStack: ["Python", "FastAPI", "React 19", "Vite", "Tailwind CSS v4", "SQLite", "ReportLab", "Chrome Extension"]
        }
      ]
    }
  ],

  projects: [
    {
      title: "AEGIS-IoT",
      tagline: "Evidence-Gated C Firmware Vulnerability Repair Workbench",
      category: "Embedded Security & Applied AI",
      badge: "AI-Manthan 2.0 Grand Finalist · Indore",
      metrics: "97.0% LOOCV · 7-Stage Ladder · ~45m → ~1.2s",
      overview:
        "Engineered an evidence-gated C/C++ firmware vulnerability repair and deterministic verification workbench for memory-constrained embedded IoT systems (MCUs, RTOS, gateways). Generative LLMs propose candidate patches while an automated 7-stage ladder deterministically verifies compilation, sanitizers (ASan/UBSan), anti-cheat integrity, and MCU Flash/Stack budgets.",
      keyAchievements: [
        "Slashed embedded C firmware triage from ~45 min manual review to ~1.2s automated verification.",
        "97.0% LOOCV accuracy on 100-sample NIST Juliet & CVEfixes benchmark with 12-feature AST neural classifier.",
        "Multi-cloud router: Groq (qwen-2.5-coder-32b, ~500ms) → Gemini → OpenRouter → Local Ollama.",
        "Hardened ATmega328P Hardware-in-the-Loop node with LCD/LED/buzzer alarms and fail-safe digital twin mirror."
      ],
      techStack: ["Python", "FastAPI", "React 18", "Vite", "C/C++", "GCC (ASan/UBSan)", "ATmega328P", "Groq", "Ollama"],
      featured: true,
      group: "featured"
    },
    {
      title: "GullyMart",
      tagline: "Hyperlocal Social Commerce & Community Discovery Platform",
      category: "Full-Stack Web & Geo-Commerce",
      badge: "🏆 1st Place National Winner (100+ Teams)",
      metrics: "BGI National Hackathon 2026 · AICTE & HCL Tech",
      overview:
        "Won 1st Place against 100+ national collegiate teams (Vision 2047 Viksit Bharat) by leading ideation, dual-sided marketplace workflows, concept deck, and winning 5-minute GTM pitch targeting India's $40B+ informal retail sector.",
      keyAchievements: [
        "Won 1st Place & Certificate of Excellence out of 100+ national teams (600+ registered teams).",
        "Shipped dual-sided MVP with interactive MapLibre GL discovery maps, social feed, live chat, and merchant portal.",
        "Real-time Supabase PostgreSQL persistence with instant geospatial search and store management."
      ],
      techStack: ["React.js", "Vite", "Tailwind CSS", "Supabase (PostgreSQL)", "MapLibre GL", "Three.js"],
      featured: true,
      group: "featured"
    },
    {
      title: "KhetLedger (खेतलेजर) v1.0.0",
      tagline: "Offline-First Agricultural Work, Cost & Billing Ledger for Indian Farmers",
      category: "Mobile App & FinTech",
      badge: "Signed Android APK · Production Ready",
      metrics: "46/46 Tests (38 Vitest + 8 Playwright E2E)",
      overview:
        "Production-grade, offline-first mobile application tailored for Indian agriculture, replacing paper diaries with an error-free digital ledger that operates with zero internet connection in rural fields. Built with strict integer-paise financial precision.",
      keyAchievements: [
        "Eliminated floating-point rounding errors via strict integer-paise arithmetic across 13 relational tables.",
        "Overpayment & balance protection with partial settlement tracking (UNPAID → PARTIAL → PAID).",
        "Complete bilingual parity (हिन्दी & English) with instant toggle and zero layout breakage.",
        "One-tap WhatsApp bill sharing, agricultural calculators (labor wages, tractor hours), and signed Android APK."
      ],
      techStack: ["React 18", "TypeScript", "Tailwind CSS", "Dexie.js (IndexedDB)", "Supabase", "Capacitor Android", "Vitest", "Playwright"],
      featured: true,
      group: "mobile"
    },
    {
      title: "MONEY v2.0",
      tagline: "Ultra-Premium Offline-First Personal Finance Coach & Private-Banking Suite",
      category: "Mobile FinTech & Dual-LLM AI",
      badge: "Smart FinTech Hackathon · Live Web & APK",
      metrics: "29/29 Tests Passed · v1–v5 SQLite Migrations",
      link: "https://my-money-five-lime.vercel.app",
      backendLink: "https://money-ai-backend.onrender.com",
      github: "https://github.com/thekrishnasarathe/My-Money",
      overview:
        "Transforms personal financial management into an active, private-banking advisory experience. Combines an offline-first indexed SQLite core with dual-model conversational intelligence powered by Google Gemini and Groq Cloud with deterministic financial safety.",
      keyAchievements: [
        "Jet Black & Champagne Gold luxury private-banking design system with real-time net cash flow and burn rates.",
        "AI Monthly Budget Planner using 50/30/20 zero-based framework with live interactive rebalancing.",
        "Hardware-backed PIN security with per-device 32-byte salted SHA-256 in Keystore and Firestore remote kill-switch.",
        "Released Android APK v2.0.0, live Vercel Web deployment, Render API, and 29/29 automated tests."
      ],
      techStack: ["Flutter 3.24", "Dart", "SQLite", "Python (FastAPI)", "Google Gemini 3 Flash", "Groq Cloud", "Firebase", "Vercel", "Render"],
      featured: true,
      group: "mobile"
    },
    {
      title: "FRIDAY-X",
      tagline: "Trilingual AI Desktop & Cloud Assistant with Iron Man HUD",
      category: "Applied AI & Voice Systems",
      badge: "Live Deployed on Vercel & Render",
      metrics: "Trilingual (EN / HI / Hinglish) · Sub-second Groq",
      link: "https://friday-x-nine.vercel.app",
      backendLink: "https://friday-x-backend.onrender.com",
      overview:
        "Advanced personal desktop assistant inspired by JARVIS and FRIDAY. Engineered with a modular FastAPI backend and futuristic React HUD frontend, delivering natural conversation, desktop automation, system telemetry, and contextual mode switching.",
      keyAchievements: [
        "Fluently processes and replies in English, Hindi, and Hinglish with dynamic tone adaptation.",
        "Ultra-fast Groq LLaMA 3.1 8B inference with graceful offline fallback and zero-key heuristic engine.",
        "4 specialized operational modes: Assistant, Coding, Study, and Secure lock-down.",
        "Production-hardened on Render (backend) and Vercel (frontend) with auto-reconnect telemetry."
      ],
      techStack: ["Python", "FastAPI", "React 19", "Vite", "Groq Cloud (LLaMA 3.1)", "Web Audio API", "Vercel", "Render"],
      featured: true,
      group: "ai"
    },
    {
      title: "JARVIS 2.0",
      tagline: "Autonomous Agent Swarms & Spatial 3D Memory Theater",
      category: "Autonomous Agents & 3D Systems",
      badge: "54/54 Pytest Passed (100%) · Live Web HUD",
      link: "https://jarvis-20-web.vercel.app/?api=https://jarvis-2-0-dv4v.onrender.com",
      backendLink: "https://jarvis-2-0-dv4v.onrender.com",
      overview:
        "Next-generation multi-modal AI orchestrator featuring autonomous background subagent swarms, physical 3D spatial memory graph rendered with VTK/PyVista, biometric face security, and a cinematic Stark Industries Web HUD.",
      keyAchievements: [
        "Spatial Memory Theater plotting memories as gravitational nodes in 3D space using TF-IDF cosine similarity.",
        "Subagent swarming executing non-blocking background research and automation via tool calling.",
        "Dual interface: Native PyQt6 + VTK 3D window and reactive cloud Web HUD on Vercel.",
        "100% test coverage with 54 automated pytest test suites."
      ],
      techStack: ["Python 3.10+", "FastAPI", "PyQt6", "PyVista (VTK)", "SQLite", "Groq / LLaMA 3.1", "OpenCV", "Vercel", "Render"],
      featured: true,
      group: "ai"
    },
    {
      title: "SmartEd Studio v3.0 (AstraGrade)",
      tagline: "Human-in-the-Loop AI Handwritten Script Evaluator & Academic Assessment",
      category: "Applied AI & Computer Vision",
      badge: "QuantNexa Flagship · 60/60 Pytest Passed",
      metrics: "<2.0s Ingestion · 3D Parchment Dossier",
      overview:
        "Publication-grade academic evaluation platform engineered for universities. Transforms physical exam answer sheets into an effortless digital evaluation workflow using Multimodal Vision LLMs (Gemini 3.1 Flash-Lite), pypdfium2, CLAHE contrast enhancement, and ReportLab running ledgers.",
      keyAchievements: [
        "2-call batched multimodal vision pipeline evaluating 9-page student booklets in ~10–15s.",
        "3D parchment booklet visualizer with realistic page-turning and notebook-ruled lines.",
        "Split-view teacher verification desk with digital ink annotations, 1–10 strictness slider, and ReportLab PDF ledgers."
      ],
      techStack: ["Python", "FastAPI", "React 18", "Vite", "Gemini 3.1 Flash-Lite", "OpenCV", "pypdfium2", "ReportLab", "SQLite"],
      group: "internship"
    },
    {
      title: "Meet Intelligence",
      tagline: "Zero-Cost Google Meet Autonomous Bot & Engagement Telemetry",
      category: "Applied AI & Automation",
      badge: "QuantNexa Flagship · 135+ Tests Passed",
      metrics: "Live on Render · Zero-Echo Audio Isolation",
      link: "https://meet-intelligence-api.onrender.com/dashboard",
      github: "https://github.com/thekrishnasarathe/Meet-Intelligence",
      overview:
        "Speaker-separated transcripts, camera/mic engagement tracking, live catch-up summaries, and structured final reports for any Google Meet call—built to run at $0 cost on any personal or workspace account.",
      keyAchievements: [
        "Playwright autonomous bot with multi-tiered zero-echo audio isolation.",
        "Full Hindi, Hinglish, and English caption capture with letter-avatar participant support.",
        "Token-budgeted Map-Reduce pipeline summarizing 170,000+ token calls under strict 7,000-token caps and 6,000 TPM pacer."
      ],
      techStack: ["Python", "FastAPI", "Playwright", "Chrome Extension (MV3)", "Groq API", "SQLite", "Render"],
      group: "internship"
    },
    {
      title: "Sentinelytics v3.0",
      tagline: "Domain-Adaptive Social Media & E-Commerce Sentiment Intelligence",
      category: "Applied AI & Data Analytics",
      badge: "QuantNexa Flagship · 27/27 Pytest Passed",
      metrics: "4,500+ Items in 1.31s · Sub-second PDF/CSV",
      overview:
        "Dual-domain sentiment analysis and root-cause diagnostic platform for Social Media (YouTube, Instagram) and E-Commerce (Amazon, Flipkart) with 2-tier NLP, sarcasm clash detection, and Obsidian architectural analytics.",
      keyAchievements: [
        "DeepMoji-style text–emoji conflict and sarcasm detection flagging hidden sentiment clashes.",
        "Domain-adaptive Tier-2 root-cause sub-tagging (hardware defects, logistics, fake items, audio sync).",
        "Sub-second (<0.02s) ReportLab executive PDF and normalized multi-table CSV exporters."
      ],
      techStack: ["Python", "FastAPI", "React 19", "Vite", "Tailwind CSS v4", "SQLite", "Chrome Extension"],
      group: "internship"
    },
    {
      title: "LMS Like Never Before",
      tagline: "Production-Ready Next.js 14 LMS with Groq AI Mentor & Razorpay Payments",
      category: "Full-Stack Web & AI",
      badge: "Live Production Deployment",
      metrics: "Next.js 14 App Router · AWS S3 Presigned URLs",
      link: "https://lms-like-never-before.vercel.app",
      github: "https://github.com/KrishnaSarathe/lms-like-never-before",
      overview:
        "Full-stack Learning Management System powered by AI (Groq LLaMA 3.1 8B Instant), Razorpay payments, AWS S3 presigned video streaming, MongoDB Atlas, D3.js skill graph progress, and dynamically generated PDF completion certificates.",
      keyAchievements: [
        "AI Mentor chatbot per lesson, AI quiz generation with auto-grading, and AI study planner.",
        "End-to-end Razorpay checkout integration with server-side signature verification.",
        "AWS S3 presigned direct video uploads bypassing server bottlenecks and dynamic pdf-lib certificates."
      ],
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Groq LLaMA 3.1", "MongoDB Atlas", "Razorpay", "AWS S3", "D3.js"],
      group: "fullstack"
    },
    {
      title: "Clozr v2.0 (ColdCaller Pro)",
      tagline: "AI-Powered Cold Calling & Lead Discovery Engine with Tinder-Style Swiping",
      category: "B2B Sales Tech & AI",
      badge: "Innoverse Hackathon 2026",
      metrics: "Google Gemini 2.5 Flash Lite · Midnight Forest Palette",
      overview:
        "B2B SaaS platform engineered for cold callers, SDRs, and agency sales teams in India. Combines interactive Tinder-style lead discovery with an in-app spreadsheet CRM, instant clipboard phone copying, and Aria full-page AI voice/text companion.",
      keyAchievements: [
        "Frictionless 3D card swipe deck with instant OS clipboard auto-copying and custom 2-sentence opening pitch briefs.",
        "Full in-app spreadsheet CRM with inline cell editing, status pills, and 1-click CSV export.",
        "Aria AI Copilot with native Web Speech API recognition, soundwave visuals, and Gemini 2.5 objection handling."
      ],
      techStack: ["React 19", "Vite 8", "Node.js / Express 5", "Google Gemini 2.5 Flash Lite", "Supabase", "Google Sheets API v4"],
      group: "fullstack"
    },
    {
      title: "KRISHNA.AI Portfolio",
      tagline: "Cinematic Cognitive System Interface with 3D Neural Brain & SaratheOS",
      category: "Creative Dev & 3D Web",
      badge: "Live Portfolio · 95+ Lighthouse",
      overview:
        "Interactive cyberpunk portfolio built with Next.js App Router, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS. Features 3 distinct operating modes (Brain, City, SaratheOS), Web Audio API sound synthesizer, and interactive terminal.",
      keyAchievements: [
        "Three.js 3D rotating holographic neural brain with interactive synaptic connection pulses.",
        "SaratheOS desktop simulation with functional terminal running system diagnostics and secret hacker modes.",
        "Synthesized real-time audio interaction using the Web Audio API without audio asset dependencies."
      ],
      techStack: ["Next.js 14", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS", "Framer Motion", "Gemini API"],
      group: "fullstack"
    },
    {
      title: "CRIS (Customer Retention Intelligence System)",
      tagline: "Leakage-Safe Machine Learning Churn Prediction Pipeline",
      category: "Machine Learning & Predictive Systems",
      badge: "B.Tech Sem III Project · Team Lead",
      metrics: "Probability Calibration · Expected-Value Ranking",
      overview:
        "End-to-end customer churn prediction pipeline built with Scikit-Learn, featuring leakage-safe preprocessing, probability calibration, expected-value customer ranking, FastAPI inference service, and interactive Streamlit analytics dashboard.",
      keyAchievements: [
        "Led team of 4 undergraduates in building leakage-safe cross-validated feature pipelines.",
        "Integrated probability calibration (Platt scaling & isotonic regression) for calibrated financial loss ranking.",
        "FastAPI REST microservice with Streamlit dashboard for non-technical retention managers."
      ],
      techStack: ["Python", "Scikit-Learn", "NumPy", "Pandas", "FastAPI", "Streamlit", "Matplotlib", "Seaborn"],
      group: "ai"
    }
  ],

  certificates: [
    {
      title: "Information Technology Specialist in Python",
      issuer: "Pearson VUE · Certiport · CERTNEXUS",
      category: "certifications",
      badge: "Official Pearson VUE Credential",
      date: "September 23, 2025",
      verificationCode: "wMr3K-FaSQ",
      verificationUrl: "https://verify.certiport.com",
      summary:
        "Successfully completed international certification requirements for Python issued by Pearson VUE and Certiport, validating deep competency in core data structures, algorithms, object-oriented programming, and computational logic.",
      skills: ["Python", "Data Structures", "Algorithms", "Object-Oriented Programming", "Computational Problem Solving"]
    },
    {
      title: "Information Technology Specialist in HTML and CSS",
      issuer: "Pearson VUE · Certiport · CERTNEXUS",
      category: "certifications",
      badge: "Official Pearson VUE Credential",
      date: "May 25, 2026",
      verificationCode: "nA6Q-uTn8",
      verificationUrl: "https://verify.certiport.com",
      summary:
        "Completed industry-recognized certification requirements for HTML and CSS under Pearson VUE and Certiport, certifying mastery of modern semantic markup, responsive design principles, and web layout architectures.",
      skills: ["HTML5", "CSS3", "Responsive Layouts", "Flexbox & Grid", "Web Standards"]
    },
    {
      title: "BGI National Hackathon 2026 — Winner (Certificate of Achievement)",
      issuer: "Bansal Group of Institutes (BGI) · AICTE · MPSDC",
      category: "awards",
      badge: "🏆 1st Place National Winner",
      date: "13–14 May 2026",
      summary:
        "Recognized as the WINNER at a premier national innovation platform (Vision 2047 | Viksit Bharat) under the theme 'Mobile & Next-Gen App Innovation' for the GullyMart project, demonstrating excellence among 600+ teams and 2,800+ participants nationwide.",
      skills: ["GullyMart", "Social Commerce", "National Innovation", "Team Leadership", "Mobile App Architecture"]
    },
    {
      title: "BGI National Hackathon 2026 — 1st Prize (Certificate of Winning)",
      issuer: "Geeks of Gurukul & SCOPE Global Skills University",
      category: "awards",
      badge: "🏆 1st Prize Winner · ₹25,000 Cash Prize",
      prize: "Cash Prize: ₹25,000/-",
      date: "May 2026",
      summary:
        "Awarded 1st Prize to team 'The Vibe Coders' (Student Name: Krishna Sarathe) at the BGI Hackathon 2026 – Vision 2047 | Viksit Bharat, with a ₹25,000/- cash prize award for outstanding innovation, teamwork, and problem-solving skills.",
      skills: ["Team Leadership", "Rapid MVP Delivery", "Supabase", "React.js", "Venture Pitch"]
    },
    {
      title: "AI Prompt Writing — Runner-Up (Kaushal Charcha 07th Edition)",
      issuer: "AISECT India & SGSU (World Youth Skills Day 2026 · Skill India)",
      category: "awards",
      badge: "🥈 Runner-Up Award",
      date: "15th July 2026",
      summary:
        "Secured Runner-Up position in the 'AI PROMPT WRITING' competition celebrating World Youth Skills Day 2026 under the theme 'Skills for a Shared Future' recognizing performance, creativity, and commitment to excellence.",
      skills: ["Prompt Engineering", "Generative AI", "LLM Context Framing", "System Persona Design"]
    },
    {
      title: "AI-Manthan 2.0 National Hackathon — Finalist & Team Leader",
      issuer: "AITR Indore (IT Dept) & IEEE Computational Intelligence Society",
      category: "hackathons",
      badge: "Grand Finalist · Team Leader (SIGMOID SQUAD)",
      date: "31st Oct – 1st Nov 2026",
      summary:
        "Actively participated as Team Leader of SIGMOID SQUAD at AI मंथन 2.0, a 24-hour offline National Level Prototype Hackathon at Acropolis Institute of Technology and Research (AITR), Indore, developing and presenting AEGIS-IoT.",
      skills: ["AEGIS-IoT", "Embedded C Firmware", "GCC Sanitizers", "Hardware HIL Node", "Deterministic Verification"]
    },
    {
      title: "Number Quest? Season-1 — Finalist",
      issuer: "SCOPE Global Skills University & HEXAWARE",
      category: "hackathons",
      badge: "Season-1 Finalist",
      date: "29th May 2026",
      summary:
        "Secured the FINALIST position in Season-1 of 'Number Quest? (Crack the Clues, Conquer the Numbers)' powered by HEXAWARE in collaboration with Maths Club & Quiz Club, testing rapid algorithmic deduction and advanced mathematical logic.",
      skills: ["Mathematical Logic", "Discrete Mathematics", "Algorithmic Deduction", "Numerical Reasoning"]
    }
  ],

  skills: [
    {
      name: "Programming Languages",
      description: "Python, C++, JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL"
    },
    {
      name: "AI, Machine Learning & LLMs",
      description: "Scikit-Learn, NumPy, Pandas, Matplotlib, Seaborn, LLM APIs (Groq, Gemini), Prompt Engineering, AI Agents, Multimodal Vision, NLP"
    },
    {
      name: "Web & Full-Stack Development",
      description: "FastAPI, Next.js 14, React 18/19, Vite, Node.js, Express, Tailwind CSS, REST APIs, WebSockets"
    },
    {
      name: "Mobile & Embedded Platforms",
      description: "Flutter & Dart, Capacitor Android, GCC / Clang, C/C++ Firmware, Arduino / ATmega328P, Sanitizers (ASan/UBSan)"
    },
    {
      name: "Databases & Cloud Storage",
      description: "SQLite (v1–v5 migrations), Supabase (PostgreSQL), Dexie.js (IndexedDB), MongoDB Atlas, Firebase Firestore, AWS S3"
    },
    {
      name: "Tools, Testing & Cloud DevOps",
      description: "Git & GitHub, Pytest (220+ tests), Vitest, Playwright E2E, Chrome Extensions (Manifest V3), Vercel, Render, Docker"
    },
    {
      name: "CS Fundamentals & Core Theory",
      description: "Data Structures & Algorithms, OOP in C++, Discrete Structures, Linear Algebra, Probability & Statistics, System Design"
    }
  ],

  journey: [
    { year: "2007", label: "Born in Madhya Pradesh, India." },
    { year: "2023", label: "Completed Class X (Senior Secondary, CBSE Board) with 68.4%." },
    { year: "2025", label: "Completed Class XII (Mathematics stream, MP Board) with 85.8% aggregate — School Topper at DJVN Higher Secondary School." },
    { year: "2025", label: "Enrolled in B.Tech Computer Science & Engineering (AI & Data Science) at SCOPE Global Skills University (SGSU), Bhopal." },
    { year: "May 2026", label: "🏆 1st Place Winner out of 600+ teams (2,800+ participants) at BGI National Hackathon with GullyMart (₹25,000 cash prize)." },
    { year: "Jul 2026", label: "🥈 Runner-Up in AI Prompt Writing on World Youth Skills Day (AISECT & SGSU)." },
    { year: "Oct 2026", label: "Grand Finalist & Team Leader (SIGMOID SQUAD) at AI-Manthan 2.0 (AITR, Indore & IEEE CIS) with AEGIS-IoT." },
    { year: "Oct–Nov 2026", label: "Software Development Engineer (SDE) Intern at QuantNexa.ai Pvt. Ltd. (Remote) — delivered SmartEd Studio, Meet Intelligence, and Sentinelytics backed by 220+ tests." },
    { year: "2026", label: "Released signed Android APKs for KhetLedger & MONEY v2.0, published live cloud services on Vercel and Render." },
    { year: "Now", label: "B.Tech CSE (AI & DS) 3rd Sem (CGPA 8.26/10), Secretary of BizAI Club, Core Member of Binary Battle & Coders Club and E-Cell & IIC." },
    { year: "Future", label: "Aiming for GATE DS-AI (Top IIT), Google Summer of Code (GSoC), AI Superintelligence Research, and founding an impactful AI startup." }
  ],

  contact: {
    email: "thekrishnasarathe000@gmail.com",
    github: "https://github.com/thekrishnasarathe",
    linkedin: "https://linkedin.com/in/krishna-sarathe-9a749a297",
    phone: "+91 9109483355"
  },
  resumePath: "/krishna-sarathe-resume.pdf"
};

export const sectionTitles: Record<SectionId, string> = {
  profile: "Prefrontal Cortex / Profile",
  experience: "Industrial Matrix / Experience",
  projects: "Innovation Cortex / Projects",
  certificates: "Security Clearance / Certificates",
  skills: "Neural Network Layer / Skills",
  journey: "Memory Cortex / Journey",
  contact: "Signal Hub / Contact"
};
