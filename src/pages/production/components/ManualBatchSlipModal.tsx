import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface ManualBatchSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (batch: {
    sectionMachine: string;
    jobCardNumber: string;
    targetUnits: number;
    goodUnits: number;
    scrapUnits: number;
    defectReason: string;
    operatorNotes: string;
  }) => void;
}

export const ManualBatchSlipModal: React.FC<ManualBatchSlipModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [sectionMachine, setSectionMachine] = useState('CNC-01 (VMC Leadwell) - Gear Casings');
  const [jobCardNumber, setJobCardNumber] = useState('BAT-2024-1043');
  const [targetUnits, setTargetUnits] = useState(250);
  const [goodUnits, setGoodUnits] = useState(246);
  const [scrapUnits, setScrapUnits] = useState(4);
  const [defectReason, setDefectReason] = useState('Tool chatter / dimension mismatch');
  const [operatorNotes, setOperatorNotes] = useState('Insert indexing done at cycle start.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sectionMachine,
      jobCardNumber,
      targetUnits: Number(targetUnits),
      goodUnits: Number(goodUnits),
      scrapUnits: Number(scrapUnits),
      defectReason,
      operatorNotes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DFECF3] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-[#DFECF3] flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#002941]">Log Production Batch Slip</h3>
              <p className="text-xs text-[#566E7F]">Shift A shopfloor manual verification & sign-off</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-white transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Section / Machine Line
            </label>
            <select
              value={sectionMachine}
              onChange={(e) => setSectionMachine(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] focus:bg-white"
            >
              <option value="CNC-01 (VMC Leadwell) - Gear Casings">CNC-01 (VMC Leadwell) - Gear Casings</option>
              <option value="M-02 (Conventional Lathe 6ft) - Flange Bushings">M-02 (Conventional Lathe 6ft) - Flange Bushings</option>
              <option value="M-03 (Radial Drill 32mm) - Base Plates">M-03 (Radial Drill 32mm) - Base Plates</option>
              <option value="M-04 (VMC Milling) - Staging for Dispatch">M-04 (VMC Milling) - Staging for Dispatch</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Job Card / Batch ID
              </label>
              <input
                type="text"
                required
                value={jobCardNumber}
                onChange={(e) => setJobCardNumber(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Batch Target (pcs)
              </label>
              <input
                type="number"
                required
                value={targetUnits}
                onChange={(e) => setTargetUnits(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] tabular-nums focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Good Output (pcs)
              </label>
              <input
                type="number"
                required
                value={goodUnits}
                onChange={(e) => setGoodUnits(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] tabular-nums focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Scrap / Rejection (pcs)
              </label>
              <input
                type="number"
                required
                value={scrapUnits}
                onChange={(e) => setScrapUnits(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E] font-bold tabular-nums focus:outline-none focus:border-[#FD6E6E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Scrap Reason / Defect Category
            </label>
            <select
              value={defectReason}
              onChange={(e) => setDefectReason(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] focus:bg-white"
            >
              <option value="Tool chatter / dimension mismatch">Tool chatter / dimension mismatch</option>
              <option value="Surface finish variance">Surface finish variance</option>
              <option value="Raw material casting porosity">Raw material casting porosity</option>
              <option value="Operator setup calibration">Operator setup calibration</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Operator & Machine Notes
            </label>
            <textarea
              rows={2}
              value={operatorNotes}
              onChange={(e) => setOperatorNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] focus:bg-white resize-none"
            />
          </div>

          <div className="pt-3 border-t border-[#DFECF3] flex items-center justify-end gap-2.5">
            <PillButton type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton type="submit" variant="primary" size="sm">
              Authenticate & Log Batch
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};
