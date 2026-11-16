import React from 'react';

export interface BrandLogoProps {
  variant?: 'capsule' | 'iconOnly' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  brandName?: string;
  tagline?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'capsule',
  size = 'md',
  brandName = 'FactoryOS',
  tagline = 'SMART MANUFACTURING',
  icon = 'factory',
  className = '',
  onClick,
}) => {
  const iconBoxSizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 rounded-xl',
    lg: 'w-9 h-9 rounded-xl',
  }[size];

  const glyphSizeClasses = {
    sm: 'text-[16px]',
    md: 'text-[19px]',
    lg: 'text-[20px]',
  }[size];

  const titleSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  if (variant === 'iconOnly') {
    return (
      <div
        onClick={onClick}
        className={`w-12 h-12 rounded-2xl bg-white border border-[#DFECF3] shadow-xs flex items-center justify-center transition-all select-none hover:border-[#BDD7E7] group ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title={`${brandName} - ${tagline}`}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-[19px]">{icon}</span>
        </div>
      </div>
    );
  }

  if (variant === 'plain') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2.5 select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title={`${brandName} - ${tagline}`}
      >
        <div
          className={`${iconBoxSizeClasses} bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}
        >
          <span className={`material-symbols-outlined ${glyphSizeClasses}`}>{icon}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`${titleSizeClasses} font-bold tracking-tight text-[#002941] truncate leading-tight`}>
            {brandName}
          </span>
          {tagline && (
            <span className="text-[9px] font-semibold text-[#566E7F] tracking-wider uppercase truncate leading-tight font-sans">
              {tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 bg-white border border-[#DFECF3] rounded-2xl py-1.5 px-2.5 shadow-xs hover:border-[#BDD7E7] transition-all select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title={`${brandName} - ${tagline}`}
    >
      <div
        className={`${iconBoxSizeClasses} bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}
      >
        <span className={`material-symbols-outlined ${glyphSizeClasses}`}>{icon}</span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`${titleSizeClasses} font-bold tracking-tight text-[#002941] truncate leading-tight`}>
          {brandName}
        </span>
        {tagline && (
          <span className="text-[9px] font-semibold text-[#566E7F] tracking-wider uppercase truncate leading-tight font-sans">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
