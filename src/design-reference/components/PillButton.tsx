import React from 'react';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'mintGradient' | 'secondary' | 'coral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...rest
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white hover:from-[#0C3953] hover:to-[#002941] active:from-[#001827] active:to-[#0C3953] shadow-sm',
    accent:
      'bg-[#CFE8E1] text-[#002941] hover:bg-[#A8D7CC] active:bg-[#74BFB0] font-semibold shadow-sm',
    mintGradient:
      'bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] text-white hover:from-[#184E46] hover:to-[#2D8576] active:from-[#0B2522] active:to-[#184E46] font-semibold shadow-xs',
    secondary:
      'bg-[#F0F5F9] text-[#002941] hover:bg-[#DFECF3] active:bg-[#BDD7E7] font-medium',
    coral:
      'bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white hover:from-[#F04646] hover:to-[#FD6E6E] active:from-[#AB1B1B] active:to-[#871919] font-semibold shadow-sm',
    ghost:
      'bg-transparent text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] border border-[#DFECF3] font-medium',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};

export default PillButton;

