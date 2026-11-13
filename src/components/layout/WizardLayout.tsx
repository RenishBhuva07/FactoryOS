import React from "react";
import { Outlet } from "react-router-dom";
import { WizardFooter } from "./WizardFooter";
import { WizardHeader } from "./WizardHeader";

export const WizardLayout: React.FC = () => {
  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      <WizardHeader />
      <main className="w-full pt-16 bg-background flex-1">
        <div className="relative w-full overflow-hidden pb-16 px-4 sm:px-6 lg:px-8">
          {/* Subtle natural glow accents */}
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto w-full pt-4 sm:pt-6">
            <Outlet />
          </div>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
};

