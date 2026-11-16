import React, { useState } from 'react';
import { Card } from '../../../components/common';
import type { HourlyOutputMetric } from '../../../types/dashboard';

export interface HourlyOutputChartCardProps {
  data: HourlyOutputMetric[];
  className?: string;
}

export const HourlyOutputChartCard: React.FC<HourlyOutputChartCardProps> = ({
  data,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => Math.max(d.actual, d.target)), 260);

  return (
    <Card padding="md" className={`flex flex-col justify-between gap-3.5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">bar_chart</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
              Hourly Output vs Target (Pieces)
            </h2>
            <p className="text-xs text-[#566E7F] mt-0.5">
              Hourly pieces produced by 8 operational machines across Shift A
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002941]" />
            <span className="text-[#566E7F]">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DFECF3]" />
            <span className="text-[#566E7F]">Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] shadow-2xs" />
            <span className="text-[#566E7F]">Alert</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] relative pt-6 pb-2 flex-1 min-h-[260px] flex flex-col justify-end">
        {/* Subtle Horizontal Reference Gridline */}
        <div className="absolute top-12 left-3.5 right-3.5 sm:left-4 sm:right-4 border-b border-dashed border-[#DFECF3]/80 pointer-events-none" />

        {/* Floating marker for current hour highlight */}
        <div className="w-full flex items-end justify-between gap-2 sm:gap-4 h-52 px-1 sm:px-3">
          {data.map((item, idx) => {
            const targetHeightPct = Math.round((item.target / maxVal) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.hour}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative flex-1 h-full flex flex-col items-center justify-end group cursor-pointer"
              >
                {/* 15:00* or Alert marker badge */}
                {item.isCurrent && (
                  <div className="absolute -top-6 px-1.5 py-0.5 rounded-md bg-[#002941] text-white text-[10px] font-bold tabular-nums shadow-xs animate-pulse">
                    {item.actual} pcs
                  </div>
                )}

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white text-[11px] py-1.5 px-2.5 rounded-xl shadow-lg border border-white/10 whitespace-nowrap pointer-events-none transition-all">
                    <div className="font-bold text-[#CFE8E1]">{item.hour}</div>
                    <div className="flex items-center gap-2 text-[10px] opacity-90 tabular-nums">
                      <span>Actual: {item.actual} pcs</span>
                      <span>•</span>
                      <span>Target: {item.target} pcs</span>
                    </div>
                  </div>
                )}

                {/* Target Column Backdrop */}
                <div
                  className="w-full max-w-[44px] rounded-t-lg bg-[#DFECF3]/60 relative flex items-end justify-center overflow-hidden transition-all duration-200 group-hover:bg-[#DFECF3]"
                  style={{ height: `${targetHeightPct}%` }}
                >
                  {/* Actual Filled Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      item.isAlert
                        ? 'bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] shadow-[0_2px_8px_rgba(253,110,110,0.35)]'
                        : 'bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941] shadow-[0_2px_8px_rgba(0,41,65,0.25)]'
                    }`}
                    style={{ height: `${Math.min(100, (item.actual / item.target) * 100)}%` }}
                  />
                </div>

                {/* X-Axis Hour Label */}
                <span
                  className={`mt-2.5 text-[11px] font-semibold tabular-nums tracking-tight transition-colors ${
                    item.isCurrent
                      ? 'text-[#002941] font-bold'
                      : 'text-[#8DA1AF] group-hover:text-[#002941]'
                  }`}
                >
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default HourlyOutputChartCard;
