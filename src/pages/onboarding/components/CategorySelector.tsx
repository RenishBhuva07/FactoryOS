import React from 'react';
import type { ManufacturingCategoryId, ManufacturingCategoryOption } from '../../../types/onboarding';

interface CategorySelectorProps {
  selectedCategory: ManufacturingCategoryId;
  onChange: (category: ManufacturingCategoryId) => void;
}

const CATEGORIES: ManufacturingCategoryOption[] = [
  {
    id: 'machining',
    title: 'PPU & Precision Machining',
    subtitle: 'CNC, VMC, Lathe, Milling',
  },
  {
    id: 'fabrication',
    title: 'Fabrication & Sheet Metal',
    subtitle: 'Laser cutting, Bending, TIG/MIG',
  },
  {
    id: 'injection_moulding',
    title: 'Plastic Injection Moulding',
    subtitle: 'Tonnage presses, Polymer parts',
  },
  {
    id: 'foundry',
    title: 'Foundry & Casting',
    subtitle: 'Induction furnaces, SG iron, Sand',
  },
  {
    id: 'packaging',
    title: 'Packaging & Assembly',
    subtitle: 'Conveyors, Box cartons, Boxing',
  },
  {
    id: 'electrical_hardware',
    title: 'Electrical & Fasteners',
    subtitle: 'Brass parts, Terminals, Bolts',
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-[#002941]">
          Primary Manufacturing Category
        </label>
        <span className="text-xs text-[#566E7F] font-medium">Select single primary line</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <label
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#F4FAF8] border-[#2D8576] shadow-xs text-[#002941]'
                  : 'bg-white hover:bg-[#F8FAFA] border-[#DFECF3] text-[#002941]'
              }`}
            >
              <input
                type="radio"
                name="mfg_category"
                value={cat.id}
                checked={isSelected}
                onChange={() => onChange(cat.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#2D8576] text-white shadow-xs'
                    : 'bg-white border border-[#DFECF3]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                )}
              </div>
              <div className="min-w-0">
                <div
                  className={`text-xs sm:text-sm leading-snug ${
                    isSelected ? 'font-bold text-[#002941]' : 'font-semibold text-[#002941]'
                  }`}
                >
                  {cat.title}
                </div>
                <div className="text-[11px] text-[#566E7F] leading-tight mt-0.5">{cat.subtitle}</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
