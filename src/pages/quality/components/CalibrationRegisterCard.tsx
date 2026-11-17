import React from 'react';
import { Card } from '../../../components/common';
import type { CalibrationTool } from '../../../types/quality';

export interface CalibrationRegisterCardProps {
  tools: CalibrationTool[];
  className?: string;
}

export const CalibrationRegisterCard: React.FC<CalibrationRegisterCardProps> = ({
  tools,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 pb-1 border-b border-[#DFECF3]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[16px]">straighten</span>
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          Inspection Tool Calibration Register
        </h2>
      </div>

      <div className="space-y-2.5">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between gap-3"
          >
            <div>
              <div className="font-bold text-xs sm:text-[13px] text-[#002941]">
                {tool.toolName} ({tool.toolSpec})
              </div>
              <div className="text-[11px] text-[#2D8576] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43A392]" />
                {tool.statusText} • {tool.validUntil}
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-[#E4F4F0] text-[#2D8576] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
