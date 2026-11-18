export interface WorkstationMachine {
  id: string;
  code: string;
  category: string;
  name: string;
  status: 'operational' | 'maintenance' | 'idle';
  statusLabel: string;
  operatorOrTech: string;
  isTech?: boolean;
  currentJobOrTask: string;
  operatingHours: string;
  nextPmOrDowntime: string;
  actionText: string;
  isActionAlert?: boolean;
}

export interface SecondaryMachine {
  id: string;
  code: string;
  name: string;
  status: 'operational' | 'maintenance' | 'idle';
  statusLabel: string;
  operator: string;
  job: string;
  uptimeToday: string;
}

export interface MaintenanceTask {
  id: string;
  machine: string;
  taskDescription: string;
  frequency: string;
  assignedTech: string;
  status: 'in_progress' | 'due_tomorrow' | 'completed' | 'scheduled';
  statusLabel: string;
}

export interface MachineSupervisorLog {
  id: string;
  title: string;
  time: string;
  author: string;
  description: string;
}

export interface MachinesKpiMetrics {
  totalMachines: number;
  operationalCount: number;
  maintenanceCount: number;
  todayUtilizationPercent: number;
  utilizationTargetDelta: string;
  powerUptimeHours: string;
  shiftUptimeSubtext: string;
  maintenanceAlertsCount: number;
  alertSubtext: string;
}
