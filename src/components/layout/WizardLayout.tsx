import React from 'react';
import { Outlet } from 'react-router-dom';
import { WizardHeader } from './WizardHeader';
import { WizardFooter } from './WizardFooter';

export const WizardLayout: React.FC = () => {
  return (
    <div className="bg-[#F8FAFA] font-sans text-[#002941] min-h-screen flex flex-col antialiased">
      <WizardHeader />
      <main className="w-full pt-18 pb-8 bg-[#F8FAFA] flex-1 flex flex-col justify-start">
        <div className="relative w-full px-3.5 sm:px-6 lg:px-8 flex-1">
          <div className="max-w-4xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
};

export default WizardLayout;
