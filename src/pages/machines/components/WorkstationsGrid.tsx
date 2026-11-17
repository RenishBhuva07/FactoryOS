import React from 'react';
import { Card } from '../../../components/common';
import type { WorkstationMachine } from '../../../types/machines';

export interface WorkstationsGridProps {
  workstations: WorkstationMachine[];
  onActionClick?: (workstation: WorkstationMachine) => void;
  className?: string;
}

export const WorkstationsGrid: React.FC<WorkstationsGridProps> = ({
  workstations,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {workstations.map((ws) => {
        const isMaintenance = ws.status === 'maintenance';

        return (
          <Card
            key={ws.id}
            padding="sm"
            className={`flex flex-col justify-between border transition-all ${
              isMaintenance
                ? 'border-[#FFD0CC] bg-[#FFF4F3]/50'
                : 'border-[#DFECF3] bg-white hover:border-[#002941]/30'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#566E7F] uppercase tracking-wider truncate">
                  {ws.code}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isMaintenance
                      ? 'bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E]'
                      : 'bg-[#CFE8E1] text-[#103530]'
                  }`}
                >
                  {ws.statusLabel}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#002941] mb-3">
                {ws.name}
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#566E7F]">
                  <span>{ws.isTech ? 'Technician:' : 'Operator:'}</span>
                  <span className="font-semibold text-[#002941]">{ws.operatorOrTech}</span>
                </div>
                <div className="flex items-center justify-between text-[#566E7F]">
                  <span>{ws.isTech ? 'Status:' : 'Current Job:'}</span>
                  <span className="font-semibold text-[#002941] truncate max-w-[140px]">
                    {ws.currentJobOrTask}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#566E7F]">
                  <span>Operating Hours:</span>
                  <span className="font-semibold text-[#002941] tabular-nums font-mono">
                    {ws.operatingHours}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#DFECF3]/70 flex items-center justify-between text-xs">
              <span className={`text-[11px] font-medium ${isMaintenance ? 'text-[#FD6E6E]' : 'text-[#566E7F]'}`}>
                {ws.nextPmOrDowntime}
              </span>
              <button
                type="button"
                onClick={() => onActionClick && onActionClick(ws)}
                className={`font-bold hover:underline transition-colors cursor-pointer text-xs ${
                  isMaintenance ? 'text-[#FD6E6E]' : 'text-[#002941]'
                }`}
              >
                {ws.actionText}
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
