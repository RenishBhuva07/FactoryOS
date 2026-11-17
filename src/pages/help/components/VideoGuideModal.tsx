import React from 'react';
import type { VideoGuideItem } from '../../../types/support';

interface VideoGuideModalProps {
  guide: VideoGuideItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const GUIDE_STEPS: Record<string, string[]> = {
  'guide-1': [
    'Supervisor opens WhatsApp passlink on any Android or iOS browser.',
    'System automatically identifies shift boundary (Shift A / Shift B) and allocated machines.',
    '1-tap counter logging for produced parts and rejection reasons.',
    'Automatic offline local caching when factory cell signal fluctuates.',
  ],
  'guide-2': [
    'Export high-resolution asset QR PDF from Machinery & Equipment Catalog.',
    'Print on standard A4 self-adhesive vinyl or industrial thermal sticker paper.',
    'Affix QR code securely near machine emergency stop or operator console.',
    'Operators scan code with basic camera app—no native application download required.',
  ],
  'guide-3': [
    'Select rotational shift model (1 General, 2 Shifts, or 3 Continuous 24x7).',
    'Set standard 8.5-hour shift cycle including lunch and tea break windows.',
    'Enable Overtime (OT) toggle to automate Factories Act 1948 premium pay flags.',
    'Adjust weekly operating days to sync regional industrial holidays automatically.',
  ],
  'guide-4': [
    'Master owner credentials hold exclusive access to P&L, sales prices, and profit margins.',
    'Supervisors see strictly machine counters, hourly batch progress, and punch-in attendance.',
    'Client contracts and sales invoice documents remain 100% encrypted and hidden.',
    'Role isolation complies with Indian Factory Compliance norms and ISO audit trails.',
  ],
};

export const VideoGuideModal: React.FC<VideoGuideModalProps> = ({ guide, isOpen, onClose }) => {
  if (!isOpen || !guide) return null;

  const steps = GUIDE_STEPS[guide.id] || [
    'Access the relevant module from the left dock rail.',
    'Review key performance metrics and live shopfloor status.',
    'Apply adjustments or export shift reports with one tap.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 border border-[#DFECF3] shadow-lg animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#DFECF3] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#2D8576]">play_circle</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D8576]">
                {guide.category} &bull; {guide.duration}
              </span>
              <h3 className="text-sm font-bold text-[#002941]">{guide.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-[#8DA1AF] hover:text-[#002941] hover:bg-[#F0F5F9] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Player Placeholder Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] aspect-video flex flex-col items-center justify-center text-white p-6 shadow-xs mb-4">
          <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer transition transform hover:scale-105 mb-2">
            <span className="material-symbols-outlined text-[32px] text-[#CFE8E1] translate-x-0.5">
              play_arrow
            </span>
          </div>
          <p className="text-xs font-bold text-white tracking-wide">Interactive Video Walkthrough</p>
          <p className="text-[11px] text-[#CFE8E1]/80 mt-0.5">{guide.duration} &bull; HD 1080p MSME Guide</p>
        </div>

        {/* Key Process Steps */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#002941]">
            Standard Operating Checklist:
          </h4>
          <div className="space-y-1.5">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-xl bg-[#F8FAFA] border border-[#DFECF3] text-xs text-[#002941]"
              >
                <div className="w-4 h-4 rounded-full bg-[#E4F4F0] text-[#184E46] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#DFECF3]">
          <a
            href="https://wa.me/919825012345"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-[#2D8576] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">chat</span>
            <span>Ask Onboarding Concierge</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#002941] to-[#164E6E] text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGuideModal;
