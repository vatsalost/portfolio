import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Terminal, Cpu, GraduationCap, Code2, GitBranch, Binary, Layers, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';
import { SpotlightCard } from '../components/bits/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const timelineRef = useRef(null);
  const { playHover } = useAudio();

  const timelineEvents = [
    {
      period: "2024 — PRESENT // 2ND YEAR",
      title: "B.TECH COMPUTER SCIENCE & ENGINEERING",
      institution: "Undergraduate Program",
      desc: "Immersed in intermediate computer science curriculum: Data Structures & Algorithms, Computer Organization, and Discrete Mathematics. Designing systems-focused projects (CHRONO-DS, TITAN CLI) and experimenting with WebGL/WebGPU graphics shaders.",
      focus: "DSA, Computer Architecture, C++20, WebGL"
    },
    {
      period: "2024 — 2025 // PROJECTS & EXPLORATION",
      title: "SYSTEMS TOOLING & ALGORITHM VISUALIZATION",
      institution: "Independent Research & Projects",
      desc: "Built TITAN CLI in Rust & C++ to automate test execution and Valgrind memory leak checks for assignment grading. Engineered CHRONO-DS, a 3D GPU-accelerated algorithm state visualizer using Three.js and C++ compiled to WebAssembly.",
      focus: "Rust CLI, C++ WASM, Linux POSIX, Valgrind"
    },
    {
      period: "2023 — 2024 // 1ST YEAR",
      title: "FOUNDATIONAL ENGINEERING CURRICULUM",
      institution: "Department of Computer Science",
      desc: "Mastered core procedural programming in C, object-oriented principles in C++, pointer arithmetic, memory management, and Unix command-line fundamentals.",
      focus: "C/C++, Pointer Arithmetic, Shell Scripting, Calculus"
    },
    {
      period: "2022 — 2023 // PRE-COLLEGE",
      title: "EARLY PROGRAMMING & CREATIVE CODING",
      institution: "Self-Directed Study",
      desc: "First discovered the intersection between mathematical logic and creative graphics. Built web experiments, studied Python, and explored interactive browser animations.",
      focus: "JavaScript, Python, Creative Canvas Experiments"
    }
  ];

  const coursework = [
    {
      code: "CS201",
      title: "Data Structures & Algorithms",
      topics: "Self-balancing Trees (AVL, Red-Black), Min/Max Heaps, Graph Traversals (Dijkstra, A*, BFS/DFS), Asymptotic Analysis, Dynamic Programming."
    },
    {
      code: "CS202",
      title: "Computer Organization & Architecture",
      topics: "Instruction Set Architecture (RISC/CISC), CPU Datapath & Pipelining, Cache Hierarchies (L1/L2/L3), Memory Locality, Branch Prediction."
    },
    {
      code: "CS102",
      title: "Object-Oriented Programming (C++)",
      topics: "RAII, Rule of 5, Smart Pointers (unique_ptr, shared_ptr), Virtual Dispatch, Template Metaprogramming, Standard Template Library."
    },
    {
      code: "MATH201",
      title: "Discrete Mathematics",
      topics: "Graph Theory, Combinatorics, Propositional & First-Order Logic, Proof Techniques (Induction, Contradiction), Recurrence Relations."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-card');
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.7,
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
          {/* Terminal Identity Card (Replaces Unsplash model photo) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              spotlightColor="rgba(225, 6, 0, 0.2)"
              className="p-6 bg-[#121212] border border-[#F5F5F0]/10 font-mono text-xs"
            >
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/20" />
                </div>
                <span className="text-[10px] text-[#8E8E8E] tracking-widest">vatsal@cse-node: ~</span>
              </div>

              {/* Terminal Monogram & Info */}
              <div className="space-y-4">
                <div className="p-4 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#161616] border border-[#E10600]/40 flex items-center justify-center font-display font-black text-3xl text-[#F5F5F0] shrink-0">
                    V<span className="text-[#E10600]">.</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#F5F5F0]">Vatsal Chaudhary</div>
                    <div className="text-[11px] text-[#8E8E8E]">B.Tech CSE // Class of 2027</div>
                    <div className="text-[10px] text-[#E10600] mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
                      Status: Active Student & Builder
                    </div>
                  </div>
                </div>

                {/* Shell Details */}
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">whoami</span>
                  </div>
                  <p className="text-[#F5F5F0] pl-3 border-l border-[#F5F5F0]/10">
                    Sophomore computer science student passionate about systems programming, data structures, and creative GPU graphics.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">cat interests.json</span>
                  </div>
                  <div className="pl-3 border-l border-[#F5F5F0]/10 text-[#8E8E8E] space-y-0.5">
                    <div>• Low-Level Systems & Tooling (C++, Rust)</div>
                    <div>• Algorithmic Optimization (C++ WASM)</div>
                    <div>• Kinetic Graphics (WebGL, GLSL, Three.js)</div>
                    <div>• Unix Environment & Build Automation</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">echo $CURRENT_FOCUS</span>
                  </div>
                  <div className="pl-3 border-l border-[#E10600] text-[#F5F5F0]">
                    "Writing clear algorithms, understanding the hardware under the code, and shipping software that feels alive."
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F5F5F0]/10 flex justify-between text-[10px] text-[#8E8E8E]">
                  <span>ENV: Linux / x86_64</span>
                  <span>TIME: UTC+05:30</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Narrative Overview */}
          <div className="lg:col-span-7 space-y-6 font-sans font-light text-base md:text-lg text-[#8E8E8E] leading-relaxed">
            <p className="text-[#F5F5F0] text-xl md:text-2xl font-normal leading-relaxed">
              I am a 2nd-year Computer Science & Engineering undergraduate focusing on low-level systems, algorithmic problem solving, and interactive graphics.
            </p>
            <p>
              I spend most of my time either in the terminal writing C++ and Rust, studying data structure invariants for coursework, or experimenting with WebGL shaders to make complex algorithms intuitive to inspect visually.
            </p>
            <p>
              Rather than building cookie-cutter clone apps, I enjoy understanding how things work beneath layers of abstraction: how pointers map to memory pages, how cache misses penalize pointer-heavy trees, and how graphics pipelines transform vertex arrays on the GPU.
            </p>

            <div className="p-4 bg-[#121212] border-l-2 border-[#E10600] font-mono text-xs text-[#F5F5F0]">
              <span className="text-[#E10600] font-bold block mb-1">CURRENT ACADEMIC TERM:</span>
              Algorithms (CS201) • Computer Architecture (CS202) • Discrete Math • Systems in C++ & Rust
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                GET IN TOUCH
              </MagneticButton>
              <MagneticButton href="https://github.com/vatsalost" target="_blank" rel="noreferrer" variant="outline">
                GITHUB PROFILE <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Engineering Principles */}
      <div className="mb-24">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ENGINEERING PRINCIPLES
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          HOW I APPROACH PROBLEMS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "ALGORITHMIC INVARIANTS & TIME COMPLEXITY",
              desc: "Before writing implementation code, I analyze worst-case time and space complexity. A fast algorithm with clean data representation will always outperform micro-optimized unindexed code."
            },
            {
              title: "UNDERSTAND THE HARDWARE UNDER THE CODE",
              desc: "I care about how software actually executes on physical silicon — cache line alignment, branch prediction, virtual memory pages, and avoiding unnecessary allocations in performance-critical loops."
            },
            {
              title: "BUILD TOOLS TO SOLVE REAL PAIN POINTS",
              desc: "The most satisfying software to write is tooling that saves time. Building test harnesses, memory leak parsers, and visual debuggers deepens my understanding of the systems I use every day."
            },
            {
              title: "KINETIC & INTENTIONAL PRESENTATION",
              desc: "Complex data structures shouldn't have to be opaque. Coupling mathematically rigorous algorithms with responsive, frame-timed graphics makes systems easier to verify, understand, and appreciate."
            }
          ].map((pillar, i) => (
            <div
              key={i}
              className="p-8 bg-[#121212] border-l-2 border-[#E10600] border-y border-r border-[#F5F5F0]/10 hover:bg-[#161616] transition-colors"
            >
              <h3 className="font-display font-bold text-lg text-[#F5F5F0] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm font-light text-[#8E8E8E] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Academic Coursework & Foundations */}
      <div className="mb-24 border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ACADEMIC FOUNDATIONS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          CORE COURSEWORK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coursework.map((course, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#E10600] font-bold text-sm">{course.code}</span>
                <span className="text-[#8E8E8E] text-[11px]">B.TECH CSE</span>
              </div>
              <h3 className="font-display font-bold text-base text-[#F5F5F0]">
                {course.title}
              </h3>
              <p className="text-[#8E8E8E] leading-relaxed font-sans font-light text-xs">
                {course.topics}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Grounded Chronology & Milestones */}
      <div ref={timelineRef} className="mb-24 border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // CHRONOLOGY & PROGRESSION
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          ACADEMIC & PROJECT TIMELINE
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#F5F5F0]/10">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className="timeline-card relative pl-10 md:pl-12 group"
              onMouseEnter={playHover}
            >
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 -ml-1 rounded-full bg-[#0A0A0A] border-2 border-[#8E8E8E] group-hover:border-[#E10600] group-hover:bg-[#E10600] transition-colors" />

              <div className="p-8 bg-[#121212] border border-[#F5F5F0]/10 group-hover:border-[#E10600]/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="text-[#E10600] font-bold">{evt.period}</span>
                  <span className="text-[#8E8E8E]">{evt.institution}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#F5F5F0] mb-3">
                  {evt.title}
                </h3>
                <p className="text-sm font-light text-[#8E8E8E] leading-relaxed mb-4">
                  {evt.desc}
                </p>
                <div className="inline-block px-2.5 py-1 bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-[11px] text-[#F5F5F0]">
                  FOCUS: {evt.focus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Tooling & Technical Environment */}
      <div className="border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // TOOLING & ENVIRONMENT
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-12">
          TECHNICAL STACK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// SYSTEMS & ENV</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>Linux (Ubuntu / WSL2) & Windows</li>
              <li>Bash shell & Makefiles</li>
              <li>GDB debugger & Valgrind profiling</li>
              <li>Git & GitHub version control</li>
            </ul>
          </div>

          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// LANGUAGES</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>C++20 (STL, Templates, Memory)</li>
              <li>Rust (Ownership, Cargo ecosystem)</li>
              <li>JavaScript / TypeScript (ESNext)</li>
              <li>Python 3 (Scripting, Algorithms)</li>
            </ul>
          </div>

          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-3">
            <span className="text-[#E10600] block font-bold">// GRAPHICS & WEB</span>
            <ul className="space-y-1.5 text-[#8E8E8E]">
              <li>WebGL & GLSL Fragment Shaders</li>
              <li>Three.js & WebGPU basics</li>
              <li>React 18 & Vite</li>
              <li>GSAP ScrollTrigger & Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
