import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { DefectRootCauseItem } from '../../../types/reports';

export interface DefectRootCausesCardProps {
  causes: DefectRootCauseItem[];
  onViewDetailedLog?: () => void;
  className?: string;
}

export const DefectRootCausesCard: React.FC<DefectRootCausesCardProps> = ({
  causes,
  onViewDetailedLog,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col justify-between gap-3.5 ${className}`}>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#DFECF3]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Scrap & Defect Root Causes
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Breakdown of manufacturing defects
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE6E4] text-[#D62727] self-start sm:self-auto">
            Total Loss: $4,250
          </span>
        </div>

        <div className="space-y-3 pt-3">
          {causes.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#002941]">{item.reason}</span>
                <span className="text-[11px] font-bold text-[#002941] tabular-nums">
                  {item.percent}% ({item.lossAmount})
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
      </div>

      <div className="pt-2.5 mt-1 border-t border-[#DFECF3] flex items-center justify-between text-xs">
        <span className="text-[#2D8576] font-semibold">
          Compared to last month: -15% defect total
        </span>
        <button
          type="button"
          onClick={onViewDetailedLog}
          className="font-bold text-[#002941] hover:underline cursor-pointer"
        >
          View Detailed Log
        </button>
      </div>
    </Card>
  );
};
