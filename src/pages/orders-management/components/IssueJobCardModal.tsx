import React, { useState } from "react";
import { PillButton } from "../../../components/common";
import type { OrderCommitment } from "../../../types/orders";
import type { IssueJobCardParams } from "../../../types/factoryStore";

export interface IssueJobCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderCommitment[];
  onSubmit: (params: IssueJobCardParams) => void;
}

const PRODUCTION_LINES = [
  "Line 01 (CNC Lathe 1)",
  "Line 02 (CNC Lathe 2)",
  "Line 03 (Conventional Lathes)",
  "Line 04 (VMC Milling 800)",
  "Line 05 (Drilling & Tapping)",
];

export const IssueJobCardModal: React.FC<IssueJobCardModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSubmit,
}) => {
  const [selectedPo, setSelectedPo] = useState(
    orders[0]?.poNumber || "PO #ORD-1048",
  );
  const [clientName, setClientName] = useState(
    orders[0]?.clientName || "Tata Motors Ancillary",
  );
  const [partDescription, setPartDescription] = useState(
    orders[0]?.partDescription || "Valve Guides",
  );
  const [quantity, setQuantity] = useState(String(orders[0]?.quantity || 1200));
  const [assignedLine, setAssignedLine] = useState(PRODUCTION_LINES[0]);
  const [targetDueDate, setTargetDueDate] = useState("In 3 Days (Shift A)");

  if (!isOpen) return null;

  const handlePoChange = (po: string) => {
    setSelectedPo(po);
    const matched = orders.find((o) => o.poNumber === po);
    if (matched) {
      setClientName(matched.clientName);
      setPartDescription(matched.partDescription);
      setQuantity(String(matched.quantity));
      if (matched.assignedMachine) {
        const foundLine = PRODUCTION_LINES.find((l) =>
          matched.assignedMachine.includes(l.slice(0, 7)),
        );
        if (foundLine) setAssignedLine(foundLine);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10) || 500;

    onSubmit({
      poNumber: selectedPo,
      clientName,
      partDescription,
      quantityUnits: qty,
      assignedLine,
      dispatchDueDate: targetDueDate,
      contractValue: `₹${((qty * 320) / 100000).toFixed(1)}L`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#DFECF3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#002941] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">
                assignment_add
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                Issue Production Job Card
              </h2>
              <p className="text-[11px] text-[#566E7F]">
                Dispatch work order to shopfloor line &amp; supervisor workbench
              </p>
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

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Select Source PO */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Source Purchase Order
            </label>
            <select
              value={selectedPo}
              onChange={(e) => handlePoChange(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.poNumber}>
                  {o.poNumber} — {o.clientName} ({o.quantity} pcs)
                </option>
              ))}
            </select>
          </div>

          {/* Client & Part Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#566E7F]">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full h-9 px-3 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#566E7F]">
                Quantity (pcs)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-9 px-3 text-xs font-bold text-[#002941] bg-[#F8FAFA] border border-[#DFECF3] rounded-xl focus:outline-hidden focus:bg-white tabular-nums"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Part Description
            </label>
            <input
              type="text"
              value={partDescription}
              onChange={(e) => setPartDescription(e.target.value)}
              className="w-full h-10 px-3 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            />
          </div>

          {/* Line Allocation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Target Production Line Allocation
            </label>
            <select
              value={assignedLine}
              onChange={(e) => setAssignedLine(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            >
              {PRODUCTION_LINES.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>
          </div>

          {/* Target Due */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Fulfillment Timeline / Target Window
            </label>
            <input
              type="text"
              value={targetDueDate}
              onChange={(e) => setTargetDueDate(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#E4F4F0] border border-[#CFE8E1] text-[11px] text-[#184E46] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
              auto_awesome
            </span>
            <span>
              BOM raw materials will be automatically allocated from Stores
              Master.
            </span>
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
                  rocket_launch
                </span>
              }
              iconPosition="right"
              className="font-bold shadow-xs"
            >
              Dispatch Work Order
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueJobCardModal;
