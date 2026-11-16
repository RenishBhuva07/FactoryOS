import React from 'react';
import { Card, PillProgressBar } from '../../components';

export interface SpendingLimitCardProps {
  spentAmount: number;
  totalLimit: number;
  className?: string;
}

export const SpendingLimitCard: React.FC<SpendingLimitCardProps> = ({
  spentAmount,
  totalLimit,
  className = '',
}) => {
  return (
    <Card variant="default" padding="md" className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#002941]">Monthly Spending Limit</h3>
      </div>

      <PillProgressBar
        value={spentAmount}
        max={totalLimit}
        variant="coral"
        leftLabel={`$${spentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} spent out of`}
        rightLabel={`$${totalLimit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
      />
    </Card>
  );
};

export default SpendingLimitCard;

