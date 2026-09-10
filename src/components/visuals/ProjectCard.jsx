import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Globe, Cpu } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Badge } from '../untitled/Badge';

export function ProjectCard({ project, index, layout = 'card' }) {
  const { playHover, playClick } = useAudio();
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

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

            {/* Direct Action Links */}
            <div className="flex items-center gap-4 pt-3 font-mono text-xs">
              <Link
                to={`/project/${project.id}`}
                onClick={playClick}
                className="inline-flex items-center gap-1.5 text-[#F5F5F0] hover:text-[#E10600] font-bold transition-colors"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600]" />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
                  title="Source Code on GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
                  title="Live Deployment"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>DEMO</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 3: Visual Preview */}
          <div className="lg:col-span-4">
            <Link
              to={`/project/${project.id}`}
              onClick={playClick}
              className="relative w-full block overflow-hidden bg-[#121212] border border-[#F5F5F0]/10 group-hover:border-[#E10600]/40 transition-colors"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-center duotone-hover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 right-3 p-2 bg-[#E10600] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 z-30">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard Card layout (for /work archive grid)
  return (
    <article
      className="group relative flex flex-col h-full justify-between bg-[#101010] border border-[#F5F5F0]/10 overflow-hidden transition-all duration-300 hover:border-[#E10600]/50"
      onMouseEnter={playHover}
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
  );
}
