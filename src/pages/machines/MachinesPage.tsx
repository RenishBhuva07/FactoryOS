import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  MachinesHeader,
  MachinesKpiStrip,
  WorkstationsGrid,
  SecondaryFleetGrid,
  PreventativeMaintenanceTable,
  SupervisorMachineLogCard,
  LogMachineStatusModal,
} from './components';
import {
  MOCK_MACHINES_KPIS,
  MOCK_PRIMARY_WORKSTATIONS,
  MOCK_SECONDARY_MACHINES,
  MOCK_MAINTENANCE_TASKS,
  MOCK_SUPERVISOR_MACHINE_LOGS,
} from '../../data/mockMachinesData';
import type { WorkstationMachine, SecondaryMachine } from '../../types/machines';

export const MachinesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fleet');
  const [workstations, setWorkstations] = useState<WorkstationMachine[]>(MOCK_PRIMARY_WORKSTATIONS);
  const [secondaryMachines] = useState<SecondaryMachine[]>(MOCK_SECONDARY_MACHINES);
  const [kpis, setKpis] = useState(MOCK_MACHINES_KPIS);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleMachineStatusSubmit = (data: {
    machineId: string;
    action: 'breakdown' | 'service_complete';
    category: string;
    technician: string;
    downtimeMinutes: number;
    notes: string;
  }) => {
    const isBreakdown = data.action === 'breakdown';
    setWorkstations((prev) =>
      prev.map((ws) =>
        ws.id === data.machineId
          ? {
              ...ws,
              status: isBreakdown ? 'maintenance' : 'operational',
              statusLabel: isBreakdown ? 'Down for Maintenance' : 'Optimal Spindle Run',
              currentJobOrTask: isBreakdown
                ? `Maintenance (${data.category})`
                : 'Job Card Resumed',
            }
          : ws
      )
    );

    setKpis((prev) => ({
      ...prev,
      maintenanceCount: isBreakdown
        ? prev.maintenanceCount + 1
        : Math.max(0, prev.maintenanceCount - 1),
    }));

    showToast(
      isBreakdown
        ? `Breakdown recorded: Workstation switched to Down for Maintenance (${data.downtimeMinutes}m estimated).`
        : `Workstation returned to Active Operational Fleet.`
    );
  };

  const handleWorkstationAction = (ws: WorkstationMachine) => {
    if (ws.status === 'maintenance') {
      showToast(`Opening Maintenance Checklist for ${ws.name}: 500-hr spindle check.`);
    } else {
      showToast(`Job Slip generated for ${ws.name} (${ws.currentJobOrTask}).`);
    }
  };

  const handleSecondaryMachineClick = (m: SecondaryMachine) => {
    showToast(`Machine ${m.code} (${m.name}): Operator ${m.operator}, Uptime ${m.uptimeToday}.`);
  };

  const machineTabs = [
    { id: 'fleet', label: 'Fleet Roster', badge: '8 Units' },
    { id: 'secondary', label: 'Secondary Line', badge: '4' },
    { id: 'maintenance', label: 'Maintenance Schedule', badge: '3' },
    { id: 'tickets', label: 'Breakdown Tickets' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={machineTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="FLEET & PM"
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

        <MachinesHeader
          onFilterType={() => showToast('Filtered by CNC, Conventional Lathes, and Milling.')}
          onLogMachineStatus={() => setIsStatusModalOpen(true)}
        />

        <MachinesKpiStrip
          metrics={kpis}
          onFilterMaintenance={() => showToast('Filtered: Showing Lathe #04 scheduled maintenance.')}
        />

        {activeTab === 'fleet' && (
          <>
            <WorkstationsGrid
              workstations={workstations}
              onActionClick={handleWorkstationAction}
            />
            <SecondaryFleetGrid
              machines={secondaryMachines}
              onMachineClick={handleSecondaryMachineClick}
            />
          </>
        )}

        {activeTab === 'secondary' && (
          <SecondaryFleetGrid
            machines={secondaryMachines}
            onMachineClick={handleSecondaryMachineClick}
          />
        )}

        {(activeTab === 'maintenance' || activeTab === 'tickets' || activeTab === 'fleet') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-8 flex flex-col">
              <PreventativeMaintenanceTable
                tasks={MOCK_MAINTENANCE_TASKS}
                onViewMonthlyPlan={() => showToast('Monthly Preventative Maintenance Plan opened.')}
              />
            </div>

            <div className="lg:col-span-4 flex flex-col">
              <SupervisorMachineLogCard
                logs={MOCK_SUPERVISOR_MACHINE_LOGS}
                onNewTicket={() => setIsStatusModalOpen(true)}
                onDownloadReport={() => showToast('Downloading Shift Machine Report (PDF)...')}
              />
            </div>
          </div>
        )}

        <LogMachineStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          workstations={workstations}
          onSubmit={handleMachineStatusSubmit}
        />
      </main>
    </>
  );
};

export default MachinesPage;
