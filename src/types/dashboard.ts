export type SemanticStatus = 'completed' | 'inProgress' | 'pending' | 'issue';

export interface WalletItem {
  id: string;
  currency: 'USD' | 'EUR' | 'GBP';
  symbol: string;
  flag: string;
  balance: number;
  monthlyLimit: number;
  isActive: boolean;
}

export interface CreditCardItem {
  id: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  theme: 'navy' | 'mint-gradient' | 'coral' | 'coral-gradient';
  isActive: boolean;
  type: 'mastercard' | 'visa';
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  changeText: string;
  trend: 'up' | 'down';
  iconName: string;
  isHero?: boolean;
  accent?: 'default' | 'hero' | 'coral' | 'mint' | 'navy';
}

export interface ActivityTransaction {
  id: string;
  orderId: string;
  activity: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  price: number;
  status: SemanticStatus;
  statusLabel: string;
  date: string;
}

export interface MonthlyIncomeMetric {
  month: string;
  profit: number;
  loss: number;
}

export interface FactoryOutputKpi {
  produced: number;
  target: number;
  unit: string;
  targetAchievedPercent: number;
}

export interface WorkforceAttendanceKpi {
  present: number;
  total: number;
  onLeave: number;
  absent: number;
}

export interface ActiveOrdersKpi {
  inProgressCount: number;
  readyForDispatchCount: number;
  qcPendingCount: number;
  activePipelineValue: string;
}

export interface MachineStatusKpi {
  operational: number;
  total: number;
  maintenanceNote: string;
}

export interface HourlyOutputMetric {
  hour: string;
  actual: number;
  target: number;
  isAlert?: boolean;
  isCurrent?: boolean;
}

export interface AttentionAlertItem {
  id: string;
  title: string;
  categoryIcon: string;
  badgeText: string;
  badgeVariant: 'urgent' | 'warning' | 'success';
  description: string;
  secondaryActionText: string;
  primaryActionText: string;
}

export interface ManagerActivityItem {
  id: string;
  authorName: string;
  role: string;
  time: string;
  description: string;
  initials: string;
}
