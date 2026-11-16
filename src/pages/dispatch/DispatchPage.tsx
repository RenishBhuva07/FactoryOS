import React, { useState } from 'react';
import { AppTopHeader } from '../../components/layout';
import {
  DispatchHeader,
  DispatchKpiGrid,
  ActiveShipmentsTable,
  LoadingBayStatusCard,
  EWayBillSyncCard,
  ScheduleDispatchModal,
} from './components';
import {
  MOCK_DISPATCH_KPIS,
  MOCK_OUTBOUND_SHIPMENTS,
  MOCK_LOADING_BAYS,
  MOCK_EWAY_BILL_SYNC,
} from '../../data/mockDispatchData';
import type { OutboundShipment } from '../../types/dispatch';

export const DispatchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [shipments, setShipments] = useState<OutboundShipment[]>(MOCK_OUTBOUND_SHIPMENTS);
  const [kpis, setKpis] = useState(MOCK_DISPATCH_KPIS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTrackGps = (shipment: OutboundShipment) => {
    showToast(`Live GPS tracking opened for ${shipment.carrierName} (${shipment.vehicleNumber}).`);
  };

  const handleSignEWayBill = (shipment: OutboundShipment) => {
    showToast(`E-Way Bill signed & digital gate pass generated for ${shipment.consignmentNumber}.`);
  };

  const handleExpediteQc = (shipment: OutboundShipment) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === shipment.id
          ? {
              ...s,
              status: 'loading',
              statusLabel: 'Staging for Bay',
              statusVariant: 'inProgress',
              actionType: 'sign_eway',
              gatePassNumber: '#GP-8833',
              gatePassTime: 'Issued: Just now',
            }
          : s
      )
    );
    setKpis((prev) => ({
      ...prev,
      delayedDispatchesCount: Math.max(0, prev.delayedDispatchesCount - 1),
      delayedBatchInfo: 'All active consignments cleared for loading.',
    }));
    showToast(`QC expedited for ${shipment.consignmentNumber}! Consignment moved to Loading Dock.`);
  };

  const handleScheduleSubmit = (payload: {
    client: string;
    carrier: string;
    vehicle: string;
    units: number;
    dockBay: string;
  }) => {
    const newShipment: OutboundShipment = {
      id: `dsp-${Date.now()}`,
      consignmentNumber: `#DSP-${Math.floor(4022 + Math.random() * 100)}`,
      clientName: payload.client,
      clientLocation: 'Gujarat Industrial Corridor',
      volumeUnits: payload.units,
      volumePallets: Math.ceil(payload.units / 300),
      productCategory: 'Finished Assemblies',
      carrierName: payload.carrier,
      vehicleNumber: payload.vehicle,
      gatePassNumber: `#GP-${Math.floor(8834 + Math.random() * 100)}`,
      gatePassTime: 'Issued: Just now',
      status: 'loading',
      statusLabel: `Dock Staged (${payload.dockBay})`,
      statusVariant: 'inProgress',
      actionType: 'sign_eway',
    };

    setShipments((prev) => [newShipment, ...prev]);
    setKpis((prev) => ({
      ...prev,
      dispatchesTodayDone: prev.dispatchesTodayDone + 1,
      inTransitValue: '₹52.4 Lakh',
    }));
    showToast(`Consignment ${newShipment.consignmentNumber} scheduled to ${payload.carrier}!`);
  };

  const dispatchTabs = [
    { id: 'active', label: 'Active Shipments', badge: String(shipments.length) },
    { id: 'bays', label: 'Loading Bays', badge: '3' },
    { id: 'eway', label: 'E-Way Portal' },
    { id: 'corridor', label: 'Gujarat Corridor' },
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

        <DispatchHeader
          onGenerateBulkGatePass={() =>
            showToast('Bulk Gate Pass generated for 18 active corridor vehicles.')
          }
          onScheduleDispatch={() => setIsScheduleModalOpen(true)}
        />

        <DispatchKpiGrid
          metrics={kpis}
          onFilterDelayed={() =>
            showToast('Filtered: Showing consignments requiring QC expedite clearance.')
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start flex-1 min-h-0">
          <div className="lg:col-span-8 flex flex-col">
            <ActiveShipmentsTable
              shipments={shipments}
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
    </>
  );
};

export default DispatchPage;
