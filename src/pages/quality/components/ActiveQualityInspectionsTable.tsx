import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';
import type { QualityInspectionBatch } from '../../../types/quality';

export interface ActiveQualityInspectionsTableProps {
  inspections: QualityInspectionBatch[];
  onAction?: (inspection: QualityInspectionBatch) => void;
  className?: string;
}

export const ActiveQualityInspectionsTable: React.FC<ActiveQualityInspectionsTableProps> = ({
  inspections,
  onAction,
  className = '',
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(inspections.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Card padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">fact_check</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Active Batch Quality Inspections
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Manual vernier & micrometer sampling, gauge verification, and sign-offs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {selectedIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002941] text-[#CFE8E1]">
              {selectedIds.length} Selected
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#CFE8E1] text-[#103530]">
            {inspections.length} Batches Logged
          </span>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[680px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 sm:px-5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all inspections"
                  checked={inspections.length > 0 && selectedIds.length === inspections.length}
                  onChange={handleSelectAll}
                  className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Batch & Component</th>
              <th className="py-3 px-4">Tolerance Variance</th>
              <th className="py-3 px-4">Sample / Inspector</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {inspections.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              const isPassed = item.status === 'passed';
              const isUnderInspection = item.status === 'under_inspection';
              const isRework = item.status === 'rework_required';

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]' : 'hover:bg-[#F8FAFA]/80'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-5">
                    <input
                      type="checkbox"
                      aria-label={`Select batch ${item.batchPoNumber}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(item.id)}
                      className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#002941] text-xs sm:text-[13px]">
                      {item.batchPoNumber}
                    </div>
                    <div className="text-[11px] text-[#566E7F]">
                      {item.componentName} ({item.componentSpec})
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div
                      className={`font-bold tabular-nums text-xs sm:text-[13px] ${
                        isRework
                          ? 'text-[#FD6E6E]'
                          : isUnderInspection
                          ? 'text-[#C77700]'
                          : 'text-[#20675C]'
                      }`}
                    >
                      {item.toleranceVariance}
                    </div>
                    <div className="text-[11px] text-[#566E7F]">
                      {item.toleranceDetail}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#002941]">
                      {item.sampleCheckedText}
                    </div>
                    <div className="text-[11px] text-[#566E7F]">
                      {item.inspectorName}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {isPassed && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#CFE8E1] text-[#103530]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#20675C]" />
                        {item.statusLabel}
                      </span>
                    )}
                    {isUnderInspection && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF8E6] border border-[#FFE8A3] text-[#B37400]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C77700]" />
                        {item.statusLabel}
                      </span>
                    )}
                    {isRework && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6E6E]" />
                        {item.statusLabel}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <PillButton
                      variant={isRework ? 'coral' : isPassed ? 'mintGradient' : 'secondary'}
                      size="sm"
                      onClick={() => onAction && onAction(item)}
                    >
                      {item.actionText}
                    </PillButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
