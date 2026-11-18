import React, { useState } from 'react';
import { PillButton } from '../../../components/common';
import type { TeamMemberRoster } from '../../../types/team';

export interface ManualPunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  roster: TeamMemberRoster[];
  onSubmit: (data: {
    memberId: string;
    punchType: 'present' | 'overtime' | 'reliever' | 'half_day';
    station: string;
    notes: string;
  }) => void;
}

export const ManualPunchModal: React.FC<ManualPunchModalProps> = ({
  isOpen,
  onClose,
  roster,
  onSubmit,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState(roster[0]?.id || '');
  const [punchType, setPunchType] = useState<'present' | 'overtime' | 'reliever' | 'half_day'>('present');
  const [station, setStation] = useState('Line 01 (CNC Lathe 1)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      memberId: selectedMemberId,
      punchType,
      station,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#DFECF3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fingerprint</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#002941]">Manual Biometric Punch Override</h2>
              <p className="text-xs text-[#566E7F]">Supervisor shift override &amp; station reassignment</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Select Worker / Operator</label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
            >
              {roster.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role}) — {m.assignedStation}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">Override Action Type</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPunchType('present')}
                className={`p-2.5 rounded-2xl border transition select-none cursor-pointer ${
                  punchType === 'present'
                    ? 'bg-[#E4F4F0] border-[#2D8576] text-[#184E46] shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Mark Present (On Spindle)
              </button>
              <button
                type="button"
                onClick={() => setPunchType('overtime')}
                className={`p-2.5 rounded-2xl border transition select-none cursor-pointer ${
                  punchType === 'overtime'
                    ? 'bg-[#002941] border-[#002941] text-white shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Authorize Overtime (+2h)
              </button>
              <button
                type="button"
                onClick={() => setPunchType('reliever')}
                className={`p-2.5 rounded-2xl border transition select-none cursor-pointer ${
                  punchType === 'reliever'
                    ? 'bg-[#CFE8E1] border-[#A6D5C9] text-[#184E46] shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Assign Reliever
              </button>
              <button
                type="button"
                onClick={() => setPunchType('half_day')}
                className={`p-2.5 rounded-2xl border transition select-none cursor-pointer ${
                  punchType === 'half_day'
                    ? 'bg-[#FD6E6E]/15 border-[#FD6E6E] text-[#AB1B1B] shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Approved Half-Day
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Target Workstation / Bay</label>
            <input
              type="text"
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Supervisor Authorization Reason</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Card sensor unreadable at gate, verified by Shift Lead Mahesh."
              className="w-full h-11 px-3.5 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <PillButton type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton type="submit" variant="primary" size="md" className="font-bold text-xs shadow-xs">
              Save Biometric Override
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualPunchModal;
