import React from 'react';
import { SegmentedPillNav } from '../common';
import type { NavItem } from '../common';

export interface AppTopHeaderProps {
  tabs: NavItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  roleBadge?: string;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onInfoClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const AppTopHeader: React.FC<AppTopHeaderProps> = ({
  tabs,
  activeTab,
  onTabChange,
  brandName = 'FactoryOS',
  userName = 'Oripio Studio',
  userEmail = 'oripiostudio@gmail.com',
  roleBadge = 'ADMIN',
  onSearchClick,
  onNotificationsClick,
  onInfoClick,
  onProfileClick,
  className = '',
}) => {
  const userInitials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'OS';

  return (
    <header
      className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-4 py-3 bg-[#F8FAFA]/95 backdrop-blur-md shrink-0 sticky top-0 z-10 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[18px]">
              precision_manufacturing
            </span>
          </div>
          <span className="text-base tracking-wide bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] bg-clip-text text-transparent font-brand">
            {brandName}
          </span>
        </div>

        <div className="overflow-x-auto md:overflow-visible max-w-full py-2 px-3 -my-2 -mx-3 scrollbar-none">
          <SegmentedPillNav
            items={tabs}
            activeId={activeTab}
            onChange={onTabChange}
            variant="white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <div className="flex items-center gap-1 bg-white border border-[#DFECF3] rounded-full px-2 py-1 shadow-2xs">
          <button
            type="button"
            title="Search"
            onClick={onSearchClick}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
          <button
            type="button"
            title="Notifications"
            onClick={onNotificationsClick}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] ring-2 ring-white" />
          </button>
          <button
            type="button"
            title="Help & Info"
            onClick={onInfoClick}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">info</span>
          </button>
        </div>

        <div
          onClick={onProfileClick}
          className="flex items-center gap-2.5 bg-white border border-[#DFECF3] rounded-full pl-1.5 pr-3 py-1 shadow-2xs cursor-pointer hover:border-[#BDD7E7] transition"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(0,41,65,0.25)] text-xs font-bold tracking-tight">
              {userInitials}
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] ring-2 ring-white" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-[#002941] leading-tight">
                {userName}
              </p>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9px] font-bold tracking-wide shadow-xs">
                {roleBadge}
              </span>
            </div>
            <p className="text-[11px] text-[#8DA1AF] leading-tight truncate max-w-[130px]">
              {userEmail}
            </p>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
};
