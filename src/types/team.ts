export interface TeamMemberRoster {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  assignedStation: string;
  shift: string;
  punchInTime: string;
  status: 'on_spindle' | 'on_break' | 'overtime' | 'absent';
  statusLabel: string;
}

export interface TeamAttendanceKpis {
  presentCount: number;
  totalShiftCount: number;
  presentPercent: number;
  biometricCompliancePercent: number;
  overtimeHours: string;
  criticalStationAbsenceCount: number;
  criticalStationDetail: string;
}

export interface StationCoverageItem {
  id: string;
  stationName: string;
  coveragePercent: number;
  variant: 'mint' | 'navy' | 'coral';
}
