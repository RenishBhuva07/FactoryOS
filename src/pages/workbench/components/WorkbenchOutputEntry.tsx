import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface OutputSubmission {
  jobCard: string;
  machine: string;
  goodUnits: number;
  scrapUnits: number;
  defectReason: string;
  notes: string;
}

export interface WorkbenchOutputEntryProps {
  onSubmit: (entry: OutputSubmission) => void;
  lang?: 'en' | 'gu' | 'hi';
}

const ACTIVE_JOB_CARDS = [
  { id: 'jc-1048', po: 'PO #1048', part: 'Valve Guides', line: 'Line 01 (CNC Lathe 1)', target: 1200, current: 840 },
  { id: 'jc-1042', po: 'PO #1042', part: 'Forged Spindle Shafts', line: 'Line 02 (CNC Lathe 2)', target: 450, current: 310 },
  { id: 'jc-1039', po: 'PO #1039', part: 'Precision Flanges', line: 'Line 04 (VMC Milling)', target: 800, current: 520 },
];

const DEFECT_REASONS = [
  'Dimensional Tolerance (+/- 0.05mm)',
  'Surface Finish / Tool Chatter',
  'Burr / Heavy Flash',
  'Material Hardness Inconsistency',
  'Setting / Calibration Scrap',
];

export const WorkbenchOutputEntry: React.FC<WorkbenchOutputEntryProps> = ({ onSubmit }) => {
  const [selectedJob, setSelectedJob] = useState(ACTIVE_JOB_CARDS[0].id);
  const [goodUnits, setGoodUnits] = useState('100');
  const [scrapUnits, setScrapUnits] = useState('0');
  const [defectReason, setDefectReason] = useState(DEFECT_REASONS[0]);
  const [notes, setNotes] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const activeJob = ACTIVE_JOB_CARDS.find((j) => j.id === selectedJob) || ACTIVE_JOB_CARDS[0];

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<string>>, amount: number) => {
    setter((prev) => {
      const val = Math.max(0, (parseInt(prev, 10) || 0) + amount);
      return String(val);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const good = parseInt(goodUnits, 10) || 0;
    const scrap = parseInt(scrapUnits, 10) || 0;

    if (good <= 0 && scrap <= 0) return;

    onSubmit({
      jobCard: activeJob.po,
      machine: activeJob.line,
      goodUnits: good,
      scrapUnits: scrap,
      defectReason: scrap > 0 ? defectReason : 'None',
      notes,
    });

    setSavedFeedback(true);
    setGoodUnits('50');
    setScrapUnits('0');
    setNotes('');

    setTimeout(() => {
      setSavedFeedback(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">add_task</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">60-Second Shift Production</h2>
            <p className="text-xs text-[#566E7F]">Record accepted pcs and scrap directly from floor</p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#184E46] bg-[#CFE8E1] px-2.5 py-1 rounded-full">
          Shift A Live
        </span>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-2xl bg-[#E4F4F0] border border-[#2D8576] flex items-center gap-2.5 text-xs text-[#184E46] font-semibold animate-in zoom-in-95">
          <span className="material-symbols-outlined text-[20px] text-[#2D8576]">check_circle</span>
          <div>
            <p className="font-bold">Production logged successfully!</p>
            <p className="text-[11px] text-[#2D8576]">
              Verified and synchronized to FactoryOS owner dashboard.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Select Active Job Card */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941] flex items-center justify-between">
            <span>1. Select Running Job &amp; Line</span>
            <span className="text-[11px] font-medium text-[#566E7F]">{activeJob.line}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {ACTIVE_JOB_CARDS.map((job) => {
              const isSelected = job.id === selectedJob;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setSelectedJob(job.id)}
                  className={`p-3 rounded-2xl border text-left transition select-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#002941] text-white border-[#002941] shadow-xs'
                      : 'bg-[#F8FAFA] text-[#002941] border-[#DFECF3] hover:border-[#BDD7E7]'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{job.po}</p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-[#CFE8E1]' : 'text-[#566E7F]'
                    }`}
                  >
                    {job.part}
                  </p>
                  <div className="mt-2 text-[10px] font-semibold tabular-nums opacity-90">
                    Progress: {job.current} / {job.target} pcs
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Accepted Good Units */}
        <div className="bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl p-4 space-y-2">
          <label className="text-xs font-bold text-[#002941] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D8576]" />
              <span>Good / Accepted Units Produced</span>
            </span>
            <span className="text-[11px] text-[#566E7F]">Pcs / Nos</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleIncrement(setGoodUnits, -10)}
              className="w-11 h-11 rounded-2xl bg-white border border-[#DFECF3] text-[#002941] font-bold text-base hover:bg-[#F0F5F9] transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              -10
            </button>
            <input
              type="number"
              inputMode="numeric"
              value={goodUnits}
              onChange={(e) => setGoodUnits(e.target.value)}
              className="flex-1 h-12 text-center text-xl sm:text-2xl font-bold text-[#002941] bg-white border border-[#DFECF3] rounded-2xl focus:outline-hidden focus:border-[#2D8576] tabular-nums"
              placeholder="0"
            />
            <button
              type="button"
              onClick={() => handleIncrement(setGoodUnits, 10)}
              className="w-11 h-11 rounded-2xl bg-white border border-[#DFECF3] text-[#002941] font-bold text-base hover:bg-[#F0F5F9] transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              +10
            </button>
            <button
              type="button"
              onClick={() => handleIncrement(setGoodUnits, 50)}
              className="w-11 h-11 rounded-2xl bg-[#CFE8E1] text-[#184E46] font-bold text-sm hover:bg-[#BCE0D7] transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              +50
            </button>
          </div>
        </div>

        {/* Step 3: Rejected / Scrap Units */}
        <div className="bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl p-4 space-y-2.5">
          <label className="text-xs font-bold text-[#002941] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FD6E6E]" />
              <span>Scrap / Rejection Count (Default 0)</span>
            </span>
            <span className="text-[11px] text-[#566E7F]">Pcs</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleIncrement(setScrapUnits, -1)}
              className="w-11 h-11 rounded-2xl bg-white border border-[#DFECF3] text-[#002941] font-bold text-base hover:bg-[#F0F5F9] transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              -1
            </button>
            <input
              type="number"
              inputMode="numeric"
              value={scrapUnits}
              onChange={(e) => setScrapUnits(e.target.value)}
              className="flex-1 h-12 text-center text-xl sm:text-2xl font-bold text-[#AB1B1B] bg-white border border-[#DFECF3] rounded-2xl focus:outline-hidden focus:border-[#FD6E6E] tabular-nums"
              placeholder="0"
            />
            <button
              type="button"
              onClick={() => handleIncrement(setScrapUnits, 1)}
              className="w-11 h-11 rounded-2xl bg-white border border-[#DFECF3] text-[#002941] font-bold text-base hover:bg-[#F0F5F9] transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              +1
            </button>
            <button
              type="button"
              onClick={() => handleIncrement(setScrapUnits, 5)}
              className="w-11 h-11 rounded-2xl bg-[#FD6E6E]/15 text-[#AB1B1B] font-bold text-sm hover:bg-[#FD6E6E]/25 transition flex items-center justify-center shrink-0 shadow-2xs"
            >
              +5
            </button>
          </div>

          {parseInt(scrapUnits, 10) > 0 && (
            <div className="pt-2 space-y-1.5 animate-in fade-in">
              <label className="text-[11px] font-bold text-[#566E7F]">
                Scrap Root Cause:
              </label>
              <select
                value={defectReason}
                onChange={(e) => setDefectReason(e.target.value)}
                className="w-full h-10 px-3 text-xs font-semibold bg-white border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden"
              >
                {DEFECT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Step 4: Notes */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#002941]">
            Operator / Shift Note (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Spindle tool changed at 11:30, coolant flushed"
            className="w-full h-11 px-3.5 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden focus:bg-white"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PillButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-12 text-sm font-bold shadow-md"
            icon={<span className="material-symbols-outlined text-[20px]">verified</span>}
          >
            Authenticate &amp; Save Shift Output
          </PillButton>
        </div>
      </form>
    </div>
  );
};

export default WorkbenchOutputEntry;
