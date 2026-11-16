import React from "react";
import { Card, PillProgressBar } from "../../../components/common";
import type {
  FactoryOutputKpi,
  WorkforceAttendanceKpi,
  ActiveOrdersKpi,
  MachineStatusKpi,
} from "../../../types/dashboard";

export interface FactoryKpiGridProps {
  output: FactoryOutputKpi;
  attendance: WorkforceAttendanceKpi;
  orders: ActiveOrdersKpi;
  machineStatus: MachineStatusKpi;
  onNavigateRoster?: () => void;
  onNavigateMachines?: () => void;
  className?: string;
}

export const FactoryKpiGrid: React.FC<FactoryKpiGridProps> = ({
  output,
  attendance,
  orders,
  machineStatus,
  onNavigateRoster,
  onNavigateMachines,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}
    >
      {/* 1. Today's Output (Hero Navy Command) */}
      <Card
        variant="heroNavy"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Today's Output
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-[#CFE8E1] backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                factory
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {output.produced.toLocaleString()}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/80 tabular-nums">
              / {output.target.toLocaleString()} {output.unit}
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80 font-medium">Target Achieved</span>
            <span className="font-bold text-white tabular-nums">
              {output.targetAchievedPercent}%
            </span>
          </div>
          <PillProgressBar
            value={output.produced}
            max={output.target}
            variant="mint"
            trackClassName="bg-white/20"
            height="sm"
          />
        </div>
      </Card>

      {/* 2. Workforce Attendance (Hero Mint Uptime) */}
      <Card
        variant="heroMint"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Workforce Attendance
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                groups
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {attendance.present}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/85 tabular-nums">
              / {attendance.total} Present
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 flex items-center justify-between gap-2 text-xs">
          <span className="text-white/85 font-medium truncate">
            {attendance.onLeave} on leave • {attendance.absent} absent
          </span>
          <button
            type="button"
            onClick={onNavigateRoster}
            className="text-xs font-semibold text-[#CFE8E1] hover:text-white flex items-center gap-0.5 shrink-0 cursor-pointer"
          >
            <span>Staff roster</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </button>
        </div>
      </Card>

      {/* 3. Active Orders (Clean Benchmark Surface) */}
      <Card
        variant="default"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-[#566E7F] uppercase">
              Active Orders
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#F0F5F9] text-[#002941] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                inventory_2
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-[#002941] tabular-nums tracking-tight">
              {orders.inProgressCount}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-[#566E7F]">
              in progress
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-[#DFECF3] space-y-1">
          <p className="text-xs text-[#566E7F] font-medium truncate">
            {orders.readyForDispatchCount} Ready for Dispatch •{" "}
            {orders.qcPendingCount} QC Pending
          </p>
          <p className="text-xs font-bold text-[#002941] tabular-nums">
            {orders.activePipelineValue} Active Pipeline
          </p>
        </div>
      </Card>

      {/* 4. Machine Status (Coral Attention Alert) */}
      <Card
        variant="heroCoral"
        padding="sm"
        className="flex flex-col justify-between transition-all"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs sm:text-[13px] font-extrabold tracking-wider text-white/95 uppercase">
              Machine Status
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">
                precision_manufacturing
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[28px] sm:text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
              {machineStatus.operational}/{machineStatus.total}
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-[#CFE8E1]">
              Operational
            </span>
          </div>
        </div>

        <div className="pt-3.5 mt-2 border-t border-white/20 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white shadow-xs border border-[#FFD0CC]/30 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {machineStatus.maintenanceNote}
          </span>
          <button
            type="button"
            onClick={onNavigateMachines}
            className="text-xs font-semibold text-[#CFE8E1] hover:text-white flex items-center gap-0.5 shrink-0 cursor-pointer"
          >
            <span>Machines</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default FactoryKpiGrid;
