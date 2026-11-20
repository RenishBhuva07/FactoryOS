import React, { useState, useMemo } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  TeamHeader,
  TeamKpiGrid,
  ShopfloorRosterTable,
  StationCoverageCard,
  ManualPunchModal,
} from "./components";
import { MOCK_TEAM_KPIS, MOCK_STATION_COVERAGE } from "../../data/mockTeamData";
import { useFactoryStore } from "../../context/useFactoryStore";
import { downloadCsv } from "../../utils/csvExport";
import type { TeamMemberRoster, TeamAttendanceKpis } from "../../types/team";

export const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("roster");
  const [isPunchModalOpen, setIsPunchModalOpen] = useState(false);
  const [filterOnlyAbsent, setFilterOnlyAbsent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { attendanceRoster, workforceAttendance, updateAttendance } =
    useFactoryStore();

  const displayedRoster = useMemo(() => {
    let result = attendanceRoster;
    if (filterOnlyAbsent) {
      result = result.filter((m) => m.status === "absent");
    } else if (activeTab === "coverage") {
      result = result.filter((m) => m.status === "on_spindle");
    } else if (activeTab === "overtime") {
      result = result.filter((m) => m.status === "overtime");
    }
    return result;
  }, [attendanceRoster, activeTab, filterOnlyAbsent]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleManualPunchSubmit = (data: {
    memberId: string;
    punchType: "present" | "overtime" | "reliever" | "half_day";
    station: string;
    notes: string;
  }) => {
    const statusToStore =
      data.punchType === "overtime"
        ? ("overtime" as const)
        : data.punchType === "half_day"
          ? ("on_break" as const)
          : ("on_spindle" as const);

    updateAttendance(data.memberId, statusToStore, data.station);
    showToast(
      `Biometric punch overridden: Operator assigned to ${data.station || "duty station"}.`,
    );
  };

  const handleExportRoster = () => {
    const headers = [
      "Name",
      "Role",
      "Assigned Station",
      "Shift",
      "Punch-in Time",
      "Status",
    ];
    const rows = attendanceRoster.map((m) => [
      m.name,
      m.role,
      m.assignedStation,
      m.shift,
      m.punchInTime,
      m.statusLabel,
    ]);
    downloadCsv("FactoryOS_Shift_Attendance_Roster.csv", headers, rows);
    showToast(
      `Attendance roster exported to CSV (${attendanceRoster.length} active operators).`,
    );
  };

  const handleAction = (member: TeamMemberRoster) => {
    showToast(
      `Station logs opened for ${member.name} (${member.assignedStation}).`,
    );
  };

  const calculatedPresentPercent =
    Math.round(
      (workforceAttendance.present / Math.max(1, workforceAttendance.total)) *
        100 *
        10,
    ) / 10;

  const dynamicTeamKpis: TeamAttendanceKpis = {
    ...MOCK_TEAM_KPIS,
    presentCount: workforceAttendance.present,
    totalShiftCount: workforceAttendance.total,
    presentPercent: calculatedPresentPercent,
    criticalStationAbsenceCount: workforceAttendance.absent,
    criticalStationDetail:
      workforceAttendance.absent > 0
        ? `${workforceAttendance.absent} operators absent or on leave`
        : "All designated stations fully manned",
  };

  const teamTabs = [
    {
      id: "roster",
      label: "Shift A Roster",
      badge: String(attendanceRoster.length),
    },
    { id: "coverage", label: "Station Coverage" },
    { id: "biometric", label: "Biometric Audit" },
    { id: "overtime", label: "Overtime Register" },
  ];

  return (
    <>
      <AppTopHeader
        tabs={teamTabs}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setFilterOnlyAbsent(false);
        }}
        roleBadge="WORKFORCE"
      />

      <main className="flex-1 min-w-0 pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3 sm:py-3.5 space-y-3.5 w-full flex flex-col">
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#002941] text-white shadow-lg animate-in slide-in-from-bottom-5">
            <span className="material-symbols-outlined text-[20px] text-[#CFE8E1]">
              check_circle
            </span>
            <span className="text-xs sm:text-sm font-medium">
              {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          </div>
        )}

        <TeamHeader
          onExportRoster={handleExportRoster}
          onManualPunch={() => setIsPunchModalOpen(true)}
        />

        <TeamKpiGrid
          metrics={dynamicTeamKpis}
          onFilterAbsent={() => {
            setFilterOnlyAbsent((prev) => !prev);
            showToast(
              !filterOnlyAbsent
                ? `Filtered: Showing ${workforceAttendance.absent} absent operators requiring relief allocation.`
                : "Showing full roster.",
            );
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ShopfloorRosterTable
              roster={displayedRoster}
              onAction={handleAction}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <StationCoverageCard coverages={MOCK_STATION_COVERAGE} />
          </div>
        </div>

        <ManualPunchModal
          isOpen={isPunchModalOpen}
          onClose={() => setIsPunchModalOpen(false)}
          roster={attendanceRoster}
          onSubmit={handleManualPunchSubmit}
        />
      </main>
    </>
  );
};

export default TeamPage;
