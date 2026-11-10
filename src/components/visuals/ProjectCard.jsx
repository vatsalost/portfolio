import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Globe, Cpu } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Badge } from '../untitled/Badge';
import { BorderGlow } from '../bits/BorderGlow';
import { GlareHover } from '../bits/GlareHover';

export function ProjectCard({ project = {}, index = 0, layout = 'card' }) {
  const { playHover, playClick } = useAudio();
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
  const isInProgress = Boolean(project?.inProgress || project?.title === 'IN PROGRESS');

  // -------------------------------------------------------------
  // 1. Stack Layout (Used in ScrollStack for pinned 3D stacking)
  // -------------------------------------------------------------
  if (layout === 'stack') {
    if (isInProgress) {
      return (
        <BorderGlow
          borderRadius={16}
          glowRadius={32}
          backgroundColor="#101010"
          className="group/card flex flex-col w-full overflow-hidden shadow-2xl select-none"
          onMouseEnter={playHover}
        >
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-6 py-2.5 bg-[#161616] border-b border-[#F5F5F0]/10 font-mono text-xs select-none h-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                <span className="font-bold text-[#F5F5F0] tracking-wider group-hover/card:text-[#E10600] transition-colors">
                  [ {formattedIndex} // IN PROGRESS ]
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#8E8E8E]">
                <span className="px-2 py-0.5 bg-[#1F1F1F] text-[#E10600] border border-[#E10600]/30 text-[10px] font-bold tracking-wider">
                  IN PROGRESS
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-gradient-to-br from-[#131313] via-[#0F0F0F] to-[#0A0A0A] flex-1 flex flex-col items-center justify-center text-center min-h-[340px] relative">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30" />
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#E10600]/30 rounded-full font-mono text-[11px] text-[#E10600] tracking-widest uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-ping" />
                  <span>SPECIFICATION IN PROGRESS</span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase tracking-tight">
                  IN PROGRESS<span className="text-[#E10600]">.</span>
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed">
                  Project content and implementation showcase are currently being finalized.
                </p>
              </div>
            </div>
          </div>
        </BorderGlow>
      );
    }

    return (
      <BorderGlow
        borderRadius={16}
        glowRadius={32}
        backgroundColor="#111111"
        className="group/card flex flex-col w-full overflow-hidden shadow-2xl"
        onMouseEnter={playHover}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#161616] border-b border-[#F5F5F0]/10 font-mono text-xs select-none h-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="font-bold text-[#F5F5F0] tracking-wider group-hover/card:text-[#E10600] transition-colors">
                [ {formattedIndex} // {project.title?.toUpperCase()} ]
              </span>
              <span className="hidden sm:inline-block text-[11px] text-[#8E8E8E]">
                • {project.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#8E8E8E]">
              <span className="hidden md:inline">{project.year}</span>
              <span className="px-2 py-0.5 bg-[#1F1F1F] text-[#F5F5F0] border border-[#F5F5F0]/10 text-[10px] font-bold">
                {project.role || "BUILD"}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#131313] via-[#0F0F0F] to-[#0A0A0A] flex-1 flex flex-col justify-center min-h-[380px] md:min-h-[360px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
                <div>
                  <div className="mb-2">
                    <Badge variant={index === 0 ? "crimson" : "default"} size="sm">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="font-mono text-xs text-[#8E8E8E]">
                    {project.year} · {project.role || "Personal Project"}
                  </p>
                </div>
                {project.technicalHighlight && (
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F5F5F0] bg-[#161616] px-3 py-1.5 border border-[#F5F5F0]/10">
                      <Cpu className="w-3.5 h-3.5 text-[#E10600] flex-shrink-0" />
                      <span className="truncate max-w-[200px]">{project.technicalHighlight}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-3">
                <Link
                  to={`/project/${project.id}`}
                  onClick={playClick}
                  className="block group-hover/card:text-[#E10600] transition-colors"
                >
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F0] group-hover/card:text-[#E10600] transition-colors leading-tight">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-sm text-[#A3A39B] font-sans font-light leading-relaxed line-clamp-2 min-h-[2.75rem]">
                  {project.tagline || project.overview}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs text-[#8E8E8E] min-h-[26px]">
                  {project.stack?.slice(0, 5).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#181818] border border-[#F5F5F0]/5 text-[11px] text-[#A3A39B]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                  <Link
                    to={`/project/${project.id}`}
                    onClick={playClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E10600] text-white font-bold tracking-wider hover:bg-[#B00500] transition-colors rounded-sm"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 bg-[#161616] text-[#8E8E8E] hover:text-[#F5F5F0] border border-[#F5F5F0]/10 transition-colors rounded-sm"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>SRC</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4">
                <Link
                  to={`/project/${project.id}`}
                  onClick={playClick}
                  className="relative block aspect-[16/10] overflow-hidden bg-[#161616] border border-[#F5F5F0]/10 group-hover/card:border-[#E10600] transition-colors rounded-lg max-h-[240px]"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover duotone-hover group-hover/card:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/30 group-hover/card:bg-[#E10600]/10 transition-colors duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    );
  }

  // -------------------------------------------------------------
  // 2. Dominant Flagship Layout (Hero project on HomePage / WorkPage)
  // -------------------------------------------------------------
  if (layout === 'dominant') {
    if (isInProgress) {
      return (
        <BorderGlow
          borderRadius={20}
          glowRadius={40}
          backgroundColor="#0E0E0E"
          className="group relative w-full select-none"
          onMouseEnter={playHover}
        >
          <article className="p-8 sm:p-12 md:p-16 relative w-full flex flex-col justify-between min-h-[380px] md:min-h-[440px] rounded-[20px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-8 pb-4 border-b border-[#F2F0EA]/5">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} // PROJECT ]</span>
                <span className="px-2 py-0.5 bg-[#171717] border border-[#F2F0EA]/10 text-[#8E8E8E] text-[10px] tracking-wider uppercase font-mono">
                  DEVELOPMENT PIPELINE
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="px-2.5 py-0.5 bg-[#161616] text-[#E10600] border border-[#E10600]/30 font-bold tracking-wider">
                  STATUS // IN PROGRESS
                </span>
              </div>
            </div>

            <div className="relative z-10 my-auto py-8 text-center max-w-xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#161616] border border-[#E10600]/40 rounded-full font-mono text-xs text-[#E10600] tracking-widest uppercase font-bold shadow-lg shadow-[#E10600]/10">
                <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
                <span>PROJECT IN PROGRESS</span>
              </div>

              <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] tracking-tight uppercase leading-none">
                IN PROGRESS<span className="text-[#E10600]">.</span>
              </h3>

              <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-md mx-auto">
                Project documentation, codebase metrics, and architecture overview are currently in progress.
              </p>

              <div className="pt-3 max-w-xs mx-auto">
                <div className="h-1.5 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                  <div className="h-full bg-gradient-to-r from-[#E10600] via-[#FF3333] to-[#E10600] w-3/5 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#555555] pt-4 border-t border-[#F2F0EA]/5">
              <span>// BUILD PIPELINE ACTIVE</span>
              <span>SYSTEM SLOT: 0{index + 1}</span>
              <span>UPDATES COMING SOON</span>
            </div>
          </article>
        </BorderGlow>
      );
    }

    return (
      <BorderGlow
        borderRadius={20}
        glowRadius={42}
        backgroundColor="#0E0E0E"
        className="group relative w-full"
        onMouseEnter={playHover}
      >
        <article className="p-6 sm:p-10 md:p-14 relative w-full flex flex-col justify-between">
          {/* Top Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-6 pb-4 border-b border-[#F2F0EA]/10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} // DOMINANT BUILD ]</span>
              <span className="px-2.5 py-0.5 bg-[#171717] border border-[#F2F0EA]/10 text-[#F2F0EA] text-[10px] uppercase font-semibold">
                {project.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[#A3A39B]">
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.role || "Co-Creator / Core Engineer"}</span>
              <span className="px-2 py-0.5 bg-[#171717] border border-[#E10600]/30 text-[#E10600] text-[10px] font-bold">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Big Headline */}
          <div className="mb-6">
            <Link
              to={`/project/${project.id}`}
              onClick={playClick}
              className="inline-block group-hover:text-[#E10600] transition-colors duration-300"
            >
              <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight leading-none uppercase">
                {project.title}<span className="text-[#E10600]">.</span>
              </h3>
            </Link>
            {project.subtitle && (
              <p className="font-mono text-xs sm:text-sm text-[#E10600] uppercase tracking-wider mt-2 font-semibold">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Large Visual Display with GlareHover */}
          <Link
            to={`/project/${project.id}`}
            onClick={playClick}
            className="relative block aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#111111] border border-[#F2F0EA]/10 group-hover:border-[#E10600] transition-colors duration-500 rounded-lg mb-8 shadow-2xl"
          >
            <GlareHover borderRadius="8px" glareColor="rgba(225, 6, 0, 0.16)" glareMaxOpacity={0.25} className="w-full h-full">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-[#E10600]/10 transition-colors duration-500 pointer-events-none" />
              <div className="absolute top-4 right-4 p-2 bg-[#0A0A0A]/85 backdrop-blur-md border border-[#F2F0EA]/15 text-[#F2F0EA] opacity-0 group-hover:opacity-100 transition-opacity rounded-sm">
                <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
              </div>
            </GlareHover>
          </Link>

          {/* Narrative & Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-base sm:text-xl text-[#F2F0EA] font-sans font-light leading-relaxed">
                {project.tagline || project.overview}
              </p>
              {project.technicalHighlight && (
                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-[#F2F0EA] bg-[#141414] px-3.5 py-1.5 border border-[#F2F0EA]/10 rounded-sm">
                    <Cpu className="w-3.5 h-3.5 text-[#E10600] shrink-0" />
                    <span>{project.technicalHighlight}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col lg:items-end gap-4">
              <div className="flex flex-wrap lg:justify-end gap-1.5 font-mono text-xs">
                {project.stack?.slice(0, 6).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B] rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs pt-2">
                <Link
                  to={`/project/${project.id}`}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E10600] text-white font-bold tracking-wider hover:bg-[#B00500] transition-colors rounded-sm shadow-lg shadow-[#E10600]/20"
                >
                  <span>EXPLORE CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#141414] text-[#8E8E8E] hover:text-[#F2F0EA] border border-[#F2F0EA]/15 hover:border-[#E10600] transition-colors rounded-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GITHUB ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </BorderGlow>
    );
  }

  // -------------------------------------------------------------
  // 3. Featured Full-Bleed Layout (HomePage secondary projects)
  // -------------------------------------------------------------
  if (layout === 'full-bleed' || layout === 'featured') {
    if (isInProgress) {
      return (
        <BorderGlow
          borderRadius={18}
          glowRadius={34}
          backgroundColor="#0E0E0E"
          className="group relative w-full select-none"
          onMouseEnter={playHover}
        >
          <article className="p-6 sm:p-8 md:p-12 relative w-full flex flex-col justify-between min-h-[280px] md:min-h-[340px] rounded-[18px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-6 pb-3 border-b border-[#F2F0EA]/5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} // PROJECT ]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#171717] border border-[#E10600]/30 text-[#E10600] text-[10px] tracking-wider font-bold">
                  IN PROGRESS
                </span>
              </div>
            </div>

            <div className="relative z-10 my-auto py-6 text-center max-w-lg mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#161616] border border-[#E10600]/30 rounded-full font-mono text-[11px] text-[#E10600] tracking-widest uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
                <span>UNDER DEVELOPMENT</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F0EA] tracking-tight uppercase leading-none">
                IN PROGRESS<span className="text-[#E10600]">.</span>
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-sm mx-auto">
                Project case study and interactive demonstration will be published here upon completion.
              </p>
              <div className="pt-2 max-w-[200px] mx-auto">
                <div className="h-1 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                  <div className="h-full bg-[#E10600] w-1/2 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#555555] pt-3 border-t border-[#F2F0EA]/5">
              <span>// PIPELINE SLOT 0{index + 1}</span>
              <span>COMING SOON</span>
            </div>
          </article>
        </BorderGlow>
      );
    }

    return (
      <BorderGlow
        borderRadius={18}
        glowRadius={34}
        backgroundColor="#0E0E0E"
        className="group relative w-full"
        onMouseEnter={playHover}
      >
        <article className="p-6 sm:p-8 md:p-10 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex flex-col justify-between space-y-3">
              <span className="font-mono text-xs tracking-widest text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
                [ {formattedIndex} // PROJECT ]
              </span>
              <div>
                <div className="mb-2">
                  <Badge variant={index === 0 ? "crimson" : "default"} size="sm">
                    {project.category}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-[#8E8E8E] leading-relaxed">
                  {project.year} · {project.role || "Personal Project"}
                </p>
              </div>
              {project.technicalHighlight && (
                <div className="pt-1">
                  <span className="text-[11px] font-mono text-[#E10600] tracking-wider block">
                    {project.technicalHighlight.split('·')[0]}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="block"
              >
                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#F2F0EA] group-hover:text-[#E10600] transition-colors duration-300 tracking-tight leading-none uppercase">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm font-sans font-light text-[#A3A39B] leading-relaxed line-clamp-3">
                {project.tagline || project.overview}
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.stack?.slice(0, 4).map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#8E8E8E]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                <Link
                  to={`/project/${project.id}`}
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors"
                >
                  <span>CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="relative block aspect-[16/10] overflow-hidden bg-[#111111] border border-[#F2F0EA]/10 group-hover:border-[#E10600] transition-colors duration-500 rounded-lg"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#E10600]/10 transition-colors duration-500 pointer-events-none" />
              </Link>
            </div>
          </div>
        </article>
      </BorderGlow>
    );
  }

  // -------------------------------------------------------------
  // 4. Standard Card layout (for /work archive grid)
  // -------------------------------------------------------------
  if (isInProgress) {
    return (
      <BorderGlow
        borderRadius={14}
        glowRadius={32}
        edgeSensitivity={0}
        glowColor="0 100 50"
        colors={['#E10600', '#FF3333', '#8B0000']}
        backgroundColor="#101010"
        className="group h-full select-none"
        onMouseEnter={playHover}
      >
        <article className="relative flex flex-col h-full justify-between p-6 sm:p-8 min-h-[260px] overflow-hidden rounded-[14px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pb-3 border-b border-[#F5F5F0]/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} ]</span>
            </div>
            <span className="px-2 py-0.5 bg-[#171717] border border-[#E10600]/30 text-[#E10600] text-[10px] font-bold tracking-wider">
              IN PROGRESS
            </span>
          </div>

          <div className="relative z-10 my-auto py-6 text-center space-y-3">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight leading-tight uppercase">
              IN PROGRESS<span className="text-[#E10600]">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E8E] font-mono leading-relaxed max-w-xs mx-auto">
              Content currently in development.
            </p>
            <div className="pt-2 max-w-[140px] mx-auto">
              <div className="h-1 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                <div className="h-full bg-[#E10600] w-3/5 animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between font-mono text-[10px] text-[#555555]">
            <span>// QUEUE 0{index + 1}</span>
            <span className="text-[#E10600] font-semibold">COMING SOON</span>
          </div>
        </article>
      </BorderGlow>
    );
  }

  return (
    <BorderGlow
      borderRadius={14}
      glowRadius={32}
      edgeSensitivity={0}
      glowColor="0 100 50"
      colors={['#E10600', '#FF3333', '#8B0000']}
      backgroundColor="#101010"
      className="group h-full"
      onMouseEnter={playHover}
    >
      <article className="relative flex flex-col h-full justify-between overflow-hidden rounded-[14px]">
        {/* Top Half: Visual Preview */}
        <div>
          <Link
            to={`/project/${project.id}`}
            onClick={playClick}
            className="relative w-full aspect-[16/10] block bg-[#161616] overflow-hidden border-b border-[#F5F5F0]/10"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#E10600]/10 transition-colors duration-500 pointer-events-none" />

            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
              <Badge variant="default" size="sm">
                {project.category}
              </Badge>
              <span className="font-mono text-[10px] text-[#F5F5F0] px-2 py-0.5 bg-[#0A0A0A]/85 backdrop-blur-md border border-[#F5F5F0]/10">
                {project.year}
              </span>
            </div>
          </Link>

          {/* Card Body */}
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E]">
              <span>[ {formattedIndex} ]</span>
              {project.technicalHighlight && (
                <span className="text-[10px] text-[#E10600] font-mono tracking-wider">
                  {project.technicalHighlight.split('·')[0]}
                </span>
              )}
            </div>

            <Link
              to={`/project/${project.id}`}
              onClick={playClick}
              className="block"
            >
              <h3 className="font-display text-2xl font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors duration-300 tracking-tight leading-tight uppercase">
                {project.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-[#8E8E8E] font-sans font-light leading-relaxed line-clamp-2">
              {project.tagline || project.overview}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.stack?.slice(0, 4).map((item, i) => (
                <span key={i} className="text-[10px] font-mono text-[#8E8E8E] bg-[#161616] px-2 py-0.5 border border-[#F5F5F0]/5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer with Links */}
        <div className="px-6 py-4 border-t border-[#F5F5F0]/10 bg-[#0D0D0D] flex items-center justify-between font-mono text-xs">
          <Link
            to={`/project/${project.id}`}
            onClick={playClick}
            className="text-[#F5F5F0] group-hover:text-[#E10600] inline-flex items-center gap-1 uppercase tracking-wider font-bold transition-colors"
          >
            VIEW CASE STUDY <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600]" />
          </Link>

          <div className="flex items-center gap-3 text-[#8E8E8E]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F5F0] transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F5F5F0] transition-colors"
                title="Live Demo"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </article>
    </BorderGlow>
  );
}

export default ProjectCard;
