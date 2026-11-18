export type ManufacturingCategoryId =
  | 'machining'
  | 'fabrication'
  | 'injection_moulding'
  | 'foundry'
  | 'packaging'
  | 'electrical_hardware';

export interface ManufacturingCategoryOption {
  id: ManufacturingCategoryId;
  title: string;
  subtitle: string;
}

export type WorkforceBandId = 'micro' | 'typical' | 'mid' | 'large';

export interface WorkforceBandOption {
  id: WorkforceBandId;
  label: string;
  range: string;
  note: string;
  defaultWorkers: number;
}

export interface GidcLocationOption {
  value: string;
  label: string;
  hub: string;
}

export interface OnboardingBusinessDetails {
  factoryName: string;
  proprietorName: string;
  factoryLocation: string;
  mfgCategory: ManufacturingCategoryId;
  workforceBand: WorkforceBandId;
  workforceCount: number;
  gstin: string;
  currency: string;
  timezone: string;
}

export type DailyShiftModel = 'single' | 'two_shifts' | 'continuous';

export interface ShiftScheduleItem {
  id: string;
  name: string;
  code: string;
  badgeLabel: string;
  purpose: string;
  startTime: string;
  endTime: string;
  breakDurationMinutes: number;
  breakWindow: string;
  netWorkingHours: number;
  assignedSupervisorId?: string;
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface OnboardingShiftConfig {
  shiftModel: DailyShiftModel;
  shifts: ShiftScheduleItem[];
  weeklyOperatingDays: DayOfWeek[];
  enableOvertime: boolean;
  standardShiftHours: number;
  dailyCapacityRunPercent: number;
}

export type MachineCategory = 'cnc' | 'conventional' | 'all';

export interface OnboardingMachine {
  id: string;
  name: string;
  category: 'cnc' | 'conventional';
  typeLabel: string;
  modelYear: string;
  bayLocation: string;
  status: 'ready_for_production' | 'ready' | 'maintenance';
  statusLabel: string;
  qrGenerated: boolean;
}

export type SupervisorAccessRole =
  | 'shift_a_morning'
  | 'shift_b_evening'
  | 'shift_c_night'
  | 'qc_inspection'
  | 'floor_manager';

export interface OnboardingSupervisor {
  id: string;
  name: string;
  mobile: string;
  role: SupervisorAccessRole;
  roleLabel: string;
  shiftBadge: string;
  permissionsLabel: string;
  inviteStatus: 'whatsapp_ready' | 'sms_ready' | 'sent';
  passlink: string;
}

export interface OnboardingState {
  currentStep: number;
  businessDetails: OnboardingBusinessDetails;
  shiftConfig: OnboardingShiftConfig;
  machinery: OnboardingMachine[];
  supervisors: OnboardingSupervisor[];
  isDraftSaved: boolean;
  lastSavedAt: string | null;
}
