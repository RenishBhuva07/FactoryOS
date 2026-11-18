import React from 'react';
import { Card } from '../../../components/common';

export interface SustainabilityComplianceCardProps {
  className?: string;
}

export const SustainabilityComplianceCard: React.FC<SustainabilityComplianceCardProps> = ({
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2 pb-1 border-b border-[#DFECF3]">
        <span className="material-symbols-outlined text-[20px] text-[#2D8576]">
          eco
        </span>
        <div>
          <span className="text-[10px] font-bold text-[#2D8576] tracking-wider uppercase block">
            Rooted Warmth Compliance
          </span>
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            Sustainable Plant Index
          </h2>
        </div>
      </div>

      <p className="text-xs text-[#566E7F] leading-relaxed">
        Plant #04 operates at 94.2% energy efficiency with zero toxic chemical runoff. Fully certified under Terra Organic Manufacturing Standards.
      </p>

      <div className="p-3 rounded-xl bg-[#F4FAF8] border border-[#CFE8E1] flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] font-medium text-[#566E7F] block">Audit Score</span>
          <span className="text-base font-bold text-[#002941] tabular-nums">98/100</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#CFE8E1] text-[#103530]">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          Verified
        </span>
      </div>
    </Card>
  );
};
