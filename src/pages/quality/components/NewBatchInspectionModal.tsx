import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface NewBatchInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspection: {
    batchPoNumber: string;
    componentName: string;
    toleranceVariance: string;
    sampleCount: number;
    inspectionTool: string;
    status: 'passed' | 'under_inspection' | 'rework_required';
  }) => void;
}

export const NewBatchInspectionModal: React.FC<NewBatchInspectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [batchPoNumber, setBatchPoNumber] = useState('PO #ORD-1044');
  const [componentName, setComponentName] = useState('Cast Iron Flange Castings');
  const [toleranceVariance, setToleranceVariance] = useState('+0.02mm');
  const [sampleCount, setSampleCount] = useState(25);
  const [inspectionTool, setInspectionTool] = useState('Dial Bore Gauge & Micrometer');
  const [status, setStatus] = useState<'passed' | 'under_inspection' | 'rework_required'>('passed');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      batchPoNumber,
      componentName,
      toleranceVariance,
      sampleCount: Number(sampleCount),
      inspectionTool,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#DFECF3] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-[#DFECF3] flex items-center justify-between bg-[#F8FAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#002941]">New Batch Inspection</h3>
              <p className="text-xs text-[#566E7F]">Metrology sampling & precision dimensional clearance</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Batch / PO Number
              </label>
              <input
                type="text"
                required
                value={batchPoNumber}
                onChange={(e) => setBatchPoNumber(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Tolerance Variance
              </label>
              <input
                type="text"
                required
                value={toleranceVariance}
                onChange={(e) => setToleranceVariance(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              Component & Spec Description
            </label>
            <input
              type="text"
              required
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Sample Checked (pcs)
              </label>
              <input
                type="number"
                required
                value={sampleCount}
                onChange={(e) => setSampleCount(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] tabular-nums focus:outline-none focus:border-[#002941] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
                Calibration Tool Used
              </label>
              <select
                value={inspectionTool}
                onChange={(e) => setInspectionTool(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] focus:bg-white"
              >
                <option value="Dial Bore Gauge & Micrometer">Dial Bore Gauge & Micrometer</option>
                <option value="Vernier Caliper #01 (Mitutoyo)">Vernier Caliper #01 (Mitutoyo)</option>
                <option value="Height Gauge Master Ring">Height Gauge Master Ring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#566E7F] uppercase mb-1">
              QC Verdict
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('passed')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  status === 'passed'
                    ? 'bg-[#CFE8E1] text-[#103530] border-[#97D4C5]'
                    : 'bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                Passed
              </button>
              <button
                type="button"
                onClick={() => setStatus('under_inspection')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  status === 'under_inspection'
                    ? 'bg-[#002941] text-white border-[#002941]'
                    : 'bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">hourglass_top</span>
                Sampling
              </button>
              <button
                type="button"
                onClick={() => setStatus('rework_required')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  status === 'rework_required'
                    ? 'bg-[#FD6E6E] text-white border-[#FD6E6E]'
                    : 'bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">warning</span>
                Rework
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DFECF3] flex items-center justify-end gap-2.5">
            <PillButton type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton type="submit" variant="primary" size="sm">
              Save QC Record
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};
