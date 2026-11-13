import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">
      {/* Top minimal header */}
      <header className="w-full py-4 px-6 lg:px-12 border-b border-surface-container-high/40 bg-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-base tracking-tight text-on-surface">
                FactoryOS
              </span>
              <span className="text-[11px] text-on-surface-variant leading-none">
                Indian MSME Manufacturing OS
              </span>
            </div>
          </div>

          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-xs font-semibold text-primary"
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span className="hidden sm:inline">MSME Helpline:</span>
            <span className="font-bold">+91 98250 12345</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Natural background organic glow */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <Outlet />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 px-6 border-t border-surface-container-high/40 bg-surface-container-low text-xs text-on-surface-variant text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2025 FactoryOS India. Tailored for Indian MSME Manufacturing Units.</span>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-on-surface transition-colors">
              Terms of Use
            </a>
            <span className="text-secondary">•</span>
            <span className="text-secondary font-medium">Udyam &amp; GST Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

