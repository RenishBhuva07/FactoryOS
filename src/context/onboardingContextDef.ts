import { createContext } from 'react';
import type {
  DayOfWeek,
  OnboardingBusinessDetails,
  OnboardingMachine,
  OnboardingShiftConfig,
  OnboardingState,
  OnboardingSupervisor,
  ShiftScheduleItem,
  WorkforceBandId,
} from '../types/onboarding';

export interface OnboardingContextType {
  state: OnboardingState;
  updateBusinessDetails: (details: Partial<OnboardingBusinessDetails>) => void;
  setWorkforceBand: (band: WorkforceBandId, count?: number) => void;
  updateShiftConfig: (config: Partial<OnboardingShiftConfig>) => void;
  updateShiftScheduleItem: (shiftId: string, updates: Partial<ShiftScheduleItem>) => void;
  toggleOperatingDay: (day: DayOfWeek) => void;
  addMachine: (machine: Omit<OnboardingMachine, 'id' | 'qrGenerated'>) => void;
  updateMachine: (id: string, machine: Partial<OnboardingMachine>) => void;
  deleteMachine: (id: string) => void;
  addSupervisor: (supervisor: Omit<OnboardingSupervisor, 'id' | 'passlink'>) => void;
  removeSupervisor: (id: string) => void;
  saveDraft: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStep: (step: number) => void;
  completeOnboarding: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);
