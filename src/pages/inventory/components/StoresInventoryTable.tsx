import React, { useState } from 'react';
import { Card, StatusDotBadge } from '../../../components/common';
import type { InventoryItem } from '../../../types/inventory';

export interface StoresInventoryTableProps {
  items: InventoryItem[];
  onActionMenu?: (item: InventoryItem) => void;
  className?: string;
}

export const StoresInventoryTable: React.FC<StoresInventoryTableProps> = ({
  items,
  onActionMenu,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.materialName.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.binCard.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.supplierName.toLowerCase().includes(q)
    );
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredItems.map((item) => item.id));
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
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941]">
            Stores & Raw Materials Inventory
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF1F5] text-[#002941] border border-[#DFECF3]">
            4 Categories
          </span>
          {selectedIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002941] text-[#CFE8E1]">
              {selectedIds.length} Selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#8DA1AF]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search item, SKU or Bin Card..."
              className="w-full h-9 pl-9 pr-3 rounded-full text-xs bg-[#F8FAFA] border border-[#DFECF3] text-[#002941] placeholder-[#8DA1AF] focus:outline-none focus:border-[#002941] focus:bg-white transition-all"
            />
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#F8FAFA] border border-[#DFECF3] flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-white transition-all cursor-pointer"
            title="Filter categories"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs min-w-[780px]">
          <thead className="bg-[#F8FAFA] text-[#566E7F] font-bold uppercase tracking-wider text-[11px] border-b border-[#DFECF3]">
            <tr>
              <th className="py-3 px-4 sm:px-5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all inventory items"
                  checked={
                    filteredItems.length > 0 && selectedIds.length === filteredItems.length
                  }
                  onChange={handleSelectAll}
                  className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Material Name & SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4">Reorder Level</th>
              <th className="py-3 px-4">Primary Supplier</th>
              <th className="py-3 px-4">Bin Card / Status</th>
              <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFECF3]">
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              const isLowStock = item.status === 'low_stock' || item.status === 'reorder_due';

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isSelected ? 'bg-[#F0F5F9]' : 'hover:bg-[#F8FAFA]/80'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-5">
                    <input
                      type="checkbox"
                      aria-label={`Select item ${item.sku}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(item.id)}
                      className="rounded-[4px] border-[#BDD7E7] text-[#002941] focus:ring-[#002941] cursor-pointer"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                          isLowStock
                            ? 'bg-[#FFF4F3] border-[#FFD0CC] text-[#FD6E6E]'
                            : 'bg-[#F0F5F9] border-[#DFECF3] text-[#002941]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {item.category === 'Raw Steel'
                            ? 'precision_manufacturing'
                            : item.category === 'Fasteners'
                            ? 'bolt'
                            : item.category === 'Castings'
                            ? 'layers'
                            : 'water_drop'}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-[#002941] text-xs sm:text-[13px]">
                          {item.materialName}
                        </div>
                        <div className="text-[11px] text-[#566E7F] font-mono">
                          {item.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0F5F9] text-[#566E7F]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold tabular-nums text-xs sm:text-[13px] ${
                        isLowStock ? 'text-[#FD6E6E]' : 'text-[#002941]'
                      }`}
                    >
                      {item.currentStock.toLocaleString('en-IN')} {item.currentStockUnit}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#566E7F] font-medium tabular-nums text-xs">
                      {item.reorderLevel.toLocaleString('en-IN')} {item.reorderLevelUnit}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-xs font-semibold text-[#002941]">
                      {item.supplierName}
                    </div>
                    <div className="text-[11px] text-[#8DA1AF]">
                      {item.supplierLocation}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#002941]">
                        {item.binCard}
                      </span>
                      <StatusDotBadge
                        status={
                          item.status === 'optimal'
                            ? 'completed'
                            : item.status === 'low_stock'
                            ? 'issue'
                            : 'pending'
                        }
                        label={
                          item.status === 'optimal'
                            ? 'Optimal'
                            : item.status === 'low_stock'
                            ? 'Low Stock'
                            : 'Reorder Due'
                        }
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <button
                      type="button"
                      onClick={() => onActionMenu?.(item)}
                      className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition"
                      title="Item actions"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
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
