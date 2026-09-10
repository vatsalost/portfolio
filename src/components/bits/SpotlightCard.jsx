import React, { useRef, useState } from 'react';

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(225, 6, 0, 0.16)',
  borderColor = 'rgba(225, 6, 0, 0.55)',
  borderRadius = '12px',
  disableOnMobile = false,
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const isMobile = () => {
    return disableOnMobile && (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024));
  };

  const handlePointerMove = (e) => {
    if (isMobile() || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerEnter = (e) => {
    if (isMobile()) return;
    handlePointerMove(e);
    setOpacity(1);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative border border-[#F2F0EA]/10 bg-[#101010] overflow-hidden transition-colors duration-300 ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      {/* 1. Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-200"
        style={{
          opacity,
          borderRadius,
          background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {/* 2. Spotlight Border Accent */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity,
          borderRadius,
          border: `1.5px solid ${borderColor}`,
          maskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent 75%)`,
          WebkitMaskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent 75%)`,
        }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
