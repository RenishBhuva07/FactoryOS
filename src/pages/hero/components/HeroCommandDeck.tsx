import React, { useState } from 'react';

export interface HeroCommandDeckProps {
  activeTab?: 'shopfloor' | 'oee' | 'whatsapp';
  onTabChange?: (tab: 'shopfloor' | 'oee' | 'whatsapp') => void;
}

export const HeroCommandDeck: React.FC<HeroCommandDeckProps> = ({
  activeTab: controlledTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<'shopfloor' | 'oee' | 'whatsapp'>('shopfloor');
  const activeTab = controlledTab ?? internalTab;

  const [activeShift, setActiveShift] = useState<'shiftA' | 'shiftB'>('shiftA');
  const [selectedMachine, setSelectedMachine] = useState<'vmc' | 'cnc' | 'hyd'>('vmc');
  const [copiedDigest, setCopiedDigest] = useState(false);

  const handleTabSelect = (tab: 'shopfloor' | 'oee' | 'whatsapp') => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const handleCopyDigest = () => {
    const text = `*FactoryOS 9:00 PM Night Shift Digest*\nApex Engineering Works (Naroda GIDC)\nDate: Today • Day Shift\n\n- Daily Target: 1,800 pcs\n- Produced: 1,942 pcs (108%)\n- Fleet OEE: 92.4%\n- Scrap Rate: 0.8% (Benchmark < 2.0%)\n- Shift Supervisor: Ketan Bhai (Signed Off)\n- Dispatch Readiness: PO-9412 Ready for Gate Pass\n\nProtected by FactoryOS India`;
    navigator.clipboard.writeText(text);
    setCopiedDigest(true);
    setTimeout(() => setCopiedDigest(false), 2500);
  };

  return (
    <div
      id="command-deck"
      className="w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-white/95 to-[#F8FAFA]/95 border border-[#DFECF3] shadow-[0_20px_50px_-10px_rgba(0,41,65,0.12),0_8px_24px_-4px_rgba(0,41,65,0.06)] p-4 sm:p-7 relative overflow-hidden backdrop-blur-xl scroll-mt-24 text-left"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#CFE8E1]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#FFD0CC]/30 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-[#DFECF3] relative z-10">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4F4F0] border border-[#CFE8E1]">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D8576] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D8576]" />
            </span>
            <span className="text-xs font-bold text-[#184E46]">
              Shopfloor Command Active • 16 Machines Linked
            </span>
          </div>
          <span className="text-xs text-[#566E7F] hidden sm:inline">Naroda GIDC Hub</span>
        </div>

        <div className="flex items-center p-1 rounded-full bg-[#F0F5F9] border border-[#DFECF3] shadow-2xs self-center lg:self-auto">
          <button
            type="button"
            onClick={() => handleTabSelect('shopfloor')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === 'shopfloor'
                ? 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs'
                : 'text-[#566E7F] hover:text-[#002941]'
            }`}
          >
            Live Shopfloor
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('oee')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === 'oee'
                ? 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs'
                : 'text-[#566E7F] hover:text-[#002941]'
            }`}
          >
            Machine OEE &amp; Telemetry
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('whatsapp')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
              activeTab === 'whatsapp'
                ? 'bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-xs'
                : 'text-[#566E7F] hover:text-[#002941]'
            }`}
          >
            <span>WhatsApp Digest</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#CFE8E1] text-[#002941] font-bold">
              9 PM
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#566E7F]">
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">schedule</span>
          <span>Day Shift 1 • Handover in 42 mins</span>
        </div>
      </div>

      {activeTab === 'shopfloor' && (
        <div className="pt-6 space-y-4 relative z-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div
              onClick={() => setSelectedMachine('vmc')}
              className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer space-y-3 ${
                selectedMachine === 'vmc'
                  ? 'border-[#2D8576] shadow-md ring-1 ring-[#2D8576]/30'
                  : 'border-[#CFE8E1] shadow-2xs hover:border-[#2D8576]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E4F4F0] text-[#2D8576] flex items-center justify-center font-bold text-xs">
                    VMC
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#002941] block">CNC Milling Line 01</span>
                    <span className="text-[10px] text-[#566E7F]">Job #PO-9412 • Flange Plate</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1]">
                  Running
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#566E7F]">Batch Progress</span>
                  <span className="font-bold text-[#002941] tabular-nums">420 / 500 pcs (84%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EBF1F5] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576] w-[84%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#DFECF3] text-[11px]">
                <div>
                  <span className="text-[#566E7F] block">Cycle Time</span>
                  <span className="font-bold text-[#002941] tabular-nums">48 sec / pc</span>
                </div>
                <div>
                  <span className="text-[#566E7F] block">Line OEE</span>
                  <span className="font-bold text-[#2D8576] tabular-nums">94.2% (Target 88%)</span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedMachine('cnc')}
              className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer space-y-3 ${
                selectedMachine === 'cnc'
                  ? 'border-[#002941] shadow-md ring-1 ring-[#002941]/30'
                  : 'border-[#DFECF3] shadow-2xs hover:border-[#BDD7E7]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F0F5F9] text-[#002941] flex items-center justify-center font-bold text-xs">
                    CNC
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#002941] block">Turning Lathe 04</span>
                    <span className="text-[10px] text-[#566E7F]">Job #PO-8820 • Spindle Shaft</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0F5F9] text-[#002941] border border-[#DFECF3]">
                  Active
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#566E7F]">Batch Progress</span>
                  <span className="font-bold text-[#002941] tabular-nums">1,150 / 1,200 pcs (95%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#EBF1F5] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] w-[95%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#DFECF3] text-[11px]">
                <div>
                  <span className="text-[#566E7F] block">Operator</span>
                  <span className="font-bold text-[#002941]">Ketan Bhai</span>
                </div>
                <div>
                  <span className="text-[#566E7F] block">Line OEE</span>
                  <span className="font-bold text-[#002941] tabular-nums">91.8%</span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedMachine('hyd')}
              className={`p-4 rounded-2xl bg-[#FFF4F3] border transition-all cursor-pointer space-y-3 ${
                selectedMachine === 'hyd'
                  ? 'border-[#FD6E6E] shadow-md ring-1 ring-[#FD6E6E]/40'
                  : 'border-[#FFD0CC] shadow-2xs hover:border-[#FD6E6E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    HYD
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#871919] block">Press Station 03</span>
                    <span className="text-[10px] text-[#871919]/75">Threshold Check Needed</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE6E4] text-[#871919] border border-[#FFD0CC]">
                  Attention
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white/85 border border-[#FFD0CC] text-xs space-y-0.5">
                <span className="font-bold text-[#871919] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#FD6E6E]">warning</span>
                  Oil Temp High (78°C)
                </span>
                <p className="text-[11px] text-[#566E7F]">
                  Hydraulic coolant auto-cycled. Alert pushed to supervisor mobile workbench.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#FFD0CC] text-[11px]">
                <span className="text-[#871919] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FD6E6E] animate-ping" />
                  Auto-Alert Active
                </span>
                <span className="text-[10px] font-bold text-[#871919] tabular-nums">2 mins ago</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#DFECF3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#002941] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-[#2D8576]">groups</span>
                32 Operators Active On Floor
              </span>
              <span className="text-[#DFECF3]">|</span>
              <span className="text-[#566E7F]">0 Unscheduled Absences Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] font-bold text-[11px]">
                GIDC Shift Calendar Sync: On Schedule
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'oee' && (
        <div className="pt-6 space-y-4 relative z-10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#DFECF3]">
            <div className="text-xs font-bold text-[#002941] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#2D8576]">tune</span>
              <span>Telemetry Snapshot By Active Shift</span>
            </div>
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#F0F5F9] border border-[#DFECF3]">
              <button
                type="button"
                onClick={() => setActiveShift('shiftA')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                  activeShift === 'shiftA'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'text-[#566E7F] hover:text-[#002941]'
                }`}
              >
                Shift A (Morning)
              </button>
              <button
                type="button"
                onClick={() => setActiveShift('shiftB')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                  activeShift === 'shiftB'
                    ? 'bg-[#002941] text-white shadow-2xs'
                    : 'text-[#566E7F] hover:text-[#002941]'
                }`}
              >
                Shift B (Evening)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Average Fleet OEE
              </span>
              <span className="text-2xl font-bold text-[#002941] tabular-nums block mt-1">
                {activeShift === 'shiftA' ? '92.4%' : '89.6%'}
              </span>
              <span className="text-xs text-[#2D8576] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↑</span> +4.6% vs monthly target
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Shift Output Value
              </span>
              <span className="text-2xl font-bold text-[#002941] tabular-nums block mt-1">
                {activeShift === 'shiftA' ? '₹6,42,800' : '₹5,18,200'}
              </span>
              <span className="text-xs text-[#2D8576] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↑</span> 108% of daily quota
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Scrap &amp; Rejection
              </span>
              <span className="text-2xl font-bold text-[#2D8576] tabular-nums block mt-1">
                {activeShift === 'shiftA' ? '0.8%' : '1.1%'}
              </span>
              <span className="text-xs text-[#566E7F] font-semibold block mt-0.5">
                MSME Standard: &lt; 2.0%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF4F3] border border-[#FFD0CC] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#871919] uppercase tracking-wider block">
                Unplanned Downtime
              </span>
              <span className="text-2xl font-bold text-[#871919] tabular-nums block mt-1">
                {activeShift === 'shiftA' ? '18 mins' : '26 mins'}
              </span>
              <span className="text-xs text-[#871919] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↓</span> 62% reduction via alerts
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#002941]">OEE Tripartite Factor Contribution</span>
              <span className="text-[#566E7F] tabular-nums">Availability (96%) • Performance (94%) • Quality (99.2%)</span>
            </div>
            <div className="h-3 w-full rounded-full bg-[#EBF1F5] overflow-hidden flex">
              <div style={{ width: '60%' }} className="h-full bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E]" title="Availability" />
              <div style={{ width: '30%' }} className="h-full bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576]" title="Performance" />
              <div style={{ width: '10%' }} className="h-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]" title="Loss & Quality Delta" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#566E7F] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#002941]" />
                Machine Availability (60%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D8576]" />
                Operating Speed (30%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FD6E6E]" />
                Loss/Rejection Buffer (10%)
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'whatsapp' && (
        <div className="pt-6 relative z-10 animate-in fade-in duration-200">
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#ECE5DD] p-4 sm:p-6 border border-[#DFECF3] shadow-inner space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#002941]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#002941]">FactoryOS Concierge Bot</h4>
                  <span className="text-[10px] text-[#20675C] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    Verified Business Account
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyDigest}
                className="px-3 py-1 rounded-full bg-white text-[#002941] border border-[#DFECF3] text-[11px] font-bold shadow-2xs hover:bg-[#F0F5F9] transition flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedDigest ? 'check' : 'content_copy'}
                </span>
                <span>{copiedDigest ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="bg-[#DCF8C6] border border-[#BEE7A5] rounded-2xl rounded-tl-sm p-4 shadow-xs text-xs text-[#002941] space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#002941]/10 font-bold">
                <span className="text-[#184E46]">DAILY SHOPFLOOR SHIFT DIGEST</span>
                <span className="text-[11px] text-[#566E7F] tabular-nums">9:00 PM IST</span>
              </div>

              <p className="text-[12px] leading-relaxed">
                Namaste <strong>Rajesh Bhai</strong>, here is today&apos;s shift summary for{' '}
                <strong>Apex Engineering Works (Naroda Hub)</strong>:
              </p>

              <div className="bg-white/80 rounded-xl p-3 border border-[#BEE7A5] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#566E7F]">Target Output:</span>
                  <span className="font-bold text-[#002941] tabular-nums">1,800 pcs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#566E7F]">Actual Output:</span>
                  <span className="font-bold text-[#2D8576] tabular-nums">1,942 pcs (108%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#566E7F]">Fleet OEE:</span>
                  <span className="font-bold text-[#002941] tabular-nums">92.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#566E7F]">Scrap / Defect Rate:</span>
                  <span className="font-bold text-[#2D8576] tabular-nums">0.8% (Target &lt; 2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#566E7F]">Supervisor Sign-Off:</span>
                  <span className="font-bold text-[#002941]">Ketan Bhai (Verified)</span>
                </div>
              </div>

              <p className="text-[11px] text-[#566E7F]">
                E-Way Bill &amp; Dispatch Challan staged for PO-9412 (Flange Plates). Ready for morning pickup.
              </p>

              <div className="flex items-center justify-end gap-1 text-[10px] text-[#566E7F] font-semibold tabular-nums">
                <span>9:00 PM</span>
                <span className="material-symbols-outlined text-[13px] text-[#25D366]">done_all</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCommandDeck;
