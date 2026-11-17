import React from 'react';

export interface SafetyStockAlertBannerProps {
  onGenerateRequisition?: () => void;
  className?: string;
}

export const SafetyStockAlertBanner: React.FC<SafetyStockAlertBannerProps> = ({
  onGenerateRequisition,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 bg-[#FFF4F3] border border-[#FFD0CC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">warning</span>
        </div>
        <div className="space-y-0.5">
          <h2 className="text-sm sm:text-base font-bold text-[#871919]">
            Safety Stock Alert: Critical Reorder Level Breached
          </h2>
          <p className="text-xs sm:text-[13px] text-[#AB1B1B] max-w-3xl leading-relaxed">
            Safety Stock Alert: EN8 Bright Bars (32mm) & High-Tensile Bolts (M10) below reorder level. Pending supplier quotation.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerateRequisition}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs hover:opacity-95 transition-all cursor-pointer shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
        Generate Purchase Requisition (₹48,000)
      </button>
    </div>
  );
};
