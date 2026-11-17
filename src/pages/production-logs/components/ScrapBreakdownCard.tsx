import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { ScrapMachineBreakdown } from '../../../types/production';

export interface ScrapBreakdownCardProps {
  breakdowns: ScrapMachineBreakdown[];
  className?: string;
}

export const ScrapBreakdownCard: React.FC<ScrapBreakdownCardProps> = ({
  breakdowns,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 pb-1 border-b border-[#DFECF3]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] text-white flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[16px]">warning</span>
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          Scrap Breakdown by Machine
        </h2>
      </div>

      <p className="text-xs text-[#566E7F] leading-relaxed">
        Total scrap: 17 units (1.2% total shift rate) across active shopfloor operations.
      </p>

      <div className="space-y-3 pt-1">
        {breakdowns.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#002941]">{item.machineName}</span>
              <span className="font-bold text-[#FD6E6E] tabular-nums">
                {item.scrapUnits} units
              </span>
            </div>
            <PillProgressBar
              value={item.scrapUnits}
              max={item.totalShiftScrap}
              variant="coral"
              height="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
