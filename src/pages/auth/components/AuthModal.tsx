import React, { useEffect } from 'react';
import { SegmentedPillNav } from '../../../components/common';
import type { NavItem } from '../../../components/common';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AUTH_TABS: NavItem[] = [
  { id: 'signin', label: 'Sign In to Factory' },
  { id: 'signup', label: 'Create Factory Account', badge: '14-Day Free' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onModeChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white rounded-[28px] sm:rounded-[32px] border border-[#DFECF3] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F0F5F9] hover:bg-[#DFECF3] text-[#002941] flex items-center justify-center absolute top-5 right-5 transition-colors cursor-pointer"
          title="Close modal"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="space-y-6">
          <div className="flex justify-center pt-1">
            <SegmentedPillNav
              items={AUTH_TABS}
              activeId={mode}
              onChange={(id) => onModeChange(id as 'signin' | 'signup')}
              variant="gray"
              className="w-full sm:w-auto justify-center"
            />
          </div>

          {mode === 'signin' ? (
            <SignInForm onSwitchToSignUp={() => onModeChange('signup')} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => onModeChange('signin')} />
          )}
        </div>
      </div>
    </div>
  );
};
