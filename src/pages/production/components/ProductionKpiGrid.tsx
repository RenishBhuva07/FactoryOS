import React from 'react';
import { Card } from '../../../components/common';
import type { ProductionKpiMetrics } from '../../../types/production';

export interface ProductionKpiGridProps {
  metrics: ProductionKpiMetrics;
  onFilterScrap?: () => void;
  className?: string;
}

export const ProductionKpiGrid: React.FC<ProductionKpiGridProps> = ({
  metrics,
  onFilterScrap,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Overall Equip. Utilization (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Overall Equip. Utilization
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">speed</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.equipUtilizationPercent}%
            </span>
            <span className="text-xs font-semibold text-[#CFE8E1]">
              {metrics.utilizationDelta}
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-white/70 font-medium truncate">
            Active spindle load across 4 sections
          </p>
        </div>
      </Card>

      {/* 2. Shift Output Target (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Shift Output Target
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">track_changes</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.shiftOutputActual.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-white/80">
              / {metrics.shiftOutputTarget.toLocaleString()} pcs
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            {metrics.shiftCompletionPercent}% completed
          </p>
        </div>
      </Card>

      {/* 3. Shopfloor Throughput (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Shopfloor Throughput
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">trending_up</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.throughputRate}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#566E7F]">
              units / hour
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#2D8576] font-medium truncate">
            Optimal range: {metrics.throughputRange}
          </p>
        </div>
      </Card>

      {/* 4. Scrap & Rejection Rate (heroCoral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between cursor-pointer"
        onClick={onFilterScrap}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Scrap & Rejection Rate
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">warning</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.scrapRatePercent}%
            </span>
            <span className="text-xs font-semibold text-white/80">
              +{metrics.scrapLoggedUnits} pcs logged
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20 flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium truncate">
            {metrics.scrapToleranceText}
          </p>
          <span className="material-symbols-outlined text-[15px] text-white/80">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
