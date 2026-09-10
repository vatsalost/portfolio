import React from 'react';

export function ShinyText({
  text = '',
  disabled = false,
  speed = 4,
  className = '',
  shimmerColor = 'rgba(245, 245, 240, 0.95)',
  baseColor = 'rgba(245, 245, 240, 0.45)',
  ...props
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block select-none bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : `linear-gradient(120deg, ${baseColor} 0%, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
        WebkitBackgroundClip: 'text',
      }}
      {...props}
    >
      {text}
    </span>
  );
}
