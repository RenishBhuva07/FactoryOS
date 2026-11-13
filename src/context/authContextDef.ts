import { createContext } from "react";
import type { AuthUser, LoginFormData, SignUpFormData } from "../types/auth";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signUp: (data: SignUpFormData) => Promise<AuthUser>;
  login: (data: LoginFormData) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

