export const INITIAL_PROJECTS = [
  {
    id: "hrte",
    title: "HRTE",
    subtitle: "Heuristic Relational Transduction Engine",
    category: "Systems & AI",
    year: "2024",
    tagline: "Autonomous Multimodal Database Synthesis & Schema-Grounded Neural Query Studio.",
    role: "Co-Creator / Core Engineer",
    featured: true,
    thumbnail: "/projects/hrte/1_master_system_architecture.png",
    heroImage: "/projects/hrte/1_master_system_architecture.png",
    gallery: [
      "/projects/hrte/1_master_system_architecture.png",
      "/projects/hrte/2_multimodal_ingestion_materialization_flow.png",
      "/projects/hrte/3_nl_to_sql_execution_pipeline.png",
      "/projects/hrte/5_triple_pool_security_isolation.png",
      "/projects/hrte/4_end_to_end_runtime_sequence.png"
    ],
    overview: "Heuristic Relational Transduction Engine (HRTE) is an autonomous database engineering platform that bridges unstructured business artifacts (PDFs, scanned ER diagrams, CSVs, and speech) into optimized, 3NF-normalized live MySQL databases, allowing stakeholders to query them in plain English.",
    problem: "Traditional relational database design forces developers and DBAs to manually transcribe business specifications, hand-draw ER diagrams, normalize schemas into 3NF, write DDL migration scripts, and compose complex multi-table SQL joins.",
    approach: "Built dual symbiotic pipelines: 1) Autonomous Multimodal Ingestion Pipeline using Tesseract OCR layout analysis, Apache PDFBox, and heuristic graph normalization to synthesize 3NF schemas and provision physical MySQL instances on the fly. 2) Natural Language to SQL Query Engine using on-device Faster-Whisper STT, local Ollama LLMs, JSqlParser AST validation with zero-mutation guarantees, and self-healing error loops.",
    technicalDetails: "Constructed triple-pool least-privilege database isolation using HikariCP (sf_app, sf_provisioner, and sf_query_ro). Integrated JSqlParser AST inspection to strictly reject write/administrative mutations, with sub-10ms read query execution, self-healing SQL feedback loop, and 87/87 automated backend tests passing.",
    architecture: "Enterprise tiered architecture: Tier 1 Presentation (React 19 / Vite Web Suite & pure Java 21 Swing Desktop Client with non-blocking SwingWorkers), Tier 2 Spring Boot 3.3.4 Backend with correlation ID tracing and heuristic micro-engines, Tier 3 HikariCP triple-pool isolation, and Tier 4 physical MySQL 8.0 storage engines.",
    results: "Sub-40ms end-to-end speech-to-query pipeline execution, sub-10ms query read latency, strict zero-mutation security guarantee, and automated multi-tenant database provisioning without cloud API costs or telemetry.",
    lessons: "Strict physical connection pooling (HikariCP) combined with Abstract Syntax Tree (AST) query validation provides bulletproof defense against SQL injection and privilege escalation in AI-driven database tools.",
    technicalHighlight: "Triple-Pool HikariCP Isolation · JSqlParser AST Security · Local Ollama + Faster-Whisper",
    stack: ["Java 21", "Spring Boot", "MySQL 8.0", "HikariCP", "React 19", "Ollama", "Faster-Whisper", "Tesseract OCR", "Java Swing"],
    liveUrl: "",
    githubUrl: "https://github.com/dslord/HRTE",
    contributors: [
      { name: "Devansh Singh", role: "Contributor", handle: "@dslord", github: "https://github.com/dslord" },
      { name: "Dharmit Shah", role: "Contributor", handle: "@dkshah25", github: "https://github.com/dkshah25" },
      { name: "Vatsal", role: "Contributor", handle: "@vatsalost", github: "https://github.com/vatsalost" },
      { name: "Atharva", role: "Contributor", handle: "@atharva07-tech", github: "https://github.com/atharva07-tech" }
    ],
    benchmarks: [
      { stage: "Stage 1", operation: "Voice Transcription", engine: "Faster-Whisper On-Device", latency: "~15 ms" },
      { stage: "Stage 2", operation: "Schema Context Retrieval", engine: "Spring Data JDBC (HRTE-AppPool)", latency: "~5 ms" },
      { stage: "Stage 3", operation: "Neural SQL Synthesis", engine: "Local Ollama (Llama 3 / Mistral)", latency: "~12 ms" },
      { stage: "Stage 4", operation: "AST Syntax & Safety Validation", engine: "JSqlParser AST Inspection", latency: "~2 ms" },
      { stage: "Stage 5", operation: "Read-Only Execution", engine: "MySQL 8.x (HRTE-QueryPool)", latency: "~3 ms" },
      { stage: "Stage 6", operation: "Result Serialization & Audit", engine: "Fast JSON Marshaller & Audit Service", latency: "~1 ms" }
    ],
    securityPools: [
      { name: "HRTE-AppPool", user: "sf_app", target: "schemaforge_system", maxConns: 10, privileges: "SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER", forbidden: "Access to tenant sf_* databases" },
      { name: "HRTE-ProvisionerPool", user: "sf_provisioner", target: "sf_* (Tenants)", maxConns: 5, privileges: "CREATE, ALTER, DROP, INDEX, INSERT on sf_*", forbidden: "Access to schemaforge_system or platform users" },
      { name: "HRTE-QueryPool", user: "sf_query_ro", target: "sf_* (Tenants)", maxConns: 20, privileges: "SELECT ONLY on sf_*", forbidden: "Any DML/DDL (INSERT, UPDATE, DELETE, DROP)" }
    ]
  }
];

export const INITIAL_EXPERIMENTS = [
  {
    id: "exp-allocator",
    title: "C++ Memory Allocator Toy",
    category: "Systems",
    year: "2024",
    tagline: "A simple bump allocator and free-list to understand how malloc actually works under the hood.",
    stack: ["C++17", "CMake", "GDB"],
    githubUrl: "https://github.com/vatsalost/allocator-toy",
    notes: "Built to learn heap memory fragmentation, chunk headers, and pointer alignment."
  },
  {
    id: "exp-terminal-matrix",
    title: "Terminal Matrix Rain in C",
    category: "CLI",
    year: "2024",
    tagline: "Terminal digital rain using ANSI escape sequences and POSIX termios in pure C.",
    stack: ["C", "POSIX", "Terminal ANSI"],
    githubUrl: "https://github.com/vatsalost/c-matrix-rain",
    notes: "Learned raw terminal mode, non-blocking I/O, and frame timing in pure C."
  },
  {
    id: "exp-audio-fft",
    title: "Audio FFT Spectrum",
    category: "Audio",
    year: "2024",
    tagline: "Web Audio API experiment testing AnalyserNode frequency bins and harmonic peaks.",
    stack: ["JavaScript", "Web Audio API", "Canvas"],
    githubUrl: "https://github.com/vatsalost/audio-fft-sandbox",
    notes: "Quick weekend prototype testing fast Fourier transforms and real-time audio visualization."
  },
  {
    id: "exp-raymarching",
    title: "GLSL Raymarching Sphere",
    category: "Graphics",
    year: "2025",
    tagline: "First attempt at writing an SDF raymarched sphere with soft shadows in a WebGL fragment shader.",
    stack: ["GLSL", "WebGL", "Math"],
    githubUrl: "https://github.com/vatsalost/glsl-sdf-sphere",
    notes: "Learning signed distance functions (SDFs), ray direction calculation, and phong lighting."
  }
];
