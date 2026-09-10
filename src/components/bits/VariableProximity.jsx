import React, { useRef, useEffect } from 'react';

export function VariableProximity({
  label = '',
  className = '',
  radius = 160,
  maxLift = 7,
  maxScale = 1.1,
  dotColor = '#E10600',
  ...props
}) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    // Only disable if user explicitly requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let targetX = -9999;
    let targetY = -9999;
    let isHovered = false;
    let rafId = null;

    const updateTransforms = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;

        if (!isHovered) {
          el.style.transform = 'translateY(0px) scale(1)';
          el.style.color = '';
          return;
        }

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(targetX - centerX, targetY - centerY);

        if (distance < radius) {
          const factor = Math.cos((distance / radius) * (Math.PI / 2));
          const translateY = -factor * maxLift;
          const scale = 1 + factor * (maxScale - 1);
          el.style.transform = `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`;
          if (factor > 0.5) {
            el.style.color = '#FFFFFF';
          } else {
            el.style.color = '';
          }
        } else {
          el.style.transform = 'translateY(0px) scale(1)';
          el.style.color = '';
        }
      });
    };

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isHovered = true;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateTransforms();
          rafId = null;
        });
      }
    };

    const onPointerLeave = () => {
      isHovered = false;
      updateTransforms();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
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
