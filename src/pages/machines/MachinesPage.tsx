import React, { useState } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  MachinesHeader,
  MachinesKpiStrip,
  WorkstationsGrid,
  SecondaryFleetGrid,
  PreventativeMaintenanceTable,
  SupervisorMachineLogCard,
  LogMachineStatusModal,
} from "./components";
import {
  MOCK_MACHINES_KPIS,
  MOCK_SECONDARY_MACHINES,
  MOCK_MAINTENANCE_TASKS,
  MOCK_SUPERVISOR_MACHINE_LOGS,
} from "../../data/mockMachinesData";
import { useFactoryStore } from "../../context/useFactoryStore";
import { downloadCsv } from "../../utils/csvExport";
import type {
  WorkstationMachine,
  SecondaryMachine,
} from "../../types/machines";

export const MachinesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("fleet");
  const [secondaryMachines] = useState<SecondaryMachine[]>(
    MOCK_SECONDARY_MACHINES,
  );
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [filterMaintenanceOnly, setFilterMaintenanceOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    machines,
    secondaryMachines: storeSecondary,
    reportMachineIssue,
    resolveMachineMaintenance,
  } = useFactoryStore();

  const primaryMachines = machines.length > 0 ? machines : [];
  const secondaryList =
    storeSecondary && storeSecondary.length > 0
      ? storeSecondary
      : secondaryMachines;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleMachineStatusSubmit = (data: {
    machineId: string;
    action: "breakdown" | "service_complete";
    category: string;
    technician: string;
    downtimeMinutes: number;
    notes: string;
  }) => {
    const isBreakdown = data.action === "breakdown";

    if (isBreakdown) {
      reportMachineIssue({
        machineId: data.machineId,
        category: data.category,
        severity: "critical",
        description:
          data.notes || "Workstation breakdown reported by floor technician.",
        reportedBy: data.technician,
        downtimeMinutes: data.downtimeMinutes,
      });
      showToast(
        `Breakdown ticket logged: Workstation switched to Down for Maintenance (${data.downtimeMinutes}m estimated).`,
      );
    } else {
      resolveMachineMaintenance(data.machineId, data.notes);
      showToast(`Workstation returned to Active Operational Fleet.`);
    }
  };

  const handleWorkstationAction = (ws: WorkstationMachine) => {
    if (ws.status === "maintenance") {
      resolveMachineMaintenance(
        ws.id,
        "Routine maintenance checklist completed by supervisor.",
      );
      showToast(
        `Maintenance resolved for ${ws.name}: Spindle restored to Operational status.`,
      );
    } else {
      showToast(`Job Slip generated for ${ws.name} (${ws.currentJobOrTask}).`);
    }
  };

  const handleSecondaryMachineClick = (m: SecondaryMachine) => {
    showToast(
      `Machine ${m.code} (${m.name}): Operator ${m.operator}, Uptime ${m.uptimeToday}.`,
    );
  };

  const handleDownloadMachineReport = () => {
    const headers = [
      "Machine Code",
      "Name",
      "Category",
      "Status",
      "Current Job",
      "Hours",
      "Operator / Tech",
    ];
    const rows = primaryMachines.map((m) => [
      m.code,
      m.name,
      m.category,
      m.statusLabel,
      m.currentJobOrTask,
      m.operatingHours,
      m.operatorOrTech,
    ]);
    downloadCsv("FactoryOS_Machine_Fleet_Status.csv", headers, rows);
    showToast(
      `Machine fleet status report exported to CSV (${primaryMachines.length} units).`,
    );
  };

  const operationalCount = primaryMachines.filter(
    (m) => m.status === "operational",
  ).length;
  const maintenanceCount = primaryMachines.filter(
    (m) => m.status === "maintenance",
  ).length;
  const totalFleet = Math.max(1, primaryMachines.length);
  const availabilityPercent =
    Math.round((operationalCount / totalFleet) * 100 * 10) / 10;

  const dynamicKpis = {
    ...MOCK_MACHINES_KPIS,
    operationalFleetCount: operationalCount,
    maintenanceCount: maintenanceCount,
    fleetAvailabilityPercent: availabilityPercent,
  };

  const displayedPrimary = filterMaintenanceOnly
    ? primaryMachines.filter((m) => m.status === "maintenance")
    : primaryMachines;

  const machineTabs = [
    {
      id: "fleet",
      label: "Fleet Roster",
      badge: `${primaryMachines.length} Units`,
    },
    {
      id: "secondary",
      label: "Secondary Line",
      badge: String(secondaryList.length),
    },
    {
      id: "maintenance",
      label: "Maintenance Schedule",
      badge: String(maintenanceCount),
    },
    { id: "tickets", label: "Breakdown Tickets" },
  ];

  return (
    <>
      <AppTopHeader
        tabs={machineTabs}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setFilterMaintenanceOnly(false);
        }}
        roleBadge="FLEET & PM"
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

        <MachinesHeader
          onFilterType={() =>
            showToast("Filtered by CNC, Conventional Lathes, and Milling.")
          }
          onLogMachineStatus={() => setIsStatusModalOpen(true)}
        />

        <MachinesKpiStrip
          metrics={dynamicKpis}
          onFilterMaintenance={() => {
            setFilterMaintenanceOnly((prev) => !prev);
            showToast(
              !filterMaintenanceOnly
                ? `Filtered: Showing ${maintenanceCount} workstation(s) requiring maintenance.`
                : "Showing full workstation fleet.",
            );
          }}
        />

        {activeTab === "fleet" && (
          <>
            <WorkstationsGrid
              workstations={displayedPrimary}
              onActionClick={handleWorkstationAction}
            />
            <SecondaryFleetGrid
              machines={secondaryList}
              onMachineClick={handleSecondaryMachineClick}
            />
          </>
        )}

        {activeTab === "secondary" && (
          <SecondaryFleetGrid
            machines={secondaryList}
            onMachineClick={handleSecondaryMachineClick}
          />
        )}

        {(activeTab === "maintenance" ||
          activeTab === "tickets" ||
          activeTab === "fleet") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-8 flex flex-col">
              <PreventativeMaintenanceTable
                tasks={MOCK_MAINTENANCE_TASKS}
                onViewMonthlyPlan={() =>
                  showToast("Monthly Preventative Maintenance Plan opened.")
                }
              />
            </div>

            <div className="lg:col-span-4 flex flex-col">
              <SupervisorMachineLogCard
                logs={MOCK_SUPERVISOR_MACHINE_LOGS}
                onNewTicket={() => setIsStatusModalOpen(true)}
                onDownloadReport={handleDownloadMachineReport}
              />
            </div>
          </div>
        )}

        <LogMachineStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          workstations={primaryMachines}
          onSubmit={handleMachineStatusSubmit}
        />
      </main>
    </>
  );
};

export default MachinesPage;
