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
