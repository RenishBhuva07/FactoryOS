import React from 'react';
import { Card } from '../../../components/common';
import type { ProductionLogEntry } from '../../../types/production';

export interface ProductionLogsFeedProps {
  logs: ProductionLogEntry[];
  onLogClick?: (log: ProductionLogEntry) => void;
  className?: string;
}

export const ProductionLogsFeed: React.FC<ProductionLogsFeedProps> = ({
  logs,
  onLogClick,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">list_alt</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941]">
            Recent Production Entries & Logs
          </h2>
        </div>
        <span className="text-xs text-[#566E7F] font-medium">
          Showing 1-{logs.length} of 48 records today
        </span>
      </div>

      <div className="space-y-3">
        {logs.map((log) => {
          const hasScrap = log.scrapUnits > 0;

          return (
            <div
              key={log.id}
              onClick={() => onLogClick && onLogClick(log)}
              className="p-4 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] hover:border-[#002941]/30 transition-all cursor-pointer space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F5F9] border border-[#DFECF3] text-[#002941] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[19px]">precision_manufacturing</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-[#002941]">
                        {log.machineName}
                      </h3>
                      {log.isVerified && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFE8E1] text-[#103530] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#566E7F] mt-0.5">
                      Job: {log.jobCard} {log.partName} • {log.shift}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs sm:text-[13px] font-bold text-[#002941] tabular-nums">
                    {log.outputUnits} Units Output
                  </div>
                  {hasScrap ? (
                    <div className="text-[11px] font-semibold text-[#FD6E6E] tabular-nums">
                      {log.scrapUnits} Scrapped {log.scrapReason ? `(${log.scrapReason})` : ''}
                    </div>
                  ) : (
                    <div className="text-[11px] font-medium text-[#2D8576]">
                      0 Scrapped
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#DFECF3]/70 text-xs">
                <div>
                  <span className="block text-[10px] font-medium text-[#8DA1AF]">Operator</span>
                  <span className="font-semibold text-[#002941]">{log.operatorName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-medium text-[#8DA1AF]">Cycle Time</span>
                  <span className="font-semibold text-[#002941] tabular-nums">{log.cycleTime}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-medium text-[#8DA1AF]">Shift</span>
                  <span className="font-semibold text-[#002941]">{log.shift}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-medium text-[#8DA1AF]">Verified By</span>
                  <span className="font-semibold text-[#20675C]">{log.verifiedBy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
