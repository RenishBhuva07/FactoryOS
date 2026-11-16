import React, { useState, useMemo } from 'react';
import { Card, PillSearch, PillButton, DataTable } from '../../../components/common';
import type { ActivityTransaction } from '../../../types/dashboard';

export interface RecentActivitiesCardProps {
  transactions: ActivityTransaction[];
  className?: string;
}

export const RecentActivitiesCard: React.FC<RecentActivitiesCardProps> = ({
  transactions,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['tx-4']);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (tx) =>
        tx.activity.toLowerCase().includes(query) ||
        tx.orderId.toLowerCase().includes(query) ||
        tx.status.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map((tx) => tx.id));
    }
  };

  return (
    <Card variant="default" padding="md" className={`space-y-4 ${className}`}>
      {/* Header with Title and Search/Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-base font-bold text-[#002941] tracking-tight">
          Recent Activities
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-44 sm:w-56">
            <PillSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search"
            />
          </div>

          <PillButton
            variant="ghost"
            size="sm"
            icon={<span className="material-symbols-outlined text-[16px]">filter_list</span>}
            className="text-xs py-2 px-3.5 bg-white border-[#DFECF3]"
          >
            Filter
          </PillButton>
        </div>
      </div>

      {/* Modern Data Table */}
      <DataTable
        transactions={filteredTransactions}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        showDate={true}
        showActions={true}
      />
    </Card>
  );
};

export default RecentActivitiesCard;
