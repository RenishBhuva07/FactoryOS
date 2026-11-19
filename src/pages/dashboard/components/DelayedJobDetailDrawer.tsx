import React from "react";
import { PillButton } from "../../../components/common";
import type { AttentionAlertItem } from "../../../types/dashboard";
import type { OrderCommitment } from "../../../types/orders";

export interface DelayedJobDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alert: AttentionAlertItem | null;
  matchingOrder?: OrderCommitment | null;
  onAllocateStock?: () => void;
  onFastTrackQc?: () => void;
  onResolveAlert?: (alertId: string) => void;
}

export const DelayedJobDetailDrawer: React.FC<DelayedJobDetailDrawerProps> = ({
  isOpen,
  onClose,
  alert,
  matchingOrder,
  onAllocateStock,
  onFastTrackQc,
  onResolveAlert,
}) => {
  if (!isOpen || !alert) return null;

  const isOrderRelated =
    alert.id.includes("1042") ||
    alert.id.includes("1039") ||
    alert.id.includes("ORD") ||
    !!matchingOrder;
  const isMachineRelated =
    alert.id.includes("Lathe") ||
    alert.id.includes("mac") ||
    alert.id.includes("TKT") ||
    alert.categoryIcon === "build";

  const poNumber =
    matchingOrder?.poNumber ||
    (alert.title.includes("PO #")
      ? alert.title.match(/PO #ORD-\d+/)?.[0] || "PO #ORD-1039"
      : "PO #ORD-1039");
  const clientName =
    matchingOrder?.clientName || "Bharat Forge Components (Sanand)";
  const partDescription =
    matchingOrder?.partDescription || "Mild Steel Flange Bushings (Series 40)";
  const assignedSupervisor = "Amit Patel (Shift B Lead)";
  const nextActionOwner = isMachineRelated
    ? "Suresh Bhai (Maintenance Tech)"
    : "Rajesh Bhai Patel (Factory Owner)";

  const handleResolve = () => {
    onResolveAlert?.(alert.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between p-5 sm:p-6 border-l border-[#DFECF3] animate-in slide-in-from-right duration-250 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566E7F] hover:text-[#002941] px-2.5 py-1.5 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              <span>Return to Overview</span>
            </button>

            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FFF4F3] text-[#AB1B1B] border border-[#FFD0CC]">
              {alert.badgeText}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">
                  {alert.categoryIcon}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#002941] tracking-tight">
                {alert.title}
              </h2>
            </div>
            <p className="text-xs text-[#566E7F] leading-relaxed">
              {alert.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF4F3] border border-[#FFD0CC] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AB1B1B]">
                Immediate Action Required
              </span>
              <span className="text-[10.5px] font-bold text-[#AB1B1B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FD6E6E] animate-ping" />
                Root Cause Identified
              </span>
            </div>
            <p className="text-xs font-semibold text-[#002941]">
              {isMachineRelated
                ? "Spindle lubrication & 500-hr toolhead calibration due before line startup."
                : "Raw material shortage on EN8 Steel Rods (16mm). 45 kg in stores vs 320 kg required."}
            </p>
            <div className="pt-1 flex items-center justify-between text-xs text-[#566E7F] border-t border-[#FFD0CC]/60">
              <span>Next Action Owner:</span>
              <span className="font-bold text-[#002941]">
                {nextActionOwner}
              </span>
            </div>
          </div>

          {isOrderRelated && (
            <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#566E7F]">
                    Target Job Card
                  </span>
                  <h3 className="text-sm font-bold text-[#002941]">
                    {poNumber}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#184E46] bg-[#CFE8E1] px-2.5 py-0.5 rounded-full">
                  Shift B Priority
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#566E7F]">
                  <span>Client:</span>
                  <span className="font-semibold text-[#002941]">
                    {clientName}
                  </span>
                </div>
                <div className="flex justify-between text-[#566E7F]">
                  <span>Component:</span>
                  <span className="font-semibold text-[#002941] truncate max-w-[200px]">
                    {partDescription}
                  </span>
                </div>
                <div className="flex justify-between text-[#566E7F]">
                  <span>Floor Lead:</span>
                  <span className="font-semibold text-[#002941]">
                    {assignedSupervisor}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DFECF3] space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#566E7F]">Job Progress</span>
                  <span className="font-bold text-[#002941] tabular-nums">
                    410 / 1,500 pcs (27.3%)
                  </span>
                </div>
                <div className="w-full bg-[#EBF1F5] rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FD6E6E] to-[#F04646] h-full rounded-full w-[27.3%]" />
                </div>
              </div>
            </div>
          )}

          {isMachineRelated && (
            <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#566E7F]">
                    Workstation Fleet
                  </span>
                  <h3 className="text-sm font-bold text-[#002941]">
                    Lathe #04 (Conventional 6ft)
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#AB1B1B] bg-[#FFF4F3] px-2.5 py-0.5 rounded-full">
                  Offline (Maintenance)
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#566E7F]">
                  <span>Bay Location:</span>
                  <span className="font-semibold text-[#002941]">
                    Bay C (General Turning)
                  </span>
                </div>
                <div className="flex justify-between text-[#566E7F]">
                  <span>Assigned Technician:</span>
                  <span className="font-semibold text-[#002941]">
                    Suresh Bhai
                  </span>
                </div>
                <div className="flex justify-between text-[#566E7F]">
                  <span>Est. Resumption:</span>
                  <span className="font-semibold text-[#002941] tabular-nums">
                    16:30 IST (45 mins)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-5 mt-5 border-t border-[#DFECF3] space-y-2.5">
          {isOrderRelated && onAllocateStock && (
            <PillButton
              type="button"
              variant="mintGradient"
              size="md"
              onClick={() => {
                onAllocateStock();
                onClose();
              }}
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  inventory
                </span>
              }
              className="w-full justify-center font-bold"
            >
              Allocate Alternative Stock (EN8 20mm)
            </PillButton>
          )}

          {isOrderRelated && onFastTrackQc && (
            <PillButton
              type="button"
              variant="secondary"
              size="md"
              onClick={() => {
                onFastTrackQc();
                onClose();
              }}
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
              }
              className="w-full justify-center font-bold"
            >
              Sign-Off Fast-Track QC
            </PillButton>
          )}

          <div className="flex items-center gap-2">
            <PillButton
              type="button"
              variant="coral"
              size="md"
              onClick={handleResolve}
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
              }
              className="flex-1 justify-center font-bold"
            >
              Mark Resolved
            </PillButton>

            <PillButton
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
              className="text-xs font-bold"
            >
              Dismiss
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayedJobDetailDrawer;
