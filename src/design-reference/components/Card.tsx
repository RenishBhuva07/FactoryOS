import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'subtleMint' | 'subtleCoral' | 'heroMint' | 'heroNavy' | 'heroCoral';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  }[padding];

  const variantStyles = {
    default: 'bg-white text-[#002941] border border-[#EBF1F5] shadow-[0_4px_20px_-2px_rgba(0,41,65,0.04),0_2px_6px_-1px_rgba(0,41,65,0.02)]',
    subtle: 'bg-[#F8FAFA] text-[#002941] border border-[#DFECF3]',
    subtleMint: 'bg-[#F4FAF8] text-[#002941] border border-[#CFE8E1] shadow-[0_4px_20px_-2px_rgba(45,133,118,0.06)]',
    subtleCoral: 'bg-[#FFF4F3] text-[#002941] border border-[#FFD0CC] shadow-[0_4px_20px_-2px_rgba(253,110,110,0.06)]',
    heroMint: 'bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576] text-white shadow-[0_10px_25px_-5px_rgba(45,133,118,0.25)]',
    heroNavy: 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-[0_10px_25px_-5px_rgba(0,41,65,0.3)]',
    heroCoral: 'bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-[0_10px_25px_-5px_rgba(253,110,110,0.35)]',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-200 ${paddingStyles} ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

