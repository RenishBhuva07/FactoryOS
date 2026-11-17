import React from 'react';
import { Card, PillButton } from '../../../components/common';
import type { MachineSupervisorLog } from '../../../types/machines';

export interface SupervisorMachineLogCardProps {
  logs: MachineSupervisorLog[];
  onNewTicket?: () => void;
  onDownloadReport?: () => void;
  className?: string;
}

export const SupervisorMachineLogCard: React.FC<SupervisorMachineLogCardProps> = ({
  logs,
  onNewTicket,
  onDownloadReport,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col justify-between gap-3.5 ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[16px]">engineering</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#002941]">
              Supervisor Machine Log
            </h2>
          </div>
          <button
            type="button"
            onClick={onNewTicket}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#002941] hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            New Ticket
          </button>
        </div>

        <p className="text-xs text-[#566E7F]">
          Shopfloor supervisor manual entry log & machine breakdown tickets.
        </p>

        <div className="space-y-2.5 pt-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#002941] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#2D8576]">
                    build
                  </span>
                  {log.title}
                </span>
                <span className="text-[11px] font-mono text-[#566E7F]">{log.time}</span>
              </div>
              <p className="text-[11px] text-[#566E7F]">
                <span className="font-medium text-[#002941]">Logged by {log.author}: </span>
                {log.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#DFECF3]/70">
        <PillButton
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          icon={<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>}
          onClick={onDownloadReport}
        >
          Download Shift Machine Report (PDF)
        </PillButton>
      </div>
    </Card>
  );
};
