import React, { useState } from "react";
import { PillButton } from "../../../components/common";

export interface OutputSubmission {
  jobCard: string;
  machine: string;
  goodUnits: number;
  scrapUnits: number;
  defectReason: string;
  notes: string;
}

export interface WorkbenchJobItem {
  id: string;
  po: string;
  part: string;
  line: string;
  target: number;
  current: number;
}

export interface WorkbenchOutputEntryProps {
  onSubmit: (entry: OutputSubmission) => void;
  jobs?: WorkbenchJobItem[];
  lang?: "en" | "gu" | "hi";
}

const DEFAULT_JOBS: WorkbenchJobItem[] = [
  {
    id: "jc-1048",
    po: "PO #1048",
    part: "Valve Guides",
    line: "Line 01 (CNC Lathe 1)",
    target: 1200,
    current: 840,
  },
  {
    id: "jc-1042",
    po: "PO #1042",
    part: "Forged Spindle Shafts",
    line: "Line 02 (CNC Lathe 2)",
    target: 450,
    current: 310,
  },
  {
    id: "jc-1039",
    po: "PO #1039",
    part: "Precision Flanges",
    line: "Line 04 (VMC Milling)",
    target: 800,
    current: 520,
  },
];

const DEFECT_REASONS = [
  "Dimensional Tolerance (+/- 0.05mm)",
  "Surface Finish / Tool Chatter",
  "Burr / Heavy Flash",
  "Material Hardness Inconsistency",
  "Setting / Calibration Scrap",
];

