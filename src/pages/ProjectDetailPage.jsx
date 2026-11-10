import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowUpRight, Github, Globe, ChevronRight, Cpu, 
  ShieldCheck, Database, Layers, CheckCircle2, Clock, Zap, Terminal, ExternalLink 
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { Badge } from '../components/untitled/Badge';
import { BorderGlow } from '../components/bits/BorderGlow';

export function ProjectDetailPage() {
  const { id } = useParams();
  const { getProjectById, projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const project = getProjectById(id);
  const stickyColRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="pt-48 pb-36 text-center max-w-lg mx-auto px-6 text-[#F2F0EA]">
        <h2 className="font-display text-4xl font-bold mb-4">
          RECORD NOT LOCATED
        </h2>
        <p className="font-mono text-xs text-[#8E8E8E] mb-8">
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/work"
          onClick={playClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#B00500] transition-colors rounded-sm"
        >
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  if (project.inProgress) {
    return (
      <div className="w-full relative pt-32 pb-36 text-[#F2F0EA] min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full mx-auto">
          <BorderGlow
            borderRadius={20}
            glowRadius={40}
            backgroundColor="#0F0F0F"
            className="p-8 sm:p-12 text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#161616] border border-[#E10600]/40 rounded-full font-mono text-xs text-[#E10600] tracking-widest uppercase font-bold shadow-lg shadow-[#E10600]/10">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              <span>CASE STUDY IN PROGRESS</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-[#F2F0EA] tracking-tight uppercase leading-none">
              IN PROGRESS<span className="text-[#E10600]">.</span>
            </h1>

            <p className="font-mono text-sm text-[#8E8E8E] max-w-md mx-auto leading-relaxed">
              Project documentation, benchmarks, and interactive demo are currently being updated. Check back soon for the full technical breakdown.
            </p>

            <div className="pt-2 max-w-xs mx-auto">
              <div className="h-1.5 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                <div className="h-full bg-gradient-to-r from-[#E10600] via-[#FF3333] to-[#E10600] w-3/5 animate-pulse rounded-full" />
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/work"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] hover:bg-[#E10600] text-[#F2F0EA] hover:text-white border border-[#F2F0EA]/15 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider font-bold transition-all rounded-sm shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>RETURN TO WORK</span>
              </Link>
            </div>
          </BorderGlow>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === id);
  const formattedIndex = currentIndex >= 0 ? (currentIndex < 9 ? `0${currentIndex + 1}` : `${currentIndex + 1}`) : '01';

  return (
    <div className="w-full relative pt-28 pb-32 text-[#F2F0EA]">
      {/* 1. Project Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/work"
            onClick={playClick}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8E8E] hover:text-[#E10600] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PROJECTS</span>
          </Link>
        </div>

        {/* Project Hero Identity */}
        <div className="border-b border-[#F2F0EA]/10 pb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-xs">
            <span className="text-[#E10600] font-bold tracking-widest">
              PROJECT {formattedIndex}
            </span>
            <span className="text-[#555555]">/</span>
            <Badge variant="crimson" size="sm">
              {project.category}
            </Badge>
            <span className="text-[#8E8E8E]">
              YEAR // {project.year}
            </span>
            <span className="text-[#8E8E8E]">
              ROLE // {project.role || 'Co-Creator / Core Engineer'}
            </span>
            <span className="px-2 py-0.5 bg-[#161616] border border-[#E10600]/30 text-[#E10600] text-[10px] font-bold">
              PRODUCTION TESTED
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F2F0EA] tracking-tight uppercase leading-none mb-3">
            {project.title}<span className="text-[#E10600]">.</span>
          </h1>

          {project.subtitle && (
            <p className="font-mono text-sm sm:text-base text-[#E10600] uppercase tracking-wider font-semibold mb-6">
              {project.subtitle}
            </p>
          )}

          <p className="text-lg sm:text-xl font-sans font-light text-[#A3A39B] max-w-3xl leading-relaxed mb-8">
            {project.tagline || project.overview}
          </p>

          {/* Action Links & Tech Pills */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[#F2F0EA]/10">
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white font-bold hover:bg-[#B00500] transition-colors rounded-sm shadow-lg shadow-[#E10600]/20"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW ON GITHUB ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Image Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-[#F2F0EA]/10 bg-[#111111] rounded-xl shadow-2xl">
          <img
            src={project.heroImage || project.thumbnail}
            alt={`${project.title} Architecture`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[#8E8E8E] bg-[#0A0A0A]/85 backdrop-blur-md px-4 py-2 border border-[#F2F0EA]/10 rounded-sm">
            <span>MASTER ARCHITECTURE BLUEPRINT</span>
            <span className="text-[#E10600] font-bold">HRTE 4-TIER LANDSCAPE</span>
          </div>
        </div>
      </div>

      {/* 3. Deep Dive Case Study */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Metadata & Specs */}
          <div 
            ref={stickyColRef}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
          >
            {/* Quick Metrics Card */}
            <div className="p-6 bg-[#111111] border border-[#F2F0EA]/10 rounded-lg space-y-4 font-mono text-xs">
              <span className="text-[10px] text-[#E10600] tracking-widest block uppercase font-bold">
                // SYSTEM TELEMETRY & SPECS
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 rounded-sm">
                  <span className="text-[10px] text-[#8E8E8E] block">FULL PIPELINE</span>
                  <span className="font-display text-xl font-bold text-[#F2F0EA]">~38ms</span>
                </div>
                <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 rounded-sm">
                  <span className="text-[10px] text-[#8E8E8E] block">READ QUERY</span>
                  <span className="font-display text-xl font-bold text-[#E10600]">&lt; 10ms</span>
                </div>
                <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 rounded-sm">
                  <span className="text-[10px] text-[#8E8E8E] block">TEST SUITE</span>
                  <span className="font-display text-xl font-bold text-[#F2F0EA]">87 / 87</span>
                </div>
                <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 rounded-sm">
                  <span className="text-[10px] text-[#8E8E8E] block">MUTATION DEFENSE</span>
                  <span className="font-display text-xl font-bold text-[#E10600]">ZERO LEAK</span>
                </div>
              </div>
            </div>

            {/* Scope & Role Card */}
            <div className="p-6 space-y-5 bg-[#111111] border border-[#F2F0EA]/10 font-mono text-xs rounded-lg">
              <div>
                <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1 font-bold">
                  // ROLE & SCOPE
                </span>
                <p className="font-display font-bold text-base text-[#F2F0EA]">
                  {project.role || "Co-Creator / Core Engineer"}
                </p>
                <p className="text-[#8E8E8E] text-[11px] pt-1">
                  {project.category} · {project.year}
                </p>
              </div>

              {project.technicalHighlight && (
                <div className="pt-4 border-t border-[#F2F0EA]/10">
                  <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1 font-bold">
                    // CORE HIGHLIGHT
                  </span>
                  <div className="flex items-start gap-2 pt-1">
                    <Cpu className="w-4 h-4 text-[#E10600] shrink-0 mt-0.5" />
                    <p className="font-mono text-xs text-[#F2F0EA] leading-relaxed">
                      {project.technicalHighlight}
                    </p>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-3 pt-4 border-t border-[#F2F0EA]/10">
                <span className="text-[10px] text-[#8E8E8E] tracking-widest block uppercase font-bold">
                  // TECHNOLOGIES USED
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 bg-[#171717] border border-[#F2F0EA]/10 text-[#F2F0EA] rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributors */}
              {project.contributors && (
                <div className="space-y-3 pt-4 border-t border-[#F2F0EA]/10">
                  <span className="text-[10px] text-[#8E8E8E] tracking-widest block uppercase font-bold">
                    // CORE CONTRIBUTORS
                  </span>
                  <div className="space-y-1.5">
                    {project.contributors.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-[#F2F0EA] font-semibold">{member.name}</span>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#E10600] hover:underline inline-flex items-center gap-1 font-mono"
                        >
                          {member.handle} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source CTA */}
              {project.githubUrl && (
                <div className="pt-4 border-t border-[#F2F0EA]/10">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="w-full py-2.5 px-4 bg-[#181818] hover:bg-[#E10600] text-[#F2F0EA] hover:text-white border border-[#F2F0EA]/15 hover:border-[#E10600] flex items-center justify-center gap-2 rounded-sm transition-colors font-bold uppercase tracking-wider text-[11px]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>OPEN REPO ON GITHUB</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Case Study Narrative */}
          <div className="lg:col-span-8 space-y-14">
            {/* 01 — EXECUTIVE OVERVIEW */}
            {project.overview && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    01 — EXECUTIVE OVERVIEW
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-[#F2F0EA] uppercase tracking-tight">
                  AUTONOMOUS DATABASE SYNTHESIS<span className="text-[#E10600]">.</span>
                </h2>
                <p className="text-base sm:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.overview}
                </p>
                <p className="text-sm sm:text-base font-light text-[#8E8E8E] font-sans leading-relaxed">
                  HRTE operates as an autonomous database engineering platform that completely bridges the gap between raw, unstructured business artifacts (PDFs, scanned ER diagrams, CSVs, speech) and high-performance relational database management.
                </p>
              </section>
            )}

            {/* 02 — THE PROBLEM & MOTIVATION */}
            {project.problem && (
              <section className="space-y-4 p-6 sm:p-8 bg-[#111111] border-l-2 border-[#E10600] border-y border-r border-[#F2F0EA]/10 rounded-r-xl">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  02 — THE PROBLEM & MOTIVATION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2F0EA]">
                  ELIMINATING MANUAL RELATIONAL MODELING
                </h2>
                <p className="text-sm sm:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.problem}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 font-mono text-xs text-[#8E8E8E]">
                  <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1">
                    <span className="text-[#E10600] font-bold block">// TRADITIONAL DBA PIPELINE</span>
                    <p className="text-[11px] leading-relaxed">Manual entity extraction, slow normal form derivations, error-prone foreign key linking, and tedious DDL scripts.</p>
                  </div>
                  <div className="p-3 bg-[#0A0A0A] border border-[#F2F0EA]/5 space-y-1">
                    <span className="text-[#E10600] font-bold block">// HRTE TRANSFORMATION</span>
                    <p className="text-[11px] leading-relaxed">Multimodal ingestion, graph-based 3NF heuristics, instant physical provisioning, and AST-secured NL query translation.</p>
                  </div>
                </div>
              </section>
            )}

            {/* 03 — DUAL CORE PIPELINES */}
            {project.approach && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    03 — DUAL-PIPELINE ARCHITECTURE
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-[#F2F0EA] uppercase tracking-tight">
                  HOW THE ENGINE OPERATES<span className="text-[#E10600]">.</span>
                </h2>
                <p className="text-base sm:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.approach}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 bg-[#111111] border border-[#F2F0EA]/10 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase">
                      <Layers className="w-4 h-4" />
                      <span>Pipeline 1: Ingestion & 3NF Materialization</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A3A39B] font-sans font-light leading-relaxed">
                      Accepts unstructured PDFs, diagrams, or CSVs. Apache PDFBox and Tesseract OCR perform PSM 3 layout analysis. The heuristic normalizer extracts entity candidates, resolves transitive dependencies, builds a Universal Schema Model (USM), and executes physical DDL scripts via isolated connection pools.
                    </p>
                  </div>

                  <div className="p-6 bg-[#111111] border border-[#F2F0EA]/10 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase">
                      <Zap className="w-4 h-4" />
                      <span>Pipeline 2: Neural Query & Self-Healing</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A3A39B] font-sans font-light leading-relaxed">
                      Questions spoken or typed in plain English are transcribed on-device via Faster-Whisper. Grounded SQL statements are synthesized with local Ollama, parsed by JSqlParser AST to guarantee strict read-only execution, and automatically self-healed upon syntax or constraint errors.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 04 — VISUAL BLUEPRINTS GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    04 — SYSTEM BLUEPRINTS & ARCHITECTURE DIAGRAMS
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <div className="space-y-8">
                  {project.gallery.map((imgUrl, i) => {
                    const titles = [
                      "Master System Landscape & 4-Tier Topology",
                      "Multimodal Ingestion & Dynamic RDBMS Materialization Flow",
                      "Natural Language to SQL Execution Pipeline & Self-Healing",
                      "Triple-Pool Least-Privilege Security Isolation (HikariCP)",
                      "End-to-End Latency Runtime Profile"
                    ];
                    return (
                      <div 
                        key={i} 
                        className="overflow-hidden border border-[#F2F0EA]/10 bg-[#111111] rounded-xl shadow-xl"
                      >
                        <img
                          src={imgUrl}
                          alt={titles[i] || `${project.title} diagram ${i + 1}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                        <div className="p-4 bg-[#0D0D0D] border-t border-[#F2F0EA]/10 font-mono text-xs text-[#8E8E8E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-[#F2F0EA] font-semibold">{titles[i] || `DIAGRAM 0${i + 1}`}</span>
                          <span className="text-[10px] text-[#E10600] font-bold uppercase">// HRTE CORE ENGINE</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 05 — LATENCY PROFILE BENCHMARK TABLE */}
            {project.benchmarks && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    05 — LATENCY PROFILE & BENCHMARKS
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2F0EA] uppercase">
                  SUB-40MS END-TO-END EXECUTION
                </h2>
                <div className="border border-[#F2F0EA]/10 bg-[#0D0D0D] rounded-lg overflow-hidden">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#F2F0EA]/10 text-[#8E8E8E] uppercase tracking-wider bg-[#121212]">
                        <th className="py-3 px-4">Stage</th>
                        <th className="py-3 px-4">Operation</th>
                        <th className="py-3 px-4 hidden sm:table-cell">Micro-Engine</th>
                        <th className="py-3 px-4 text-right">Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F0EA]/5 text-[#A3A39B]">
                      {project.benchmarks.map((b, idx) => (
                        <tr key={idx} className="hover:bg-[#141414] transition-colors">
                          <td className="py-3 px-4 text-[#E10600] font-bold">{b.stage}</td>
                          <td className="py-3 px-4 text-[#F2F0EA]">{b.operation}</td>
                          <td className="py-3 px-4 hidden sm:table-cell text-[#8E8E8E]">{b.engine}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#F2F0EA]">{b.latency}</td>
                        </tr>
                      ))}
                      <tr className="bg-[#141414] font-bold border-t border-[#E10600]/30">
                        <td className="py-3 px-4 text-[#E10600]" colSpan={2}>Total Full Pipeline Execution</td>
                        <td className="py-3 px-4 hidden sm:table-cell text-[#8E8E8E]">HRTE Core Daemon</td>
                        <td className="py-3 px-4 text-right text-[#E10600]">~38 ms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 06 — TRIPLE-POOL SECURITY ISOLATION */}
            {project.securityPools && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    06 — SECURITY ISOLATION (HIKARICP)
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2F0EA] uppercase">
                  TRIPLE-POOL LEAST-PRIVILEGE ARCHITECTURE
                </h2>
                <div className="border border-[#F2F0EA]/10 bg-[#0D0D0D] rounded-lg overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs min-w-[540px]">
                    <thead>
                      <tr className="border-b border-[#F2F0EA]/10 text-[#8E8E8E] uppercase tracking-wider bg-[#121212]">
                        <th className="py-3 px-4">Pool</th>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Scope</th>
                        <th className="py-3 px-4">Max Conns</th>
                        <th className="py-3 px-4">Granted Privileges</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F0EA]/5 text-[#A3A39B]">
                      {project.securityPools.map((p, idx) => (
                        <tr key={idx} className="hover:bg-[#141414] transition-colors">
                          <td className="py-3 px-4 text-[#E10600] font-bold">{p.name}</td>
                          <td className="py-3 px-4 text-[#F2F0EA]">{p.user}</td>
                          <td className="py-3 px-4 text-[#8E8E8E]">{p.target}</td>
                          <td className="py-3 px-4 font-bold">{p.maxConns}</td>
                          <td className="py-3 px-4 text-[11px]">{p.privileges}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 07 — RESULTS & VERIFICATION */}
            {project.results && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
                    07 — RESULTS & ADVERSARIAL TESTING
                  </span>
                  <span className="h-px flex-1 bg-[#F2F0EA]/10" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2F0EA] uppercase">
                  87/87 TESTS PASSING & ZERO-MUTATION GUARANTEE
                </h2>
                <p className="text-base sm:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.results}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                  <div className="p-4 bg-[#111111] border border-[#F2F0EA]/10 rounded-sm space-y-1">
                    <span className="text-[#E10600] font-bold block">M01 AUTH SUITE</span>
                    <p className="text-[11px] text-[#8E8E8E]">Password entropy, sliding window rate limits, token revocation.</p>
                  </div>
                  <div className="p-4 bg-[#111111] border border-[#F2F0EA]/10 rounded-sm space-y-1">
                    <span className="text-[#E10600] font-bold block">M02 PRIVILEGE SUITE</span>
                    <p className="text-[11px] text-[#8E8E8E]">Tested on real MySQL instances to confirm sf_query_ro cannot write.</p>
                  </div>
                  <div className="p-4 bg-[#111111] border border-[#F2F0EA]/10 rounded-sm space-y-1">
                    <span className="text-[#E10600] font-bold block">M19 AST ADVERSARIAL</span>
                    <p className="text-[11px] text-[#8E8E8E]">SQL injection immunity, comment bypass rejection, cross-tenant isolation.</p>
                  </div>
                </div>
              </section>
            )}

            {/* 08 — WHAT I LEARNED */}
            {project.lessons && (
              <section className="space-y-4 p-6 sm:p-8 bg-[#111111] border-l-2 border-[#E10600] border-y border-r border-[#F2F0EA]/10 rounded-r-xl">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  08 — KEY TAKEAWAYS & RETROSPECTIVE
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F2F0EA]">
                  ARCHITECTURAL LESSONS FROM BUILDING AUTONOMOUS ENGINES
                </h2>
                <p className="text-sm sm:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.lessons}
                </p>
              </section>
            )}

            {/* 09 — LINKS & GITHUB REPO */}
            <div className="pt-8 border-t border-[#F2F0EA]/10 space-y-4">
              <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                09 — REPOSITORY & DOCUMENTATION
              </span>
              <div className="flex flex-wrap gap-4 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#E10600] text-white font-bold hover:bg-[#B00500] transition-colors rounded-sm shadow-xl shadow-[#E10600]/20"
                  >
                    <Github className="w-4 h-4" />
                    <span>EXPLORE SOURCE CODE ON GITHUB ↗</span>
                  </a>
                )}
                <Link
                  to="/work"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#141414] text-[#8E8E8E] hover:text-[#F2F0EA] border border-[#F2F0EA]/15 hover:border-[#E10600] transition-colors rounded-sm font-bold uppercase"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ALL PROJECTS</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
