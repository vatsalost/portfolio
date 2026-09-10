import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export function Navbar() {
  const location = useLocation();
  const { isMuted, toggleMute, playClick, playHover } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#F2F0EA]/10 shadow-xl'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram & Subtitle */}
          <Link
            to="/"
            onClick={playClick}
            className="group flex items-center gap-3 font-display font-black tracking-tight text-lg sm:text-xl text-[#F2F0EA] hover:text-[#E10600] transition-colors"
          >
            <span className="flex items-center">
              VATSAL<span className="text-[#E10600]">.</span>
            </span>
            <span className="hidden md:inline-block font-mono text-[11px] font-normal text-[#8E8E8E] pl-2 border-l border-[#F2F0EA]/15 tracking-wider">
              B.TECH CSE · SIT PUNE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-[#E10600] font-bold'
                      : 'text-[#8E8E8E] hover:text-[#F2F0EA]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E10600]" />
                  )}
                </Link>
              );
            })}

            {/* External GitHub Link */}
            <a
              href="https://github.com/vatsalost"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1 text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Unobtrusive Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-1.5 text-[#8E8E8E] hover:text-[#E10600] border border-[#F2F0EA]/10 hover:border-[#E10600]/40 transition-colors ml-2"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </nav>

          {/* Mobile Right Controls: Audio + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleMute}
              className="p-2 text-[#8E8E8E] hover:text-[#E10600] border border-[#F2F0EA]/10"
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-[#F2F0EA] border border-[#F2F0EA]/15 bg-[#111111]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E10600]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[999] bg-[#0A0A0A]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block mb-4">
            // DIRECTORY
          </span>
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.href;
            const delays = ['delay-[75ms]', 'delay-[125ms]', 'delay-[175ms]'];
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className={`block font-display font-black text-3xl tracking-tight transition-all duration-300 ${
                  delays[idx] || 'delay-[100ms]'
                } ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                } ${
                  isActive ? 'text-[#E10600]' : 'text-[#F2F0EA] hover:text-[#E10600]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/vatsalost"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 font-display font-bold text-2xl text-[#8E8E8E] hover:text-[#F2F0EA] pt-4 transition-all duration-300 delay-[225ms] ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        <div
          className={`border-t border-[#F2F0EA]/10 pt-6 font-mono text-xs text-[#8E8E8E] space-y-1 transition-all duration-300 delay-[275ms] ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="text-[#F2F0EA] font-semibold">Vatsal Chaudhary</p>
          <p>B.Tech CSE · Symbiosis Institute of Technology, Pune</p>
          <p className="text-[#E10600] font-bold pt-1">OPEN TO HACKATHONS</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
