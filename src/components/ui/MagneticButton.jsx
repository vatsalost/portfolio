import React from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useAudio } from '../../context/AudioContext';

export function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary', // 'primary', 'outline', 'ghost'
  cursorText = '',
  ...props
}) {
  const magneticRef = useMagnetic(0.28);
  const { playClick, playHover } = useAudio();

  const baseStyles = "relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest px-6 py-4 transition-all duration-300 select-none overflow-hidden group";
  
  const variants = {
    primary: "bg-[#F5F5F0] text-[#0A0A0A] font-bold hover:bg-[#E10600] hover:text-[#F5F5F0] border border-transparent shadow-lg shadow-black/50",
    outline: "border border-[#F5F5F0]/25 text-[#F5F5F0] hover:border-[#E10600] hover:text-[#E10600] bg-transparent",
    crimson: "bg-[#E10600] text-[#F5F5F0] font-bold hover:bg-[#B00500] shadow-lg shadow-[#E10600]/20",
    ghost: "text-[#F5F5F0] hover:text-[#E10600] px-3 py-2 bg-transparent"
  };

  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    playHover();
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-[#E10600] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-0 opacity-10" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={magneticRef}
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        data-cursor={cursorText || 'OPEN'}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      data-cursor={cursorText || 'CLICK'}
      {...props}
    >
      {content}
    </button>
  );
}
