import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface NewPurchaseRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requisition: {
    materialName: string;
    sku: string;
    requiredQuantity: number;
    unit: string;
    estimatedCost: number;
    supplierName: string;
    urgencyLevel: 'standard' | 'critical';
  }) => void;
  initialMaterial?: string;
  initialEstimatedCost?: number;
}

export const NewPurchaseRequisitionModal: React.FC<NewPurchaseRequisitionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialMaterial = 'EN8 Carbon Steel Rounds (32mm) & High-Tensile Bolts',
  initialEstimatedCost = 48000,
}) => {
  const [materialName, setMaterialName] = useState(initialMaterial);
  const [sku, setSku] = useState('EN8-RD-032 / BLT-M10-G88');
  const [requiredQuantity, setRequiredQuantity] = useState(500);
  const [unit, setUnit] = useState('kg / pcs');
  const [estimatedCost, setEstimatedCost] = useState(initialEstimatedCost);
  const [supplierName, setSupplierName] = useState('Shah & Co. Steel Traders (Ahmedabad)');
  const [urgencyLevel, setUrgencyLevel] = useState<'standard' | 'critical'>('critical');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      materialName,
      sku,
      requiredQuantity: Number(requiredQuantity),
      unit,
      estimatedCost: Number(estimatedCost),
      supplierName,
      urgencyLevel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DFECF3] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-[#DFECF3] flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#002941]">Generate Purchase Requisition</h3>
              <p className="text-xs text-[#566E7F]">Stores replenishment and vendor PO requisition</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-white transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Material Description
            </label>
            <input
              type="text"
              required
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                SKU / Master Code
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Primary Supplier
              </label>
              <input
                type="text"
                required
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Required Qty
              </label>
              <input
                type="number"
                required
                value={requiredQuantity}
                onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] tabular-nums focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Unit
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Est. Cost (INR)
              </label>
              <input
                type="number"
                required
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] tabular-nums focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Urgency Priority
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUrgencyLevel('standard')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  urgencyLevel === 'standard'
                    ? 'bg-[#002941] text-white border-[#002941]'
                    : 'bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Standard (Next Cycle)
              </button>
              <button
                type="button"
                onClick={() => setUrgencyLevel('critical')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  urgencyLevel === 'critical'
                    ? 'bg-[#FD6E6E] text-white border-[#FD6E6E]'
                    : 'bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Critical (Immediate Dispatch)
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DFECF3] flex items-center justify-end gap-2.5">
            <PillButton type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton type="submit" variant="primary" size="sm">
              Submit Requisition (₹{estimatedCost.toLocaleString('en-IN')})
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};
