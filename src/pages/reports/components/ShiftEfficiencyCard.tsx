import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { ShiftEfficiencyMetric } from '../../../types/reports';

export interface ShiftEfficiencyCardProps {
  shifts: ShiftEfficiencyMetric[];
  className?: string;
}

export const ShiftEfficiencyCard: React.FC<ShiftEfficiencyCardProps> = ({
  shifts,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col justify-between gap-3.5 ${className}`}>
      <div>
        <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
          <h2 className="text-base font-bold text-[#002941]">
            Shift Efficiency
          </h2>
          <span className="material-symbols-outlined text-[19px] text-[#566E7F]">
            groups
          </span>
        </div>
        <p className="text-xs text-[#566E7F] mt-0.5">
          Performance comparison by shift
        </p>

        <div className="space-y-3 pt-3">
          {shifts.map((shift) => (
            <div key={shift.shiftName} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#002941]">{shift.shiftName}</span>
                <span className="font-bold text-[#002941] tabular-nums">
                  {shift.efficiencyPercent}%
                </span>
              </div>
              <PillProgressBar
                value={shift.efficiencyPercent}
                max={100}
                variant={shift.variant}
                height="sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-[#F0F5F9] border border-[#DFECF3] flex items-center gap-2 text-xs text-[#002941]">
        <span className="material-symbols-outlined text-[18px] text-[#2D8576] shrink-0">
          info
        </span>
        <span className="text-[11px] font-medium leading-tight">
          Morning shift exhibits highest throughput consistently.
        </span>
      </div>
    </Card>
  );
};
