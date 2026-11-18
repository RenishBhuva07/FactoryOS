import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { OutputVsTargetWeek } from '../../../types/reports';

export interface OutputVsTargetCardProps {
  weeks: OutputVsTargetWeek[];
  className?: string;
}

export const OutputVsTargetCard: React.FC<OutputVsTargetCardProps> = ({
  weeks,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#DFECF3]">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941]">
            Output vs Target
          </h2>
          <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
            Weekly targeted volumes vs actual yield
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#103530] self-start sm:self-auto">
          96% Target Achievement
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {weeks.map((week) => {
          const maxVal = Math.max(week.targetUnits, week.actualUnits) * 1.1;

          return (
            <div key={week.weekLabel} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${week.isCurrent ? 'text-[#002941] font-bold' : 'text-[#566E7F]'}`}>
                  {week.weekLabel}
                </span>
                <span className="text-[11px] text-[#566E7F] tabular-nums">
                  Target: {week.targetUnits.toLocaleString()} | <span className="font-bold text-[#002941]">Actual: {week.actualUnits.toLocaleString()}</span>
                </span>
              </div>
              <PillProgressBar
                value={week.actualUnits}
                max={maxVal}
                variant={week.isCurrent ? 'mint' : 'navy'}
                height="sm"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
