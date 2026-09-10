import React from 'react';

export function MarqueeTicker({
  items = [],
  speed = '35s',
  reverse = false,
  className = '',
  highlightRed = false,
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none flex ${className}`}>
      <div
        className={`flex items-center gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: speed }}
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className={`font-display text-sm md:text-xl font-bold tracking-widest uppercase ${highlightRed && idx % 3 === 0 ? 'text-[#E10600]' : 'text-[#F5F5F0]'}`}>
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
          </div>
        ))}
      </div>
    </div>
  );
}
