import React from 'react';

export function Badge({
  children,
  variant = 'default', // 'default', 'crimson', 'outline', 'success'
  size = 'sm', // 'sm', 'md'
  dot = true,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs'
  };

  const variantStyles = {
    default: 'bg-[#141414] border border-[#F5F5F0]/15 text-[#F5F5F0]',
    crimson: 'bg-[#E10600]/10 border border-[#E10600]/40 text-[#E10600]',
    outline: 'bg-transparent border border-[#F5F5F0]/20 text-[#8E8E8E]',
    success: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
  };

  const dotColors = {
    default: 'bg-[#F5F5F0]',
    crimson: 'bg-[#E10600]',
    outline: 'bg-[#8E8E8E]',
    success: 'bg-emerald-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider rounded-none select-none transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
