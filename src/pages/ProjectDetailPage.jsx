import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Globe, ChevronRight, Cpu } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { Badge } from '../components/untitled/Badge';

export function ProjectDetailPage() {
  const { id } = useParams();
  const { getProjectById, projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const project = getProjectById(id);

  const stickyColRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentIndex = projects.findIndex(p => p.id === id);
  const formattedIndex = currentIndex >= 0 ? (currentIndex < 9 ? `0${currentIndex + 1}` : `${currentIndex + 1}`) : '01';
  const nextProject = projects[(currentIndex + 1) % projects.length];

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
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#B00500] transition-colors"
        >
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

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
            data-cursor="back"
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
              ROLE // {project.role || 'Developer'}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F2F0EA] tracking-tight uppercase leading-none mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl font-sans font-light text-[#A3A39B] max-w-3xl leading-relaxed mb-6">
            {project.tagline || project.overview}
          </p>

          {/* Action Links & Tech Pills */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[#F2F0EA]/10">
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA]"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141414] text-[#F2F0EA] border border-[#F2F0EA]/15 font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB ↗</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E10600] text-white font-bold hover:bg-[#B00500] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>LIVE DEMO ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-[#F2F0EA]/10 bg-[#111111] rounded-lg">
          <img
            src={project.heroImage || project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Case Study Structure */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Sidebar */}
          <div 
            ref={stickyColRef}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
          >
            <div className="p-8 space-y-6 bg-[#111111] border border-[#F2F0EA]/10 font-mono text-xs rounded-lg">
              <div>
                <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1">
                  // ROLE & SCOPE
                </span>
                <p className="font-display font-bold text-base text-[#F2F0EA]">
                  {project.role || "Developer"}
                </p>
                <p className="text-[#8E8E8E] text-[11px] pt-1">
                  {project.category} · {project.year}
                </p>
              </div>

              {project.technicalHighlight && (
                <div className="pt-4 border-t border-[#F2F0EA]/10">
                  <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1">
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
                <span className="text-[10px] text-[#8E8E8E] tracking-widest block uppercase">
                  // TECHNOLOGIES USED
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 bg-[#171717] border border-[#F2F0EA]/10 text-[#F2F0EA]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Structured Case Study Narrative */}
          <div className="lg:col-span-8 space-y-12">
            {/* 01 — OVERVIEW */}
            {project.overview && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  01 — OVERVIEW
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F2F0EA]">
                  PROJECT SUMMARY
                </h2>
                <p className="text-base md:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.overview}
                </p>
              </div>
            )}

            {/* 02 — THE IDEA */}
            {project.problem && (
              <div className="space-y-3 p-6 md:p-8 bg-[#111111] border-l-2 border-[#E10600] border-y border-r border-[#F2F0EA]/10 rounded-r-lg">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  02 — THE IDEA & MOTIVATION
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F2F0EA]">
                  WHY I BUILT THIS
                </h2>
                <p className="text-sm md:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 03 — HOW IT WORKS */}
            {(project.architecture || project.approach) && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  03 — HOW IT WORKS
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F2F0EA]">
                  SYSTEM DESIGN & FLOW
                </h2>
                <p className="text-base md:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.architecture || project.approach}
                </p>
              </div>
            )}

            {/* 04 — TECHNICAL DETAILS */}
            {project.technicalDetails && (
              <div className="space-y-3 p-6 md:p-8 bg-[#111111] border border-[#F2F0EA]/10 rounded-lg">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  04 — TECHNICAL DETAILS
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F2F0EA]">
                  IMPLEMENTATION & ALGORITHMS
                </h2>
                <p className="text-sm md:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.technicalDetails}
                </p>
              </div>
            )}

            {/* Visual Artifacts Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-4">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  PROJECT SCREENSHOTS & PREVIEWS
                </span>
                <div className="space-y-6">
                  {project.gallery.map((imgUrl, i) => (
                    <div 
                      key={i} 
                      className="overflow-hidden border border-[#F2F0EA]/10 bg-[#111111] rounded-lg"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="p-3 bg-[#0A0A0A] border-t border-[#F2F0EA]/10 font-mono text-[11px] text-[#8E8E8E] flex justify-between">
                        <span>SCREENSHOT 0{i + 1}</span>
                        <span>{project.title.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 05 — RESULTS */}
            {(project.results || project.solution) && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  05 — RESULTS
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F2F0EA]">
                  OUTCOMES & FUNCTIONALITY
                </h2>
                <p className="text-base md:text-lg font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.results || project.solution}
                </p>
              </div>
            )}

            {/* 06 — WHAT I LEARNED */}
            {project.lessons && (
              <div className="space-y-3 p-6 md:p-8 bg-[#111111] border-l-2 border-[#E10600] border-y border-r border-[#F2F0EA]/10 rounded-r-lg">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  06 — WHAT I LEARNED
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F2F0EA]">
                  KEY TAKEAWAYS & RETROSPECTIVE
                </h2>
                <p className="text-sm md:text-base font-light text-[#A3A39B] font-sans leading-relaxed">
                  {project.lessons}
                </p>
              </div>
            )}

            {/* 07 — LINKS */}
            <div className="pt-6 border-t border-[#F2F0EA]/10 space-y-4">
              <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                07 — LINKS
              </span>
              <div className="flex flex-wrap gap-4 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] border border-[#F2F0EA]/15 text-[#F2F0EA] hover:border-[#E10600] hover:text-[#E10600] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW SOURCE CODE ON GITHUB ↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E10600] text-white font-bold hover:bg-[#B00500] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>OPEN LIVE DEMO ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Next Project Navigation */}
      {nextProject && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-28 pt-16 border-t border-[#F2F0EA]/10">
          <Link
            to={`/project/${nextProject.id}`}
            onClick={playClick}
            className="group block p-8 md:p-14 bg-[#111111] border border-[#F2F0EA]/10 hover:border-[#E10600] transition-colors duration-500 rounded-xl"
            data-cursor="next"
          >
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#8E8E8E]">
              <span className="text-[#E10600] uppercase tracking-widest">// NEXT PROJECT</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1 text-[#F2F0EA]">
                VIEW PROJECT <ChevronRight className="w-4 h-4 text-[#E10600]" />
              </span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] group-hover:text-[#E10600] transition-colors tracking-tight uppercase">
              {nextProject.title}
            </h3>
            <p className="font-mono text-xs text-[#8E8E8E] mt-3">{nextProject.tagline}</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailPage;
