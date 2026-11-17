import React from 'react';
import type { OnboardingMachine } from '../../../types/onboarding';

interface MachineRowItemProps {
  machine: OnboardingMachine;
  isGujarati?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (machine: OnboardingMachine) => void;
}

const GUJARATI_TYPES: Record<string, string> = {
  'CNC Turning': 'સીએનસી ટર્નિંગ',
  Milling: 'વીએમસી મિલિંગ',
  'Manual Lathe': 'મેન્યુઅલ લેથ',
  'Drilling & Tapping': 'ડ્રિલિંગ અને ટેપિંગ',
  'Grinding & Finishing': 'ગ્રાઇન્ડિંગ અને ફિનિશિંગ',
  'Press & Assembly': 'પ્રેસ અને એસેમ્બલી',
};

export const MachineRowItem: React.FC<MachineRowItemProps> = ({
  machine,
  isGujarati = false,
  onDelete,
  onEdit,
}) => {
  const gujaratiType = GUJARATI_TYPES[machine.typeLabel] || machine.typeLabel;
  const statusDisplay = isGujarati
    ? machine.status === 'ready_for_production'
      ? 'ઉત્પાદન માટે તૈયાર'
      : machine.status === 'ready'
      ? 'તૈયાર છે'
      : 'મેન્ટેનન્સ'
    : machine.statusLabel;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-[#DFECF3] shadow-2xs hover:border-[#BDD7E7] transition">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            machine.category === 'cnc'
              ? 'bg-[#E4F4F0] text-[#184E46]'
              : 'bg-[#F0F5F9] text-[#002941]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">
            {machine.category === 'cnc' ? 'precision_manufacturing' : 'build'}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-[#002941] truncate">{machine.name}</h4>
            <span className="px-2 py-0.5 rounded-md bg-[#F0F5F9] text-[#566E7F] text-[10px] font-bold uppercase tracking-wider">
              {isGujarati ? `${machine.typeLabel} (${gujaratiType})` : machine.typeLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#566E7F] mt-0.5">
            <span>{machine.modelYear}</span>
            <span>&bull;</span>
            <span className="truncate">{machine.bayLocation}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DFECF3]/70">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D8576]" />
          <span>{statusDisplay}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit && onEdit(machine)}
            title="Edit Machine"
            className="w-7 h-7 rounded-lg text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] transition flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(machine.id)}
            title="Remove Machine"
            className="w-7 h-7 rounded-lg text-[#8DA1AF] hover:text-[#D62727] hover:bg-[#FFE6E4] transition flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineRowItem;
