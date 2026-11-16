import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useOnboarding } from '../../context';
import { BrandLogo } from '../common';

export const WizardHeader: React.FC = () => {
  const { user } = useAuth();
  const { state } = useOnboarding();
  const navigate = useNavigate();

  const userName = user?.name || state.businessDetails.proprietorName || 'Rajesh Bhai Patel';
  const plantName = state.businessDetails.factoryName || 'Apex Engineering Works';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#F8FAFA]/95 backdrop-blur-md border-b border-[#DFECF3]">
      <div className="h-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <Link to="/dashboard">
          <BrandLogo variant="capsule" size="md" />
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFECF3] hover:border-[#2D8576] hover:text-[#184E46] transition text-xs font-semibold text-[#002941] shadow-2xs"
            title="Chat with Onboarding Concierge"
          >
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
              support_agent
            </span>
            <span className="text-[#566E7F]">WhatsApp Concierge:</span>
            <span className="font-bold tabular-nums">+91 98250 12345</span>
          </a>

          <Link
            to="/help"
            className="w-9 h-9 rounded-full bg-white border border-[#DFECF3] text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition flex items-center justify-center shadow-2xs"
            title="Help & Support Desk"
          >
            <span className="material-symbols-outlined text-[19px]">help_outline</span>
          </Link>

          <div
            onClick={() => navigate('/dashboard')}
            title="Open Dashboard"
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
                <p className="text-xs font-bold text-[#002941] leading-tight truncate max-w-[120px]">
                  {userName}
                </p>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9px] font-bold tracking-wide shadow-xs">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#8DA1AF] leading-tight truncate max-w-[130px]">
                {plantName}
              </p>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WizardHeader;
