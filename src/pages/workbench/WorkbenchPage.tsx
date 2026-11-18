import React, { useState } from 'react';
import {
  WorkbenchHeader,
  WorkbenchOutputEntry,
  WorkbenchAttendance,
  WorkbenchMachineIssue,
  WorkbenchHandover,
} from './components';
import { SegmentedPillNav } from '../../components/common';
import { useAuth, useOnboarding } from '../../context';

export const WorkbenchPage: React.FC = () => {
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();

  const [activeTab, setActiveTab] = useState('production');
  const [isOffline, setIsOffline] = useState(false);
  const [lang, setLang] = useState<'en' | 'gu' | 'hi'>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const factoryName =
    user?.factoryName ||
    onboardingState.businessDetails.factoryName ||
    'Apex Engineering Works';

  const WORKBENCH_TABS = [
    { id: 'production', label: lang === 'gu' ? 'ઉત્પાદન નોંધો' : lang === 'hi' ? 'उत्पादन दर्ज करें' : 'Log Output', icon: 'add_task' },
    { id: 'attendance', label: lang === 'gu' ? 'હાજરી' : lang === 'hi' ? 'उपस्थिति' : 'Attendance', icon: 'groups' },
    { id: 'issue', label: lang === 'gu' ? 'મશીન ખામી' : lang === 'hi' ? 'मशीन समस्या' : 'Report Issue', icon: 'warning' },
    { id: 'handover', label: lang === 'gu' ? 'શિફ્ટ હેન્ડઓવર' : lang === 'hi' ? 'हैंडओवर स्लिप' : 'Handover', icon: 'assignment_turned_in' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col font-sans text-[#002941] antialiased">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#002941] text-white shadow-xl animate-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-[19px] text-[#CFE8E1]">
            check_circle
          </span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <WorkbenchHeader
        supervisorName="Mahesh Solanki"
        shiftLabel="Shift A (08:00 - 16:30)"
        factoryName={factoryName}
        isOffline={isOffline}
        onToggleOffline={() => {
          setIsOffline((prev) => !prev);
          showToast(!isOffline ? 'Offline mode enabled. Entries cached locally.' : 'Back online. Cached slips synced.');
        }}
        lang={lang}
        onLanguageChange={setLang}
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 space-y-4 flex flex-col">
        {/* Quick Mode Pill Selector */}
        <div className="flex justify-center overflow-x-auto py-1">
          <SegmentedPillNav
            items={WORKBENCH_TABS}
            activeId={activeTab}
            onChange={setActiveTab}
            variant="white"
          />
        </div>

        {/* Action Panel */}
        <div className="flex-1">
          {activeTab === 'production' && (
            <WorkbenchOutputEntry
              onSubmit={(entry) =>
                showToast(`Logged ${entry.goodUnits} pcs for ${entry.machine}`)
              }
              lang={lang}
            />
          )}

          {activeTab === 'attendance' && (
            <WorkbenchAttendance
              onSave={() => showToast('Shift A attendance locked & verified.')}
            />
          )}

          {activeTab === 'issue' && (
            <WorkbenchMachineIssue
              onSubmit={(issue) =>
                showToast(`Alert dispatched: ${issue.machine} (${issue.category})`)
              }
            />
          )}

          {activeTab === 'handover' && (
            <WorkbenchHandover
              onSignOff={() => showToast('Shift A handover signed & archived.')}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkbenchPage;
