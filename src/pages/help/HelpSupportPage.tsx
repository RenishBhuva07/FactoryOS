import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common';
import { SupportContactGrid } from './components/SupportContactGrid';
import { SupportTicketModal } from './components/SupportTicketModal';
import { FaqAccordion } from './components/FaqAccordion';
import { VideoGuidesSection } from './components/VideoGuidesSection';
import type { SupportCategory } from '../../types/support';

const CATEGORY_TABS: { id: SupportCategory; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'onboarding_shifts', label: 'Shifts & Schedules' },
  { id: 'mobile_workbench', label: 'Mobile Workbench' },
  { id: 'machinery_qr', label: 'Machinery & QR Codes' },
  { id: 'owner_privacy_security', label: 'Owner Privacy Shield' },
  { id: 'billing_gst', label: 'Billing & Compliance' },
];

export const HelpSupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SupportCategory>('all');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="flex-1 min-w-0 pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3.5 space-y-4 w-full flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#CFE8E1]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile-only brand header */}
      <div className="flex md:hidden items-center justify-between pb-1 shrink-0">
        <BrandLogo variant="plain" size="sm" onClick={() => navigate('/dashboard')} />
        <Link
          to="/dashboard"
          className="text-xs font-semibold text-[#566E7F] hover:text-[#002941] transition flex items-center gap-1 bg-white border border-[#DFECF3] rounded-full px-2.5 py-1 shadow-2xs"
        >
          <span className="material-symbols-outlined text-[15px]">arrow_back</span>
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#DFECF3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-[#566E7F] hover:text-[#002941] transition flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-xs text-[#8DA1AF]">&bull;</span>
            <span className="text-xs font-bold text-[#2D8576]">FactoryOS Support Hub</span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#002941] tracking-tight leading-snug">
            Help &amp; Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
            Instant assistance for plant setup, machine QR stickers, shift configurations, and supervisor WhatsApp invites.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="w-full sm:w-80 shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles, guides, FAQs..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F8FAFA] text-xs sm:text-sm font-semibold text-[#002941] border border-[#DFECF3] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#002941]/20 focus:border-[#002941]/40 transition shadow-2xs"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[19px] text-[#8DA1AF]">
              search
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#8DA1AF] hover:text-[#002941] text-[16px] cursor-pointer"
              >
                close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Support Concierge Cards */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#002941]">
            Direct Concierge &amp; Compliance Helplines
          </h2>
          <span className="text-xs text-[#566E7F]">Dedicated Indian MSME Manufacturing Desks</span>
        </div>
        <SupportContactGrid onRequestTicket={() => setIsTicketModalOpen(true)} />
      </section>

      {/* Video & Walkthrough Guides */}
      <section className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#002941]">
            Quick Video Walkthroughs
          </h2>
          <span className="text-xs text-[#2D8576] font-semibold">Under 3 Minutes Each</span>
        </div>
        <VideoGuidesSection />
      </section>

      {/* Topic Filter Pills & FAQ Accordion */}
      <section className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#002941]">
            Frequently Asked Questions
          </h2>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#002941] to-[#164E6E] text-white shadow-2xs'
                      : 'bg-white border border-[#DFECF3] text-[#566E7F] hover:text-[#002941] hover:bg-[#F8FAFA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <FaqAccordion searchQuery={searchQuery} categoryFilter={activeCategory} />
      </section>

      {/* Support Ticket Modal */}
      <SupportTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSubmitSuccess={showToast}
      />
    </div>
  );
};

export default HelpSupportPage;
