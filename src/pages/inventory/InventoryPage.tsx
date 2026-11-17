import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  InventoryHeader,
  SafetyStockAlertBanner,
  InventoryKpiGrid,
  StoresInventoryTable,
  InventoryBottomCards,
  NewPurchaseRequisitionModal,
} from './components';
import {
  MOCK_INVENTORY_KPIS,
  MOCK_INVENTORY_ITEMS,
  MOCK_SUPPLIER_RELIABILITY,
} from '../../data/mockInventoryData';
import type { InventoryItem, InventoryKpiMetrics } from '../../types/inventory';

export const InventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const [items] = useState<InventoryItem[]>(MOCK_INVENTORY_ITEMS);
  const [kpis, setKpis] = useState<InventoryKpiMetrics>(MOCK_INVENTORY_KPIS);
  const [isRequisitionModalOpen, setIsRequisitionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayedItems = React.useMemo(() => {
    if (activeTab === 'safety') {
      return items.filter((i) => i.status === 'low_stock' || i.status === 'reorder_due' || i.currentStock <= i.reorderLevel);
    }
    return items;
  }, [items, activeTab]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenRequisitionModal = () => {
    setIsRequisitionModalOpen(true);
  };

  const handleRequisitionSubmit = (data: {
    materialName: string;
    sku: string;
    requiredQuantity: number;
    unit: string;
    estimatedCost: number;
    supplierName: string;
    urgencyLevel: 'standard' | 'critical';
  }) => {
    setKpis((prev) => ({
      ...prev,
      pendingInboundCount: prev.pendingInboundCount + 1,
      pendingInboundDescription: `${data.materialName.slice(0, 20)}... pending vendor confirmation`,
    }));
    showToast(`Purchase Requisition (₹${data.estimatedCost.toLocaleString('en-IN')}) submitted for ${data.materialName}!`);
  };

  const handleGoodsReceipt = () => {
    showToast('GRN Entry Form opened: Scan delivery challan QR or enter vendor invoice.');
  };

  const handleActionMenu = (item: InventoryItem) => {
    showToast(`Quick actions for ${item.materialName}: Reorder, adjust stock, or view bin movement history.`);
  };

  const handleCreateGrn = () => {
    showToast('Drafting new Goods Receipt Note (#2024-090).');
  };

  const inventoryTabs = [
    { id: 'stores', label: 'Stores Master', badge: String(items.length) },
    { id: 'bins', label: 'Bin Cards' },
    { id: 'safety', label: 'Safety Stock Alerts', badge: '2' },
    { id: 'suppliers', label: 'Supplier Scorecards' },
  ];

  return (
    <>
      <AppTopHeader
        tabs={inventoryTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="STORES"
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

        <InventoryHeader
          onGoodsReceipt={handleGoodsReceipt}
          onNewPurchaseOrder={handleOpenRequisitionModal}
        />

        <SafetyStockAlertBanner onGenerateRequisition={handleOpenRequisitionModal} />

        <InventoryKpiGrid
          metrics={kpis}
          onFilterLowStock={() => showToast('Filtered: Showing 2 items breached below reorder level.')}
        />

        <StoresInventoryTable items={displayedItems} onActionMenu={handleActionMenu} />

        {(activeTab === 'stores' || activeTab === 'suppliers') && (
          <InventoryBottomCards
            suppliers={MOCK_SUPPLIER_RELIABILITY}
            onCreateGrn={handleCreateGrn}
          />
        )}
      </main>

      <NewPurchaseRequisitionModal
        isOpen={isRequisitionModalOpen}
        onClose={() => setIsRequisitionModalOpen(false)}
        onSubmit={handleRequisitionSubmit}
      />
    </>
  );
};

export default InventoryPage;
