import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { SupplierReliability } from '../../../types/inventory';

export interface InventoryBottomCardsProps {
  suppliers: SupplierReliability[];
  onCreateGrn?: () => void;
  className?: string;
}

export const InventoryBottomCards: React.FC<InventoryBottomCardsProps> = ({
  suppliers,
  onCreateGrn,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-3.5 ${className}`}>
      {/* 1. Manual GRN Entry */}
      <Card padding="md" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm sm:text-base font-bold text-[#002941]">
              Manual GRN Entry
            </h2>
            <span className="material-symbols-outlined text-[20px] text-[#002941]">
              receipt_long
            </span>
          </div>
          <p className="text-xs text-[#566E7F] leading-relaxed">
            Record Goods Receipt Note (GRN) on delivery challan arrival, verify physical weight, and record bin location entry.
          </p>
        </div>

        <div className="pt-4 mt-3 border-t border-[#DFECF3] flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-[#566E7F]">Latest GRN</div>
            <div className="text-xs sm:text-[13px] font-bold text-[#002941] font-mono">
              #2024-089
            </div>
            <div className="text-[10px] text-[#2D8576] font-medium">Verified by Stores In-charge</div>
          </div>
          <button
            type="button"
            onClick={onCreateGrn}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-[#002941] text-white hover:bg-[#0C3953] transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            Create GRN
          </button>
        </div>
      </Card>

      {/* 2. Key Supplier Reliability */}
      <Card padding="md" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm sm:text-base font-bold text-[#002941]">
              Key Supplier Reliability
            </h2>
            <span className="material-symbols-outlined text-[20px] text-[#2D8576]">
              verified
            </span>
          </div>
          <p className="text-xs text-[#566E7F] leading-relaxed">
            On-time material delivery and batch test certificates compliance (past 90 days).
          </p>
        </div>

        <div className="space-y-3 pt-3 mt-2 border-t border-[#DFECF3]">
          {suppliers.map((sup) => (
            <div key={sup.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#002941] truncate">
                  {sup.supplierName} ({sup.location})
                </span>
                <span className="font-bold text-[#2D8576] tabular-nums shrink-0">
                  {sup.compliancePercent}%
                </span>
              </div>
              <PillProgressBar
                value={sup.compliancePercent}
                max={100}
                variant="mint"
                height="sm"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Weekly Store Audit */}
      <Card padding="md" className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm sm:text-base font-bold text-[#002941]">
              Weekly Store Audit
            </h2>
            <span className="material-symbols-outlined text-[20px] text-[#002941]">
              checklist
            </span>
          </div>
          <p className="text-xs text-[#566E7F] leading-relaxed">
            Physical stock tally against Bin Cards conducted every Saturday morning before production run.
          </p>
        </div>

        <div className="pt-3 mt-2 border-t border-[#DFECF3] space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#DFECF3]/60">
            <span className="text-[#566E7F]">Last Physical Tally</span>
            <span className="font-bold text-[#2D8576]">Last Saturday (100% Match)</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#566E7F]">Next Scheduled Audit</span>
            <span className="font-bold text-[#002941]">This Saturday, 09:00 AM</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
