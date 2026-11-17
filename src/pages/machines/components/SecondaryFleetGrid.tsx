import React from 'react';
import { Card } from '../../../components/common';
import type { SecondaryMachine } from '../../../types/machines';

export interface SecondaryFleetGridProps {
  machines: SecondaryMachine[];
  onMachineClick?: (machine: SecondaryMachine) => void;
  className?: string;
}

export const SecondaryFleetGrid: React.FC<SecondaryFleetGridProps> = ({
  machines,
  onMachineClick,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          Machines #5 to #8 Fleet Summary
        </h2>
        <span className="text-xs text-[#566E7F] font-medium">
          4 Machines in Secondary Line
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {machines.map((m) => {
          const isIdle = m.status === 'idle';

          return (
            <div
              key={m.id}
              onClick={() => onMachineClick && onMachineClick(m)}
              className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] hover:border-[#002941]/30 transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#002941]">
                  {m.code}: {m.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isIdle
                      ? 'bg-[#F0F5F9] text-[#566E7F] border border-[#DFECF3]'
                      : 'bg-[#CFE8E1] text-[#103530]'
                  }`}
                >
                  {m.statusLabel}
                </span>
              </div>

              <div className="text-[11px] text-[#566E7F] space-y-0.5">
                <div>Operator: <span className="font-semibold text-[#002941]">{m.operator}</span></div>
                <div className="truncate">Job: <span className="font-semibold text-[#002941]">{m.job}</span></div>
                <div>Uptime today: <span className="font-semibold text-[#2D8576] tabular-nums">{m.uptimeToday}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
