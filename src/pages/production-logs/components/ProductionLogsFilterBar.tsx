import React from 'react';

export interface ProductionLogsFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedMachine: string;
  onMachineChange: (value: string) => void;
  selectedShift: string;
  onShiftChange: (value: string) => void;
  onToggleFilters?: () => void;
  className?: string;
}

export const ProductionLogsFilterBar: React.FC<ProductionLogsFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedMachine,
  onMachineChange,
  selectedShift,
  onShiftChange,
  onToggleFilters,
  className = '',
}) => {
  return (
    <div
      className={`p-3 rounded-2xl bg-white border border-[#DFECF3] shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-2.5 ${className}`}
    >
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8DA1AF]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Job Card, Machine (M-01 to M-08)..."
          className="w-full h-9 pl-9 pr-3 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={selectedMachine}
          onChange={(e) => onMachineChange(e.target.value)}
          className="h-9 px-3 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
        >
          <option>All Machines (8 Units)</option>
          <option>M-01 CNC Lathe ACE</option>
          <option>M-02 Conventional Lathe 6ft</option>
          <option>M-03 Radial Drill 32mm</option>
        </select>

        <select
          value={selectedShift}
          onChange={(e) => onShiftChange(e.target.value)}
          className="h-9 px-3 rounded-xl text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] font-medium focus:outline-none focus:border-[#002941] transition-all"
        >
          <option>Shift A (08:00 - 16:30)</option>
          <option>Shift B (16:30 - 01:00)</option>
          <option>Shift C (01:00 - 08:00)</option>
        </select>

        <button
          type="button"
          onClick={onToggleFilters}
          className="h-9 px-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-xs font-semibold text-[#566E7F] hover:text-[#002941] hover:bg-white flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">tune</span>
          Filters
        </button>
      </div>
    </div>
  );
};
