export interface ReportsKpiMetrics {
  oeePercent: number;
  oeeDelta: string;
  productionOutputUnits: number;
  scrapRatePercent: number;
  scrapRateDelta: string;
  mtbfHours: string;
}

export interface OeeTrendDay {
  day: string;
  oee: number;
  target: number;
  isPeak?: boolean;
}

export interface ShiftEfficiencyMetric {
  shiftName: string;
  efficiencyPercent: number;
  variant: 'mint' | 'navy' | 'coral';
}

export interface OutputVsTargetWeek {
  weekLabel: string;
  targetUnits: number;
  actualUnits: number;
  isCurrent?: boolean;
}

export interface DefectRootCauseItem {
  id: string;
  reason: string;
  percent: number;
  lossAmount: string;
  colorVariant: 'navy' | 'mint' | 'coral' | 'heroNavy';
}

export interface GeneratedReportItem {
  id: string;
  reportName: string;
  category: string;
  generatedBy: string;
  date: string;
  format: 'PDF' | 'CSV';
}
