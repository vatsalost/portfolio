import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useAudio } from '../../context/AudioContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isMuted, toggleMute, playClick, playHover } = useAudio();
  const menuOverlayRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate full-screen takeover menu
  useEffect(() => {
    const overlay = menuOverlayRef.current;
    const linkItems = linksContainerRef.current?.querySelectorAll('.menu-item');
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .fromTo(linkItems, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: 'INDEX', subtitle: 'OVERVIEW // 01', href: '/' },
    { title: 'WORK', subtitle: 'PROJECTS // 02', href: '/work' },
    { title: 'ABOUT', subtitle: 'PROFILE & ACADEMICS // 03', href: '/about' },
    { title: 'CONTACT', subtitle: 'CONNECT // 04', href: '/contact' },
    { title: 'ADMIN', subtitle: 'SECURE CONSOLE // 05', href: '/admin' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[990] transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#F5F5F0]/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-3 group select-none"
            data-cursor="home"
          >
            <div className="w-8 h-8 bg-[#F5F5F0] text-[#0A0A0A] font-display font-black flex items-center justify-center text-lg group-hover:bg-[#E10600] group-hover:text-[#F5F5F0] transition-colors duration-300">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-[#F5F5F0] uppercase">
                VATSAL CHAUDHARY
              </span>
              <span className="font-mono text-[9px] text-[#8E8E8E] tracking-widest">
                B.TECH CSE • SIT PUNE
              </span>
            </div>
          </Link>

          {/* Center Status indicator (Large desktop only) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#121212] border border-[#F5F5F0]/10 font-mono text-[11px] text-[#8E8E8E]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E10600]" />
            </span>
            <span className="tracking-wider">B.TECH CSE @ SIT PUNE • OPEN TO HACKATHONS & COLLABORATION</span>
          </div>

          {/* Right Controls: Audio + Nav Links + Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 text-[#8E8E8E] hover:text-[#E10600] transition-colors font-mono text-xs flex items-center gap-1.5"
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              data-cursor="sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E10600]" />}
              <span className="hidden lg:inline text-[10px] tracking-widest">{isMuted ? 'MUTE' : 'AUDIO'}</span>
            </button>

            {/* Desktop Direct Links */}
            <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-widest">
              <Link
                to="/work"
                onMouseEnter={playHover}
                className={`relative py-1 transition-colors ${
                  location.pathname === '/work' 
                    ? 'text-[#E10600] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#E10600]' 
                    : 'text-[#F5F5F0] hover:text-[#E10600]'
                }`}
              >
                WORK
              </Link>
              <Link
                to="/about"
                onMouseEnter={playHover}
                className={`relative py-1 transition-colors ${
                  location.pathname === '/about' 
                    ? 'text-[#E10600] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#E10600]' 
                    : 'text-[#F5F5F0] hover:text-[#E10600]'
                }`}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onMouseEnter={playHover}
                className={`relative py-1 transition-colors ${
                  location.pathname === '/contact' 
                    ? 'text-[#E10600] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#E10600]' 
                    : 'text-[#F5F5F0] hover:text-[#E10600]'
                }`}
              >
                CONTACT
              </Link>
            </nav>

            {/* Menu Trigger Button */}
            <button
              onClick={toggleMenu}
              className="p-2 text-[#F5F5F0] hover:text-[#E10600] transition-colors flex items-center gap-2 border border-[#F5F5F0]/15 bg-[#121212] px-3 py-1.5 font-mono text-xs tracking-widest"
              data-cursor="menu"
            >
              <span className="hidden sm:inline">MENU</span>
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Takeover Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-[9995] bg-[#0A0A0A] text-[#F5F5F0] flex flex-col justify-between p-8 md:p-16 transform -translate-y-full will-change-transform"
      >
        {/* Overlay Top Bar */}
        <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-6">
          <div className="font-mono text-xs text-[#8E8E8E] tracking-widest">
            NAVIGATION INDEX // VATSAL PORTFOLIO
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 border border-[#F5F5F0]/20 hover:border-[#E10600] hover:text-[#E10600] transition-colors font-mono text-xs flex items-center gap-2"
            data-cursor="close"
          >
            <span>CLOSE</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Staggered Links */}
        <div ref={linksContainerRef} className="my-auto py-8 space-y-4 md:space-y-6">
          {navLinks.map((item, idx) => (
            <div key={idx} className="menu-item overflow-hidden">
              <Link
                to={item.href}
                onClick={toggleMenu}
                onMouseEnter={playHover}
                className="group flex items-baseline justify-between py-2 border-b border-[#F5F5F0]/5 hover:border-[#E10600] transition-colors"
                data-cursor="go"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-xs md:text-sm text-[#8E8E8E] group-hover:text-[#E10600] transition-colors">
                    {item.subtitle}
                  </span>
                  <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight group-hover:translate-x-3 group-hover:text-[#E10600] transition-all duration-300">
                    {item.title}
                  </span>
                </div>
                <ArrowUpRight className="w-8 h-8 text-[#8E8E8E] group-hover:text-[#E10600] transform group-hover:scale-125 transition-all duration-300" />
              </Link>
            </div>
          ))}
        </div>

        {/* Overlay Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#F5F5F0]/10 font-mono text-xs text-[#8E8E8E]">
          <div>
            <span className="text-[#E10600] block mb-1">INQUIRIES</span>
            <a href="mailto:vatslchaudhary@gmail.com" className="hover:text-white transition-colors">
              vatslchaudhary@gmail.com
            </a>
          </div>
          <div>
            <span className="text-[#E10600] block mb-1">STATUS</span>
            <span>B.TECH CSE // SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE</span>
          </div>
          <div className="md:text-right">
            <span className="text-[#E10600] block mb-1">CHANNELS</span>
            <div className="flex md:justify-end gap-4">
              <a href="https://github.com/vatsalost" target="_blank" rel="noreferrer" className="hover:text-white">GH</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LI</a>
              <a href="mailto:vatslchaudhary@gmail.com" className="hover:text-white">MAIL</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
