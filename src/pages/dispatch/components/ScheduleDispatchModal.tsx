import React, { useState } from 'react';
import { PillButton } from '../../../components/common';

export interface ScheduleDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    client: string;
    carrier: string;
    vehicle: string;
    units: number;
    dockBay: string;
  }) => void;
}

export const ScheduleDispatchModal: React.FC<ScheduleDispatchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [client, setClient] = useState('BioTerra Organics (Vadodara)');
  const [carrier, setCarrier] = useState('BlueDart Logistics');
  const [vehicle, setVehicle] = useState('GJ-01-AX-9912');
  const [units, setUnits] = useState('4500');
  const [dockBay, setDockBay] = useState('Bay 01');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      client,
      carrier,
      vehicle,
      units: parseInt(units, 10) || 1000,
      dockBay,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-[28px] border border-[#DFECF3] shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#002941]">Schedule Freight Dispatch</h2>
              <p className="text-xs text-[#566E7F]">Generate carrier gate pass and assign loading bay</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F0F5F9] text-[#566E7F] hover:text-[#002941] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#566E7F] uppercase tracking-wider">
              Destination Client
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-semibold focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#566E7F] uppercase tracking-wider">
                Carrier Partner
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full h-10 px-3 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
              >
                <option>BlueDart Logistics</option>
                <option>VRL Logistics</option>
                <option>SafeXpress</option>
                <option>TCI Freight</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#566E7F] uppercase tracking-wider">
                Vehicle Registration #
              </label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-mono focus:outline-none focus:border-[#002941] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#566E7F] uppercase tracking-wider">
                Dispatch Volume (Units)
              </label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-bold tabular-nums focus:outline-none focus:border-[#002941] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#566E7F] uppercase tracking-wider">
                Assigned Loading Bay
              </label>
              <select
                value={dockBay}
                onChange={(e) => setDockBay(e.target.value)}
                className="w-full h-10 px-3 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
              >
                <option>Bay 01 (Staging)</option>
                <option>Bay 02 (Ready)</option>
                <option>Bay 03 (SafeXpress)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DFECF3] flex items-center justify-end gap-2.5">
            <PillButton type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </PillButton>
            <PillButton type="submit" variant="primary" size="md">
              Confirm & Issue Gate Pass
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};
