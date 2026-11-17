import React, { useState } from 'react';
import { PillButton } from '../../../components/common';
import { useNavigate } from 'react-router-dom';

export const RoiCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState<number>(16);
  const [downtimeHours, setDowntimeHours] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(850);

  const monthlyDowntimeLoss = machines * downtimeHours * hourlyRate;
  const recoveredSavings = Math.round(monthlyDowntimeLoss * 0.65);
  const annualSavings = recoveredSavings * 12;

  return (
    <div className="w-full rounded-[28px] sm:rounded-[32px] bg-white border border-[#DFECF3] shadow-[0_10px_35px_-8px_rgba(0,41,65,0.06)] p-5 sm:p-8 lg:p-10 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#DFECF3]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] text-xs font-bold shadow-2xs mb-2">
            <span className="material-symbols-outlined text-[15px] text-[#2D8576]">calculate</span>
            <span>Indian MSME Cost-Benefit Calculator</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#002941] tracking-tight">
            Calculate your shopfloor monthly savings
          </h2>
          <p className="text-xs sm:text-sm text-[#566E7F] mt-1 max-w-2xl leading-relaxed">
            See how eliminating paper logs, unrecorded idle time, and supervisor lag translates to hard rupee savings for your unit.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-[#F8FAFA] px-4 py-2.5 rounded-2xl border border-[#DFECF3] self-start lg:self-auto">
          <span className="material-symbols-outlined text-[#2D8576] text-2xl">verified</span>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-wider text-[#566E7F] font-bold">
              Payback Speed
            </div>
            <div className="text-xs font-bold text-[#002941]">&lt; 14 Days on Free Trial</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#002941]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#2D8576]">precision_manufacturing</span>
                Active Machinery Fleet
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F0F5F9] border border-[#DFECF3] text-sm font-bold tabular-nums text-[#002941]">
                {machines} Machines
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={60}
              step={1}
              value={machines}
              onChange={(e) => setMachines(Number(e.target.value))}
              className="w-full accent-[#002941] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8DA1AF] font-medium">
              <span>4 Machines (Micro)</span>
              <span>25 Machines (Medium)</span>
              <span>60 Machines (Large)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#002941]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#FD6E6E]">timer_off</span>
                Monthly Unrecorded Idle &amp; Breakdown Hours (per machine)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFF4F3] border border-[#FFD0CC] text-sm font-bold tabular-nums text-[#871919]">
                {downtimeHours} Hours / mo
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={downtimeHours}
              onChange={(e) => setDowntimeHours(Number(e.target.value))}
              className="w-full accent-[#FD6E6E] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8DA1AF] font-medium">
              <span>2 Hours (Tight Line)</span>
              <span>15 Hours (Typical MSME)</span>
              <span>30 Hours (Heavy Choke)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#002941]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#2D8576]">currency_rupee</span>
                Average Machine Cost Rate (Operator + Power + Machine Hour)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E4F4F0] border border-[#CFE8E1] text-sm font-bold tabular-nums text-[#184E46]">
                ₹{hourlyRate} / hour
              </span>
            </div>
            <input
              type="range"
              min={400}
              max={2500}
              step={50}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-[#2D8576] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8DA1AF] font-medium">
              <span>₹400 (Lathe/Fabrication)</span>
              <span>₹850 (CNC Milling/VMC)</span>
              <span>₹2,500 (Heavy Multi-Axis)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] text-white shadow-lg space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="text-xs uppercase font-bold tracking-wider text-[#CFE8E1]">
                Estimated Factory ROI
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#2D8576]/30 text-[#CFE8E1] text-[10px] font-bold border border-[#2D8576]/40">
                65% Stoppage Recovery
              </span>
            </div>

            <div className="pt-4 space-y-1">
              <span className="text-xs text-white/80 block">Estimated Rupee Recovery Per Month</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                ₹{recoveredSavings.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-[#CFE8E1] block pt-1">
                Annual projected bottom-line lift: <strong className="text-white tabular-nums">₹{annualSavings.toLocaleString('en-IN')}</strong>
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Monthly Stoppage Cost:</span>
              <span className="font-bold text-[#FFD0CC] tabular-nums">₹{monthlyDowntimeLoss.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Recovered Hours:</span>
              <span className="font-bold text-[#CFE8E1] tabular-nums">{Math.round(machines * downtimeHours * 0.65)} hrs / mo</span>
            </div>
          </div>

          <PillButton
            type="button"
            variant="coral"
            size="md"
            onClick={() => navigate('/signup')}
            icon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            iconPosition="right"
            className="w-full font-bold shadow-md hover:shadow-lg justify-center"
          >
            Claim Your Factory Savings (Free Trial)
          </PillButton>
        </div>
      </div>
    </div>
  );
};

export default RoiCalculator;
