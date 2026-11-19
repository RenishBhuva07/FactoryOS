import type {
  FactoryOutputKpi,
  WorkforceAttendanceKpi,
  ActiveOrdersKpi,
  MachineStatusKpi,
  HourlyOutputMetric,
  AttentionAlertItem,
  ManagerActivityItem,
} from "./dashboard";
import type { OrderCommitment, OrderStatus } from "./orders";
import type { OrderExecutionItem } from "./ordersManagement";
import type { AssemblyLineStatus, ProductionLogEntry } from "./production";
import type { WorkstationMachine, SecondaryMachine } from "./machines";
import type { InventoryItem } from "./inventory";
import type { TeamMemberRoster } from "./team";
import type { QualityInspectionBatch } from "./quality";
import type { OutboundShipment } from "./dispatch";

export interface OfflineProductionSlip {
  id: string;
  jobCard: string;
  machine: string;
  goodUnits: number;
  scrapUnits: number;
  defectReason: string;
  notes: string;
  operatorName: string;
  timestamp: string;
}

export interface MachineIssueTicket {
  id: string;
  machineId: string;
  machineCode: string;
  category: string;
  severity: "critical" | "moderate" | "minor";
  description: string;
  reportedBy: string;
  timestamp: string;
  status: "open" | "in_progress" | "resolved";
  estimatedDowntimeMinutes?: number;
}

export interface LogProductionParams {
  jobCard: string;
  machine: string;
  goodUnits: number;
  scrapUnits: number;
  defectReason?: string;
  notes?: string;
  operatorName?: string;
  isOffline?: boolean;
}

export interface ReportMachineIssueParams {
  machineId: string;
  category: string;
  severity: "critical" | "moderate" | "minor";
  description: string;
  reportedBy?: string;
  downtimeMinutes?: number;
}

export interface CreateOrderParams {
  poNumber?: string;
  clientName: string;
  clientInitials?: string;
  partDescription: string;
  quantity: number;
  unit?: string;
  dispatchDue?: string;
  assignedMachine?: string;
  contractValue: number;
}

export interface IssueJobCardParams {
  poNumber: string;
  clientName: string;
  partDescription: string;
  quantityUnits: number;
  assignedLine: string;
  dispatchDueDate?: string;
  contractValue?: string;
}

export interface ScheduleDispatchParams {
  client: string;
  carrier: string;
  vehicle: string;
  units: number;
  dockBay: string;
  orderPoNumber?: string;
}

export interface FactoryStoreState {
  orders: OrderCommitment[];
  orderExecutions: OrderExecutionItem[];
  machines: WorkstationMachine[];
  secondaryMachines: SecondaryMachine[];
  productionLogs: ProductionLogEntry[];
  assemblyLines: AssemblyLineStatus[];
  hourlyOutput: HourlyOutputMetric[];
  attendanceRoster: TeamMemberRoster[];
  inventoryItems: InventoryItem[];
  qualityInspections: QualityInspectionBatch[];
  dispatches: OutboundShipment[];
  attentionAlerts: AttentionAlertItem[];
  managerActivities: ManagerActivityItem[];
  machineIssueTickets: MachineIssueTicket[];
  offlineQueue: OfflineProductionSlip[];
  factoryOutput: FactoryOutputKpi;
  workforceAttendance: WorkforceAttendanceKpi;
  activeOrdersKpi: ActiveOrdersKpi;
  machineStatusKpi: MachineStatusKpi;
}

export interface FactoryStoreActions {
  createOrder: (params: CreateOrderParams) => OrderCommitment;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    progressPercent?: number,
  ) => void;
  issueJobCard: (params: IssueJobCardParams) => OrderExecutionItem;
  logProduction: (params: LogProductionParams) => { queuedOffline: boolean };
  syncOfflineQueue: () => number;
  reportMachineIssue: (params: ReportMachineIssueParams) => string;
  resolveMachineMaintenance: (
    machineId: string,
    resolutionNotes?: string,
  ) => void;
  updateAttendance: (
    memberId: string,
    status: "on_spindle" | "on_break" | "overtime" | "absent",
    station?: string,
  ) => void;
  bulkMarkAttendance: (status: "on_spindle" | "absent") => void;
  adjustStock: (itemId: string, quantityDelta: number, reason: string) => void;
  recordGoodsReceipt: (params: {
    poOrInvoice: string;
    items: { itemId: string; quantityReceived: number }[];
    supplierName: string;
  }) => void;
  createQualityInspection: (record: {
    batchPoNumber: string;
    componentName: string;
    toleranceVariance: string;
    sampleCount: number;
    inspectionTool: string;
    status: "passed" | "under_inspection" | "rework_required";
  }) => void;
  updateQualityStatus: (
    inspectionId: string,
    status: "passed" | "under_inspection" | "rework_required",
    notes?: string,
  ) => void;
  scheduleDispatch: (params: ScheduleDispatchParams) => OutboundShipment;
  signGatePass: (dispatchId: string) => void;
  resolveAlert: (alertId: string) => void;
  resetToDefaults: () => void;
}

export interface FactoryStoreContextType
  extends FactoryStoreState, FactoryStoreActions {}
