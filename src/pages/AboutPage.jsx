import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Terminal, Award, Cpu, ShieldCheck, GraduationCap, Code, GitBranch } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const timelineRef = useRef(null);
  const { playHover } = useAudio();

  const timelineEvents = [
    {
      year: "2025 // 2ND YEAR (CURRENT)",
      role: "ALGORITHM DEVELOPER & HACKATHON LEAD",
      org: "B.Tech Computer Science & Engineering",
      desc: "Deep-diving into advanced Data Structures, Algorithmic Complexity, and Computer Architecture. Architected Chrono-DS (3D GPU algorithm visualizer) and won 1st Place at the National Collegiate AI Hackathon.",
      highlight: "800+ sophomore peers using lab tools & visualizers."
    },
    {
      year: "2024 — 2025",
      role: "LEAD ARCHITECT & OPEN SOURCE CONTRIBUTOR",
      org: "Nexus Campus Initiative & Student Dev Club",
      desc: "Engineered a peer-to-peer campus academic network scaling to 4,200+ students. Built Titan CLI in Rust & C++ for automated local grading and Valgrind memory leak profiling.",
      highlight: "Over 60,000 automated test runs executed."
    },
    {
      year: "2023 — 2024",
      role: "1ST YEAR UNDERGRADUATE (FRESHMAN)",
      org: "Department of Computer Science",
      desc: "Admitted to B.Tech CSE in top 1% cohort. Mastered procedural C, object-oriented C++, pointer arithmetic, Linux shell scripting, and core discrete mathematics.",
      highlight: "Department Academic Merit Scholar & 1st in Freshman Hackathon."
    },
    {
      year: "2022 — 2023",
      role: "FOUNDATIONAL PROGRAMMING & SYSTEMS",
      org: "Pre-College / Self-Directed Exploration",
      desc: "Built early algorithmic web experiments and foundational neural networks. Discovered the passion for combining low-level systems logic with kinetic visual interfaces.",
      highlight: "Qualified for regional competitive math & computing contests."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-card');
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* 1. Header & Intro */}
      <div className="border-b border-[#F5F5F0]/10 pb-16 mb-20">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
          // 2ND YEAR B.TECH COMPUTER SCIENCE & ENGINEERING
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-[#F5F5F0] tracking-tight uppercase leading-[0.9] mb-8">
          VATSAL<br />
          <span className="text-stroke-bone hover:text-[#E10600]">UNDERGRAD PROFILE.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] bg-[#121212] border border-[#F5F5F0]/10 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Portrait"
                className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[#8E8E8E] flex justify-between bg-[#0A0A0A]/80 p-2 backdrop-blur-md">
                <span>YEAR 2 // CSE</span>
                <span>CLASS OF 2027</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 font-sans font-light text-base md:text-xl text-[#8E8E8E] leading-relaxed">
            <p className="text-[#F5F5F0] text-xl md:text-2xl font-normal leading-relaxed">
              I am a 2nd-year Computer Science & Engineering undergraduate bridging academic computer science rigor with high-end creative software engineering.
            </p>
            <p>
              While most sophomore portfolios settle for generic clone tutorials, I immerse myself in low-level systems architectures, pointer management in C++, time-complexity optimization in Data Structures & Algorithms, and GPU shaders with WebGL.
            </p>
            <p>
              Whether leading 36-hour hackathon teams to victory, authoring open-source developer tooling for fellow undergraduates, or obsessing over 120 FPS frame timing, I believe exceptional engineering should feel both mathematically sound and visually unforgettable.
            </p>
            <div className="p-4 bg-[#121212] border-l-2 border-[#E10600] font-mono text-xs text-[#F5F5F0]">
              <span className="text-[#E10600] font-bold block mb-1">CURRENT ACADEMIC FOCUS:</span>
              Data Structures & Algorithms (CS201) • Computer Organization & Architecture • Discrete Math • Operating Systems • Systems Programming (C++ & Rust)
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                REACH OUT FOR INTERNSHIPS
              </MagneticButton>
              <MagneticButton href="https://github.com" target="_blank" rel="noreferrer" variant="outline">
                GITHUB REPOSITORIES <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Undergraduate Principles */}
      <div className="mb-24">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ACADEMIC & ENGINEERING CREED
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          HOW I APPROACH COMPUTER SCIENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "ALGORITHMIC EFFICIENCY FIRST",
              desc: "A beautiful UI on an O(N²) unindexed query is fundamentally broken. I design software starting from data representations, algorithmic invariants, and memory layout before touching the presentation layer."
            },
            {
              title: "NO BLACK-BOX APATHY",
              desc: "I don't just import libraries blindly. I study how memory is allocated, how virtual memory tables work in C++, how JavaScript V8 optimizes inline caches, and how WebGL coordinates map to GPU vertex buffers."
            },
            {
              title: "CINEMATIC VISUAL EXECUTION",
              desc: "High-performance software deserves high-performance aesthetics. By coupling GSAP timelines, Lenis smooth scrolling, and custom GLSL shaders, I deliver experiences that make people stop and stare."
            },
            {
              title: "BUILDING TOOLS FOR PEERS",
              desc: "The best way to master computer science is to build tools other engineers rely on. From campus study networks to CLI autograders, I build software that solves tangible student problems."
            }
          ].map((pillar, i) => (
            <div
              key={i}
              className="p-8 bg-[#121212] border-l-2 border-[#E10600] border-y border-r border-[#F5F5F0]/10 hover:bg-[#161616] transition-colors"
            >
              <h3 className="font-display font-bold text-xl text-[#F5F5F0] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm font-light text-[#8E8E8E] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Animated Timeline */}
      <div ref={timelineRef} className="mb-24 border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ACADEMIC & HACKATHON CHRONOLOGY
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          TRAJECTORY & MILESTONES
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#F5F5F0]/10">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className="timeline-card relative pl-10 md:pl-12 group"
              onMouseEnter={playHover}
            >
              {/* Timeline marker */}
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 -ml-1 rounded-full bg-[#0A0A0A] border-2 border-[#8E8E8E] group-hover:border-[#E10600] group-hover:bg-[#E10600] transition-colors" />

              <div className="p-8 bg-[#121212] border border-[#F5F5F0]/10 group-hover:border-[#E10600]/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="text-[#E10600] font-bold">{evt.year}</span>
                  <span className="text-[#8E8E8E]">{evt.org}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#F5F5F0] mb-3">
                  {evt.role}
                </h3>
                <p className="text-sm font-light text-[#8E8E8E] leading-relaxed mb-4">
                  {evt.desc}
                </p>
                <div className="inline-block px-2.5 py-1 bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-[11px] text-[#F5F5F0]">
                  ✦ {evt.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Equipment & Dev Environment Specs */}
      <div className="border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // DEVELOPER ENVIRONMENT & TOOLING
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          CSE LAB TELEMETRY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// SYSTEMS & OS</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>Dual Boot Ubuntu Linux 24.04 / Windows 11</li>
              <li>Bash & Zsh Command Line Environment</li>
              <li>Valgrind Memory Profiler & GDB</li>
              <li>Git & GitHub Actions CI/CD</li>
            </ul>
          </div>

          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// PROGRAMMING LANGUAGES</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>C++20 (STL, Templates, Concurrency)</li>
              <li>Rust (Memory Safety, Cargo)</li>
              <li>TypeScript / JavaScript (ESNext)</li>
              <li>Python 3 (NumPy, Fast API, PyTorch)</li>
            </ul>
          </div>

          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// GRAPHICS & WEB TECH</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>WebGL 2.0 & GLSL Fragment Shaders</li>
              <li>Three.js & WebGPU</li>
              <li>GSAP 3 ScrollTrigger & Lenis</li>
              <li>React 18 & Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
