import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  OrdersManagementHeader,
  OrdersManagementKpiGrid,
  OrderExecutionTable,
  BomReadinessCard,
} from './components';
import {
  MOCK_ORDERS_MGMT_KPIS,
  MOCK_ORDER_EXECUTION_ITEMS,
  MOCK_BOM_READINESS,
} from '../../data/mockOrdersManagementData';
import type { OrderExecutionItem } from '../../types/ordersManagement';

export const OrdersManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('queue');
  const [orders] = useState<OrderExecutionItem[]>(MOCK_ORDER_EXECUTION_ITEMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayedOrders = React.useMemo(() => {
    if (activeTab === 'bom') {
      return orders.filter((o) => o.bomStatus === 'allocated');
    }
    if (activeTab === 'fulfillment') {
      return orders.filter((o) => o.fulfillmentStage === 'staged_dispatch' || o.fulfillmentStage === 'quality_check');
    }
    return orders;
  }, [orders, activeTab]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAction = (order: OrderExecutionItem) => {
    showToast(`Managing Job Card for ${order.poNumber}: Assigned to ${order.assignedLine}.`);
  };

  const ordersMgmtTabs = [
    { id: 'queue', label: 'Queue & Job Cards', badge: String(orders.length) },
    { id: 'bom', label: 'BOM Allocation' },
    { id: 'fulfillment', label: 'Fulfillment Tracking' },
    { id: 'matrix', label: 'Execution Matrix' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={ordersMgmtTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="JOB CARDS"
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

        <OrdersManagementHeader
          onExportMatrix={() => showToast('Order Execution Matrix exported to CSV.')}
          onIssueJobCard={() => showToast('Production Job Card Issuance wizard launched.')}
        />

        <OrdersManagementKpiGrid
          metrics={MOCK_ORDERS_MGMT_KPIS}
          onFilterDelay={() => showToast('Filtered: Showing PO #ORD-1039 with material shortage delay.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <OrderExecutionTable
              orders={displayedOrders}
              onAction={handleAction}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <BomReadinessCard items={MOCK_BOM_READINESS} />
          </div>
        </div>
      </main>
    </>
  );
};

export default OrdersManagementPage;
