import React, { useState } from 'react';
import type { OnboardingMachine } from '../../../types/onboarding';

interface EditMachineModalProps {
  machine: OnboardingMachine | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<OnboardingMachine>) => void;
}

interface EditMachineFormProps {
  machine: OnboardingMachine;
  onClose: () => void;
  onSave: (id: string, updates: Partial<OnboardingMachine>) => void;
}

const EditMachineForm: React.FC<EditMachineFormProps> = ({ machine, onClose, onSave }) => {
  const [name, setName] = useState(machine.name);
  const [category, setCategory] = useState<'cnc' | 'conventional'>(machine.category);
  const [typeLabel, setTypeLabel] = useState(machine.typeLabel);
  const [modelYear, setModelYear] = useState(machine.modelYear);
  const [bayLocation, setBayLocation] = useState(machine.bayLocation);
  const [status, setStatus] = useState<'ready_for_production' | 'ready' | 'maintenance'>(machine.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(machine.id, {
      name,
      category,
      typeLabel,
      modelYear,
      bayLocation,
      status,
      statusLabel:
        status === 'ready_for_production'
          ? 'Ready for Production'
          : status === 'ready'
          ? 'Ready'
          : 'Under Maintenance',
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
          Machine Asset Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'cnc' | 'conventional')}
            className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 appearance-none"
          >
            <option value="cnc">CNC Line</option>
            <option value="conventional">Conventional</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
            Type Process Label
          </label>
          <input
            type="text"
            required
            value={typeLabel}
            onChange={(e) => setTypeLabel(e.target.value)}
            placeholder="e.g. CNC Turning"
            className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
            Model Year / Vintage
          </label>
          <input
            type="text"
            required
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            placeholder="e.g. 2022 Model"
            className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
            Bay Location
          </label>
          <input
            type="text"
            required
            value={bayLocation}
            onChange={(e) => setBayLocation(e.target.value)}
            placeholder="e.g. Bay A (Chucker Section)"
            className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#002941] block mb-1">
          Operational Status
        </label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as 'ready_for_production' | 'ready' | 'maintenance')
          }
          className="w-full h-9.5 px-3 rounded-xl bg-[#F8FAFA] text-xs font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 appearance-none"
        >
          <option value="ready_for_production">Ready for Production</option>
          <option value="ready">Ready (Pre-inspected)</option>
          <option value="maintenance">Under Maintenance</option>
        </select>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFECF3]">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-full text-xs font-bold text-[#566E7F] hover:bg-[#F0F5F9] transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-bold shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export const EditMachineModal: React.FC<EditMachineModalProps> = ({
  machine,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !machine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 border border-[#DFECF3] shadow-lg animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#DFECF3] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#002941]">Edit Machine Asset</h3>
              <p className="text-[11px] text-[#566E7F]">{machine.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <EditMachineForm
          key={machine.id}
          machine={machine}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default EditMachineModal;
