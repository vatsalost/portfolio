export const INITIAL_PROJECTS = [
  {
    id: "synthetix-ai",
    title: "SYNTHETIX",
    client: "Collegiate AI Hackathon (Grand Prize)",
    category: "Hackathons & AI",
    year: "2025",
    tagline: "Autonomous Multimodal Perception Engine • 1st / 180 Teams",
    role: "Lead Systems & Interaction Architect (2nd Year CSE)",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "An experimental multimodal perception engine combining real-time spatial video understanding, local generative audio synthesis, and autonomous task reasoning executed with sub-12ms latency on consumer hardware.",
    problem: "Existing multimodal AI agents rely on cloud roundtrips that introduce 800ms+ latency, completely breaking the illusion of real-time presence and intuitive spatial interaction in high-stakes creative workflows.",
    process: "We engineered a dual-layer client-side pipeline. The spatial tracker runs lightweight WebGPU tensor models directly in-browser, coupled with an asynchronous WebSocket multiplexer streaming compressed latent tensors to our edge cluster. The UI was designed with an ultra-minimal black and crimson HUD aesthetic inspired by aerospace telemetry.",
    solution: "A zero-latency neural interface featuring real-time eye-gaze tracking, responsive kinetic feedback curves, and a custom micro-grammar for rapid voice-and-gesture agent orchestration.",
    metrics: [
      { label: "Latency Reduction", value: "94%" },
      { label: "Hackathon Placement", value: "1st / 180" },
      { label: "FPS Stability", value: "120 FPS" },
      { label: "Community Stars", value: "3.8k" }
    ],
    stack: ["React", "WebGPU", "C++", "GSAP", "Tailwind CSS", "WebSockets"],
    liveUrl: "https://synthetix.agentic.ai",
    githubUrl: "https://github.com/vatsal/synthetix-engine"
  },
  {
    id: "chrono-ds",
    title: "CHRONO-DS",
    client: "CS201 Data Structures & Algorithms Project",
    category: "Digital Products",
    year: "2025",
    tagline: "3D GPU Graph & Algorithm Visualizer • 850+ Student Users",
    role: "Sole Creator & Lead Developer (2nd Year CSE)",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "A GPU-accelerated interactive 3D visualizer for complex graph traversals, self-balancing search trees (AVL, Red-Black), dynamic programming state spaces, and pathfinding heuristics.",
    problem: "Abstract pointer arithmetic and recursive algorithm states are difficult for CS students to mentally visualize from 2D textbook whiteboard drawings.",
    process: "Leveraged WebGL and Three.js instanced rendering to model 10,000+ graph vertices simultaneously with real-time step-by-step playback, breakpoint debugging, and call stack visualization.",
    solution: "A visceral educational tool adopted by 800+ sophomore peers and teaching assistants across our university's engineering curriculum.",
    metrics: [
      { label: "Active Student Users", value: "850+" },
      { label: "Graph Capacity", value: "10,000+ Nodes" },
      { label: "Render Target", value: "60 FPS" },
      { label: "Algorithms Visualized", value: "24" }
    ],
    stack: ["Three.js", "C++ WASM", "React", "GSAP", "Tailwind CSS"],
    liveUrl: "https://chrono-ds.vatsal.dev",
    githubUrl: "https://github.com/vatsal/chrono-ds"
  },
  {
    id: "nexus-campus",
    title: "NEXUS CAMPUS",
    client: "Campus Open Source Initiative",
    category: "Digital Products",
    year: "2024",
    tagline: "Peer-to-Peer Academic & Project OS • 4,200+ Active Undergrads",
    role: "Full-Stack System Architect & UI Lead",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "A decentralized campus platform connecting engineering students for hackathon team formation, peer code reviews, past-paper repositories, and laboratory workstation bookings.",
    problem: "Collegiate communication is fragmented across chaotic WhatsApp groups, outdated LMS portals, and scattered Google Drives with zero code syntax support or team matchmaking.",
    process: "Engineered a high-performance React + Node.js hub with end-to-end encrypted chat, integrated Markdown/LaTeX notes sync, and a skill-matching graph algorithm that pairs hackathon candidates.",
    solution: "A unified, brutalist dark-mode digital operating system that boosted collegiate hackathon participation by 240% in our university department.",
    metrics: [
      { label: "Registered Undergrads", value: "4,200+" },
      { label: "Hackathon Teams Formed", value: "185" },
      { label: "Daily Active Time", value: "18 mins" },
      { label: "Uptime", value: "99.9%" }
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Socket.io", "Tailwind CSS"],
    liveUrl: "https://nexus-campus.org",
    githubUrl: "https://github.com/vatsal/nexus-campus"
  },
  {
    id: "titan-cli",
    title: "TITAN CLI",
    client: "Systems Programming & Lab Tooling",
    category: "Brand Systems",
    year: "2024",
    tagline: "High-Velocity Systems Terminal & Lab Auto-Tester • Valgrind Memory Profiling",
    role: "Systems Programmer (C++ & Rust)",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "A lightweight terminal CLI utility written in Rust and C++ that automates test-case execution, diff verification, and Valgrind memory leak profiling for college C/C++ programming assignments.",
    problem: "Undergraduates waste hours debugging segmentation faults and formatting test-case outputs manually before submitting lab assignments to university autograders.",
    process: "Built a multi-threaded process runner with sandboxed execution, memory profiling telemetry, and color-coded unified diff reports in under 4ms per test case.",
    solution: "Over 60,000 test runs performed by CS students across 4 course sections with a 99.8% crash reproduction rate.",
    metrics: [
      { label: "Lab Test Runs", value: "60k+" },
      { label: "Execution Time", value: "<4ms" },
      { label: "Github Stars", value: "1.2k" },
      { label: "Memory Footprint", value: "1.8 MB" }
    ],
    stack: ["Rust", "C++", "Linux Systems", "Valgrind", "Bash"],
    liveUrl: "https://titan-cli.dev",
    githubUrl: "https://github.com/vatsal/titan-cli"
  },
  {
    id: "otsuka-vault",
    title: "OTSUKA ARCHIVE",
    client: "Independent Creative Commission",
    category: "Brand Systems",
    year: "2025",
    tagline: "Experimental Studio WebGL Experience • 120 FPS Kinetic Motion",
    role: "Creative Technologist & Motion Lead",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "An experimental editorial showcase exploring brutalist typography and fluid physics shaders, proving high-end motion design can run at 120 FPS on lightweight client bundles.",
    problem: "Standard web portfolios rely on generic templates and bloated WordPress builders that load 25MB of unnecessary assets.",
    process: "Coupled Lenis smooth scrolling with GSAP ScrollTrigger and custom fragment shaders, keeping total asset payload under 1.4MB.",
    solution: "A masterclass in restraint, negative space, and kinetic responsiveness.",
    metrics: [
      { label: "Load Time", value: "0.4s" },
      { label: "Bundle Size", value: "1.4 MB" },
      { label: "Frame Rate", value: "120 FPS" },
      { label: "Score", value: "98/100" }
    ],
    stack: ["React", "GSAP 3", "Lenis", "WebGL", "Tailwind CSS"],
    liveUrl: "https://otsuka-archive.studio",
    githubUrl: "https://github.com/vatsal/otsuka-archive"
  },
  {
    id: "neuro-canvas",
    title: "KINETIC NEURAL",
    client: "Hackathon Track Winner",
    category: "Hackathons & AI",
    year: "2024",
    tagline: "Real-Time EEG & Audio Visualizer • Web Audio API & GLSL",
    role: "Lead Creative Technologist (2nd Year CSE)",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "An experimental biometric interface translating raw Fourier-transformed frequencies into living procedural wireframe sculptures with real-time Web Audio synthesis.",
    problem: "Complex scientific signals like audio spectrums and biometric sensor streams are traditionally rendered as dry 2D line charts.",
    process: "Used Web Audio API analyzer nodes and custom vertex displacement shaders to visualize harmonic resonances in real time.",
    solution: "A mesmerizing kinetic artwork that pulses, breathes, and morphs its crimson wireframe geometry in response to frequency dynamics.",
    metrics: [
      { label: "Sampling Rate", value: "250 Hz" },
      { label: "Latency", value: "8ms" },
      { label: "Hackathon Placement", value: "1st Place" },
      { label: "FPS", value: "60 FPS" }
    ],
    stack: ["Web Audio API", "Three.js", "React", "GSAP", "Tailwind CSS"],
    liveUrl: "https://neuro-engine.vatsal.dev",
    githubUrl: "https://github.com/vatsal/neuro-engine"
  }
];
