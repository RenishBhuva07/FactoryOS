import React, { useState } from "react";
import { PillButton } from "../../../components/common";
import type { InventoryItem } from "../../../types/inventory";

export interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onAdjust: (itemId: string, delta: number, reason: string) => void;
}

export const AdjustStockModal: React.FC<AdjustStockModalProps> = ({
  isOpen,
  onClose,
  item,
  onAdjust,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<"add" | "deduct">("add");
  const [amount, setAmount] = useState("50");
  const [reason, setReason] = useState("Physical Store Audit Reconciliation");

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount, 10) || 0;
    const delta = adjustmentType === "add" ? val : -val;

    onAdjust(item.id, delta, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-3xl border border-[#DFECF3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#002941] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">
                tune
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                Stock Balance Adjustment
              </h2>
              <p className="text-[11px] text-[#566E7F]">{item.materialName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] flex justify-between items-center text-xs">
            <span className="text-[#566E7F]">Current Bin Stock:</span>
            <span className="font-extrabold text-[#002941] text-sm tabular-nums">
              {item.currentStock} {item.currentStockUnit} ({item.binCard})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAdjustmentType("add")}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                adjustmentType === "add"
                  ? "bg-[#184E46] text-white border-[#184E46]"
                  : "bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]"
              }`}
            >
              + Stock In / Credit
            </button>
            <button
              type="button"
              onClick={() => setAdjustmentType("deduct")}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                adjustmentType === "deduct"
                  ? "bg-[#AB1B1B] text-white border-[#AB1B1B]"
                  : "bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]"
              }`}
            >
              - Issue / Write-off
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Quantity ({item.currentStockUnit})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-bold text-[#002941] bg-[#F8FAFA] border border-[#DFECF3] rounded-xl focus:outline-hidden focus:bg-white tabular-nums"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Adjustment Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            >
              <option value="Physical Store Audit Reconciliation">
                Physical Store Audit Reconciliation
              </option>
              <option value="Shopfloor Staging Issue">
                Shopfloor Staging Issue
              </option>
              <option value="Damaged / Scrap Write-off">
                Damaged / Scrap Write-off
              </option>
              <option value="Returned from Line 01 / 02">
                Returned from Line 01 / 02
              </option>
            </select>
          </div>

          <div className="pt-2 border-t border-[#DFECF3] flex items-center justify-between gap-3">
            <PillButton
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold"
            >
              Cancel
            </PillButton>

            <PillButton
              type="submit"
              variant="primary"
              size="md"
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  check
                </span>
              }
              className="font-bold shadow-xs"
            >
              Apply Adjustment
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustStockModal;
