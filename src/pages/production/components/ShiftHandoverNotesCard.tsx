import React from 'react';
import { Card } from '../../../components/common';

export interface ShiftHandoverNotesCardProps {
  className?: string;
}

export const ShiftHandoverNotesCard: React.FC<ShiftHandoverNotesCardProps> = ({
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#002941]">
            history_edu
          </span>
          <h2 className="text-sm sm:text-base font-bold text-[#002941]">
            Shift Handover & Daily Notes
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF1F5] text-[#002941]">
          Shift A
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#002941]">
            Supervisor: Ramesh Bhai
          </span>
          <span className="text-[11px] text-[#566E7F]">Recorded 11:45 AM</span>
        </div>
        <p className="text-xs text-[#566E7F] leading-relaxed">
          Raw forgings for PO-1042 received from Rajkot vendor (380 pcs). CNC-01 insert replaced at 10:15 AM. Need 60 more gear casings turned before Shift B handover at 16:30.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs">
        <span className="text-[#566E7F] font-medium">Next Shift In-Charge:</span>
        <span className="font-bold text-[#002941] flex items-center gap-1.5">
          Pravinbhai
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#CFE8E1] text-[#103530]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20675C]" />
            Active Duty
          </span>
        </span>
      </div>
    </Card>
  );
};
