import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Instant update for the dot for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth lerp loop for the follower ring
    const render = () => {
      // Smooth linear interpolation (lerp)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText.toUpperCase());
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Follower Ring / Morphing Capsule */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out select-none"
          style={{
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
            width: cursorText ? '80px' : isHovered ? '50px' : '34px',
            height: cursorText ? '80px' : isHovered ? '50px' : '34px',
            borderRadius: '9999px',
            backgroundColor: cursorText ? 'rgba(225, 6, 0, 0.95)' : isHovered ? 'rgba(225, 6, 0, 0.15)' : 'transparent',
            border: cursorText ? 'none' : isHovered ? '1.5px solid #E10600' : '1px solid rgba(245, 245, 240, 0.4)',
            backdropFilter: cursorText ? 'blur(4px)' : isHovered ? 'blur(2px)' : 'none',
            boxShadow: isHovered ? '0 0 15px rgba(225, 6, 0, 0.25)' : 'none',
          }}
        >
          {cursorText && (
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#F5F5F0] uppercase pointer-events-none">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Red Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-[#E10600] pointer-events-none transition-transform duration-100"
          style={{
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : isHovered ? 0 : 1})`,
            boxShadow: '0 0 8px #E10600, 0 0 16px rgba(225, 6, 0, 0.6)'
          }}
        />
      </div>
    </div>
  );
}
