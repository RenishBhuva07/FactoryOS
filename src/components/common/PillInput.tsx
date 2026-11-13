import React from 'react';

export interface PillInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const PillInput: React.FC<PillInputProps> = ({
  value,
  onChange,
  leadingIcon,
  trailingIcon,
  placeholder = 'Search...',
  wrapperClassName = '',
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`relative inline-flex items-center w-full rounded-full bg-[#F0F5F9] border border-[#DFECF3] focus-within:border-[#002941] focus-within:bg-white transition-all duration-150 ${wrapperClassName}`}
    >
      {leadingIcon && (
        <span className="pl-3.5 pr-1 text-[#8DA1AF] flex items-center justify-center shrink-0">
          {leadingIcon}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full py-2 text-xs sm:text-sm text-[#002941] placeholder-[#8DA1AF] bg-transparent rounded-full focus:outline-none ${
          leadingIcon ? 'pl-1' : 'pl-4'
        } ${trailingIcon ? 'pr-1' : 'pr-4'} ${className}`}
        {...rest}
      />
      {trailingIcon && (
        <span className="pr-3 text-[#8DA1AF] flex items-center justify-center shrink-0">
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

export const PillSearch: React.FC<Omit<PillInputProps, 'leadingIcon'>> = (props) => {
  return (
    <PillInput
      leadingIcon={<span className="material-symbols-outlined text-[18px]">search</span>}
      {...props}
    />
  );
};

export default PillInput;

