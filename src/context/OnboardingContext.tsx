import React, { useEffect, useState } from "react";
import type {
  OnboardingBusinessDetails,
  OnboardingState,
  WorkforceBandId,
} from "../types/onboarding";
import { AuthContext } from "./authContextDef";
import { OnboardingContext } from "./onboardingContextDef";

const STORAGE_KEY = "factoryos_onboarding_draft";

const defaultBusinessDetails: OnboardingBusinessDetails = {
  factoryName: "Apex Engineering Works",
  proprietorName: "Rajesh Bhai Patel",
  factoryLocation: "gidc_naroda",
  mfgCategory: "machining",
  workforceBand: "typical",
  workforceCount: 24,
  gstin: "24AAACA1234A1Z5",
  currency: "INR (Indian Rupee)",
  timezone: "Asia/Kolkata (IST)",
};

const defaultInitialState: OnboardingState = {
  currentStep: 1,
  businessDetails: defaultBusinessDetails,
  isDraftSaved: false,
  lastSavedAt: null,
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = React.useContext(AuthContext);
  const user = auth?.user;

  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (user?.name && parsed.businessDetails) {
          parsed.businessDetails.proprietorName = user.name;
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return {
      ...defaultInitialState,
      businessDetails: {
        ...defaultBusinessDetails,
        proprietorName: user?.name || defaultBusinessDetails.proprietorName,
      },
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const updateBusinessDetails = (details: Partial<OnboardingBusinessDetails>) => {
    setState((prev) => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        ...details,
      },
    }));
  };

  const setWorkforceBand = (band: WorkforceBandId, count?: number) => {
    let resolvedCount = count;
    if (resolvedCount === undefined) {
      switch (band) {
        case "micro":
          resolvedCount = 10;
          break;
        case "typical":
          resolvedCount = 24;
          break;
        case "mid":
          resolvedCount = 50;
          break;
        case "large":
          resolvedCount = 100;
          break;
      }
    }
    setState((prev) => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        workforceBand: band,
        workforceCount: resolvedCount,
      },
    }));
  };

  const saveDraft = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setState((prev) => ({
      ...prev,
      isDraftSaved: true,
      lastSavedAt: timestamp,
    }));
  };

  const goToNextStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }));
  };

  const setStep = (step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, 4)),
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateBusinessDetails,
        setWorkforceBand,
        saveDraft,
        goToNextStep,
        setStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
