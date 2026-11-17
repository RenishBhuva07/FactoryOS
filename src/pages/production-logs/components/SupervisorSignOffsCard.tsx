import React from 'react';
import { Card } from '../../../components/common';
import type { SupervisorSignOff } from '../../../types/production';

export interface SupervisorSignOffsCardProps {
  signOffs: SupervisorSignOff[];
  className?: string;
}

export const SupervisorSignOffsCard: React.FC<SupervisorSignOffsCardProps> = ({
  signOffs,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 pb-1 border-b border-[#DFECF3]">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
        </div>
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          Supervisor Shift Sign-Offs
        </h2>
      </div>

      <p className="text-xs text-[#566E7F] leading-relaxed">
        Shift in-charges authenticated logs, batch handovers, and inspection sign-offs.
      </p>

      <div className="space-y-2.5 pt-1">
        {signOffs.map((sign) => {
          const initials = sign.supervisorName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2);

          return (
            <div
              key={sign.id}
              className="p-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#002941] text-white text-xs font-bold flex items-center justify-center">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#002941]">
                      {sign.supervisorName}
                    </h3>
                    <p className="text-[10px] text-[#566E7F]">{sign.role}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium text-[#566E7F]">
                  {sign.time}
                </span>
              </div>
              <p className="text-xs font-medium text-[#20675C] bg-[#E4F4F0] px-2.5 py-1 rounded-lg">
                {sign.statusText}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
