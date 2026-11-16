import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  badge?: number | string;
}

export interface SegmentedPillNavProps {
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'white' | 'gray';
  className?: string;
}

export const SegmentedPillNav: React.FC<SegmentedPillNavProps> = ({
  items,
  activeId,
  onChange,
  variant = 'white',
  className = '',
}) => {
  const containerStyle =
    variant === 'white'
      ? 'bg-white p-1 rounded-full border border-[#EBF1F5] shadow-[0_2px_8px_rgba(0,41,65,0.04)]'
      : 'bg-[#F0F5F9] p-1.5 rounded-full border border-[#EBF1F5]';

  return (
    <div
      className={`inline-flex items-center gap-1 ${containerStyle} ${className}`}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-[0_3px_10px_rgba(0,41,65,0.22)]'
                : 'text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9]'
            }`}
          >
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-[#CFE8E1] text-[#002941]' : 'bg-[#DFECF3] text-[#002941]'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedPillNav;

