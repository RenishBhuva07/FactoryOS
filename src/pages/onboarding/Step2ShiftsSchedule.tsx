import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context';
import { StepTracker } from './components/StepTracker';
import { ShiftScheduleCard } from './components/ShiftScheduleCard';
import { PillButton } from '../../components/common';
import type { DayOfWeek } from '../../types/onboarding';

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

export const Step2ShiftsSchedule: React.FC = () => {
  const {
    state,
    updateShiftConfig,
    updateShiftScheduleItem,
    toggleOperatingDay,
    saveDraft,
    goToNextStep,
    goToPreviousStep,
    setStep,
  } = useOnboarding();
  const navigate = useNavigate();
  const [saveToast, setSaveToast] = useState(false);

  React.useEffect(() => {
    setStep(2);
  }, [setStep]);

  const { shiftConfig, businessDetails } = state;

  const handleSaveDraft = () => {
    saveDraft();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    goToNextStep();
    navigate('/onboarding/step-3');
  };

  const handleBack = () => {
    goToPreviousStep();
    navigate('/onboarding/step-1');
  };

  const openDaysCount = shiftConfig.weeklyOperatingDays.length;
  const shiftCount = shiftConfig.shifts.length;
  const totalWeekHours = (openDaysCount * shiftConfig.standardShiftHours * shiftCount).toFixed(0);

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
              <span className="material-symbols-outlined text-[14px] text-[#2D8576]">domain</span>
              <span>{businessDetails.factoryName || 'Apex Engineering Works'}</span>
              <span className="text-[#8DA1AF]">&bull;</span>
              <span className="font-normal">GSTIN Verified</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#002941] tracking-tight leading-snug">
              Configure your daily shifts &amp; operating hours
            </h1>
            <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
              Production logs, machine runtime logs, and manager shift handovers will align
              automatically with these shift boundaries.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-[#F8FAFA] px-3.5 py-2 rounded-xl border border-[#DFECF3] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#2D8576]" />
            <span className="text-xs font-bold text-[#002941]">Factory Standard: Factories Act 1948</span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleNext}>
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#002941]">
              Daily Shift Model
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => updateShiftConfig({ shiftModel: 'single' })}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer ${
                  shiftConfig.shiftModel === 'single'
                    ? 'bg-[#F4FAF8] border-[#2D8576] shadow-xs ring-1 ring-[#2D8576]'
                    : 'bg-white hover:bg-[#F8FAFA] border-[#DFECF3]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F]">
                    Single Shift
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      shiftConfig.shiftModel === 'single'
                        ? 'bg-[#2D8576] text-white'
                        : 'border border-[#DFECF3]'
                    }`}
                  >
                    {shiftConfig.shiftModel === 'single' && (
                      <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#002941]">1 General Shift</div>
                <p className="text-[11px] text-[#566E7F] mt-0.5">
                  Typical 9 AM – 6 PM daytime assembly &amp; dispatch
                </p>
              </button>

              <button
                type="button"
                onClick={() => updateShiftConfig({ shiftModel: 'two_shifts' })}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer relative ${
                  shiftConfig.shiftModel === 'two_shifts'
                    ? 'bg-[#F4FAF8] border-[#2D8576] shadow-xs ring-1 ring-[#2D8576]'
                    : 'bg-white hover:bg-[#F8FAFA] border-[#DFECF3]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#184E46] bg-[#E4F4F0] px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      shiftConfig.shiftModel === 'two_shifts'
                        ? 'bg-[#2D8576] text-white'
                        : 'border border-[#DFECF3]'
                    }`}
                  >
                    {shiftConfig.shiftModel === 'two_shifts' && (
                      <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#002941]">2 Shifts (Day &amp; Night)</div>
                <p className="text-[11px] text-[#566E7F] mt-0.5">
                  16 Operating hours total with dedicated handovers
                </p>
              </button>

              <button
                type="button"
                onClick={() => updateShiftConfig({ shiftModel: 'continuous' })}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer ${
                  shiftConfig.shiftModel === 'continuous'
                    ? 'bg-[#F4FAF8] border-[#2D8576] shadow-xs ring-1 ring-[#2D8576]'
                    : 'bg-white hover:bg-[#F8FAFA] border-[#DFECF3]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#566E7F]">
                    Continuous
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      shiftConfig.shiftModel === 'continuous'
                        ? 'bg-[#2D8576] text-white'
                        : 'border border-[#DFECF3]'
                    }`}
                  >
                    {shiftConfig.shiftModel === 'continuous' && (
                      <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-bold text-[#002941]">3 Continuous Shifts</div>
                <p className="text-[11px] text-[#566E7F] mt-0.5">
                  24x7 Plant operations with 8-hour rotation schedule
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#002941]">
                  Shift Schedule &amp; Break Durations
                </label>
                <span className="px-2 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] text-[10px] font-bold tabular-nums">
                  {shiftCount} Shift{shiftCount > 1 ? 's' : ''} Configured
                </span>
              </div>
              <span className="text-xs text-[#566E7F] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">cached</span>
                <span>Automatic 8.5h factory cycle</span>
              </span>
            </div>

            <div className="space-y-3">
              {shiftConfig.shifts.map((shift) => (
                <ShiftScheduleCard
                  key={shift.id}
                  shift={shift}
                  onUpdate={(updates) => updateShiftScheduleItem(shift.id, updates)}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#F8FAFA] p-4 rounded-2xl border border-[#DFECF3]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#002941] block">
                  Weekly Operating Days
                </label>
                <span className="text-[11px] text-[#566E7F]">
                  Machines and attendance registers stay active on open days
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-bold self-start sm:self-auto tabular-nums">
                <span>{openDaysCount} Days Open</span>
                <span>&bull;</span>
                <span>{7 - openDaysCount > 0 ? `${7 - openDaysCount} Day Off` : 'Continuous 7D'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {DAYS.map((day) => {
                const isOpen = shiftConfig.weeklyOperatingDays.includes(day.key);
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => toggleOperatingDay(day.key)}
                    className={`flex-1 min-w-[48px] py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                      isOpen
                        ? 'bg-gradient-to-r from-[#002941] to-[#164E6E] text-white border-transparent shadow-2xs font-bold'
                        : 'bg-white hover:bg-[#F0F5F9] text-[#8DA1AF] border-[#DFECF3] font-medium'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{day.label}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-80 mt-0.5">
                      {isOpen ? 'Open' : 'Off'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#DFECF3] flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">more_time</span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#002941]">
                  Enable Overtime (OT) Recording for workers
                </h4>
                <p className="text-[11px] text-[#566E7F] mt-0.5 leading-relaxed">
                  Automatically flags overtime pay rates for labour exceeding standard 8 hrs/shift per local regulations
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateShiftConfig({ enableOvertime: !shiftConfig.enableOvertime })}
              className={`w-12 h-6.5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                shiftConfig.enableOvertime ? 'bg-[#2D8576]' : 'bg-[#DFECF3]'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white shadow-xs transition-transform ${
                  shiftConfig.enableOvertime ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#DFECF3]">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Business Details</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-xs font-bold text-[#566E7F] hover:text-[#002941] px-4 py-2 rounded-full hover:bg-[#F0F5F9] transition cursor-pointer hidden sm:inline-block"
              >
                Save as Draft
              </button>

              <PillButton
                type="submit"
                onClick={() => handleNext()}
                variant="primary"
                size="md"
                icon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                iconPosition="right"
              >
                Save &amp; Continue to Machinery
              </PillButton>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#DFECF3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[19px] text-[#2D8576]">speed</span>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#002941]">
              Daily Capacity Utilization Projection
            </div>
            <div className="text-[11px] text-[#566E7F] tabular-nums">
              Based on {shiftCount} daily {shiftConfig.standardShiftHours}h operational shift{shiftCount > 1 ? 's' : ''} across {openDaysCount} working days ({totalWeekHours} hrs/week)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#F8FAFA] px-3.5 py-1.5 rounded-full border border-[#DFECF3] self-start sm:self-auto">
          <span className="text-[11px] text-[#566E7F] font-semibold">Uptime Target:</span>
          <span className="text-xs font-bold text-[#2D8576] tabular-nums">
            {shiftConfig.dailyCapacityRunPercent}% Daily Run
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step2ShiftsSchedule;
