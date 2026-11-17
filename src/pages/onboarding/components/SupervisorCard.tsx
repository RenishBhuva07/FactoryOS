import React, { useState } from 'react';
import type { OnboardingSupervisor } from '../../../types/onboarding';

interface SupervisorCardProps {
  supervisor: OnboardingSupervisor;
  factoryName?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onRemove?: (id: string) => void;
}

export const SupervisorCard: React.FC<SupervisorCardProps> = ({
  supervisor,
  factoryName = 'Apex Engineering Works',
  isSelected = false,
  onSelect,
  onRemove,
}) => {
  const [copied, setCopied] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`https://${supervisor.passlink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cleanMobile = supervisor.mobile.replace(/[^0-9]/g, '');
  const encodedInviteMessage = encodeURIComponent(
    `Namaste ${supervisor.name}, you have been invited to log daily shift production on FactoryOS for ${factoryName}. One-tap passlink: https://${supervisor.passlink}`
  );

  return (
    <div
      onClick={onSelect}
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition cursor-pointer ${
        isSelected
          ? 'bg-[#F4FAF8] border-[#2D8576] shadow-xs ring-1 ring-[#2D8576]'
          : 'bg-white hover:bg-[#F8FAFA] border-[#DFECF3] shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-2xs ${
            isSelected
              ? 'bg-[#2D8576] text-white'
              : 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white'
          }`}
        >
          {getInitials(supervisor.name)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-[#002941]">{supervisor.name}</h4>
            <span className="px-2 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-[10px] font-bold">
              {supervisor.shiftBadge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#566E7F] mt-0.5 flex-wrap">
            <span className="font-medium tabular-nums">{supervisor.mobile}</span>
            <span>&bull;</span>
            <span className="truncate">{supervisor.permissionsLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DFECF3]/70">
        <a
          href={`https://wa.me/${cleanMobile}?text=${encodedInviteMessage}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E4F4F0] hover:bg-[#CFE8E1] text-[#184E46] border border-[#CFE8E1] text-[11px] font-bold transition"
          title="Send Invite on WhatsApp"
        >
          <span className="material-symbols-outlined text-[13px] text-[#2D8576]">chat</span>
          <span>Send on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy Passlink"
          className="h-7 px-3 rounded-full bg-[#F0F5F9] hover:bg-[#DFECF3] text-[#002941] text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Link'}</span>
        </button>

        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(supervisor.id);
            }}
            title="Remove Supervisor"
            className="w-7 h-7 rounded-full text-[#8DA1AF] hover:text-[#D62727] hover:bg-[#FFE6E4] transition flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SupervisorCard;
