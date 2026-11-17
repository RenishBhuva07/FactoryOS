import React, { useState } from 'react';
import {
  OrdersTopHeader,
  OrdersHeader,
  OrdersKpiGrid,
  ActiveOrdersList,
  RepeatPoTemplatesCard,
  ClientTierPipelineCard,
  DispatchChallanStagingCard,
  NewPurchaseOrderModal,
  OrderDetailDrawer,
} from './components';
import {
  OrderExecutionTable,
  BomReadinessCard,
} from '../orders-management/components';
import {
  MOCK_ORDERS_KPIS,
  MOCK_ACTIVE_ORDER_COMMITMENTS,
  MOCK_REPEAT_PO_TEMPLATES,
  MOCK_CLIENT_TIERS,
  MOCK_DISPATCH_CHALLAN,
} from '../../data/mockOrdersData';
import {
  MOCK_ORDER_EXECUTION_ITEMS,
  MOCK_BOM_READINESS,
} from '../../data/mockOrdersManagementData';
import type { OrderCommitment, RepeatPoTemplate } from '../../types/orders';

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<Partial<OrderCommitment> | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<OrderCommitment | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [orders, setOrders] = useState<OrderCommitment[]>(MOCK_ACTIVE_ORDER_COMMITMENTS);
  const [metrics, setMetrics] = useState(MOCK_ORDERS_KPIS);

  const displayedOrders = React.useMemo(() => {
    if (activeTab === 'staging') {
      return orders.filter((o) => o.status === 'ready_for_dispatch');
    }
    return orders;
  }, [orders, activeTab]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExportCsv = () => {
    const headers = [
      'PO Number',
      'Client Name',
      'Part Description',
      'Quantity',
      'Unit',
      'Dispatch Due',
      'Assigned Machine',
      'Contract Value (INR)',
      'Status',
      'Progress %',
    ];

    const rows = orders.map((o) => [
      `"${o.poNumber}"`,
      `"${o.clientName}"`,
      `"${o.partDescription}"`,
      o.quantity,
      `"${o.unit}"`,
      `"${o.dispatchDue}"`,
      `"${o.assignedMachine}"`,
      o.contractValue,
      `"${o.statusLabel}"`,
      o.progressPercent,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'FactoryOS_Orders_Commitments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Orders exported to CSV successfully.');
  };

  const handleCreateOrder = (newOrderData: Partial<OrderCommitment>) => {
    const createdOrder: OrderCommitment = {
      id: `ord-${Date.now()}`,
      poNumber: newOrderData.poNumber || `PO #ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newOrderData.clientName || 'New Client',
      clientInitials: newOrderData.clientInitials || 'NC',
      partDescription: newOrderData.partDescription || 'Manufactured Components',
      quantity: newOrderData.quantity || 500,
      unit: newOrderData.unit || 'Units',
      dispatchDue: newOrderData.dispatchDue || 'Nov 25, 17:00 IST',
      isDispatchUrgent: false,
      assignedMachine: newOrderData.assignedMachine || 'Line 01 (CNC)',
      contractValue: newOrderData.contractValue || 250000,
      currencySymbol: '₹',
      status: 'in_machining',
      statusLabel: 'In Machining',
      statusVariant: 'inProgress',
      progressPercent: 20,
      needsQc: false,
    };

    setOrders((prev) => [createdOrder, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      totalActiveOrders: prev.totalActiveOrders + 1,
    }));

    showToast(`Order ${createdOrder.poNumber} created & line allocated.`);
  };

  const handleFastTrackQc = (order: OrderCommitment) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? {
              ...o,
              needsQc: false,
              status: 'ready_for_dispatch',
              statusLabel: 'Ready for Dispatch',
              statusVariant: 'completed',
              progressPercent: 100,
            }
          : o
      )
    );
    showToast(`Fast-Track QC cleared for ${order.poNumber}. Order staged for dispatch.`);
  };

  const handleViewAllocation = (order: OrderCommitment) => {
    setSelectedOrder(order);
  };

  const handleReIssueTemplate = (template: RepeatPoTemplate) => {
    setModalInitialData({
      clientName: template.clientName,
      partDescription: template.partDescription,
      quantity: template.quantity,
      unit: template.unit,
      poNumber: `PO #ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <OrdersTopHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        brandName="FactoryOS"
        userName="Oripio Studio"
        userEmail="oripiostudio@gmail.com"
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

        <OrdersHeader
          activeOrdersCount={metrics.totalActiveOrders}
          plantLocation="GIDC Naroda"
          onExportCsv={handleExportCsv}
          onNewPurchaseOrder={() => {
            setModalInitialData(undefined);
            setIsModalOpen(true);
          }}
        />

        <OrdersKpiGrid
          metrics={metrics}
          onFilterAtRisk={() =>
            showToast('Filtering orders requiring raw material or QC attention.')
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {activeTab === 'job_cards' ? (
              <OrderExecutionTable
                orders={MOCK_ORDER_EXECUTION_ITEMS}
                onAction={(item) =>
                  showToast(`Managing Job Card for ${item.poNumber}: Assigned to ${item.assignedLine}.`)
                }
              />
            ) : activeTab === 'staging' ? (
              <DispatchChallanStagingCard
                challan={MOCK_DISPATCH_CHALLAN}
                onViewChallan={() =>
                  showToast('Digital Gate Pass generated for Challan #DC-9021.')
                }
              />
            ) : activeTab === 'templates' ? (
              <RepeatPoTemplatesCard
                templates={MOCK_REPEAT_PO_TEMPLATES}
                onReIssue={handleReIssueTemplate}
                onRefresh={() => showToast('BOM templates refreshed from master catalog.')}
              />
            ) : (
              <ActiveOrdersList
                orders={displayedOrders}
                onFastTrackQc={handleFastTrackQc}
                onViewAllocation={handleViewAllocation}
                onMoreActions={(order) => setSelectedOrder(order)}
              />
            )}
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
            {activeTab === 'job_cards' ? (
              <BomReadinessCard items={MOCK_BOM_READINESS} />
            ) : (
              <>
                <RepeatPoTemplatesCard
                  templates={MOCK_REPEAT_PO_TEMPLATES}
                  onReIssue={handleReIssueTemplate}
                  onRefresh={() => showToast('BOM templates refreshed from master catalog.')}
                />
                <ClientTierPipelineCard
                  tiers={MOCK_CLIENT_TIERS}
                  quarterLabel="Q4 Active"
                  challan={MOCK_DISPATCH_CHALLAN}
                  onViewChallan={(c) =>
                    showToast(`${c.challanNumber} staging details: 17:30 local dispatch.`)
                  }
                />
              </>
            )}
          </div>
        </div>
      </main>

      <NewPurchaseOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrder}
        initialData={modalInitialData}
      />

      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onFastTrackQc={handleFastTrackQc}
        onDispatchStaging={(o) => showToast(`Order ${o.poNumber} staged for dispatch challan.`)}
      />
    </>
  );
};

export default OrdersPage;
