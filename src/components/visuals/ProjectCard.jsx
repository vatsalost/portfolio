import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { BorderGlow } from '../bits/BorderGlow';

export function ProjectCard({ project, index = 0, layout = 'card' }) {
  const { playHover } = useAudio();
  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  // Stack Layout (Used in ScrollStack for pinned 3D stacking)
  if (layout === 'stack') {
    return (
      <BorderGlow
        borderRadius={16}
        glowRadius={32}
        backgroundColor="#101010"
        className="group/card flex flex-col w-full overflow-hidden shadow-2xl select-none"
        onMouseEnter={playHover}
      >
        <div className="flex flex-col w-full">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#161616] border-b border-[#F5F5F0]/10 font-mono text-xs select-none h-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="font-bold text-[#F5F5F0] tracking-wider group-hover/card:text-[#E10600] transition-colors">
                [ {formattedIndex} // IN PROGRESS ]
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#8E8E8E]">
              <span className="px-2 py-0.5 bg-[#1F1F1F] text-[#E10600] border border-[#E10600]/30 text-[10px] font-bold tracking-wider">
                IN PROGRESS
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-[#131313] via-[#0F0F0F] to-[#0A0A0A] flex-1 flex flex-col items-center justify-center text-center min-h-[340px] relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30" />
            <div className="relative z-10 space-y-4 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#E10600]/30 rounded-full font-mono text-[11px] text-[#E10600] tracking-widest uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-ping" />
                <span>SPECIFICATION IN PROGRESS</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase tracking-tight">
                IN PROGRESS<span className="text-[#E10600]">.</span>
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed">
                Project content and implementation showcase are currently being finalized.
              </p>
            </div>
          </div>
        </div>
      </BorderGlow>
    );
  }

  // Dominant Flagship Layout (Hero project on HomePage or top of /work)
  if (layout === 'dominant') {
    return (
      <BorderGlow
        borderRadius={20}
        glowRadius={40}
        backgroundColor="#0E0E0E"
        className="group relative w-full select-none"
        onMouseEnter={playHover}
      >
        <article className="p-8 sm:p-12 md:p-16 relative w-full flex flex-col justify-between min-h-[380px] md:min-h-[440px] rounded-[20px] overflow-hidden">
          {/* Cybernetic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          {/* Top Meta Line */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-8 pb-4 border-b border-[#F2F0EA]/5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} // PROJECT ]</span>
              <span className="px-2 py-0.5 bg-[#171717] border border-[#F2F0EA]/10 text-[#8E8E8E] text-[10px] tracking-wider uppercase font-mono">
                DEVELOPMENT PIPELINE
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="px-2.5 py-0.5 bg-[#161616] text-[#E10600] border border-[#E10600]/30 font-bold tracking-wider">
                STATUS // IN PROGRESS
              </span>
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 my-auto py-8 text-center max-w-xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#161616] border border-[#E10600]/40 rounded-full font-mono text-xs text-[#E10600] tracking-widest uppercase font-bold shadow-lg shadow-[#E10600]/10">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              <span>PROJECT IN PROGRESS</span>
            </div>

            <h3 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F2F0EA] tracking-tight uppercase leading-none">
              IN PROGRESS<span className="text-[#E10600]">.</span>
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-md mx-auto">
              Project documentation, codebase metrics, and architecture overview are currently in progress.
            </p>

            {/* Glowing animated progress line */}
            <div className="pt-3 max-w-xs mx-auto">
              <div className="h-1.5 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                <div className="h-full bg-gradient-to-r from-[#E10600] via-[#FF3333] to-[#E10600] w-3/5 animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#555555] pt-4 border-t border-[#F2F0EA]/5">
            <span>// BUILD PIPELINE ACTIVE</span>
            <span>SYSTEM SLOT: 0{index + 1}</span>
            <span>UPDATES COMING SOON</span>
          </div>
        </article>
      </BorderGlow>
    );
  }

  // Featured Full-Bleed Layout (HomePage secondary projects & WorkPage featured)
  if (layout === 'full-bleed' || layout === 'featured') {
    return (
      <BorderGlow
        borderRadius={18}
        glowRadius={34}
        backgroundColor="#0E0E0E"
        className="group relative w-full select-none"
        onMouseEnter={playHover}
      >
        <article className="p-6 sm:p-8 md:p-12 relative w-full flex flex-col justify-between min-h-[280px] md:min-h-[340px] rounded-[18px] overflow-hidden">
          {/* Subtle tech grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30" />

          {/* Top Meta Line */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E] mb-6 pb-3 border-b border-[#F2F0EA]/5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} // PROJECT ]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#171717] border border-[#E10600]/30 text-[#E10600] text-[10px] tracking-wider font-bold">
                IN PROGRESS
              </span>
            </div>
          </div>

          {/* Main Center Message */}
          <div className="relative z-10 my-auto py-6 text-center max-w-lg mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#161616] border border-[#E10600]/30 rounded-full font-mono text-[11px] text-[#E10600] tracking-widest uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
              <span>UNDER DEVELOPMENT</span>
            </div>

            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F0EA] tracking-tight uppercase leading-none">
              IN PROGRESS<span className="text-[#E10600]">.</span>
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#8E8E8E] leading-relaxed max-w-sm mx-auto">
              Project case study and interactive demonstration will be published here upon completion.
            </p>

            <div className="pt-2 max-w-[200px] mx-auto">
              <div className="h-1 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
                <div className="h-full bg-[#E10600] w-1/2 animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#555555] pt-3 border-t border-[#F2F0EA]/5">
            <span>// PIPELINE SLOT 0{index + 1}</span>
            <span>COMING SOON</span>
          </div>
        </article>
      </BorderGlow>
    );
  }

  // Standard Card layout (for /work archive grid)
  return (
    <BorderGlow
      borderRadius={14}
      glowRadius={32}
      edgeSensitivity={0}
      glowColor="0 100 50"
      colors={['#E10600', '#FF3333', '#8B0000']}
      backgroundColor="#101010"
      className="group h-full select-none"
      onMouseEnter={playHover}
    >
      <article className="relative flex flex-col h-full justify-between p-6 sm:p-8 min-h-[260px] overflow-hidden rounded-[14px]">
        {/* Subtle tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#8E8E8E] pb-3 border-b border-[#F5F5F0]/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-[#E10600] font-bold tracking-widest">[ {formattedIndex} ]</span>
          </div>
          <span className="px-2 py-0.5 bg-[#171717] border border-[#E10600]/30 text-[#E10600] text-[10px] font-bold tracking-wider">
            IN PROGRESS
          </span>
        </div>

        {/* Card Body */}
        <div className="relative z-10 my-auto py-6 text-center space-y-3">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight leading-tight uppercase">
            IN PROGRESS<span className="text-[#E10600]">.</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#8E8E8E] font-mono leading-relaxed max-w-xs mx-auto">
            Content currently in development.
          </p>

          <div className="pt-2 max-w-[140px] mx-auto">
            <div className="h-1 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
              <div className="h-full bg-[#E10600] w-3/5 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 pt-3 border-t border-[#F5F5F0]/10 flex items-center justify-between font-mono text-[10px] text-[#555555]">
          <span>// QUEUE 0{index + 1}</span>
          <span className="text-[#E10600] font-semibold">COMING SOON</span>
        </div>
      </article>
    </BorderGlow>
  );
}
