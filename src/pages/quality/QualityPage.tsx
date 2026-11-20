import React, { useState } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  QualityHeader,
  QualityKpiGrid,
  ActiveQualityInspectionsTable,
  CalibrationRegisterCard,
  DefectReasonBreakdownCard,
  NewBatchInspectionModal,
} from "./components";
import {
  MOCK_QUALITY_KPIS,
  MOCK_CALIBRATION_TOOLS,
  MOCK_DEFECT_REASONS,
} from "../../data/mockQualityData";
import { useFactoryStore } from "../../context";
import type { QualityInspectionBatch } from "../../types/quality";

export const QualityPage: React.FC = () => {
  const { qualityInspections, updateQualityStatus, createQualityInspection } =
    useFactoryStore();

  const [activeTab, setActiveTab] = useState("inspections");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAction = (item: QualityInspectionBatch) => {
    if (item.actionType === "sign_cert") {
      updateQualityStatus(item.id, "passed");
      showToast(
        `Digital Quality Certificate released for ${item.batchPoNumber}! Order staged for dispatch.`,
      );
    } else if (item.actionType === "log_deviation") {
      updateQualityStatus(item.id, "under_inspection");
      showToast(
        `Deviation note recorded for ${item.batchPoNumber}: +0.08mm tolerance flagged.`,
      );
    } else if (item.actionType === "send_rework") {
      updateQualityStatus(item.id, "rework_required");
      showToast(
        `Batch ${item.batchPoNumber} routed to deburring line for rework.`,
      );
    }
  };

  const handleCreateInspection = (record: {
    batchPoNumber: string;
    componentName: string;
    toleranceVariance: string;
    sampleCount: number;
    inspectionTool: string;
    status: "passed" | "under_inspection" | "rework_required";
  }) => {
    createQualityInspection(record);
    showToast(
      `Inspection record for ${record.batchPoNumber} logged successfully!`,
    );
  };

  const qualityTabs = [
    {
      id: "inspections",
      label: "Batch Inspections",
      badge: String(qualityInspections.length),
    },
    { id: "calibration", label: "Tool Calibration", badge: "3" },
    { id: "defects", label: "Defect Analysis" },
    { id: "iso", label: "ISO MSME Audits" },
  ];

  return (
    <>
      <AppTopHeader
        tabs={qualityTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="QUALITY QA"
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

        <QualityHeader
          onExportDossier={() =>
            showToast("Exporting ISO 9001 Batch QA Dossier (PDF)...")
          }
          onNewBatchInspection={() => setIsModalOpen(true)}
        />

        <QualityKpiGrid
          metrics={MOCK_QUALITY_KPIS}
          onFilterQuarantine={() =>
            showToast("Filtering quarantined batch #QC-1042.")
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ActiveQualityInspectionsTable
              inspections={qualityInspections}
              onAction={handleAction}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <CalibrationRegisterCard tools={MOCK_CALIBRATION_TOOLS} />
            <DefectReasonBreakdownCard reasons={MOCK_DEFECT_REASONS} />
          </div>
        </div>
      </main>

      <NewBatchInspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateInspection}
      />
    </>
  );
};

export default QualityPage;
