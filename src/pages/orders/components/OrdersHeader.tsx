import React from 'react';
import { PillButton } from '../../../components/common';

export interface OrdersHeaderProps {
  activeTab?: string;
  activeOrdersCount?: number;
  activeJobsCount?: number;
  templatesCount?: number;
  stagingCount?: number;
  plantLocation?: string;
  onExportCsv?: () => void;
  onNewPurchaseOrder?: () => void;
  onExportMatrix?: () => void;
  onIssueJobCard?: () => void;
  onRefreshCatalog?: () => void;
  onGenerateGatePass?: () => void;
  className?: string;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  activeTab = 'pipeline',
  activeOrdersCount = 3,
  activeJobsCount = 3,
  templatesCount = 2,
  stagingCount = 1,
  plantLocation = 'GIDC Naroda',
  onExportCsv,
  onNewPurchaseOrder,
  onExportMatrix,
  onIssueJobCard,
  onRefreshCatalog,
  onGenerateGatePass,
  className = '',
}) => {
  const normalizedTab = activeTab === 'active' ? 'pipeline' : activeTab;

  const getHeaderContent = () => {
    switch (normalizedTab) {
      case 'job_cards':
        return {
          breadcrumb: 'Order Operations & Client Fulfillment • Plant #04',
          badgeText: `Active Job Cards (${activeJobsCount})`,
          badgeVariant: 'bg-[#CFE8E1] text-[#103530]',
          title: 'Production Job Cards & Execution Matrix',
          description:
            'Live shopfloor job card dispatch, BOM material staging, and client fulfillment pipelines.',
          secondaryButton: {
            label: 'Export Execution Matrix',
            icon: 'download',
            onClick: onExportMatrix || onExportCsv,
          },
          primaryButton: {
            label: 'Issue Production Job Card',
            icon: 'assignment_add',
            onClick: onIssueJobCard,
          },
        };
      case 'templates':
        return {
          breadcrumb: 'Commercial Master Catalog • Repeat Cadence',
          badgeText: `Repeat Templates (${templatesCount})`,
          badgeVariant: 'bg-[#E4F4F0] text-[#184E46]',
          title: 'Repeat Purchase Order Templates',
          description:
            'Pre-configured customer bills of materials for instant one-click order re-issuance.',
          secondaryButton: {
            label: 'Sync Catalog',
            icon: 'sync',
            onClick: onRefreshCatalog,
          },
          primaryButton: {
            label: 'New Purchase Order',
            icon: 'add',
            onClick: onNewPurchaseOrder,
          },
        };
      case 'staging':
        return {
          breadcrumb: 'Logistics Handover • Outbound Gate Pass',
          badgeText: `Staged Ready (${stagingCount})`,
          badgeVariant: 'bg-[#CFE8E1] text-[#103530]',
          title: 'Dispatch Staging & Challan Readiness',
          description:
            'Orders passed final QC, staged for local transport and digital gate pass generation.',
          secondaryButton: {
            label: 'Export Staging CSV',
            icon: 'download',
            onClick: onExportCsv,
          },
          primaryButton: {
            label: 'Generate Digital Gate Pass',
            icon: 'local_shipping',
            onClick: onGenerateGatePass,
          },
        };
      case 'pipeline':
      default:
        return {
          breadcrumb: 'Commercial & Production Pipeline',
          badgeText: `Active Orders (${activeOrdersCount})`,
          badgeVariant: 'bg-[#E4F4F0] text-[#2D8576]',
          title: 'Orders & Purchase Commitments',
          description: `Purchase orders, workshop machine allocation, and delivery commitments for ${plantLocation}.`,
          secondaryButton: {
            label: 'Export Orders CSV',
            icon: 'download',
            onClick: onExportCsv,
          },
          primaryButton: {
            label: 'New Purchase Order',
            icon: 'add',
            onClick: onNewPurchaseOrder,
          },
        };
    }
  };

  const content = getHeaderContent();

  return (
    <section
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 shrink-0 ${className}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#566E7F]">
            {content.breadcrumb}
          </span>
          <span className="text-[#8DA1AF] text-xs">•</span>
          <span
            className={`text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${content.badgeVariant}`}
          >
            {content.badgeText}
          </span>
        </div>
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#002941]">
          {content.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#566E7F]">{content.description}</p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        {content.secondaryButton && (
          <PillButton
            variant="secondary"
            size="md"
            icon={
              <span className="material-symbols-outlined text-[18px]">
                {content.secondaryButton.icon}
              </span>
            }
            onClick={content.secondaryButton.onClick}
            className="bg-[#F0F5F9] border border-[#DFECF3] hover:bg-[#DFECF3] font-semibold shadow-2xs"
          >
            {content.secondaryButton.label}
          </PillButton>
        )}

        {content.primaryButton && (
          <PillButton
            variant="primary"
            size="md"
            icon={
              <span className="material-symbols-outlined text-[18px]">
                {content.primaryButton.icon}
              </span>
            }
            onClick={content.primaryButton.onClick}
          >
            {content.primaryButton.label}
          </PillButton>
        )}
      </div>
    </section>
  );
};

export default OrdersHeader;
