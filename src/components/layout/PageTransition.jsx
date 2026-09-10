import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useAudio } from '../../context/AudioContext';

export function PageTransition({ children }) {
  const location = useLocation();
  const redLayerRef = useRef(null);
  const blackLayerRef = useRef(null);
  const contentRef = useRef(null);
  const isFirstRender = useRef(true);
  const { playHover } = useAudio();

  useEffect(() => {
    // Skip full curtain wipe on initial page load (preloader handles that)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const redLayer = redLayerRef.current;
    const blackLayer = blackLayerRef.current;
    const content = contentRef.current;

    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    tl.set([redLayer, blackLayer], { yPercent: 100, display: 'flex' })
      .to(redLayer, {
        yPercent: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      })
      .to(blackLayer, {
        yPercent: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      }, '-=0.2')
      .to(blackLayer, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
        delay: 0.05
      })
      .to(redLayer, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
      }, '-=0.25')
      .fromTo(content, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .set([redLayer, blackLayer], { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* Wipe Curtains */}
      <div
        ref={redLayerRef}
        className="fixed inset-0 bg-[#E10600] z-[99980] pointer-events-none hidden will-change-transform"
      />
      <div
        ref={blackLayerRef}
        className="fixed inset-0 bg-[#0A0A0A] z-[99981] pointer-events-none hidden will-change-transform flex items-center justify-center"
      >
        <span className="font-display font-black text-6xl text-[#F5F5F0] tracking-tighter">
          V<span className="text-[#E10600]">.</span>
        </span>
      </div>

      {/* Page Content Container */}
      <div ref={contentRef} className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
