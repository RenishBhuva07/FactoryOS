import React from 'react';
import { AppTopHeader } from '../../../components/layout';
import type { NavItem } from '../../../components/common';

export interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  className?: string;
}

const DASHBOARD_TABS: NavItem[] = [
  { id: 'overview', label: 'Executive Pulse' },
  { id: 'production', label: 'Production & OEE' },
  { id: 'orders_risk', label: 'Orders & Risk', badge: '1 Delayed' },
  { id: 'workforce', label: 'Workforce & Fleet' },
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onTabChange,
  brandName = 'FactoryOS',
  userName,
  userEmail,
  className = '',
}) => {
  return (
    <AppTopHeader
      tabs={DASHBOARD_TABS}
      activeTab={activeTab}
      onTabChange={onTabChange}
      brandName={brandName}
      userName={userName}
      userEmail={userEmail}
      roleBadge="OWNER"
      className={className}
    />
  );
};

export default DashboardHeader;
