import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo, PillButton } from '../../../components/common';

export interface HeroNavBarProps {
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const HeroNavBar: React.FC<HeroNavBarProps> = ({ onOpenAuth }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (onOpenAuth) {
      onOpenAuth('signin');
    } else {
      navigate('/login');
    }
  };

  const handleSignUp = () => {
    if (onOpenAuth) {
      onOpenAuth('signup');
    } else {
      navigate('/signup');
    }
  };

  return (
    <header className="w-full py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 border-b border-[#DFECF3]/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        <BrandLogo variant="capsule" size="md" onClick={() => navigate('/')} />

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFECF3] hover:border-[#2D8576] hover:text-[#184E46] transition text-xs font-semibold text-[#002941] shadow-2xs"
            title="Chat with Onboarding Concierge"
          >
            <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
              support_agent
            </span>
            <span className="text-[#566E7F] hidden lg:inline">WhatsApp Concierge:</span>
            <span className="font-bold tabular-nums">+91 98250 12345</span>
          </a>

          <PillButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSignIn}
            className="text-xs font-bold shrink-0"
          >
            Sign In
          </PillButton>

          <PillButton
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSignUp}
            icon={<span className="material-symbols-outlined text-[15px]">arrow_forward</span>}
            iconPosition="right"
            className="text-xs font-bold shadow-xs shrink-0 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Create Factory Account</span>
            <span className="sm:hidden">Get Started</span>
          </PillButton>
        </div>
      </div>
    </header>
  );
};

export default HeroNavBar;
