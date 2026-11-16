import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context';
import { PillButton } from '../../../components/common';
import type { LoginFormData } from '../../../types/auth';

export interface SignInFormProps {
  onSwitchToSignUp?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '98250 12345',
    password: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier.trim()) {
      setError('Please enter your mobile number or work email');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await login(formData);
      navigate('/dashboard');
    } catch {
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#DFECF3] shadow-[0_10px_35px_-8px_rgba(0,41,65,0.08)] p-6 sm:p-8 space-y-6">
      <div className="p-1 bg-[#F0F5F9] border border-[#DFECF3] rounded-full flex items-center justify-between gap-1">
        <button
          type="button"
          className="bg-[#002941] text-white shadow-xs font-bold text-xs py-2 px-4 rounded-full flex-1 flex items-center justify-center gap-1.5 transition-all select-none"
        >
          <span className="material-symbols-outlined text-[15px] text-[#CFE8E1]">lock</span>
          <span>Sign In to Factory</span>
        </button>

        <button
          type="button"
          onClick={handleSwitch}
          className="text-[#566E7F] hover:text-[#002941] font-semibold text-xs py-2 px-4 rounded-full flex-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
        >
          <span>Create Account</span>
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9.5px] font-bold shadow-2xs">
            14-Day Free
          </span>
        </button>
      </div>

      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-[#E4F4F0] border border-[#CFE8E1] text-[#2D8576] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <span className="material-symbols-outlined text-[20px]">vpn_key</span>
        </div>
        <div>
          <h2 id="signin-title" className="text-xl sm:text-2xl font-bold text-[#002941] tracking-tight">
            Sign in to your factory
          </h2>
          <p className="text-xs text-[#566E7F] mt-1 leading-relaxed">
            Enter your registered mobile number or work email to access your shopfloor command center.
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
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signin-identifier">
            Mobile Number or Work Email
          </label>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#DFECF3] flex items-center justify-center text-[#566E7F] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
            </div>
            <input
              id="signin-identifier"
              type="text"
              autoFocus
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              placeholder="e.g. 98250 12345 or rajesh@apexeng.in"
              className="w-full bg-transparent text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-[#8DA1AF]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#002941]" htmlFor="signin-password">
              Password
            </label>
            <a href="#forgot" className="text-xs text-[#2D8576] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative flex items-center h-12 bg-[#F8FAFA] hover:bg-[#F0F5F9] focus-within:bg-white border border-[#DFECF3] focus-within:border-[#002941] focus-within:ring-2 focus-within:ring-[#002941]/10 rounded-2xl transition-all shadow-2xs px-3.5 gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#DFECF3] flex items-center justify-center text-[#566E7F] shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </div>
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your security password"
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

        <div className="bg-[#F8FAFA] hover:bg-[#F0F5F9] border border-[#DFECF3] hover:border-[#BDD7E7] rounded-xl p-3 flex items-center gap-3 cursor-pointer transition select-none">
          <input
            id="remember-device"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            className="w-4 h-4 rounded-[4px] text-[#002941] focus:ring-[#002941]/20 accent-[#002941] cursor-pointer"
          />
          <label htmlFor="remember-device" className="text-xs text-[#002941] font-medium cursor-pointer">
            Remember this device for 30 days
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
            {loading ? 'Signing In...' : 'Sign In to FactoryOS'}
          </PillButton>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-[#566E7F]">
            New to FactoryOS?{' '}
            <button
              type="button"
              onClick={handleSwitch}
              className="text-[#002941] font-bold hover:underline cursor-pointer"
            >
              Create factory account
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
