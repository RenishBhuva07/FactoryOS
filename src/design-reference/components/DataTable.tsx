import React from 'react';
import type { ActivityTransaction } from '../../types/dashboard';
import { StatusDotBadge } from './StatusDotBadge';

export interface DataTableProps {
  transactions: ActivityTransaction[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  showDate?: boolean;
  showActions?: boolean;
  className?: string;
}

const TableCheckbox: React.FC<{
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
}> = ({ checked, onChange, ariaLabel }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={onChange}
    className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-all duration-150 cursor-pointer ${
      checked
        ? 'bg-[#002941] border border-[#002941] text-white shadow-2xs'
        : 'bg-white border border-[#CBD6DF] hover:border-[#8DA1AF]'
    }`}
  >
    {checked && (
      <svg
        className="w-2.5 h-2.5 text-white stroke-[2.5]"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
      >
        <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

export const DataTable: React.FC<DataTableProps> = ({
  transactions,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  showDate = false,
  showActions = false,
  className = '',
}) => {
  const isAllSelected = transactions.length > 0 && selectedIds.length === transactions.length;

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#F8FAFA] text-[11px] font-semibold text-[#8DA1AF]">
            <th className="py-2 px-2.5 w-9 rounded-l-lg">
              <TableCheckbox
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                ariaLabel="Select all"
              />
            </th>
            <th className="py-2 px-2.5">Order ID</th>
            <th className="py-2 px-2.5">Activity</th>
            <th className="py-2 px-2.5">Price</th>
            <th className="py-2 px-2.5">Status</th>
            {showDate && <th className="py-2 px-2.5">Date</th>}
            {showActions && <th className="py-2 px-2.5 text-right rounded-r-lg"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EBF1F5]/70 text-xs">
          {transactions.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#F8FAFA]"
              >
                <td className="py-2.5 px-2.5">
                  <TableCheckbox
                    checked={isSelected}
                    onChange={() => onToggleSelect(item.id)}
                    ariaLabel={`Select ${item.orderId}`}
                  />
                </td>

                <td className="py-2.5 px-2.5 font-medium text-[#566E7F] whitespace-nowrap text-xs">
                  {item.orderId}
                </td>

                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                    >
                      <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                    </div>
                    <span className="font-semibold text-[#002941] text-xs">{item.activity}</span>
                  </div>
                </td>

                <td className="py-2.5 px-2.5 font-semibold text-[#002941] tabular-nums whitespace-nowrap text-xs">
                  ${item.price.toLocaleString()}
                </td>

                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <StatusDotBadge status={item.status} label={item.statusLabel} variant="dotOnly" />
                </td>

                {showDate && (
                  <td className="py-2.5 px-2.5 text-[#566E7F] text-[11px] whitespace-nowrap">
                    {item.date}
                  </td>
                )}

                {showActions && (
                  <td className="py-2.5 px-2.5 text-right">
                    <button
                      className="text-[#8DA1AF] hover:text-[#002941] p-1 rounded-full hover:bg-white transition cursor-pointer"
                      title="Actions"
                    >
                      <span className="material-symbols-outlined text-[17px]">more_horiz</span>
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
