import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useOnboarding } from '../../../context';
import { PillButton } from '../../../components/common';
import type { SignUpFormData } from '../../../types/auth';

export interface SignUpFormProps {
  onSwitchToSignIn?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { updateBusinessDetails } = useOnboarding();

  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: 'Rajesh Bhai Patel',
    phone: '98250 12345',
    email: 'rajesh@apexeng.in',
    password: '',
    agreedToTerms: true,
    receiveWhatsAppUpdates: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please enter your proprietor or director name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signUp(formData);
      updateBusinessDetails({
        proprietorName: formData.fullName,
      });
      navigate('/onboarding/step-1');
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#DFECF3] shadow-[0_10px_35px_-8px_rgba(0,41,65,0.08)] p-6 sm:p-8 space-y-6">
      <div className="p-1 bg-[#F0F5F9] border border-[#DFECF3] rounded-full flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={handleSwitch}
          className="text-[#566E7F] hover:text-[#002941] font-semibold text-xs py-2 px-4 rounded-full flex-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[15px] text-[#566E7F]">lock</span>
          <span>Sign In to Factory</span>
        </button>

        <button
          type="button"
          className="bg-[#002941] text-white shadow-xs font-bold text-xs py-2 px-4 rounded-full flex-1 flex items-center justify-center gap-1.5 transition-all select-none"
        >
          <span>Create Account</span>
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9.5px] font-bold shadow-2xs">
            14-Day Free
          </span>
        </button>
      </div>

      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-[#E4F4F0] border border-[#CFE8E1] text-[#2D8576] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <span className="material-symbols-outlined text-[20px]">verified</span>
        </div>
        <div>
          <h2 id="signup-title" className="text-xl sm:text-2xl font-bold text-[#002941] tracking-tight">
            Create factory account
          </h2>
          <p className="text-xs text-[#566E7F] mt-1 leading-relaxed">
            Start your 14-day free MSME trial. We will configure your machines and shifts next.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-[#FFF4F3] border border-[#FFD0CC] text-[#871919] text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
          <span className="material-symbols-outlined text-[18px] text-[#FD6E6E]">error</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signup-name">
            Proprietor / Managing Director Name
          </label>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#DFECF3] flex items-center justify-center text-[#566E7F] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
            <input
              id="signup-name"
              type="text"
              autoFocus
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Rajesh Bhai Patel"
              className="w-full bg-transparent text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-[#8DA1AF]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signup-phone">
            Mobile Number (For WhatsApp Reports)
          </label>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-[#DFECF3] text-xs font-bold text-[#002941] shrink-0 shadow-2xs">
              <span>🇮🇳</span>
              <span className="tabular-nums">+91</span>
            </div>
            <div className="w-px h-5 bg-[#DFECF3] shrink-0" />
            <input
              id="signup-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="98250 12345"
              className="w-full bg-transparent text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-[#8DA1AF] tabular-nums"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signup-email">
            Factory Work Email
          </label>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#DFECF3] flex items-center justify-center text-[#566E7F] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">mail</span>
            </div>
            <input
              id="signup-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rajesh@apexeng.in"
              className="w-full bg-transparent text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-[#8DA1AF]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signup-password">
            Set Security Password
          </label>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#DFECF3] flex items-center justify-center text-[#566E7F] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </div>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 6 characters"
              className="w-full bg-transparent text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-[#8DA1AF]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-7 h-7 rounded-lg hover:bg-[#F0F5F9] text-[#8DA1AF] hover:text-[#002941] flex items-center justify-center transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div
          onClick={() =>
            setFormData({ ...formData, receiveWhatsAppUpdates: !formData.receiveWhatsAppUpdates })
          }
          className="bg-[#F4FAF8] border border-[#CFE8E1] hover:border-[#2D8576] rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer transition select-none shadow-2xs"
        >
          <input
            id="whatsapp-updates"
            type="checkbox"
            checked={formData.receiveWhatsAppUpdates}
            onChange={(e) =>
              setFormData({ ...formData, receiveWhatsAppUpdates: e.target.checked })
            }
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded-[4px] text-[#2D8576] focus:ring-[#2D8576]/20 accent-[#2D8576] cursor-pointer mt-0.5"
          />
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#2D8576]">chat</span>
              <p className="text-xs font-bold text-[#184E46]">Send daily end-of-shift reports to WhatsApp</p>
            </div>
            <p className="text-[11px] text-[#20675C]">
              Receive verified shift output, scrap percentages, and open machine tickets at 9:00 PM daily.
            </p>
          </div>
        </div>

        <div className="bg-[#F8FAFA] hover:bg-[#F0F5F9] border border-[#DFECF3] rounded-xl p-3 flex items-center gap-3 cursor-pointer transition select-none text-xs text-[#566E7F]">
          <input
            id="agree-terms"
            type="checkbox"
            required
            checked={formData.agreedToTerms}
            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            className="w-4 h-4 rounded-[4px] text-[#002941] focus:ring-[#002941]/20 accent-[#002941] cursor-pointer"
          />
          <label htmlFor="agree-terms" className="cursor-pointer">
            I agree to FactoryOS{' '}
            <a href="#terms" className="text-[#002941] underline font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-[#002941] underline font-semibold">
              Privacy Policy
            </a>
          </label>
        </div>

        <div className="pt-2">
          <PillButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            icon={<span className="material-symbols-outlined text-[19px]">arrow_forward</span>}
            iconPosition="right"
            className="w-full h-12 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            {loading ? 'Creating Account...' : 'Create Factory Account & Setup'}
          </PillButton>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-[#566E7F]">
            Already registered?{' '}
            <button
              type="button"
              onClick={handleSwitch}
              className="text-[#002941] font-bold hover:underline cursor-pointer"
            >
              Sign In here
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
