import type {
  QualityKpiMetrics,
  QualityInspectionBatch,
  CalibrationTool,
  DefectReasonItem,
} from '../types/quality';

export const MOCK_QUALITY_KPIS: QualityKpiMetrics = {
  firstPassYield: 97.4,
  yieldTarget: 'Target: > 96.0%',
  inspectedBatchesDone: 14,
  inspectedBatchesTotal: 16,
  quotaClearedPercent: 87.5,
  defectRatePercent: 1.4,
  defectToleranceText: 'Tolerance limit: < 2.0%',
  pendingQuarantineCount: 1,
  quarantineBatchInfo: 'Batch #QC-1042 • Burr rework',
};

export const MOCK_QUALITY_INSPECTIONS: QualityInspectionBatch[] = [
  {
    id: 'qc-01',
    batchPoNumber: 'PO #ORD-1042',
    componentName: 'Cast Gear Casings',
    componentSpec: 'Standard 280mm',
    toleranceVariance: '+0.03mm',
    toleranceDetail: 'Spec: 280.00 ± 0.05mm',
    sampleCheckedText: '20 pcs checked (Vernier/Bore Gauge)',
    inspectorName: 'Dinesh M. (QC Inspector)',
    status: 'passed',
    statusLabel: 'Passed',
    actionText: 'Sign Inspection Certificate',
    actionType: 'sign_cert',
  },
  {
    id: 'qc-02',
    batchPoNumber: 'PO #ORD-1039',
    componentName: 'Mild Steel Flange Bushings',
    componentSpec: 'Series 40',
    toleranceVariance: '+0.08mm',
    toleranceDetail: 'Near tolerance limit',
    sampleCheckedText: '50 pcs checked (Micrometer)',
    inspectorName: 'Ramesh Bhai (Supervisor)',
    status: 'under_inspection',
    statusLabel: 'Under Inspection',
    actionText: 'Log Deviation Note',
    actionType: 'log_deviation',
  },
  {
    id: 'qc-03',
    batchPoNumber: 'PO #ORD-1031',
    componentName: 'Mild Steel Base Plates',
    componentSpec: '12mm',
    toleranceVariance: 'Surface Burr & Roughness',
    toleranceDetail: 'Rough edge defects',
    sampleCheckedText: '30 pcs checked',
    inspectorName: 'Dinesh M.',
    status: 'rework_required',
    statusLabel: 'Rework Required',
    actionText: 'Send to Deburring Line',
    actionType: 'send_rework',
  },
];

export const MOCK_CALIBRATION_TOOLS: CalibrationTool[] = [
  {
    id: 'cal-01',
    toolName: 'Vernier Caliper #01',
    toolSpec: 'Mitutoyo 300mm',
    statusText: 'Calibrated',
    validUntil: 'Valid till Oct 2025',
    isCalibrated: true,
  },
  {
    id: 'cal-02',
    toolName: 'Micrometer',
    toolSpec: '0-25mm / 0.01mm',
    statusText: 'Calibrated',
    validUntil: 'Valid till Dec 2025',
    isCalibrated: true,
  },
  {
    id: 'cal-03',
    toolName: 'Dial Bore Gauge & Height Gauge',
    toolSpec: 'Master ring zeroed',
    statusText: 'Calibrated',
    validUntil: 'Valid till Nov 2025',
    isCalibrated: true,
  },
];

export const MOCK_DEFECT_REASONS: DefectReasonItem[] = [
  {
    id: 'def-01',
    reason: 'Tool chatter / dimension drift',
    percent: 45,
    colorVariant: 'navy',
  },
  {
    id: 'def-02',
    reason: 'Surface burrs',
    percent: 30,
    colorVariant: 'mint',
  },
  {
    id: 'def-03',
    reason: 'Thread mismatch',
    percent: 15,
    colorVariant: 'coral',
  },
  {
    id: 'def-04',
    reason: 'Material porosity',
    percent: 10,
    colorVariant: 'heroNavy',
  },
];
