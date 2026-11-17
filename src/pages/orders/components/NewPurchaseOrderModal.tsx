import React, { useState } from 'react';
import { PillButton, PillInput } from '../../../components/common';
import type { OrderCommitment } from '../../../types/orders';

export interface NewPurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOrder: Partial<OrderCommitment>) => void;
  initialData?: Partial<OrderCommitment>;
}

export const NewPurchaseOrderModal: React.FC<NewPurchaseOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [poNumber, setPoNumber] = useState(
    () => initialData?.poNumber || `PO #ORD-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [partDescription, setPartDescription] = useState(
    initialData?.partDescription || ''
  );
  const [quantity, setQuantity] = useState(
    initialData?.quantity?.toString() || '1000'
  );
  const [unit, setUnit] = useState(initialData?.unit || 'Units');
  const [dispatchDue, setDispatchDue] = useState(
    initialData?.dispatchDue || 'Nov 18, 17:00 IST'
  );
  const [assignedMachine, setAssignedMachine] = useState(
    initialData?.assignedMachine || 'Machine M-01 (CNC Lathe)'
  );
  const [contractValue, setContractValue] = useState(
    initialData?.contractValue?.toString() || '350000'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = clientName
      ? clientName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'PO';

    onSubmit({
      clientName: clientName || 'New Client Enterprise',
      clientInitials: initials,
      poNumber: poNumber || 'PO #ORD-1050',
      partDescription: partDescription || 'Precision Machined Bushings',
      quantity: Number(quantity) || 1000,
      unit: unit || 'Units',
      dispatchDue: dispatchDue || 'Nov 20, 17:00 IST',
      assignedMachine: assignedMachine || 'Line 01 (CNC)',
      contractValue: Number(contractValue) || 300000,
      status: 'in_machining',
      statusLabel: 'In Machining',
      statusVariant: 'inProgress',
      progressPercent: 15,
      needsQc: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/50 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#DFECF3] shadow-[0_20px_60px_-15px_rgba(0,41,65,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4.5 border-b border-[#DFECF3] flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] to-[#164E6E] text-white flex items-center justify-center shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#002941]">New Purchase Order</h3>
              <p className="text-xs text-[#566E7F]">Log committed client order & allocate line</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">Client Account</label>
              <PillInput
                placeholder="e.g. Mehta Industrial Spares"
                value={clientName}
                onChange={setClientName}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">PO Reference Number</label>
              <PillInput
                placeholder="e.g. PO #ORD-1045"
                value={poNumber}
                onChange={setPoNumber}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#002941]">Part / Component Description</label>
            <PillInput
              placeholder="e.g. Mild Steel Flange Bushings (Series 40)"
              value={partDescription}
              onChange={setPartDescription}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">Order Quantity</label>
              <PillInput
                type="number"
                placeholder="850"
                value={quantity}
                onChange={setQuantity}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">Unit of Measurement</label>
              <PillInput
                placeholder="Units, Pcs, Kg"
                value={unit}
                onChange={setUnit}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">Dispatch Due Date</label>
              <PillInput
                placeholder="e.g. Tomorrow, 17:00 IST"
                value={dispatchDue}
                onChange={setDispatchDue}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#002941]">Assigned Machine / Line</label>
              <PillInput
                placeholder="e.g. Machine M-01 (CNC Lathe)"
                value={assignedMachine}
                onChange={setAssignedMachine}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#002941]">Contract Value (₹)</label>
            <PillInput
              type="number"
              placeholder="₹ 425000"
              value={contractValue}
              onChange={setContractValue}
            />
          </div>

          <div className="pt-3 border-t border-[#DFECF3] flex items-center justify-end gap-2.5">
            <PillButton
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
            >
              Cancel
            </PillButton>
            <PillButton
              type="submit"
              variant="primary"
              size="md"
              icon={<span className="material-symbols-outlined text-[18px]">check</span>}
            >
              Create Order Commitment
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPurchaseOrderModal;
