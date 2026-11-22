import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { BomReadinessItem } from '../../../types/orders';

export interface BomReadinessCardProps {
  items: BomReadinessItem[];
  className?: string;
}

export const BomReadinessCard: React.FC<BomReadinessCardProps> = ({
  items,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            BOM Allocation Readiness
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
          Active Jobs
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {items.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#002941] truncate">{item.material}</span>
              <span className="font-bold text-[#002941] tabular-nums">
                {item.allocationPercent}%
              </span>
            </div>
            <PillProgressBar
              value={item.allocationPercent}
              max={100}
              variant={item.status === 'ready' ? 'mint' : 'coral'}
              height="sm"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BomReadinessCard;
