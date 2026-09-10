import React, { useRef, useState } from 'react';

export function GlareHover({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.45)',
  glareMaxOpacity = 0.55,
  borderRadius = '8px',
  ...props
}) {
  const containerRef = useRef(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x, y });
  };

  const handlePointerEnter = () => {
    setOpacity(glareMaxOpacity);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      {children}

      {/* Dynamic Specular Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200 ease-out"
        style={{
          opacity,
          borderRadius,
          background: `radial-gradient(450px circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 65%)`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

export default GlareHover;
