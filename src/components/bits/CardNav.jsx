import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import './CardNav.css';

export function CardNav({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#0D0D0D',
  menuColor = '#F5F5F0',
  buttonBgColor = '#E10600',
  buttonTextColor = '#FFFFFF',
  ctaText = 'TEAM UP',
  ctaHref = '/contact'
}) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMuted, toggleMute, playClick, playHover } = useAudio();
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.08 },
      '-=0.15'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    playClick();
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const closeMenu = () => {
    playClick();
    const tl = tlRef.current;
    if (tl && isExpanded) {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        closeMenu();
      }
    };

    const handleClickOutside = (e) => {
      if (isExpanded && containerRef.current && !containerRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div ref={containerRef} className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          <div className="card-nav-left">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMenu();
                }
              }}
              role="button"
              aria-label={isExpanded ? 'Close navigation cards' : 'Open navigation cards'}
              aria-expanded={isExpanded}
              tabIndex={0}
              style={{ color: menuColor }}
              data-cursor="menu"
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <button
              onClick={toggleMute}
              className="p-2 text-[#8E8E8E] hover:text-[#E10600] transition-colors font-mono text-xs flex items-center gap-1.5 bg-transparent border-0 cursor-pointer"
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              data-cursor="sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E10600]" />}
              <span className="hidden sm:inline text-[10px] tracking-widest text-[#8E8E8E]">
                {isMuted ? 'MUTE' : 'AUDIO'}
              </span>
            </button>
          </div>

          <Link
            to="/"
            onClick={closeMenu}
            onMouseEnter={playHover}
            className="card-nav-logo-link"
            data-cursor="home"
          >
            <div className="card-nav-logo-box">V</div>
            <div className="card-nav-logo-text">
              <span className="card-nav-logo-name">VATSAL CHAUDHARY</span>
              <span className="card-nav-logo-sub">B.TECH CSE • SIT PUNE</span>
            </div>
          </Link>

          <div className="card-nav-right">
            {/* Direct desktop route links */}
            <div className="hidden lg:flex items-center gap-4 font-mono text-xs tracking-wider mr-2">
              <Link
                to="/work"
                onClick={closeMenu}
                onMouseEnter={playHover}
                className="text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
              >
                WORK
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                onMouseEnter={playHover}
                className="text-[#8E8E8E] hover:text-[#F5F5F0] transition-colors"
              >
                ABOUT
              </Link>
            </div>

            <Link
              to={ctaHref}
              onClick={closeMenu}
              onMouseEnter={playHover}
              className="card-nav-cta-button"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              data-cursor="contact"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-header">
                <span className="nav-card-index">{item.index || `0${idx + 1}`}</span>
                <span className="nav-card-tag">{item.tag || 'NAV'}</span>
              </div>
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => {
                  const isExternal = lnk.external || lnk.href.startsWith('http');
                  if (isExternal) {
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link"
                        href={lnk.href}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={playHover}
                        aria-label={lnk.ariaLabel || lnk.label}
                      >
                        <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                        <span>{lnk.label}</span>
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      to={lnk.href}
                      onClick={closeMenu}
                      onMouseEnter={playHover}
                      aria-label={lnk.ariaLabel || lnk.label}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      <span>{lnk.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default CardNav;
