import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Globe, Cpu } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Badge } from '../untitled/Badge';
import { BorderGlow } from '../bits/BorderGlow';

export function ProjectCard({ project, index, layout = 'card' }) {
  const { playHover, playClick } = useAudio();
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  // Stack Layout (Used in ScrollStack for pinned 3D stacking)
  if (layout === 'stack') {
    return (
      <div 
        className="group/card bg-[#111111] border border-[#F5F5F0]/12 hover:border-[#E10600]/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col w-full"
        onMouseEnter={playHover}
      >
        {/* Persistent Stack Header Bar (stays visible as top tab when subsequent cards stack) */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#161616] border-b border-[#F5F5F0]/10 font-mono text-xs select-none h-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="font-bold text-[#F5F5F0] tracking-wider group-hover/card:text-[#E10600] transition-colors">
              [ {formattedIndex} // {project.title.toUpperCase()} ]
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

        {/* Main Card Body - Uniform Height for Exact Card Parity */}
        <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#131313] via-[#0F0F0F] to-[#0A0A0A] flex-1 flex flex-col justify-center min-h-[380px] md:min-h-[360px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Col 1: Index, Tag & Meta */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
              <div>
                <div className="mb-2">
                  <Badge variant={index === 0 ? "crimson" : "default"} size="sm">
                    {project.category}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-[#8E8E8E]">
                  {project.year} // {project.role || "Developer"}
                </p>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F5F5F0] bg-[#161616] px-3 py-1.5 border border-[#F5F5F0]/10">
                  <Cpu className="w-3.5 h-3.5 text-[#E10600] flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{project.technicalHighlight || "Systems Architecture · Full Stack"}</span>
                </span>
              </div>
            </div>

            {/* Col 2: Title, Overview, Stack, Links */}
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E10600] text-white font-bold tracking-wider hover:bg-[#B00500] transition-colors"
                  data-cursor="explore"
                >
                  <span>EXPLORE CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-[#161616] text-[#8E8E8E] hover:text-[#F5F5F0] border border-[#F5F5F0]/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SRC</span>
                  </a>
                )}
              </div>
            </div>

            {/* Col 3: Visual Canvas Preview */}
            <div className="lg:col-span-4">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="relative block aspect-[16/10] overflow-hidden bg-[#161616] border border-[#F5F5F0]/10 group-hover/card:border-[#E10600] transition-colors rounded-lg max-h-[240px]"
                data-cursor="view"
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
    );
  }

  // Dominant Flagship Layout (Hero project on HomePage)
  if (layout === 'dominant') {
    return (
      <article
        className="group relative w-full border-t border-[#F2F0EA]/10 pt-10 pb-16 transition-colors duration-500 hover:border-[#E10600]"
        onMouseEnter={playHover}
      >
        {/* Top Meta Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-[#E10600] font-bold tracking-widest">[ 01 // DOMINANT BUILD ]</span>
            <span className="px-2 py-0.5 bg-[#171717] border border-[#F2F0EA]/10 text-[#F2F0EA] text-[10px]">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>{project.year}</span>
            <span>//</span>
            <span>{project.role || "Developer"}</span>
          </div>
        </div>

        {/* Big Headline */}
        <Link
          to={`/project/${project.id}`}
          onClick={playClick}
          className="block group-hover:text-[#E10600] transition-colors duration-300 mb-8"
        >
          <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight leading-none uppercase">
            {project.title}
          </h3>
        </Link>

        {/* Dominant Large Visual Display */}
        <Link
          to={`/project/${project.id}`}
          onClick={playClick}
          className="relative block aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#111111] border border-[#F2F0EA]/10 group-hover:border-[#E10600] transition-colors duration-500 rounded-lg mb-8"
          data-cursor="view"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-[#E10600]/10 transition-colors duration-500" />
        </Link>

        {/* Narrative & Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-base sm:text-lg text-[#A3A39B] font-sans font-light leading-relaxed">
              {project.tagline || project.overview}
            </p>
            {project.technicalHighlight && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F2F0EA] bg-[#141414] px-3 py-1 border border-[#F2F0EA]/10">
                  <Cpu className="w-3.5 h-3.5 text-[#E10600]" />
                  <span>{project.technicalHighlight}</span>
                </span>
              </div>
            )}
          </div>

          <div className="md:col-span-4 flex flex-col md:items-end gap-4">
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs pt-2">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E10600] text-white font-bold tracking-wider hover:bg-[#B00500] transition-colors"
                data-cursor="explore"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-[#141414] text-[#8E8E8E] hover:text-[#F2F0EA] border border-[#F2F0EA]/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>SRC</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Featured Full-Bleed Layout (Top 3 on HomePage)
  if (layout === 'full-bleed' || layout === 'featured') {
    return (
      <article
        className="group relative w-full border-t border-[#F5F5F0]/10 py-12 md:py-16 transition-colors duration-500 hover:border-[#E10600]"
        onMouseEnter={playHover}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Col 1: Index & Category */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-3">
            <span className="font-mono text-xs tracking-widest text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
              [ {formattedIndex} // FEATURED BUILD ]
            </span>
            <div>
              <div className="mb-2">
                <Badge variant={index === 0 ? "crimson" : "default"} size="sm">
                  {project.category}
                </Badge>
              </div>
              <p className="font-mono text-xs text-[#8E8E8E] leading-relaxed">
                {project.year} // {project.role || "Developer"}
              </p>
            </div>

            {/* Technical highlight if present */}
            {project.technicalHighlight && (
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#F5F5F0] bg-[#141414] px-2.5 py-1 border border-[#F5F5F0]/10">
                  <Cpu className="w-3 h-3 text-[#E10600]" />
                  <span>{project.technicalHighlight}</span>
                </span>
              </div>
            )}
          </div>

          {/* Col 2: Title, What It Is, Stack, and Links */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to={`/project/${project.id}`}
              onClick={playClick}
              className="block group-hover:text-[#E10600] transition-colors duration-300"
            >
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F5F5F0] group-hover:text-[#E10600] transition-colors leading-none">
                {project.title}
              </h3>
            </Link>

            {/* Concise One-Sentence Explanation (WHAT IS IT?) */}
            <p className="text-sm sm:text-base text-[#A3A39B] font-sans font-light leading-relaxed">
              {project.tagline || project.overview}
            </p>

            {/* Technologies (WHAT DID I USE?) */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#8E8E8E]">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-[#121212] border border-[#F5F5F0]/5 text-[11px] text-[#A3A39B]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link Actions */}
            <div className="pt-2 flex items-center gap-4 font-mono text-xs">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="inline-flex items-center gap-1.5 text-[#F5F5F0] hover:text-[#E10600] font-bold tracking-wider transition-colors"
                data-cursor="explore"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
              </Link>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>SRC</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Visual Canvas Preview */}
          <div className="lg:col-span-4">
            <Link
              to={`/project/${project.id}`}
              onClick={playClick}
              className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F5F5F0]/10 group-hover:border-[#E10600] transition-colors"
              data-cursor="view"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#E10600]/10 transition-colors duration-500" />
              <div className="absolute top-3 right-3 p-2 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#F5F5F0]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard Card layout (for /work archive grid)
  return (
    <BorderGlow
      borderRadius={12}
      glowRadius={32}
      edgeSensitivity={22}
      glowColor="0 100 50"
      colors={['#E10600', '#FF3333', '#8B0000']}
      backgroundColor="#101010"
      className="group h-full"
      onMouseEnter={playHover}
    >
      <article
        className="relative flex flex-col h-full justify-between overflow-hidden"
      >
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

          {/* Top Badges */}
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
            <h3 className="font-display text-2xl font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors duration-300 tracking-tight leading-tight">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-[#8E8E8E] font-sans font-light leading-relaxed line-clamp-2">
            {project.tagline || project.overview}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack?.slice(0, 3).map((item, i) => (
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
          VIEW PROJECT <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600]" />
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
              <Github className="w-3.5 h-3.5" />
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
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  </BorderGlow>
);
}
