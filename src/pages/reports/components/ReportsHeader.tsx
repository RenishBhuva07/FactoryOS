import React from 'react';
import { PillButton } from '../../../components/common';

export interface ReportsHeaderProps {
  timeframe: 'realtime' | 'weekly' | 'monthly';
  onTimeframeChange: (t: 'realtime' | 'weekly' | 'monthly') => void;
  onExport?: () => void;
  className?: string;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  timeframe,
  onTimeframeChange,
  onExport,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-[#566E7F] uppercase tracking-wider">
          Analytics & Intelligence
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Plant Performance & Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Overall equipment effectiveness, scrap telemetry, and multi-shift audit records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 rounded-full bg-[#F0F5F9] border border-[#DFECF3]">
            <button
              type="button"
              onClick={() => onTimeframeChange('realtime')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'realtime'
                  ? 'bg-white text-[#002941] shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              Real-time
            </button>
            <button
              type="button"
              onClick={() => onTimeframeChange('weekly')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'weekly'
                  ? 'bg-white text-[#002941] shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => onTimeframeChange('monthly')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'monthly'
                  ? 'bg-white text-[#002941] shadow-xs'
                  : 'text-[#566E7F] hover:text-[#002941]'
              }`}
            >
              Monthly
            </button>
          </div>

          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">download</span>}
            onClick={onExport}
          >
            Export PDF/CSV
          </PillButton>
        </div>
      </div>
    </header>
  );
};
