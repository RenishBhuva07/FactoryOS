import type {
  ReportsKpiMetrics,
  OeeTrendDay,
  ShiftEfficiencyMetric,
  OutputVsTargetWeek,
  DefectRootCauseItem,
  GeneratedReportItem,
} from '../types/reports';

export const MOCK_REPORTS_KPIS: ReportsKpiMetrics = {
  oeePercent: 87.4,
  oeeDelta: '+2.1% vs last mo.',
  productionOutputUnits: 42850,
  scrapRatePercent: 1.2,
  scrapRateDelta: '-0.4% optimal',
  mtbfHours: '184h',
};

export const MOCK_OEE_TREND: OeeTrendDay[] = [
  { day: 'Mon', oee: 82, target: 85 },
  { day: 'Tue', oee: 84, target: 85 },
  { day: 'Wed', oee: 86, target: 85 },
  { day: 'Thu', oee: 92, target: 85, isPeak: true },
  { day: 'Fri', oee: 88, target: 85 },
  { day: 'Sat', oee: 81, target: 85 },
  { day: 'Sun', oee: 85, target: 85 },
];

export const MOCK_SHIFT_EFFICIENCIES: ShiftEfficiencyMetric[] = [
  { shiftName: 'Morning Shift (A)', efficiencyPercent: 91.2, variant: 'mint' },
  { shiftName: 'Evening Shift (B)', efficiencyPercent: 86.5, variant: 'navy' },
  { shiftName: 'Night Shift (C)', efficiencyPercent: 78.4, variant: 'coral' },
];

export const MOCK_OUTPUT_VS_TARGET: OutputVsTargetWeek[] = [
  { weekLabel: 'Week 42', targetUnits: 10000, actualUnits: 9850 },
  { weekLabel: 'Week 43', targetUnits: 10500, actualUnits: 10700 },
  { weekLabel: 'Week 44', targetUnits: 11000, actualUnits: 10400 },
  { weekLabel: 'Week 45 (Current)', targetUnits: 11000, actualUnits: 11250, isCurrent: true },
];

export const MOCK_DEFECT_ROOT_CAUSES: DefectRootCauseItem[] = [
  { id: 'rc-01', reason: 'Calibration Drift', percent: 42, lossAmount: '$1,785', colorVariant: 'navy' },
  { id: 'rc-02', reason: 'Raw Material Flaw', percent: 28, lossAmount: '$1,190', colorVariant: 'mint' },
  { id: 'rc-03', reason: 'Operator Error', percent: 18, lossAmount: '$765', colorVariant: 'coral' },
  { id: 'rc-04', reason: 'Other / Unclassified', percent: 12, lossAmount: '$510', colorVariant: 'heroNavy' },
];

export const MOCK_GENERATED_REPORTS: GeneratedReportItem[] = [
  {
    id: 'rep-01',
    reportName: 'Monthly OEE & Downtime Summary',
    category: 'Executive',
    generatedBy: 'Marcus Vance',
    date: 'Nov 01, 2023',
    format: 'PDF',
  },
  {
    id: 'rep-02',
    reportName: 'Shift C Production & Scrap Audit',
    category: 'Quality Control',
    generatedBy: 'Sarah Jenkins',
    date: 'Oct 28, 2023',
    format: 'CSV',
  },
  {
    id: 'rep-03',
    reportName: 'Machine Maintenance & MTBF Log',
    category: 'Maintenance',
    generatedBy: 'Auto-System',
    date: 'Oct 25, 2023',
    format: 'PDF',
  },
];
