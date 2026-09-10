import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export function AnimatedList({ items = [], onItemClick }) {
  const { playHover, playClick } = useAudio();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="border border-[#F2F0EA]/10 bg-[#0D0D0D] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#F2F0EA]/10 text-[#8E8E8E] uppercase tracking-wider bg-[#121212]">
              <th scope="col" className="py-4 px-5">#</th>
              <th scope="col" className="py-4 px-5">YEAR</th>
              <th scope="col" className="py-4 px-5">PROJECT</th>
              <th scope="col" className="py-4 px-5">CATEGORY</th>
              <th scope="col" className="py-4 px-5 hidden md:table-cell">CORE STACK</th>
              <th scope="col" className="py-4 px-5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F0EA]/5">
            {items.map((project, idx) => {
              const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
              const isHovered = hoveredIdx === idx;

              return (
                <tr
                  key={project.id}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isHovered ? 'bg-[#171717]' : 'hover:bg-[#151515]'
                  }`}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    playHover();
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <td className="py-4 px-5 text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
                    [ {numStr} ]
                  </td>
                  <td className="py-4 px-5 text-[#8E8E8E]">{project.year}</td>
                  <td className="py-4 px-5 font-display font-bold text-base text-[#F2F0EA] transition-all duration-200">
                    <Link
                      to={`/project/${project.id}`}
                      onClick={() => {
                        playClick();
                        if (onItemClick) onItemClick(project);
                      }}
                      className="inline-flex items-center gap-2 hover:text-[#E10600]"
                      style={{
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease',
                      }}
                    >
                      <span>{project.title}</span>
                    </Link>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-0.5 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-[10px] uppercase font-semibold">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#8E8E8E] hidden md:table-cell">
                    {project.stack?.slice(0, 3).join(' · ')}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      to={`/project/${project.id}`}
                      onClick={() => {
                        playClick();
                        if (onItemClick) onItemClick(project);
                      }}
                      className="inline-flex items-center gap-1 text-[#F2F0EA] hover:text-[#E10600] font-bold transition-colors"
                    >
                      <span>CASE STUDY</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{
                          transform: isHovered ? 'translateX(3px)' : 'translateX(0px)',
                        }}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnimatedList;
