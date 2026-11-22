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

export interface OrderExecutionItem {
  id: string;
  poNumber: string;
  clientName: string;
  partDescription: string;
  quantityUnits: number;
  assignedLine: string;
  bomStatus: 'allocated' | 'partial' | 'pending';
  bomStatusLabel: string;
  fulfillmentStage: 'cutting' | 'machining' | 'quality_check' | 'staged_dispatch';
  fulfillmentStageLabel: string;
  dispatchDueDate: string;
  contractValue: string;
}

export interface OrdersManagementKpis {
  activeExecutionOrders: number;
  committedPipelineValue: string;
  bomReadinessPercent: number;
  bomSubtext: string;
  onTimeFulfillmentPercent: number;
  fulfillmentDelta: string;
  pendingClientSignOff: number;
  signOffSubtext: string;
}

export interface BomReadinessItem {
  id: string;
  material: string;
  allocationPercent: number;
  status: 'ready' | 'pending';
}
