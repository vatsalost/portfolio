import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ArrowUpRight, Github, Cpu, ArrowRight } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { BorderGlow } from '../components/bits/BorderGlow';
import { SpotlightCard } from '../components/bits/SpotlightCard';
import { GlareHover } from '../components/bits/GlareHover';
import { AnimatedList } from '../components/bits/AnimatedList';
import { Magnet } from '../components/bits/Magnet';

export function WorkPage() {
  const { projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Derive categories dynamically from actual project data
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projects.map(p => p.category?.toUpperCase()))).filter(Boolean);
    return ['ALL', ...rawCategories];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projects;
    return projects.filter(p => p.category?.toUpperCase() === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Page Header (Editorial & Personal) */}
      <header className="mb-12 border-b border-[#F2F0EA]/10 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
            // SELECTED WORK
          </span>
          <span className="h-px w-12 bg-[#F2F0EA]/10" />
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest hidden sm:inline">
            [ 06 BUILDS CATALOGUED ]
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#F2F0EA] leading-none">
          THINGS I'VE BUILT<span className="text-[#E10600]">.</span>
        </h1>
        <p className="mt-4 text-base md:text-lg font-sans font-light text-[#A3A39B] max-w-2xl leading-relaxed">
          Projects built through coursework, hackathons, and independent experimentation.
        </p>
      </header>

      {/* 2. Simplified Controls: Horizontally scrollable category strip & View Switcher */}
      <nav aria-label="Project filters and views" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#F2F0EA]/5 font-mono text-xs">
        {/* Category Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-2 uppercase tracking-wider transition-colors rounded-sm flex-shrink-0 text-xs ${
                selectedCategory === cat
                  ? 'bg-[#E10600] text-white font-bold shadow-sm shadow-[#E10600]/30'
                  : 'bg-[#141414] border border-[#F2F0EA]/10 text-[#8E8E8E] hover:text-[#F2F0EA] hover:border-[#F2F0EA]/25'
              }`}
            >
              {cat}
            </button>
          ))}
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

      {/* 3. Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-24 text-center border border-[#F2F0EA]/10 bg-[#111111] rounded-lg">
          <p className="font-mono text-xs text-[#8E8E8E] uppercase tracking-widest mb-4">
            NO PROJECTS FOUND IN THIS CATEGORY
          </p>
          <button
            onClick={() => { setSelectedCategory('ALL'); }}
            className="font-mono text-xs text-[#E10600] underline uppercase hover:text-white transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      )}

      {/* 4. Editorial Rhythm View (GRID Mode) */}
      {viewMode === 'grid' && filteredProjects.length > 0 && (
        <div className="space-y-14 md:space-y-20">
          {/* Project 01: Dominant Featured Layout */}
          {filteredProjects[0] && (
            <section aria-labelledby={`title-${filteredProjects[0].id}`}>
              <SpotlightCard
                className="group relative w-full overflow-hidden rounded-xl"
                spotlightColor="rgba(225, 6, 0, 0.18)"
                borderColor="rgba(225, 6, 0, 0.6)"
                borderRadius="16px"
                onMouseEnter={playHover}
              >
                <article className="p-6 sm:p-8 md:p-10 lg:p-12">
                  {/* Top Meta Line */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#8E8E8E] mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                      <span className="text-[#E10600] font-bold tracking-widest">[ 01 // FEATURED BUILD ]</span>
                      <span className="px-2 py-0.5 bg-[#181818] border border-[#F2F0EA]/10 text-[#F2F0EA] text-[10px] uppercase font-semibold">
                        {filteredProjects[0].category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span>{filteredProjects[0].year}</span>
                      <span>·</span>
                      <span className="uppercase">{filteredProjects[0].role || 'Personal Project'}</span>
                    </div>
                  </div>

                  {/* Prominent Title */}
                  <Link
                    to={`/project/${filteredProjects[0].id}`}
                    onClick={playClick}
                    className="block group-hover:text-[#E10600] transition-colors mb-5"
                  >
                    <h2
                      id={`title-${filteredProjects[0].id}`}
                      className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight leading-tight uppercase transition-colors"
                    >
                      {filteredProjects[0].title}
                    </h2>
                  </Link>

                  {/* Large Prominent Visual with GlareHover */}
                  <Link
                    to={`/project/${filteredProjects[0].id}`}
                    onClick={playClick}
                    className="relative block aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg mb-8"
                  >
                    <GlareHover borderRadius="8px" glareColor="rgba(225, 6, 0, 0.16)" glareMaxOpacity={0.2} className="w-full h-full">
                      <img
                        src={filteredProjects[0].thumbnail}
                        alt={filteredProjects[0].title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />
                    </GlareHover>
                  </Link>

                  {/* Narrative & Action Bar */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <p className="text-base sm:text-lg font-light text-[#D5D3CC] font-sans leading-relaxed line-clamp-2">
                        {filteredProjects[0].tagline || filteredProjects[0].overview}
                      </p>
                      {filteredProjects[0].technicalHighlight && (
                        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8E8E] bg-[#141414] px-3 py-1 border border-[#F2F0EA]/10">
                          <Cpu className="w-3.5 h-3.5 text-[#E10600]" />
                          <span className="text-[#F2F0EA]">{filteredProjects[0].technicalHighlight}</span>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-4 flex flex-col lg:items-end gap-4">
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {filteredProjects[0].stack?.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B]">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links with Arrow Nudge */}
                      <div className="flex items-center gap-3 font-mono text-xs pt-1">
                        <Link
                          to={`/project/${filteredProjects[0].id}`}
                          onClick={playClick}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E10600] text-white font-bold tracking-wider hover:bg-[#B00500] transition-colors rounded-sm group/btn"
                        >
                          <span>CASE STUDY</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                        {filteredProjects[0].githubUrl && (
                          <a
                            href={filteredProjects[0].githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={playClick}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#141414] text-[#8E8E8E] hover:text-[#F2F0EA] border border-[#F2F0EA]/10 hover:border-[#F2F0EA]/30 transition-colors rounded-sm"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GITHUB ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </SpotlightCard>
            </section>
          )}

          {/* Project 02: Horizontal Split Layout */}
          {filteredProjects[1] && (
            <section aria-labelledby={`title-${filteredProjects[1].id}`} className="pt-6 border-t border-[#F2F0EA]/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8E8E8E]">
                    <span className="text-[#E10600] font-bold tracking-widest">[ 02 // {filteredProjects[1].category?.toUpperCase()} ]</span>
                    <span>·</span>
                    <span>{filteredProjects[1].year}</span>
                    <span>·</span>
                    <span className="uppercase">{filteredProjects[1].role || 'Systems Project'}</span>
                  </div>

                  <Link
                    to={`/project/${filteredProjects[1].id}`}
                    onClick={playClick}
                    className="block group-hover:text-[#E10600] transition-colors"
                  >
                    <h2
                      id={`title-${filteredProjects[1].id}`}
                      className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight uppercase leading-tight transition-colors"
                    >
                      {filteredProjects[1].title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base font-light text-[#D5D3CC] font-sans leading-relaxed line-clamp-2">
                    {filteredProjects[1].tagline || filteredProjects[1].overview}
                  </p>

                  {filteredProjects[1].technicalHighlight && (
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8E8E] bg-[#141414] px-3 py-1 border border-[#F2F0EA]/10">
                      <Cpu className="w-3.5 h-3.5 text-[#E10600]" />
                      <span className="text-[#F2F0EA]">{filteredProjects[1].technicalHighlight}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                    {filteredProjects[1].stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                    <Link
                      to={`/project/${filteredProjects[1].id}`}
                      onClick={playClick}
                      className="inline-flex items-center gap-1.5 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors group/link"
                    >
                      <span>EXPLORE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E10600] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    {filteredProjects[1].githubUrl && (
                      <a
                        href={filteredProjects[1].githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>SRC ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <Link
                    to={`/project/${filteredProjects[1].id}`}
                    onClick={playClick}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg"
                  >
                    <img
                      src={filteredProjects[1].thumbnail}
                      alt={filteredProjects[1].title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-colors" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Project 03: Asymmetric Layout (Visual Left, Narrative Right) */}
          {filteredProjects[2] && (
            <section aria-labelledby={`title-${filteredProjects[2].id}`} className="pt-6 border-t border-[#F2F0EA]/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <Link
                    to={`/project/${filteredProjects[2].id}`}
                    onClick={playClick}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg"
                  >
                    <img
                      src={filteredProjects[2].thumbnail}
                      alt={filteredProjects[2].title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-colors" />
                  </Link>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8E8E8E]">
                    <span className="text-[#E10600] font-bold tracking-widest">[ 03 // {filteredProjects[2].category?.toUpperCase()} ]</span>
                    <span>·</span>
                    <span>{filteredProjects[2].year}</span>
                    <span>·</span>
                    <span className="uppercase">{filteredProjects[2].role || 'Research Prototype'}</span>
                  </div>

                  <Link
                    to={`/project/${filteredProjects[2].id}`}
                    onClick={playClick}
                    className="block group-hover:text-[#E10600] transition-colors"
                  >
                    <h2
                      id={`title-${filteredProjects[2].id}`}
                      className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight uppercase leading-tight transition-colors"
                    >
                      {filteredProjects[2].title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base font-light text-[#D5D3CC] font-sans leading-relaxed line-clamp-2">
                    {filteredProjects[2].tagline || filteredProjects[2].overview}
                  </p>

                  {filteredProjects[2].technicalHighlight && (
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8E8E] bg-[#141414] px-3 py-1 border border-[#F2F0EA]/10">
                      <Cpu className="w-3.5 h-3.5 text-[#E10600]" />
                      <span className="text-[#F2F0EA]">{filteredProjects[2].technicalHighlight}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                    {filteredProjects[2].stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                    <Link
                      to={`/project/${filteredProjects[2].id}`}
                      onClick={playClick}
                      className="inline-flex items-center gap-1.5 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors group/link"
                    >
                      <span>EXPLORE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E10600] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    {filteredProjects[2].githubUrl && (
                      <a
                        href={filteredProjects[2].githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>SRC ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Projects 04 & 05: Editorial 2-Column Grid Pair */}
          {(filteredProjects[3] || filteredProjects[4]) && (
            <section className="pt-6 border-t border-[#F2F0EA]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Project 04 */}
                {filteredProjects[3] && (
                  <article aria-labelledby={`title-${filteredProjects[3].id}`} className="group space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E] pb-2 border-b border-[#F2F0EA]/5">
                      <span className="text-[#E10600] font-bold tracking-widest">[ 04 // {filteredProjects[3].category?.toUpperCase()} ]</span>
                      <span>{filteredProjects[3].year}</span>
                    </div>

                    <Link
                      to={`/project/${filteredProjects[3].id}`}
                      onClick={playClick}
                      className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg"
                    >
                      <img
                        src={filteredProjects[3].thumbnail}
                        alt={filteredProjects[3].title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </Link>

                    <Link
                      to={`/project/${filteredProjects[3].id}`}
                      onClick={playClick}
                      className="block group-hover:text-[#E10600] transition-colors"
                    >
                      <h2
                        id={`title-${filteredProjects[3].id}`}
                        className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight uppercase leading-tight transition-colors"
                      >
                        {filteredProjects[3].title}
                      </h2>
                    </Link>

                    <p className="text-sm font-light text-[#A3A39B] font-sans leading-relaxed line-clamp-2">
                      {filteredProjects[3].tagline || filteredProjects[3].overview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {filteredProjects[3].stack?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#141414] border border-[#F2F0EA]/10 text-[10px] text-[#A3A39B]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between font-mono text-xs">
                      <Link
                        to={`/project/${filteredProjects[3].id}`}
                        onClick={playClick}
                        className="inline-flex items-center gap-1 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors group/link"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                      {filteredProjects[3].githubUrl && (
                        <a
                          href={filteredProjects[3].githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={playClick}
                          className="text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                )}

                {/* Project 05 */}
                {filteredProjects[4] && (
                  <article aria-labelledby={`title-${filteredProjects[4].id}`} className="group space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E] pb-2 border-b border-[#F2F0EA]/5">
                      <span className="text-[#E10600] font-bold tracking-widest">[ 05 // {filteredProjects[4].category?.toUpperCase()} ]</span>
                      <span>{filteredProjects[4].year}</span>
                    </div>

                    <Link
                      to={`/project/${filteredProjects[4].id}`}
                      onClick={playClick}
                      className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg"
                    >
                      <img
                        src={filteredProjects[4].thumbnail}
                        alt={filteredProjects[4].title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </Link>

                    <Link
                      to={`/project/${filteredProjects[4].id}`}
                      onClick={playClick}
                      className="block group-hover:text-[#E10600] transition-colors"
                    >
                      <h2
                        id={`title-${filteredProjects[4].id}`}
                        className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight uppercase leading-tight transition-colors"
                      >
                        {filteredProjects[4].title}
                      </h2>
                    </Link>

                    <p className="text-sm font-light text-[#A3A39B] font-sans leading-relaxed line-clamp-2">
                      {filteredProjects[4].tagline || filteredProjects[4].overview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {filteredProjects[4].stack?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#141414] border border-[#F2F0EA]/10 text-[10px] text-[#A3A39B]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between font-mono text-xs">
                      <Link
                        to={`/project/${filteredProjects[4].id}`}
                        onClick={playClick}
                        className="inline-flex items-center gap-1 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors group/link"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                      {filteredProjects[4].githubUrl && (
                        <a
                          href={filteredProjects[4].githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={playClick}
                          className="text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                )}
              </div>
            </section>
          )}

          {/* Project 06: Compact Full-Width Showcase */}
          {filteredProjects[5] && (
            <section aria-labelledby={`title-${filteredProjects[5].id}`} className="pt-6 border-t border-[#F2F0EA]/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8E8E8E]">
                    <span className="text-[#E10600] font-bold tracking-widest">[ 06 // {filteredProjects[5].category?.toUpperCase()} ]</span>
                    <span>·</span>
                    <span>{filteredProjects[5].year}</span>
                  </div>

                  <Link
                    to={`/project/${filteredProjects[5].id}`}
                    onClick={playClick}
                    className="block group-hover:text-[#E10600] transition-colors"
                  >
                    <h2
                      id={`title-${filteredProjects[5].id}`}
                      className="font-display font-black text-3xl sm:text-4xl text-[#F2F0EA] group-hover:text-[#E10600] tracking-tight uppercase leading-tight transition-colors"
                    >
                      {filteredProjects[5].title}
                    </h2>
                  </Link>

                  <p className="text-sm font-light text-[#D5D3CC] font-sans leading-relaxed line-clamp-2">
                    {filteredProjects[5].tagline || filteredProjects[5].overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {filteredProjects[5].stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[11px] text-[#A3A39B]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                    <Link
                      to={`/project/${filteredProjects[5].id}`}
                      onClick={playClick}
                      className="inline-flex items-center gap-1.5 text-[#F2F0EA] hover:text-[#E10600] font-bold tracking-wider transition-colors group/link"
                    >
                      <span>EXPLORE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E10600] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    {filteredProjects[5].githubUrl && (
                      <a
                        href={filteredProjects[5].githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>SRC ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <Link
                    to={`/project/${filteredProjects[5].id}`}
                    onClick={playClick}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#141414] border border-[#F2F0EA]/10 group-hover:border-[#E10600]/50 transition-colors rounded-lg"
                  >
                    <img
                      src={filteredProjects[5].thumbnail}
                      alt={filteredProjects[5].title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-colors" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* 5. Work Index / List View (LIST Mode) using AnimatedList */}
      {viewMode === 'list' && filteredProjects.length > 0 && (
        <section aria-label="Technical Project Directory">
          <AnimatedList items={filteredProjects} />
        </section>
      )}

      {/* 6. Closing CTA Section (Fixes empty space at bottom of page) */}
      <section aria-labelledby="cta-heading" className="mt-20 md:mt-28 pt-16 border-t border-[#F2F0EA]/10">
        <BorderGlow
          borderRadius={20}
          glowRadius={44}
          backgroundColor="#111111"
          className="p-8 md:p-14 text-center space-y-6"
          onMouseEnter={playHover}
        >
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#E10600] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
            <span>// NEXT STEP</span>
          </div>
          <h2 id="cta-heading" className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F2F0EA] uppercase tracking-tight">
            HAVE AN IDEA<span className="text-[#E10600]">?</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-[#A3A39B] max-w-xl mx-auto font-sans leading-relaxed">
            I'm open to hackathons, project collaborations, and interesting engineering challenges. If you're looking for a teammate or want to build something together, get in touch.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Magnet strength={0.22} maxDistance={75}>
              <Link
                to="/contact"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E10600] text-white font-mono text-xs tracking-wider uppercase font-bold hover:bg-[#B00500] transition-colors rounded-sm shadow-lg shadow-[#E10600]/20"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Magnet>
            <Magnet strength={0.22} maxDistance={75}>
              <a
                href="https://github.com/vatsalost"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#171717] text-[#F2F0EA] border border-[#F2F0EA]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors rounded-sm"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB PROFILE ↗</span>
              </a>
            </Magnet>
          </div>
        </BorderGlow>
      </section>
    </div>
  );
}

export default WorkPage;
