import React, { useState } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  InventoryHeader,
  SafetyStockAlertBanner,
  InventoryKpiGrid,
  StoresInventoryTable,
  InventoryBottomCards,
  NewPurchaseRequisitionModal,
  GoodsReceiptModal,
  AdjustStockModal,
} from "./components";
import {
  MOCK_INVENTORY_KPIS,
  MOCK_SUPPLIER_RELIABILITY,
} from "../../data/mockInventoryData";
import { useFactoryStore } from "../../context";
import type { InventoryItem } from "../../types/inventory";

export const InventoryPage: React.FC = () => {
  const { inventoryItems, adjustStock, recordGoodsReceipt } = useFactoryStore();

  const [activeTab, setActiveTab] = useState("stores");
  const [selectedItemForAdjustment, setSelectedItemForAdjustment] =
    useState<InventoryItem | null>(null);
  const [isRequisitionModalOpen, setIsRequisitionModalOpen] = useState(false);
  const [isGrnModalOpen, setIsGrnModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayedItems = React.useMemo(() => {
    if (activeTab === "safety") {
      return inventoryItems.filter(
        (i) =>
          i.status === "low_stock" ||
          i.status === "reorder_due" ||
          i.currentStock <= i.reorderLevel,
      );
    }
    return inventoryItems;
  }, [inventoryItems, activeTab]);

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
  }) => {
    showToast(
      `Purchase Requisition (₹${data.estimatedCost.toLocaleString("en-IN")}) issued for ${data.materialName} to ${data.supplierName}!`,
    );
  };

  const handleGoodsReceipt = () => {
    setIsGrnModalOpen(true);
  };

  const handleGrnSubmit = (params: {
    poOrInvoice: string;
    items: { itemId: string; quantityReceived: number }[];
    supplierName: string;
  }) => {
    recordGoodsReceipt(params);
    showToast(
      `Goods Receipt Note registered! Stock updated for received consignment.`,
    );
  };

  const handleActionMenu = (item: InventoryItem) => {
    setSelectedItemForAdjustment(item);
    setIsAdjustModalOpen(true);
  };

  const handleStockAdjustSubmit = (
    itemId: string,
    delta: number,
    reason: string,
  ) => {
    adjustStock(itemId, delta, reason);
    showToast(`Stock updated: ${delta > 0 ? "+" : ""}${delta} (${reason}).`);
  };

  const lowStockCount = inventoryItems.filter(
    (i) => i.status === "low_stock" || i.status === "reorder_due",
  ).length;

  const inventoryTabs = [
    {
      id: "stores",
      label: "Stores Master",
      badge: String(inventoryItems.length),
    },
    { id: "bins", label: "Bin Cards" },
    {
      id: "safety",
      label: "Safety Stock Alerts",
      badge: lowStockCount > 0 ? String(lowStockCount) : undefined,
    },
    { id: "suppliers", label: "Supplier Scorecards" },
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
            <span className="text-xs sm:text-sm font-medium">
              {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          </div>
        )}

        <InventoryHeader
          onGoodsReceipt={handleGoodsReceipt}
          onNewPurchaseOrder={handleOpenRequisitionModal}
        />

        {lowStockCount > 0 && (
          <SafetyStockAlertBanner
            onGenerateRequisition={handleOpenRequisitionModal}
          />
        )}

        <InventoryKpiGrid
          metrics={MOCK_INVENTORY_KPIS}
          onFilterLowStock={() => setActiveTab("safety")}
        />

        <StoresInventoryTable
          items={displayedItems}
          onActionMenu={handleActionMenu}
        />

        {(activeTab === "stores" || activeTab === "suppliers") && (
          <InventoryBottomCards
            suppliers={MOCK_SUPPLIER_RELIABILITY}
            onCreateGrn={handleGoodsReceipt}
          />
        )}
      </main>

      <NewPurchaseRequisitionModal
        isOpen={isRequisitionModalOpen}
        onClose={() => setIsRequisitionModalOpen(false)}
        onSubmit={handleRequisitionSubmit}
      />

      <GoodsReceiptModal
        isOpen={isGrnModalOpen}
        onClose={() => setIsGrnModalOpen(false)}
        items={inventoryItems}
        onSubmit={handleGrnSubmit}
      />

      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        item={selectedItemForAdjustment}
        onAdjust={handleStockAdjustSubmit}
      />
    </>
  );
};

export default InventoryPage;
