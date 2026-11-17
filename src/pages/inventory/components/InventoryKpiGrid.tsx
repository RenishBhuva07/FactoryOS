import React from 'react';
import { Card } from '../../../components/common';
import type { InventoryKpiMetrics } from '../../../types/inventory';

export interface InventoryKpiGridProps {
  metrics: InventoryKpiMetrics;
  onFilterLowStock?: () => void;
  className?: string;
}

export const InventoryKpiGrid: React.FC<InventoryKpiGridProps> = ({
  metrics,
  onFilterLowStock,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Total SKU Count (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Total SKU Count
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">category</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.totalSkuCount}
            </span>
            <span className="text-sm font-semibold text-[#CFE8E1]">SKUs</span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-white/70 font-medium truncate">
            {metrics.skuDescription}
          </p>
        </div>
      </Card>

      {/* 2. Store Capacity Utilization (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Store Capacity Utilization
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">warehouse</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.capacityUtilizationPercent}%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
              Optimal
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            {metrics.capacitySubtext}
          </p>
        </div>
      </Card>

      {/* 3. Pending Inbound (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Pending Inbound
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">local_shipping</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.pendingInboundCount}
            </span>
            <span className="text-xs font-semibold text-[#566E7F]">Inward Shipments</span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#566E7F] font-medium truncate">
            {metrics.pendingInboundDescription}
          </p>
        </div>
      </Card>

      {/* 4. Stock Valuation */}
      <Card
        padding="sm"
        className="flex flex-col justify-between cursor-pointer hover:border-[#BDD7E7] transition-all"
        onClick={onFilterLowStock}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              Stock Valuation
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">currency_rupee</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.stockValuation}
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60 flex items-center justify-between">
          <p className="text-xs text-[#566E7F] font-medium truncate">
            {metrics.stockValuationTime}
          </p>
          <span className="material-symbols-outlined text-[15px] text-[#8DA1AF]">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
