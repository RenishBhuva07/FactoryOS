import { createContext } from "react";

export interface SplashContextType {
  isSplashActive: boolean;
  hasSeenSplash: boolean;
  dismissSplash: () => void;
  replaySplash: () => void;
  resetSplashSession: () => void;
}

export const SplashContext = createContext<SplashContextType | undefined>(
  undefined,
);
