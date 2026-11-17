import React from 'react';
import { PillButton } from '../../../components/common';

export interface MachinesHeaderProps {
  onFilterType?: () => void;
  onLogMachineStatus?: () => void;
  className?: string;
}

export const MachinesHeader: React.FC<MachinesHeaderProps> = ({
  onFilterType,
  onLogMachineStatus,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Machine Fleet & Workstation Roster
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Practical shopfloor machine management: operator allocation, running job orders, and service status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">filter_list</span>}
            onClick={onFilterType}
          >
            Filter by Type
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}
            onClick={onLogMachineStatus}
          >
            Log Machine Status
          </PillButton>
        </div>
      </div>
    </header>
  );
};