export const WorkbenchOutputEntry: React.FC<WorkbenchOutputEntryProps> = ({
  onSubmit,
  jobs = DEFAULT_JOBS,
}) => {
  const [selectedJob, setSelectedJob] = useState(
    jobs[0]?.id || DEFAULT_JOBS[0].id,
  );
  const [goodUnits, setGoodUnits] = useState("100");
  const [scrapUnits, setScrapUnits] = useState("0");
  const [defectReason, setDefectReason] = useState(DEFECT_REASONS[0]);
  const [notes, setNotes] = useState("");

  // Flow 2 steps: 'input' -> 'review' -> 'updated_card'
  const [flowStep, setFlowStep] = useState<"input" | "review" | "updated_card">(
    "input",
  );
  const [lastLoggedSnapshot, setLastLoggedSnapshot] = useState<{
    job: WorkbenchJobItem;
    addedGood: number;
    newTotal: number;
  } | null>(null);

  const activeJob =
    jobs.find((j) => j.id === selectedJob) || jobs[0] || DEFAULT_JOBS[0];

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    amount: number,
  ) => {
    setter((prev) => {
      const val = Math.max(0, (parseInt(prev, 10) || 0) + amount);
      return String(val);
    });
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const good = parseInt(goodUnits, 10) || 0;
    const scrap = parseInt(scrapUnits, 10) || 0;
    if (good <= 0 && scrap <= 0) return;
    setFlowStep("review");
  };

  const handleConfirmSubmission = () => {
    const good = parseInt(goodUnits, 10) || 0;
    const scrap = parseInt(scrapUnits, 10) || 0;

    onSubmit({
      jobCard: activeJob.po,
      machine: activeJob.line,
      goodUnits: good,
      scrapUnits: scrap,
      defectReason: scrap > 0 ? defectReason : "None",
      notes,
    });

    setLastLoggedSnapshot({
      job: activeJob,
      addedGood: good,
      newTotal: activeJob.current + good,
    });

    setFlowStep("updated_card");
  };

  const handleLogAnother = () => {
    setGoodUnits("50");
    setScrapUnits("0");
    setNotes("");
    setFlowStep("input");
  };

  if (flowStep === "updated_card" && lastLoggedSnapshot) {
    const { job, addedGood, newTotal } = lastLoggedSnapshot;
    const percent = Math.min(
      100,
      Math.round((newTotal / Math.max(1, job.target)) * 100 * 10) / 10,
    );
    const remaining = Math.max(0, job.target - newTotal);

    return (
      <div className="bg-white rounded-3xl border border-[#DFECF3] p-5 sm:p-7 shadow-sm space-y-6 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-[#2D8576]">
              check_circle
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D8576] bg-[#CFE8E1] px-2.5 py-0.5 rounded-full">
              Production Verified
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#002941] mt-1">
              Updated Job Card — {job.po}
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#566E7F]">Manufactured Part</p>
              <h3 className="text-sm sm:text-base font-bold text-[#002941]">
                {job.part}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1]">
              +{addedGood} pcs Added
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#566E7F]">Cumulative Job Progress</span>
              <span className="text-[#002941] tabular-nums font-bold">
                {newTotal} / {job.target} pcs ({percent}%)
              </span>
            </div>
            <div className="w-full bg-[#EBF1F5] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#2D8576] to-[#43A392] h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#DFECF3] text-xs">
            <div>
              <span className="text-[#566E7F]">Allocated Workstation:</span>
              <p className="font-bold text-[#002941] truncate">{job.line}</p>
            </div>
            <div>
              <span className="text-[#566E7F]">Remaining Target:</span>
              <p className="font-bold text-[#002941] tabular-nums">
                {remaining} pcs
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            type="button"
            variant="primary"
            size="md"
            onClick={handleLogAnother}
            icon={
              <span className="material-symbols-outlined text-[18px]">
                add_task
              </span>
            }
            className="flex-1 justify-center font-bold"
          >
            Log Another Batch
          </PillButton>
        </div>
      </div>
    );
  }

  if (flowStep === "review") {
    const good = parseInt(goodUnits, 10) || 0;
    const scrap = parseInt(scrapUnits, 10) || 0;

    return (
      <div className="bg-white rounded-3xl border border-[#DFECF3] p-5 sm:p-7 shadow-sm space-y-6 max-w-2xl mx-auto animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                rate_review
              </span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#002941]">
                Review Shift Production
              </h2>
              <p className="text-xs text-[#566E7F]">
                Verify counts before signing shift slip
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#184E46] bg-[#CFE8E1] px-2.5 py-1 rounded-full">
            Review Step
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#566E7F]">Target Job:</span>
            <span className="font-bold text-[#002941]">
              {activeJob.po} — {activeJob.part}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#566E7F]">Assigned Line:</span>
            <span className="font-bold text-[#002941]">{activeJob.line}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#566E7F]">Accepted Good Output:</span>
            <span className="font-extrabold text-[#184E46] text-sm tabular-nums">
              +{good} pcs
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#566E7F]">Scrap / Rejection:</span>
            <span className="font-bold text-[#AB1B1B] tabular-nums">
              {scrap > 0
                ? `${scrap} pcs (${defectReason})`
                : "0 pcs (Zero Defect)"}
            </span>
          </div>
          {notes && (
            <div className="pt-2 border-t border-[#DFECF3] text-xs">
              <span className="text-[#566E7F]">Notes:</span>
              <p className="font-medium text-[#002941] mt-0.5">{notes}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <PillButton
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setFlowStep("input")}
            className="text-xs font-bold"
          >
            ← Edit Details
          </PillButton>

          <PillButton
            type="button"
            variant="mintGradient"
            size="md"
            onClick={handleConfirmSubmission}
            icon={
              <span className="material-symbols-outlined text-[19px]">
                verified
              </span>
            }
            className="flex-1 justify-center font-bold"
          >
            Confirm &amp; Save Shift Slip
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">
              add_task
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">
              60-Second Shift Production
            </h2>
            <p className="text-xs text-[#566E7F]">
              Record accepted pcs and scrap directly from floor
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#184E46] bg-[#CFE8E1] px-2.5 py-1 rounded-full">
          Shift A Live
        </span>
      </div>

      <form onSubmit={handleProceedToReview} className="space-y-4">
        {/* Job selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Select Active Job Card
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {jobs.map((job) => {
              const isSelected = selectedJob === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-left select-none ${
                    isSelected
                      ? "bg-[#E4F4F0] border-[#2D8576] shadow-2xs"
                      : "bg-[#F8FAFA] border-[#DFECF3] hover:border-[#BDD7E7]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#002941]">
                      {job.po}
                    </span>
                    <span className="text-[10px] text-[#566E7F] tabular-nums">
                      {job.current}/{job.target}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#002941] mt-0.5 truncate">
                    {job.part}
                  </p>
                  <p className="text-[10.5px] text-[#566E7F] truncate">
                    {job.line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Accepted Units */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2">
            <span className="text-xs font-bold text-[#184E46]">
              Accepted Good Units (pcs)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleIncrement(setGoodUnits, -10)}
                className="w-9 h-9 rounded-xl bg-white border border-[#DFECF3] text-sm font-bold text-[#002941] hover:bg-[#F0F5F9] active:scale-95 transition"
              >
                -10
              </button>
              <input
                type="number"
                value={goodUnits}
                onChange={(e) => setGoodUnits(e.target.value)}
                className="flex-1 h-9 px-2 text-center text-lg font-bold text-[#002941] bg-white border border-[#DFECF3] rounded-xl focus:outline-hidden tabular-nums"
              />
              <button
                type="button"
                onClick={() => handleIncrement(setGoodUnits, 10)}
                className="w-9 h-9 rounded-xl bg-white border border-[#DFECF3] text-sm font-bold text-[#002941] hover:bg-[#F0F5F9] active:scale-95 transition"
              >
                +10
              </button>
            </div>
            <div className="flex justify-between gap-1">
              {[25, 50, 100].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => setGoodUnits(String(inc))}
                  className="flex-1 py-1 text-[11px] font-bold rounded-lg bg-white border border-[#DFECF3] text-[#566E7F] hover:text-[#002941] hover:bg-[#E4F4F0]"
                >
                  {inc}
                </button>
              ))}
            </div>
          </div>

          {/* Rejection / Scrap Units */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2">
            <span className="text-xs font-bold text-[#AB1B1B]">
              Scrap / Rejected (pcs)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleIncrement(setScrapUnits, -1)}
                className="w-9 h-9 rounded-xl bg-white border border-[#DFECF3] text-sm font-bold text-[#002941] hover:bg-[#F0F5F9] active:scale-95 transition"
              >
                -1
              </button>
              <input
                type="number"
                value={scrapUnits}
                onChange={(e) => setScrapUnits(e.target.value)}
                className="flex-1 h-9 px-2 text-center text-lg font-bold text-[#AB1B1B] bg-white border border-[#DFECF3] rounded-xl focus:outline-hidden tabular-nums"
              />
              <button
                type="button"
                onClick={() => handleIncrement(setScrapUnits, 1)}
                className="w-9 h-9 rounded-xl bg-white border border-[#DFECF3] text-sm font-bold text-[#002941] hover:bg-[#F0F5F9] active:scale-95 transition"
              >
                +1
              </button>
            </div>
            <div className="flex justify-between gap-1">
              {[0, 1, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setScrapUnits(String(val))}
                  className="flex-1 py-1 text-[11px] font-bold rounded-lg bg-white border border-[#DFECF3] text-[#566E7F] hover:text-[#AB1B1B] hover:bg-[#FFF4F3]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Defect Reason (Conditional on scrap > 0) */}
        {parseInt(scrapUnits, 10) > 0 && (
          <div className="space-y-1.5 animate-in fade-in duration-200">
            <label className="text-xs font-bold text-[#AB1B1B]">
              Primary Defect Reason
            </label>
            <select
              value={defectReason}
              onChange={(e) => setDefectReason(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#FFD0CC] rounded-xl text-[#002941] focus:outline-hidden"
            >
              {DEFECT_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Operator Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Operator Note (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Tool insert changed after 80 pcs"
            className="w-full h-10 px-3.5 text-xs bg-[#F8FAFA] border border-[#DFECF3] rounded-xl text-[#002941] focus:outline-hidden focus:bg-white"
          />
        </div>

        <PillButton
          type="submit"
          variant="primary"
          size="lg"
          icon={
            <span className="material-symbols-outlined text-[19px]">
              arrow_forward
            </span>
          }
          iconPosition="right"
          className="w-full justify-center font-bold"
        >
          Review Shift Output
        </PillButton>
      </form>
    </div>
  );
};

export default WorkbenchOutputEntry;
