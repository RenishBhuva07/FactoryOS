import React, { useEffect, useState, useCallback } from 'react';
import type {
  DailyShiftModel,
  DayOfWeek,
  OnboardingBusinessDetails,
  OnboardingMachine,
  OnboardingShiftConfig,
  OnboardingState,
  OnboardingSupervisor,
  ShiftScheduleItem,
  WorkforceBandId,
} from '../types/onboarding';
import { AuthContext } from './authContextDef';
import { OnboardingContext } from './onboardingContextDef';

const STORAGE_KEY = 'factoryos_onboarding_draft';

const defaultBusinessDetails: OnboardingBusinessDetails = {
  factoryName: 'Apex Engineering Works',
  proprietorName: 'Rajesh Bhai Patel',
  factoryLocation: 'GIDC Naroda / Phase II, Ahmedabad, Gujarat',
  mfgCategory: 'machining',
  workforceBand: 'typical',
  workforceCount: 24,
  gstin: '24AAACA1234A1Z5',
  currency: 'INR (Indian Rupee)',
  timezone: 'Asia/Kolkata (IST)',
};

const SHIFT_PRESETS: Record<DailyShiftModel, ShiftScheduleItem[]> = {
  single: [
    {
      id: 'shift-general',
      name: 'General Shift',
      code: 'G',
      badgeLabel: 'Day Shift',
      purpose: 'Standard daytime production, assembly & dispatch',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      breakDurationMinutes: 60,
      breakWindow: '01:00 PM - 02:00 PM',
      netWorkingHours: 8.0,
    },
  ],
  two_shifts: [
    {
      id: 'shift-a',
      name: 'Shift A (Morning / Day)',
      code: 'A',
      badgeLabel: 'Day Shift',
      purpose: 'Primary production & fabrication unit',
      startTime: '08:00 AM',
      endTime: '04:30 PM (16:30)',
      breakDurationMinutes: 45,
      breakWindow: '12:30 PM - 01:15 PM',
      netWorkingHours: 8.0,
    },
    {
      id: 'shift-b',
      name: 'Shift B (Evening / Night)',
      code: 'B',
      badgeLabel: 'Evening Shift',
      purpose: 'Finishing, batch packaging, and secondary press run',
      startTime: '04:30 PM (16:30)',
      endTime: '01:00 AM',
      breakDurationMinutes: 45,
      breakWindow: '08:30 PM - 09:15 PM',
      netWorkingHours: 8.0,
    },
  ],
  continuous: [
    {
      id: 'shift-cont-a',
      name: 'Shift A (Morning Run)',
      code: 'A',
      badgeLabel: 'Morning Shift',
      purpose: 'Primary CNC turning & heavy machining',
      startTime: '06:00 AM',
      endTime: '02:00 PM',
      breakDurationMinutes: 30,
      breakWindow: '09:30 AM - 10:00 AM',
      netWorkingHours: 7.5,
    },
    {
      id: 'shift-cont-b',
      name: 'Shift B (Afternoon Run)',
      code: 'B',
      badgeLabel: 'Afternoon Shift',
      purpose: 'Secondary milling, grinding & sub-assembly',
      startTime: '02:00 PM',
      endTime: '10:00 PM',
      breakDurationMinutes: 30,
      breakWindow: '05:30 PM - 06:00 PM',
      netWorkingHours: 7.5,
    },
    {
      id: 'shift-cont-c',
      name: 'Shift C (Night Run)',
      code: 'C',
      badgeLabel: 'Night Shift',
      purpose: 'Automated batch runs & cycle maintenance',
      startTime: '10:00 PM',
      endTime: '06:00 AM',
      breakDurationMinutes: 30,
      breakWindow: '01:30 AM - 02:00 AM',
      netWorkingHours: 7.5,
    },
  ],
};

const defaultShiftConfig: OnboardingShiftConfig = {
  shiftModel: 'two_shifts',
  shifts: SHIFT_PRESETS.two_shifts,
  weeklyOperatingDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  enableOvertime: true,
  standardShiftHours: 8.5,
  dailyCapacityRunPercent: 66.7,
};

