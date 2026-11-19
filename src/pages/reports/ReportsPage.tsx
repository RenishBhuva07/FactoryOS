import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTopHeader } from "../../components/layout";
import {
  ReportsHeader,
  ReportsKpiGrid,
  OeeTrendCard,
  ShiftEfficiencyCard,
  OutputVsTargetCard,
  DefectRootCausesCard,
  GeneratedReportsTable,
} from "./components";
import {
  MOCK_REPORTS_KPIS,
  MOCK_OEE_TREND,
  MOCK_SHIFT_EFFICIENCIES,
  MOCK_OUTPUT_VS_TARGET,
  MOCK_DEFECT_ROOT_CAUSES,
  MOCK_GENERATED_REPORTS,
} from "../../data/mockReportsData";
import { useFactoryStore } from "../../context";
import type { GeneratedReportItem } from "../../types/reports";

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { factoryOutput, machineStatusKpi } = useFactoryStore();

  const [activeTab, setActiveTab] = useState("analytics");
  const [timeframe, setTimeframe] = useState<"realtime" | "weekly" | "monthly">(
    "weekly",
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExport = () => {
    const headers = [
      "Report Category",
      "Actual Metric",
      "Target / Benchmark",
      "Operational Status",
    ];
    const rows = [
      ["Plant Overall OEE", "88.4%", "85.0%", "Optimal Performance"],
      [
        "Equipment Spindle Availability",
        `${machineStatusKpi.operational} / ${machineStatusKpi.total} Active`,
        "100% Fleet Target",
        machineStatusKpi.maintenanceNote,
      ],
      [
        "Production Output Actual",
        `${factoryOutput.produced.toLocaleString()} pcs`,
        `${factoryOutput.target.toLocaleString()} pcs`,
        `${factoryOutput.targetAchievedPercent}% Achieved`,
      ],
      ["First-Pass Quality Yield", "97.4%", "> 96.0%", "Within Tolerance"],
      ["Shift Rejection Rate", "1.2%", "< 2.0%", "Controlled"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((r) => r.map((c) => `"${c}"`).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `FactoryOS_Executive_Dossier_${timeframe}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      "Plant Performance Executive Dossier (CSV) exported successfully.",
    );
  };

  const handleDownloadReport = (report: GeneratedReportItem) => {
    const csvContent = `data:text/csv;charset=utf-8,Report Name,${report.reportName}\nGenerated Date,${report.date}\nFormat,${report.format}\nStatus,Verified Digital Dossier\nUnits Produced,${factoryOutput.produced}\nFleet Health,${machineStatusKpi.operational}/${machineStatusKpi.total} Active\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${report.reportName.replace(/\s+/g, "_")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded verified report: ${report.reportName}`);
  };

  const reportsTabs = [
    { id: "analytics", label: "OEE Analytics" },
    { id: "efficiency", label: "Shift Efficiency" },
    { id: "rootcause", label: "Root Cause Analysis" },
    {
      id: "archive",
      label: "Report Archive",
      badge: String(MOCK_GENERATED_REPORTS.length),
    },
  ];

  return (
    <>
      <AppTopHeader
        tabs={reportsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="REPORTS & OEE"
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

        <ReportsHeader
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onExport={handleExport}
        />

        <ReportsKpiGrid
          metrics={MOCK_REPORTS_KPIS}
          onFilterScrap={() => setActiveTab("rootcause")}
        />

        {/* Tab Lens Content */}
        {activeTab === "analytics" && (
          <div className="space-y-3.5 flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
              <div className="lg:col-span-8 flex flex-col">
                <OeeTrendCard data={MOCK_OEE_TREND} />
              </div>
              <div className="lg:col-span-4 flex flex-col">
                <ShiftEfficiencyCard shifts={MOCK_SHIFT_EFFICIENCIES} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
              <div className="lg:col-span-7 flex flex-col">
                <OutputVsTargetCard weeks={MOCK_OUTPUT_VS_TARGET} />
              </div>
              <div className="lg:col-span-5 flex flex-col">
                <DefectRootCausesCard
                  causes={MOCK_DEFECT_ROOT_CAUSES}
                  onViewDetailedLog={() => navigate("/production-logs")}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "efficiency" && (
          <div className="space-y-3.5 flex-1 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
              <div className="lg:col-span-6 flex flex-col">
                <ShiftEfficiencyCard shifts={MOCK_SHIFT_EFFICIENCIES} />
              </div>
              <div className="lg:col-span-6 flex flex-col">
                <OutputVsTargetCard weeks={MOCK_OUTPUT_VS_TARGET} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "rootcause" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-7 flex flex-col">
              <DefectRootCausesCard
                causes={MOCK_DEFECT_ROOT_CAUSES}
                onViewDetailedLog={() => navigate("/production-logs")}
              />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <OeeTrendCard data={MOCK_OEE_TREND} />
            </div>
          </div>
        )}

        {activeTab === "archive" && (
          <GeneratedReportsTable
            reports={MOCK_GENERATED_REPORTS}
            onGenerateCustomReport={handleExport}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </main>
    </>
  );
};

export default ReportsPage;
