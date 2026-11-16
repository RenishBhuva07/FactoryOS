import React from 'react';
import { Card, PillButton } from '../../../components/common';
import type { AttentionAlertItem } from '../../../types/dashboard';

export interface AttentionAlertsCardProps {
  alerts: AttentionAlertItem[];
  onPrimaryAction?: (alertId: string) => void;
  onSecondaryAction?: (alertId: string) => void;
  className?: string;
}

export const AttentionAlertsCard: React.FC<AttentionAlertsCardProps> = ({
  alerts,
  onPrimaryAction,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">priority_high</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
            Needs Your Attention
          </h2>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[10px] font-bold tracking-wider shrink-0 shadow-xs">
          {alerts.length} URGENT
        </span>
      </div>

      {/* Alert Items List */}
      <div className="space-y-3">
        {alerts.map((item) => {
          const badgeStyles = {
            urgent: 'bg-[#FFF4F3] text-[#AB1B1B] border border-[#FFD0CC]',
            warning: 'bg-[#FFF9EE] text-[#9A6200] border border-[#FFE0A3]',
            success: 'bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1]',
          }[item.badgeVariant];

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] hover:border-[#BDD7E7] transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#DFECF3] text-[#002941] flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="material-symbols-outlined text-[16px]">
                      {item.categoryIcon}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#002941] truncate leading-tight">
                    {item.title}
                  </h3>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tabular-nums whitespace-nowrap shrink-0 ${badgeStyles}`}
                >
                  {item.badgeText}
                </span>
              </div>

              <p className="text-xs text-[#566E7F] leading-relaxed">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1.5 w-full">
                <PillButton
                  type="button"
                  variant="coral"
                  size="sm"
                  onClick={() => onSecondaryAction?.(item.id)}
                  className="w-full justify-center font-bold shadow-xs hover:shadow-sm"
                >
                  {item.secondaryActionText}
                </PillButton>
                <PillButton
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => onPrimaryAction?.(item.id)}
                  className="w-full justify-center font-bold"
                >
                  {item.primaryActionText}
                </PillButton>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AttentionAlertsCard;

