import React from 'react';
import { PillButton } from '../../../components/common';

export interface DispatchHeaderProps {
  onGenerateBulkGatePass?: () => void;
  onScheduleDispatch?: () => void;
  className?: string;
}

export const DispatchHeader: React.FC<DispatchHeaderProps> = ({
  onGenerateBulkGatePass,
  onScheduleDispatch,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EBF1F5] text-[#002941] border border-[#DFECF3]">
            Outbound Fleet & Freight
          </span>
          <span className="text-xs text-[#566E7F] font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#43A392] animate-pulse" />
            System Time: 14:32 IST • Gate Active
          </span>
        </div>

        <div className="text-xs font-semibold text-[#566E7F]">
          LOGISTICS & OUTBOUND • Plant #04 Pune/Ahmedabad Route
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Dispatch & Fleet Logistics
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Gate pass generation, carrier consignment dispatch, and delivery tracking across Gujarat industrial corridors.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">receipt_long</span>}
            onClick={onGenerateBulkGatePass}
          >
            Generate Bulk Gate Pass
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">local_shipping</span>}
            onClick={onScheduleDispatch}
          >
            Schedule Dispatch
          </PillButton>
        </div>
      </div>
    </header>
  );
};
