import React from 'react';
import { PillButton } from '../../../components/common';

export interface ProductionLogsHeaderProps {
  onDownloadAuditLogs?: () => void;
  onNewLogEntry?: () => void;
  className?: string;
}

export const ProductionLogsHeader: React.FC<ProductionLogsHeaderProps> = ({
  onDownloadAuditLogs,
  onNewLogEntry,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-[#566E7F]">
          SHOPFLOOR LOGS & SIGN-OFFS • GIDC Naroda Unit 1
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Production Logs & Shift Records
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Manual machine logs, supervisor sign-offs, and batch output records for Shift A & B.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">download</span>}
            onClick={onDownloadAuditLogs}
          >
            Download Audit Logs
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">add</span>}
            onClick={onNewLogEntry}
          >
            New Log Entry
          </PillButton>
        </div>
      </div>
    </header>
  );
};
