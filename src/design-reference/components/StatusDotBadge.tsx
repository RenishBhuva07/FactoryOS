import React from 'react';
import type { SemanticStatus } from '../../types/dashboard';

export interface StatusDotBadgeProps {
  status: SemanticStatus;
  label?: string;
  size?: 'sm' | 'md';
  variant?: 'pill' | 'dotOnly';
  className?: string;
}

export const StatusDotBadge: React.FC<StatusDotBadgeProps> = ({
  status,
  label,
  size = 'md',
  variant = 'pill',
  className = '',
}) => {
  const statusStyles = {
    completed: {
      bg: 'bg-[#E4F4F0]',
      text: 'text-[#184E46]',
      dot: 'bg-[#2D8576]',
      pillDot: 'bg-[#2D8576]',
      defaultLabel: 'Completed',
    },
    inProgress: {
      bg: 'bg-[#DFECF3] border border-[#BDD7E7]',
      text: 'text-[#002941]',
      dot: 'bg-[#002941]',
      pillDot: 'bg-[#002941]',
      defaultLabel: 'In Progress',
    },
    pending: {
      bg: 'bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] shadow-xs',
      text: 'text-white font-semibold',
      dot: 'bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]',
      pillDot: 'bg-white',
      defaultLabel: 'Pending',
    },
    issue: {
      bg: 'bg-[#FFE6E4] border border-[#FD6E6E]/60',
      text: 'text-[#871919]',
      dot: 'bg-[#D62727]',
      pillDot: 'bg-[#D62727]',
      defaultLabel: 'Issue',
    },
  }[status];

  if (variant === 'dotOnly') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium text-[#002941] select-none ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusStyles.dot}`} />
        <span>{label || statusStyles.defaultLabel}</span>
      </span>
    );
  }

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium select-none ${statusStyles.bg} ${statusStyles.text} ${sizeStyles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusStyles.pillDot || statusStyles.dot}`} />
      <span>{label || statusStyles.defaultLabel}</span>
    </span>
  );
};

export default StatusDotBadge;
