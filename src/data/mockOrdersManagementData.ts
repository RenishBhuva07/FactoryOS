import type {
  OrdersManagementKpis,
  OrderExecutionItem,
  BomReadinessItem,
} from '../types/ordersManagement';

export const MOCK_ORDERS_MGMT_KPIS: OrdersManagementKpis = {
  activeExecutionOrders: 24,
  committedPipelineValue: '₹1.48 Cr Committed Value',
  bomReadinessPercent: 95.8,
  bomSubtext: 'All raw materials staged & verified',
  onTimeFulfillmentPercent: 98.2,
  fulfillmentDelta: '+1.4% vs benchmark',
  pendingClientSignOff: 2,
  signOffSubtext: 'Awaiting revision approval',
};

export const MOCK_ORDER_EXECUTION_ITEMS: OrderExecutionItem[] = [
  {
    id: 'oe-01',
    poNumber: 'PO #ORD-1042',
    clientName: 'Tata Motors Vendor Hub',
    partDescription: 'Cast Gear Casings (Standard 280mm)',
    quantityUnits: 500,
    assignedLine: 'Line 01 (CNC)',
    bomStatus: 'allocated',
    bomStatusLabel: 'BOM Allocated',
    fulfillmentStage: 'machining',
    fulfillmentStageLabel: 'In Machining',
    dispatchDueDate: 'Nov 20, 17:00 IST',
    contractValue: '₹3,40,000',
  },
  {
    id: 'oe-02',
    poNumber: 'PO #ORD-1039',
    clientName: 'L&T Heavy Engineering',
    partDescription: 'Mild Steel Flange Bushings',
    quantityUnits: 1200,
    assignedLine: 'Line 02 (Lathe)',
    bomStatus: 'allocated',
    bomStatusLabel: 'BOM Allocated',
    fulfillmentStage: 'quality_check',
    fulfillmentStageLabel: 'Quality Staging',
    dispatchDueDate: 'Nov 22, 12:00 IST',
    contractValue: '₹5,80,000',
  },
  {
    id: 'oe-03',
    poNumber: 'PO #ORD-1031',
    clientName: 'Bharat Gears Pune',
    partDescription: 'Precision Hardened Base Plates',
    quantityUnits: 350,
    assignedLine: 'Line 03 (Drilling)',
    bomStatus: 'partial',
    bomStatusLabel: 'BOM Partial',
    fulfillmentStage: 'cutting',
    fulfillmentStageLabel: 'Billet Cutting',
    dispatchDueDate: 'Nov 26, 18:00 IST',
    contractValue: '₹2,10,000',
  },
];

export const MOCK_BOM_READINESS: BomReadinessItem[] = [
  { id: 'bom-01', material: 'EN8 Carbon Rounds (32mm)', allocationPercent: 100, status: 'ready' },
  { id: 'bom-02', material: 'MS Hex Bolts Grade 8.8', allocationPercent: 92, status: 'ready' },
  { id: 'bom-03', material: 'Cast Iron Flange Castings', allocationPercent: 100, status: 'ready' },
  { id: 'bom-04', material: 'Water Soluble Cutting Oil', allocationPercent: 78, status: 'pending' },
];
