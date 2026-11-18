export interface AssemblyLineStatus {
  id: string;
  lineCode: string;
  name: string;
  supervisor: string;
  currentBatch: string;
  completedUnits: number;
  targetUnits: number;
  status: 'running' | 'tool_change' | 'maintenance' | 'idle';
  statusLabel: string;
}

export interface ProductionKpiMetrics {
  equipUtilizationPercent: number;
  utilizationDelta: string;
  shiftOutputActual: number;
  shiftOutputTarget: number;
  shiftCompletionPercent: number;
  throughputRate: number;
  throughputRange: string;
  scrapRatePercent: number;
  scrapLoggedUnits: number;
  scrapToleranceText: string;
}

export interface ProductionLogEntry {
  id: string;
  machineCode: string;
  machineName: string;
  isVerified: boolean;
  jobCard: string;
  partName: string;
  shift: string;
  outputUnits: number;
  scrapUnits: number;
  scrapReason?: string;
  operatorName: string;
  cycleTime: string;
  verifiedBy: string;
}

export interface SupervisorSignOff {
  id: string;
  supervisorName: string;
  role: string;
  time: string;
  statusText: string;
}

export interface ScrapMachineBreakdown {
  id: string;
  machineName: string;
  reason: string;
  scrapUnits: number;
  totalShiftScrap: number;
}
