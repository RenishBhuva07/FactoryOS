import { createContext } from "react";
import type {
  OnboardingBusinessDetails,
  OnboardingState,
  WorkforceBandId,
} from "../types/onboarding";

export interface OnboardingContextType {
  state: OnboardingState;
  updateBusinessDetails: (details: Partial<OnboardingBusinessDetails>) => void;
  setWorkforceBand: (band: WorkforceBandId, count?: number) => void;
  saveDraft: () => void;
  goToNextStep: () => void;
  setStep: (step: number) => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

