import React from "react";
import { Card, PillProgressBar } from "../../../components/common";
import type { OrdersKpiMetrics } from "../../../types/orders";

export interface OrdersKpiGridProps {
  metrics: OrdersKpiMetrics;
  onFilterAtRisk?: () => void;
  className?: string;
}

export const OrdersKpiGrid: React.FC<OrdersKpiGridProps> = ({
  metrics,
  onFilterAtRisk,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}
    >
      {/* 1. Total Active Orders (Hero Navy) */}
      <Card
        variant="heroNavy"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Total Active Orders
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                shopping_bag
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.totalActiveOrders}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/80">
              Orders Active
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20">
          <p className="text-xs text-[#CFE8E1] font-semibold truncate flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">
              payments
            </span>
            <span>{metrics.pipelineValue}</span>
          </p>
        </div>
      </Card>

      {/* 2. In Production (Hero Coral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              In Production
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                precision_manufacturing
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.inProductionBatches}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/80">
              Batches Running
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20">
          <p className="text-xs text-white/90 font-medium truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white shrink-0" />
            <span>{metrics.activeLines}</span>
          </p>
        </div>
      </Card>

      {/* 3. On-Time Delivery Rate (Hero Mint) */}
      <Card
        variant="heroMint"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              On-Time Delivery Rate
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                schedule
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.onTimeDeliveryRate}%
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#103530] tabular-nums">
              {metrics.onTimeDeliveryDelta}
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80 font-medium">
              {metrics.onTimeDeliverySubtext}
            </span>
            <span className="font-bold text-white tabular-nums">
              {metrics.onTimeDeliveryRate}%
            </span>
          </div>
          <PillProgressBar
            value={metrics.onTimeDeliveryRate}
            max={100}
            variant="heroMint"
            trackClassName="bg-white/20"
            height="sm"
          />
        </div>
      </Card>

      {/* 4. At-Risk / Attention Required (Hero Coral) */}
      <Card
        variant="heroCoral"
        padding="sm"
        onClick={onFilterAtRisk}
        className="flex flex-col justify-between transition-all cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              At-Risk / Attention
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                warning
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {metrics.atRiskOrdersCount}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/80">
              Orders Requiring Action
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#AB1B1B] shadow-xs truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AB1B1B] animate-pulse" />
            <span>{metrics.atRiskNote}</span>
          </span>
          <span className="material-symbols-outlined text-[16px] text-white/80">
            chevron_right
          </span>
        </div>
      </Card>
    </div>
  );
};

export default OrdersKpiGrid;
