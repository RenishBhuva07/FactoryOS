import React from 'react';
import { Card, PillProgressBar } from '../../../components/common';
import type { EWayBillSyncStatus } from '../../../types/dispatch';

export interface EWayBillSyncCardProps {
  status: EWayBillSyncStatus;
  className?: string;
}

export const EWayBillSyncCard: React.FC<EWayBillSyncCardProps> = ({
  status,
  className = '',
}) => {
  const percentUsed = Math.round((status.dailyPassUsed / status.dailyPassLimit) * 100);

  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">fact_check</span>
          </div>
          <h2 className="text-base font-bold text-[#002941] tracking-tight">
            Gujarat E-Way Bill Sync
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D8576] animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#DFECF3]/70">
          <span className="text-[#566E7F] font-medium">NIC Portal Gateway</span>
          <span className="font-semibold text-[#002941] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#43A392]" />
            Connected
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#DFECF3]/70">
          <span className="text-[#566E7F] font-medium">GSTIN Auto-Verification</span>
          <span className="font-semibold text-[#2D8576] tabular-nums">
            {status.compliancePercent}% Compliant
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#566E7F] font-medium">Daily Auto-Pass Limit</span>
            <span className="font-bold text-[#002941] tabular-nums">
              {status.dailyPassUsed} / {status.dailyPassLimit} used
            </span>
          </div>
          <PillProgressBar
            value={percentUsed}
            max={100}
            variant="mint"
            height="sm"
          />
        </div>
      </div>
    </Card>
  );
};
