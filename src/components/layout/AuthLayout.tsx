import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BrandLogo } from '../common';

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFA] font-sans text-[#002941] selection:bg-[#CFE8E1] selection:text-[#002941] antialiased overflow-hidden">
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#001827] text-white py-6 px-8 xl:px-12 flex-col justify-between relative shrink-0">
        <div className="absolute top-[-20%] left-[-20%] w-[450px] h-[450px] rounded-full bg-[#2D8576]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[400px] h-[400px] rounded-full bg-[#FD6E6E]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 shrink-0">
          <Link to="/" className="inline-block">
            <BrandLogo variant="capsule" size="md" className="shadow-lg hover:scale-[1.02] transition-transform" />
          </Link>
        </div>

        <div className="relative z-10 space-y-4 my-auto py-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CFE8E1] border border-white/15 text-xs font-semibold backdrop-blur-md shadow-2xs">
            <span className="material-symbols-outlined text-[15px] text-[#43A392]">verified</span>
            <span>The Next-Gen OS for Indian MSMEs • Udyam &amp; GST Ready</span>
          </div>

          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight text-white leading-tight">
            Run your factory with <span className="text-[#CFE8E1] underline decoration-[#2D8576] decoration-2 underline-offset-4">clarity</span>, not paperwork.
          </h1>

          <p className="text-xs xl:text-sm text-[#DFECF3]/80 leading-relaxed">
            Live machine telemetry, automated dispatch challans, and 9:00 PM shift digests delivered straight to your WhatsApp.
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 xl:p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43A392] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D8576]" />
                </span>
                <span className="font-bold text-white tracking-wide text-xs">Shopfloor Command Active</span>
                <span className="text-white/40">•</span>
                <span className="text-[#CFE8E1] font-medium text-[11px]">16 Machines Linked</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-[#CFE8E1] border border-white/15">
                Day Shift 1
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#2D8576]/30 border border-[#2D8576]/40 flex items-center justify-center text-[#CFE8E1] shrink-0 font-bold text-[11px]">
                    VMC
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">CNC Milling Line 01</p>
                    <p className="text-[10px] text-[#DFECF3]/70 truncate">Job #PO-8412 • Flange Plate</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#2D8576]/30 text-[#CFE8E1] text-[10px] font-bold border border-[#2D8576]/40">
                    Running (94.2% OEE)
                  </span>
                  <p className="text-[10px] text-[#DFECF3]/80 tabular-nums font-semibold mt-0.5">420 / 500 pcs</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#002941]/70 border border-white/20 flex items-center justify-center text-[#CFE8E1] shrink-0 font-bold text-[11px]">
                    CNC
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Turning Lathe 04</p>
                    <p className="text-[10px] text-[#DFECF3]/70 truncate">Operator: Ketan Bhai</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#2D8576]/30 text-[#CFE8E1] text-[10px] font-bold border border-[#2D8576]/40">
                    Active (91.8% OEE)
                  </span>
                  <p className="text-[10px] text-[#DFECF3]/80 tabular-nums font-semibold mt-0.5">1,150 / 1,200 pcs</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFF4F3]/10 border border-[#FD6E6E]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white flex items-center justify-center shrink-0 font-bold text-[10px] shadow-xs">
                    HYD
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#FFD0CC] truncate">Press Station 03</p>
                    <p className="text-[10px] text-[#FFD0CC]/80 truncate">Oil Temp High (78°C) • Threshold Check</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[10px] font-bold shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Attention
                  </span>
                  <p className="text-[10px] text-[#FFD0CC]/90 font-semibold mt-0.5">Auto-Alert Pushed</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#DFECF3]/80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#2D8576]">mark_chat_read</span>
                <span className="font-semibold text-white text-[11px]">Daily WhatsApp Night Digest</span>
              </div>
              <span className="text-[10px] font-bold text-[#CFE8E1] bg-[#2D8576]/25 border border-[#2D8576]/40 px-2 py-0.5 rounded-full">
                9:00 PM Daily
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#DFECF3]/75 flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#43A392]">check_circle</span>
            <span className="font-medium text-white">14-Day Free MSME Trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#43A392]">check_circle</span>
            <span className="font-medium text-white">Zero Hardware Setup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#43A392]">verified_user</span>
            <span className="font-medium text-white">ISO 27001 Encrypted</span>
          </div>
        </div>
      </div>

      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between p-4 sm:p-6 lg:p-8 xl:p-10 bg-[#F8FAFA] scrollbar-thin">
        <div className="w-full flex items-center justify-between gap-3 shrink-0">
          <div className="flex lg:hidden">
            <Link to="/">
              <BrandLogo variant="capsule" size="sm" />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <a
              href="https://wa.me/919825012345"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFECF3] hover:border-[#2D8576] hover:text-[#184E46] transition text-xs font-semibold text-[#002941] shadow-2xs group"
              title="Chat with Onboarding Concierge"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD6E6E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FD6E6E]" />
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
                support_agent
              </span>
              <span className="text-[#566E7F] hidden sm:inline">WhatsApp Concierge:</span>
              <span className="font-bold tabular-nums text-[#002941]">+91 98250 12345</span>
            </a>

            <Link
              to="/"
              className="w-8 h-8 rounded-full bg-white border border-[#DFECF3] text-[#566E7F] hover:text-[#002941] hover:bg-[#F0F5F9] transition flex items-center justify-center shadow-2xs"
              title="Back to Home"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </Link>
          </div>
        </div>

        <div className="lg:hidden w-full max-w-xl mx-auto pt-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#002941] via-[#0C3953] to-[#164E6E] text-white flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#2D8576] shrink-0 animate-ping" />
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate">Udyam &amp; GST Ready MSME Command</p>
                <p className="text-[10px] text-[#CFE8E1] truncate">Automated 9:00 PM Night Digests on WhatsApp</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white text-[9.5px] font-bold shrink-0 shadow-2xs">
              14-Day Free
            </span>
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto my-auto py-6 sm:py-8 flex justify-center">
          <Outlet />
        </div>

        <div className="w-full text-center py-2 shrink-0">
          <p className="text-[11px] text-[#8DA1AF] flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#2D8576]">lock</span>
            <span>Protected by 256-bit SSL encryption • Calibrated for Indian MSMEs</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
