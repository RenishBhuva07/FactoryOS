import React from 'react';
import { PillButton } from '../../../components/common';

export interface InventoryHeaderProps {
  onGoodsReceipt?: () => void;
  onNewPurchaseOrder?: () => void;
  className?: string;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onGoodsReceipt,
  onNewPurchaseOrder,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#566E7F]">
            GIDC NARODA • STORE ROOM B
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE6E4] text-[#D62727]">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            2 items below safety stock
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Raw Materials & Stores Inventory
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Real-time shopfloor stock levels, critical reorder thresholds, and bin card allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">receipt_long</span>}
            onClick={onGoodsReceipt}
          >
            Goods Receipt (GRN)
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">add</span>}
            onClick={onNewPurchaseOrder}
          >
            New Purchase Order
          </PillButton>
        </div>
      </div>
    </header>
  );
};
