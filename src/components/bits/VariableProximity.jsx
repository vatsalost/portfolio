import React, { useRef, useEffect } from 'react';

export function VariableProximity({
  label = '',
  className = '',
  radius = 130,
  maxLift = 3.5,
  maxScale = 1.025,
  dotColor = '#E10600',
  ...props
}) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    // Disable on touch devices, small screens, or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId = null;
    let targetX = -9999;
    let targetY = -9999;
    let isHovered = false;

    const updateLetterTransforms = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;

        if (!isHovered) {
          el.style.transform = 'translateY(0px) scale(1)';
          return;
        }

        const rect = el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(targetX - letterCenterX, targetY - letterCenterY);

        if (distance < radius) {
          // Smooth cosine falloff
          const factor = Math.cos((distance / radius) * (Math.PI / 2));
          const translateY = -factor * maxLift;
          const scale = 1 + factor * (maxScale - 1);
          el.style.transform = `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`;
        } else {
          el.style.transform = 'translateY(0px) scale(1)';
        }
      });
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isHovered = true;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateLetterTransforms();
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      isHovered = false;
      updateLetterTransforms();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [radius, maxLift, maxScale]);

  letterRefs.current = [];

  const words = label.split(' ');

  return (
    <span
      ref={containerRef}
      className={`inline-block select-text font-display ${className}`}
      {...props}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              ref={(el) => {
                if (el) letterRefs.current.push(el);
              }}
              className="inline-block transition-transform duration-100 ease-out will-change-transform"
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="inline-block" style={{ color: dotColor }}>.</span>
    </span>
  );
}

export default VariableProximity;
