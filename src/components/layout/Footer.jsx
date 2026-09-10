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
    <footer className="border-t border-[#F2F0EA]/10 bg-[#0A0A0A] py-16 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        {/* Identity Block */}
        <div className="space-y-3">
          <span className="font-display font-black text-2xl md:text-3xl text-[#F2F0EA] tracking-tight block">
            VATSAL CHAUDHARY<span className="text-[#E10600]">.</span>
          </span>
          <p className="font-mono text-xs text-[#8E8E8E] leading-relaxed">
            B.Tech Computer Science & Engineering<br />
            Symbiosis Institute of Technology, Pune
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-[#E10600] font-bold pt-1">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span>OPEN TO HACKATHONS + COLLABORATIONS</span>
          </div>
        </div>

        {/* Links & Year Block */}
        <div className="flex flex-col md:items-end space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors tracking-wider"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <div className="text-[11px] text-[#555555] tracking-widest">
            © 2026 // ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
