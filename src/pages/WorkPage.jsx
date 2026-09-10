import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ArrowUpRight, Search, Filter } from 'lucide-react';
import { ProjectCard } from '../components/visuals/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import { useAudio } from '../context/AudioContext';
import { Badge } from '../components/untitled/Badge';
import { DecryptedText } from '../components/bits/DecryptedText';

export function WorkPage() {
  const { projects } = useProjects();
  const { playClick, playHover } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'index'
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hackathons & AI', 'Digital Products', 'Brand Systems'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-16 border-b border-[#F5F5F0]/10 pb-8">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
          // ARCHIVE DIRECTORY // 2ND YEAR CSE
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-[#F5F5F0] tracking-tight uppercase">
          <DecryptedText
            text="PROJECT ARCHIVE."
            speed={40}
            animateOn="hover"
          />
        </h1>
        <p className="mt-4 text-sm md:text-base font-light text-[#8E8E8E] max-w-xl">
          Comprehensive repository of collegiate hackathon grand prize builds, 3D algorithm visualizers, campus platforms, and high-velocity developer tools.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-[#F5F5F0]/5 font-mono text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#E10600] text-white font-bold shadow-md shadow-[#E10600]/30'
                  : 'bg-[#121212] border border-[#F5F5F0]/10 text-[#8E8E8E] hover:text-[#F5F5F0] hover:border-[#F5F5F0]/25'
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
              placeholder="FILTER BY STACK OR TITLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-[#F5F5F0]/10 px-3 py-2 pl-8 text-xs text-[#F5F5F0] placeholder-[#8E8E8E] focus:outline-none focus:border-[#E10600] tracking-wider"
            />
            <Search className="w-3.5 h-3.5 text-[#8E8E8E] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center border border-[#F5F5F0]/10 bg-[#121212]">
            <button
              onClick={() => { playClick(); setViewMode('grid'); }}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#E10600] text-white' : 'text-[#8E8E8E] hover:text-white'}`}
              title="Cards Grid View"
              data-cursor="click"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => { playClick(); setViewMode('index'); }}
              className={`p-2 transition-colors ${viewMode === 'index' ? 'bg-[#E10600] text-white' : 'text-[#8E8E8E] hover:text-white'}`}
              title="Brutalist Index Table View"
              data-cursor="click"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center border border-[#F5F5F0]/10 bg-[#121212]">
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
      ) : (
        /* Brutalist Index Table Mode */
        <div className="border border-[#F5F5F0]/10 bg-[#121212] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#F5F5F0]/10 text-[#8E8E8E] uppercase tracking-wider bg-[#0A0A0A]/50">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">PROJECT TITLE</th>
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">CLIENT / EVENT</th>
                <th className="py-4 px-6">YEAR</th>
                <th className="py-4 px-6">TECH STACK</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F0]/5">
              {filteredProjects.map((project, idx) => (
                <tr
                  key={project.id}
                  className="hover:bg-[#1A1A1A] transition-colors group"
                  onMouseEnter={playHover}
                >
                  <td className="py-4 px-6 text-[#8E8E8E] group-hover:text-[#E10600]">
                    [ {idx < 9 ? `0${idx + 1}` : idx + 1} ]
                  </td>
                  <td className="py-4 px-6 font-display font-bold text-sm text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                    <Link to={`/project/${project.id}`} className="flex items-center gap-2">
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-[#8E8E8E]">
                    <span className="px-2 py-0.5 bg-[#0A0A0A] border border-[#F5F5F0]/10 text-[10px]">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#8E8E8E]">{project.client}</td>
                  <td className="py-4 px-6 text-[#8E8E8E]">{project.year}</td>
                  <td className="py-4 px-6 text-[#8E8E8E]">
                    {project.stack?.slice(0, 3).join(', ')}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-1 text-[#E10600] hover:underline"
                    >
                      OPEN <ArrowUpRight className="w-3.5 h-3.5" />
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
