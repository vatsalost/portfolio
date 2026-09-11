import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ArrowUpRight, Github } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { BorderGlow } from '../components/bits/BorderGlow';
import { AnimatedList } from '../components/bits/AnimatedList';
import { Magnet } from '../components/bits/Magnet';

export function WorkPage() {
  const { projects } = useProjects();
  const { playClick } = useAudio();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const inProgressListItems = useMemo(() => {
    return projects.map((p, idx) => ({
      ...p,
      title: 'IN PROGRESS',
      category: 'IN PROGRESS',
      year: '—',
      stack: ['IN PROGRESS'],
      inProgress: true,
    }));
  }, [projects]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Page Header (Editorial & Personal) */}
      <header className="mb-12 border-b border-[#F2F0EA]/10 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
            // SELECTED WORK
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#F2F0EA] leading-none">
          THINGS I'VE BUILT<span className="text-[#E10600]">.</span>
        </h1>
        <p className="mt-4 text-base md:text-lg font-sans font-light text-[#A3A39B] max-w-2xl leading-relaxed">
          Project showcases and documentation are currently in progress. Updates coming soon.
        </p>
      </header>

      {/* 2. Controls: Status indicator & View Switcher */}
      <nav aria-label="Project views" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#F2F0EA]/5 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
          <span className="text-[#8E8E8E] uppercase tracking-wider">
            STATUS: <strong className="text-[#F2F0EA]">ALL PROJECTS IN PROGRESS</strong> ({projects.length} SLOTS)
          </span>
        </div>

        {/* View Switcher: GRID vs LIST */}
        <div className="flex items-center self-start sm:self-auto border border-[#F2F0EA]/10 bg-[#141414] rounded-sm overflow-hidden flex-shrink-0">
          <button
            onClick={() => { playClick(); setViewMode('grid'); }}
            aria-pressed={viewMode === 'grid'}
            className={`p-2 transition-colors flex items-center gap-1.5 px-3.5 ${
              viewMode === 'grid'
                ? 'bg-[#E10600] text-white font-bold'
                : 'text-[#8E8E8E] hover:text-white'
            }`}
            title="Editorial Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider">GRID</span>
          </button>
          <button
            onClick={() => { playClick(); setViewMode('list'); }}
            aria-pressed={viewMode === 'list'}
            className={`p-2 transition-colors flex items-center gap-1.5 px-3.5 ${
              viewMode === 'list'
                ? 'bg-[#E10600] text-white font-bold'
                : 'text-[#8E8E8E] hover:text-white'
            }`}
            title="Technical Index List View"
          >
            <List className="w-3.5 h-3.5" />
            <span className="text-[11px] tracking-wider">LIST</span>
          </button>
        </div>
      </nav>

      {/* 4. Project Showcase (GRID Mode) */}
      {viewMode === 'grid' && (
        <div className="space-y-8 md:space-y-12">
          {/* Dominant Card 01 */}
          {projects[0] && (
            <ProjectCard
              project={projects[0]}
              index={0}
              layout="dominant"
            />
          )}

          {/* 2-Column Responsive Grid for remaining project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.slice(1).map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                index={idx + 1}
                layout="card"
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. Work Index / List View (LIST Mode) using AnimatedList */}
      {viewMode === 'list' && (
        <section aria-label="Technical Project Directory">
          <AnimatedList items={inProgressListItems} />
        </section>
      )}

      {/* 6. Small Experiments & Prototypes */}
      <section aria-label="Small Things & Experiments" className="mt-20 pt-16 border-t border-[#F2F0EA]/10">
        <div className="mb-8">
          <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block mb-2">// EXPERIMENTS</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#F2F0EA] uppercase tracking-tight">
            SMALL THINGS & PROTOTYPES<span className="text-[#E10600]">.</span>
          </h2>
          <p className="mt-2 text-sm text-[#8E8E8E] font-sans font-light max-w-xl">
            Smaller experiments, weekend scripts, and things I built to test concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "C++ Memory Allocator Toy",
              category: "Systems",
              year: "2024",
              desc: "A simple bump allocator and free-list to understand how malloc actually works under the hood.",
              stack: ["C++17", "CMake", "GDB"],
              github: "https://github.com/vatsalost/allocator-toy"
            },
            {
              title: "Terminal Matrix Rain in C",
              category: "CLI",
              year: "2024",
              desc: "Terminal digital rain using ANSI escape sequences and POSIX termios in pure C.",
              stack: ["C", "POSIX", "Terminal ANSI"],
              github: "https://github.com/vatsalost/c-matrix-rain"
            },
            {
              title: "Audio FFT Spectrum",
              category: "Audio",
              year: "2024",
              desc: "Web Audio API experiment testing AnalyserNode frequency bins and harmonic peaks.",
              stack: ["JavaScript", "Web Audio API", "Canvas"],
              github: "https://github.com/vatsalost/audio-fft-sandbox"
            },
            {
              title: "GLSL Raymarching Sphere",
              category: "Graphics",
              year: "2025",
              desc: "First attempt at writing an SDF raymarched sphere with soft shadows in a WebGL fragment shader.",
              stack: ["GLSL", "WebGL", "Math"],
              github: "https://github.com/vatsalost/glsl-sdf-sphere"
            }
          ].map((exp, idx) => (
            <div key={idx} className="p-5 bg-[#111111] border border-[#F2F0EA]/10 hover:border-[#E10600]/40 transition-colors rounded-md space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E]">
                <span className="px-2 py-0.5 bg-[#161616] border border-[#F2F0EA]/10 text-[10px] text-[#F2F0EA] uppercase font-semibold">
                  {exp.category}
                </span>
                <span>{exp.year}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F2F0EA]">
                {exp.title}
              </h3>
              <p className="text-xs text-[#A3A39B] font-sans font-light leading-relaxed">
                {exp.desc}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#F2F0EA]/5 font-mono text-[11px]">
                <span className="text-[#8E8E8E]">{exp.stack.join(' · ')}</span>
                <a
                  href={exp.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="text-[#8E8E8E] hover:text-[#F2F0EA] inline-flex items-center gap-1 transition-colors"
                >
                  <span>SRC</span>
                  <ArrowUpRight className="w-3 h-3 text-[#E10600]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Closing CTA Section */}
      <section aria-labelledby="cta-heading" className="mt-20 md:mt-28 pt-16 border-t border-[#F2F0EA]/10">
        <BorderGlow
          borderRadius={20}
          glowRadius={44}
          backgroundColor="#111111"
          className="p-8 md:p-14 text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#E10600] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
            <span>// CONNECT</span>
          </div>
          <h2 id="cta-heading" className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] uppercase tracking-tight">
            LET'S BUILD SOMETHING<span className="text-[#E10600]">.</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-[#A3A39B] max-w-xl mx-auto font-sans leading-relaxed">
            I'm open to hackathons, project collaborations, and interesting software ideas. If you have an idea or want to team up, reach out.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Magnet strength={0.35} reach={40}>
              <Link
                to="/contact"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E10600] text-white font-mono text-xs tracking-wider uppercase font-bold hover:bg-[#B00500] transition-colors rounded-sm shadow-lg shadow-[#E10600]/20"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
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
        </BorderGlow>
      </section>
    </div>
  );
}

export default WorkPage;
