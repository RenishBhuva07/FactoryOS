import React from "react";

export const WizardFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low py-8 mt-12 border-t border-surface-container-high/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <div>© 2025 FactoryOS India. Tailored for Indian MSME Manufacturing Units.</div>
        <div className="flex items-center gap-4">
          <a className="hover:text-on-surface transition-colors" href="#privacy">
            Privacy Policy
          </a>
          <a className="hover:text-on-surface transition-colors" href="#terms">
            Terms of Use
          </a>
          <a
            className="hover:text-on-surface transition-colors flex items-center gap-1 text-primary font-semibold"
            href="tel:1800123456"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            <span>MSME Helpline</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

