import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  OrdersTopHeader,
  OrdersHeader,
  OrdersKpiGrid,
  ActiveOrdersList,
  OrderCommitmentCard,
  RepeatPoTemplatesCard,
  ClientTierPipelineCard,
  DispatchChallanStagingCard,
  NewPurchaseOrderModal,
  OrderDetailDrawer,
  OrderExecutionTable,
  BomReadinessCard,
  IssueJobCardModal,
  OrdersManagementKpiGrid,
} from "./components";
import {
  MOCK_REPEAT_PO_TEMPLATES,
  MOCK_CLIENT_TIERS,
  MOCK_DISPATCH_CHALLAN,
  MOCK_BOM_READINESS,
} from "../../data/mockOrdersData";
import { useFactoryStore, useAuth } from "../../context";
import type {
  OrderCommitment,
  RepeatPoTemplate,
  OrdersKpiMetrics,
  DispatchChallanInfo,
  OrderExecutionItem,
  OrdersManagementKpis,
} from "../../types/orders";
import type { IssueJobCardParams } from "../../types/factoryStore";

export const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const {
    orders,
    orderExecutions,
    createOrder,
    updateOrderStatus,
    issueJobCard,
  } = useFactoryStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabParam = searchParams.get("tab") || "pipeline";
  const activeTab = currentTabParam === "active" ? "pipeline" : currentTabParam;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<
    Partial<OrderCommitment> | undefined
  >(undefined);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueJobCardPo, setIssueJobCardPo] = useState<string | undefined>(
    undefined,
  );
  const [ordersFilter, setOrdersFilter] = useState<'all' | 'needs_qc'>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderCommitment | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTabChange = (newTabId: string) => {
    setSearchParams({ tab: newTabId });
  };

  const metrics = useMemo<OrdersKpiMetrics>(() => {
    const active = orders.filter((o) => o.status !== "completed");
    const totalVal = orders.reduce((sum, o) => sum + o.contractValue, 0);
    const inProd = orders.filter(
      (o) =>
        o.status === "in_machining" ||
        o.status === "in_production" ||
        o.status === "in_assembly",
    ).length;
    const qcPending = orders.filter(
      (o) => o.needsQc || o.status === "awaiting_qc",
    ).length;

    return {
      totalActiveOrders: active.length,
      pipelineValue: `₹${(totalVal / 100000).toFixed(1)} Lakh committed pipeline`,
      inProductionBatches: inProd,
      activeLines: "Line 01 (CNC), Line 02 (Machining)",
      onTimeDeliveryRate: 95.8,
      onTimeDeliveryDelta: "+0.8%",
      onTimeDeliverySubtext: "Target >95% on schedule",
      atRiskOrdersCount: qcPending,
      atRiskNote: `${qcPending} QC pending, 0 overdue commitments`,
    };
  }, [orders]);

  const ordersMgmtMetrics = useMemo<OrdersManagementKpis>(() => {
    const totalVal = orders.reduce((sum, o) => sum + o.contractValue, 0);
    const pendingQc = orders.filter(
      (o) => o.needsQc || o.status === "awaiting_qc",
    ).length;

    return {
      activeExecutionOrders: orderExecutions.length,
      committedPipelineValue: `₹${(totalVal / 100000).toFixed(1)} Lakh Committed Value`,
      bomReadinessPercent: 95.8,
      bomSubtext: "All raw materials staged & verified",
      onTimeFulfillmentPercent: 98.2,
      fulfillmentDelta: "+1.4% vs benchmark",
      pendingClientSignOff: pendingQc,
      signOffSubtext:
        pendingQc > 0 ? "Awaiting revision / QC approval" : "All orders cleared",
    };
  }, [orderExecutions, orders]);

  const stagedOrders = useMemo(() => {
    return orders.filter((o) => o.status === "ready_for_dispatch");
  }, [orders]);

  const displayedOrders = useMemo(() => {
    if (activeTab === "staging") {
      return stagedOrders;
    }
    return orders;
  }, [orders, stagedOrders, activeTab]);

  const handleExportCsv = () => {
    const headers = [
      "PO Number",
      "Client Name",
      "Part Description",
      "Quantity",
      "Unit",
      "Dispatch Due",
      "Assigned Machine",
      "Contract Value (INR)",
      "Status",
      "Progress %",
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
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FactoryOS_Orders_Commitments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Orders exported to CSV successfully.");
  };

  const handleExportMatrix = () => {
    const headers = [
      "PO Number",
      "Client Name",
      "Part Description",
      "Quantity",
      "Assigned Line",
      "BOM Status",
      "Fulfillment Stage",
      "Dispatch Due",
      "Contract Value",
    ];

    const rows = orderExecutions.map((o) => [
      `"${o.poNumber}"`,
      `"${o.clientName}"`,
      `"${o.partDescription}"`,
      o.quantityUnits,
      `"${o.assignedLine}"`,
      `"${o.bomStatusLabel}"`,
      `"${o.fulfillmentStageLabel}"`,
      `"${o.dispatchDueDate}"`,
      `"${o.contractValue}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FactoryOS_Order_Execution_Matrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Order Execution Matrix exported to CSV.");
  };

  const handleCreateOrder = (newOrderData: Partial<OrderCommitment>) => {
    const created = createOrder({
      poNumber: newOrderData.poNumber,
      clientName: newOrderData.clientName || "New MSME Client",
      clientInitials: newOrderData.clientInitials,
      partDescription:
        newOrderData.partDescription || "Precision Machined Parts",
      quantity: newOrderData.quantity || 500,
      unit: newOrderData.unit || "Units",
      dispatchDue: newOrderData.dispatchDue || "Next Week, 17:00 IST",
      assignedMachine: newOrderData.assignedMachine || "Line 01 (CNC Lathe)",
      contractValue: newOrderData.contractValue || 250000,
    });

    showToast(`Order ${created.poNumber} created & line allocated.`);
  };

  const handleIssueJobCardSubmit = (params: IssueJobCardParams) => {
    issueJobCard(params);
    showToast(
      `Job Card for ${params.poNumber} dispatched to ${params.assignedLine}!`,
    );
  };

  const handleFastTrackQc = (order: OrderCommitment) => {
    updateOrderStatus(order.id, "ready_for_dispatch", 100);
    showToast(
      `Fast-Track QC cleared for ${order.poNumber}. Order staged for dispatch.`,
    );
  };

  const handleViewAllocation = (order: OrderCommitment) => {
    setSelectedOrder(order);
  };

  const handleManageJob = (item: OrderExecutionItem) => {
    const matched = orders.find((o) => o.poNumber === item.poNumber);
    if (matched) {
      setSelectedOrder(matched);
    } else {
      showToast(
        `Job Card ${item.poNumber}: Scheduled on ${item.assignedLine} (${item.fulfillmentStageLabel}).`,
      );
    }
  };

  const handleExpediteBom = (item: OrderExecutionItem) => {
    showToast(
      `Stores requisition generated for ${item.partDescription} (${item.poNumber}) — High-priority staging alert sent to Bay A-12!`,
    );
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

  const handleViewChallan = (challan: DispatchChallanInfo) => {
    showToast(`${challan.challanNumber} staging details: 17:30 local dispatch.`);
  };

  const handleGenerateGatePass = () => {
    if (stagedOrders.length > 0) {
      showToast(
        `Digital Gate Pass #GP-8842 issued for ${stagedOrders.length} staged order(s).`,
      );
    } else {
      showToast("Digital Gate Pass #GP-8842 generated for Challan #DC-9021.");
    }
  };

  return (
    <>
      <OrdersTopHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        brandName="FactoryOS"
        userName={user?.name || "Rajesh Bhai Patel"}
        userEmail={user?.email || "rajesh@apexeng.in"}
        ordersCount={orders.length}
        jobsCount={orderExecutions.length}
        templatesCount={MOCK_REPEAT_PO_TEMPLATES.length}
        stagingCount={stagedOrders.length}
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
              className="ml-2 text-white/70 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          </div>
        )}

        <OrdersHeader
          activeTab={activeTab}
          activeOrdersCount={metrics.totalActiveOrders}
          activeJobsCount={orderExecutions.length}
          templatesCount={MOCK_REPEAT_PO_TEMPLATES.length}
          stagingCount={stagedOrders.length}
          plantLocation="GIDC Naroda"
          onExportCsv={handleExportCsv}
          onNewPurchaseOrder={() => {
            setModalInitialData(undefined);
            setIsModalOpen(true);
          }}
          onExportMatrix={handleExportMatrix}
          onIssueJobCard={() => setIsIssueModalOpen(true)}
          onRefreshCatalog={() =>
            showToast("BOM templates refreshed from master catalog.")
          }
          onGenerateGatePass={handleGenerateGatePass}
        />

        {activeTab === "job_cards" ? (
          <OrdersManagementKpiGrid
            metrics={ordersMgmtMetrics}
            onFilterDelay={() =>
              showToast("Filtered: Showing jobs with material shortage delay.")
            }
          />
        ) : (
          <OrdersKpiGrid
            metrics={metrics}
            onFilterAtRisk={() => {
              setOrdersFilter("needs_qc");
              showToast(
                "Filtered: Showing orders requiring raw material or QC attention.",
              );
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {activeTab === "job_cards" ? (
              <OrderExecutionTable
                orders={orderExecutions}
                onAction={handleManageJob}
                onExpediteBom={handleExpediteBom}
              />
            ) : activeTab === "staging" ? (
              <div className="space-y-3.5 flex flex-col">
                <DispatchChallanStagingCard
                  challan={MOCK_DISPATCH_CHALLAN}
                  onViewChallan={handleGenerateGatePass}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#002941]">
                        Orders Staged for Outbound Gate Pass
                      </h3>
                      <p className="text-xs text-[#566E7F]">
                        Batches passed QC awaiting loading dock staging
                      </p>
                    </div>
                    <span className="text-xs text-[#2D8576] font-bold bg-[#E4F4F0] px-3 py-1 rounded-full">
                      {stagedOrders.length} Orders Staged
                    </span>
                  </div>

                  {stagedOrders.length > 0 ? (
                    stagedOrders.map((order) => (
                      <OrderCommitmentCard
                        key={order.id}
                        order={order}
                        onFastTrackQc={handleFastTrackQc}
                        onViewAllocation={handleViewAllocation}
                        onMoreActions={(o) => setSelectedOrder(o)}
                      />
                    ))
                  ) : (
                    <div className="bg-white border border-[#DFECF3] rounded-2xl p-8 text-center space-y-2">
                      <span className="material-symbols-outlined text-3xl text-[#8DA1AF]">
                        local_shipping
                      </span>
                      <p className="text-sm font-semibold text-[#002941]">
                        No Orders Staged Yet
                      </p>
                      <p className="text-xs text-[#566E7F]">
                        Orders cleared by QC will appear here for dispatch staging.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "templates" ? (
              <RepeatPoTemplatesCard
                templates={MOCK_REPEAT_PO_TEMPLATES}
                onReIssue={handleReIssueTemplate}
                onRefresh={() =>
                  showToast("BOM templates refreshed from master catalog.")
                }
              />
            ) : (
              <ActiveOrdersList
                orders={displayedOrders}
                activeFilter={ordersFilter}
                onFilterChange={(f) => setOrdersFilter(f as "all" | "needs_qc")}
                onFastTrackQc={handleFastTrackQc}
                onViewAllocation={handleViewAllocation}
                onMoreActions={(order) => setSelectedOrder(order)}
              />
            )}
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5">
            {activeTab === "job_cards" ? (
              <>
                <BomReadinessCard items={MOCK_BOM_READINESS} />
                <div className="p-4 rounded-2xl bg-[#F8FAFA] border border-[#DFECF3] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#002941] uppercase tracking-wider">
                      Shopfloor Capacity
                    </span>
                    <span className="text-[11px] font-bold text-[#2D8576] bg-[#E4F4F0] px-2 py-0.5 rounded-full">
                      88% Assigned
                    </span>
                  </div>
                  <p className="text-xs text-[#566E7F] leading-relaxed">
                    Lines 01 and 02 are actively engaged in CNC turning and milling. New job cards will queue behind active spindle batches.
                  </p>
                </div>
              </>
            ) : activeTab === "templates" ? (
              <ClientTierPipelineCard
                tiers={MOCK_CLIENT_TIERS}
                quarterLabel="Q4 Active"
                challan={MOCK_DISPATCH_CHALLAN}
                onViewChallan={handleViewChallan}
              />
            ) : (
              <>
                <RepeatPoTemplatesCard
                  templates={MOCK_REPEAT_PO_TEMPLATES}
                  onReIssue={handleReIssueTemplate}
                  onRefresh={() =>
                    showToast("BOM templates refreshed from master catalog.")
                  }
                />
                <ClientTierPipelineCard
                  tiers={MOCK_CLIENT_TIERS}
                  quarterLabel="Q4 Active"
                  challan={MOCK_DISPATCH_CHALLAN}
                  onViewChallan={handleViewChallan}
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

      <IssueJobCardModal
        isOpen={isIssueModalOpen}
        onClose={() => {
          setIsIssueModalOpen(false);
          setIssueJobCardPo(undefined);
        }}
        orders={orders}
        initialPoNumber={issueJobCardPo}
        onSubmit={handleIssueJobCardSubmit}
      />

      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onFastTrackQc={handleFastTrackQc}
        onDispatchStaging={(o) => {
          updateOrderStatus(o.id, "ready_for_dispatch", 100);
          showToast(`Order ${o.poNumber} staged for dispatch challan.`);
        }}
        onIssueJobCard={(o) => {
          setSelectedOrder(null);
          setIssueJobCardPo(o.poNumber);
          setIsIssueModalOpen(true);
        }}
      />
    </>
  );
};

export default OrdersPage;
