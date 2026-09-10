import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export function Footer() {
  const { playClick, playHover } = useAudio();

  const links = [
    { label: 'GITHUB', href: 'https://github.com/vatsalost' },
    { label: 'LINKEDIN', href: 'https://linkedin.com' },
    { label: 'EMAIL', href: 'mailto:vatslchaudhary@gmail.com' }
  ];

  return (
    <footer className="border-t border-[#F2F0EA]/10 bg-[#0A0A0A] py-16 md:py-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#F2F0EA]/5">
          {/* Identity Block */}
          <div className="space-y-4">
            <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2F0EA] tracking-tight block">
              VATSAL CHAUDHARY<span className="text-[#E10600]">.</span>
            </span>
            <p className="font-mono text-xs text-[#8E8E8E] leading-relaxed">
              B.Tech Computer Science & Engineering<br />
              Symbiosis Institute of Technology, Pune · 2023–2027
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E10600] font-bold pt-1">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span>OPEN TO HACKATHONS + COLLABORATIONS</span>
            </div>
          </div>

          {/* Links Block */}
          <div className="flex flex-col md:items-end space-y-4 font-mono text-xs">
            <span className="text-[11px] text-[#8E8E8E] uppercase tracking-widest block md:text-right">
              // DIRECT CHANNELS
            </span>
            <div className="flex flex-wrap items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 text-[#F2F0EA] hover:text-[#E10600] transition-colors tracking-wider font-semibold group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8E8E] group-hover:text-[#E10600] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-[#666666]">
          <div className="flex items-center gap-4">
            <span>DESIGNED & BUILT WITH PRECISION</span>
            <span>•</span>
            <span>NO TEMPLATES</span>
          </div>
          <div className="tracking-widest">
            © 2026 VATSAL CHAUDHARY // ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
