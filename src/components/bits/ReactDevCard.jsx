import React, { useState, useRef } from 'react';
import { Copy, Check, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export function ReactDevCard({
  num = '01',
  filename = 'main.cpp',
  runtimeBadge = 'CS201',
  language = 'cpp',
  title = '',
  description = '',
  code = '',
  tags = [],
  metrics = null,
  icon: Icon = Terminal,
  spotlightColor = 'rgba(225, 6, 0, 0.18)',
  className = '',
}) {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { playClick, playHover } = useAudio();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyCode = (e) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between rounded-xl bg-[#0D0D0D] border border-[#F5F5F0]/10 overflow-hidden transition-all duration-300 hover:border-[#E10600]/40 hover:shadow-2xl hover:shadow-[#E10600]/10 ${className}`}
    >
      {/* ReactBits Dynamic Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />

      {/* Card Header: react.dev Style Code Window Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#F5F5F0]/10 select-none">
        {/* Window controls & file tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]/70 group-hover:bg-[#E10600] transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/10" />
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-xs text-[#F5F5F0]">
            <Icon className="w-3.5 h-3.5 text-[#E10600]" />
            <span className="font-bold">{filename}</span>
          </div>
        </div>

        {/* Runtime / Spec Badge & Copy button */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#1A1A1A] text-[#8E8E8E] border border-[#F5F5F0]/5">
            {runtimeBadge}
          </span>
          <button
            onClick={handleCopyCode}
            className="p-1.5 text-[#8E8E8E] hover:text-[#F5F5F0] hover:bg-[#1E1E1E] rounded transition-colors"
            title="Copy Code Snippet"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#E10600]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code Snippet Box (react.dev syntax styled) */}
      <div className="relative z-10 bg-[#0A0A0A]/90 p-4 font-mono text-xs leading-relaxed overflow-x-auto border-b border-[#F5F5F0]/10 scrollbar-thin">
        <pre className="text-[#8E8E8E]">
          <code>
            {code.split('\n').map((line, idx) => {
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
              const isKeyword = /\b(template|class|void|priority_queue|vector|uniform|varying|vec2|vec3|vec4|pub|async|fn|mut|Result|while|await|def|import|return)\b/.test(line);

              return (
                <div key={idx} className="table-row">
                  <span className="table-cell pr-4 text-[10px] text-[#555] select-none text-right w-6">
                    {idx + 1}
                  </span>
                  <span
                    className={`table-cell font-mono ${
                      isComment
                        ? 'text-[#666660] italic'
                        : isKeyword
                        ? 'text-[#F5F5F0]'
                        : 'text-[#A3A39B]'
                    }`}
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Card Body: Title, Description, and Badges */}
      <div className="relative z-10 p-6 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2 font-mono text-xs">
            <span className="text-[#E10600] font-bold tracking-wider">
              [ {num} // SPECIALIZATION ]
            </span>
            <span className="text-[10px] text-[#8E8E8E] uppercase tracking-widest">
              2ND YEAR CSE
            </span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F5F0] tracking-tight mb-2 group-hover:text-[#E10600] transition-colors">
            {title}
          </h3>

          <p className="text-xs sm:text-sm font-sans font-light text-[#8E8E8E] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Untitled UI Micro Tags */}
        <div className="pt-4 border-t border-[#F5F5F0]/10 flex flex-wrap items-center gap-1.5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#141414] border border-[#F5F5F0]/10 font-mono text-[11px] text-[#A3A39B] group-hover:border-[#E10600]/30 transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-[#E10600]" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
