import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  TeamHeader,
  TeamKpiGrid,
  ShopfloorRosterTable,
  StationCoverageCard,
  ManualPunchModal,
} from './components';
import {
  MOCK_TEAM_KPIS,
  MOCK_TEAM_ROSTER,
  MOCK_STATION_COVERAGE,
} from '../../data/mockTeamData';
import type { TeamMemberRoster } from '../../types/team';

export const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roster');
  const [roster, setRoster] = useState<TeamMemberRoster[]>(MOCK_TEAM_ROSTER);
  const [isPunchModalOpen, setIsPunchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayedRoster = React.useMemo(() => {
    if (activeTab === 'coverage') {
      return roster.filter((m) => m.status === 'on_spindle');
    }
    if (activeTab === 'overtime') {
      return roster.filter((m) => m.status === 'overtime');
    }
    return roster;
  }, [roster, activeTab]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleManualPunchSubmit = (data: {
    memberId: string;
    punchType: 'present' | 'overtime' | 'reliever' | 'half_day';
    station: string;
    notes: string;
  }) => {
    setRoster((prev) =>
      prev.map((m) =>
        m.id === data.memberId
          ? {
              ...m,
              status:
                data.punchType === 'overtime'
                  ? 'overtime'
                  : data.punchType === 'half_day'
                  ? 'on_break'
                  : 'on_spindle',
              statusLabel:
                data.punchType === 'overtime'
                  ? 'Overtime Shift'
                  : data.punchType === 'half_day'
                  ? 'Half-Day Leave'
                  : 'On Spindle',
              assignedStation: data.station || m.assignedStation,
            }
          : m
      )
    );
    showToast(`Biometric punch overridden: Operator assigned to ${data.station}.`);
  };

  const handleAction = (member: TeamMemberRoster) => {
    showToast(`Station logs opened for ${member.name} (${member.assignedStation}).`);
  };

  const teamTabs = [
    { id: 'roster', label: 'Shift A Roster', badge: String(roster.length) },
    { id: 'coverage', label: 'Station Coverage' },
    { id: 'biometric', label: 'Biometric Audit' },
    { id: 'overtime', label: 'Overtime Register' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={teamTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="WORKFORCE"
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

        <TeamHeader
          onExportRoster={() => showToast('Attendance roster exported to CSV.')}
          onManualPunch={() => setIsPunchModalOpen(true)}
        />

        <TeamKpiGrid
          metrics={MOCK_TEAM_KPIS}
          onFilterAbsent={() => showToast('Filtered: Showing 2 absent operators requiring relief allocation.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ShopfloorRosterTable
              roster={displayedRoster}
              onAction={handleAction}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <StationCoverageCard coverages={MOCK_STATION_COVERAGE} />
          </div>
        </div>

        <ManualPunchModal
          isOpen={isPunchModalOpen}
          onClose={() => setIsPunchModalOpen(false)}
          roster={roster}
          onSubmit={handleManualPunchSubmit}
        />
      </main>
    </>
  );
};

export default TeamPage;
