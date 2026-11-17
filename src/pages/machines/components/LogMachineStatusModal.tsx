import React, { useState } from 'react';
import { PillButton } from '../../../components/common';
import type { WorkstationMachine } from '../../../types/machines';

export interface LogMachineStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  workstations: WorkstationMachine[];
  onSubmit: (data: {
    machineId: string;
    action: 'breakdown' | 'service_complete';
    category: string;
    technician: string;
    downtimeMinutes: number;
    notes: string;
  }) => void;
}

export const LogMachineStatusModal: React.FC<LogMachineStatusModalProps> = ({
  isOpen,
  onClose,
  workstations,
  onSubmit,
}) => {
  const [selectedMachineId, setSelectedMachineId] = useState(workstations[0]?.id || '');
  const [action, setAction] = useState<'breakdown' | 'service_complete'>('breakdown');
  const [category, setCategory] = useState('Spindle & Bearing Wear');
  const [technician, setTechnician] = useState('Suresh Bhai Parmar');
  const [downtimeMinutes, setDowntimeMinutes] = useState('45');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      machineId: selectedMachineId,
      action,
      category,
      technician,
      downtimeMinutes: parseInt(downtimeMinutes, 10) || 0,
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
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#002941]">Log Machine Spindle Status</h2>
              <p className="text-xs text-[#566E7F]">Record scheduled service or unscheduled breakdown</p>
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
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002941]">Action Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAction('breakdown')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition select-none cursor-pointer ${
                  action === 'breakdown'
                    ? 'bg-[#FD6E6E]/15 border-[#FD6E6E] text-[#AB1B1B] shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Log Breakdown / Stoppage
              </button>
              <button
                type="button"
                onClick={() => setAction('service_complete')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition select-none cursor-pointer ${
                  action === 'service_complete'
                    ? 'bg-[#E4F4F0] border-[#2D8576] text-[#184E46] shadow-2xs'
                    : 'bg-[#F8FAFA] border-[#DFECF3] text-[#566E7F]'
                }`}
              >
                Service Done / Operational
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Workstation</label>
            <select
              value={selectedMachineId}
              onChange={(e) => setSelectedMachineId(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
            >
              {workstations.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name} ({ws.code}) — {ws.operatorOrTech}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002941]">Issue / Service Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
              >
                <option value="Spindle & Bearing Wear">Spindle &amp; Bearing Wear</option>
                <option value="Hydraulic Pump & Valve">Hydraulic Pump &amp; Valve</option>
                <option value="Coolant Flushing & Oil">Coolant Flushing &amp; Oil</option>
                <option value="Electrical Drive / CNC Error">Electrical Drive / CNC Error</option>
                <option value="Calibration & Turret Check">Calibration &amp; Turret Check</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002941]">Downtime (Minutes)</label>
              <input
                type="number"
                value={downtimeMinutes}
                onChange={(e) => setDowntimeMinutes(e.target.value)}
                className="w-full h-11 px-3.5 text-xs font-bold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden tabular-nums"
                placeholder="45"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Assigned Maintenance Technician</label>
            <input
              type="text"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              className="w-full h-11 px-3.5 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002941]">Technician Notes &amp; Rectification</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Drive belt replaced, spindle run-in tested for 15 mins at 2400 RPM."
              className="w-full p-3 text-xs font-medium bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <PillButton type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton
              type="submit"
              variant={action === 'breakdown' ? 'coral' : 'primary'}
              size="md"
              className="font-bold text-xs shadow-xs"
            >
              {action === 'breakdown' ? 'Log Stoppage Ticket' : 'Update Fleet to Operational'}
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogMachineStatusModal;
