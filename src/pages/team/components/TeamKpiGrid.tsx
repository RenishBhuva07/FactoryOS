import React from 'react';
import { Card } from '../../../components/common';
import type { TeamAttendanceKpis } from '../../../types/team';

export interface TeamKpiGridProps {
  metrics: TeamAttendanceKpis;
  onFilterAbsent?: () => void;
  className?: string;
}

export const TeamKpiGrid: React.FC<TeamKpiGridProps> = ({
  metrics,
  onFilterAbsent,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Shift Attendance (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Shift Attendance
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">groups</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.presentCount} / {metrics.totalShiftCount}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-[#CFE8E1]">
              {metrics.presentPercent}% Present
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-white/70 font-medium truncate">
            Shift A active personnel roster
          </p>
        </div>
      </Card>

      {/* 2. Biometric Compliance (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Biometric Compliance
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">fingerprint</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.biometricCompliancePercent}%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
              Verified
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            Zero punch irregularities today
          </p>
        </div>
      </Card>

      {/* 3. Overtime Logged (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Overtime Logged
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">more_time</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.overtimeHours}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#566E7F]">
              Logged
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#2D8576] font-medium truncate">
            Shift A authorized extra hours
          </p>
        </div>
      </Card>

      {/* 4. Critical Station Absence (heroCoral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between cursor-pointer"
        onClick={onFilterAbsent}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Critical Station Absence
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">person_off</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.criticalStationAbsenceCount}
            </span>
            <span className="text-xs font-semibold text-white/80">
              Operators
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20 flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium truncate">
            {metrics.criticalStationDetail}
          </p>
          <span className="material-symbols-outlined text-[15px] text-white/80">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
