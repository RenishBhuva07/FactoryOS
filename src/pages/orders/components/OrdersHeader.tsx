import React from 'react';
import { PillButton } from '../../../components/common';

export interface OrdersHeaderProps {
  activeOrdersCount?: number;
  plantLocation?: string;
  onExportCsv?: () => void;
  onNewPurchaseOrder?: () => void;
  className?: string;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  activeOrdersCount = 12,
  plantLocation = 'GIDC Naroda',
  onExportCsv,
  onNewPurchaseOrder,
  className = '',
}) => {
  return (
    <section className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 shrink-0 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#566E7F]">
            Commercial & Production Pipeline
          </span>
          <span className="text-[#8DA1AF] text-xs">•</span>
          <span className="text-[11px] font-bold tracking-wide uppercase text-[#2D8576] bg-[#E4F4F0] px-2 py-0.5 rounded-full">
            Active Orders ({activeOrdersCount})
          </span>
        </div>
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
          Orders & Purchase Commitments
        </h1>
        <p className="text-xs sm:text-sm text-[#566E7F]">
          Purchase orders, workshop machine allocation, and delivery commitments for {plantLocation}.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        <PillButton
          variant="secondary"
          size="md"
          icon={<span className="material-symbols-outlined text-[18px]">download</span>}
          onClick={onExportCsv}
          className="bg-[#F0F5F9] border border-[#DFECF3] hover:bg-[#DFECF3] font-semibold shadow-2xs"
        >
          Export Orders CSV
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
    </section>
  );
};

export default OrdersHeader;
