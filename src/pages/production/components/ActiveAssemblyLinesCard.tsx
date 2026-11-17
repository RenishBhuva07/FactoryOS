import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { AssemblyLineStatus } from '../../../types/production';

export interface ActiveAssemblyLinesCardProps {
  lines: AssemblyLineStatus[];
  onLineClick?: (line: AssemblyLineStatus) => void;
  className?: string;
}

export const ActiveAssemblyLinesCard: React.FC<ActiveAssemblyLinesCardProps> = ({
  lines,
  onLineClick,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941]">
            Active Assembly Lines
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#103530]">
          4 Lines Operational
        </span>
      </div>

      <div className="space-y-3">
        {lines.map((line) => {
          const isToolChange = line.status === 'tool_change';

          return (
            <div
              key={line.id}
              onClick={() => onLineClick && onLineClick(line)}
              className="p-3.5 sm:p-4 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] hover:border-[#002941]/30 transition-all cursor-pointer space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center text-xs shrink-0 ${
                      isToolChange
                        ? 'bg-[#FFF4F3] text-[#FD6E6E] border border-[#FFD0CC]'
                        : 'bg-[#CFE8E1] text-[#103530]'
                    }`}
                  >
                    {line.lineCode}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#002941]">
                      {line.name}
                    </h3>
                    <p className="text-[11px] text-[#566E7F]">
                      Supervisor: {line.supervisor} • Current Batch: {line.currentBatch}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-xs sm:text-[13px] font-bold text-[#002941] tabular-nums">
                      {line.completedUnits} / {line.targetUnits} pcs
                    </span>
                    <span className="block text-[10px] text-[#566E7F]">Units Completed</span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isToolChange
                        ? 'bg-[#FFF4F3] text-[#FD6E6E] border border-[#FFD0CC]'
                        : 'bg-[#CFE8E1] text-[#103530]'
                    }`}
                  >
                    {line.statusLabel}
                  </span>
                </div>
              </div>

              <PillProgressBar
                value={line.completedUnits}
                max={line.targetUnits}
                variant={isToolChange ? 'coral' : 'mint'}
                height="sm"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