const defaultMachinery: OnboardingMachine[] = [
  {
    id: 'mach-01',
    name: 'ACE Micromatic CNC Lathe #01',
    category: 'cnc',
    typeLabel: 'CNC Turning',
    modelYear: '2021 Model',
    bayLocation: 'Bay A (Chucker Section)',
    status: 'ready_for_production',
    statusLabel: 'Ready for Production',
    qrGenerated: true,
  },
  {
    id: 'mach-02',
    name: 'ACE Micromatic CNC Lathe #02',
    category: 'cnc',
    typeLabel: 'CNC Turning',
    modelYear: '2022 Model',
    bayLocation: 'Bay A (Chucker Section)',
    status: 'ready_for_production',
    statusLabel: 'Ready for Production',
    qrGenerated: true,
  },
  {
    id: 'mach-03',
    name: 'BFW Vertical Machining Centre (VMC-800)',
    category: 'cnc',
    typeLabel: 'Milling',
    modelYear: '2023 Model',
    bayLocation: 'Bay B (Milling Bay)',
    status: 'ready_for_production',
    statusLabel: 'Ready for Production',
    qrGenerated: true,
  },
  {
    id: 'mach-04',
    name: 'Conventional 6ft Heavy Lathe #01',
    category: 'conventional',
    typeLabel: 'Manual Lathe',
    modelYear: '2018 Model',
    bayLocation: 'Bay C (General Turning)',
    status: 'ready_for_production',
    statusLabel: 'Ready for Production',
    qrGenerated: true,
  },
  {
    id: 'mach-05',
    name: 'Conventional 6ft Heavy Lathe #02',
    category: 'conventional',
    typeLabel: 'Manual Lathe',
    modelYear: '2019 Model',
    bayLocation: 'Bay C (General Turning)',
    status: 'ready_for_production',
    statusLabel: 'Ready for Production',
    qrGenerated: true,
  },
  {
    id: 'mach-06',
    name: 'Batliboi Radial Drill Machine 32mm',
    category: 'conventional',
    typeLabel: 'Drilling & Tapping',
    modelYear: 'Pre-inspected',
    bayLocation: 'Tooling Annex',
    status: 'ready',
    statusLabel: 'Ready',
    qrGenerated: true,
  },
  {
    id: 'mach-07',
    name: 'Hydraulic Surface Grinder 400mm',
    category: 'conventional',
    typeLabel: 'Grinding & Finishing',
    modelYear: 'Pre-inspected',
    bayLocation: 'Grinding Room',
    status: 'ready',
    statusLabel: 'Ready',
    qrGenerated: true,
  },
  {
    id: 'mach-08',
    name: 'Manual Hydraulic Press 20T',
    category: 'conventional',
    typeLabel: 'Press & Assembly',
    modelYear: 'Pre-inspected',
    bayLocation: 'Sub-assembly Area',
    status: 'ready',
    statusLabel: 'Ready',
    qrGenerated: true,
  },
];

const defaultSupervisors: OnboardingSupervisor[] = [
  {
    id: 'sup-01',
    name: 'Ramesh Bhai',
    mobile: '+91 98251 44529',
    role: 'shift_a_morning',
    roleLabel: 'Shift A (Morning)',
    shiftBadge: 'Shift A (Morning)',
    permissionsLabel: 'Production Logging & Attendance only',
    inviteStatus: 'whatsapp_ready',
    passlink: 'factoryos.in/m/apex-eng-shift-a',
  },
  {
    id: 'sup-02',
    name: 'Amit Patel',
    mobile: '+91 98982 77184',
    role: 'shift_b_evening',
    roleLabel: 'Shift B (Evening)',
    shiftBadge: 'Shift B (Evening)',
    permissionsLabel: 'Production Logging & Attendance only',
    inviteStatus: 'whatsapp_ready',
    passlink: 'factoryos.in/m/apex-eng-shift-b',
  },
  {
    id: 'sup-03',
    name: 'Dinesh M.',
    mobile: '+91 97248 88319',
    role: 'qc_inspection',
    roleLabel: 'Quality Control',
    shiftBadge: 'Quality Control',
    permissionsLabel: 'QC Inspection & Scrap Logging',
    inviteStatus: 'sms_ready',
    passlink: 'factoryos.in/m/apex-eng-qc',
  },
];

