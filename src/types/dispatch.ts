export interface OutboundShipment {
  id: string;
  consignmentNumber: string;
  clientName: string;
  clientLocation: string;
  volumeUnits: number;
  volumePallets: number;
  productCategory: string;
  carrierName: string;
  vehicleNumber: string;
  gatePassNumber: string;
  gatePassTime: string;
  status: 'in_transit' | 'loading' | 'delayed';
  statusLabel: string;
  statusVariant: 'completed' | 'inProgress' | 'pending';
  delayReason?: string;
  actionType: 'track_gps' | 'sign_eway' | 'expedite_qc';
}

export interface LoadingBayStatus {
  bayId: string;
  bayNumber: string;
  status: 'occupied' | 'staging_ready' | 'available';
  statusLabel: string;
  carrierName?: string;
  vehicleNumber?: string;
  detail: string;
  loadPercent?: number;
}

export interface EWayBillSyncStatus {
  gatewayConnected: boolean;
  compliancePercent: number;
  dailyPassUsed: number;
  dailyPassLimit: number;
}

export interface DispatchKpiMetrics {
  dispatchesTodayDone: number;
  dispatchesTodayTotal: number;
  onSchedulePercent: number;
  remainingCount: number;
  inTransitValue: string;
  activeConsignmentsCount: number;
  avgGateTurnaroundMins: number;
  turnaroundDelta: string;
  turnaroundSubtext: string;
  delayedDispatchesCount: number;
  delayedBatchInfo: string;
}
