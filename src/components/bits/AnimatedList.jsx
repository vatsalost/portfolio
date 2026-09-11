import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export function AnimatedList({
  items = [],
  onItemClick,
  variant = 'table',
  renderItem,
  className = '',
  staggerMs = 80,
  durationMs = 400,
}) {
  const { playHover, playClick } = useAudio();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Row / Editorial variant for Right Now & custom lists
  if (variant === 'rows' || renderItem) {
    return (
      <div ref={containerRef} className={`space-y-3 ${className}`}>
        {items.map((item, idx) => {
          const delay = isVisible ? `${idx * staggerMs}ms` : '0ms';
          return (
            <div
              key={item.id || item.number || idx}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
                willChange: isVisible ? 'auto' : 'opacity, transform',
              }}
            >
              {renderItem ? renderItem(item, idx, isVisible) : (
                <div className="p-4 sm:p-5 border border-[#F2F0EA]/10 bg-[#0F0F0F] hover:bg-[#141414] hover:border-[#F2F0EA]/20 transition-colors duration-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 rounded-md">
                  <div className="font-mono text-xs text-[#F2F0EA] font-medium tracking-wide">
                    {item.number || `0${idx + 1}`} <span className="text-[#555555]">—</span> {item.label || item.title}
                  </div>
                  <div className="text-sm font-sans font-light text-[#8E8E8E] sm:text-right">
                    {item.description}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

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
                    {project.inProgress || project.title === 'IN PROGRESS' ? (
                      <span className="text-[#F2F0EA] tracking-wide">IN PROGRESS</span>
                    ) : (
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
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-0.5 bg-[#141414] border border-[#E10600]/30 text-[#E10600] text-[10px] uppercase font-semibold">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#8E8E8E] hidden md:table-cell">
                    {project.stack?.slice(0, 3).join(' · ')}
                  </td>
                  <td className="py-4 px-5 text-right">
                    {project.inProgress || project.title === 'IN PROGRESS' ? (
                      <span className="text-[#8E8E8E] text-[11px] font-mono tracking-wider">COMING SOON</span>
                    ) : (
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
                    )}
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
