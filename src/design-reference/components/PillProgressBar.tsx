import React from 'react';

export interface PillProgressBarProps {
  value: number;
  max: number;
  leftLabel?: string;
  rightLabel?: string;
  variant?: 'navy' | 'mint' | 'coral';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PillProgressBar: React.FC<PillProgressBarProps> = ({
  value,
  max,
  leftLabel,
  rightLabel,
  variant = 'navy',
  height = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[height];

  const barStyles = {
    navy: 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E]',
    mint: 'bg-gradient-to-r from-[#CFE8E1] via-[#74BFB0] to-[#43A392]',
    coral: 'bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] shadow-[0_1px_4px_rgba(253,110,110,0.3)]',
  }[variant];

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className={`w-full rounded-full bg-[#DFECF3]/70 overflow-hidden ${heightStyles}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${barStyles}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {(leftLabel || rightLabel) && (
        <div className="flex items-center justify-between text-xs text-[#566E7F] font-medium">
          <span>{leftLabel}</span>
          <span className="font-semibold text-[#002941]">{rightLabel}</span>
        </div>
      )}
    </div>
  );
};

export default PillProgressBar;

