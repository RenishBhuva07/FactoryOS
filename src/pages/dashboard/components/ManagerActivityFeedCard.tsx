import React from 'react';
import { Card } from '../../../components/common';
import type { ManagerActivityItem } from '../../../types/dashboard';

export interface ManagerActivityFeedCardProps {
  activities: ManagerActivityItem[];
  onViewAll?: () => void;
  className?: string;
}

export const ManagerActivityFeedCard: React.FC<ManagerActivityFeedCardProps> = ({
  activities,
  onViewAll,
  className = '',
}) => {
  return (
    <Card padding="md" className={`flex flex-col gap-3.5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#002941] tracking-tight">
            Manager Activity Feed
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#002941] hover:text-[#164E6E] hover:underline cursor-pointer select-none"
        >
          View All
        </button>
      </div>

      {/* Feed List */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] divide-y divide-[#DFECF3]/60">
        {activities.map((item) => (
          <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F0F5F9] text-[#002941] font-bold text-xs flex items-center justify-center shrink-0 border border-[#DFECF3] shadow-2xs">
              {item.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs font-bold text-[#002941] truncate">
                  {item.authorName}{' '}
                  <span className="font-normal text-[#566E7F]">({item.role})</span>
                </p>
                <span className="text-[11px] font-semibold text-[#8DA1AF] tabular-nums shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-[#566E7F] mt-0.5 leading-relaxed truncate">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ManagerActivityFeedCard;

