export type AudienceLens = "all" | "hr" | "client" | "academic";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  client: string;
  category: string;
  description: string;
  impact: string;
  tech: string[];
  imagePlaceholderText: string;
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  status: "Verified" | "Academic Honors";
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Nasir Shahzad",
    preferredName: "Nasir Shahzad (Bhutta)",
    roleTagline: "Applied AI Engineer & Software Systems Architect",
    secondaryTagline: "Building Resilient Full-Stack Systems & French M.Sc. Candidate",
    email: "dev.nasirbhutta@gmail.com",
    phone: "+92 313 7576531",
    location: "Mandi Bahauddin & Islamabad, Pakistan (Open to Relocation to France)",
    nationality: "Pakistani",
    github: "https://github.com/nasirbhotta",
    linkedin: "https://linkedin.com/in/me-bhotta",
    instagram: "https://www.instagram.com/vibecode_unpacked/",
    instagramHandle: "@vibecode_unpacked",
    scholar: "https://github.com/NasirBhotta/ors_map",
    resumeUrl: "#contact-section",
  },

  languages: [
    { name: "French (Français)", level: "University Coursework (Grade A)", note: "Active study for French academic & professional immersion" },
    { name: "English", level: "IELTS Academic 6.5 (Listening: 7.5)", note: "100% English-medium 4-year undergraduate degree" },
    { name: "Urdu", level: "Native", note: "Mother Tongue" },
  ],

  projects: [
    {
      id: "kingston", number: "08", title: "Kingston",
      subtitle: "Next.js website", client: "Independent Project", category: "Web Development",
      description: "Built Kingston with Next.js, with a live website available on Vercel.",
      impact: "A published Next.js web project.",
      tech: ["Next.js"], imagePlaceholderText: "Kingston — Next.js Website",
      accentColor: "#38bdf8", liveUrl: "https://kingston-site.vercel.app/",
    },
    {
      id: "ecommerce", number: "07", title: "Full Stack Flutter Ecommerce Application",
      subtitle: "Flutter storefront, Firebase backend, payments & admin dashboard",
      client: "Independent Full Stack Project", category: "Full Stack Mobile E-Commerce",
      description: "Built a Flutter / GetX shopping app with product browsing, wishlist, cart, customer accounts, and orders. Firebase Authentication, Firestore, Storage, and Node.js Cloud Functions support the backend, with Stripe and wallet checkout plus a separate Flutter admin dashboard.",
      impact: "Connected customer shopping, payment integrations, and store administration in one full stack project.",
      tech: ["Flutter", "Dart", "GetX", "Firebase", "Cloud Firestore", "Cloud Functions", "Node.js", "Stripe"],
      imagePlaceholderText: "Flutter Ecommerce: Shopping, Payments, Wallet & Admin Dashboard",
      accentColor: "#f59e0b", githubUrl: "https://github.com/NasirBhotta/ecommerce_app",
    },
    {
      id: "24ifix",
      number: "01",
      title: "24ifix – Digital Device Repair & Tracking Platform",
      subtitle: "On-demand repair logistics for iPhones, MacBooks & hardware",
      client: "AXAON (Remote)",
      category: "Mobile Architecture & Enterprise System",
      description:
        "Engineered the complete cross-platform mobile client for 24ifix. Supports instant device diagnostics, customer booking for both doorstep home pickup and walk-in shop visits, and a live repair tracking dashboard with real-time technician status.",
      impact: "Architected onboarding, secure auth, booking engine & live status customer dashboard on iOS & Android.",
      tech: ["Flutter", "Dart", "REST APIs", "iOS & Android", "Real-Time Tracking", "AXAON"],
      imagePlaceholderText: "24ifix App Screens: Onboarding, Doorstep Booking & Live Technician Tracking",
      accentColor: "#10b981",
      githubUrl: "https://github.com/nasirbhotta",
    },
    {
      id: "nizaam",
      number: "02",
      title: "NIZAAM SaaS – Retail Management Platform",
      subtitle: "Mobile Retail, Repair & Branch Management",
      client: "Independent Commercial Product",
      category: "Production SaaS & Offline Architecture",
      description:
        "Developed a Flutter / Supabase business-management application for mobile retailers and repair shops. Connects POS, barcode and IMEI inventory, repairs, procurement, customer credit, expenses, account ledgers, branch permissions, subscription entitlements, and configurable receipts, with Drift persistence and queued inventory synchronization.",
      impact: "Connected stock, sales, repairs, and ledger workflows with local persistence and tenant- and branch-aware access.",
      tech: ["Flutter", "Dart", "Riverpod", "GoRouter", "Drift / SQLite", "Supabase / PostgreSQL", "RLS & RPC", "ESC/POS"],
      imagePlaceholderText: "NIZAAM SaaS Dashboard: Multi-Store POS, IMEI Ledger & Offline Sync Engine",
      accentColor: "#6366f1",
      githubUrl: "https://github.com/nasirbhotta",
    },
    {
      id: "brainbee",
      number: "03",
      title: "BrainBee – AI-Powered Learning Platform",
      subtitle: "Textbook Semantic Retrieval with RAG & FAISS",
      client: "COMSATS Undergraduate Capstone",
      category: "AI & Educational Technology",
      description:
        "Co-developed an AI educational platform serving 3,000+ users. Employs textbook semantic retrieval using high-dimensional embeddings and FAISS index clustering, automated AI quiz generation, flashcards, and student progress telemetry.",
      impact: "3,000+ registered users with a 40% increase in daily active engagement.",
      tech: ["Python", "Flutter", "FAISS", "Embeddings", "RAG", "Node.js"],
      imagePlaceholderText: "BrainBee AI: Semantic Search, Citation Inspector & Interactive Student Quizzes",
      accentColor: "#f59e0b",
      githubUrl: "https://github.com/nasirbhotta",
    },
    {
      id: "gotbakey",
      number: "04",
      title: "Got Bakey (Got Backey) – Bakery Marketplace App",
      subtitle: "Australian Artisanal Bakery E-Commerce & SOS Matching",
      client: "Crifly (Australian Client)",
      category: "Cross-Platform E-Commerce",
      description:
        "Marketplace mobile app connecting local bakers and customers in Australia. Features custom cake configurations, order status pipelines, in-app messaging, secure payment checkout, and emergency SOS baker matching for last-minute orders.",
      impact: "Shipped on iOS & Android with 95%+ shared Flutter codebase and real-time backend synchronization.",
      tech: ["Flutter", "Dart", "BLoC", "REST APIs", "Node.js", "Firebase", "Stripe"],
      imagePlaceholderText: "Got Bakey Mobile UI: Cake Customizer, SOS Order Dispatch & Baker Chat",
      accentColor: "#ec4899",
      githubUrl: "https://github.com/nasirbhotta",
    },
    {
      id: "shoutsy",
      number: "05",
      title: "Shoutsy – Creator & Brand Collaboration Platform",
      subtitle: "Influencer Marketing & Campaign Milestone Delivery Suite",
      client: "Crifly",
      category: "Social Marketplace & Creator Economy",
      description:
        "Mobile marketplace connecting brands and content creators for sponsored campaigns. Facilitates contract agreements, milestone deliveries, in-app messaging, and multi-channel asset approvals with fluid 60fps animations.",
      impact: "Engineered scalable state management and real-time chat with zero frame-drop UI on Android/iOS.",
      tech: ["Flutter", "Dart", "MVVM", "WebSockets", "MongoDB", "Express.js"],
      imagePlaceholderText: "Shoutsy App UI: Brand Campaign Milestones, Escrow & Creator Profiles",
      accentColor: "#8b5cf6",
      githubUrl: "https://github.com/nasirbhotta",
    },
    {
      id: "mapbox",
      number: "06",
      title: "Mapbox 3D Navigation (ors_map)",
      subtitle: "Bounded GPS Route Matching in Pure Dart (40-70 µs per fix)",
      client: "Open Source Engineering",
      category: "High-Performance Systems & Algorithms",
      description:
        "Mapbox 3D navigation experience with GLB vehicle rendering, camera tracking, and a vendor-neutral turn-by-turn engine in pure Dart. Implemented bounded forward-window matching with binary-search distance lookup on 10,000-point routes, and 60 FPS dead-reckoning pose animations.",
      impact: "Validated with 118+ unit, fuzz, and stress tests under GitHub Actions CI.",
      tech: ["Dart", "Flutter", "Mapbox Maps SDK v11", "GitHub Actions CI", "Dead Reckoning"],
      imagePlaceholderText: "ors_map Navigation Engine: 60 FPS Dead Reckoning & Benchmark Graphs",
      accentColor: "#06b6d4",
      githubUrl: "https://github.com/NasirBhotta/ors_map",
    },
  ],

  certificates: [
    {
      id: "cert-hf-agents",
      title: "Hugging Face Agents Course",
      issuer: "Hugging Face",
      issuerLogo: "🤗",
      date: "2025",
      skills: ["Autonomous AI Agents", "Tool Calling & Functions", "Open-Source LLMs", "Multi-Agent Workflows"],
      status: "Verified",
    },
    {
      id: "cert-mcp-agents",
      title: "AI Agentic Track: Agents & Model Context Protocol (MCP)",
      issuer: "Udemy",
      issuerLogo: "⚡",
      date: "2025",
      skills: ["Model Context Protocol (MCP)", "LangGraph", "CrewAI", "Agent Architecture"],
      status: "Verified",
    },
    {
      id: "cert-french",
      title: "French Language Coursework (Grade A)",
      issuer: "COMSATS University Islamabad",
      issuerLogo: "🇫🇷",
      date: "2024",
      skills: ["French Grammar", "Professional Reading & Writing", "Oral Expression", "Academic Immersion"],
      status: "Academic Honors",
    },
    {
      id: "cert-ielts",
      title: "IELTS Academic (Overall: 6.5 | Listening: 7.5)",
      issuer: "British Council / IDP",
      issuerLogo: "🌐",
      date: "April 2026",
      skills: ["Academic English", "Listening (7.5)", "Writing (6.5)", "Reading (6.0)"],
      status: "Verified",
    },
  ] as CertificateItem[],

  experience: [
    {
      role: "Full-Stack Flutter Engineer (Remote)",
      company: "AXAON",
      location: "Remote / Islamabad",
      period: "2026 - Present (Current)",
      type: "Full-Stack Mobile",
      appContext: "24ifix: On-Demand Device Repair Platform (iOS & Android)",
      highlights: [
        "Architecting and delivering the cross-platform Flutter client for 24ifix, an on-demand device repair and logistics service for iPhones, MacBooks, and electronics.",
        "Engineered fluid onboarding, secure multi-factor authentication, and end-to-end booking workflows supporting both Home Pickup & Drop-Off and In-Shop Appointments.",
        "Designed the customer dashboard with live technician tracking, service repair pipeline stages, and integrated REST APIs.",
      ],
      tech: ["Flutter", "Dart", "REST APIs", "iOS & Android", "State Management", "Git"],
    },
    {
      role: "Mobile App Development Intern",
      company: "GLOWSIMS",
      location: "Mobile App Development Department",
      period: "22 Feb 2026 - 22 May 2026 (3 months)",
      type: "Internship",
      appContext: "Talib LMS: Google Play (10K+ downloads) & Apple App Store",
      highlights: [
        "Optimized LMS backend APIs through database indexing and query optimization, reducing p95 response latency by 62% (1,100 ms down to 420 ms).",
        "Engineered automated student enrollment and attendance workflows in the LMS, slashing manual processing steps by 67% and attendance processing time by 69%.",
        "Enhanced the Flutter-based Talib app through caching, lazy loading, and pagination, reducing dashboard load times by 56% (from 3.2s down to 1.4s).",
      ],
      tech: ["Flutter", "Dart", "LMS APIs", "Database Indexing", "Query Optimization"],
    },
    {
      role: "Full-Stack Flutter Developer (Part-time)",
      company: "Crifly",
      location: "Islamabad, Pakistan",
      period: "Jan 2025 - Feb 2026",
      type: "Part-time",
      highlights: [
        "Co-developed and deployed flagship commercial applications including Got Bakey (Australian bakery marketplace) and Shoutsy (influencer marketing network).",
        "Developed 6 production Flutter applications with 95%+ code reuse across Android and iOS.",
        "Integrated 20+ REST API endpoints, Firebase authentication, real-time data synchronization, and backend services using Node.js, Express.js, and MongoDB.",
        "Applied MVVM and BLoC architectures, reducing code complexity by approximately 30%; resolved application defects and contributed to testing and release pipelines.",
      ],
      tech: ["Flutter", "Got Bakey", "Shoutsy", "Node.js", "Express.js", "MongoDB", "BLoC", "MVVM"],
    },
    {
      role: "Full Stack Flutter Developer Intern",
      company: "Crifly",
      location: "Islamabad, Pakistan",
      period: "20 Jun 2024 - 20 Sep 2024 (3 months)",
      type: "Internship",
      highlights: [
        "Completed my first internship as a Full Stack Flutter Developer at Crifly.",
        "Gained practical full stack Flutter development experience in a professional team.",
      ],
      tech: ["Flutter", "Dart", "Full Stack Development"],
    },
  ],

  academics: {
    degree: "Bachelor of Science in Computer Science",
    institution: "COMSATS University Islamabad, Islamabad Campus, Pakistan",
    period: "Feb 2022 - Jan 2026 (Graduated)",
    gpa: "3.23 / 4.00 (133 Credit Hours | Four-Year Degree)",
    medium: "100% English Medium of Instruction",
    selectedGrades: [
      { subject: "Statistics and Probability Theory", grade: "Grade A" },
      { subject: "Advanced Web Technologies", grade: "Grade A" },
      { subject: "Information Security", grade: "Grade A" },
      { subject: "Parallel and Distributed Computing", grade: "Grade A-" },
      { subject: "French Language Coursework", grade: "Grade A" },
    ],
    targetMSc: "French Master of Science (M.Sc.) / Master Recherche in Artificial Intelligence & Computer Science",
    researchVision:
      "Investigating the usability, access barriers, and affordability of constrained on-device AI-assisted learning systems compared to non-AI navigation in resource-constrained environments.",
    keyStrengths: [
      "Rigorous 4-year B.S. in Computer Science (133 credit hours, 100% English medium) with Grade A in high-distinction core subjects.",
      "Hands-on production track record in distributed mobile architectures, offline sync queues, and FAISS-backed RAG systems.",
      "Official academic French language distinction (Grade A) with ongoing immersion for seamless cultural and academic integration in France.",
      "Independent NIZAAM retail and repair software, alongside company work on the 24ifix on-demand repair client for AXAON.",
    ],
    references: [
      {
        name: "Tanveer Ahmed",
        title: "Assistant Professor",
        department: "Department of Computer Science",
        institution: "COMSATS University Islamabad",
        note: "Academic recommendation letter available on request",
      },
      {
        name: "Saadia Maqbool",
        title: "Lecturer",
        department: "Department of Computer Science",
        institution: "COMSATS University Islamabad",
        note: "Academic recommendation letter available on request",
      },
    ],
  },

  agentData: {
    name: "Nasir's AI Twin",
    title: "Autonomous Developer Dossier Copilot",
    welcomeMessage:
      "Bonjour! I am Nasir Shahzad's AI Twin. Ask me anything about his work on 24ifix at AXAON, NIZAAM SaaS, Talib LMS, his French M.Sc. candidacy, or his verified courses & certifications.",
    suggestedQuestions: [
      "Tell me about Nasir's work on 24ifix at AXAON",
      "What are his credentials for French M.Sc. admissions?",
      "Explain the architecture of NIZAAM SaaS",
      "What certificates and courses has Nasir completed?",
      "What are his IELTS and French language results?",
      "How can I contact or hire Nasir?",
    ],
    sampleQuestions: [
      {
        label: "24ifix (AXAON)",
        prompt: "Tell me about 24ifix at AXAON",
        answer:
          "Nasir is currently developing 24ifix at AXAON — an on-demand device repair and logistics platform for iPhones, MacBooks, and gadgets. Users can download the app to book repairs via home pickup or in-shop appointments, track diagnostics live, and manage billing. Nasir built the cross-platform frontend in Flutter for iOS and Android with REST API integration.",
      },
      {
        label: "French M.Sc. & EEF",
        prompt: "What are your credentials for French M.Sc. admissions?",
        answer:
          "Nasir is an applicant for French M.Sc. programs (Campus France EEF). He holds a 4-year B.S. in Computer Science from COMSATS (133 credit hours, English medium, CGPA: 3.23/4.00), Grade A in French university coursework, Band 6.5 in IELTS Academic, and verified faculty recommendation letters.",
      },
      {
        label: "NIZAAM SaaS",
        prompt: "Explain the architecture of NIZAAM SaaS",
        answer:
          "NIZAAM (MobileShop SaaS) is Nasir's Flutter / Supabase retail and repair management application. It connects POS, barcode and IMEI inventory, repairs, procurement, customer credit, expenses, account ledgers, staff permissions, and subscriptions. Drift supports local persistence and queued inventory synchronization; PostgreSQL policies and RPCs support tenant- and branch-aware operations.",
      },
      {
        label: "Certificates & Courses",
        prompt: "What courses and certificates have you completed?",
        answer:
          "Nasir holds verified certificates in the Hugging Face Agents Course (Autonomous Agents & Tool Calling), the AI Agentic Track (Model Context Protocol / MCP, LangGraph & CrewAI), French Language Coursework (Grade A), and IELTS Academic (Band 6.5 with 7.5 in Listening).",
      },
      {
        label: "Got Bakey & Shoutsy",
        prompt: "Tell me about Crifly projects",
        answer:
          "At Crifly, Nasir engineered and shipped flagship commercial Flutter apps including Got Bakey (an Australian artisanal bakery marketplace with SOS on-demand ordering) and Shoutsy (an influencer and brand marketing collaboration network), maintaining 95%+ cross-platform code reuse.",
      },
      {
        label: "Contact & Relocation",
        prompt: "How can I contact or hire Nasir?",
        answer:
          "You can reach Nasir directly at dev.nasirbhutta@gmail.com or on WhatsApp/Phone at +92 313 7576531. Check out his GitHub at github.com/nasirbhotta, LinkedIn at linkedin.com/in/me-bhotta, and his tech channel on Instagram @vibecode_unpacked.",
      },
    ],
    knowledgeBase: [
      {
        keywords: ["24ifix", "axaon", "repair", "pickup", "shop", "current job"],
        response:
          "Nasir is currently developing 24ifix at AXAON — an on-demand device repair and logistics platform for iPhones, MacBooks, and electronics. Users can book repairs via home pickup or shop appointment, track diagnostic milestones live, and manage billing. Nasir built the cross-platform frontend in Flutter for iOS and Android with REST API integration.",
      },
      {
        keywords: ["nizaam", "pos", "saas", "offline", "stores"],
        response:
          "NIZAAM (MobileShop SaaS) is Nasir's Flutter / Supabase retail and repair management application. It connects POS, barcode and IMEI inventory, repairs, procurement, customer credit, expenses, account ledgers, staff permissions, and subscriptions. Drift supports local persistence and queued inventory synchronization; PostgreSQL policies and RPCs support tenant- and branch-aware operations.",
      },
      {
        keywords: ["france", "admissions", "msc", "scholarship", "campus france", "master"],
        response:
          "Nasir is actively applying for French Master of Science (M.Sc.) programs in Artificial Intelligence and Computer Science through Campus France EEF for Fall 2026. He holds a 4-year B.S. in Computer Science from COMSATS (133 credit hours, English medium, CGPA: 3.23/4.00), Grade A in French Language coursework, Band 6.5 in IELTS Academic, and verified recommendation letters from COMSATS faculty.",
      },
      {
        keywords: ["certificates", "courses", "udemy", "hugging face", "mcp"],
        response:
          "Nasir holds official certifications in the Hugging Face Agents Course (Autonomous Agents & Tool Calling), the AI Agentic Track (Model Context Protocol / MCP, LangGraph & CrewAI), French Language Coursework (Grade A), and IELTS Academic (Band 6.5 with 7.5 in Listening).",
      },
      {
        keywords: ["brainbee", "capstone", "ai", "rag", "faiss"],
        response:
          "BrainBee is Nasir's undergraduate capstone project. It is an AI-powered educational platform featuring FAISS semantic retrieval, RAG, and automated study flashcards, serving 3,000+ students with a 40% boost in daily active engagement.",
      },
      {
        keywords: ["talib", "glowsims", "lms"],
        response:
          "At GLOWSIMS, Nasir optimized the Talib LMS app (10k+ downloads on Play Store & App Store), reducing p95 API latency by 62% and app dashboard startup time by 56% via Flutter caching and lazy loading.",
      },
      {
        keywords: ["contact", "email", "phone", "hire", "relocation", "instagram"],
        response:
          "You can reach Nasir directly at dev.nasirbhutta@gmail.com or on WhatsApp/Phone at +92 313 7576531. Check out his GitHub at github.com/nasirbhotta, LinkedIn at linkedin.com/in/me-bhotta, and his tech channel on Instagram @vibecode_unpacked.",
      },
    ],
  },
};
