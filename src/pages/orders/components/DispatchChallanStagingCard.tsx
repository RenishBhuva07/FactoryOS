import React from 'react';
import type { DispatchChallanInfo } from '../../../types/orders';

export interface DispatchChallanStagingCardProps {
  challan: DispatchChallanInfo;
  onViewChallan?: (challan: DispatchChallanInfo) => void;
  className?: string;
}

export const DispatchChallanStagingCard: React.FC<DispatchChallanStagingCardProps> = ({
  challan,
  onViewChallan,
  className = '',
}) => {
  return (
    <div
      onClick={() => onViewChallan && onViewChallan(challan)}
      className={`rounded-2xl p-4 bg-[#F4FAF8] border border-[#CFE8E1] shadow-2xs flex items-start gap-3 transition-all ${
        onViewChallan ? 'cursor-pointer hover:border-[#74BFB0]' : ''
      } ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shrink-0 shadow-xs">
        <span className="material-symbols-outlined text-[19px]">local_shipping</span>
      </div>

      <div className="min-w-0 space-y-0.5">
        <h4 className="text-xs font-bold text-[#002941] tracking-tight">
          Dispatch Challan Staging
        </h4>
        <p className="text-xs text-[#566E7F] leading-relaxed">
          {challan.notes}
        </p>
      </div>
    </div>
  );
};

export default DispatchChallanStagingCard;
