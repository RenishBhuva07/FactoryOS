import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  WorkbenchHeader,
  WorkbenchOutputEntry,
  WorkbenchAttendance,
  WorkbenchMachineIssue,
  WorkbenchHandover,
  OfflineQueueModal,
} from "./components";
import { SegmentedPillNav } from "../../components/common";
import { useAuth, useOnboarding, useFactoryStore } from "../../context";
import type {
  OutputSubmission,
  WorkbenchJobItem,
} from "./components/WorkbenchOutputEntry";
import type { AttendanceRecord } from "./components/WorkbenchAttendance";
import type { MachineIssueReport } from "./components/WorkbenchMachineIssue";

export const WorkbenchPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const {
    orderExecutions,
    machines,
    offlineQueue,
    logProduction,
    syncOfflineQueue,
    reportMachineIssue,
    bulkMarkAttendance,
  } = useFactoryStore();

  const [activeTab, setActiveTab] = useState("production");
  const [isOffline, setIsOffline] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "gu" | "hi">("en");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const matchedSupervisor = onboardingState.supervisors.find((s) => {
    if (!slug) return false;
    const cleanSlug = slug.toLowerCase();
    return (
      s.id.toLowerCase() === cleanSlug ||
      s.passlink.toLowerCase().includes(cleanSlug) ||
      s.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .includes(cleanSlug)
    );
  });

  const supervisorName =
    matchedSupervisor?.name ||
    onboardingState.supervisors[0]?.name ||
    user?.name ||
    "Ramesh Bhai";

  const shiftLabel =
    matchedSupervisor?.roleLabel ||
    matchedSupervisor?.shiftBadge ||
    "Shift A (08:00 - 16:30)";

  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    "Apex Engineering Works";

  const jobsList: WorkbenchJobItem[] = orderExecutions
    .slice(0, 5)
    .map((exec) => ({
      id: exec.id,
      po: exec.poNumber,
      part: exec.partDescription,
      line: exec.assignedLine,
      target: exec.quantityUnits,
      current: Math.round(
        exec.quantityUnits *
          (exec.fulfillmentStage === "machining" ? 0.6 : 0.2),
      ),
    }));

  const machineNames = machines.map((m) => `${m.name} (${m.code})`);

  const handleToggleOffline = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);

    if (!nextState && offlineQueue.length > 0) {
      const syncedCount = syncOfflineQueue();
      showToast(
        `Back online! Synchronized ${syncedCount} cached slips to plant server.`,
      );
    } else {
      showToast(
        nextState
          ? "Offline mode enabled. Slips will queue in local storage."
          : "Connected to live cloud stream.",
      );
    }
  };

  const handleProductionSubmit = (entry: OutputSubmission) => {
    const result = logProduction({
      jobCard: entry.jobCard,
      machine: entry.machine,
      goodUnits: entry.goodUnits,
      scrapUnits: entry.scrapUnits,
      defectReason: entry.defectReason,
      notes: entry.notes,
      operatorName: supervisorName,
      isOffline,
    });

    if (result.queuedOffline) {
      showToast(
        `Offline slip queued locally (${entry.goodUnits} pcs on ${entry.machine}).`,
      );
    } else {
      showToast(
        `Logged ${entry.goodUnits} pcs on ${entry.machine} — Telemetry updated!`,
      );
    }
  };

  const handleAttendanceSave = (roster: AttendanceRecord[]) => {
    bulkMarkAttendance("on_spindle");
    const absentWorkers = roster.filter((r) => r.status === "absent");
    if (absentWorkers.length > 0) {
      showToast(
        `Attendance verified: ${roster.length - absentWorkers.length} present, ${absentWorkers.length} absent.`,
      );
    } else {
      showToast(`Full workforce verified: ${roster.length} present.`);
    }
  };

  const handleMachineIssueSubmit = (issue: MachineIssueReport): string => {
    const matchedMachine = machines.find(
      (m) => issue.machine.includes(m.name) || issue.machine.includes(m.code),
    );
    const machineId = matchedMachine ? matchedMachine.id : "ws-m01";

    const ticketId = reportMachineIssue({
      machineId,
      category: issue.category,
      severity: issue.severity === "urgent" ? "critical" : "minor",
      description: issue.description,
      reportedBy: supervisorName,
    });

    showToast(`Urgent alert dispatched to Owner Overview! Ticket #${ticketId}`);
    return ticketId;
  };

  const WORKBENCH_TABS = [
    {
      id: "production",
      label:
        lang === "gu"
          ? "ઉત્પાદન નોંધો"
          : lang === "hi"
            ? "उत्पादन दर्ज करें"
            : "Log Output",
      icon: "add_task",
    },
    {
      id: "attendance",
      label:
        lang === "gu" ? "હાજરી" : lang === "hi" ? "उपस्थिति" : "Attendance",
      icon: "groups",
    },
    {
      id: "issue",
      label:
        lang === "gu"
          ? "મશીન ખામી"
          : lang === "hi"
            ? "मશીન સમસ્યા"
            : "Report Issue",
      icon: "warning",
    },
    {
      id: "handover",
      label:
        lang === "gu"
          ? "શિફ્ટ હેન્ડઓવર"
          : lang === "hi"
            ? "हैंडओवर स्लिप"
            : "Handover",
      icon: "assignment_turned_in",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col font-sans text-[#002941] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#002941] text-white shadow-xl animate-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-[19px] text-[#CFE8E1]">
            check_circle
          </span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <WorkbenchHeader
        supervisorName={supervisorName}
        shiftLabel={shiftLabel}
        factoryName={factoryName}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        lang={lang}
        onLanguageChange={setLang}
        offlineQueueCount={offlineQueue.length}
        onOpenOfflineQueue={() => setIsQueueModalOpen(true)}
      />

      {/* Persistent Offline Sync Banner */}
      {isOffline && (
        <div className="w-full bg-[#FFF4F3] border-b border-[#FFD0CC] px-4 py-2 text-xs text-[#871919] flex items-center justify-between shadow-2xs">
          <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[17px] text-[#FD6E6E]">
                cloud_off
              </span>
              <span>Offline Mode: Slips are saving to local memory.</span>
            </span>
            <button
              type="button"
              onClick={() => setIsQueueModalOpen(true)}
              className="text-[11px] font-bold underline hover:text-[#002941] cursor-pointer"
            >
              {offlineQueue.length} Pending Slip
              {offlineQueue.length === 1 ? "" : "s"} (View Queue)
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-4 flex flex-col">
        {/* Quick Mode Pill Selector */}
        <div className="flex justify-center overflow-x-auto py-1">
          <SegmentedPillNav
            items={WORKBENCH_TABS}
            activeId={activeTab}
            onChange={setActiveTab}
            variant="white"
          />
        </div>

        {/* Action Panel */}
        <div className="flex-1">
          {activeTab === "production" && (
            <WorkbenchOutputEntry
              onSubmit={handleProductionSubmit}
              jobs={jobsList}
              lang={lang}
            />
          )}

          {activeTab === "attendance" && (
            <WorkbenchAttendance
              onSave={handleAttendanceSave}
              supervisorName={supervisorName}
              shiftName={shiftLabel.split(" ")[0]}
            />
          )}

          {activeTab === "issue" && (
            <WorkbenchMachineIssue
              onSubmit={handleMachineIssueSubmit}
              machines={machineNames}
              onReturnToProduction={() => setActiveTab("production")}
            />
          )}

          {activeTab === "handover" && (
            <WorkbenchHandover
              onSignOff={() =>
                showToast(
                  "Shift handover signed & archived to management registry.",
                )
              }
            />
          )}
        </div>
      </main>

      {/* Offline Queue Inspector Modal */}
      <OfflineQueueModal
        isOpen={isQueueModalOpen}
        onClose={() => setIsQueueModalOpen(false)}
        queue={offlineQueue}
        onSync={() => {
          const synced = syncOfflineQueue();
          showToast(
            `Successfully synchronized ${synced} slips to plant server!`,
          );
        }}
      />
    </div>
  );
};

export default WorkbenchPage;
