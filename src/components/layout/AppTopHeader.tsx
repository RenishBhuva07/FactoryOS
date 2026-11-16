import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SegmentedPillNav, BrandLogo } from '../common';
import type { NavItem } from '../common';
import { useAuth, useOnboarding, useLayout } from '../../context';

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
  userName,
  userEmail,
  roleBadge = 'ADMIN',
  onSearchClick,
  onNotificationsClick,
  onInfoClick,
  onProfileClick,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const { toggleMobileMenu, toggleSearch, toggleNotifications, toggleWhatsAppDigest } = useLayout();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const effectiveUserName =
    userName ||
    user?.name ||
    onboardingState.businessDetails.proprietorName ||
    'Rajesh Bhai Patel';
  const effectiveUserEmail =
    userEmail ||
    user?.email ||
    'rajesh@apexeng.in';
  const effectiveFactoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    'Apex Engineering Works';

  const userInitials = effectiveUserName
    ? effectiveUserName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'RP';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      setIsProfileMenuOpen((prev) => !prev);
    }
  };

  const handleSignOut = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-4 py-3 bg-[#F8FAFA]/95 backdrop-blur-md shrink-0 sticky top-0 z-30 ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleMobileMenu}
          title="Open Navigation"
          className="w-9 h-9 rounded-full md:hidden flex items-center justify-center text-[#002941] hover:bg-white border border-[#DFECF3] shadow-2xs transition shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-[21px]">menu</span>
        </button>

        <div className="flex md:hidden items-center shrink-0">
          <BrandLogo variant="plain" size="sm" brandName={brandName} onClick={() => navigate('/dashboard')} />
        </div>

        <div className="overflow-x-auto md:overflow-visible max-w-full py-2 px-2 sm:px-3 -my-2 -mx-2 sm:-mx-3 scrollbar-none">
          <SegmentedPillNav
            items={tabs}
            activeId={activeTab}
            onChange={onTabChange}
            variant="white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <div className="flex items-center gap-1 bg-white border border-[#DFECF3] rounded-full px-1.5 sm:px-2 py-1 shadow-2xs">
          <button
            type="button"
            title="Search (Cmd+K)"
            onClick={onSearchClick || toggleSearch}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>
          <button
            type="button"
            title="Notifications"
            onClick={onNotificationsClick || toggleNotifications}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#FD6E6E] to-[#AB1B1B] ring-2 ring-white" />
          </button>
          <button
            type="button"
            title="Help & Support Desk"
            onClick={onInfoClick || (() => navigate('/help'))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[19px]">info</span>
          </button>
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <div
            onClick={handleProfileClick}
            className="flex items-center gap-2 sm:gap-2.5 bg-white border border-[#DFECF3] rounded-full pl-1.5 pr-2.5 sm:pr-3 py-1 shadow-2xs cursor-pointer hover:border-[#BDD7E7] transition active:scale-95 select-none"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-center shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(0,41,65,0.25)] text-xs font-bold tracking-tight">
                {userInitials}
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2D8576] ring-2 ring-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-[#002941] leading-tight max-w-[120px] truncate">
                  {effectiveUserName}
                </p>
                <span className="px-1.5 py-0.2 rounded-full bg-[#CFE8E1] text-[#184E46] text-[8.5px] font-bold tracking-wide">
                  {roleBadge}
                </span>
              </div>
              <p className="text-[10.5px] text-[#8DA1AF] leading-tight truncate max-w-[120px]">
                {effectiveFactoryName}
              </p>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">
              expand_more
            </span>
          </div>

          {/* Profile Dropdown Popover */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#DFECF3] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-[#F8FAFA] rounded-xl border border-[#DFECF3]/70 mb-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#002941]">{effectiveUserName}</p>
                  <span className="px-2 py-0.5 rounded-full bg-[#002941] text-white text-[9px] font-bold">
                    OWNER
                  </span>
                </div>
                <p className="text-[11px] text-[#566E7F] mt-0.5 truncate">{effectiveFactoryName}</p>
                <p className="text-[10px] text-[#8DA1AF] truncate">{effectiveUserEmail}</p>
              </div>

              <div className="space-y-0.5 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/workbench');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#002941] hover:bg-[#E4F4F0] hover:text-[#184E46] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#2D8576]">
                      smartphone
                    </span>
                    <span>Supervisor Workbench</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#CFE8E1] text-[#184E46]">
                    60s PWA
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    toggleWhatsAppDigest();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#002941] hover:bg-[#F0F5F9] transition"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#128C7E]">
                    chat
                  </span>
                  <span>9:00 PM Shift Digest</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#002941] hover:bg-[#F0F5F9] transition"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#566E7F]">
                    settings
                  </span>
                  <span>Factory Parameters &amp; Plan</span>
                </button>
              </div>

              <div className="pt-1.5 mt-1 border-t border-[#DFECF3]">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#AB1B1B] hover:bg-[#FD6E6E]/10 transition"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppTopHeader;
