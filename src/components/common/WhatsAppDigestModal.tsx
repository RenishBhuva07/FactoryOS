import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useOnboarding, useFactoryStore } from "../../context";

export interface WhatsAppDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppDigestModal: React.FC<WhatsAppDigestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const { factoryOutput, workforceAttendance, machineStatusKpi, dispatches } =
    useFactoryStore();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    "Apex Engineering Works";
  const proprietorName =
    user?.name ||
    onboardingState.businessDetails.proprietorName ||
    "Rajesh Bhai Patel";
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const attendancePercent =
    Math.round(
      (workforceAttendance.present / Math.max(1, workforceAttendance.total)) *
        100 *
        10,
    ) / 10;

  const rawDigestText = `*🏭 ${factoryName} — Daily Plant Digest*
📅 *Date:* ${dateStr} | *Time:* 21:00 IST
👤 *Attention:* ${proprietorName}

*1. Production Summary*
• Output: ${factoryOutput.produced.toLocaleString()} units / ${factoryOutput.target.toLocaleString()} target (${factoryOutput.targetAchievedPercent}% achieved)
• Active Spindles: Line 01 (CNC) & Line 02 (Machining)
• Rejection / Scrap: 18 pcs (Within tolerance)

*2. Shift Attendance*
• Present: ${workforceAttendance.present} / ${workforceAttendance.total} operators (${attendancePercent}% floor coverage)
• Exceptions: ${workforceAttendance.absent} absent • ${workforceAttendance.onLeave} on leave

*3. Machinery & Fleet Health*
• Operational Spindles: ${machineStatusKpi.operational} / ${machineStatusKpi.total}
• Fleet Note: ${machineStatusKpi.maintenanceNote}

*4. Outbound Logistics & Gate Dispatches*
• Active Shipments: ${dispatches.length} consignments
• Route: Pune/Ahmedabad Industrial Corridor

_Delivered automatically by FactoryOS. Tap to view live shopfloor telemetry: https://factoryos.in_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawDigestText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(rawDigestText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleDrilldown = (path: string) => {
    onClose();
    navigate(path);
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
              <span className="material-symbols-outlined text-[19px]">
                chat
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#002941]">
                9:00 PM WhatsApp Shift Digest
              </h2>
              <p className="text-[11px] text-[#566E7F]">
                Automated night pulse • Tap any metric to inspect records
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#566E7F] hover:bg-[#F0F5F9] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 bg-[#EFEAE2] flex flex-col items-center justify-center max-h-[65vh] overflow-y-auto">
          <div className="w-full max-w-md bg-[#DCF8C6] border border-[#C2E7A4] rounded-2xl p-4 shadow-sm text-xs text-[#111B21] space-y-2.5 font-sans leading-relaxed">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#BEDFAA]">
              <span className="font-bold text-[#075E54] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  factory
                </span>
                {factoryName}
              </span>
              <span className="text-[10px] text-[#54656F] font-semibold">
                Today, 21:00 IST
              </span>
            </div>

            <p className="font-semibold text-[#128C7E]">
              Daily Shift Performance Dossier • {dateStr}
            </p>

            {/* Clickable Drilldowns for Flow 5 */}
            <div className="space-y-1.5 pt-0.5">
              <div
                onClick={() => handleDrilldown("/production-logs")}
                className="flex justify-between items-center bg-white/85 hover:bg-white px-2.5 py-2 rounded-xl border border-[#BEDFAA]/60 transition cursor-pointer group"
                title="View Production Logs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">⚙️</span>
                  <span className="font-semibold text-[#3B4A54] group-hover:text-[#002941]">
                    Production Output
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#075E54] tabular-nums">
                    {factoryOutput.produced.toLocaleString()} /{" "}
                    {factoryOutput.target.toLocaleString()} (
                    {factoryOutput.targetAchievedPercent}%)
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#075E54] group-hover:translate-x-0.5 transition">
                    chevron_right
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleDrilldown("/team")}
                className="flex justify-between items-center bg-white/85 hover:bg-white px-2.5 py-2 rounded-xl border border-[#BEDFAA]/60 transition cursor-pointer group"
                title="View Team Attendance Roster"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">👥</span>
                  <span className="font-semibold text-[#3B4A54] group-hover:text-[#002941]">
                    Floor Attendance
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#002941] tabular-nums">
                    {workforceAttendance.present} / {workforceAttendance.total}{" "}
                    ({attendancePercent}%)
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#002941] group-hover:translate-x-0.5 transition">
                    chevron_right
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleDrilldown("/machines")}
                className="flex justify-between items-center bg-white/85 hover:bg-white px-2.5 py-2 rounded-xl border border-[#BEDFAA]/60 transition cursor-pointer group"
                title="View Machine Fleet & Issues"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">⚠️</span>
                  <span className="font-semibold text-[#3B4A54] group-hover:text-[#002941]">
                    Machine Fleet &amp; PM
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#AB1B1B] tabular-nums">
                    {machineStatusKpi.operational}/{machineStatusKpi.total}{" "}
                    Active
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#AB1B1B] group-hover:translate-x-0.5 transition">
                    chevron_right
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleDrilldown("/dispatch")}
                className="flex justify-between items-center bg-white/85 hover:bg-white px-2.5 py-2 rounded-xl border border-[#BEDFAA]/60 transition cursor-pointer group"
                title="View Outbound Dispatches"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📦</span>
                  <span className="font-semibold text-[#3B4A54] group-hover:text-[#002941]">
                    Gate Dispatches
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#184E46] tabular-nums">
                    {dispatches.length} Consignments
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#184E46] group-hover:translate-x-0.5 transition">
                    chevron_right
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleDrilldown("/quality")}
                className="flex justify-between items-center bg-white/85 hover:bg-white px-2.5 py-2 rounded-xl border border-[#BEDFAA]/60 transition cursor-pointer group"
                title="View Quality Register"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🔍</span>
                  <span className="font-semibold text-[#3B4A54] group-hover:text-[#002941]">
                    Scrap &amp; Rejection
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#002941] tabular-nums">
                    18 pcs (1.2% normal)
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#002941] group-hover:translate-x-0.5 transition">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-[#54656F]">
              <span>Verified by Shift A &amp; B Leads</span>
              <span className="flex items-center gap-0.5 text-[#53BDEB]">
                <span className="material-symbols-outlined text-[13px]">
                  done_all
                </span>
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
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-full border border-[#DFECF3] text-xs font-bold text-[#002941] hover:bg-[#F0F5F9] transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? "check" : "content_copy"}
              </span>
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                send
              </span>
              <span>Share WhatsApp</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleDrilldown("/reports")}
            className="text-xs font-bold text-[#2D8576] hover:text-[#184E46] flex items-center gap-1 cursor-pointer"
          >
            <span>Open Executive Dossier (Reports)</span>
            <span className="material-symbols-outlined text-[15px]">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDigestModal;
