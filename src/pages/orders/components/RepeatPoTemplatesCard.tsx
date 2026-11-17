import React from 'react';
import { Card, PillButton } from '../../../components/common';
import type { RepeatPoTemplate } from '../../../types/orders';

export interface RepeatPoTemplatesCardProps {
  templates: RepeatPoTemplate[];
  onReIssue?: (template: RepeatPoTemplate) => void;
  onRefresh?: () => void;
  className?: string;
}

export const RepeatPoTemplatesCard: React.FC<RepeatPoTemplatesCardProps> = ({
  templates,
  onReIssue,
  onRefresh,
  className = '',
}) => {
  return (
    <Card
      variant="default"
      padding="md"
      className={`border-[#DFECF3] shadow-xs flex flex-col gap-3.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
            Repeat PO Templates
          </h2>
        </div>

        <button
          type="button"
          title="Refresh templates"
          onClick={onRefresh}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] border border-[#DFECF3] transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[17px]">sync</span>
        </button>
      </div>

      <p className="text-xs text-[#566E7F] -mt-1 leading-relaxed">
        Recurring plant accounts with active bill of materials (BOMs) ready to issue.
      </p>

      <div className="space-y-2.5">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-between gap-3 hover:border-[#BDD7E7] transition-all"
          >
            <div className="min-w-0 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#002941] truncate">
                {tpl.clientName}
              </h4>
              <p className="text-xs text-[#566E7F] truncate">{tpl.partDescription}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F4F0] text-[#184E46]">
                Cadence: {tpl.cadence}
              </span>
            </div>

            <PillButton
              variant="primary"
              size="sm"
              icon={<span className="material-symbols-outlined text-[15px]">sync_alt</span>}
              onClick={() => onReIssue && onReIssue(tpl)}
              className="shrink-0 text-xs shadow-2xs font-semibold"
            >
              Re-Issue
            </PillButton>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RepeatPoTemplatesCard;
