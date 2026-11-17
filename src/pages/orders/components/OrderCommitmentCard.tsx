import React from "react";
import { Card, PillButton, PillProgressBar } from "../../../components/common";
import type { OrderCommitment } from "../../../types/orders";

export interface OrderCommitmentCardProps {
  order: OrderCommitment;
  onFastTrackQc?: (order: OrderCommitment) => void;
  onViewAllocation?: (order: OrderCommitment) => void;
  onMoreActions?: (order: OrderCommitment) => void;
  className?: string;
}

export const OrderCommitmentCard: React.FC<OrderCommitmentCardProps> = ({
  order,
  onFastTrackQc,
  onViewAllocation,
  onMoreActions,
  className = "",
}) => {
  const getStatusBadge = () => {
    switch (order.status) {
      case "awaiting_qc":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFEBE9] text-[#C93B3B]">
            <span className="material-symbols-outlined text-[15px]">
              schedule
            </span>
            <span>{order.statusLabel}</span>
          </span>
        );
      case "in_machining":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E2F3EC] text-[#215E3F]">
            <span className="material-symbols-outlined text-[15px]">
              precision_manufacturing
            </span>
            <span>{order.statusLabel}</span>
          </span>
        );
      case "in_assembly":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAE7E1] text-[#424744]">
            <span className="material-symbols-outlined text-[15px]">
              handyman
            </span>
            <span>{order.statusLabel}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0F5F9] text-[#002941]">
            <span className="material-symbols-outlined text-[15px]">
              check_circle
            </span>
            <span>{order.statusLabel}</span>
          </span>
        );
    }
  };

  const getAvatarGradient = () => {
    if (order.status === "awaiting_qc" || order.isDispatchUrgent) {
      return "bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs";
    }
    if (order.status === "in_machining") {
      return "bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576] text-[#CFE8E1] shadow-xs";
    }
    return "bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs";
  };

  const getProgressBarVariant = (): "coral" | "mint" | "navy" => {
    if (order.status === "awaiting_qc" || order.isDispatchUrgent) {
      return "coral";
    }
    if (order.status === "in_machining" || order.status === "completed") {
      return "mint";
    }
    return "navy";
  };

  return (
    <Card
      variant="default"
      padding="sm"
      className={`border-[#DFECF3] shadow-xs hover:border-[#BDD7E7] transition-all space-y-3.5 ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onViewAllocation && onViewAllocation(order)}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs tracking-wide shrink-0 transition-transform group-hover:scale-105 ${getAvatarGradient()}`}
          >
            {order.clientInitials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-[#002941] group-hover:text-[#2D8576] transition tracking-tight truncate">
                {order.clientName}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-[#F0F5F9] border border-[#DFECF3] text-[#002941] font-mono text-[11px] font-semibold tabular-nums shrink-0">
                {order.poNumber}
              </span>
            </div>
            <p className="text-xs text-[#566E7F] truncate mt-0.5">
              {order.partDescription}
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto shrink-0">
          {getStatusBadge()}
        </div>
      </div>

      {/* 4-Stat Nested Data Well */}
      <div className="bg-[#F8FAFA] border border-[#DFECF3] rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="block text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider">
            Quantity
          </span>
          <span className="font-bold text-[#002941] tabular-nums mt-0.5 block">
            {order.quantity.toLocaleString()} {order.unit}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider">
            Dispatch Due
          </span>
          <span
            className={`font-bold tabular-nums mt-0.5 block ${
              order.isDispatchUrgent ? "text-[#FD6E6E]" : "text-[#002941]"
            }`}
          >
            {order.dispatchDue}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider">
            Assigned
          </span>
          <span
            className="font-bold text-[#002941] mt-0.5 block truncate"
            title={order.assignedMachine}
          >
            {order.assignedMachine}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider">
            Contract Value
          </span>
          <span className="font-bold text-[#002941] tabular-nums mt-0.5 block">
            {order.currencySymbol || "₹"}
            {order.contractValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress & Actions Bottom Bar */}
      <div className="pt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#566E7F] font-medium">
              Order Fulfillment Progress
            </span>
            <span className="font-bold text-[#002941] tabular-nums">
              {order.progressPercent}% Complete
            </span>
          </div>
          <PillProgressBar
            value={order.progressPercent}
            max={100}
            variant={getProgressBarVariant()}
            height="sm"
            trackClassName="bg-[#DFECF3]"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          {order.needsQc || order.status === "awaiting_qc" ? (
            <PillButton
              variant="coral"
              size="sm"
              icon={
                <span className="material-symbols-outlined text-[16px]">
                  bolt
                </span>
              }
              onClick={() => onFastTrackQc && onFastTrackQc(order)}
              className="shadow-xs font-bold"
            >
              Fast-Track QC
            </PillButton>
          ) : (
            <PillButton
              variant="secondary"
              size="sm"
              icon={
                <span className="material-symbols-outlined text-[16px]">
                  visibility
                </span>
              }
              onClick={() => onViewAllocation && onViewAllocation(order)}
              className="bg-[#F0F5F9] border border-[#DFECF3] hover:border-[#BDD7E7] text-[#002941] font-semibold"
            >
              View Allocation
            </PillButton>
          )}

          <button
            type="button"
            title="More order actions"
            onClick={() => onMoreActions && onMoreActions(order)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] border border-[#DFECF3] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              more_vert
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCommitmentCard;
