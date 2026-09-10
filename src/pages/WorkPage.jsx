import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, Layers, ArrowUpRight, Search } from 'lucide-react';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { ScrollStack, ScrollStackItem } from '../components/bits/ScrollStack';

export function WorkPage() {
  const { projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'stack' | 'index'
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically derive unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category))).filter(Boolean);
    return ['All', ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Header */}
      <div className="mb-14 border-b border-[#F2F0EA]/10 pb-8">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-3">
          // ARCHIVE & DIRECTORY
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-[#F2F0EA]">
          PROJECT DIRECTORY<span className="text-[#E10600]">.</span>
        </h1>
        <p className="mt-4 text-base md:text-lg font-sans font-light text-[#A3A39B] max-w-2xl leading-relaxed">
          Systems tooling, algorithm visualizers, and web applications built during undergraduate coursework, hackathons, and independent experimentation.
        </p>
      </div>

      {/* 2. Controls: Category Filter, Search & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-[#F2F0EA]/5 font-mono text-xs">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 uppercase tracking-wider transition-colors rounded-sm ${
                selectedCategory === cat
                  ? 'bg-[#E10600] text-white font-bold'
                  : 'bg-[#141414] border border-[#F2F0EA]/10 text-[#8E8E8E] hover:text-[#F2F0EA] hover:border-[#F2F0EA]/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-4">
          <div className="relative flex-grow sm:w-64">
            <input
              type="text"
              placeholder="SEARCH BY STACK OR TITLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-[#F2F0EA]/10 px-3 py-2 pl-8 text-xs text-[#F2F0EA] placeholder-[#555555] focus:outline-none focus:border-[#E10600] tracking-wider rounded-sm"
            />
            <Search className="w-3.5 h-3.5 text-[#8E8E8E] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center border border-[#F2F0EA]/10 bg-[#141414] rounded-sm overflow-hidden">
            <button
              onClick={() => { playClick(); setViewMode('grid'); }}
              className={`p-2 transition-colors flex items-center gap-1.5 px-3 ${viewMode === 'grid' ? 'bg-[#E10600] text-white font-bold' : 'text-[#8E8E8E] hover:text-white'}`}
              title="Cards Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] hidden sm:inline tracking-wider">GRID</span>
            </button>
            <button
              onClick={() => { playClick(); setViewMode('stack'); }}
              className={`p-2 transition-colors flex items-center gap-1.5 px-3 ${viewMode === 'stack' ? 'bg-[#E10600] text-white font-bold' : 'text-[#8E8E8E] hover:text-white'}`}
              title="Animated Scroll Stack View"
            >
              <Layers className="w-4 h-4" />
              <span className="text-[10px] hidden sm:inline tracking-wider">STACK</span>
            </button>
            <button
              onClick={() => { playClick(); setViewMode('index'); }}
              className={`p-2 transition-colors flex items-center gap-1.5 px-3 ${viewMode === 'index' ? 'bg-[#E10600] text-white font-bold' : 'text-[#8E8E8E] hover:text-white'}`}
              title="Technical Index Table View"
            >
              <List className="w-4 h-4" />
              <span className="text-[10px] hidden sm:inline tracking-wider">INDEX</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center border border-[#F2F0EA]/10 bg-[#111111] rounded-lg">
          <p className="font-mono text-xs text-[#8E8E8E] uppercase tracking-widest mb-4">
            NO PROJECTS MATCHING CRITERIA
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="font-mono text-xs text-[#E10600] underline uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              layout="card"
            />
          ))}
        </div>
      ) : viewMode === 'stack' ? (
        /* ScrollStack Mode */
        <div className="py-4">
          <ScrollStack
            topOffset={96}
            itemStackDistance={24}
            itemScale={0.038}
            baseScale={0.82}
            scrollRunway={46}
          >
            {filteredProjects.map((project, idx) => (
              <ScrollStackItem key={project.id}>
                <ProjectCard
                  project={project}
                  index={idx}
                  layout="stack"
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      ) : (
        /* Technical Index Table Mode */
        <div className="border border-[#F2F0EA]/10 bg-[#111111] overflow-x-auto rounded-lg">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#F2F0EA]/10 text-[#8E8E8E] uppercase tracking-wider bg-[#0A0A0A]">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">PROJECT TITLE</th>
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">HIGHLIGHT</th>
                <th className="py-4 px-6">YEAR</th>
                <th className="py-4 px-6">STACK</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F0EA]/5">
              {filteredProjects.map((project, idx) => (
                <tr
                  key={project.id}
                  className="hover:bg-[#171717] transition-colors group"
                  onMouseEnter={playHover}
                >
                  <td className="py-4 px-6 text-[#8E8E8E] group-hover:text-[#E10600]">
                    [ {idx < 9 ? `0${idx + 1}` : idx + 1} ]
                  </td>
                  <td className="py-4 px-6 font-display font-bold text-sm text-[#F2F0EA] group-hover:text-[#E10600] transition-colors">
                    <Link to={`/project/${project.id}`} className="flex items-center gap-2">
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-[#8E8E8E]">
                    <span className="px-2 py-0.5 bg-[#0A0A0A] border border-[#F2F0EA]/10 text-[10px]">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#8E8E8E]">
                    {project.technicalHighlight || project.role || 'Software Engineering'}
                  </td>
                  <td className="py-4 px-6 text-[#8E8E8E]">{project.year}</td>
                  <td className="py-4 px-6 text-[#8E8E8E]">
                    {project.stack?.slice(0, 3).join(', ')}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-1 text-[#E10600] font-bold hover:underline"
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkPage;
