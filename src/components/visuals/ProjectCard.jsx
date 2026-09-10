import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { TiltedCard } from '../bits/TiltedCard';
import { DecryptedText } from '../bits/DecryptedText';
import { Badge } from '../untitled/Badge';

export function ProjectCard({ project, index, layout = 'card' }) {
  const { playHover } = useAudio();
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  if (layout === 'full-bleed') {
    return (
      <div 
        className="group relative w-full border-t border-[#F5F5F0]/10 py-12 md:py-16 transition-colors duration-500 hover:border-[#E10600]"
        onMouseEnter={playHover}
        data-cursor="view"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Index & Category */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-3">
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
              [ {formattedIndex} // CASE STUDY ]
            </span>
            <div>
              <div className="mb-2">
                <Badge variant={index % 2 === 0 ? "crimson" : "default"}>
                  {project.category}
                </Badge>
              </div>
              <p className="font-mono text-xs text-[#8E8E8E]">{project.tagline}</p>
            </div>
          </div>

          {/* Title & Client */}
          <div className="lg:col-span-5 space-y-4">
            <Link to={`/project/${project.id}`} className="block">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F5F0] group-hover:text-[#E10600] transition-colors duration-300 leading-tight">
                <DecryptedText
                  text={project.title}
                  speed={30}
                  animateOn="hover"
                  className="font-display"
                />
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-[#8E8E8E] line-clamp-3 font-sans font-light leading-relaxed">
              {project.overview}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack?.slice(0, 4).map((tech, i) => (
                <span key={i} className="text-[11px] font-mono text-[#8E8E8E] bg-[#121212] px-2 py-0.5 border border-[#F5F5F0]/5">
                  #{tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Preview */}
          <div className="lg:col-span-4">
            <Link 
              to={`/project/${project.id}`} 
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
      </div>
    );
  }

  // Standard Card layout (editorial grid)
  return (
    <div
      className="group relative flex flex-col bg-[#121212] border border-[#F5F5F0]/10 overflow-hidden transition-all duration-500 hover:border-[#E10600]/50"
      onMouseEnter={playHover}
      data-cursor="view"
    >
      {/* Image Thumbnail */}
      <Link 
        to={`/project/${project.id}`}
        className="relative w-full aspect-[16/10] block bg-[#1A1A1A] overflow-hidden"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover duotone-hover group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#E10600]/10 transition-colors duration-500 pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <Badge variant="default" size="sm">
            {project.category}
          </Badge>
          <span className="font-mono text-xs text-[#F5F5F0] px-2 py-0.5 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#F5F5F0]/10">
            {project.year}
          </span>
        </div>

        {/* Hover Arrow Icon */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#E10600] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-10 shadow-lg shadow-[#E10600]/40 pointer-events-none">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <div className="flex items-center justify-between font-mono text-xs text-[#8E8E8E] mb-3">
            <span>[ {formattedIndex} ]</span>
            <span>{project.client}</span>
          </div>

          <Link to={`/project/${project.id}`}>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors duration-300 tracking-tight mb-2 leading-tight">
              <DecryptedText
                text={project.title}
                speed={25}
                animateOn="hover"
                className="font-display"
              />
            </h3>
          </Link>

          <p className="text-xs text-[#8E8E8E] font-sans font-light leading-relaxed line-clamp-3">
            {project.overview}
          </p>
        </div>

        <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack?.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[10px] font-mono text-[#8E8E8E]">
                #{item}
              </span>
            ))}
          </div>

          <Link
            to={`/project/${project.id}`}
            className="font-mono text-xs text-[#F5F5F0] group-hover:text-[#E10600] flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            EXPLORE <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
