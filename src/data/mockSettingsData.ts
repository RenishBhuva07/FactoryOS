import type {
  TeamMemberPermission,
  BillingInvoice,
  FactoryParameters,
} from '../types/settings';

export const MOCK_FACTORY_PARAMETERS: FactoryParameters = {
  plantName: 'Apex Manufacturing - Plant #04',
  defaultTimezone: 'India Standard Time (IST) UTC+05:30',
  telemetrySamplingRate: 'High Resolution (10 seconds)',
  safetyProtocolLevel: 'Level 3 - Strict Organic Safeguard',
};

export const MOCK_TEAM_PERMISSIONS: TeamMemberPermission[] = [
  {
    id: 'usr-01',
    name: 'Marcus Vance',
    email: 'marcus@apex-mfg.com',
    role: 'Plant Manager',
    avatarInitials: 'MV',
    isActive: true,
  },
  {
    id: 'usr-02',
    name: 'Sarah Lin',
    email: 'sarah.l@apex-mfg.com',
    role: 'Safety Inspector',
    avatarInitials: 'SL',
    isActive: true,
  },
  {
    id: 'usr-03',
    name: 'David Kross',
    email: 'd.kross@apex-mfg.com',
    role: 'Machine Operator',
    avatarInitials: 'DK',
    isActive: false,
  },
];

export const MOCK_INVOICE_HISTORY: BillingInvoice[] = [
  {
    id: 'inv-01',
    invoiceNumber: 'INV-2024-10',
    date: 'Oct 14, 2024',
    amount: '$1,250.00',
    status: 'Paid',
  },
  {
    id: 'inv-02',
    invoiceNumber: 'INV-2024-09',
    date: 'Sep 14, 2024',
    amount: '$1,250.00',
    status: 'Paid',
  },
  {
    id: 'inv-03',
    invoiceNumber: 'INV-2024-08',
    date: 'Aug 14, 2024',
    amount: '$1,250.00',
    status: 'Paid',
  },
];
