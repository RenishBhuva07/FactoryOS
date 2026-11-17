import React from 'react';
import { useOnboarding } from '../../../context';

export const ValuePropsBanner: React.FC = () => {
  const { state } = useOnboarding();
  const ownerName = state.businessDetails.proprietorName || 'Rajesh Bhai';

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#DFECF3] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px] text-[#2D8576]">speed</span>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#002941]">Instant OEE Reports</div>
          <div className="text-[11px] text-[#566E7F] truncate">Calculated per machine &amp; job worker</div>
        </div>
      </div>

      <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#DFECF3] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px] text-[#002941]">fact_check</span>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#002941]">Scrap &amp; Rejection Audit</div>
          <div className="text-[11px] text-[#566E7F] truncate">Gujarat MSME quality benchmarks</div>
        </div>
      </div>

      <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-[#DFECF3] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FFF4F3] text-[#AB1B1B] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px] text-[#FD6E6E]">send_to_mobile</span>
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#002941]">Daily Night Digest</div>
          <div className="text-[11px] text-[#566E7F] truncate">
            Delivered direct to {ownerName}&apos;s phone
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuePropsBanner;
