import React from 'react';
import { Card } from '../../../components/common';
import type { QualityKpiMetrics } from '../../../types/quality';

export interface QualityKpiGridProps {
  metrics: QualityKpiMetrics;
  onFilterQuarantine?: () => void;
  className?: string;
}

export const QualityKpiGrid: React.FC<QualityKpiGridProps> = ({
  metrics,
  onFilterQuarantine,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. First Pass Yield (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              First Pass Yield
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">verified</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.firstPassYield}%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
              Target: {'>'} 96%
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {metrics.yieldTarget}
          </p>
        </div>
      </Card>

      {/* 2. Inspected Batches Today (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Inspected Batches Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">checklist</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.inspectedBatchesDone} / {metrics.inspectedBatchesTotal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#CFE8E1]">
              Batches
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            • {metrics.quotaClearedPercent}% shift quota cleared
          </p>
        </div>
      </Card>

      {/* 3. Defect Rate (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Defect Rate
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">pie_chart</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.defectRatePercent}%
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#2D8576] font-medium truncate">
            {metrics.defectToleranceText}
          </p>
        </div>
      </Card>

      {/* 4. Pending Quarantine (heroCoral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between cursor-pointer"
        onClick={onFilterQuarantine}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Pending Quarantine
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">warning</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.pendingQuarantineCount}
            </span>
            <span className="text-xs font-semibold text-white/80">
              Batch
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20 flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium truncate">
            {metrics.quarantineBatchInfo}
          </p>
          <span className="material-symbols-outlined text-[15px] text-white/80">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