const defaultInitialState: OnboardingState = {
  currentStep: 1,
  businessDetails: defaultBusinessDetails,
  shiftConfig: defaultShiftConfig,
  machinery: defaultMachinery,
  supervisors: defaultSupervisors,
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
        return {
          ...defaultInitialState,
          ...parsed,
          shiftConfig: parsed.shiftConfig || defaultShiftConfig,
          machinery: parsed.machinery || defaultMachinery,
          supervisors: parsed.supervisors || defaultSupervisors,
        };
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

  const updateBusinessDetails = useCallback((details: Partial<OnboardingBusinessDetails>) => {
    setState((prev) => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        ...details,
      },
    }));
  }, []);

  const setWorkforceBand = useCallback((band: WorkforceBandId, count?: number) => {
    let resolvedCount = count;
    if (resolvedCount === undefined) {
      switch (band) {
        case 'micro':
          resolvedCount = 10;
          break;
        case 'typical':
          resolvedCount = 24;
          break;
        case 'mid':
          resolvedCount = 50;
          break;
        case 'large':
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
  }, []);

  const updateShiftConfig = useCallback((config: Partial<OnboardingShiftConfig>) => {
    setState((prev) => {
      const newModel = config.shiftModel || prev.shiftConfig.shiftModel;
      const modelChanged = config.shiftModel && config.shiftModel !== prev.shiftConfig.shiftModel;
      const shifts = config.shifts || (modelChanged ? SHIFT_PRESETS[newModel] : prev.shiftConfig.shifts);
      const totalShiftCount = newModel === 'single' ? 1 : newModel === 'continuous' ? 3 : 2;
      const hoursPerShift = 8.5;
      const openDaysCount = (config.weeklyOperatingDays || prev.shiftConfig.weeklyOperatingDays).length;
      const totalWeekHours = openDaysCount * hoursPerShift * totalShiftCount;
      const capacityPercent = Math.min(100, Math.round((totalWeekHours / 168) * 100 * 10) / 10);

      return {
        ...prev,
        shiftConfig: {
          ...prev.shiftConfig,
          ...config,
          shiftModel: newModel,
          shifts,
          dailyCapacityRunPercent: capacityPercent > 0 ? capacityPercent : 66.7,
        },
      };
    });
  }, []);

  const updateShiftScheduleItem = useCallback((shiftId: string, updates: Partial<ShiftScheduleItem>) => {
    setState((prev) => ({
      ...prev,
      shiftConfig: {
        ...prev.shiftConfig,
        shifts: prev.shiftConfig.shifts.map((s) => (s.id === shiftId ? { ...s, ...updates } : s)),
      },
    }));
  }, []);

  const toggleOperatingDay = useCallback((day: DayOfWeek) => {
    setState((prev) => {
      const current = prev.shiftConfig.weeklyOperatingDays;
      const updated = current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day];
      const hoursPerShift = 8.5;
      const totalShiftCount = prev.shiftConfig.shiftModel === 'single' ? 1 : prev.shiftConfig.shiftModel === 'continuous' ? 3 : 2;
      const totalWeekHours = updated.length * hoursPerShift * totalShiftCount;
      const capacityPercent = Math.min(100, Math.round((totalWeekHours / 168) * 100 * 10) / 10);

      return {
        ...prev,
        shiftConfig: {
          ...prev.shiftConfig,
          weeklyOperatingDays: updated,
          dailyCapacityRunPercent: capacityPercent > 0 ? capacityPercent : 66.7,
        },
      };
    });
  }, []);

  const addMachine = useCallback((machine: Omit<OnboardingMachine, 'id' | 'qrGenerated'>) => {
    const newMachine: OnboardingMachine = {
      ...machine,
      id: `mach-${Date.now()}`,
      qrGenerated: true,
    };
    setState((prev) => ({
      ...prev,
      machinery: [...prev.machinery, newMachine],
    }));
  }, []);

  const updateMachine = useCallback((id: string, machine: Partial<OnboardingMachine>) => {
    setState((prev) => ({
      ...prev,
      machinery: prev.machinery.map((m) => (m.id === id ? { ...m, ...machine } : m)),
    }));
  }, []);

  const deleteMachine = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      machinery: prev.machinery.filter((m) => m.id !== id),
    }));
  }, []);

  const addSupervisor = useCallback((supervisor: Omit<OnboardingSupervisor, 'id' | 'passlink'>) => {
    const slug = supervisor.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newSupervisor: OnboardingSupervisor = {
      ...supervisor,
      id: `sup-${Date.now()}`,
      passlink: `factoryos.in/m/apex-${slug}`,
    };
    setState((prev) => ({
      ...prev,
      supervisors: [...prev.supervisors, newSupervisor],
    }));
  }, []);

  const removeSupervisor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      supervisors: prev.supervisors.filter((s) => s.id !== id),
    }));
  }, []);

  const saveDraft = useCallback(() => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setState((prev) => ({
      ...prev,
      isDraftSaved: true,
      lastSavedAt: timestamp,
    }));
  }, []);

  const goToNextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, 4)),
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: 4,
      isDraftSaved: true,
    }));
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateBusinessDetails,
        setWorkforceBand,
        updateShiftConfig,
        updateShiftScheduleItem,
        toggleOperatingDay,
        addMachine,
        updateMachine,
        deleteMachine,
        addSupervisor,
        removeSupervisor,
        saveDraft,
        goToNextStep,
        goToPreviousStep,
        setStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
