import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, ArrowUpRight, Cpu, Layers, Github, Mail, 
  Terminal, Code2, BookOpen, Compass, Zap, Sparkles, ExternalLink
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactiveCanvas } from '../components/visuals/ReactiveCanvas';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { BorderGlow } from '../components/bits/BorderGlow';
import { VariableProximity } from '../components/bits/VariableProximity';
import { ScrollReveal } from '../components/bits/ScrollReveal';
import { Magnet } from '../components/bits/Magnet';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { projects, experiments = [] } = useProjects();
  const { playClick, playHover } = useAudio();
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  // Focus on the 3 strongest projects for the main view
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const dominantProject = featuredProjects[0] || projects[0];
  const secondaryProjects = featuredProjects.slice(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero subtle reveal
      const lines = titleRef.current?.querySelectorAll('.hero-reveal');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power3.out',
            delay: 0.05
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative overflow-x-hidden bg-[#0A0A0A] text-[#F2F0EA]">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-10 md:pb-14 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Subtle, Non-Distracting Background Wave Canvas */}
        <ReactiveCanvas className="opacity-25 pointer-events-none" />

        {/* Top Identification Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] border-b border-[#F2F0EA]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-[#F2F0EA] font-bold tracking-wider">VATSAL CHAUDHARY</span>
            <span className="text-[#8E8E8E] hidden sm:inline">• B.TECH COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="text-[#8E8E8E]">SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE</span>
            <span className="text-[#555555]">·</span>
            <span className="text-[#E10600] font-bold">2026</span>
          </div>
        </div>

        {/* Hero Central Content */}
        <div ref={titleRef} className="relative z-10 my-auto py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Natural Identity & Introduction */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <h1 className="hero-reveal font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] tracking-tight text-[#F2F0EA] leading-[0.92] uppercase">
                <VariableProximity
                  label="VATSAL CHAUDHARY"
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] tracking-tight text-[#F2F0EA] leading-[0.92] uppercase"
                  radius={160}
                  maxLift={7}
                  maxScale={1.1}
                  dotColor="#E10600"
                />
              </h1>
              <p className="hero-reveal font-display font-semibold text-xl sm:text-2xl md:text-3xl text-[#F2F0EA] tracking-tight pt-1">
                Computer Science student who likes building things and figuring out how they work.
              </p>
            </div>

            {/* Grounded Bio Context */}
            <p className="hero-reveal font-sans text-sm sm:text-base text-[#8E8E8E] max-w-xl leading-relaxed">
              Currently pursuing B.Tech Computer Science & Engineering at <strong className="text-[#F2F0EA] font-semibold">Symbiosis Institute of Technology, Pune</strong>. I enjoy writing code, building software projects, and learning by experimenting.
            </p>

            {/* Core Stack */}
            <div className="hero-reveal flex flex-wrap items-center gap-2 font-mono text-xs pt-1">
              <span className="text-[#E10600] font-bold mr-1">// STACK:</span>
              {['C', 'C++', 'Java', 'HTML', 'CSS'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] font-semibold tracking-wide rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Availability Badge */}
            <div className="hero-reveal flex items-center gap-2.5 font-mono text-xs text-[#E10600] pt-1">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="tracking-wide font-bold uppercase">
                OPEN TO HACKATHONS + COLLABORATIONS
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="hero-reveal pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
              <Magnet strength={0.35} reach={40}>
                <MagneticButton href="#things-built" variant="primary">
                  THINGS I'VE BUILT <ArrowDown className="w-3.5 h-3.5" />
                </MagneticButton>
              </Magnet>
              <Magnet strength={0.35} reach={40}>
                <a
                  href="https://github.com/vatsalost"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] text-[#F2F0EA] border border-[#F2F0EA]/15 uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors rounded-sm tracking-wider"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB ↗</span>
                </a>
              </Magnet>
              <Magnet strength={0.35} reach={40}>
                <Link
                  to="/contact"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] text-[#8E8E8E] hover:text-[#F2F0EA] border border-[#F2F0EA]/10 hover:border-[#F2F0EA]/30 uppercase font-bold transition-colors rounded-sm tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>CONTACT ↗</span>
                </Link>
              </Magnet>
            </div>
          </div>

          {/* Right Column: Clean, Honest Student Overview */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between pl-8 border-l border-[#F2F0EA]/10 font-mono text-xs text-[#8E8E8E] space-y-8 my-auto select-none">
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#E10600] uppercase tracking-widest block font-bold">
                // LOCATION
              </span>
              <span className="text-[#F2F0EA] font-semibold tracking-wider block text-sm">
                PUNE, MAHARASHTRA, INDIA
              </span>
              <span className="text-[11px] text-[#8E8E8E] block">
                Open to in-person & remote projects
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-[#E10600] uppercase tracking-widest block font-bold">
                // EDUCATION
              </span>
              <span className="text-[#F2F0EA] font-semibold block text-sm">
                SYMBIOSIS INST. OF TECHNOLOGY
              </span>
              <span className="text-[11px] text-[#8E8E8E] block">
                B.Tech Computer Science & Engineering
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-[#E10600] uppercase tracking-widest block font-bold">
                // CURRENT FOCUS
              </span>
              <span className="text-[#F2F0EA] font-semibold block text-sm">
                BUILDING & HACKATHONS
              </span>
              <span className="text-[11px] text-[#8E8E8E] block">
                C++ · Java · Web Experiments
              </span>
            </div>

            <div className="pt-2">
              <div className="p-3 bg-[#111111] border border-[#F2F0EA]/10 rounded-sm space-y-1">
                <span className="text-[10px] text-[#E10600] font-bold uppercase block">
                  FEATURED PROJECT
                </span>
                <span className="text-xs text-[#F2F0EA] font-semibold block truncate">
                  IN PROGRESS
                </span>
                <span className="text-[10px] text-[#8E8E8E] block truncate">
                  Documentation & builds underway
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pt-4 border-t border-[#F2F0EA]/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
            <span>SCROLL TO EXPLORE</span>
          </div>
          <span className="text-[11px] text-[#555555] tracking-widest uppercase">PUNE, INDIA</span>
        </div>
      </section>

      {/* 2. PERSONAL STATEMENT SECTION */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <ScrollReveal threshold={0.05}>
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block">
              // ABOUT MY APPROACH
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] tracking-tight leading-[1.08] uppercase">
              I LIKE BUILDING THINGS<br />
              I WANT TO UNDERSTAND<span className="text-[#E10600]">.</span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl font-sans font-light text-[#A3A39B] leading-relaxed max-w-3xl pt-2">
              I’m a Computer Science student at Symbiosis Institute of Technology in Pune. I learn best by writing code, breaking things, and turning ideas into working prototypes. I especially enjoy hackathons because they force me to stop overthinking and build with other people under real constraints.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. THINGS I'VE BUILT (FEATURED PROJECTS) */}
      <section id="things-built" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#F2F0EA]/10 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
              // SELECTED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#F2F0EA] tracking-tight uppercase">
              THINGS I'VE BUILT<span className="text-[#E10600]">.</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#8E8E8E] font-sans font-light max-w-xl">
              Project case studies and write-ups currently in progress. Updates coming soon.
            </p>
          </div>
          <Link
            to="/work"
            onClick={playClick}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8E8E8E] hover:text-[#E10600] transition-colors"
          >
            <span>VIEW ALL ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Dominant Featured Showcase */}
        {dominantProject && (
          <div className="mb-16">
            <ProjectCard
              project={dominantProject}
              index={0}
              layout="dominant"
            />
          </div>
        )}

        {/* Secondary Featured Projects */}
        <div className="space-y-12">
          {secondaryProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx + 1}
              layout="featured"
            />
          ))}
        </div>
      </section>

      {/* 4. RANDOM EXPERIMENTS & SMALL THINGS */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest">// CASUAL EXPERIMENTS</span>
            <span className="h-px flex-1 bg-[#F2F0EA]/10" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F2F0EA] uppercase tracking-tight mt-2">
            SMALL THINGS & EXPERIMENTS<span className="text-[#E10600]">.</span>
          </h2>
          <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
            Quick prototypes, learning projects, and weekend experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="p-6 bg-[#111111] border border-[#F2F0EA]/10 hover:border-[#E10600]/40 transition-colors rounded-lg flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E] mb-2">
                  <span className="px-2 py-0.5 bg-[#171717] border border-[#F2F0EA]/10 text-[#F2F0EA] text-[10px] uppercase font-semibold">
                    {exp.category}
                  </span>
                  <span>{exp.year}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#F2F0EA] group-hover:text-[#E10600] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm font-sans font-light text-[#A3A39B] pt-2 leading-relaxed">
                  {exp.tagline}
                </p>
                {exp.notes && (
                  <p className="text-xs font-mono text-[#8E8E8E] pt-2 border-l border-[#E10600]/50 pl-3">
                    {exp.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F2F0EA]/5 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((t, i) => (
                    <span key={i} className="text-[10px] text-[#8E8E8E] bg-[#161616] px-2 py-0.5 border border-[#F2F0EA]/5">
                      {t}
                    </span>
                  ))}
                </div>
                {exp.githubUrl && (
                  <a
                    href={exp.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                  >
                    <span>SRC</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SKILLS / WHAT I WORK WITH */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // SKILLS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#F2F0EA] tracking-tight uppercase">
            WHAT I WORK WITH<span className="text-[#E10600]">.</span>
          </h2>
          <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
            These are the languages and tools I actually use to build projects and learn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="p-8 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F2F0EA] uppercase tracking-wider">
                  PROGRAMMING LANGUAGES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E8E]">CORE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'C', level: 'Procedural', desc: 'Pointers, memory management, POSIX calls' },
                { name: 'C++', level: 'OOP & STL', desc: 'Data structures, algorithm implementations' },
                { name: 'Java', level: 'Object-Oriented', desc: 'Core Java, OOP design principles' }
              ].map((skill, i) => (
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1 rounded-sm">
                  <div className="font-display font-black text-2xl text-[#F2F0EA]">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#E10600]">
                    {skill.level}
                  </div>
                  <p className="font-sans text-[11px] text-[#8E8E8E] pt-1 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Web Technologies */}
          <div className="p-8 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-4">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F2F0EA] uppercase tracking-wider">
                  WEB TECHNOLOGIES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E8E]">MARKUP & STYLING</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'HTML', role: 'Semantic Structure', desc: 'Clean DOM structure, forms, and accessible markup' },
                { name: 'CSS', role: 'Layout & Styling', desc: 'Flexbox, Grid, responsive layouts, transitions' }
              ].map((skill, i) => (
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1 rounded-sm">
                  <div className="font-display font-black text-2xl text-[#F2F0EA]">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#E10600]">
                    {skill.role}
                  </div>
                  <p className="font-sans text-[11px] text-[#8E8E8E] pt-1 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#0E0E0E] border border-[#F2F0EA]/5 font-mono text-[11px] text-[#8E8E8E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* Technologies used in specific projects (like WebGL, Three.js, or WebSockets) are documented in their project case studies.</span>
          <span className="text-[#F2F0EA] font-semibold">HONEST SKILL PROFILE</span>
        </div>
      </section>

      {/* 6. HACKATHONS SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest">// HACKATHONS</span>
            <span className="h-px flex-1 bg-[#F2F0EA]/10" />
            <span className="hidden sm:inline font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest">
              [ RAPID PROTOTYPING ]
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] uppercase tracking-tight mt-2">
            BUILD FAST. LEARN BY DOING<span className="text-[#E10600]">.</span>
          </h2>
        </div>

        <div className="p-8 md:p-12 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-xl font-light text-[#F2F0EA] font-sans leading-relaxed border-l-2 border-[#E10600] pl-4">
                "I like hackathons because they're a good excuse to turn an idea into something working in a short amount of time. Having 24 to 48 hours to solve a problem under constraints forces you to focus on what matters and build with other people."
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#171717] border border-[#E10600]/40 font-mono text-xs font-bold text-[#E10600]">
                  <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                  <span>OPEN TO HACKATHONS</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#171717] border border-[#F2F0EA]/10 font-mono text-xs font-bold text-[#F2F0EA]">
                  <span>LOOKING FOR TEAMMATES</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#141414] border border-[#F2F0EA]/5 font-mono text-xs text-[#8E8E8E]">
                  <span>PUNE & REMOTE</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 bg-[#0A0A0A] border border-[#F2F0EA]/10 rounded-lg space-y-3 font-mono text-xs">
                <span className="text-[#8E8E8E] uppercase tracking-widest block font-bold text-[11px]">
                  // WHY I ENJOY HACKATHONS
                </span>
                <ul className="space-y-2.5 text-[#F2F0EA]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E10600] font-bold">01</span>
                    <span><strong className="text-[#F2F0EA]">Rapid Prototyping:</strong> Turning ideas into working code without overthinking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E10600] font-bold">02</span>
                    <span><strong className="text-[#F2F0EA]">Constraint-Driven:</strong> Tight deadlines force practical engineering decisions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E10600] font-bold">03</span>
                    <span><strong className="text-[#F2F0EA]">Team Synergy:</strong> Pairing up, dividing problems, and shipping together.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E10600] font-bold">04</span>
                    <span><strong className="text-[#F2F0EA]">Learning Fast:</strong> Picking up new APIs and debugging under real constraints.</span>
                  </li>
                </ul>
              </div>

              <Magnet strength={0.35} reach={40}>
                <Link
                  to="/contact"
                  onClick={playClick}
                  className="w-full py-3.5 px-6 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold text-center hover:bg-[#B00500] transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-[#E10600]/20"
                >
                  <span>TEAM UP FOR A HACKATHON</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnet>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CURRENTLY LEDGER */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest">// STATUS</span>
              <span className="h-px w-12 bg-[#F2F0EA]/10" />
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#F2F0EA] uppercase tracking-tight mt-1">
              CURRENTLY<span className="text-[#E10600]">.</span>
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#8E8E8E] bg-[#0E0E0E] px-3 py-1.5 border border-[#F2F0EA]/10">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
            <span className="text-[#F2F0EA] font-semibold">PUNE, INDIA</span>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {/* Studying */}
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#E10600] font-bold tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>STUDYING</span>
              </div>
              <p className="text-sm font-sans font-bold text-[#F2F0EA]">
                B.Tech Computer Science
              </p>
              <span className="text-[11px] text-[#8E8E8E] block leading-relaxed">
                Symbiosis Institute of Technology, Pune (2025–2029)
              </span>
            </div>

            {/* Building */}
            <div className="space-y-2 border-b lg:border-b-0 lg:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#F2F0EA] font-bold tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-[#E10600]" />
                <span>BUILDING</span>
              </div>
              <p className="text-sm font-sans font-bold text-[#F2F0EA]">
                Projects + Experiments
              </p>
              <span className="text-[11px] text-[#8E8E8E] block leading-relaxed">
                Tools, algorithm visualizers, and web applications.
              </span>
            </div>

            {/* Learning */}
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#F2F0EA] font-bold tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#E10600]" />
                <span>LEARNING</span>
              </div>
              <p className="text-sm font-sans font-bold text-[#F2F0EA]">
                By Building Things
              </p>
              <span className="text-[11px] text-[#8E8E8E] block leading-relaxed">
                Deepening understanding of low-level concepts, C++, and algorithms.
              </span>
            </div>

            {/* Looking for */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#E10600] font-bold tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#E10600]" />
                <span>LOOKING FOR</span>
              </div>
              <p className="text-sm font-sans font-bold text-[#F2F0EA]">
                Hackathons + Collaborations
              </p>
              <span className="text-[11px] text-[#8E8E8E] block leading-relaxed">
                Always open to teaming up for hackathons and interesting project ideas.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLOSING CALLOUT */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="p-8 md:p-16 text-center space-y-6 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#E10600] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
            <span>// CONNECT</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] uppercase tracking-tight">
            LET'S BUILD SOMETHING<span className="text-[#E10600]">.</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-[#A3A39B] max-w-xl mx-auto font-sans leading-relaxed">
            I'm open to hackathons, project collaborations, and interesting software ideas. If you have an idea or want to team up, reach out.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Magnet strength={0.35} reach={40}>
              <MagneticButton href="/contact" variant="primary">
                GET IN TOUCH <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </Magnet>
            <Magnet strength={0.35} reach={40}>
              <a
                href="https://github.com/vatsalost"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#171717] text-[#F2F0EA] border border-[#F2F0EA]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors rounded-sm"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB ↗</span>
              </a>
            </Magnet>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
