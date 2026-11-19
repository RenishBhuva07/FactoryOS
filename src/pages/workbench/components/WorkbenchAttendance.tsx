import React, { useState } from "react";
import { PillButton } from "../../../components/common";

export interface AttendanceRecord {
  id: string;
  name: string;
  code: string;
  station: string;
  status: "present" | "absent" | "half_day" | "overtime";
}

const INITIAL_ROSTER: AttendanceRecord[] = [
  {
    id: "att-1",
    name: "Ramesh Kumar",
    code: "EMP-014",
    station: "CNC Lathe 01",
    status: "present",
  },
  {
    id: "att-2",
    name: "Dinesh Prajapati",
    code: "EMP-019",
    station: "CNC Lathe 02",
    status: "present",
  },
  {
    id: "att-3",
    name: "Suresh Bhai Parmar",
    code: "EMP-022",
    station: "VMC Milling 04",
    status: "present",
  },
  {
    id: "att-4",
    name: "Vikram Singh",
    code: "EMP-031",
    station: "Deburring Station",
    status: "absent",
  },
  {
    id: "att-5",
    name: "Amit Varma",
    code: "EMP-038",
    station: "Drill Bench 01",
    status: "present",
  },
  {
    id: "att-6",
    name: "Kailash Solanki",
    code: "EMP-045",
    station: "Packing & Staging",
    status: "half_day",
  },
];

export interface WorkbenchAttendanceProps {
  onSave?: (roster: AttendanceRecord[]) => void;
  supervisorName?: string;
  shiftName?: string;
}

