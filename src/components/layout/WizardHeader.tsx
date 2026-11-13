import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useOnboarding } from "../../context";

export const WizardHeader: React.FC = () => {
  const { user } = useAuth();
  const { state, saveDraft } = useOnboarding();
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    saveDraft();
    navigate("/signup");
  };

  const navItems = [
    { label: "Profile", step: 1, path: "/onboarding/step-1" },
    { label: "Production", step: 2, path: "/onboarding/step-2" },
    { label: "Machinery", step: 3, path: "/onboarding/step-3" },
    { label: "Workforce", step: 4, path: "/onboarding/step-4" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(46,50,48,0.05)] border-b border-surface-container-high/40">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-base tracking-tight text-on-surface">FactoryOS</span>
              <span className="text-xs text-on-surface-variant font-medium hidden sm:inline-block">/</span>
              <span className="text-xs font-semibold text-secondary hidden sm:inline-block">Factory Setup Wizard</span>
            </div>
            <span className="text-[11px] text-on-surface-variant leading-none sm:hidden">Setup Wizard</span>
          </div>
        </div>

        {/* Wizard progress pills & nav */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-tertiary">timer</span>
            <span>Step {state.currentStep} of 4</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = state.currentStep === item.step;
              return (
                <Link
                  key={item.step}
                  to={item.path}
                  className={`px-3 py-1.5 text-xs transition-colors rounded-lg font-semibold ${
                    isActive
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Support, exit & avatar */}
        <div className="flex items-center gap-3">
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-primary"
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span className="hidden lg:inline">WhatsApp Help:</span>
            <span className="font-bold">+91 98250 12345</span>
          </a>

          <button
            type="button"
            onClick={handleSaveAndExit}
            className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors hidden sm:inline-block px-2 py-1 cursor-pointer"
          >
            Save &amp; Exit
          </button>

          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary shadow-xs"
            title={user?.name || "Rajesh Bhai"}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
