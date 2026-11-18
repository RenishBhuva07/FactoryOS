import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  SettingsHeader,
  SubscriptionTierCard,
  FactoryParametersCard,
  TeamRolePermissionsCard,
  InvoiceHistoryCard,
  SustainabilityComplianceCard,
  ApiAccessKeysCard,
} from './components';
import {
  MOCK_FACTORY_PARAMETERS,
  MOCK_TEAM_PERMISSIONS,
  MOCK_INVOICE_HISTORY,
} from '../../data/mockSettingsData';
import type { FactoryParameters } from '../../types/settings';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('parameters');
  const [parameters, setParameters] = useState<FactoryParameters>(MOCK_FACTORY_PARAMETERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleParameterChange = (key: keyof FactoryParameters, value: string) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    showToast('Factory parameters & security configurations saved successfully.');
  };

  const handleDiscard = () => {
    setParameters(MOCK_FACTORY_PARAMETERS);
    showToast('Changes discarded.');
  };

  const settingsTabs = [
    { id: 'parameters', label: 'Plant Parameters' },
    { id: 'billing', label: 'Billing & Plan', badge: 'Active' },
    { id: 'team', label: 'Team Permissions', badge: '3' },
    { id: 'api', label: 'API & Telemetry' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={settingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="SETTINGS"
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

        <SettingsHeader
          onDiscard={handleDiscard}
          onSave={handleSave}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3.5">
            <SubscriptionTierCard
              onManageBilling={() => showToast('Opening Stripe Customer Portal for billing management.')}
            />
            <FactoryParametersCard
              parameters={parameters}
              onChange={handleParameterChange}
            />
            <TeamRolePermissionsCard
              members={MOCK_TEAM_PERMISSIONS}
              onAddMember={() => showToast('Add Team Member invite modal launched.')}
            />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
            <InvoiceHistoryCard
              invoices={MOCK_INVOICE_HISTORY}
              onDownloadTaxStatement={() => showToast('Downloading FY24-25 Consolidated Tax Statement...')}
            />
            <SustainabilityComplianceCard />
            <ApiAccessKeysCard
              onGenerateKey={() => showToast('New IoT sensor API key generated.')}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
