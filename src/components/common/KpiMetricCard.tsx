import React from 'react';
import { Card } from './Card';

export interface KpiMetricCardProps {
  title: string;
  value: string;
  changeText: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  isHero?: boolean;
  accent?: 'default' | 'hero' | 'coral' | 'mint' | 'navy';
  className?: string;
  onClick?: () => void;
}

export const KpiMetricCard: React.FC<KpiMetricCardProps> = ({
  title,
  value,
  changeText,
  trend,
  icon,
  isHero = false,
  accent = 'default',
  className = '',
  onClick,
}) => {
  if (isHero) {
    const heroVariant =
      accent === 'coral'
        ? 'heroCoral'
        : accent === 'mint'
        ? 'heroMint'
        : 'heroNavy';

    const deltaClass =
      heroVariant === 'heroNavy'
        ? 'bg-[#CFE8E1] text-[#002941]'
        : heroVariant === 'heroMint'
        ? 'bg-[#CFE8E1] text-[#103530]'
        : 'bg-white/20 text-white backdrop-blur-sm';

    return (
      <Card
        variant={heroVariant}
        padding="md"
        onClick={onClick}
        className={`flex flex-col justify-between min-h-[148px] ${className}`}
      >
        <div className="flex items-start justify-between">
          <span className="text-xs sm:text-sm font-medium text-white/90">{title}</span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
            {icon}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            {value}
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${deltaClass}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{changeText}</span>
          </div>
        </div>
      </Card>
    );
  }

  const isCoral = accent === 'coral' || (trend === 'down' && accent !== 'mint');
  const isMint = accent === 'mint';

  const cardVariant = isCoral ? 'subtleCoral' : isMint ? 'subtleMint' : 'default';

  const iconStyles = isCoral
    ? 'bg-[#FD6E6E] text-white shadow-xs'
    : isMint
    ? 'bg-[#CFE8E1] text-[#002941] shadow-xs'
    : accent === 'navy'
    ? 'bg-[#002941] text-white shadow-xs'
    : 'bg-[#F0F5F9] border border-[#DFECF3] text-[#002941]';

  const badgeStyles = isCoral
    ? 'bg-white text-[#FD6E6E] border border-[#FFD0CC] font-bold shadow-2xs'
    : isMint
    ? 'bg-white text-[#184E46] border border-[#CFE8E1] font-bold shadow-2xs'
    : 'bg-[#E4F4F0] text-[#184E46]';

  return (
    <Card
      variant={cardVariant}
      padding="md"
      onClick={onClick}
      className={`flex flex-col justify-between min-h-[148px] ${
        isCoral
          ? 'hover:border-[#FD6E6E]/60'
          : isMint
          ? 'hover:border-[#74BFB0]'
          : 'hover:border-[#BDD7E7]'
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`text-xs sm:text-sm font-medium ${
            isCoral ? 'text-[#871919]' : isMint ? 'text-[#184E46]' : 'text-[#566E7F]'
          }`}
        >
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconStyles}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#002941] tabular-nums">
          {value}
        </div>
        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs ${badgeStyles}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{changeText}</span>
        </div>
      </div>
    </Card>
  );
};

export default KpiMetricCard;

