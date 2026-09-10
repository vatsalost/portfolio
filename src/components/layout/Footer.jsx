import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { MarqueeTicker } from '../ui/MarqueeTicker';
import { useAudio } from '../../context/AudioContext';

export function Footer() {
  const { playClick, playHover } = useAudio();
  const [localTime, setLocalTime] = useState('');
  const [tokyoTime, setTokyoTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      const tokyo = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
      setTokyoTime(tokyo.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'GITHUB', href: 'https://github.com/vatsalost', icon: Github },
    { label: 'LINKEDIN', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'EMAIL', href: 'mailto:vatslchaudhary@gmail.com', icon: Mail }
  ];

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#F5F5F0]/10 pt-16 pb-12 overflow-hidden select-none">
      {/* High-Velocity Running Marquee */}
      <div className="py-6 border-b border-[#F5F5F0]/10 mb-16">
        <MarqueeTicker
          items={[
            "VATSAL CHAUDHARY",
            "B.TECH COMPUTER SCIENCE & ENGINEERING",
            "SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE",
            "C · C++ · JAVA · HTML · CSS",
            "OPEN TO HACKATHONS & COLLABORATIONS",
            "BUILDING PROJECTS & EXPERIMENTING"
          ]}
          speed="30s"
          highlightRed={true}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Big CTA Column */}
          <div className="md:col-span-6 lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
              // COLLABORATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.1rem] lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold tracking-tight text-[#F5F5F0] leading-[1.08] max-w-md">
              BUILD<br />
              SOMETHING?
            </h2>
            <p className="text-sm sm:text-base font-light text-[#8E8E8E] max-w-md font-sans">
              I'm open to hackathons, collaborations, and interesting projects.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                onClick={playClick}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#E10600] text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#B00500] transition-colors"
                data-cursor="contact"
              >
                <span>CONTACT ME</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/vatsalost"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#141414] text-[#F5F5F0] border border-[#F5F5F0]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 lg:col-span-3 md:pl-4 lg:pl-8 space-y-4">
            <span className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase">
              // DIRECTORY
            </span>
            <ul className="space-y-3 font-mono text-xs">
              {['INDEX // 01', 'WORK // 02', 'ABOUT // 03', 'CONTACT // 04', 'ADMIN // 05'].map((item, idx) => {
                const paths = ['/', '/work', '/about', '/contact', '/admin'];
                return (
                  <li key={idx}>
                    <Link
                      to={paths[idx]}
                      onMouseEnter={playHover}
                      className="group relative inline-block text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors py-1"
                    >
                      <span>{item}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E10600] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Links & Time Column */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <span className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-4">
                // NETWORK
              </span>
              <ul className="space-y-3 font-mono text-xs">
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="group relative inline-flex items-center gap-2 text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors py-1"
                      data-cursor="open"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:text-[#E10600] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E10600] group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timepieces */}
            <div className="pt-4 border-t border-[#F5F5F0]/10 font-mono text-[11px] text-[#8E8E8E] space-y-1">
              <div className="flex justify-between">
                <span>SYSTEM LOCAL:</span>
                <span className="text-[#F5F5F0]">{localTime || '--:--:--'}</span>
              </div>
              <div className="flex justify-between">
                <span>TIMEZONE:</span>
                <span className="text-[#E10600]">IST (UTC+05:30)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E8E8E]">
          <div>
            © {new Date().getFullYear()} VATSAL CHAUDHARY // B.TECH COMPUTER SCIENCE & ENGINEERING — SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE
          </div>

          <div className="flex items-center gap-6">
            <span>REACT 18 • VITE • GSAP 3 • LENIS</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-[#F5F5F0]/20 hover:border-[#E10600] hover:text-[#E10600] transition-colors flex items-center gap-1.5"
              title="Return to top"
              data-cursor="top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
