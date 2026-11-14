import type {
  WalletItem,
  CreditCardItem,
  KpiMetric,
  ActivityTransaction,
  MonthlyIncomeMetric,
  FactoryOutputKpi,
  WorkforceAttendanceKpi,
  ActiveOrdersKpi,
  MachineStatusKpi,
  HourlyOutputMetric,
  AttentionAlertItem,
  ManagerActivityItem,
} from '../types/dashboard';

export const MOCK_WALLETS: WalletItem[] = [
  {
    id: 'usd',
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    balance: 22678,
    monthlyLimit: 10000,
    isActive: true,
  },
  {
    id: 'eur',
    currency: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    balance: 18345,
    monthlyLimit: 8000,
    isActive: true,
  },
  {
    id: 'gbp',
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    balance: 15000,
    monthlyLimit: 75000,
    isActive: false,
  },
];

export const MOCK_CREDIT_CARDS: CreditCardItem[] = [
  {
    id: 'card-1',
    cardNumber: '•••• •••• 6782',
    expiry: '09/29',
    cvv: '611',
    theme: 'navy',
    isActive: true,
    type: 'mastercard',
  },
  {
    id: 'card-2',
    cardNumber: '•••• •••• 4356',
    expiry: '11/30',
    cvv: '842',
    theme: 'coral',
    isActive: true,
    type: 'mastercard',
  },
];

export const MOCK_KPIS: KpiMetric[] = [
  {
    id: 'earnings',
    title: 'Total Earnings',
    value: '$950',
    changeText: '7% This month',
    trend: 'up',
    iconName: 'account_balance_wallet',
    isHero: true,
    accent: 'navy',
  },
  {
    id: 'spending',
    title: 'Total Spending',
    value: '$700',
    changeText: '5% This month',
    trend: 'down',
    iconName: 'shopping_bag',
    isHero: true,
    accent: 'coral',
  },
  {
    id: 'income',
    title: 'Total Income',
    value: '$1,050',
    changeText: '8% This month',
    trend: 'up',
    iconName: 'savings',
    isHero: true,
    accent: 'coral',
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$850',
    changeText: '4% This month',
    trend: 'up',
    iconName: 'analytics',
    isHero: true,
    accent: 'mint',
  },
];

export const MOCK_TRANSACTIONS: ActivityTransaction[] = [
  {
    id: 'tx-1',
    orderId: 'INV_000076',
    activity: 'Mobile App Purchase',
    icon: 'apps',
    iconBg: '#DFECF3',
    iconColor: '#002941',
    price: 25500,
    status: 'completed',
    statusLabel: 'Completed',
    date: '17 Apr, 2026 03:45 PM',
  },
  {
    id: 'tx-2',
    orderId: 'INV_000075',
    activity: 'Hotel Booking',
    icon: 'near_me',
    iconBg: '#F0F5F9',
    iconColor: '#002941',
    price: 32750,
    status: 'pending',
    statusLabel: 'Pending',
    date: '15 Apr, 2026 11:30 AM',
  },
  {
    id: 'tx-3',
    orderId: 'INV_000074',
    activity: 'Flight Ticket Booking',
    icon: 'flight',
    iconBg: '#DFECF3',
    iconColor: '#002941',
    price: 40200,
    status: 'completed',
    statusLabel: 'Completed',
    date: '15 Apr, 2026 12:00 PM',
  },
  {
    id: 'tx-4',
    orderId: 'INV_000073',
    activity: 'Grocery Purchase',
    icon: 'flare',
    iconBg: '#E4F4F0',
    iconColor: '#184E46',
    price: 50200,
    status: 'inProgress',
    statusLabel: 'In Progress',
    date: '14 Apr, 2026 09:15 PM',
  },
  {
    id: 'tx-5',
    orderId: 'INV_000073',
    activity: 'Software License',
    icon: 'change_history',
    iconBg: '#FFF4F3',
    iconColor: '#FD6E6E',
    price: 15900,
    status: 'completed',
    statusLabel: 'Completed',
    date: '10 Apr, 2026 06:00 AM',
  },
];