export const WorkbenchAttendance: React.FC<WorkbenchAttendanceProps> = ({
  onSave,
  supervisorName = "Ramesh Bhai",
  shiftName = "Shift A",
}) => {
  const [roster, setRoster] = useState<AttendanceRecord[]>(INITIAL_ROSTER);
  const [flowStep, setFlowStep] = useState<"edit" | "review" | "summary">(
    "edit",
  );
  const [lockedTimestamp, setLockedTimestamp] = useState<string>("");

  const handleMarkAllPresent = () => {
    setRoster((prev) => prev.map((r) => ({ ...r, status: "present" })));
  };

  const handleStatusChange = (
    id: string,
    status: AttendanceRecord["status"],
  ) => {
    setRoster((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const presentCount = roster.filter(
    (r) => r.status === "present" || r.status === "overtime",
  ).length;
  const absentCount = roster.filter((r) => r.status === "absent").length;
  const halfDayCount = roster.filter((r) => r.status === "half_day").length;

  const handleConfirmLock = () => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLockedTimestamp(timeStr);
    onSave?.(roster);
    setFlowStep("summary");
  };

  if (flowStep === "summary") {
    return (
      <div className="bg-white rounded-3xl border border-[#DFECF3] p-5 sm:p-7 shadow-sm space-y-5 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DFECF3]">
          <div className="w-10 h-10 rounded-2xl bg-[#E4F4F0] text-[#184E46] border border-[#CFE8E1] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-[#2D8576]">
              verified_user
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#184E46] bg-[#CFE8E1] px-2.5 py-0.5 rounded-full">
              Attendance Locked &amp; Signed
            </span>
            <h2 className="text-lg font-bold text-[#002941] mt-0.5">
              {shiftName} Attendance Summary
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-[#DFECF3]">
              <span className="text-[10px] font-bold text-[#566E7F] uppercase">
                Present
              </span>
              <p className="text-lg font-extrabold text-[#184E46] tabular-nums">
                {presentCount}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#DFECF3]">
              <span className="text-[10px] font-bold text-[#566E7F] uppercase">
                Absent
              </span>
              <p className="text-lg font-extrabold text-[#AB1B1B] tabular-nums">
                {absentCount}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#DFECF3]">
              <span className="text-[10px] font-bold text-[#566E7F] uppercase">
                Half-Day
              </span>
              <p className="text-lg font-extrabold text-[#002941] tabular-nums">
                {halfDayCount}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DFECF3] space-y-1 text-xs text-[#566E7F]">
            <div className="flex justify-between">
              <span>Biometric Passlink Signature:</span>
              <span className="font-bold text-[#002941]">{supervisorName}</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="font-bold text-[#002941]">
                {lockedTimestamp} IST
              </span>
            </div>
            <div className="flex justify-between">
              <span>Synced to Owner App:</span>
              <span className="font-bold text-[#2D8576]">Yes (Live)</span>
            </div>
          </div>
        </div>

        <PillButton
          type="button"
          variant="secondary"
          size="md"
          onClick={() => setFlowStep("edit")}
          className="w-full justify-center font-bold"
        >
          Modify / Make Exception Corrections
        </PillButton>
      </div>
    );
  }

  if (flowStep === "review") {
    return (
      <div className="bg-white rounded-3xl border border-[#DFECF3] p-5 sm:p-7 shadow-sm space-y-5 max-w-2xl mx-auto animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFECF3]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#002941] text-[#CFE8E1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                rate_review
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#002941]">
                Review Shift Attendance
              </h2>
              <p className="text-xs text-[#566E7F]">
                Prevent accidental saves — verify all exceptions
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#184E46] bg-[#CFE8E1] px-2.5 py-1 rounded-full">
            Review Step
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-3 text-xs">
          <div className="flex justify-between font-bold text-[#002941]">
            <span>Total Expected Workforce:</span>
            <span className="tabular-nums">{roster.length} Operators</span>
          </div>
          <div className="flex justify-between text-[#184E46] font-semibold">
            <span>Marked Present:</span>
            <span className="tabular-nums">{presentCount} Operators</span>
          </div>

          {absentCount > 0 && (
            <div className="p-3 rounded-xl bg-[#FFF4F3] border border-[#FFD0CC] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#AB1B1B]">
                Absent Exceptions
              </span>
              {roster
                .filter((r) => r.status === "absent")
                .map((r) => (
                  <p key={r.id} className="font-semibold text-[#AB1B1B]">
                    • {r.name} ({r.station}) — Reliever required
                  </p>
                ))}
            </div>
          )}

          {halfDayCount > 0 && (
            <div className="p-3 rounded-xl bg-[#FFF9EE] border border-[#FFE0A3] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#9A6200]">
                Half-Day / Partial Shift
              </span>
              {roster
                .filter((r) => r.status === "half_day")
                .map((r) => (
                  <p key={r.id} className="font-semibold text-[#9A6200]">
                    • {r.name} ({r.station})
                  </p>
                ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <PillButton
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setFlowStep("edit")}
            className="text-xs font-bold"
          >
            ← Back to Roster
          </PillButton>

          <PillButton
            type="button"
            variant="mintGradient"
            size="md"
            onClick={handleConfirmLock}
            icon={
              <span className="material-symbols-outlined text-[19px]">
                verified
              </span>
            }
            className="flex-1 justify-center font-bold"
          >
            Confirm &amp; Lock Attendance
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#DFECF3] p-4 sm:p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFECF3]">
        <div>
          <h2 className="text-base font-bold text-[#002941]">
            {shiftName} Attendance Roster
          </h2>
          <p className="text-xs text-[#566E7F]">
            {presentCount} of {roster.length} present • {absentCount} exceptions
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllPresent}
          className="px-3.5 py-1.5 rounded-full bg-[#E4F4F0] border border-[#CFE8E1] text-[#184E46] text-xs font-bold hover:bg-[#CFE8E1] transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[16px] text-[#2D8576]">
            done_all
          </span>
          <span>Mark All Present</span>
        </button>
      </div>

      <div className="space-y-2">
        {roster.map((worker) => (
          <div
            key={worker.id}
            className="p-3 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-[#002941]">
                  {worker.name}
                </p>
                <span className="text-[10px] font-semibold text-[#8DA1AF]">
                  {worker.code}
                </span>
              </div>
              <p className="text-[11px] text-[#566E7F] mt-0.5">
                {worker.station}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DFECF3] shrink-0">
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, "present")}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === "present"
                    ? "bg-[#2D8576] text-white shadow-2xs"
                    : "text-[#566E7F] hover:bg-[#F0F5F9]"
                }`}
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, "absent")}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === "absent"
                    ? "bg-[#FD6E6E] text-white shadow-2xs"
                    : "text-[#566E7F] hover:bg-[#F0F5F9]"
                }`}
              >
                Absent
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(worker.id, "half_day")}
                className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition select-none cursor-pointer ${
                  worker.status === "half_day"
                    ? "bg-[#002941] text-white shadow-2xs"
                    : "text-[#566E7F] hover:bg-[#F0F5F9]"
                }`}
              >
                Half-Day
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <PillButton
          type="button"
          variant="primary"
          size="lg"
          onClick={() => setFlowStep("review")}
          icon={
            <span className="material-symbols-outlined text-[19px]">
              rate_review
            </span>
          }
          iconPosition="right"
          className="w-full justify-center font-bold"
        >
          Review &amp; Sign Attendance
        </PillButton>
      </div>
    </div>
  );
};

export default WorkbenchAttendance;
