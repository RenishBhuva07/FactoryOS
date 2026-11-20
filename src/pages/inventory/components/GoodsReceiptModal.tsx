import React, { useState } from "react";
import { PillButton } from "../../../components/common";
import type { InventoryItem } from "../../../types/inventory";

export interface GoodsReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onSubmit: (params: {
    poOrInvoice: string;
    items: { itemId: string; quantityReceived: number }[];
    supplierName: string;
  }) => void;
}

const SUPPLIERS = [
  "Shah & Co. Steel Traders (Ahmedabad)",
  "National Fasteners (Rajkot)",
  "Gujarat Industrial Tooling (Vadodara)",
  "Apex Alloy Distributors (Sanand)",
];

export const GoodsReceiptModal: React.FC<GoodsReceiptModalProps> = ({
  isOpen,
  onClose,
  items,
  onSubmit,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id || "");
  const [quantity, setQuantity] = useState("500");
  const [supplierName, setSupplierName] = useState(SUPPLIERS[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Math.floor(8000 + Math.random() * 1900)}`,
  );
  const [vehicleNumber, setVehicleNumber] = useState("GJ-01-TA-4491");

  if (!isOpen) return null;

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10) || 100;

    onSubmit({
      poOrInvoice: `${invoiceNumber} (${vehicleNumber})`,
      supplierName,
      items: [{ itemId: selectedItem.id, quantityReceived: qty }],
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
            <div className="w-8 h-8 rounded-full bg-[#184E46] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">
                receipt_long
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                Goods Receipt Note (GRN Entry)
              </h2>
              <p className="text-[11px] text-[#566E7F]">
                Receive vendor consignment &amp; update stores stock balance
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
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Vendor / Supplier
            </label>
            <select
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            >
              {SUPPLIERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#566E7F]">
                Challan / Invoice No.
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full h-9 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#566E7F]">
                Delivery Vehicle No.
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full h-9 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Received Raw Material / SKU
            </label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
            >
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.materialName} ({i.sku}) • Current: {i.currentStock}{" "}
                  {i.currentStockUnit}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">
              Accepted Quantity ({selectedItem?.currentStockUnit || "units"})
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-10 px-3.5 text-xs font-bold text-[#002941] bg-[#F8FAFA] border border-[#DFECF3] rounded-xl focus:outline-hidden focus:bg-white tabular-nums"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#E4F4F0] border border-[#CFE8E1] text-[11px] text-[#184E46] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
              scale
            </span>
            <span>
              Weighbridge &amp; stores physical count verified. Bin card will be
              credited.
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
              variant="mintGradient"
              size="md"
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
              }
              iconPosition="right"
              className="font-bold shadow-xs"
            >
              Confirm Goods Receipt (GRN)
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoodsReceiptModal;
