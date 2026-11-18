export type UserRole = "owner" | "manager" | "operator";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  factoryName?: string;
  createdAt: string;
}

export interface SignUpFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
  receiveWhatsAppUpdates: boolean;
}

export interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

