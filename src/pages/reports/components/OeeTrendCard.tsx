import React from 'react';
import { Card } from '../../../components/common';
import type { OeeTrendDay } from '../../../types/reports';

export interface OeeTrendCardProps {
  data: OeeTrendDay[];
  className?: string;
}

export const OeeTrendCard: React.FC<OeeTrendCardProps> = ({
  data,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col justify-between gap-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">show_chart</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              OEE Performance Trend
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Availability, Performance, and Quality metrics over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#566E7F]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002941]" />
            OEE
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#566E7F]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CFE8E1]" />
            Target (85%)
          </span>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] relative overflow-hidden">
        {/* Dashed Target line at 85% */}
        <div
          className="absolute left-3 right-3 border-b border-dashed border-[#BDD7E7] z-0 flex items-center justify-start"
          style={{ bottom: '90px' }}
        >
          <span className="text-[10px] font-bold text-[#566E7F] bg-[#F8FAFA] px-1.5 py-0.5 rounded -translate-y-1/2 ml-1 shadow-2xs border border-[#DFECF3]/60">
            Target 85%
          </span>
        </div>

        <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 relative z-10">
          {data.map((item) => {
            const heightPercent = Math.min(100, (item.oee / 100) * 100);

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-[#002941] opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                  {item.oee}%
                </span>

                <div className="w-full max-w-[42px] bg-[#EBF1F5] rounded-t-xl h-full flex items-end p-0.5">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      item.isPeak
                        ? 'bg-gradient-to-t from-[#002941] to-[#164E6E] shadow-sm'
                        : 'bg-gradient-to-t from-[#CFE8E1] to-[#E4F4F0] hover:from-[#A8D7CC] hover:to-[#CFE8E1]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span className="text-xs font-semibold text-[#566E7F]">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
