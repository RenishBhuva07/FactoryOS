export type SupportCategory =
  | 'all'
  | 'onboarding_shifts'
  | 'mobile_workbench'
  | 'machinery_qr'
  | 'owner_privacy_security'
  | 'billing_gst';

export interface FaqItem {
  id: string;
  category: SupportCategory;
  question: string;
  answer: string;
  highlightTag?: string;
}

export interface SupportContactChannel {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  actionLabel: string;
  actionUrl: string;
  icon: string;
  isPrimary?: boolean;
  badge?: string;
}

export interface VideoGuideItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  thumbnailUrl?: string;
  icon: string;
}

export interface SupportTicketFormData {
  factoryName: string;
  contactName: string;
  mobileNumber: string;
  category: SupportCategory;
  urgency: 'low' | 'normal' | 'urgent';
  description: string;
}
