import React, { useState } from "react";
import { AppTopHeader } from "../../components/layout";
import {
  DispatchHeader,
  DispatchKpiGrid,
  ActiveShipmentsTable,
  LoadingBayStatusCard,
  EWayBillSyncCard,
  ScheduleDispatchModal,
  BulkGatePassModal,
} from "./components";
import {
  MOCK_DISPATCH_KPIS,
  MOCK_LOADING_BAYS,
  MOCK_EWAY_BILL_SYNC,
} from "../../data/mockDispatchData";
import { useFactoryStore } from "../../context/useFactoryStore";
import type { OutboundShipment } from "../../types/dispatch";

export const DispatchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [kpis, setKpis] = useState(MOCK_DISPATCH_KPIS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { dispatches, scheduleDispatch, signGatePass } = useFactoryStore();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTrackGps = (shipment: OutboundShipment) => {
    showToast(
      `Live GPS tracking opened for ${shipment.carrierName} (${shipment.vehicleNumber}).`,
    );
  };

  const handleSignEWayBill = (shipment: OutboundShipment) => {
    signGatePass(shipment.id);
    showToast(
      `E-Way Bill signed & digital gate pass generated for ${shipment.consignmentNumber}.`,
    );
  };

  const handleExpediteQc = (shipment: OutboundShipment) => {
    signGatePass(shipment.id);
    setKpis((prev) => ({
      ...prev,
      delayedDispatchesCount: Math.max(0, prev.delayedDispatchesCount - 1),
      delayedBatchInfo: "All active consignments cleared for loading.",
    }));
    showToast(
      `QC expedited for ${shipment.consignmentNumber}! Consignment moved to Loading Dock.`,
    );
  };

  const handleScheduleSubmit = (payload: {
    client: string;
    carrier: string;
    vehicle: string;
    units: number;
    dockBay: string;
  }) => {
    const created = scheduleDispatch({
      client: payload.client,
      carrier: payload.carrier,
      vehicle: payload.vehicle,
      units: payload.units,
      dockBay: payload.dockBay,
    });

    setKpis((prev) => ({
      ...prev,
      dispatchesTodayDone: prev.dispatchesTodayDone + 1,
      inTransitValue: "₹52.4 Lakh",
    }));
    showToast(
      `Consignment ${created.consignmentNumber} scheduled to ${payload.carrier}!`,
    );
  };

  const handleSignBulkGatePass = (selectedIds: string[]) => {
    selectedIds.forEach((id) => signGatePass(id));
    showToast(
      `Bulk digital gate passes authorized for ${selectedIds.length} consignments.`,
    );
  };

  const dispatchTabs = [
    {
      id: "active",
      label: "Active Shipments",
      badge: String(dispatches.length),
    },
    { id: "bays", label: "Loading Bays", badge: "3" },
    { id: "eway", label: "E-Way Portal" },
    { id: "corridor", label: "Gujarat Corridor" },
  ];

  return (
    <>
      <AppTopHeader
        tabs={dispatchTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        roleBadge="DISPATCH"
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

        <DispatchHeader
          onGenerateBulkGatePass={() => setIsBulkModalOpen(true)}
          onScheduleDispatch={() => setIsScheduleModalOpen(true)}
        />

        <DispatchKpiGrid
          metrics={kpis}
          onFilterDelayed={() =>
            showToast(
              "Filtered: Showing consignments requiring QC expedite clearance.",
            )
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ActiveShipmentsTable
              shipments={dispatches}
              onTrackGps={handleTrackGps}
              onSignEWayBill={handleSignEWayBill}
              onExpediteQc={handleExpediteQc}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <LoadingBayStatusCard bays={MOCK_LOADING_BAYS} />
            <EWayBillSyncCard status={MOCK_EWAY_BILL_SYNC} />
          </div>
        </div>
      </main>

      <ScheduleDispatchModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleSubmit}
      />

      <BulkGatePassModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        shipments={dispatches}
        onSignBulkGatePass={handleSignBulkGatePass}
      />
    </>
  );
};

export default DispatchPage;
