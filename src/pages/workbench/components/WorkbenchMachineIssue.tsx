import React, { useState } from "react";
import { PillButton } from "../../../components/common";

export interface MachineIssueReport {
  machine: string;
  category: string;
  severity: "normal" | "urgent";
  description: string;
}

export interface WorkbenchMachineIssueProps {
  onSubmit?: (issue: MachineIssueReport) => string | void;
  machines?: string[];
  onReturnToProduction?: () => void;
}

const DEFAULT_MACHINES = [
  "ACE Micromatic (M-01 CNC)",
  "Conventional Lathe 6ft (M-02)",
  "Batliboi Radial Drill (M-03)",
  "BFW Vertical Machining Centre (VMC-04)",
  "Hydraulic Surface Grinder",
  "Manual Hydraulic Press 20T",
];

const ISSUE_CATEGORIES = [
  "Spindle & Tooling Wear",
  "Hydraulic Pressure Drop",
  "Coolant Leakage / Motor Temp",
  "Electrical / Sensor Trip",
  "Raw Material Hardness Issue",
  "Safety Observation / Guard",
];

export const WorkbenchMachineIssue: React.FC<WorkbenchMachineIssueProps> = ({
  onSubmit,
  machines = DEFAULT_MACHINES,
  onReturnToProduction,
}) => {
  const [selectedMachine, setSelectedMachine] = useState(
    machines[0] || DEFAULT_MACHINES[0],
  );
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [severity, setSeverity] = useState<"normal" | "urgent">("urgent");
  const [description, setDescription] = useState("");

  // Flow 4: 'form' -> 'detail'
  const [flowStep, setFlowStep] = useState<"form" | "detail">("form");
  const [activeTicket, setActiveTicket] = useState<{
    ticketId: string;
    machine: string;
    category: string;
    severity: "normal" | "urgent";
    description: string;
    timestamp: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resultTicketId = onSubmit?.({
      machine: selectedMachine,
      category,
      severity,
      description: description || `${category} reported by shift operator.`,
    });

    const ticketId =
      typeof resultTicketId === "string"
        ? resultTicketId
        : `TKT-${Math.floor(1040 + Math.random() * 8900)}`;
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setActiveTicket({
      ticketId,
      machine: selectedMachine,
      category,
      severity,
      description: description || `${category} reported on line.`,
      timestamp: timeStr,
    });

    setFlowStep("detail");
  };

  const handleReportAnother = () => {
    setDescription("");
    setFlowStep("form");
  };

  if (flowStep === "detail" && activeTicket) {
    return (
      <div className="bg-white rounded-3xl border border-[#DFECF3] p-5 sm:p-7 shadow-sm space-y-5 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF4F3] text-[#AB1B1B] border border-[#FFD0CC] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                warning
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AB1B1B] bg-[#FFF4F3] px-2.5 py-0.5 rounded-full border border-[#FFD0CC]">
                Ticket {activeTicket.ticketId}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#002941] mt-0.5">
                Breakdown Ticket Dispatched
              </h2>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF4F3] text-[#AB1B1B] border border-[#FFD0CC]">
            Down for Maintenance
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#566E7F]">Affected Workstation:</span>
            <span className="font-bold text-[#002941]">
              {activeTicket.machine}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#566E7F]">Breakdown Category:</span>
            <span className="font-bold text-[#002941]">
              {activeTicket.category}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#566E7F]">Severity Classification:</span>
            <span className="font-bold text-[#AB1B1B] uppercase">
              {activeTicket.severity}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#566E7F]">Logged Time:</span>
            <span className="font-bold text-[#002941]">
              {activeTicket.timestamp} IST
            </span>
          </div>

          {activeTicket.description && (
            <div className="pt-2 border-t border-[#DFECF3]">
              <span className="text-[#566E7F]">Incident Description:</span>
              <p className="font-medium text-[#002941] mt-0.5">
                {activeTicket.description}
              </p>
            </div>
          )}
        </div>

        {/* Real-time sync banner to owner dashboard */}
        <div className="p-3.5 rounded-2xl bg-[#E4F4F0] border border-[#CFE8E1] flex items-center gap-2.5 text-xs text-[#184E46]">
          <span className="material-symbols-outlined text-[20px] text-[#2D8576]">
            satellite_alt
          </span>
          <div>
            <p className="font-bold">Pushed to Owner Overview</p>
            <p className="text-[11px] text-[#566E7F]">
              Incident flagged on proprietor command dashboard (Needs Attention)
              and maintenance calendar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <PillButton
            type="button"
            variant="ghost"
            size="md"
            onClick={handleReportAnother}
            className="text-xs font-bold"
          >
            Report Another Issue
          </PillButton>

          {onReturnToProduction && (
            <PillButton
              type="button"
              variant="primary"
              size="md"
              onClick={onReturnToProduction}
              icon={
                <span className="material-symbols-outlined text-[18px]">
                  add_task
                </span>
              }
              className="flex-1 justify-center font-bold"
            >
              Return to Output Entry
            </PillButton>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#FD6E6E]/15 text-[#AB1B1B] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">
              warning
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002941]">
              Report Machine Stoppage
            </h2>
            <p className="text-xs text-[#566E7F]">
              Pushes immediate warning to Owner Dashboard
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FD6E6E]/15 text-[#AB1B1B] border border-[#FD6E6E]/30">
          Instant Alert
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Select Machine
          </label>
          <select
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
          >
            {machines.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Breakdown Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3.5 text-xs font-semibold bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden"
          >
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Severity Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSeverity("normal")}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                severity === "normal"
                  ? "bg-[#002941] text-white border-[#002941]"
                  : "bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]"
              }`}
            >
              Minor / Scheduled Check
            </button>
            <button
              type="button"
              onClick={() => setSeverity("urgent")}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                severity === "urgent"
                  ? "bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B] text-white border-transparent"
                  : "bg-[#F8FAFA] text-[#566E7F] border-[#DFECF3]"
              }`}
            >
              Urgent / Spindle Stoppage
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#002941]">
            Description / Observation
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. Unusual chatter noise from spindle bearing during finishing pass."
            className="w-full p-3 text-xs bg-[#F8FAFA] border border-[#DFECF3] rounded-2xl text-[#002941] focus:outline-hidden focus:bg-white"
          />
        </div>

        <PillButton
          type="submit"
          variant="coral"
          size="lg"
          icon={
            <span className="material-symbols-outlined text-[19px]">
              report
            </span>
          }
          className="w-full justify-center font-bold"
        >
          Submit Stoppage Ticket
        </PillButton>
      </form>
    </div>
  );
};

export default WorkbenchMachineIssue;
