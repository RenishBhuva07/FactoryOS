import React from 'react';
import { AppTopHeader } from '../../../components/layout';
import type { NavItem } from '../../../components/common';

export interface OrdersTopHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  brandName?: string;
  userName?: string;
  userEmail?: string;
  className?: string;
}

const ORDERS_NAV_TABS: NavItem[] = [
  { id: 'active', label: 'Active Pipeline', badge: '4 POs' },
  { id: 'job_cards', label: 'Job Cards & Matrix' },
  { id: 'templates', label: 'PO Templates' },
  { id: 'staging', label: 'Dispatch Staging' },
];

export const OrdersTopHeader: React.FC<OrdersTopHeaderProps> = ({
  activeTab,
  onTabChange,
  brandName = 'FactoryOS',
  userName,
  userEmail,
  className = '',
}) => {
  return (
    <AppTopHeader
      tabs={ORDERS_NAV_TABS}
      activeTab={activeTab}
      onTabChange={onTabChange}
      brandName={brandName}
      userName={userName}
      userEmail={userEmail}
      roleBadge="COMMERCIALS"
      className={className}
    />
  );
};

export default OrdersTopHeader;
