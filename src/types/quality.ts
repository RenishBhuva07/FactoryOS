export interface QualityInspectionBatch {
  id: string;
  batchPoNumber: string;
  componentName: string;
  componentSpec: string;
  toleranceVariance: string;
  toleranceDetail: string;
  sampleCheckedText: string;
  inspectorName: string;
  status: 'passed' | 'under_inspection' | 'rework_required';
  statusLabel: string;
  actionText: string;
  actionType: 'sign_cert' | 'log_deviation' | 'send_rework';
}

export interface CalibrationTool {
  id: string;
  toolName: string;
  toolSpec: string;
  statusText: string;
  validUntil: string;
  isCalibrated: boolean;
}

export interface DefectReasonItem {
  id: string;
  reason: string;
  percent: number;
  colorVariant: 'navy' | 'mint' | 'coral' | 'heroNavy';
}

export interface QualityKpiMetrics {
  firstPassYield: number;
  yieldTarget: string;
  inspectedBatchesDone: number;
  inspectedBatchesTotal: number;
  quotaClearedPercent: number;
  defectRatePercent: number;
  defectToleranceText: string;
  pendingQuarantineCount: number;
  quarantineBatchInfo: string;
}
