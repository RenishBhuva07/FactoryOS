import React, { useState } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  ProductionLogsHeader,
  ProductionLogsFilterBar,
  ProductionLogsFeed,
  SupervisorSignOffsCard,
  ScrapBreakdownCard,
} from "./components";
import { ManualBatchSlipModal } from "../production/components/ManualBatchSlipModal";
import {
  MOCK_SUPERVISOR_SIGN_OFFS,
  MOCK_SCRAP_BREAKDOWN,
} from "../../data/mockProductionData";
import { useFactoryStore } from "../../context/useFactoryStore";
import { downloadCsv } from "../../utils/csvExport";
import type { ProductionLogEntry } from "../../types/production";

export const ProductionLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("shift-a");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(
    "All Machines (8 Units)",
  );
  const [selectedShift, setSelectedShift] = useState("Shift A (08:00 - 16:30)");
  const [isNewSlipModalOpen, setIsNewSlipModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { productionLogs, logProduction } = useFactoryStore();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const filteredLogs = productionLogs.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.jobCard.toLowerCase().includes(q) ||
      log.machineName.toLowerCase().includes(q) ||
      log.partName.toLowerCase().includes(q) ||
      log.operatorName.toLowerCase().includes(q);
    return matchesSearch;
  });

  const handleDownloadAuditLogs = () => {
    const csvHeaders = [
      "Shift",
      "Cycle Time",
      "Job Card",
      "Part Name",
      "Machine",
      "Operator",
      "Output Units",
      "Scrap Units",
      "Scrap Reason",
      "Verified By",
    ];
    const csvRows = filteredLogs.map((l) => [
      l.shift,
      l.cycleTime,
      l.jobCard,
      l.partName,
      l.machineName,
      l.operatorName,
      String(l.outputUnits),
      String(l.scrapUnits),
      l.scrapReason || "None",
      l.verifiedBy || "Pending",
    ]);
    downloadCsv("FactoryOS_Production_Audit_Logs.csv", csvHeaders, csvRows);
    showToast(
      `Audit logs exported to CSV (${filteredLogs.length} verified records).`,
    );
  };

  const handleNewBatchSubmit = (batch: {
    sectionMachine: string;
    jobCardNumber: string;
    targetUnits: number;
    goodUnits: number;
    scrapUnits: number;
    defectReason: string;
    operatorNotes: string;
  }) => {
    logProduction({
      jobCard: batch.jobCardNumber,
      machine: batch.sectionMachine,
      goodUnits: batch.goodUnits,
      scrapUnits: batch.scrapUnits,
      defectReason: batch.defectReason,
      operatorName: "Floor Supervisor (Manual)",
      notes: batch.operatorNotes,
    });
    showToast(
      `Production slip logged for ${batch.jobCardNumber}: ${batch.goodUnits} units recorded.`,
    );
  };

  const handleLogClick = (log: ProductionLogEntry) => {
    showToast(
      `Viewing digital shift slip: ${log.machineName} - ${log.jobCard} (${log.outputUnits} units output).`,
    );
  };

  const logTabs = [
    {
      id: "shift-a",
      label: "Shift A Logs",
      badge: String(filteredLogs.length),
    },
    { id: "handovers", label: "Supervisor Sign-Offs", badge: "2" },
    { id: "scraplog", label: "Scrap Register" },
    { id: "audit", label: "Audit Trail" },
  ];

  return (
    <>
      <AppTopHeader
        tabs={logTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="SHIFT LOGS"
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

        <ProductionLogsHeader
          onDownloadAuditLogs={handleDownloadAuditLogs}
          onNewLogEntry={() => setIsNewSlipModalOpen(true)}
        />

        <ProductionLogsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedMachine={selectedMachine}
          onMachineChange={setSelectedMachine}
          selectedShift={selectedShift}
          onShiftChange={setSelectedShift}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ProductionLogsFeed
              logs={filteredLogs}
              onLogClick={handleLogClick}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <SupervisorSignOffsCard signOffs={MOCK_SUPERVISOR_SIGN_OFFS} />
            <ScrapBreakdownCard breakdowns={MOCK_SCRAP_BREAKDOWN} />
          </div>
        </div>
      </main>

      <ManualBatchSlipModal
        isOpen={isNewSlipModalOpen}
        onClose={() => setIsNewSlipModalOpen(false)}
        onSubmit={handleNewBatchSubmit}
      />
    </>
  );
};

export default ProductionLogsPage;
