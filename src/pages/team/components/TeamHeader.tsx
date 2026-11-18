import React from 'react';
import { PillButton } from '../../../components/common';

export interface TeamHeaderProps {
  onExportRoster?: () => void;
  onManualPunch?: () => void;
  className?: string;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  onExportRoster,
  onManualPunch,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-[#566E7F] uppercase tracking-wider">
          Human Resources & Workforce • Shift Operations
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F4F0] text-[#103530] border border-[#CFE8E1]">
          <span className="w-2 h-2 rounded-full bg-[#2D8576] animate-pulse" />
          Shift A (08:00 - 16:30 IST) • 42 / 46 Present
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Team & Attendance
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Real-time biometric attendance logs, shopfloor station staffing, and operator skill matrix.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">download</span>}
            onClick={onExportRoster}
          >
            Export Attendance Roster
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">fingerprint</span>}
            onClick={onManualPunch}
          >
            Punch Manual Entry
          </PillButton>
        </div>
      </div>
    </header>
  );
};
