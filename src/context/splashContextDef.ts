import { createContext } from "react";

export interface SplashContextType {
  isSplashActive: boolean;
  dismissSplash: () => void;
  replaySplash: () => void;
}

export const SplashContext = createContext<SplashContextType | undefined>(undefined);
