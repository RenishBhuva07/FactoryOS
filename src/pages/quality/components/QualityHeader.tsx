import React from 'react';
import { PillButton } from '../../../components/common';

export interface QualityHeaderProps {
  onExportDossier?: () => void;
  onNewBatchInspection?: () => void;
  className?: string;
}

export const QualityHeader: React.FC<QualityHeaderProps> = ({
  onExportDossier,
  onNewBatchInspection,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E4F4F0] text-[#103530] border border-[#CFE8E1]">
          <span className="material-symbols-outlined text-[14px] text-[#2D8576]">verified</span>
          QUALITY ASSURANCE & INSPECTION • GIDC Naroda Unit
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Quality Control & Batch Inspection
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Manual vernier caliper / micrometer batch sampling, visual defect logs, and QC sign-offs for Gujarat auto clients.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">download</span>}
            onClick={onExportDossier}
          >
            Export QA Dossier
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}
            onClick={onNewBatchInspection}
          >
            New Batch Inspection
          </PillButton>
        </div>
      </div>
    </header>
  );
};
