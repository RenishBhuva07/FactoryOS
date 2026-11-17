import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';

export interface QuickLoggingFormCardProps {
  onSubmit?: (entry: {
    machine: string;
    batchId: string;
    goodUnits: number;
    scrapUnits: number;
    defectCategory: string;
    notes: string;
  }) => void;
  className?: string;
}

export const QuickLoggingFormCard: React.FC<QuickLoggingFormCardProps> = ({
  onSubmit,
  className = '',
}) => {
  const [machine, setMachine] = useState('CNC-01 (VMC Leadwell) - Gear Casings');
  const [batchId, setBatchId] = useState('BAT-2024-1042');
  const [goodUnits, setGoodUnits] = useState('120');
  const [scrapUnits, setScrapUnits] = useState('2');
  const [defectCategory, setDefectCategory] = useState('Tool chatter / dimension mismatch');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        machine,
        batchId,
        goodUnits: parseInt(goodUnits, 10) || 0,
        scrapUnits: parseInt(scrapUnits, 10) || 0,
        defectCategory,
        notes,
      });
    }
  };

  return (
    <Card padding="sm" className={`flex flex-col gap-2.5 ${className}`}>
      <div className="flex items-center gap-2 pb-1 border-b border-[#DFECF3]">
        <span className="material-symbols-outlined text-[18px] text-[#002941]">
          edit_note
        </span>
        <h2 className="text-sm sm:text-base font-bold text-[#002941]">
          Quick Logging
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
            Select Section / Machine
          </label>
          <select
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="w-full h-8 px-2.5 rounded-lg text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] transition-all"
          >
            <option>CNC-01 (VMC Leadwell) - Gear Casings</option>
            <option>CNC-02 (ACE Micromatic) - Flange Rings</option>
            <option>Lathe-01 (6ft Conventional) - Bushings</option>
            <option>Drill-01 (Radial 32mm) - Base Plates</option>
          </select>
        </div>

        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
            Job Card / Batch ID
          </label>
          <input
            type="text"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            className="w-full h-8 px-2.5 rounded-lg text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
              Good Units (pcs)
            </label>
            <input
              type="number"
              value={goodUnits}
              onChange={(e) => setGoodUnits(e.target.value)}
              className="w-full h-8 px-2.5 rounded-lg text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-bold tabular-nums focus:outline-none focus:border-[#002941] transition-all"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-[#D62727] uppercase tracking-wider">
              Scrap Units
            </label>
            <input
              type="number"
              value={scrapUnits}
              onChange={(e) => setScrapUnits(e.target.value)}
              className="w-full h-8 px-2.5 rounded-lg text-xs bg-[#FFF4F3] border border-[#FFD0CC] text-[#D62727] font-bold tabular-nums focus:outline-none focus:border-[#D62727] transition-all"
            />
          </div>
        </div>

        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
            Scrap Reason / Defect Category
          </label>
          <select
            value={defectCategory}
            onChange={(e) => setDefectCategory(e.target.value)}
            className="w-full h-8 px-2.5 rounded-lg text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] focus:outline-none focus:border-[#002941] transition-all"
          >
            <option>Tool chatter / dimension mismatch</option>
            <option>Surface burr & roughness</option>
            <option>Material porosity</option>
            <option>Operator setup error</option>
          </select>
        </div>

        <div className="space-y-0.5">
          <label className="text-[10px] font-bold text-[#566E7F] uppercase tracking-wider">
            Operator & Machine Notes
          </label>
          <textarea
            rows={1}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Mention tool wear, inserts changed or idle time..."
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] transition-all resize-none"
          />
        </div>

        <PillButton
          type="submit"
          variant="primary"
          size="sm"
          className="w-full"
          icon={<span className="material-symbols-outlined text-[16px]">send</span>}
        >
          Submit Shift Entry
        </PillButton>
      </form>
    </Card>
  );
};
