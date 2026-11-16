import React, { useState } from "react";
import { Card } from "../../components";
import type { MonthlyIncomeMetric } from "../../../types/dashboard";

export interface IncomeChartCardProps {
  data: MonthlyIncomeMetric[];
  className?: string;
}

export const IncomeChartCard: React.FC<IncomeChartCardProps> = ({
  data,
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxY = 50000;
  const yLabels = ["50k", "40k", "30k", "20k", "10k", "00"];

  return (
    <Card
      variant="default"
      padding="md"
      className={`relative flex flex-col justify-between h-full ${className}`}
    >
      {/* Top Header & Legend Group */}
      <div className="space-y-3">
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-[#002941] tracking-tight">
            Total Income
          </h3>
          <p className="text-xs text-[#566E7F]">
            View your income in a certain period of time
          </p>
        </div>

        {/* Legend & Period title */}
        <div className="flex items-center justify-between text-xs font-semibold pt-1">
          <span className="text-[#002941]">Profit and Loss</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#002941]">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#164E6E] to-[#002941] shadow-[0_1px_3px_rgba(0,41,65,0.3)] shrink-0" />
              <span>Profit</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#002941]">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] shadow-[0_1px_3px_rgba(253,110,110,0.35)] shrink-0" />
              <span>Loss</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative flex-1 flex flex-col justify-end pt-6 pb-1 min-h-[200px]">
        {/* Horizontal Dotted Gridlines & Y-Axis */}
        <div className="absolute inset-0 left-7 flex flex-col justify-between pointer-events-none pb-7">
          {yLabels.map((label, idx) => (
            <div key={idx} className="flex items-center w-full">
              <span className="text-[10px] text-[#8DA1AF] font-mono -ml-7 w-6 text-right select-none">
                {label}
              </span>
              <div className="w-full border-b border-dashed border-[#DFECF3]" />
            </div>
          ))}
        </div>

        {/* Stacked Rounded Bars */}
        <div className="relative ml-7 flex-1 flex items-end justify-between px-1 sm:px-2 pt-2 gap-1 sm:gap-1.5 min-h-[180px]">
          {data.map((item, index) => {
            const lossPercent = (item.loss / maxY) * 100;
            const profitPercent = (item.profit / maxY) * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.month}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex flex-col items-center flex-1 h-full justify-end cursor-pointer group"
              >
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white text-[10px] py-1.5 px-3 rounded-xl shadow-[0_8px_20px_-4px_rgba(0,41,65,0.4)] border border-white/10 pointer-events-none whitespace-nowrap">
                    <p className="font-bold text-[#CFE8E1]">{item.month}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#164E6E] border border-white/40" />
                      <span className="text-white font-medium">
                        Profit: ${item.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FD6E6E] border border-white/30" />
                      <span className="text-[#FFAAA3] font-medium">
                        Loss: ${item.loss.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-full max-w-[22px] sm:max-w-[26px] flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941] group-hover:from-[#22668C] group-hover:via-[#164E6E] group-hover:to-[#0C3953] group-hover:shadow-[0_4px_12px_rgba(0,41,65,0.35)] transition-all duration-200"
                    style={{ height: `${profitPercent}%` }}
                  />

                  <div className="w-full h-0.5 bg-white shrink-0 shadow-xs" />

                  <div
                    className="w-full rounded-b-xs bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] group-hover:from-[#FFAAA3] group-hover:via-[#FD6E6E] group-hover:to-[#D62727] group-hover:shadow-[0_4px_12px_rgba(253,110,110,0.4)] transition-all duration-200"
                    style={{ height: `${lossPercent}%` }}
                  />
                </div>

                {/* X-Axis Month Label */}
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#566E7F] mt-2 group-hover:text-[#002941] transition select-none">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default IncomeChartCard;
