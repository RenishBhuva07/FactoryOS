import React from 'react';
import { PillButton } from '../../../components/common';

export interface SettingsHeaderProps {
  onDiscard?: () => void;
  onSave?: () => void;
  className?: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  onDiscard,
  onSave,
  className = '',
}) => {
  return (
    <header className={`space-y-3 shrink-0 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-[#566E7F] uppercase tracking-wider">
          System Administration
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
            Settings & Subscription
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-0.5 max-w-2xl">
            Manage your Apex Manufacturing plant parameters, review billing cycles, and configure security permissions with Rooted Warmth philosophy.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <PillButton
            variant="ghost"
            size="md"
            onClick={onDiscard}
          >
            Discard Changes
          </PillButton>
          <PillButton
            variant="primary"
            size="md"
            icon={<span className="material-symbols-outlined text-[18px]">save</span>}
            onClick={onSave}
          >
            Save Configurations
          </PillButton>
        </div>
      </div>
    </header>
  );
};
