import React from 'react';
import type { ShiftScheduleItem } from '../../../types/onboarding';

interface ShiftScheduleCardProps {
  shift: ShiftScheduleItem;
  onUpdate?: (updated: Partial<ShiftScheduleItem>) => void;
}

export const ShiftScheduleCard: React.FC<ShiftScheduleCardProps> = ({ shift, onUpdate }) => {
  return (
    <div className="bg-[#F8FAFA] p-4 sm:p-5 rounded-2xl border border-[#DFECF3] flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576] text-[#CFE8E1] flex items-center justify-center font-bold text-xs shadow-2xs">
            {shift.code}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#002941] leading-tight">{shift.name}</h4>
            <p className="text-[11px] text-[#566E7F]">{shift.purpose}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-[11px] font-bold self-start sm:self-auto">
          <span className="material-symbols-outlined text-[13px] text-[#2D8576]">
            {shift.code === 'A' || shift.code === 'G' ? 'light_mode' : 'bedtime'}
          </span>
          <span>{shift.badgeLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#DFECF3]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
            Shift Start
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">schedule</span>
            <input
              type="text"
              value={shift.startTime}
              onChange={(e) => onUpdate && onUpdate({ startTime: e.target.value })}
              className="text-xs sm:text-sm font-bold text-[#002941] bg-transparent focus:outline-none w-full tabular-nums"
            />
          </div>
        </div>

        <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#DFECF3]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
            Shift End
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">schedule</span>
            <input
              type="text"
              value={shift.endTime}
              onChange={(e) => onUpdate && onUpdate({ endTime: e.target.value })}
              className="text-xs sm:text-sm font-bold text-[#002941] bg-transparent focus:outline-none w-full tabular-nums"
            />
          </div>
        </div>

        <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#DFECF3]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F] block mb-1">
            {shift.code === 'A' || shift.code === 'G'
              ? 'Lunch & Tea Break'
              : 'Dinner / Refreshment'}
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">restaurant</span>
            <span className="text-xs sm:text-sm font-bold text-[#002941] tabular-nums truncate">
              {shift.breakDurationMinutes} mins ({shift.breakWindow})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#566E7F] pt-1 border-t border-[#DFECF3]/70">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#8DA1AF]">badge</span>
          <span>Shift Supervisor: Assigned in Step 4</span>
        </div>
        <div className="font-bold text-[#002941] tabular-nums">
          {shift.netWorkingHours.toFixed(1)} Net Working Hours
        </div>
      </div>
    </div>
  );
};

export default ShiftScheduleCard;
