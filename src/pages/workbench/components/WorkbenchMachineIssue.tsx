import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface MachineIssueReport {
  machine: string;
  category: string;
  severity: 'normal' | 'urgent';
  description: string;
}

export interface WorkbenchMachineIssueProps {
  onSubmit?: (issue: MachineIssueReport) => void;
}

const MACHINES_LIST = [
  'CNC Lathe 01 (M-01)',
  'CNC Lathe 02 (M-02)',
  'VMC Milling 04 (M-04)',
  'Conventional Lathe 03 (M-03)',
  'Deburring & Polishing Bay',
  'Other / Compressor',
];

const ISSUE_CATEGORIES = [
  'Spindle & Tooling Wear',
  'Hydraulic Pressure Drop',
  'Coolant Leakage / Motor Temp',
  'Electrical / Sensor Trip',
  'Raw Material Hardness Issue',
  'Safety Observation / Guard',
];

export const WorkbenchMachineIssue: React.FC<WorkbenchMachineIssueProps> = ({ onSubmit }) => {
  const [selectedMachine, setSelectedMachine] = useState(MACHINES_LIST[0]);
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [severity, setSeverity] = useState<'normal' | 'urgent'>('urgent');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      machine: selectedMachine,
      category,
      severity,
      description,
    });
    setFeedback(true);
    setDescription('');
    setTimeout(() => setFeedback(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#FD6E6E]/15 text-[#AB1B1B] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">Report Machine Stoppage</h2>
            <p className="text-xs text-[#566E7F]">Pushes immediate warning to Owner Dashboard</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FD6E6E]/15 text-[#AB1B1B] border border-[#FD6E6E]/30">
          Instant Alert
        </span>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-[#FD6E6E]/10 border border-[#FD6E6E]/30 flex items-center gap-2 text-xs font-bold text-[#AB1B1B] animate-in zoom-in-95">
          <span className="material-symbols-outlined text-[20px]">report</span>
          <div>
            <p className="font-bold">Machine breakdown ticket logged!</p>
            <p className="text-[11px] font-normal text-[#AB1B1B]">
              Incident flagged on shopfloor overview. Maintenance technician notified.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">Select Machine</label>
          <select
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
          >
            {MACHINES_LIST.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">Breakdown Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
          >
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">Downtime Severity</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSeverity('normal')}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer select-none ${
                severity === 'normal'
                  ? 'bg-[#002941] text-white border-[#002941] shadow-xs'
                  : 'bg-[#F8FAFA] text-[#002941] border-[#DFECF3]'
              }`}
            >
              <p className="text-xs font-bold">Normal Maintenance</p>
              <p className="text-[10.5px] opacity-80 mt-0.5">Minor wear / slow run</p>
            </button>

            <button
              type="button"
              onClick={() => setSeverity('urgent')}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer select-none ${
                severity === 'urgent'
                  ? 'bg-gradient-to-r from-[#FD6E6E] to-[#AB1B1B] text-white border-transparent shadow-xs'
                  : 'bg-[#F8FAFA] text-[#AB1B1B] border-[#DFECF3]'
              }`}
            >
              <p className="text-xs font-bold">Urgent Line Stop</p>
              <p className="text-[10.5px] opacity-80 mt-0.5">Spindle stopped completely</p>
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#002941]">What happened? (Short note)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Spindle stopped after heavy vibration at 14:15. Bearing hot to touch."
            className="w-full p-3.5 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden focus:bg-white resize-none"
          />
        </div>

        <div className="pt-2">
          <PillButton
            type="submit"
            variant="coral"
            size="lg"
            className="w-full h-12 text-sm font-bold shadow-md"
            icon={<span className="material-symbols-outlined text-[19px]">report</span>}
          >
            Dispatch Breakdown Alert
          </PillButton>
        </div>
      </form>
    </div>
  );
};

export default WorkbenchMachineIssue;
