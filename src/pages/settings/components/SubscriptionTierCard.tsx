import React from 'react';
import { Card, PillButton } from '../../../components/common';

export interface SubscriptionTierCardProps {
  onManageBilling?: () => void;
  className?: string;
}

export const SubscriptionTierCard: React.FC<SubscriptionTierCardProps> = ({
  onManageBilling,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#20675C] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[19px]">spa</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Growth Plant Tier
            </h2>
            <p className="text-xs text-[#566E7F]">
              Active subscription for Apex Manufacturing Plant #04
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530] self-start sm:self-auto">
          ACTIVE PLAN
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3]">
          <span className="block text-[11px] text-[#566E7F] font-medium">Billing Cycle</span>
          <span className="text-sm font-bold text-[#002941] block mt-0.5">Annual</span>
          <span className="text-[10px] text-[#8DA1AF]">Renews on Nov 14, 2025</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3]">
          <span className="block text-[11px] text-[#566E7F] font-medium">Active Machines</span>
          <span className="text-sm font-bold text-[#002941] block mt-0.5 tabular-nums">24 / 30</span>
          <span className="text-[10px] text-[#8DA1AF]">allocated slots</span>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3]">
          <span className="block text-[11px] text-[#566E7F] font-medium">Monthly Investment</span>
          <span className="text-sm font-bold text-[#002941] block mt-0.5 tabular-nums">$1,250 <span className="text-[11px] font-normal text-[#566E7F]">/mo</span></span>
          <span className="text-[10px] text-[#2D8576] font-semibold">Tier 2 Discounted</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#DFECF3]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="text-[#566E7F] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">check_circle</span>
          Includes priority support, custom dispatch hooks, and advanced telemetry.
        </span>

        <PillButton
          variant="ghost"
          size="sm"
          onClick={onManageBilling}
        >
          Manage Billing
        </PillButton>
      </div>
    </Card>
  );
};
