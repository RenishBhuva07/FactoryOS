export type OrderStatus =
  | 'awaiting_qc'
  | 'in_machining'
  | 'in_assembly'
  | 'in_production'
  | 'ready_for_dispatch'
  | 'completed';

export interface OrderCommitment {
  id: string;
  poNumber: string;
  clientName: string;
  clientInitials: string;
  partDescription: string;
  quantity: number;
  unit: string;
  dispatchDue: string;
  isDispatchUrgent?: boolean;
  assignedMachine: string;
  contractValue: number;
  currencySymbol?: string;
  status: OrderStatus;
  statusLabel: string;
  statusVariant: 'pending' | 'inProgress' | 'completed' | 'issue';
  progressPercent: number;
  needsQc?: boolean;
}

export interface RepeatPoTemplate {
  id: string;
  clientName: string;
  partDescription: string;
  quantity: number;
  unit: string;
  cadence: string;
}

export interface ClientTierItem {
  id: string;
  name: string;
  amountFormatted: string;
  percentage: number;
  colorVariant: 'navy' | 'mint' | 'coral' | 'muted';
}

export interface OrdersKpiMetrics {
  totalActiveOrders: number;
  pipelineValue: string;
  inProductionBatches: number;
  activeLines: string;
  onTimeDeliveryRate: number;
  onTimeDeliveryDelta: string;
  onTimeDeliverySubtext: string;
  atRiskOrdersCount: number;
  atRiskNote: string;
}

export interface DispatchChallanInfo {
  challanNumber: string;
  destination: string;
  departureTime: string;
  notes: string;
}
