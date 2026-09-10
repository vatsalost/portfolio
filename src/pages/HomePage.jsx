import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, ArrowUpRight, Sparkles, Terminal, Cpu, Layers, 
  Github, FileText, FlaskConical, Compass, BookOpen, ChevronRight 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactiveCanvas } from '../components/visuals/ReactiveCanvas';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { MarqueeTicker } from '../components/ui/MarqueeTicker';
import { useProjects } from '../context/ProjectContext';
import { ShinyText } from '../components/bits/ShinyText';
import { Badge } from '../components/untitled/Badge';
import { ReactDevCard } from '../components/bits/ReactDevCard';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { projects } = useProjects();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const philosophyRef = useRef(null);

  // Focus strictly on the 3 strongest flagship builds
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero headline staggered reveal
      const chars = titleRef.current?.querySelectorAll('.reveal-line');
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.1
          }
        );
      }

      // Philosophy cards reveal
      if (philosophyRef.current) {
        gsap.fromTo(
          philosophyRef.current.querySelectorAll('.philosophy-card'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [projects]);

  return (
    <div className="w-full relative overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Generative Topographic Wave Canvas (pauses when offscreen) */}
        <ReactiveCanvas className="opacity-80" />

        {/* Hero Top Identification */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] border-b border-[#F5F5F0]/10 pb-4">
          <div className="flex items-center gap-3">
            <Badge variant="crimson" size="sm">
              VATSAL // CS UNDERGRAD
            </Badge>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <span>B.TECH COMPUTER SCIENCE</span>
            <span className="hidden sm:inline text-[#A3A39B]">C++ · RUST · WEBGL · ALGORITHMS</span>
          </div>
        </div>

        {/* Hero Central Headline: Clear, Confident, Technical */}
        <div ref={titleRef} className="relative z-10 my-auto py-8 md:py-12 max-w-5xl">
          <div className="mb-4">
            <div className="reveal-line inline-flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#F5F5F0]/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              <ShinyText
                text="SYSTEMS & GRAPHICS ARCHITECT"
                speed={3.5}
                className="font-mono text-xs font-bold tracking-wider uppercase"
                baseColor="#8E8E8E"
                shimmerColor="#F5F5F0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#F5F5F0] uppercase leading-[0.95]">
              SYSTEMS, GRAPHICS
            </h1>
            <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-stroke-bone hover:text-[#E10600] uppercase leading-[0.95] transition-colors">
              & ALGORITHMS<span className="text-[#E10600]">.</span>
            </h1>
          </div>

          {/* Short, Confident Persona Description */}
          <div className="mt-6 max-w-2xl">
            <p className="text-base sm:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
              Computer Science student building low-level systems in C++ & Rust, interactive GPU shaders in WebGL, and algorithmic developer tooling. Exploring mechanical sympathy, memory efficiency, and real-time kinetic interaction.
            </p>
          </div>

          {/* Clear, Obvious CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#featured-work" variant="primary">
              VIEW WORK <ArrowDown className="w-4 h-4" />
            </MagneticButton>
            <a
              href="https://github.com/vatsalost"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] text-[#F5F5F0] border border-[#F5F5F0]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-[#8E8E8E] border border-[#F5F5F0]/10 font-mono text-xs tracking-wider uppercase hover:text-[#F5F5F0] hover:border-[#F5F5F0]/25 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>RÉSUMÉ</span>
            </a>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pt-4 border-t border-[#F5F5F0]/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
            <span>SCROLL TO EXPLORE WORK</span>
          </div>
          <div className="text-[11px]">
            <span>2ND YEAR UNDERGRAD // CS201 & CS202</span>
          </div>
        </div>
      </section>

      {/* 2. NOW // CURRENTLY BUILDING SECTION */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-6 md:p-8 bg-[#0D0D0D] border border-[#F5F5F0]/10 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-[#F5F5F0]/10 pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 text-[#E10600] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E10600]" />
              <span>NOW // BUILDING</span>
            </div>
            <p className="text-sm font-sans font-normal text-[#F5F5F0]">
              Procedural GLSL raymarcher & custom C++ memory pool allocator.
            </p>
            <span className="text-[11px] text-[#8E8E8E]">Focusing on zero-copy memory buffers and SIMD vector math.</span>
          </div>

          <div className="space-y-2 border-b md:border-b-0 md:border-r border-[#F5F5F0]/10 pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 text-[#F5F5F0] font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#E10600]" />
              <span>NOW // LEARNING</span>
            </div>
            <p className="text-sm font-sans font-normal text-[#F5F5F0]">
              Computer Architecture (CS202) & OS kernel paging.
            </p>
            <span className="text-[11px] text-[#8E8E8E]">Virtual memory tables, cache coherence, and WebGPU compute.</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#F5F5F0] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#E10600]" />
              <span>NOW // EXPLORING</span>
            </div>
            <p className="text-sm font-sans font-normal text-[#F5F5F0]">
              Data-Oriented Design (DOD) & cache locality.
            </p>
            <span className="text-[11px] text-[#8E8E8E]">Structuring data structures for L1/L2 cache hit rates.</span>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PHILOSOPHY (< 20 SECONDS READ) */}
      <section ref={philosophyRef} className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // ENGINEERING MINDSET
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] tracking-tight uppercase">
            HOW I APPROACH SOFTWARE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Understand the Abstraction",
              desc: "Don't treat compilers, memory allocators, or GPU drivers as black boxes. Inspect assembly and cache behavior."
            },
            {
              num: "02",
              title: "Measure Before Optimizing",
              desc: "Profile memory lines and CPU bottlenecks with evidence before refactoring. Asymptotic complexity matters."
            },
            {
              num: "03",
              title: "Build Tools Worth Understanding",
              desc: "Solve genuine engineering friction. Build software that deepens systems comprehension rather than making clones."
            },
            {
              num: "04",
              title: "Simplicity Over Ceremony",
              desc: "Keep architectures minimal, readable, and mathematically sound. High performance and clean aesthetics coexist."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="philosophy-card p-6 bg-[#0E0E0E] border border-[#F5F5F0]/10 rounded-lg hover:border-[#E10600]/40 transition-colors space-y-3"
            >
              <span className="font-mono text-xs text-[#E10600] font-bold">
                [ {item.num} ]
              </span>
              <h3 className="font-display font-bold text-lg text-[#F5F5F0]">
                {item.title}
              </h3>
              <p className="text-xs font-sans font-light text-[#8E8E8E] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RUNNING SKILLS TICKER */}
      <div className="py-4 border-y border-[#F5F5F0]/10 bg-[#0A0A0A]">
        <MarqueeTicker
          items={[
            "C++20 & RUST SYSTEMS",
            "DATA STRUCTURES & ALGORITHMS",
            "WEBGL & GLSL SHADERS",
            "LINUX POSIX & SHELL",
            "THREE.JS 3D SCENES",
            "REACT 18 & WEBSOCKETS",
            "COMPUTER ARCHITECTURE"
          ]}
          speed="32s"
          highlightRed={true}
        />
      </div>

      {/* 5. FEATURED WORK SHOWCASE (PRIMARY FOCUS) */}
      <section id="featured-work" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#F5F5F0]/10 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
              // FLAGSHIP BUILDS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F5F0] tracking-tight uppercase">
              FEATURED PROJECTS
            </h2>
            <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
              Systems tools, 3D algorithm visualizers, and low-latency interaction engines built with C++, Rust, and WebGL.
            </p>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8E8E8E] hover:text-[#E10600] transition-colors"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Flagship Project Cards with Full Visual & Technical Detail */}
        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              layout="featured"
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton href="/work" variant="outline">
            EXPLORE COMPLETE REPOSITORY ARCHIVE ({projects.length})
          </MagneticButton>
        </div>
      </section>

      {/* 6. ACADEMIC & INDUSTRY TOOLKIT (REACT.DEV STYLE CODE CARDS) */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="mb-14">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // CSE COMPETENCY MATRIX
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight uppercase">
            TECHNICAL TOOLKIT
          </h2>
          <p className="mt-3 font-mono text-xs text-[#8E8E8E] max-w-2xl">
            Direct implementation patterns from university coursework (CS201/CS202), GPU shaders, and systems programming.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ReactDevCard
            num="01"
            icon={Cpu}
            filename="dijkstra_graph.cpp"
            runtimeBadge="O(E + V log V) • CS201"
            language="cpp"
            title="DATA STRUCTURES & ALGORITHMS"
            description="Asymptotic bounds, self-balancing search trees (AVL, Red-Black), dynamic programming state spaces, and cache-aligned memory representations with C++20 STL."
            code={`template <typename T>
class PriorityGraph {
  void dijkstra(int src, vector<int>& dist) {
    priority_queue<Edge, vector<Edge>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
  }
};`}
            tags={["C++20 STL", "Graph Theory", "DP State Spaces", "LeetCode"]}
          />

          <ReactDevCard
            num="02"
            icon={Sparkles}
            filename="kinetic_shader.glsl"
            runtimeBadge="60 FPS • WebGL 2.0"
            language="glsl"
            title="GPU GRAPHICS & WEBGL"
            description="Interactive fragment raymarching, GPU vertex displacement shaders, Three.js instanced rendering, and spatial canvas simulations with GLSL."
            code={`uniform float u_time;
varying vec2 v_uv;
void main() {
  vec2 p = v_uv * 2.0 - 1.0;
  float wave = sin(length(p) * 12.0 - u_time * 3.0);
  gl_FragColor = vec4(vec3(0.88, 0.02, 0.0) * wave, 1.0);
}`}
            tags={["Three.js", "GLSL Shaders", "WebGPU", "Canvas 2D"]}
          />

          <ReactDevCard
            num="03"
            icon={Layers}
            filename="titan_engine.rs"
            runtimeBadge="Zero-Copy IPC • Linux"
            language="rust"
            title="SYSTEMS & TOOLING"
            description="High-throughput asynchronous test runners, Linux POSIX memory mapping, automated Valgrind leak profiling, Docker, and responsive React 18 frontends."
            code={`pub async fn dispatch_stream(mut socket: TcpStream) -> Result<()> {
  let mut buffer = BytesMut::with_capacity(4096);
  while socket.read_buf(&mut buffer).await? > 0 {
    tokio::spawn(process_frame(buffer.split()));
  }
  Ok(())
}`}
            tags={["Rust", "C++ Systems", "Linux POSIX", "Valgrind", "Docker"]}
          />

          <ReactDevCard
            num="04"
            icon={Terminal}
            filename="synthetix_agent.py"
            runtimeBadge="WebGPU Stream • Latency Focused"
            language="python"
            title="AI & REAL-TIME INTERACTION"
            description="Prototyping multimodal vision-audio pipelines, local tensor inference via WebGPU, and low-overhead binary WebSocket streaming."
            code={`@router.websocket("/stream/agent")
async def neural_loop(ws: WebSocket):
  async for frame in ws.iter_bytes():
    latent = vision_encoder.forward(frame)
    action = policy_head.sample(latent, temp=0.2)
    await ws.send_json({"intent": action.id})`}
            tags={["WebGPU", "FastAPI", "WebSockets", "PyTorch", "Python"]}
          />
        </div>
      </section>

      {/* 7. ENGINEERING LAB / EXPERIMENTS AREA */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-1">
              // ENGINEERING NOTEBOOK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F5F5F0] tracking-tight uppercase flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-[#E10600]" />
              <span>THE LAB</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8E8E8E]">
            Micro-experiments, shader prototypes, and low-level prototypes.
          </p>
        </div>

        <div className="divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10 font-mono text-xs">
          {[
            {
              num: "01",
              name: "GLSL Fragment Raymarcher",
              tech: "GLSL · WebGL",
              desc: "Procedural sphere distance estimation and surface normal calculation directly on the GPU.",
              status: "PROTOTYPE"
            },
            {
              num: "02",
              name: "POSIX Shared Memory Ring Buffer",
              tech: "C++20 · Linux",
              desc: "Lock-free circular buffer streaming telemetry between decoupled background daemon threads.",
              status: "SYSTEMS"
            },
            {
              num: "03",
              name: "Web Audio Spectral FFT Analyzer",
              tech: "Web Audio API",
              desc: "Real-time 1024-bin Fourier transform feeding frequency uniforms into vertex shaders.",
              status: "AUDIO"
            },
            {
              num: "04",
              name: "AVL & Red-Black Tree Visualizer",
              tech: "C++ · WebGL",
              desc: "Interactive step-by-step tree rebalancing with left and right rotation animations.",
              status: "ALGORITHM"
            }
          ].map((exp, idx) => (
            <div
              key={idx}
              className="py-4 px-2 hover:bg-[#121212] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
                  [ {exp.num} ]
                </span>
                <span className="font-display font-bold text-sm text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                  {exp.name}
                </span>
                <span className="text-[11px] text-[#A3A39B] hidden md:inline">
                  {exp.desc}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] self-end sm:self-auto">
                <span className="text-[#8E8E8E] bg-[#141414] px-2 py-0.5 border border-[#F5F5F0]/5">
                  {exp.tech}
                </span>
                <span className="text-[#E10600] border border-[#E10600]/30 px-2 py-0.5">
                  {exp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
