import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, ArrowUpRight, Sparkles, Terminal, Cpu, Layers, 
  Github, FileText, FlaskConical, Compass, BookOpen, ChevronRight,
  Code2, Trophy, Users, Zap, Mail
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
import { SpotlightCard } from '../components/bits/SpotlightCard';
import { BorderGlow } from '../components/bits/BorderGlow';
import { ScrollStack, ScrollStackItem } from '../components/bits/ScrollStack';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { projects } = useProjects();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const hackathonRef = useRef(null);

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
        {/* Generative Topographic Wave Canvas */}
        <ReactiveCanvas className="opacity-80" />

        {/* Hero Top Identification */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] border-b border-[#F5F5F0]/10 pb-4">
          <div className="flex items-center gap-3">
            <Badge variant="crimson" size="sm">
              VATSAL CHAUDHARY
            </Badge>
            <span className="text-[#8E8E8E] hidden sm:inline">B.TECH CSE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="text-[#F5F5F0]">SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE</span>
          </div>
        </div>

        {/* Hero Central Headline */}
        <div ref={titleRef} className="relative z-10 my-auto py-8 md:py-12 max-w-5xl">
          <div className="mb-4">
            <div className="reveal-line inline-flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#F5F5F0]/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
              <ShinyText
                text="COMPUTER SCIENCE & ENGINEERING"
                speed={3.5}
                className="font-mono text-xs font-bold tracking-wider uppercase"
                baseColor="#8E8E8E"
                shimmerColor="#F5F5F0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="reveal-line font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#F5F5F0] uppercase leading-[0.95]">
              VATSAL CHAUDHARY<span className="text-[#E10600]">.</span>
            </h1>
            <h2 className="reveal-line font-display font-black text-2xl sm:text-4xl md:text-5xl text-stroke-bone hover:text-[#E10600] uppercase tracking-tight transition-colors">
              BUILDING, EXPERIMENTING & LEARNING.
            </h2>
          </div>

          {/* Persona Statement */}
          <div className="mt-6 max-w-2xl space-y-3">
            <p className="text-base sm:text-lg font-light text-[#F5F5F0] font-sans leading-relaxed">
              B.Tech Computer Science & Engineering student at <strong className="font-semibold text-white">Symbiosis Institute of Technology, Pune</strong>.
            </p>
            <p className="text-sm sm:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
              I like building things, experimenting with technology, and learning by doing.
            </p>
          </div>

          {/* Technical Stack Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#E10600] font-bold mr-1">// STACK:</span>
            {['C', 'C++', 'Java', 'HTML', 'CSS'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[#141414] border border-[#F5F5F0]/15 text-[#F5F5F0] font-medium tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Hackathon Callout Line */}
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#E10600]">
            <span className="w-2 h-2 rounded-full bg-[#E10600]" />
            <span className="tracking-wide font-bold uppercase">
              Open to hackathons, collaborations, and interesting projects.
            </span>
          </div>

          {/* Clear CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#featured-work" variant="primary">
              VIEW PROJECTS <ArrowDown className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              CONTACT ME <Mail className="w-3.5 h-3.5" />
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
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pt-4 border-t border-[#F5F5F0]/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
            <span>SCROLL TO EXPLORE</span>
          </div>
          <div className="text-[11px]">
            <span>SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE</span>
          </div>
        </div>
      </section>

      {/* 2. "CURRENTLY" / "NOW" SECTION */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-6 md:p-8 bg-[#0D0D0D] border border-[#F5F5F0]/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          {/* Studying */}
          <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F5F5F0]/10 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 text-[#E10600] font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CURRENTLY // STUDYING</span>
            </div>
            <p className="text-sm font-sans font-semibold text-[#F5F5F0]">
              B.Tech Computer Science & Engineering
            </p>
            <span className="text-[11px] text-[#8E8E8E] block">
              Symbiosis Institute of Technology, Pune
            </span>
          </div>

          {/* Building */}
          <div className="space-y-2 border-b lg:border-b-0 lg:border-r border-[#F5F5F0]/10 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 text-[#F5F5F0] font-bold">
              <Code2 className="w-3.5 h-3.5 text-[#E10600]" />
              <span>CURRENTLY // BUILDING</span>
            </div>
            <p className="text-sm font-sans font-normal text-[#F5F5F0]">
              Projects and experiments
            </p>
            <span className="text-[11px] text-[#8E8E8E] block">
              Software tools, algorithms, and web applications.
            </span>
          </div>

          {/* Learning */}
          <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-[#F5F5F0]/10 pb-4 sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 text-[#F5F5F0] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#E10600]" />
              <span>CURRENTLY // LEARNING</span>
            </div>
            <p className="text-sm font-sans font-normal text-[#F5F5F0]">
              Through hands-on development & hackathons
            </p>
            <span className="text-[11px] text-[#8E8E8E] block">
              Tackling problems that challenge and teach me.
            </span>
          </div>

          {/* Open to */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#E10600] font-bold">
              <Zap className="w-3.5 h-3.5 text-[#E10600]" />
              <span>CURRENTLY // OPEN TO</span>
            </div>
            <p className="text-sm font-sans font-semibold text-[#F5F5F0]">
              Hackathons · Collaborations · Projects
            </p>
            <span className="text-[11px] text-[#8E8E8E] block">
              Looking for teammates and interesting ideas.
            </span>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL SKILLS SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
            // TECHNICAL PROFILE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight uppercase">
            TECHNICAL SKILLS
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
            edgeSensitivity={24}
            glowColor="0 100 50"
            colors={['#E10600', '#FF3333', '#8B0000']}
            backgroundColor="#121212"
            className="p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F5F5F0] uppercase tracking-wider">
                  01 // PROGRAMMING LANGUAGES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8E8E8E]">CORE SKILLS</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'C', level: 'Procedural Systems', desc: 'Pointers, memory management, algorithms' },
                { name: 'C++', level: 'Object-Oriented', desc: 'OOP, STL, data structures, problem solving' },
                { name: 'Java', level: 'Object-Oriented', desc: 'Core Java, OOP principles, application logic' }
              ].map((skill, i) => (
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F5F5F0]/5 space-y-1">
                  <div className="font-display font-black text-2xl text-[#F5F5F0]">
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
            edgeSensitivity={24}
            glowColor="0 100 50"
            colors={['#E10600', '#FF3333', '#8B0000']}
            backgroundColor="#121212"
            className="p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#E10600]" />
                <span className="font-mono text-xs font-bold text-[#F5F5F0] uppercase tracking-wider">
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
                <div key={i} className="p-4 bg-[#0A0A0A] border border-[#F5F5F0]/5 space-y-1">
                  <div className="font-display font-black text-2xl text-[#F5F5F0]">
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

        <div className="mt-4 p-4 bg-[#0E0E0E] border border-[#F5F5F0]/5 font-mono text-[11px] text-[#8E8E8E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* Note: Technologies used in specific project experiments (e.g. WebGL, frameworks) are documented in their respective case studies below.</span>
          <span className="text-[#F5F5F0] font-bold">FOUNDATIONAL PROFICIENCY</span>
        </div>
      </section>

      {/* 4. HACKATHONS DEDICATED SECTION */}
      <section ref={hackathonRef} className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="p-8 md:p-14 bg-gradient-to-br from-[#121212] via-[#0E0E0E] to-[#0A0A0A] border-2 border-[#E10600]/40 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E10600]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase tracking-widest">
                <Trophy className="w-4 h-4" />
                <span>// HACKATHONS & COLLABORATION</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F5F5F0] uppercase tracking-tight leading-tight">
                BUILDING UNDER PRESSURE.
              </h2>

              <blockquote className="text-base sm:text-xl font-light text-[#F5F5F0] font-sans leading-relaxed border-l-2 border-[#E10600] pl-4 italic">
                "I enjoy building under pressure, experimenting with ideas, and working with people who like turning ideas into working projects."
              </blockquote>

              <div className="p-6 bg-[#0A0A0A] border border-[#F5F5F0]/10 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
                  <span className="font-mono text-xs font-bold text-[#E10600] uppercase tracking-wider">
                    OPEN TO HACKATHONS
                  </span>
                </div>
                <p className="font-sans text-sm text-[#8E8E8E] leading-relaxed">
                  Looking for teammates, ideas, and opportunities to participate in upcoming hackathons. If you have an interesting challenge or need someone eager to build, let's team up.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 bg-[#0A0A0A] border border-[#F5F5F0]/10 rounded-xl space-y-3 font-mono text-xs">
                <span className="text-[#8E8E8E] uppercase tracking-widest block">WHY I PARTICIPATE</span>
                <ul className="space-y-2 text-[#F5F5F0]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Fast-paced prototyping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Learning new tech in 24-48h
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Working with collaborative teams
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E10600]">✓</span> Turning ideas into working builds
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="w-full py-4 px-6 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold text-center hover:bg-[#B00500] transition-colors flex items-center justify-center gap-2"
                data-cursor="team"
              >
                <span>TEAM UP FOR A HACKATHON</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RUNNING SKILLS TICKER */}
      <div className="py-4 border-y border-[#F5F5F0]/10 bg-[#0A0A0A]">
        <MarqueeTicker
          items={[
            "VATSAL CHAUDHARY",
            "B.TECH COMPUTER SCIENCE & ENGINEERING",
            "SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE",
            "C · C++ · JAVA · HTML · CSS",
            "OPEN TO HACKATHONS & COLLABORATIONS",
            "LEARNING BY DOING"
          ]}
          speed="30s"
          highlightRed={true}
        />
      </div>

      {/* 6. FEATURED PROJECTS SHOWCASE */}
      <section id="featured-work" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#F5F5F0]/10 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
              // HANDS-ON WORK
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F5F0] tracking-tight uppercase">
              FEATURED PROJECTS
            </h2>
            <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
              Software tools, algorithm visualizers, and experiments built to learn by doing.
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

        {/* Flagship Project Cards Stack with ReactBits ScrollStack */}
        <ScrollStack
          itemDistance={45}
          itemScale={0.035}
          itemStackDistance={28}
          stackPosition="14%"
          baseScale={0.92}
          useWindowScroll={true}
        >
          {featuredProjects.map((project, idx) => (
            <ScrollStackItem key={project.id}>
              <ProjectCard
                project={project}
                index={idx}
                layout="stack"
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div className="mt-16 text-center">
          <MagneticButton href="/work" variant="outline">
            EXPLORE COMPLETE REPOSITORY ARCHIVE ({projects.length})
          </MagneticButton>
        </div>
      </section>

      {/* 7. CTA SECTION: BUILD SOMETHING? */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#F5F5F0]/10">
        <div className="p-8 md:p-16 bg-[#121212] border border-[#F5F5F0]/10 text-center space-y-6">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
            // NEXT STEP
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F5F5F0] uppercase tracking-tight">
            BUILD SOMETHING?
          </h2>
          <p className="text-base sm:text-xl font-light text-[#8E8E8E] max-w-xl mx-auto font-sans">
            I'm open to hackathons, collaborations, and interesting projects.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              CONTACT ME <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <a
              href="https://github.com/vatsalost"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#141414] text-[#F5F5F0] border border-[#F5F5F0]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
