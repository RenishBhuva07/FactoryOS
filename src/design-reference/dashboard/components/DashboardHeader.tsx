import React from 'react';
import { SegmentedPillNav } from '../../components';

export interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  className?: string;
}

const NAV_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'manage', label: 'Manage' },
  { id: 'program', label: 'Program' },
  { id: 'account', label: 'Account' },
  { id: 'reports', label: 'Reports' },
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onTabChange,
  brandName = 'FactoryOS',
  userName = 'Oripio Studio',
  userEmail = 'oripiostudio@gmail.com',
  className = '',
}) => {
  return (
    <header className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-4 py-3 bg-[#F8FAFA]/95 backdrop-blur-md shrink-0 sticky top-0 z-10 ${className}`}>
      <div className="flex items-center gap-3">
        {/* Mobile-only brand logo */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-[#CFE8E1] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
          </div>
          <span className="text-base font-bold tracking-tight bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] bg-clip-text text-transparent font-sans">
            {brandName}
          </span>
        </div>

        {/* Segmented Pill Navigation */}
        <div className="overflow-x-auto max-w-full py-0.5">
          <SegmentedPillNav
            items={NAV_TABS}
            activeId={activeTab}
            onChange={onTabChange}
            variant="white"
          />
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1 bg-white border border-[#DFECF3] rounded-full px-2 py-1 shadow-sm">
          <button
            title="Search"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
          <button
            title="Notifications"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] ring-2 ring-white" />
          </button>
          <button
            title="Information"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[19px]">info</span>
          </button>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 bg-white border border-[#DFECF3] rounded-full pl-1.5 pr-3 py-1 shadow-sm cursor-pointer hover:border-[#BDD7E7] transition">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(0,41,65,0.25)] text-xs font-bold tracking-tight">
              {userName
                ? userName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : 'OS'}
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] ring-2 ring-white" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-[#002941] leading-tight">{userName}</p>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9px] font-bold tracking-wide shadow-xs">
                ADMIN
              </span>
            </div>
            <p className="text-[11px] text-[#8DA1AF] leading-tight truncate max-w-[130px]">{userEmail}</p>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">expand_more</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

