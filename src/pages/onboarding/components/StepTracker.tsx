import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const StepTracker: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const currentStep = path.includes('step-4')
    ? 4
    : path.includes('step-3')
    ? 3
    : path.includes('step-2')
    ? 2
    : 1;

  const steps = [
    { number: 1, title: 'Business Details', path: '/onboarding/step-1' },
    { number: 2, title: 'Shifts & Schedule', path: '/onboarding/step-2' },
    { number: 3, title: 'Machinery Catalog', path: '/onboarding/step-3' },
    { number: 4, title: 'Team & Supervisors', path: '/onboarding/step-4' },
  ];

  return (
    <nav aria-label="Onboarding Progress" className="mb-6">
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#DFECF3] shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          {steps.map((step) => {
            const isCurrent = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            const activeGradient =
              step.number === 2
                ? 'bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] text-white shadow-xs'
                : step.number === 4
                ? 'bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs'
                : 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs';

            return (
              <Link
                key={step.number}
                to={step.path}
                className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${
                  isCurrent
                    ? activeGradient
                    : isCompleted
                    ? 'bg-[#F4FAF8] border border-[#CFE8E1] hover:bg-[#E4F4F0] text-[#002941]'
                    : 'bg-[#F8FAFA] border border-[#EBF1F5] hover:bg-[#F0F5F9] text-[#566E7F]'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 tabular-nums transition-colors ${
                    isCurrent
                      ? 'bg-white text-[#002941] shadow-xs'
                      : isCompleted
                      ? 'bg-[#2D8576] text-white'
                      : 'bg-white border border-[#DFECF3] text-[#8DA1AF]'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                  ) : (
                    step.number
                  )}
                </div>
                <div className="min-w-0">
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-wider truncate ${
                      isCurrent
                        ? 'text-[#CFE8E1]'
                        : isCompleted
                        ? 'text-[#2D8576]'
                        : 'text-[#8DA1AF]'
                    }`}
                  >
                    {isCurrent ? 'Current Step' : isCompleted ? 'Completed' : 'Upcoming'}
                  </span>
                  <span
                    className={`block text-xs sm:text-[13px] font-bold truncate leading-tight ${
                      isCurrent
                        ? 'text-white'
                        : isCompleted
                        ? 'text-[#002941]'
                        : 'text-[#566E7F]'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default StepTracker;
