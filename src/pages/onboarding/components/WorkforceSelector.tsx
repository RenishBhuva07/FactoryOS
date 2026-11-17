import React from 'react';
import type { WorkforceBandId, WorkforceBandOption } from '../../../types/onboarding';

interface WorkforceSelectorProps {
  selectedBand: WorkforceBandId;
  workerCount: number;
  onSelectBand: (band: WorkforceBandId) => void;
}

const BANDS: WorkforceBandOption[] = [
  {
    id: 'micro',
    label: 'Micro Unit',
    range: '1 – 15',
    note: 'Single shift',
    defaultWorkers: 10,
  },
  {
    id: 'typical',
    label: 'Typical MSME',
    range: '15 – 30',
    note: '1 to 2 shifts',
    defaultWorkers: 24,
  },
  {
    id: 'mid',
    label: 'Mid MSME',
    range: '30 – 75',
    note: '2 to 3 shifts',
    defaultWorkers: 50,
  },
  {
    id: 'large',
    label: 'Large Scale',
    range: '75+',
    note: 'Multi-department',
    defaultWorkers: 100,
  },
];

export const WorkforceSelector: React.FC<WorkforceSelectorProps> = ({
  selectedBand,
  workerCount,
  onSelectBand,
}) => {
  return (
    <div className="bg-[#F8FAFA] p-4 sm:p-5 rounded-2xl border border-[#DFECF3]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002941] block">
            Approximate Shopfloor Workforce Size
          </span>
          <span className="text-[11px] sm:text-xs text-[#566E7F]">
            Operators, helpers, and floor fitters across all shifts
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] font-bold text-xs tabular-nums self-start sm:self-auto">
          <span className="material-symbols-outlined text-[15px] text-[#2D8576]">groups</span>
          <span>Active: {workerCount} Workers Selected</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {BANDS.map((band) => {
          const isSelected = selectedBand === band.id;

          return (
            <button
              key={band.id}
              type="button"
              onClick={() => onSelectBand(band.id)}
              className={`p-3 text-left rounded-xl transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white border-transparent shadow-xs'
                  : 'bg-white hover:bg-[#F0F5F9] text-[#002941] border-[#DFECF3]'
              }`}
            >
              <div
                className={`text-[11px] font-semibold ${
                  isSelected ? 'text-[#CFE8E1]' : 'text-[#566E7F]'
                }`}
              >
                {band.label}
              </div>
              <div className="text-sm sm:text-base font-bold tabular-nums my-0.5">{band.range}</div>
              <div
                className={`text-[10px] sm:text-[11px] truncate ${
                  isSelected ? 'text-white/80 font-medium' : 'text-[#8DA1AF]'
                }`}
              >
                {isSelected ? `Current: ${workerCount} workers` : band.note}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkforceSelector;
