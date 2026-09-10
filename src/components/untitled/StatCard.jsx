import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from '../bits/SpotlightCard';

export function StatCard({
  value,
  suffix = '',
  label,
  change,
  period = 'vs last semester',
  icon: Icon,
  className = '',
}) {
  return (
    <SpotlightCard className={`p-6 md:p-8 flex flex-col justify-between group ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className="p-2 bg-[#181818] border border-[#F5F5F0]/10 text-[#8E8E8E] group-hover:text-[#E10600] group-hover:border-[#E10600]/40 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="font-display font-black text-4xl sm:text-5xl text-[#F5F5F0] tracking-tight">
          <span>{value}</span>
          <span className="text-[#E10600]">{suffix}</span>
        </div>

        {change && (
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1 text-[#E10600] font-bold">
              <TrendingUp className="w-3 h-3" />
              {change}
            </span>
            <span className="text-[#8E8E8E]">{period}</span>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
