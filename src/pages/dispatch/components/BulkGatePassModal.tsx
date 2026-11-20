import React, { useState } from "react";
import { PillButton } from "../../../components/common";
import type { OutboundShipment } from "../../../types/dispatch";

export interface BulkGatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipments: OutboundShipment[];
  onSignBulkGatePass: (selectedIds: string[]) => void;
}

export const BulkGatePassModal: React.FC<BulkGatePassModalProps> = ({
  isOpen,
  onClose,
  shipments,
  onSignBulkGatePass,
}) => {
  const eligibleShipments = shipments.filter(
    (s) =>
      s.status === "loading" ||
      s.actionType === "sign_eway" ||
      s.status === "in_transit",
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    eligibleShipments.map((s) => s.id),
  );
  const [driverContactVerified, setDriverContactVerified] = useState(true);
  const [ewayPortalSynced, setEwayPortalSynced] = useState(true);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === eligibleShipments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleShipments.map((s) => s.id));
    }
  };

  const handleSign = () => {
    if (selectedIds.length === 0) return;
    onSignBulkGatePass(selectedIds);
    onClose();
  };

  const totalUnits = eligibleShipments
    .filter((s) => selectedIds.includes(s.id))
    .reduce((acc, s) => acc + s.volumeUnits, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-[28px] border border-[#DFECF3] shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">
                receipt_long
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#002941]">
                Bulk Digital Gate Pass Authorization
              </h2>
              <p className="text-xs text-[#566E7F]">
                Batch sign GST & NIC E-Way compliant gate passes for outbound
                carriers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F0F5F9] text-[#566E7F] hover:text-[#002941] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-[#F0F5F9] border border-[#DFECF3]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F]">
              Selected Trucks
            </span>
            <div className="text-xl font-bold text-[#002941] tabular-nums mt-0.5">
              {selectedIds.length}{" "}
              <span className="text-xs font-normal text-[#566E7F]">
                / {eligibleShipments.length}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#CFE8E1]/30 border border-[#CFE8E1]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#002941]">
              Units Staged
            </span>
            <div className="text-xl font-bold text-[#002941] tabular-nums mt-0.5">
              {totalUnits.toLocaleString("en-IN")}{" "}
              <span className="text-xs font-normal text-[#566E7F]">units</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#F0F5F9] border border-[#DFECF3]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F]">
              E-Way Portal
            </span>
            <div className="text-xs font-bold text-[#2A7E6C] mt-1.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2A7E6C] animate-pulse" />
              API Synced
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={toggleSelectAll}
            className="text-xs font-semibold text-[#002941] hover:underline flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {selectedIds.length === eligibleShipments.length
                ? "check_box"
                : "check_box_outline_blank"}
            </span>
            {selectedIds.length === eligibleShipments.length
              ? "Deselect All"
              : "Select All Outbound Consignments"}
          </button>
          <span className="text-xs text-[#566E7F]">
            Plant Gate 04 • Highway Exit
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1">
          {eligibleShipments.map((shipment) => {
            const isSelected = selectedIds.includes(shipment.id);
            return (
              <div
                key={shipment.id}
                onClick={() => toggleSelect(shipment.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-[#CFE8E1]/15 border-[#002941]/30"
                    : "bg-[#F9FBFC] border-[#DFECF3] opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
                      isSelected
                        ? "bg-[#002941] border-[#002941] text-white"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px]">
                        check
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#002941] font-mono">
                        {shipment.consignmentNumber}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#EBF1F5] text-[#002941]">
                        {shipment.gatePassNumber}
                      </span>
                    </div>
                    <div className="text-xs text-[#566E7F] truncate font-medium mt-0.5">
                      {shipment.clientName} •{" "}
                      {shipment.volumeUnits.toLocaleString("en-IN")} pcs
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-[#002941]">
                    {shipment.carrierName}
                  </div>
                  <div className="text-[11px] text-[#566E7F] font-mono">
                    {shipment.vehicleNumber}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2 pt-2 border-t border-[#DFECF3] shrink-0 text-xs">
          <label className="flex items-center gap-2 text-[#002941] font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={driverContactVerified}
              onChange={(e) => setDriverContactVerified(e.target.checked)}
              className="rounded text-[#002941] focus:ring-0"
            />
            Driver identity, license & physical vehicle match checked at
            security cabin
          </label>
          <label className="flex items-center gap-2 text-[#002941] font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={ewayPortalSynced}
              onChange={(e) => setEwayPortalSynced(e.target.checked)}
              className="rounded text-[#002941] focus:ring-0"
            />
            Auto-generate NIC E-Way Bill JSON and push to transporter WhatsApp
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 shrink-0">
          <PillButton variant="ghost" size="md" onClick={onClose}>
            Cancel
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            disabled={selectedIds.length === 0}
            icon={
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
            }
            onClick={handleSign}
          >
            Authorize & Issue {selectedIds.length} Gate Passes
          </PillButton>
        </div>
      </div>
    </div>
  );
};
