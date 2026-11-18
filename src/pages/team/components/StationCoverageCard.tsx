import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { StationCoverageItem } from '../../../types/team';

export interface StationCoverageCardProps {
  coverages: StationCoverageItem[];
  className?: string;
}

export const StationCoverageCard: React.FC<StationCoverageCardProps> = ({
  coverages,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">workspaces</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            Station Staffing Coverage
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
          Shift A Live
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {coverages.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#002941]">{item.stationName}</span>
              <span className="font-bold text-[#002941] tabular-nums">
                {item.coveragePercent}%
              </span>
            </div>
            <PillProgressBar
              value={item.coveragePercent}
              max={100}
              variant={item.variant}
              height="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
