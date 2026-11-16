import React from 'react';

interface SupportContactGridProps {
  onRequestTicket: () => void;
}

export const SupportContactGrid: React.FC<SupportContactGridProps> = ({ onRequestTicket }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {/* WhatsApp Concierge Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#DFECF3] shadow-xs flex flex-col justify-between hover:border-[#2D8576] transition group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4F4F0] text-[#184E46] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#2D8576]">chat</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-[10px] font-bold">
              Instant (2 Mins)
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#002941] mb-1">WhatsApp MSME Concierge</h3>
          <p className="text-xs text-[#566E7F] leading-relaxed mb-3">
            Send machine photos or handwritten plant sheets—our dedicated specialist types and loads your equipment list.
          </p>
        </div>

        <div>
          <div className="text-xs font-bold text-[#002941] tabular-nums mb-3">
            +91 98250 12345
          </div>
          <a
            href="https://wa.me/919825012345?text=Hello%20FactoryOS%20team,%20I%20need%20help%20with%20my%20plant%20setup"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm transition"
          >
            <span>Open WhatsApp Chat</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Toll-Free MSME Helpline */}
      <div className="bg-white p-5 rounded-2xl border border-[#DFECF3] shadow-xs flex flex-col justify-between hover:border-[#BDD7E7] transition">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F0F5F9] text-[#002941] text-[10px] font-bold">
              Toll-Free
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#002941] mb-1">MSME Regulatory Helpline</h3>
          <p className="text-xs text-[#566E7F] leading-relaxed mb-3">
            Official compliance desk for Gujarat Labour Regulations, Factories Act 1948, and Udyam scheme registration.
          </p>
        </div>

        <div>
          <div className="text-xs font-bold text-[#002941] tabular-nums mb-3">
            1800 123 456 (9 AM – 7 PM IST)
          </div>
          <a
            href="tel:1800123456"
            className="w-full py-2.5 px-4 rounded-xl bg-[#F0F5F9] hover:bg-[#DFECF3] text-[#002941] text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <span>Call Helpline</span>
            <span className="material-symbols-outlined text-[15px]">call</span>
          </a>
        </div>
      </div>

      {/* Callback & Ticket Drawer Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#DFECF3] shadow-xs flex flex-col justify-between hover:border-[#FD6E6E] transition">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4F3] text-[#AB1B1B] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#FD6E6E]">support</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF4F3] text-[#871919] border border-[#FFD0CC] text-[10px] font-bold">
              15 Min Callback
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#002941] mb-1">Direct Engineering Support</h3>
          <p className="text-xs text-[#566E7F] leading-relaxed mb-3">
            Facing custom machine setups, PLC questions, or supervisor passlink issues? Request an immediate engineer callback.
          </p>
        </div>

        <div>
          <div className="text-xs font-bold text-[#566E7F] mb-3">
            GIDC Hubs: Ahmedabad &bull; Rajkot &bull; Vadodara
          </div>
          <button
            type="button"
            onClick={onRequestTicket}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#DFECF3] hover:border-[#002941] text-[#002941] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <span>Request Engineer Callback</span>
            <span className="material-symbols-outlined text-[15px]">edit_note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportContactGrid;
