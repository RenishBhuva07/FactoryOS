import React from 'react';
import { Link } from 'react-router-dom';

export const WizardFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8FAFA] py-6 border-t border-[#DFECF3] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#566E7F]">
        <div className="flex items-center gap-2">
          <span>&copy; 2025 FactoryOS India.</span>
          <span className="hidden sm:inline text-[#8DA1AF]">&bull;</span>
          <span>Tailored for Indian MSME Manufacturing Units.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/help" className="hover:text-[#002941] transition font-medium">
            Help Center
          </Link>
          <a href="#privacy" className="hover:text-[#002941] transition font-medium">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-[#002941] transition font-medium">
            Terms of Use
          </a>
          <a
            href="tel:1800123456"
            className="hover:text-[#002941] transition flex items-center gap-1.5 text-[#184E46] font-bold bg-[#E4F4F0] px-2.5 py-1 rounded-full border border-[#CFE8E1]"
          >
            <span className="material-symbols-outlined text-[14px] text-[#2D8576]">call</span>
            <span>MSME Helpline: 1800 123 456</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default WizardFooter;
