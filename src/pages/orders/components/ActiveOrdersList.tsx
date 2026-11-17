import React, { useState } from 'react';
import { SegmentedPillNav } from '../../../components/common';
import { OrderCommitmentCard } from './OrderCommitmentCard';
import type { OrderCommitment } from '../../../types/orders';

export interface ActiveOrdersListProps {
  orders: OrderCommitment[];
  onFastTrackQc?: (order: OrderCommitment) => void;
  onViewAllocation?: (order: OrderCommitment) => void;
  onMoreActions?: (order: OrderCommitment) => void;
  className?: string;
}

const FILTER_ITEMS = [
  { id: 'all', label: 'All Status' },
  { id: 'needs_qc', label: 'Needs QC' },
];

export const ActiveOrdersList: React.FC<ActiveOrdersListProps> = ({
  orders,
  onFastTrackQc,
  onViewAllocation,
  onMoreActions,
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'needs_qc') {
      return order.needsQc || order.status === 'awaiting_qc';
    }
    return true;
  });

  return (
    <section className={`space-y-3.5 ${className}`}>
      {/* Section Header with Segmented Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#002941]">
            Active Priority Commitments
          </h2>
          <p className="text-xs text-[#566E7F]">
            Sorted by urgency and required dispatch milestones
          </p>
        </div>

        <div className="shrink-0">
          <SegmentedPillNav
            items={FILTER_ITEMS}
            activeId={activeFilter}
            onChange={setActiveFilter}
            variant="gray"
          />
        </div>
      </div>

      {/* List of Order Cards */}
      <div className="space-y-3.5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCommitmentCard
              key={order.id}
              order={order}
              onFastTrackQc={onFastTrackQc}
              onViewAllocation={onViewAllocation}
              onMoreActions={onMoreActions}
            />
          ))
        ) : (
          <div className="bg-white border border-[#DFECF3] rounded-2xl p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-3xl text-[#8DA1AF]">
              check_circle
            </span>
            <p className="text-sm font-semibold text-[#002941]">No orders needing attention</p>
            <p className="text-xs text-[#566E7F]">All production QC checkpoints are up to date.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveOrdersList;
