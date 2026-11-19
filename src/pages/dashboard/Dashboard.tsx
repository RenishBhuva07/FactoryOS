import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardHeader,
  FactoryKpiGrid,
  HourlyOutputChartCard,
  AttentionAlertsCard,
  ManagerActivityFeedCard,
  DelayedJobDetailDrawer,
} from "./components";
import { PillButton } from "../../components/common";
import {
  useAuth,
  useOnboarding,
  useLayout,
  useFactoryStore,
} from "../../context";
import type { AttentionAlertItem } from "../../types/dashboard";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const { toggleWhatsAppDigest, toggleSearch } = useLayout();
  const [activeTab, setActiveTab] = useState("overview");

  const {
    factoryOutput,
    workforceAttendance,
    activeOrdersKpi,
    machineStatusKpi,
    hourlyOutput,
    attentionAlerts,
    managerActivities,
    orders,
    resolveAlert,
    resolveMachineMaintenance,
    updateOrderStatus,
    adjustStock,
  } = useFactoryStore();

  const [selectedAlert, setSelectedAlert] = useState<AttentionAlertItem | null>(
    null,
  );
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const proprietorName =
    user?.name ||
    onboardingState.businessDetails.proprietorName ||
    "Rajesh Bhai Patel";
  const firstName = proprietorName.split(" ")[0];
  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    "Apex Engineering Works";

  const matchingOrder = orders.find(
    (o) =>
      selectedAlert &&
      (selectedAlert.title.includes(o.poNumber) ||
        selectedAlert.description.includes(o.poNumber) ||
        selectedAlert.id.includes(o.id)),
  );

  const handleSelectAlert = (alert: AttentionAlertItem) => {
    setSelectedAlert(alert);
    setIsAlertDrawerOpen(true);
  };

  const handlePrimaryAlertAction = (alertId: string) => {
    const alert = attentionAlerts.find((a) => a.id === alertId);
    if (!alert) return;

    if (
      alert.id.includes("1") ||
      alert.id.includes("Lathe") ||
      alert.id.includes("TKT")
    ) {
      resolveMachineMaintenance("ws-m04");
      resolveAlert(alertId);
      showToast(
        "Lathe #04 Maintenance marked completed. Workstation resumed to active fleet.",
      );
    } else if (
      alert.id.includes("2") ||
      alert.id.includes("EN8") ||
      alert.id.includes("1039")
    ) {
      adjustStock("inv-01", 350, "Emergency PO consignment received");
      resolveAlert(alertId);
      showToast(
        "Emergency raw material PO generated (₹32,000). Stock allocated to Shift B.",
      );
    } else if (
      alert.id.includes("3") ||
      alert.id.includes("1042") ||
      alert.id.includes("ORD")
    ) {
      updateOrderStatus("ord-1042", "ready_for_dispatch", 100);
      resolveAlert(alertId);
      showToast(
        "Order #ORD-1042 Fast-Track QC approved. Staged for outbound dispatch.",
      );
    } else {
      resolveAlert(alertId);
      showToast(`Action executed: ${alert.title} resolved.`);
    }
  };

  const handleSecondaryAlertAction = (alertId: string) => {
    const alert = attentionAlerts.find((a) => a.id === alertId);
    if (alert) {
      setSelectedAlert(alert);
      setIsAlertDrawerOpen(true);
    }
  };

  const handleDrawerAllocateStock = () => {
    adjustStock("inv-01", 280, "Alternative EN8 20mm stock allocated to job");
    if (selectedAlert) {
      resolveAlert(selectedAlert.id);
    }
    showToast(
      "Alternative EN8 stock allocated to PO #ORD-1039. Machining resumed on Line 02.",
    );
  };

  const handleDrawerFastTrackQc = () => {
    updateOrderStatus("ord-1042", "ready_for_dispatch", 100);
    if (selectedAlert) {
      resolveAlert(selectedAlert.id);
    }
    showToast(
      "Fast-Track QC cleared for PO #ORD-1042. Consignment staged at Loading Bay.",
    );
  };

  const handleDrawerResolve = (alertId: string) => {
    resolveAlert(alertId);
    showToast("Alert resolved and removed from Overview.");
  };

  return (
    <>
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        brandName="FactoryOS"
      />

      <main className="flex-1 min-w-0 pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3 sm:py-3.5 space-y-3.5 w-full flex flex-col">
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#002941] text-white shadow-xl animate-in slide-in-from-bottom-5">
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

        {/* Welcome & Fast Actions Banner */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-white border border-[#DFECF3] rounded-3xl p-4 sm:p-5 shadow-2xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#002941]">
                Good morning, {firstName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E4F4F0] text-[#184E46] text-[10.5px] font-bold border border-[#CFE8E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D8576] animate-pulse" />
                Shift A Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#566E7F]">
              Live operational telemetry for{" "}
              <span className="font-semibold text-[#002941]">
                {factoryName}
              </span>{" "}
              • Udyam registered
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <PillButton
              variant="ghost"
              size="sm"
              icon={
                <span className="material-symbols-outlined text-[17px] text-[#128C7E]">
                  chat
                </span>
              }
              onClick={toggleWhatsAppDigest}
              className="text-xs font-bold"
            >
              9:00 PM WhatsApp Digest
            </PillButton>

            <PillButton
              variant="primary"
              size="sm"
              icon={
                <span className="material-symbols-outlined text-[17px]">
                  smartphone
                </span>
              }
              onClick={() => navigate("/workbench")}
              className="text-xs font-bold"
            >
              Supervisor Workbench
            </PillButton>

            <button
              type="button"
              onClick={toggleSearch}
              title="Quick Search (Cmd+K)"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F5F9] hover:bg-[#E4F4F0] border border-[#DFECF3] text-xs text-[#566E7F] hover:text-[#002941] transition"
            >
              <span className="material-symbols-outlined text-[16px]">
                search
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>
        </section>

        {/* 4 Core KPIs */}
        <FactoryKpiGrid
          output={factoryOutput}
          attendance={workforceAttendance}
          orders={activeOrdersKpi}
          machineStatus={machineStatusKpi}
          onNavigateOutput={() => navigate("/production")}
          onNavigateRoster={() => navigate("/team")}
          onNavigateOrders={() => navigate("/orders")}
          onNavigateMachines={() => navigate("/machines")}
        />

        {/* Dynamic Lens Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <HourlyOutputChartCard data={hourlyOutput} />
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
              <AttentionAlertsCard
                alerts={attentionAlerts}
                onSelectAlert={handleSelectAlert}
                onPrimaryAction={handlePrimaryAlertAction}
                onSecondaryAction={handleSecondaryAlertAction}
              />
              <ManagerActivityFeedCard activities={managerActivities} />
            </div>
          </div>
        )}

        {activeTab === "production" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-8 flex flex-col space-y-3.5">
              <HourlyOutputChartCard data={hourlyOutput} />
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#002941]">
                    Active Assembly Lines (Line 01 &amp; Line 02)
                  </h3>
                  <p className="text-xs text-[#566E7F]">
                    Current production run: Valve Guides &amp; Spindle Shafts
                  </p>
                </div>
                <PillButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/production")}
                >
                  Manage Floor Lines
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <ManagerActivityFeedCard activities={managerActivities} />
            </div>
          </div>
        )}

        {activeTab === "orders_risk" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-7 flex flex-col">
              <AttentionAlertsCard
                alerts={attentionAlerts}
                onSelectAlert={handleSelectAlert}
                onPrimaryAction={handlePrimaryAlertAction}
                onSecondaryAction={handleSecondaryAlertAction}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">
                    At-Risk Purchase Orders
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FD6E6E]/15 text-[#AB1B1B] text-[10px] font-bold">
                    {attentionAlerts.length} Active Alerts
                  </span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  Orders requiring immediate procurement or QC intervention to
                  preserve promised delivery commitments.
                </p>
                <div className="pt-2 flex gap-2">
                  <PillButton
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/orders")}
                    className="w-full text-xs"
                  >
                    View Orders Hub
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workforce" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">
                    Floor Attendance &amp; Shifts
                  </h3>
                  <span className="text-xs font-bold text-[#2D8576]">
                    {workforceAttendance.present} / {workforceAttendance.total}{" "}
                    Present
                  </span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  {workforceAttendance.absent} operators absent in active shift.
                  Reliever allocation available from roster.
                </p>
                <PillButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/team")}
                  className="w-full text-xs"
                >
                  Open Team Roster &amp; Biometric Audit
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">
                    Spindle Fleet Health
                  </h3>
                  <span className="text-xs font-bold text-[#AB1B1B]">
                    {machineStatusKpi.operational} / {machineStatusKpi.total}{" "}
                    Operational
                  </span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  {machineStatusKpi.maintenanceNote}
                </p>
                <PillButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/machines")}
                  className="w-full text-xs"
                >
                  View Machine Fleet
                </PillButton>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delayed Job Detail Drawer */}
      <DelayedJobDetailDrawer
        isOpen={isAlertDrawerOpen}
        onClose={() => setIsAlertDrawerOpen(false)}
        alert={selectedAlert}
        matchingOrder={matchingOrder}
        onAllocateStock={handleDrawerAllocateStock}
        onFastTrackQc={handleDrawerFastTrackQc}
        onResolveAlert={handleDrawerResolve}
      />
    </>
  );
};

export { Dashboard as DashboardPage };
export default Dashboard;
