export interface TeamMemberPermission {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  isActive: boolean;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending';
}

export interface FactoryParameters {
  plantName: string;
  defaultTimezone: string;
  telemetrySamplingRate: string;
  safetyProtocolLevel: string;
}
