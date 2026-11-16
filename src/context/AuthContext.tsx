import React, { useEffect, useState } from "react";
import type { AuthUser, LoginFormData, SignUpFormData } from "../types/auth";
import { AuthContext } from "./authContextDef";

const STORAGE_KEY = "factoryos_auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signUp = async (data: SignUpFormData): Promise<AuthUser> => {
    const newUser: AuthUser = {
      id: "usr_" + Date.now(),
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: "owner",
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return newUser;
  };

  const login = async (data: LoginFormData): Promise<AuthUser> => {
    const existingUser: AuthUser = user || {
      id: "usr_default",
      name: "Rajesh Bhai Patel",
      email: data.identifier.includes("@") ? data.identifier : "rajesh@apexeng.in",
      phone: !data.identifier.includes("@") ? data.identifier : "+91 98250 12345",
      role: "owner",
      factoryName: "Apex Engineering Works",
      createdAt: new Date().toISOString(),
    };
    setUser(existingUser);
    return existingUser;
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
