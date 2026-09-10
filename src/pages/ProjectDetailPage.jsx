import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Globe, CheckCircle2, ChevronRight, Cpu, Layers, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '../context/ProjectContext';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';
import { Badge } from '../components/untitled/Badge';
import { DecryptedText } from '../components/bits/DecryptedText';
import { SpotlightCard } from '../components/bits/SpotlightCard';
import { TiltedCard } from '../components/bits/TiltedCard';

gsap.registerPlugin(ScrollTrigger);

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const project = getProjectById(id);

  const stickyColRef = useRef(null);
  const narrativeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="pt-48 pb-36 text-center max-w-lg mx-auto px-6">
        <h2 className="font-display text-4xl font-bold text-[#F5F5F0] mb-4">
          RECORD NOT LOCATED
        </h2>
        <p className="font-mono text-xs text-[#8E8E8E] mb-8">
          The project record you requested does not exist or has been removed from the archive.
        </p>
        <MagneticButton href="/work" variant="primary">
          RETURN TO DIRECTORY
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="w-full relative pt-28 pb-32">
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
            <span>RETURN TO ARCHIVE</span>
          </Link>
        </div>

        {/* Category & Title */}
        <div className="border-b border-[#F5F5F0]/10 pb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-xs">
            <Badge variant="crimson" size="sm">
              {project.category}
            </Badge>
            <span className="text-[#8E8E8E]">
              YEAR // {project.year}
            </span>
            <span className="text-[#8E8E8E]">
              ROLE // {project.role || 'Sole Developer'}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F5F0] tracking-tight uppercase leading-none mb-6">
            <DecryptedText
              text={project.title}
              speed={30}
              animateOn="hover"
            />
          </h1>

          <p className="font-mono text-sm md:text-base text-[#E10600] tracking-wide max-w-3xl">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* 2. Full-Bleed Hero Image with TiltedCard */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <TiltedCard maxRotation={3} scale={1.01} className="w-full">
          <div className="relative w-full aspect-[21/9] md:aspect-[24/10] overflow-hidden border border-[#F5F5F0]/10 bg-[#121212]">
            <img
              src={project.heroImage || project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover duotone-hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-50" />
          </div>
        </TiltedCard>
      </div>

      {/* 3. Storytelling Layout: Sticky Column + Narrative Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Pinned Sticky Metadata Sidebar with SpotlightCard */}
          <div 
            ref={stickyColRef}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
          >
            <SpotlightCard
              spotlightColor="rgba(225, 6, 0, 0.25)"
              className="p-8 space-y-6 bg-[#121212]/90 backdrop-blur-md border border-[#F5F5F0]/10 font-mono text-xs"
            >
              <div>
                <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1">
                  // ROLE
                </span>
                <p className="font-display font-bold text-base text-[#F5F5F0]">
                  {project.role || "Systems Developer"}
                </p>
              </div>

              {project.technicalHighlight && (
                <div className="pt-4 border-t border-[#F5F5F0]/10">
                  <span className="text-[10px] text-[#E10600] tracking-widest block uppercase mb-1">
                    // TECHNICAL HIGHLIGHT
                  </span>
                  <p className="font-mono text-xs text-[#F5F5F0] leading-relaxed">
                    {project.technicalHighlight}
                  </p>
                </div>
              )}

              {/* Live & Repository links */}
              <div className="space-y-3 pt-4 border-t border-[#F5F5F0]/10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHover}
                    className="flex items-center justify-between px-4 py-3 bg-[#E10600] text-white hover:bg-[#B00500] transition-colors font-bold tracking-wider"
                    data-cursor="open"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> LIVE DEMO / BUILD
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHover}
                    className="flex items-center justify-between px-4 py-3 border border-[#F5F5F0]/20 text-[#F5F5F0] hover:border-[#E10600] hover:text-[#E10600] transition-colors tracking-wider"
                    data-cursor="code"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" /> GITHUB SOURCE
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Technologies */}
              <div className="space-y-3 pt-4 border-t border-[#F5F5F0]/10">
                <span className="text-[10px] text-[#8E8E8E] tracking-widest block uppercase">
                  // APPLIED STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 bg-[#1A1A1A] border border-[#F5F5F0]/10 text-[#F5F5F0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Scrolling Case Study Narrative Column */}
          <div ref={narrativeRef} className="lg:col-span-8 space-y-12">
            {/* 1. Overview */}
            {project.overview && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 01 // OVERVIEW
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F0]">
                  WHAT IS THIS BUILD?
                </h2>
                <p className="text-base md:text-lg font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.overview}
                </p>
              </div>
            )}

            {/* 2. Problem Statement */}
            {project.problem && (
              <div className="space-y-3 p-6 md:p-8 bg-[#121212] border-l-2 border-[#E10600] border-y border-r border-[#F5F5F0]/10">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 02 // THE PROBLEM & MOTIVATION
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F5F5F0]">
                  WHY DID I BUILD THIS?
                </h2>
                <p className="text-sm md:text-base font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 3. Architecture & Approach */}
            {(project.architecture || project.approach) && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 03 // ARCHITECTURE & APPROACH
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F0]">
                  SYSTEM DESIGN & DATA FLOW
                </h2>
                <p className="text-base md:text-lg font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.architecture || project.approach}
                </p>
              </div>
            )}

            {/* 4. Technical Details */}
            {project.technicalDetails && (
              <div className="space-y-3 p-6 md:p-8 bg-[#121212] border border-[#F5F5F0]/10">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 04 // TECHNICAL IMPLEMENTATION
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F5F5F0]">
                  ENGINEERING DETAILS & CONSTRAINTS
                </h2>
                <p className="text-sm md:text-base font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.technicalDetails}
                </p>
              </div>
            )}

            {/* 5. Visual Evidence Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-4">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 05 // SYSTEM VISUALS & ARTIFACTS
                </span>
                <div className="space-y-6">
                  {project.gallery.map((imgUrl, i) => (
                    <div 
                      key={i} 
                      className="overflow-hidden border border-[#F5F5F0]/10 bg-[#121212] group relative"
                      data-cursor="inspect"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} plate ${i + 1}`}
                        className="w-full h-auto object-cover duotone-hover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="p-3 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 font-mono text-[11px] text-[#8E8E8E] flex justify-between">
                        <span>PLATE // 0{i + 1}</span>
                        <span>SYSTEM ARTIFACT</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Real Results & Validation */}
            {(project.results || project.solution) && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 06 // RESULTS & OUTCOMES
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F0]">
                  REAL WORKING RESULTS
                </h2>
                <p className="text-base md:text-lg font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.results || project.solution}
                </p>
              </div>
            )}

            {/* 7. Lessons Learned */}
            {project.lessons && (
              <div className="space-y-3 p-6 md:p-8 bg-[#121212] border-l-2 border-[#E10600] border-y border-r border-[#F5F5F0]/10">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // 07 // WHAT I LEARNED
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-[#F5F5F0]">
                  ENGINEERING RETROSPECTIVE
                </h2>
                <p className="text-sm md:text-base font-light text-[#8E8E8E] font-sans leading-relaxed">
                  {project.lessons}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Next Project Launcher */}
      {nextProject && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 pt-16 border-t border-[#F5F5F0]/10">
          <Link
            to={`/project/${nextProject.id}`}
            onClick={playClick}
            className="group block p-8 md:p-16 bg-[#121212] border border-[#F5F5F0]/10 hover:border-[#E10600] transition-colors duration-500"
            data-cursor="next"
          >
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#8E8E8E]">
              <span className="text-[#E10600] uppercase tracking-widest">// NEXT CASE STUDY</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1 text-[#F5F5F0]">
                PROCEED <ChevronRight className="w-4 h-4 text-[#E10600]" />
              </span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F5F5F0] group-hover:text-[#E10600] transition-colors tracking-tight uppercase">
              {nextProject.title}
            </h3>
            <p className="font-mono text-xs text-[#8E8E8E] mt-3">{nextProject.tagline}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
