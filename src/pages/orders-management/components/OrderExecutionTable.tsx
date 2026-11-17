import React, { useState } from 'react';
import { Card, PillButton } from '../../../components/common';
import type { OrderExecutionItem } from '../../../types/ordersManagement';

export interface OrderExecutionTableProps {
  orders: OrderExecutionItem[];
  onAction?: (order: OrderExecutionItem) => void;
  className?: string;
}

export const OrderExecutionTable: React.FC<OrderExecutionTableProps> = ({
  orders,
  onAction,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.poNumber.toLowerCase().includes(q) ||
      o.clientName.toLowerCase().includes(q) ||
      o.partDescription.toLowerCase().includes(q) ||
      o.assignedLine.toLowerCase().includes(q)
    );
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Card padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002941] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">assignment</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002941]">
              Client Production Queue & Job Card Allocation
            </h2>
            <p className="text-xs sm:text-[13px] text-[#566E7F] mt-0.5">
              Active shopfloor commitments with automated BOM allocation tracking
            </p>
          </div>
          {selectedIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002941] text-[#CFE8E1]">
              {selectedIds.length} Selected
            </span>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8DA1AF]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order or client..."
            className="w-full h-9 pl-9 pr-3 rounded-full text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 sm:px-5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all orders"
                  checked={filteredOrders.length > 0 && selectedIds.length === filteredOrders.length}
                  onChange={handleSelectAll}
                  className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">PO Number & Client</th>
              <th className="py-3 px-4">Part Description</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Line Allocation</th>
              <th className="py-3 px-4">BOM Status</th>
              <th className="py-3 px-4">Fulfillment Stage</th>
              <th className="py-3 px-4 sm:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {filteredOrders.map((o) => {
              const isSelected = selectedIds.includes(o.id);
              const isPendingBom = o.bomStatus === 'pending';

              return (
                <tr
                  key={o.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]' : 'hover:bg-[#F8FAFA]/80'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-5">
                    <input
                      type="checkbox"
                      aria-label={`Select order ${o.poNumber}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(o.id)}
                      className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#002941] text-xs sm:text-[13px]">
                      {o.poNumber}
                    </div>
                    <div className="text-[11px] text-[#566E7F] font-medium">
                      {o.clientName}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#002941]">{o.partDescription}</div>
                    <div className="text-[11px] text-[#566E7F]">Contract: {o.contractValue}</div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#002941] tabular-nums">
                    {o.quantityUnits.toLocaleString()} Units
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0F5F9] text-[#002941] border border-[#DFECF3]">
                      {o.assignedLine}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isPendingBom
                          ? 'bg-[#FFF4F3] border border-[#FFD0CC] text-[#FD6E6E]'
                          : 'bg-[#CFE8E1] text-[#103530]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPendingBom ? 'bg-[#FD6E6E]' : 'bg-[#103530]'
                        }`}
                      />
                      {o.bomStatusLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-xs text-[#002941]">
                      {o.fulfillmentStageLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <PillButton
                      variant={isPendingBom ? 'coral' : 'secondary'}
                      size="sm"
                      onClick={() => onAction && onAction(o)}
                    >
                      {isPendingBom ? 'Expedite BOM' : 'Manage Job'}
                    </PillButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
