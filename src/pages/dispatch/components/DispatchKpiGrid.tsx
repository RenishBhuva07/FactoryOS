import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { DispatchKpiMetrics } from '../../../types/dispatch';

export interface DispatchKpiGridProps {
  metrics: DispatchKpiMetrics;
  onFilterDelayed?: () => void;
  className?: string;
}

export const DispatchKpiGrid: React.FC<DispatchKpiGridProps> = ({
  metrics,
  onFilterDelayed,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Dispatches Today (Hero Navy) */}
      <Card
        variant="heroNavy"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Dispatches Today
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">local_shipping</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.dispatchesTodayDone} / {metrics.dispatchesTodayTotal}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#002941] tabular-nums">
              {metrics.onSchedulePercent}% on schedule
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80 font-medium">Daily Dispatch Goal</span>
            <span className="font-bold text-white tabular-nums">
              {Math.round((metrics.dispatchesTodayDone / metrics.dispatchesTodayTotal) * 100)}%
            </span>
          </div>
          <PillProgressBar
            value={metrics.dispatchesTodayDone}
            max={metrics.dispatchesTodayTotal}
            variant="heroNavy"
            trackClassName="bg-white/20"
            height="sm"
          />
        </div>
      </Card>

      {/* 2. In-Transit Value (Hero Mint) */}
      <Card
        variant="heroMint"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              In-Transit Value
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">payments</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.inTransitValue}
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-semibold truncate flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">inventory_2</span>
            <span>Covering {metrics.activeConsignmentsCount} active consignments</span>
          </p>
        </div>
      </Card>

      {/* 3. Avg Gate Turnaround (Elevated White) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-[#566E7F] uppercase">
              Avg Gate Turnaround
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">schedule</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.avgGateTurnaroundMins} mins
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E4F4F0] text-[#20675C] tabular-nums">
              {metrics.turnaroundDelta}
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-[#DFECF3]/70">
          <p className="text-xs text-[#566E7F] font-medium truncate">
            {metrics.turnaroundSubtext}
          </p>
        </div>
      </Card>

      {/* 4. Delayed Dispatches (Hero Coral Alert) */}
      <Card
        variant="heroCoral"
        padding="sm"
        onClick={onFilterDelayed}
        className="flex flex-col justify-between transition-all cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Delayed Dispatches
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">warning</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.delayedDispatchesCount} consignment
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#AB1B1B] shadow-xs truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AB1B1B] animate-pulse" />
            <span>{metrics.delayedBatchInfo}</span>
          </span>
          <span className="material-symbols-outlined text-[16px] text-white/80">
            chevron_right
          </span>
        </div>
      </Card>
    </div>
  );
};
