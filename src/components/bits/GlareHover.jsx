import React, { useRef, useState, useEffect } from 'react';

export function GlareHover({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.14)',
  glareMaxOpacity = 0.16,
  borderRadius = '8px',
  ...props
}) {
  const containerRef = useRef(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      setIsInteractive(false);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!isInteractive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (isInteractive) setOpacity(glareMaxOpacity);
  };

  const handleMouseLeave = () => {
    if (isInteractive) setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      {children}

      {/* Subtle Specular Sheen Overlay */}
      {isInteractive && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
          style={{
            opacity,
            borderRadius,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 65%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}

export default GlareHover;
