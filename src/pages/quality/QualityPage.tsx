import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  QualityHeader,
  QualityKpiGrid,
  ActiveQualityInspectionsTable,
  CalibrationRegisterCard,
  DefectReasonBreakdownCard,
  NewBatchInspectionModal,
} from './components';
import {
  MOCK_QUALITY_KPIS,
  MOCK_QUALITY_INSPECTIONS,
  MOCK_CALIBRATION_TOOLS,
  MOCK_DEFECT_REASONS,
} from '../../data/mockQualityData';
import type { QualityInspectionBatch } from '../../types/quality';

export const QualityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inspections');
  const [inspections, setInspections] = useState<QualityInspectionBatch[]>(MOCK_QUALITY_INSPECTIONS);
  const [kpis, setKpis] = useState(MOCK_QUALITY_KPIS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAction = (item: QualityInspectionBatch) => {
    if (item.actionType === 'sign_cert') {
      showToast(`Digital Quality Certificate signed and released for ${item.batchPoNumber}.`);
    } else if (item.actionType === 'log_deviation') {
      showToast(`Deviation note recorded for ${item.batchPoNumber}: +0.08mm tolerance flagged.`);
    } else if (item.actionType === 'send_rework') {
      setInspections((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: 'under_inspection',
                statusLabel: 'In Deburring',
                actionText: 'Re-inspect Batch',
                actionType: 'log_deviation',
              }
            : i
        )
      );
      setKpis((prev) => ({
        ...prev,
        pendingQuarantineCount: Math.max(0, prev.pendingQuarantineCount - 1),
        quarantineBatchInfo: 'Batch routed to Deburring Line for edge chamfering.',
      }));
      showToast(`Batch ${item.batchPoNumber} routed to deburring line for rework.`);
    }
  };

  const handleCreateInspection = (record: {
    batchPoNumber: string;
    componentName: string;
    toleranceVariance: string;
    sampleCount: number;
    inspectionTool: string;
    status: 'passed' | 'under_inspection' | 'rework_required';
  }) => {
    const newInspection: QualityInspectionBatch = {
      id: `qc-${Date.now()}`,
      batchPoNumber: record.batchPoNumber,
      componentName: record.componentName,
      componentSpec: 'Series MSME',
      toleranceVariance: record.toleranceVariance,
      toleranceDetail: `Verified with ${record.inspectionTool}`,
      sampleCheckedText: `${record.sampleCount} pcs checked`,
      inspectorName: 'Dinesh M. (QC)',
      status: record.status,
      statusLabel:
        record.status === 'passed'
          ? 'Passed'
          : record.status === 'under_inspection'
          ? 'Under Inspection'
          : 'Rework Required',
      actionText:
        record.status === 'passed'
          ? 'Sign Certificate'
          : record.status === 'under_inspection'
          ? 'Log Deviation Note'
          : 'Send to Deburring',
      actionType:
        record.status === 'passed'
          ? 'sign_cert'
          : record.status === 'under_inspection'
          ? 'log_deviation'
          : 'send_rework',
    };

    setInspections((prev) => [newInspection, ...prev]);
    setKpis((prev) => ({
      ...prev,
      inspectedBatchesDone: prev.inspectedBatchesDone + 1,
    }));
    showToast(`Inspection record for ${record.batchPoNumber} logged successfully!`);
  };

  const qualityTabs = [
    { id: 'inspections', label: 'Batch Inspections', badge: String(inspections.length) },
    { id: 'calibration', label: 'Tool Calibration', badge: '3' },
    { id: 'defects', label: 'Defect Analysis' },
    { id: 'iso', label: 'ISO MSME Audits' },
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
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        <QualityHeader
          onExportDossier={() => showToast('Exporting ISO 9001 Batch QA Dossier (PDF)...')}
          onNewBatchInspection={() => setIsModalOpen(true)}
        />

        <QualityKpiGrid
          metrics={kpis}
          onFilterQuarantine={() => showToast('Filtering quarantined batch #QC-1042.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            {activeTab === 'calibration' ? (
              <CalibrationRegisterCard tools={MOCK_CALIBRATION_TOOLS} />
            ) : activeTab === 'defects' ? (
              <DefectReasonBreakdownCard reasons={MOCK_DEFECT_REASONS} />
            ) : (
              <ActiveQualityInspectionsTable
                inspections={inspections}
                onAction={handleAction}
              />
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {activeTab !== 'calibration' && (
              <CalibrationRegisterCard tools={MOCK_CALIBRATION_TOOLS} />
            )}
            {activeTab !== 'defects' && (
              <DefectReasonBreakdownCard reasons={MOCK_DEFECT_REASONS} />
            )}
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
