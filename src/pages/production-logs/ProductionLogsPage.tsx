import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  ProductionLogsHeader,
  ProductionLogsFilterBar,
  ProductionLogsFeed,
  SupervisorSignOffsCard,
  ScrapBreakdownCard,
} from './components';
import {
  MOCK_PRODUCTION_LOGS,
  MOCK_SUPERVISOR_SIGN_OFFS,
  MOCK_SCRAP_BREAKDOWN,
} from '../../data/mockProductionData';
import type { ProductionLogEntry } from '../../types/production';

export const ProductionLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shift-a');
  const [logs] = useState<ProductionLogEntry[]>(MOCK_PRODUCTION_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('All Machines (8 Units)');
  const [selectedShift, setSelectedShift] = useState('Shift A (08:00 - 16:30)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.jobCard.toLowerCase().includes(q) ||
      log.machineName.toLowerCase().includes(q) ||
      log.partName.toLowerCase().includes(q) ||
      log.operatorName.toLowerCase().includes(q);
    return matchesSearch;
  });

  const handleDownloadAuditLogs = () => {
    showToast('Audit logs exported to CSV with supervisor digital signatures.');
  };

  const handleNewLogEntry = () => {
    showToast('New manual production slip form opened.');
  };

  const handleLogClick = (log: ProductionLogEntry) => {
    showToast(
      `Viewing digital shift slip: ${log.machineName} - ${log.jobCard} (${log.outputUnits} units output).`
    );
  };

  const logTabs = [
    { id: 'shift-a', label: 'Shift A Logs', badge: '3' },
    { id: 'handovers', label: 'Supervisor Sign-Offs', badge: '2' },
    { id: 'scraplog', label: 'Scrap Register' },
    { id: 'audit', label: 'Audit Trail' },
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

        <ProductionLogsHeader
          onDownloadAuditLogs={handleDownloadAuditLogs}
          onNewLogEntry={handleNewLogEntry}
        />

        <ProductionLogsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedMachine={selectedMachine}
          onMachineChange={setSelectedMachine}
          selectedShift={selectedShift}
          onShiftChange={setSelectedShift}
          onToggleFilters={() => showToast('Advanced log filters toggled.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ProductionLogsFeed logs={filteredLogs} onLogClick={handleLogClick} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <SupervisorSignOffsCard signOffs={MOCK_SUPERVISOR_SIGN_OFFS} />
            <ScrapBreakdownCard breakdowns={MOCK_SCRAP_BREAKDOWN} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductionLogsPage;
