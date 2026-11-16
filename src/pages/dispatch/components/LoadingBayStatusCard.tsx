import React from 'react';
import { Card } from '../../../components/common';
import type { LoadingBayStatus } from '../../../types/dispatch';

export interface LoadingBayStatusCardProps {
  bays: LoadingBayStatus[];
  className?: string;
}

export const LoadingBayStatusCard: React.FC<LoadingBayStatusCardProps> = ({
  bays,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">dock</span>
          </div>
          <h2 className="text-base font-bold text-[#002941] tracking-tight">
            Loading Bay Status
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#103530]">
          3 Bays Active
        </span>
      </div>

      <div className="space-y-2.5">
        {bays.map((bay) => (
          <div
            key={bay.bayId}
            className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-[13px] text-[#002941]">
                  {bay.bayNumber}
                </span>
                {bay.status === 'occupied' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DFECF3] text-[#002941]">
                    {bay.statusLabel}
                  </span>
                )}
                {bay.status === 'staging_ready' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530]">
                    {bay.statusLabel}
                  </span>
                )}
                {bay.status === 'available' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0F5F9] text-[#566E7F] border border-[#DFECF3]">
                    {bay.statusLabel}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#566E7F]">
                {bay.carrierName ? `${bay.carrierName} • ` : ''}
                {bay.detail}
              </p>
            </div>

            <div className="shrink-0 text-[#8DA1AF]">
              {bay.status === 'occupied' && (
                <span className="material-symbols-outlined text-[20px] text-[#002941] animate-spin">
                  sync
                </span>
              )}
              {bay.status === 'staging_ready' && (
                <span className="material-symbols-outlined text-[20px] text-[#2D8576]">
                  check_circle
                </span>
              )}
              {bay.status === 'available' && (
                <span className="material-symbols-outlined text-[20px] text-[#8DA1AF]">
                  done_all
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
