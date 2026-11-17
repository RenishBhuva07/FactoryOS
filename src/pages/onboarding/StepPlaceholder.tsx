import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOnboarding } from "../../context";
import { StepTracker } from "./components/StepTracker";

interface StepConfig {
  title: string;
  subtitle: string;
  icon: string;
  nextStepName: string;
  nextPath: string;
  prevPath: string;
}

const STEP_CONFIGS: Record<number, StepConfig> = {
  2: {
    title: "Shifts & Working Hours",
    subtitle: "Define shift timings, lunch breaks, and weekly off days for automated attendance.",
    icon: "schedule",
    nextStepName: "Machinery Setup",
    nextPath: "/onboarding/step-3",
    prevPath: "/onboarding/step-1",
  },
  3: {
    title: "Machinery & Production Lines",
    subtitle: "Add your CNCs, VMCs, Lathes, or lines to track uptime, downtime, and OEE.",
    icon: "precision_manufacturing",
    nextStepName: "Team & Supervisors",
    nextPath: "/onboarding/step-4",
    prevPath: "/onboarding/step-2",
  },
  4: {
    title: "Team & Floor Supervisors",
    subtitle: "Invite your floor managers and assign department shift leads.",
    icon: "badge",
    nextStepName: "Launch Factory Pulse",
    nextPath: "/onboarding/step-1",
    prevPath: "/onboarding/step-3",
  },
};

export const StepPlaceholder: React.FC<{ stepNumber?: number }> = ({ stepNumber }) => {
  const params = useParams<{ stepId?: string }>();
  const navigate = useNavigate();
  const { setStep } = useOnboarding();

  const currentStepNum = stepNumber || (params.stepId ? parseInt(params.stepId.replace("step-", ""), 10) : 2);
  const config = STEP_CONFIGS[currentStepNum] || STEP_CONFIGS[2];

  React.useEffect(() => {
    setStep(currentStepNum);
  }, [currentStepNum, setStep]);

  return (
    <div>
      <StepTracker />

      <div className="bg-surface-container-lowest rounded-xl p-8 sm:p-12 shadow-sm border border-surface-container-high/40 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center mb-6 shadow-xs">
          <span className="material-symbols-outlined text-[36px] text-tertiary">
            {config.icon}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold mb-3">
          <span>Step {currentStepNum} of 4</span>
          <span>•</span>
          <span>Upcoming Module</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface mb-3">
          {config.title}
        </h2>
        <p className="text-sm text-on-surface-variant max-w-lg mx-auto mb-8 leading-relaxed">
          {config.subtitle}
        </p>

        <div className="p-4 rounded-xl bg-surface-container-low max-w-md mx-auto mb-8 border border-surface-container-high/40 text-left flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">info</span>
          <span className="text-xs text-on-surface">
            Step 1 Business Details are saved. Continue or return to edit factory profile.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={config.prevPath}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary text-sm font-bold transition-all text-center border border-surface-container-high/40"
          >
            ← Back
          </Link>
          <button
            type="button"
            onClick={() => navigate(config.nextPath)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to {config.nextStepName}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
