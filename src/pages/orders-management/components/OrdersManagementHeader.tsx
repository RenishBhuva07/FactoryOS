import React from 'react';
import { PillButton } from '../../../components/common';

export interface OrdersManagementHeaderProps {
  onExportMatrix?: () => void;
  onIssueJobCard?: () => void;
  className?: string;
}

export const OrdersManagementHeader: React.FC<OrdersManagementHeaderProps> = ({
  onExportMatrix,
  onIssueJobCard,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-[#566E7F] uppercase tracking-wider">
          Order Operations & Client Fulfillment • Plant #04
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Orders Management
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Live shopfloor job card dispatch, BOM material staging, and client fulfillment pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">download</span>}
            onClick={onExportMatrix}
          >
            Export Execution Matrix
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">assignment_add</span>}
            onClick={onIssueJobCard}
          >
            Issue Production Job Card
          </PillButton>
        </div>
      </div>
    </header>
  );
};
