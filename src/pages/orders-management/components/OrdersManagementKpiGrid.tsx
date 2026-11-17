import React from 'react';
import { Card } from '../../../components/common';
import type { OrdersManagementKpis } from '../../../types/ordersManagement';

export interface OrdersManagementKpiGridProps {
  metrics: OrdersManagementKpis;
  onFilterDelay?: () => void;
  className?: string;
}

export const OrdersManagementKpiGrid: React.FC<OrdersManagementKpiGridProps> = ({
  metrics,
  onFilterDelay,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {/* 1. Active Execution Orders (heroNavy) */}
      <Card variant="heroNavy" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-white/80">
              Active Execution Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CFE8E1] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">assignment</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.activeExecutionOrders}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#CFE8E1]">
              Orders
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/10">
          <p className="text-xs text-[#CFE8E1] font-semibold truncate">
            {metrics.committedPipelineValue}
          </p>
        </div>
      </Card>

      {/* 2. BOM Readiness (heroMint) */}
      <Card variant="heroMint" padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              BOM Readiness
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">inventory_2</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.bomReadinessPercent}%
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
              Allocated
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-medium truncate">
            {metrics.bomSubtext}
          </p>
        </div>
      </Card>

      {/* 3. On-Time Fulfillment (default white) */}
      <Card padding="sm" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-semibold text-[#566E7F]">
              On-Time Fulfillment
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">schedule</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-[#002941] tabular-nums tracking-tight">
              {metrics.onTimeFulfillmentPercent}%
            </span>
            <span className="text-xs font-semibold text-[#2D8576]">
              {metrics.fulfillmentDelta}
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-[#DFECF3]/60">
          <p className="text-xs text-[#2D8576] font-medium truncate">
            High client satisfaction index
          </p>
        </div>
      </Card>

      {/* 4. Pending Sign-Offs (heroCoral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between cursor-pointer"
        onClick={onFilterDelay}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Pending Client Sign-Off
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">warning</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] font-bold text-white tabular-nums tracking-tight">
              {metrics.pendingClientSignOff}
            </span>
            <span className="text-xs font-semibold text-white/80">
              Order
            </span>
          </div>
        </div>

        <div className="pt-2.5 mt-2 border-t border-white/20 flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium truncate">
            {metrics.signOffSubtext}
          </p>
          <span className="material-symbols-outlined text-[15px] text-white/80">
            arrow_forward
          </span>
        </div>
      </Card>
    </div>
  );
};
