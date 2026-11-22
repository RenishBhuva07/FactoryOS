import React from 'react';
import { AppTopHeader } from '../../../components/layout';
import type { NavItem } from '../../../components/common';

export interface OrdersTopHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  ordersCount?: number;
  jobsCount?: number;
  templatesCount?: number;
  stagingCount?: number;
  className?: string;
}

export const OrdersTopHeader: React.FC<OrdersTopHeaderProps> = ({
  activeTab,
  onTabChange,
  brandName = 'FactoryOS',
  userName,
  userEmail,
  ordersCount = 3,
  jobsCount = 3,
  templatesCount = 2,
  stagingCount = 1,
  className = '',
}) => {
  const tabs: NavItem[] = [
    {
      id: 'pipeline',
      label: 'Active Pipeline',
      badge: `${ordersCount} POs`,
    },
    {
      id: 'job_cards',
      label: 'Job Cards & Execution',
      badge: `${jobsCount} Jobs`,
    },
    {
      id: 'templates',
      label: 'PO Templates',
      badge: `${templatesCount} Active`,
    },
    {
      id: 'staging',
      label: 'Dispatch Staging',
      badge: `${stagingCount} Ready`,
    },
  ];

  const getRoleBadge = () => {
    switch (activeTab) {
      case 'job_cards':
        return 'JOB CARDS';
      case 'staging':
        return 'LOGISTICS';
      case 'templates':
        return 'CATALOG';
      case 'pipeline':
      default:
        return 'COMMERCIALS';
    }
  };

  return (
    <AppTopHeader
      tabs={tabs}
      activeTab={activeTab === 'active' ? 'pipeline' : activeTab}
      onTabChange={onTabChange}
      brandName={brandName}
      userName={userName}
      userEmail={userEmail}
      roleBadge={getRoleBadge()}
      className={className}
    />
  );
};

export default OrdersTopHeader;
