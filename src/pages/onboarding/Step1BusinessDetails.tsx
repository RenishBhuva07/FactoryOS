import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context';
import { CategorySelector } from './components/CategorySelector';
import { StepTracker } from './components/StepTracker';
import { WorkforceSelector } from './components/WorkforceSelector';
import { PillButton } from '../../components/common';

const getHubTag = (location: string): string => {
  if (location.includes('Vadodara')) return 'VADODARA HUB';
  if (location.includes('Rajkot')) return 'RAJKOT HUB';
  if (location.includes('Surat')) return 'SURAT HUB';
  return 'AHMEDABAD HUB';
};

export const Step1BusinessDetails: React.FC = () => {
  const { state, updateBusinessDetails, setWorkforceBand, saveDraft, goToNextStep, setStep } =
    useOnboarding();
  const navigate = useNavigate();
  const [saveToast, setSaveToast] = useState(false);

  const { businessDetails } = state;

  React.useEffect(() => {
    setStep(1);
  }, [setStep]);

  const handleSaveDraft = () => {
    saveDraft();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    goToNextStep();
    navigate('/onboarding/step-2');
  };

  const cleanGstin = businessDetails.gstin.trim();
  const isGstEmpty = cleanGstin.length === 0;
  const isGstValid = cleanGstin.length === 15;
  const hubTag = getHubTag(businessDetails.factoryLocation);

  return (
    <div>
      <StepTracker />

      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xs relative border border-[#DFECF3]">
        {saveToast && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-all animate-bounce z-10">
            <span className="material-symbols-outlined text-[15px] text-[#CFE8E1]">check_circle</span>
            <span>Draft saved to workspace</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-5 border-b border-[#DFECF3]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-[14px] text-[#2D8576]">factory</span>
              <span>Factory Setup Profile</span>
              <span className="text-[#8DA1AF]">&bull;</span>
              <span className="font-normal">Gujarat Industrial Area</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#002941] tracking-tight leading-snug">
              Tell us about your factory
            </h1>
            <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
              We configure your shopfloor job cards, machine counters, shift registers, and daily
              production reports based on these details. Takes less than 2 minutes.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2.5 bg-[#F8FAFA] px-3.5 py-2.5 rounded-xl border border-[#DFECF3] self-start sm:self-auto">
            <span className="material-symbols-outlined text-[#2D8576] text-2xl">verified_user</span>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-[#566E7F] font-bold">
                MSME Compliance
              </div>
              <div className="text-xs font-bold text-[#002941]">Udyam Ready Format</div>
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleContinue}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#002941] flex items-center justify-between"
                htmlFor="factoryName"
              >
                <span>Factory / Business Legal Name</span>
                <span className="text-[11px] text-[#2D8576] font-semibold lowercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  verified by GST
                </span>
              </label>
              <div className="relative">
                <input
                  id="factoryName"
                  type="text"
                  required
                  value={businessDetails.factoryName}
                  onChange={(e) => updateBusinessDetails({ factoryName: e.target.value })}
                  placeholder="e.g. Apex Engineering Works"
                  className="w-full h-11 px-3.5 pl-10 rounded-xl bg-[#F8FAFA] text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 transition border border-[#DFECF3]"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#8DA1AF]">
                  storefront
                </span>
              </div>
              <span className="text-[11px] text-[#8DA1AF]">
                Printed on delivery challans and batch job cards
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#002941]"
                htmlFor="proprietorName"
              >
                Proprietor / Managing Director Name
              </label>
              <div className="relative">
                <input
                  id="proprietorName"
                  type="text"
                  required
                  value={businessDetails.proprietorName}
                  onChange={(e) => updateBusinessDetails({ proprietorName: e.target.value })}
                  placeholder="e.g. Rajesh Bhai Patel"
                  className="w-full h-11 px-3.5 pl-10 rounded-xl bg-[#F8FAFA] text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 transition border border-[#DFECF3]"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#8DA1AF]">
                  person
                </span>
              </div>
              <span className="text-[11px] text-[#8DA1AF]">
                Receives executive daily WhatsApp shift rollups
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#002941]"
                htmlFor="factoryLocation"
              >
                Factory Location / Industrial Zone (GIDC)
              </label>
              <span className="px-2 py-0.5 rounded-full bg-[#F0F5F9] text-[#002941] text-[10px] font-bold tracking-wider">
                {hubTag}
              </span>
            </div>
            <div className="relative">
              <select
                id="factoryLocation"
                value={businessDetails.factoryLocation}
                onChange={(e) => updateBusinessDetails({ factoryLocation: e.target.value })}
                className="w-full h-11 px-3.5 pl-10 pr-9 rounded-xl bg-[#F8FAFA] text-[#002941] text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 transition border border-[#DFECF3] appearance-none"
              >
                <option value="GIDC Naroda / Phase II, Ahmedabad, Gujarat">
                  GIDC Naroda / Phase II, Ahmedabad, Gujarat
                </option>
                <option value="GIDC Vatva, Ahmedabad, Gujarat">
                  GIDC Vatva, Ahmedabad, Gujarat
                </option>
                <option value="GIDC Makarpura, Vadodara, Gujarat">
                  GIDC Makarpura, Vadodara, Gujarat
                </option>
                <option value="GIDC Metoda, Rajkot, Gujarat">
                  GIDC Metoda, Rajkot, Gujarat
                </option>
                <option value="GIDC Sachin, Surat, Gujarat">
                  GIDC Sachin, Surat, Gujarat
                </option>
              </select>
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#8DA1AF]">
                location_on
              </span>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-[#8DA1AF] pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="text-[11px] text-[#566E7F] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D8576]" />
              <span>Automatic regional holiday calendar synced with Gujarat Labour Regulations.</span>
            </span>
          </div>

          <CategorySelector
            selectedCategory={businessDetails.mfgCategory}
            onChange={(cat) => updateBusinessDetails({ mfgCategory: cat })}
          />

          <WorkforceSelector
            selectedBand={businessDetails.workforceBand}
            workerCount={businessDetails.workforceCount}
            onSelectBand={(band) => setWorkforceBand(band)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold uppercase tracking-wider text-[#002941] flex items-center justify-between"
                htmlFor="gstin"
              >
                <span>GSTIN / Udyam Registration (Optional)</span>
                <span className="text-[10px] text-[#566E7F] font-bold">MSME TAX CREDIT</span>
              </label>
              <div className="relative">
                <input
                  id="gstin"
                  type="text"
                  value={businessDetails.gstin}
                  onChange={(e) => updateBusinessDetails({ gstin: e.target.value.toUpperCase() })}
                  placeholder="e.g. 24AAACA1234A1Z5"
                  maxLength={15}
                  className="w-full h-11 px-3.5 pl-10 pr-9 rounded-xl bg-[#F8FAFA] text-[#002941] text-xs sm:text-sm font-semibold font-mono tracking-wider focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 transition border border-[#DFECF3]"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#8DA1AF]">
                  badge
                </span>
                {isGstValid ? (
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-[#2D8576]">
                    check_circle
                  </span>
                ) : !isGstEmpty ? (
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-[#FD6E6E]">
                    error
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[11px] font-medium flex items-center gap-1 ${
                  isGstValid
                    ? 'text-[#2D8576]'
                    : isGstEmpty
                    ? 'text-[#8DA1AF]'
                    : 'text-[#AB1B1B]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isGstValid ? 'verified' : isGstEmpty ? 'info' : 'warning'}
                </span>
                <span>
                  {isGstValid
                    ? 'Gujarat State GST Registered (Code 24)'
                    : isGstEmpty
                    ? 'Optional: Can be added later from Settings'
                    : 'Enter complete 15-character GSTIN (e.g. 24AAACA1234A1Z5)'}
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#002941]">
                Default Currency &amp; Indian Timezone
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-11 px-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center gap-2 text-xs font-bold text-[#002941]">
                  <span className="text-sm font-mono text-[#8DA1AF]">₹</span>
                  <span className="truncate">INR (Indian Rupee)</span>
                </div>
                <div className="h-11 px-3.5 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] flex items-center gap-2 text-xs font-bold text-[#002941]">
                  <span className="material-symbols-outlined text-[16px] text-[#8DA1AF]">schedule</span>
                  <span className="truncate">Asia/Kolkata (IST)</span>
                </div>
              </div>
              <span className="text-[11px] text-[#8DA1AF]">
                Calibrated for standard Indian financial year (April - March)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4FAF8] border border-[#CFE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#2D8576] text-[20px]">
                support_agent
              </span>
              <div>
                <span className="text-xs font-bold text-[#002941] block">Need help filling this?</span>
                <span className="text-[11px] text-[#566E7F]">
                  Tap WhatsApp support or our dedicated onboarding specialist will set it up for you.
                </span>
              </div>
            </div>
            <a
              href="https://wa.me/919825012345"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#CFE8E1] hover:border-[#2D8576] text-xs font-bold text-[#184E46] shadow-2xs self-start sm:self-auto transition"
            >
              <span className="material-symbols-outlined text-[15px] text-[#2D8576]">chat</span>
              <span>WhatsApp Help</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#DFECF3]">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer"
            >
              Save draft
            </button>

            <PillButton
              type="submit"
              onClick={() => handleContinue()}
              variant="primary"
              size="md"
              icon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              iconPosition="right"
            >
              Continue to Shift Setup
            </PillButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1BusinessDetails;
