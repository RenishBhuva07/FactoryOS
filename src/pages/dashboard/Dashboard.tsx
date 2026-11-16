import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardHeader,
  FactoryKpiGrid,
  HourlyOutputChartCard,
  AttentionAlertsCard,
  ManagerActivityFeedCard,
} from './components';
import { PillButton } from '../../components/common';
import { useAuth, useOnboarding, useLayout } from '../../context';
import {
  MOCK_FACTORY_OUTPUT,
  MOCK_WORKFORCE_ATTENDANCE,
  MOCK_ACTIVE_ORDERS,
  MOCK_MACHINE_STATUS,
  MOCK_HOURLY_OUTPUT,
  MOCK_ATTENTION_ALERTS,
  MOCK_MANAGER_ACTIVITIES,
} from '../../data/mockDashboardData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const { toggleWhatsAppDigest, toggleSearch } = useLayout();
  const [activeTab, setActiveTab] = useState('overview');

  const proprietorName =
    user?.name || onboardingState.businessDetails.proprietorName || 'Rajesh Bhai Patel';
  const firstName = proprietorName.split(' ')[0];
  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    'Apex Engineering Works';

  return (
    <>
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        brandName="FactoryOS"
      />

      <main className="flex-1 min-w-0 pl-2 pr-4 sm:pl-3 sm:pr-5 lg:pl-3 lg:pr-6 py-3 sm:py-3.5 space-y-3.5 w-full flex flex-col">
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
              Live operational telemetry for <span className="font-semibold text-[#002941]">{factoryName}</span> • Udyam registered
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <PillButton
              variant="ghost"
              size="sm"
              icon={<span className="material-symbols-outlined text-[17px] text-[#128C7E]">chat</span>}
              onClick={toggleWhatsAppDigest}
              className="text-xs font-bold"
            >
              9:00 PM WhatsApp Digest
            </PillButton>

            <PillButton
              variant="primary"
              size="sm"
              icon={<span className="material-symbols-outlined text-[17px]">smartphone</span>}
              onClick={() => navigate('/workbench')}
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
              <span className="material-symbols-outlined text-[16px]">search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold shadow-2xs">⌘K</kbd>
            </button>
          </div>
        </section>

        {/* 4 Core KPIs */}
        <FactoryKpiGrid
          output={MOCK_FACTORY_OUTPUT}
          attendance={MOCK_WORKFORCE_ATTENDANCE}
          orders={MOCK_ACTIVE_ORDERS}
          machineStatus={MOCK_MACHINE_STATUS}
        />

        {/* Dynamic Lens Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <HourlyOutputChartCard data={MOCK_HOURLY_OUTPUT} />
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
              <AttentionAlertsCard alerts={MOCK_ATTENTION_ALERTS} />
              <ManagerActivityFeedCard activities={MOCK_MANAGER_ACTIVITIES} />
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-8 flex flex-col space-y-3.5">
              <HourlyOutputChartCard data={MOCK_HOURLY_OUTPUT} />
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#002941]">Active Assembly Lines (Line 01 &amp; Line 02)</h3>
                  <p className="text-xs text-[#566E7F]">Current production run: Valve Guides &amp; Spindle Shafts</p>
                </div>
                <PillButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/production')}
                >
                  Manage Floor Lines
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <ManagerActivityFeedCard activities={MOCK_MANAGER_ACTIVITIES} />
            </div>
          </div>
        )}

        {activeTab === 'orders_risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-7 flex flex-col">
              <AttentionAlertsCard alerts={MOCK_ATTENTION_ALERTS} />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">At-Risk Purchase Orders</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FD6E6E]/15 text-[#AB1B1B] text-[10px] font-bold">
                    1 Delayed
                  </span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  PO #ORD-1039 (Bharat Forge) has raw material shortage. Promised delivery Nov 22.
                </p>
                <div className="pt-2 flex gap-2">
                  <PillButton
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/orders')}
                    className="w-full text-xs"
                  >
                    View Orders Hub
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workforce' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">Floor Attendance &amp; Shifts</h3>
                  <span className="text-xs font-bold text-[#2D8576]">22 / 24 Present</span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  2 operators absent in Shift A. Reliever Ramesh Kumar assigned to CNC-03.
                </p>
                <PillButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/team')}
                  className="w-full text-xs"
                >
                  Open Team Roster &amp; Biometric Audit
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-white border border-[#DFECF3] rounded-3xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#002941]">Spindle Fleet Health</h3>
                  <span className="text-xs font-bold text-[#AB1B1B]">1 Maintenance</span>
                </div>
                <p className="text-xs text-[#566E7F]">
                  VMC-04 undergoing scheduled 500-hr lubrication check. Estimated resumption 15:30.
                </p>
                <PillButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/machines')}
                  className="w-full text-xs"
                >
                  View Machine Fleet
                </PillButton>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export { Dashboard as DashboardPage };
export default Dashboard;
