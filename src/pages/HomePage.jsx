import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Cpu, Layers, Flame, Trophy, Users, CheckCircle2, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactiveCanvas } from '../components/visuals/ReactiveCanvas';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { MarqueeTicker } from '../components/ui/MarqueeTicker';
import { useProjects } from '../context/ProjectContext';
import { SpotlightCard } from '../components/bits/SpotlightCard';
import { ShinyText } from '../components/bits/ShinyText';
import { DecryptedText } from '../components/bits/DecryptedText';
import { StatCard } from '../components/untitled/StatCard';
import { Badge } from '../components/untitled/Badge';
import { ReactDevCard } from '../components/bits/ReactDevCard';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { projects } = useProjects();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const manifestoRef = useRef(null);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline staggered reveal
      const chars = titleRef.current?.querySelectorAll('.reveal-line');
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.15
          }
        );
      }

      // Manifesto text scroll animation
      if (manifestoRef.current) {
        gsap.fromTo(
          manifestoRef.current.querySelectorAll('.manifesto-text'),
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: 1,
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
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Generative Topographic Wave Canvas */}
        <ReactiveCanvas className="opacity-90" />

        {/* Hero Top Metadata */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] border-b border-[#F5F5F0]/10 pb-5">
          <div className="flex items-center gap-3">
            <Badge variant="crimson" size="sm">
              VATSAL // CSE UNDERGRAD // 2ND YEAR
            </Badge>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <span>B.TECH COMPUTER SCIENCE</span>
            <span className="hidden sm:inline">DSA • SYSTEMS • WEBGL</span>
            <span className="text-[#E10600]">STATUS // READY FOR SDE INTERNSHIPS</span>
          </div>
        </div>

        {/* Hero Central Headline */}
        <div ref={titleRef} className="relative z-10 my-auto py-8 md:py-12">
          <div className="overflow-hidden mb-3">
            <div className="reveal-line flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              <ShinyText
                text="// 2ND YEAR COMPUTER SCIENCE & ENGINEERING • SOFTWARE ARCHITECT"
                speed={3.5}
                className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase"
                baseColor="#8E8E8E"
                shimmerColor="#E10600"
              />
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <div className="overflow-hidden py-1">
              <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5F0] uppercase leading-none">
                ALGORITHMIC
              </h1>
            </div>
            <div className="overflow-hidden py-1">
              <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stroke-bone hover:text-[#E10600] uppercase leading-none">
                SYSTEMS & MOTION
              </h1>
            </div>
            <div className="overflow-hidden py-1">
              <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5F0] uppercase leading-none">
                FRONTIER<span className="text-[#E10600]">.</span>
              </h1>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-sm md:text-base font-light text-[#8E8E8E] font-sans leading-relaxed">
              2nd-year Computer Science undergrad fusing algorithmic rigor, low-level systems programming (C++, Rust), and avant-garde GPU shaders. Building collegiate hackathon winners and high-velocity tools.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#featured-work" variant="primary" cursorText="EXPLORE">
              VIEW STUDENT BUILDS <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline" cursorText="HIRE">
              DISCUSS INTERNSHIP / HACKATHON
            </MagneticButton>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pt-5 border-t border-[#F5F5F0]/10">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-4 h-4 text-[#E10600] animate-bounce" />
            <span>SCROLL TO DESCEND</span>
          </div>
          <div>
            <span>[ 01 // 06 CHAPTERS ]</span>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO & PHILOSOPHY SECTION */}
      <section ref={manifestoRef} className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
              // UNDERGRAD MANIFESTO
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5F5F0] tracking-tight leading-tight">
              <DecryptedText
                text="WHY ORDINARY CS PORTFOLIOS ARE BROKEN."
                speed={30}
                animateOn="hover"
              />
            </h2>
            <div className="w-12 h-0.5 bg-[#E10600]" />
          </div>

          <div className="lg:col-span-8 space-y-6 md:space-y-8 font-sans font-light text-base sm:text-lg md:text-2xl text-[#F5F5F0] leading-relaxed">
            <p className="manifesto-text">
              Most sophomore portfolios look identical: a cookie-cutter template showing a basic to-do app and a generic calculator built from a weekend tutorial.
            </p>
            <p className="manifesto-text text-[#8E8E8E]">
              As a 2nd-year CSE undergrad, I believe computer science is an art form of extreme precision. Understanding asymptotic bounds (Big-O), memory layout cache lines, and multi-threaded synchronization should elevate software — not restrict it to boring interfaces.
            </p>
            <p className="manifesto-text font-normal text-[#F5F5F0]">
              By combining rigorous academic fundamentals with <span className="text-[#E10600] underline underline-offset-8">creative engineering and GPU shaders</span>, I build production tools and hackathon winners that look and feel like state-of-the-art studio software.
            </p>
          </div>
        </div>
      </section>

      {/* 3. RUNNING SKILLS TICKER */}
      <div className="py-6 border-y border-[#F5F5F0]/10 bg-[#0A0A0A]">
        <MarqueeTicker
          items={[
            "DATA STRUCTURES & ALGORITHMS",
            "C++ & RUST SYSTEMS",
            "WEBGL & SHADERS",
            "GSAP 3 MOTION",
            "SYSTEM DESIGN",
            "MULTIMODAL AI",
            "REACT 18 & NODE.JS",
            "LINUX & SHELL SCRIPTING"
          ]}
          speed="32s"
          highlightRed={true}
        />
      </div>

      {/* 4. FEATURED WORK SHOWCASE */}
      <section id="featured-work" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#F5F5F0]/10 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
              // FLAGSHIP SOPHOMORE BUILDS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#F5F5F0] tracking-tight uppercase">
              FEATURED PROJECTS
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8E8E8E] hover:text-[#E10600] transition-colors"
          >
            <span>VIEW COMPLETE ARCHIVE ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid with TiltedCard and DecryptedText */}
        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              layout="full-bleed"
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton href="/work" variant="outline" cursorText="ARCHIVE">
            EXPLORE ALL PROJECTS & CASE STUDIES ({projects.length})
          </MagneticButton>
        </div>
      </section>

      {/* 5. CAPABILITIES & SYSTEM ARCHITECTURE (REACT.DEV STYLE CODE CARDS) */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="mb-16">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // CSE COMPETENCY MATRIX
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight uppercase">
            ACADEMIC & INDUSTRY TOOLKIT
          </h2>
          <p className="mt-3 font-mono text-xs text-[#8E8E8E] max-w-2xl">
            Direct telemetry from university coursework (CS201), GPU shader experiments, low-level systems architectures, and competitive collegiate hackathon builds.
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
            tags={["C++20 STL", "Graph Theory", "DP State Spaces", "LeetCode 1850+"]}
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
            title="SYSTEMS & FULL-STACK"
            description="High-throughput asynchronous servers, Linux POSIX memory mapping, automated Valgrind leak profiling, Docker, and responsive React 18 frontends."
            code={`pub async fn dispatch_stream(mut socket: TcpStream) -> Result<()> {
  let mut buffer = BytesMut::with_capacity(4096);
  while socket.read_buf(&mut buffer).await? > 0 {
    tokio::spawn(process_frame(buffer.split()));
  }
  Ok(())
}`}
            tags={["Rust", "C++ Systems", "Linux POSIX", "Docker", "React 18"]}
          />

          <ReactDevCard
            num="04"
            icon={Terminal}
            filename="synthetix_agent.py"
            runtimeBadge="< 12ms Latency • 1st Place"
            language="python"
            title="HACKATHONS & RAPID AI"
            description="Collegiate hackathon sprint prototyping, multimodal vision-audio pipelines, local tensor inference, and zero-latency WebSocket streaming."
            code={`@router.websocket("/stream/agent")
async def neural_loop(ws: WebSocket):
  async for frame in ws.iter_bytes():
    latent = vision_encoder.forward(frame)
    action = policy_head.sample(latent, temp=0.2)
    await ws.send_json({"intent": action.id})`}
            tags={["AI Agents", "FastAPI", "WebSockets", "PyTorch", "Grand Prize Winner"]}
          />
        </div>
      </section>

      {/* 6. METRICS & IMPACT COUNTER (WITH UNTITLED UI STATCARDS) */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Hackathons Conquered"
            value="8"
            suffix="+"
            change="+3 Wins"
            period="this academic year"
            icon={Trophy}
          />
          <StatCard
            label="Campus Peers Reached"
            value="4,200"
            suffix="+"
            change="+240%"
            period="collegiate growth"
            icon={Users}
          />
          <StatCard
            label="Lab Test Runs Executed"
            value="60"
            suffix="k+"
            change="< 4ms"
            period="avg execution latency"
            icon={Terminal}
          />
          <StatCard
            label="Current B.Tech Year"
            value="2"
            suffix="nd YR"
            change="Top 1%"
            period="CSE departmental cohort"
            icon={Award}
          />
        </div>
      </section>
    </div>
  );
}
