import type {
  OrderCommitment,
  RepeatPoTemplate,
  ClientTierItem,
  OrdersKpiMetrics,
  DispatchChallanInfo,
} from '../types/orders';

export const MOCK_ORDERS_KPIS: OrdersKpiMetrics = {
  totalActiveOrders: 12,
  pipelineValue: '₹14.85 Lakh committed order pipeline',
  inProductionBatches: 7,
  activeLines: 'Line 01 (CNC), Line 02 (Machining)',
  onTimeDeliveryRate: 95.8,
  onTimeDeliveryDelta: '+0.8%',
  onTimeDeliverySubtext: 'Target >95% on schedule',
  atRiskOrdersCount: 2,
  atRiskNote: 'Action required (1 RM delay, 1 QC pending)',
};

export const MOCK_ACTIVE_ORDER_COMMITMENTS: OrderCommitment[] = [
  {
    id: 'ord-1042',
    poNumber: 'PO #ORD-1042',
    clientName: 'Mehta Industrial Spares (Rajkot)',
    clientInitials: 'MI',
    partDescription: 'Custom Cast Gear Casings (Standard 280mm)',
    quantity: 850,
    unit: 'Units',
    dispatchDue: 'Tomorrow, 17:00 IST',
    isDispatchUrgent: true,
    assignedMachine: 'Machine M-01 (CNC Lathe)',
    contractValue: 425000,
    currencySymbol: '₹',
    status: 'awaiting_qc',
    statusLabel: 'Awaiting Final QC',
    statusVariant: 'pending',
    progressPercent: 90,
    needsQc: true,
  },
  {
    id: 'ord-1039',
    poNumber: 'PO #ORD-1039',
    clientName: 'Gujarat Auto Components (Sanand)',
    clientInitials: 'GA',
    partDescription: 'Mild Steel Flange Bushings (Series 40)',
    quantity: 1500,
    unit: 'Units',
    dispatchDue: 'Oct 24, 14:00 IST',
    isDispatchUrgent: false,
    assignedMachine: 'Machine M-02 (Lathe)',
    contractValue: 280000,
    currencySymbol: '₹',
    status: 'in_machining',
    statusLabel: 'In Machining',
    statusVariant: 'inProgress',
    progressPercent: 65,
    needsQc: false,
  },
  {
    id: 'ord-1035',
    poNumber: 'PO #ORD-1035',
    clientName: 'Vadodara Pumps & Valves',
    clientInitials: 'VP',
    partDescription: 'High-Tensile Shaft Mounts (EN8)',
    quantity: 400,
    unit: 'Units',
    dispatchDue: 'Oct 28, 12:00 IST',
    isDispatchUrgent: false,
    assignedMachine: 'Machine M-04 (VMC)',
    contractValue: 195000,
    currencySymbol: '₹',
    status: 'in_assembly',
    statusLabel: 'In Assembly',
    statusVariant: 'inProgress',
    progressPercent: 40,
    needsQc: false,
  },
];

export const MOCK_REPEAT_PO_TEMPLATES: RepeatPoTemplate[] = [
  {
    id: 'tpl-1',
    clientName: 'Gujarat Auto Components',
    partDescription: '1,500 MS Flange Bushings',
    quantity: 1500,
    unit: 'Units',
    cadence: 'Bi-weekly',
  },
  {
    id: 'tpl-2',
    clientName: 'Mehta Industrial Spares',
    partDescription: '850 Cast Gear Casings',
    quantity: 850,
    unit: 'Units',
    cadence: 'Monthly',
  },
];

export const MOCK_CLIENT_TIERS: ClientTierItem[] = [
  {
    id: 'tier-1',
    name: 'Tier-1 OEM Suppliers',
    amountFormatted: '₹9.80 Lakh',
    percentage: 66,
    colorVariant: 'navy',
  },
  {
    id: 'tier-2',
    name: 'Recurring Machining Accounts',
    amountFormatted: '₹3.80 Lakh',
    percentage: 25,
    colorVariant: 'mint',
  },
  {
    id: 'tier-3',
    name: 'Specialized Job Work',
    amountFormatted: '₹1.25 Lakh',
    percentage: 9,
    colorVariant: 'coral',
  },
];

export const MOCK_DISPATCH_CHALLAN: DispatchChallanInfo = {
  challanNumber: 'Challan #CH-408',
  destination: 'Sanand GIDC',
  departureTime: '17:30 IST',
  notes: 'Challan #CH-408 ready for local transport to Sanand GIDC at 17:30 IST.',
};
