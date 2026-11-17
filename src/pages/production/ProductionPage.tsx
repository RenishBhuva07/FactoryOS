import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  ProductionHeader,
  ProductionKpiGrid,
  ActiveAssemblyLinesCard,
  QuickLoggingFormCard,
  ShiftHandoverNotesCard,
  ManualBatchSlipModal,
} from './components';
import { ScrapBreakdownCard } from '../production-logs/components';
import {
  MOCK_PRODUCTION_KPIS,
  MOCK_ASSEMBLY_LINES,
  MOCK_SCRAP_BREAKDOWN,
} from '../../data/mockProductionData';
import type { AssemblyLineStatus } from '../../types/production';

export const ProductionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lines');
  const [lines] = useState<AssemblyLineStatus[]>(MOCK_ASSEMBLY_LINES);
  const [kpis, setKpis] = useState(MOCK_PRODUCTION_KPIS);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleQuickLog = (entry: {
    machine: string;
    batchId: string;
    goodUnits: number;
    scrapUnits: number;
    defectCategory: string;
    notes: string;
  }) => {
    setKpis((prev) => ({
      ...prev,
      shiftOutputActual: prev.shiftOutputActual + entry.goodUnits,
      scrapLoggedUnits: prev.scrapLoggedUnits + entry.scrapUnits,
    }));
    showToast(
      `Shift entry logged for ${entry.machine}: ${entry.goodUnits} pcs approved, ${entry.scrapUnits} scrap recorded.`
    );
  };

  const handleManualBatchSubmit = (batch: {
    sectionMachine: string;
    jobCardNumber: string;
    targetUnits: number;
    goodUnits: number;
    scrapUnits: number;
    defectReason: string;
    operatorNotes: string;
  }) => {
    setKpis((prev) => ({
      ...prev,
      shiftOutputActual: prev.shiftOutputActual + batch.goodUnits,
      scrapLoggedUnits: prev.scrapLoggedUnits + batch.scrapUnits,
    }));
    showToast(
      `Manual slip authenticated for ${batch.jobCardNumber}: ${batch.goodUnits} pcs logged successfully.`
    );
  };

  const handleLineClick = (line: AssemblyLineStatus) => {
    showToast(
      `Line ${line.lineCode}: ${line.name} — Current Batch ${line.currentBatch}. Status: ${line.statusLabel}.`
    );
  };

  const productionTabs = [
    { id: 'lines', label: 'Assembly Lines', badge: '4' },
    { id: 'workorders', label: 'Running Batches' },
    { id: 'handovers', label: 'Shift Handover' },
    { id: 'scraplogs', label: 'Scrap Diagnostics' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={productionTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="PRODUCTION"
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

        <ProductionHeader
          onLogBatch={() => setIsBatchModalOpen(true)}
        />

        <ProductionKpiGrid
          metrics={kpis}
          onFilterScrap={() => showToast('Filtered: Showing scrap breakdown across CNC & Lathe sections.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {activeTab === 'scraplogs' ? (
              <ScrapBreakdownCard breakdowns={MOCK_SCRAP_BREAKDOWN} />
            ) : activeTab === 'handovers' ? (
              <ShiftHandoverNotesCard />
            ) : (
              <ActiveAssemblyLinesCard lines={lines} onLineClick={handleLineClick} />
            )}
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
            <QuickLoggingFormCard onSubmit={handleQuickLog} />
            {activeTab === 'lines' && (
              <ShiftHandoverNotesCard />
            )}
          </div>
        </div>
      </main>

      <ManualBatchSlipModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        onSubmit={handleManualBatchSubmit}
      />
    </>
  );
};

export default ProductionPage;
