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

  const handleTabSelect = (tab: 'shopfloor' | 'oee' | 'whatsapp') => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div
      id="command-deck"
      className="w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-white/95 to-[#F8FAFA]/95 border border-[#DFECF3] shadow-[0_20px_50px_-10px_rgba(0,41,65,0.12),0_8px_24px_-4px_rgba(0,41,65,0.06)] p-4 sm:p-7 relative overflow-hidden backdrop-blur-xl scroll-mt-24"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#CFE8E1]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#FFD0CC]/30 blur-3xl pointer-events-none" />

      {/* Deck Header Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-5 border-b border-[#DFECF3] relative z-10">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4F4F0] border border-[#CFE8E1]">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D8576] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D8576]" />
            </span>
            <span className="text-xs font-bold text-[#184E46]">
              Shopfloor Command Active • 16 Machines Linked
            </span>
          </div>
        </div>

        {/* Interactive Showcase Tabs */}
        <div className="flex items-center p-1 rounded-full bg-[#F0F5F9] border border-[#DFECF3] shadow-2xs">
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
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#CFE8E1] text-[#002941]">
              9 PM
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#566E7F]">
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">schedule</span>
          <span>Day Shift 1 • Next Handover 18:00</span>
        </div>
      </div>

      {/* Tab 1: Live Shopfloor Board */}
      {activeTab === 'shopfloor' && (
        <div className="pt-6 space-y-4 relative z-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Machine 1: Running Normal (Mint Theme) */}
            <div className="p-4 rounded-2xl bg-white border border-[#CFE8E1] shadow-2xs space-y-3">
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

            {/* Machine 2: Lathe Station (Navy Theme) */}
            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-3">
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

            {/* Machine 3: Hydraulic Press Alert (Coral Theme) */}
            <div className="p-4 rounded-2xl bg-[#FFF4F3] border border-[#FFD0CC] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE6E4] text-[#D62727] flex items-center justify-center font-bold text-xs">
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

              <div className="p-2 rounded-xl bg-white/80 border border-[#FFD0CC] text-xs space-y-0.5">
                <span className="font-bold text-[#871919] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">warning</span>
                  Oil Temp High (78°C)
                </span>
                <p className="text-[11px] text-[#566E7F]">
                  Hydraulic coolant auto-cycled. Supervisor sign-off pending.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#FFD0CC] text-[11px]">
                <span className="text-[#871919] font-medium">Auto-Alert Pushed to Mobile</span>
                <span className="text-[10px] font-bold text-[#871919]">2 mins ago</span>
              </div>
            </div>
          </div>

          {/* Shopfloor Summary Bar */}
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

      {/* Tab 2: Machine OEE & Telemetry */}
      {activeTab === 'oee' && (
        <div className="pt-6 space-y-4 relative z-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Average Fleet OEE
              </span>
              <span className="text-2xl font-bold text-[#002941] tabular-nums block mt-1">
                91.8%
              </span>
              <span className="text-xs text-[#2D8576] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↑</span> +4.6% vs monthly target
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Today Output Value
              </span>
              <span className="text-2xl font-bold text-[#002941] tabular-nums block mt-1">
                ₹6,42,800
              </span>
              <span className="text-xs text-[#2D8576] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↑</span> 104% of daily quota
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#566E7F] uppercase tracking-wider block">
                Scrap &amp; Defect Rate
              </span>
              <span className="text-2xl font-bold text-[#002941] tabular-nums block mt-1">
                0.8%
              </span>
              <span className="text-xs text-[#2D8576] font-semibold flex items-center gap-0.5 mt-0.5">
                <span>↓</span> -0.4% lower scrap
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF4F3] border border-[#FFD0CC] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#871919] uppercase tracking-wider block">
                Unplanned Downtime
              </span>
              <span className="text-2xl font-bold text-[#871919] tabular-nums block mt-1">
                18 mins
              </span>
              <span className="text-xs text-[#871919] font-semibold block mt-0.5">
                Press Station 03 maintenance
              </span>
            </div>
          </div>

          {/* Tripartite Breakdown Pipeline Visualization */}
          <div className="p-4 rounded-2xl bg-white border border-[#DFECF3] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#002941]">Production Fleet Allocation (Tripartite 60-30-10)</span>
              <span className="text-[#566E7F] tabular-nums">16 Machines Active</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#EBF1F5] flex overflow-hidden">
              <div
                style={{ width: '60%' }}
                className="h-full bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E]"
                title="CNC Machining (60%)"
              />
              <div
                style={{ width: '30%' }}
                className="h-full bg-gradient-to-r from-[#103530] via-[#184E46] to-[#2D8576]"
                title="Assembly & Finishing (30%)"
              />
              <div
                style={{ width: '10%' }}
                className="h-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]"
                title="Staging & Quality Inspection (10%)"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#002941]" />
                <span className="text-[#002941] font-semibold">Tier 1: CNC Machining (60%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D8576]" />
                <span className="text-[#184E46] font-semibold">Tier 2: Assembly &amp; Finishing (30%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FD6E6E]" />
                <span className="text-[#871919] font-semibold">Tier 3: Quality Staging (10%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: WhatsApp Night Digest Preview */}
      {activeTab === 'whatsapp' && (
        <div className="pt-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[28px] bg-white border border-[#DFECF3] shadow-lg overflow-hidden">
            {/* WhatsApp App Header */}
            <div className="p-3.5 bg-[#075E54] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  FOS
                </div>
                <div>
                  <span className="text-xs font-bold block leading-tight">FactoryOS Verified Digest</span>
                  <span className="text-[10px] text-white/80 block leading-tight">Official Automated Rollup</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>

            {/* Message Body */}
            <div className="p-4 bg-[#EFEAE2] space-y-3 text-xs font-sans">
              <div className="p-3 rounded-2xl bg-white shadow-xs space-y-2 border border-[#DFECF3]">
                <div className="flex items-center justify-between border-b border-[#DFECF3] pb-1.5">
                  <span className="font-bold text-[#002941]">Daily Shift Night Digest</span>
                  <span className="text-[10px] text-[#566E7F] tabular-nums">9:00 PM</span>
                </div>
                <div className="space-y-1 text-[#002941] text-[11px]">
                  <p>🏭 <strong>Finished Production:</strong> ₹5,42,000</p>
                  <p>⚡ <strong>Average Fleet OEE:</strong> 91.8% (Target: 88% ✅)</p>
                  <p>📦 <strong>Dispatch Orders Completed:</strong> 6 Batches</p>
                  <p>⚠️ <strong>Scrap Recorded:</strong> 0.8% (Low tolerance ✅)</p>
                  <p>👥 <strong>Shift Operator Attendance:</strong> 32 / 32 Present</p>
                </div>
                <div className="p-2 rounded-xl bg-[#E4F4F0] border border-[#CFE8E1] text-[10px] text-[#184E46] font-semibold">
                  Shift handover completed smoothly by Supervisor Suresh Bhai. Night shift starts 20:00.
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white border-t border-[#DFECF3] text-center text-[10px] text-[#566E7F]">
              Direct end-of-shift delivery to your phone. Zero ERP manual logging.
            </div>
          </div>

          <div className="max-w-md space-y-3 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-bold inline-block">
              Proprietor Peace of Mind
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#002941] tracking-tight">
              Know your factory output without making phone calls.
            </h3>
            <p className="text-xs sm:text-sm text-[#566E7F] leading-relaxed">
              Every evening at 9:00 PM, FactoryOS compiles machine IoT telemetry, operator registers, and completed purchase order dispatches into a clean WhatsApp summary.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
