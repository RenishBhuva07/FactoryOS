import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface WorkbenchHandoverProps {
  onSignOff?: (notes: string) => void;
}

export const WorkbenchHandover: React.FC<WorkbenchHandoverProps> = ({ onSignOff }) => {
  const [notes, setNotes] = useState(
    'Shift A completed 1,420 units. Line 01 tooling set for Valve Guides (PO #1048). Raw material EN8 staged for Shift B.'
  );
  const [signed, setSigned] = useState(false);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    onSignOff?.(notes);
    setSigned(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">Shift Handover &amp; Sign-Off</h2>
            <p className="text-xs text-[#566E7F]">Digital sign-off for incoming Shift B supervisor</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#CFE8E1] text-[#184E46]">
          Handover Slip
        </span>
      </div>

      {signed ? (
        <div className="p-4 rounded-2xl bg-[#E4F4F0] border border-[#2D8576] space-y-2 text-center">
          <span className="material-symbols-outlined text-3xl text-[#2D8576]">verified</span>
          <p className="text-sm font-bold text-[#184E46]">Shift A Successfully Handed Over</p>
          <p className="text-xs text-[#2D8576]">
            Digital signature authenticated. Notification pushed to incoming Shift B supervisor &amp; owner WhatsApp digest.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSign} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#F8FAFA] rounded-2xl border border-[#DFECF3]">
              <p className="text-[10px] text-[#566E7F] font-semibold">Total Output</p>
              <p className="text-sm font-bold text-[#002941] tabular-nums mt-0.5">1,420 pcs</p>
            </div>
            <div className="p-2.5 bg-[#F8FAFA] rounded-2xl border border-[#DFECF3]">
              <p className="text-[10px] text-[#566E7F] font-semibold">Target Achieved</p>
              <p className="text-sm font-bold text-[#2D8576] tabular-nums mt-0.5">94.6%</p>
            </div>
            <div className="p-2.5 bg-[#F8FAFA] rounded-2xl border border-[#DFECF3]">
              <p className="text-[10px] text-[#566E7F] font-semibold">Total Scrap</p>
              <p className="text-sm font-bold text-[#AB1B1B] tabular-nums mt-0.5">18 pcs</p>
            </div>
            <div className="p-2.5 bg-[#F8FAFA] rounded-2xl border border-[#DFECF3]">
              <p className="text-[10px] text-[#566E7F] font-semibold">Floor Attendance</p>
              <p className="text-sm font-bold text-[#002941] tabular-nums mt-0.5">22 / 24</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">
              Handover Instructions for Shift B:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden focus:bg-white resize-none"
            />
          </div>

          <div className="pt-2">
            <PillButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 text-sm font-bold shadow-md"
              icon={<span className="material-symbols-outlined text-[19px]">lock</span>}
            >
              Sign &amp; Authenticate Shift Handover
            </PillButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkbenchHandover;
