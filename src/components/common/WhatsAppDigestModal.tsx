import React, { useState } from 'react';
import { useAuth, useOnboarding } from '../../context';

export interface WhatsAppDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppDigestModal: React.FC<WhatsAppDigestModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    'Apex Engineering Works';
  const proprietorName =
    user?.name || onboardingState.businessDetails.proprietorName || 'Rajesh Bhai Patel';
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const rawDigestText = `*🏭 ${factoryName} — Daily Plant Digest*
📅 *Date:* ${dateStr} | *Time:* 21:00 IST
👤 *Attention:* ${proprietorName}

*1. Production Summary*
• Output: 1,420 units / 1,500 target (94.6% achieved)
• Active Spindles: Line 01 (CNC) & Line 02 (VMC)
• Rejection / Scrap: 18 pcs (1.2% scrap rate - within normal limits)

*2. Shift Attendance*
• Present: 22 / 24 operators (91.7% floor coverage)
• Morning Shift A: 14 present
• Evening Shift B: 8 present (1 reliever deployed)

*3. Machinery & Downtime*
• Line Uptime: 96.4%
• Incident: M-04 VMC Spindle Lubrication (45 mins scheduled stoppage - resolved)

*4. Outbound Shipments*
• Consignments Cleared: 2 orders (Challan #DC-9021 & #DC-9022)
• Total Dispatched Value: ₹4,80,000

_Delivered automatically by FactoryOS. Tap to view live shopfloor telemetry: https://factoryos.in_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawDigestText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(rawDigestText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002941]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#DFECF3] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#DFECF3] bg-[#F8FAFA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">chat</span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                9:00 PM WhatsApp Shift Digest
              </h2>
              <p className="text-[11px] text-[#566E7F]">
                Automated night dispatch sent to proprietor WhatsApp
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 bg-[#EFEAE2] flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-[#DCF8C6] border border-[#C2E7A4] rounded-2xl p-4 shadow-sm text-xs text-[#111B21] space-y-2.5 font-sans leading-relaxed">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#BEDFAA]">
              <span className="font-bold text-[#075E54] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">factory</span>
                {factoryName}
              </span>
              <span className="text-[10px] text-[#54656F] font-semibold">Today, 21:00</span>
            </div>

            <p className="font-semibold text-[#128C7E]">
              Daily Shift Performance Dossier • {dateStr}
            </p>

            <div className="space-y-1.5 pt-0.5">
              <div className="flex justify-between items-center bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#BEDFAA]/60">
                <span className="font-medium text-[#3B4A54]">⚙️ Production Output</span>
                <span className="font-bold text-[#075E54] tabular-nums">1,420 / 1,500 pcs (94.6%)</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#BEDFAA]/60">
                <span className="font-medium text-[#3B4A54]">👥 Floor Attendance</span>
                <span className="font-bold text-[#002941] tabular-nums">22 / 24 present</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#BEDFAA]/60">
                <span className="font-medium text-[#3B4A54]">⚠️ Machine Stoppage</span>
                <span className="font-bold text-[#AB1B1B] tabular-nums">M-04 (45m PM service)</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#BEDFAA]/60">
                <span className="font-medium text-[#3B4A54]">📦 Gate Dispatches</span>
                <span className="font-bold text-[#184E46] tabular-nums">2 consignments (₹4.8L)</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#BEDFAA]/60">
                <span className="font-medium text-[#3B4A54]">🔍 Scrap Quality</span>
                <span className="font-bold text-[#002941] tabular-nums">18 pcs (1.2% normal)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-[#54656F]">
              <span>Verified by Shift A &amp; B Leads</span>
              <span className="flex items-center gap-0.5 text-[#53BDEB]">
                <span className="material-symbols-outlined text-[13px]">done_all</span>
                Read 21:02
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-[#DFECF3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full border border-[#DFECF3] text-xs font-bold text-[#002941] hover:bg-[#F0F5F9] transition flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Share to WhatsApp</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#566E7F] hover:text-[#002941]"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDigestModal;
