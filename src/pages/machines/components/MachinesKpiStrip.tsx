import React from 'react';
import { Card } from '../../../components/common';
import type { MachinesKpiMetrics } from '../../../types/machines';

export interface MachinesKpiStripProps {
  metrics: MachinesKpiMetrics;
  onFilterMaintenance?: () => void;
  className?: string;
}

export const MachinesKpiStrip: React.FC<MachinesKpiStripProps> = ({
  metrics,
  onFilterMaintenance,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Total Fleet (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Total Fleet
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">precision_manufacturing</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.totalMachines}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#CFE8E1]">
              Machines
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-white/80 font-medium truncate">
            <span className="text-[#CFE8E1] font-bold">{metrics.operationalCount} Operational</span>
            {' • '}
            <span className="text-[#FD6E6E] font-bold">{metrics.maintenanceCount} In Maintenance</span>
          </p>
        </div>
      </Card>

      {/* 2. Today's Utilization (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Today's Utilization
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">speed</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.todayUtilizationPercent}%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
              {metrics.utilizationTargetDelta}
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            Realtime spindle sensor telemetry
          </p>
        </div>
      </Card>

      {/* 3. Power & Uptime (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Power & Uptime
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">bolt</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.powerUptimeHours}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#566E7F]">
              avg uptime / shift
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#2D8576] font-medium truncate">
            Shift A (09:00 - 16:30) Active
          </p>
        </div>
      </Card>

      {/* 4. Maintenance Alerts (heroCoral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between cursor-pointer"
        onClick={onFilterMaintenance}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Maintenance Alerts
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">pending_actions</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.maintenanceAlertsCount}
            </span>
            <span className="text-xs font-semibold text-white/80">
              Scheduled Service
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20 flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium truncate">
            Lathe #04: Tool Change & Oil
          </p>
          <span className="material-symbols-outlined text-[15px] text-white/80">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
