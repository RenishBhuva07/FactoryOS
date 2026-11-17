import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { DefectReasonItem } from '../../../types/quality';

export interface DefectReasonBreakdownCardProps {
  reasons: DefectReasonItem[];
  className?: string;
}

export const DefectReasonBreakdownCard: React.FC<DefectReasonBreakdownCardProps> = ({
  reasons,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">pie_chart</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            Defect Reason Breakdown
          </h2>
        </div>
        <span className="text-xs text-[#566E7F] font-medium">This Month</span>
      </div>

      <p className="text-xs text-[#566E7F]">
        Dominant variances across Naroda machining shop
      </p>

      <div className="space-y-3 pt-1">
        {reasons.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#002941]">{item.reason}</span>
              <span className="font-bold text-[#002941] tabular-nums">
                {item.percent}%
              </span>
            </div>
            <PillProgressBar
              value={item.percent}
              max={100}
              variant={item.colorVariant}
              height="sm"
            />
          </div>
        ))}
      </div>

      <div className="pt-2.5 mt-1 border-t border-[#DFECF3] flex items-center justify-between text-xs text-[#566E7F]">
        <span>ISO 9001:2015 MSME Quality Standards</span>
        <span className="font-bold text-[#2D8576] flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          Compliant
        </span>
      </div>
    </Card>
  );
};