export const MOCK_MONTHLY_INCOME: MonthlyIncomeMetric[] = [
  { month: 'Jan', profit: 18000, loss: 22000 },
  { month: 'Feb', profit: 24000, loss: 16000 },
  { month: 'Mar', profit: 20000, loss: 17000 },
  { month: 'Apr', profit: 23000, loss: 20000 },
  { month: 'May', profit: 27000, loss: 19000 },
  { month: 'Jun', profit: 29000, loss: 26000 },
  { month: 'Jul', profit: 25000, loss: 18000 },
  { month: 'Aug', profit: 21000, loss: 17000 },
];

export const MOCK_FACTORY_OUTPUT: FactoryOutputKpi = {
  produced: 1420,
  target: 1600,
  unit: 'pcs',
  targetAchievedPercent: 88.7,
};

export const MOCK_WORKFORCE_ATTENDANCE: WorkforceAttendanceKpi = {
  present: 22,
  total: 24,
  onLeave: 2,
  absent: 0,
};

export const MOCK_ACTIVE_ORDERS: ActiveOrdersKpi = {
  inProgressCount: 12,
  readyForDispatchCount: 2,
  qcPendingCount: 1,
  activePipelineValue: '₹14.8L',
};

export const MOCK_MACHINE_STATUS: MachineStatusKpi = {
  operational: 7,
  total: 8,
  maintenanceNote: 'Lathe #04 in maintenance',
};

export const MOCK_HOURLY_OUTPUT: HourlyOutputMetric[] = [
  { hour: '8 AM', actual: 230, target: 260 },
  { hour: '9 AM', actual: 240, target: 260 },
  { hour: '10 AM', actual: 215, target: 260 },
  { hour: '11 AM', actual: 165, target: 260, isAlert: true },
  { hour: '12 PM', actual: 175, target: 220 },
  { hour: '1 PM', actual: 195, target: 260 },
  { hour: '2 PM', actual: 240, target: 260 },
  { hour: '3 PM*', actual: 255, target: 260, isCurrent: true },
];

export const MOCK_ATTENTION_ALERTS: AttentionAlertItem[] = [
  {
    id: 'alert-1',
    title: 'Lathe #04 Scheduled Maintenance',
    categoryIcon: 'build',
    badgeText: 'Due by 4:00 PM',
    badgeVariant: 'urgent',
    description: 'Lathe #04 Preventive Maintenance due by 4:00 PM. Lubrication and tool-head inspection scheduled with technician.',
    secondaryActionText: 'View Schedule',
    primaryActionText: 'Mark Completed',
  },
  {
    id: 'alert-2',
    title: 'Raw Material Alert: EN8 Steel',
    categoryIcon: 'inventory_2',
    badgeText: 'Stock: 45 kg',
    badgeVariant: 'warning',
    description: 'EN8 Steel Rods (16mm) low stock (45 kg remaining). Required for tomorrow\'s shaft machining batch.',
    secondaryActionText: 'Check Store',
    primaryActionText: 'Quick PO / Re-order (₹32,000)',
  },
  {
    id: 'alert-3',
    title: 'Order #ORD-1042 QC Approval',
    categoryIcon: 'verified',
    badgeText: '850 pcs ready',
    badgeVariant: 'success',
    description: 'Order #ORD-1042 (Rajkot Auto Spares) 850 pcs machined, awaiting Manager QC sign-off before dispatch staging.',
    secondaryActionText: 'Inspect Batch',
    primaryActionText: 'Notify Ramesh (Supervisor)',
  },
];

export const MOCK_MANAGER_ACTIVITIES: ManagerActivityItem[] = [
  {
    id: 'act-1',
    authorName: 'Ramesh Bhai',
    role: 'Shift A Supervisor',
    time: '1:45 PM',
    description: 'Recorded 420 pcs output on Lathe #01...',
    initials: 'RB',
  },
  {
    id: 'act-2',
    authorName: 'Amit Patel',
    role: 'Shift B Supervisor',
    time: '11:30 AM',
    description: 'Received raw material consignment (2...',
    initials: 'AP',
  },
  {
    id: 'act-3',
    authorName: 'Dinesh M.',
    role: 'QC Inspector',
    time: '10:15 AM',
    description: 'Cleared 350 flange housings for Dispat...',
    initials: 'DM',
  },
];
