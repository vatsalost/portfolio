import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, ArrowUpRight, Cpu, Layers, Github, Mail, 
  Terminal, Trophy, Code2, BookOpen, Compass, Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactiveCanvas } from '../components/visuals/ReactiveCanvas';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { Badge } from '../components/untitled/Badge';
import { BorderGlow } from '../components/bits/BorderGlow';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  // Focus strictly on the 3 strongest flagship builds for Selected Work
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const dominantProject = featuredProjects[0] || projects[0];
  const secondaryProjects = featuredProjects.slice(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero staggered reveal
      const lines = titleRef.current?.querySelectorAll('.hero-reveal');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
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
        className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Subtle, Non-Distracting Topographic Wave Canvas */}
        <ReactiveCanvas className="opacity-40" />

        {/* Top Identification Badge */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] border-b border-[#F2F0EA]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-[#F2F0EA] font-semibold tracking-wider">VATSAL CHAUDHARY</span>
            <span className="text-[#8E8E8E] hidden sm:inline">• B.TECH COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="text-[#8E8E8E]">SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE</span>
          </div>
        </div>

        {/* Hero Central Content */}
        <div ref={titleRef} className="relative z-10 my-auto py-8 md:py-12 max-w-5xl">
          {/* Main Display Headline */}
          <div className="space-y-2 mb-6">
            <h1 className="hero-reveal font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight text-[#F2F0EA] leading-[0.92] uppercase">
              VATSAL<br />
              CHAUDHARY<span className="text-[#E10600]">.</span>
            </h1>
            <p className="hero-reveal font-display font-bold text-xl sm:text-3xl md:text-4xl text-[#8E8E8E] tracking-tight pt-2">
              Computer Science student building things and experimenting with technology.
            </p>
          </div>

          {/* Education & Personality Statement */}
          <div className="hero-reveal max-w-2xl space-y-2 font-sans font-light text-base sm:text-lg text-[#A3A39B] leading-relaxed">
            <p>
              B.Tech Computer Science & Engineering at <strong className="text-[#F2F0EA] font-semibold">Symbiosis Institute of Technology, Pune</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#8E8E8E]">
              I like building projects, participating in hackathons, and learning through hands-on development.
            </p>
          </div>

          {/* Technical Skills Row */}
          <div className="hero-reveal mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#E10600] font-bold mr-1">// STACK:</span>
            {['C', 'C++', 'Java', 'HTML', 'CSS'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] font-medium tracking-wide rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Availability Callout */}
          <div className="hero-reveal mt-5 flex items-center gap-2 font-mono text-xs text-[#E10600]">
            <span className="w-2 h-2 rounded-full bg-[#E10600]" />
            <span className="tracking-wide font-bold uppercase">
              OPEN TO HACKATHONS + COLLABORATIONS
            </span>
          </div>

          {/* CTAs */}
          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#selected-work" variant="primary">
              VIEW WORK <ArrowDown className="w-4 h-4" />
            </MagneticButton>
            <a
              href="https://github.com/vatsalost"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] text-[#F2F0EA] border border-[#F2F0EA]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors rounded-sm"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB ↗</span>
            </a>
            <MagneticButton href="/contact" variant="outline">
              CONTACT ME <Mail className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pt-4 border-t border-[#F2F0EA]/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
            <span>SCROLL TO EXPLORE</span>
          </div>
          <span className="text-[11px] text-[#555555]">PUNE, INDIA</span>
        </div>
      </section>

      {/* 2. INTRO / PERSONAL STATEMENT SECTION */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="max-w-4xl space-y-6">
          <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block">
            // PERSONAL STATEMENT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] tracking-tight leading-[1.05] uppercase">
            I LIKE BUILDING THINGS<br />
            I WANT TO UNDERSTAND<span className="text-[#E10600]">.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-sans font-light text-[#A3A39B] leading-relaxed max-w-3xl pt-2">
            I’m a Computer Science student interested in software, problem solving, and hands-on experimentation. I enjoy building projects, participating in hackathons, and learning by turning ideas into working things.
          </p>
        </div>
      </section>

      {/* 3. SELECTED WORK (3 STRONGEST PROJECTS) */}
      <section id="selected-work" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#F2F0EA]/10 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
              // FLAGSHIP BUILDS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#F2F0EA] tracking-tight uppercase">
              SELECTED WORK<span className="text-[#E10600]">.</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#8E8E8E] font-sans font-light max-w-xl">
              The 3 strongest software projects I have built and documented.
            </p>
          </div>
          <Link
            to="/work"
            onClick={playClick}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#8E8E8E] hover:text-[#E10600] transition-colors"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Project 01: Visually Dominant Showcase */}
        {dominantProject && (
          <div className="mb-16">
            <ProjectCard
              project={dominantProject}
              index={0}
              layout="dominant"
            />
          </div>
        )}

        {/* Projects 02 & 03: Editorial Staggered Layout */}
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

      {/* 4. COMPACT WORK INDEX / ARCHIVE TABLE */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase block mb-1">
              // PROJECT REPOSITORY
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] uppercase tracking-tight">
              WORK INDEX
            </h3>
          </div>
          <Link
            to="/work"
            onClick={playClick}
            className="font-mono text-xs text-[#8E8E8E] hover:text-[#E10600] transition-colors flex items-center gap-1"
          >
            <span>FULL DIRECTORY ({projects.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* High-density brutalist project rows */}
        <div className="border-t border-[#F2F0EA]/10 divide-y divide-[#F2F0EA]/5 font-mono text-xs">
          {projects.map((p, idx) => (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              onClick={playClick}
              onMouseEnter={playHover}
              className="group py-4 flex items-center justify-between gap-4 hover:bg-[#111111] px-3 -mx-3 transition-colors"
            >
              <div className="flex items-center gap-6 sm:gap-12 min-w-0">
                <span className="text-[#555555] group-hover:text-[#E10600] transition-colors shrink-0">
                  {p.year}
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-[#F2F0EA] group-hover:text-[#E10600] transition-colors truncate">
                  {p.title}
                </span>
              </div>
              <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                <span className="text-[#8E8E8E] hidden sm:inline text-[11px]">
                  {p.stack?.[0]} · {p.category}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#555555] group-hover:text-[#E10600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. TECHNICAL SKILLS SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // FOUNDATION
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#F2F0EA] tracking-tight uppercase">
            TECHNICAL SKILLS<span className="text-[#E10600]">.</span>
          </h2>
          <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
            Core programming languages and web technologies I work with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <BorderGlow
            borderRadius={16}
            glowRadius={36}
            backgroundColor="#111111"
            className="p-8 space-y-6"
            onMouseEnter={playHover}
          >
            <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F2F0EA] uppercase tracking-wider">
                  01 // PROGRAMMING LANGUAGES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E8E]">CORE</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'C', level: 'Procedural', desc: 'Pointers, memory, algorithms' },
                { name: 'C++', level: 'OOP & STL', desc: 'Data structures, problem solving' },
                { name: 'Java', level: 'Object-Oriented', desc: 'Core Java, OOP principles' }
              ].map((skill, i) => (
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1 rounded-sm">
                  <div className="font-display font-black text-2xl text-[#F2F0EA]">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#E10600]">
                    {skill.level}
                  </div>
                  <p className="font-sans text-[11px] text-[#8E8E8E] pt-1">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </BorderGlow>

          {/* Web Technologies */}
          <BorderGlow
            borderRadius={16}
            glowRadius={36}
            backgroundColor="#111111"
            className="p-8 space-y-6"
            onMouseEnter={playHover}
          >
            <div className="flex items-center justify-between border-b border-[#F2F0EA]/10 pb-4">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F2F0EA] uppercase tracking-wider">
                  02 // WEB TECHNOLOGIES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E8E]">MARKUP & STYLING</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'HTML', role: 'Semantic Structure', desc: 'Accessible DOM structuring, forms, modern markup' },
                { name: 'CSS', role: 'Styling & Layout', desc: 'Flexbox, Grid, responsive design, transitions' }
              ].map((skill, i) => (
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1 rounded-sm">
                  <div className="font-display font-black text-2xl text-[#F2F0EA]">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#E10600]">
                    {skill.role}
                  </div>
                  <p className="font-sans text-[11px] text-[#8E8E8E] pt-1">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </BorderGlow>
        </div>

        <div className="mt-4 p-4 bg-[#0E0E0E] border border-[#F2F0EA]/5 font-mono text-[11px] text-[#8E8E8E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* Technologies used in specific project experiments (e.g. WebGL, Three.js, audio FFT) are documented in their respective case studies.</span>
          <span className="text-[#F2F0EA] font-semibold">HONEST SKILL PROFILE</span>
        </div>
      </section>

      {/* 6. HACKATHONS DEDICATED SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <BorderGlow
          borderRadius={20}
          glowRadius={38}
          backgroundColor="#111111"
          className="p-8 md:p-14"
          onMouseEnter={playHover}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase tracking-widest">
                <Trophy className="w-4 h-4" />
                <span>// HACKATHONS</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] uppercase tracking-tight leading-tight">
                BUILDING UNDER TIME CONSTRAINTS<span className="text-[#E10600]">.</span>
              </h2>

              <p className="text-base sm:text-xl font-light text-[#F2F0EA] font-sans leading-relaxed border-l-2 border-[#E10600] pl-4">
                "I enjoy building under time constraints, experimenting with ideas, and collaborating with people who like making things."
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#171717] border border-[#F2F0EA]/10 font-mono text-xs font-bold text-[#E10600]">
                  <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                  <span>OPEN TO HACKATHONS</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#171717] border border-[#F2F0EA]/10 font-mono text-xs font-bold text-[#F2F0EA]">
                  <span>OPEN TO COLLABORATIONS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 bg-[#0A0A0A] border border-[#F2F0EA]/10 rounded-lg space-y-3 font-mono text-xs">
                <span className="text-[#8E8E8E] uppercase tracking-widest block">WHY I PARTICIPATE</span>
                <ul className="space-y-2 text-[#F2F0EA]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Rapid prototyping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Learning by doing in 24–48 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Collaborating with team members
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Turning ideas into working software
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                onClick={playClick}
                className="w-full py-4 px-6 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold text-center hover:bg-[#B00500] transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                <span>TEAM UP FOR A HACKATHON</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </BorderGlow>
      </section>

      {/* 7. "NOW" SECTION */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <div className="mb-6">
          <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block">
            // STATUS
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] uppercase tracking-tight">
            NOW
          </h3>
        </div>

        <BorderGlow
          borderRadius={16}
          glowRadius={36}
          backgroundColor="#111111"
          className="p-6 md:p-8"
          onMouseEnter={playHover}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            {/* Studying */}
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#E10600] font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>CURRENTLY STUDYING</span>
              </div>
              <p className="text-sm font-sans font-semibold text-[#F2F0EA]">
                B.Tech Computer Science & Engineering
              </p>
              <span className="text-[11px] text-[#8E8E8E] block">
                Symbiosis Institute of Technology, Pune
              </span>
            </div>

            {/* Building */}
            <div className="space-y-2 border-b lg:border-b-0 lg:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#F2F0EA] font-bold">
                <Code2 className="w-3.5 h-3.5 text-[#E10600]" />
                <span>CURRENTLY BUILDING</span>
              </div>
              <p className="text-sm font-sans font-normal text-[#F2F0EA]">
                Projects + experiments
              </p>
              <span className="text-[11px] text-[#8E8E8E] block">
                Software tools, algorithms, and web applications.
              </span>
            </div>

            {/* Learning */}
            <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F2F0EA]/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#F2F0EA] font-bold">
                <Compass className="w-3.5 h-3.5 text-[#E10600]" />
                <span>CURRENTLY LEARNING</span>
              </div>
              <p className="text-sm font-sans font-normal text-[#F2F0EA]">
                Programming through hands-on work
              </p>
              <span className="text-[11px] text-[#8E8E8E] block">
                Tackling problems that challenge and teach me.
              </span>
            </div>

            {/* Open to */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#E10600] font-bold">
                <Zap className="w-3.5 h-3.5 text-[#E10600]" />
                <span>OPEN TO</span>
              </div>
              <p className="text-sm font-sans font-semibold text-[#F2F0EA]">
                Hackathons · Collaborations · Interesting ideas
              </p>
              <span className="text-[11px] text-[#8E8E8E] block">
                Looking for teammates and interesting challenges.
              </span>
            </div>
          </div>
        </BorderGlow>
      </section>

      {/* 8. CONTACT CALLOUT */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F2F0EA]/10">
        <BorderGlow
          borderRadius={20}
          glowRadius={44}
          backgroundColor="#111111"
          className="p-8 md:p-16 text-center space-y-6"
          onMouseEnter={playHover}
        >
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
            // CONNECT
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] uppercase tracking-tight">
            LET'S BUILD SOMETHING<span className="text-[#E10600]">.</span>
          </h2>
          <p className="text-base sm:text-xl font-light text-[#8E8E8E] max-w-xl mx-auto font-sans leading-relaxed">
            I'm open to hackathons, collaborations, and interesting projects.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              GET IN TOUCH <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
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
          </div>
        </BorderGlow>
      </section>
    </div>
  );
}

export default HomePage;
