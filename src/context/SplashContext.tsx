import React, { useState, useCallback, useMemo } from "react";
import { SplashContext } from "./splashContextDef";

const SPLASH_SESSION_KEY = "factoryos_splash_shown";

function checkInitialSplashState(): { isActive: boolean; hasSeen: boolean } {
  if (typeof window === "undefined") {
    return { isActive: true, hasSeen: false };
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get("splash") === "1" || params.get("splash") === "true") {
    return { isActive: true, hasSeen: false };
  }
  try {
    const shown = window.sessionStorage.getItem(SPLASH_SESSION_KEY);
    const hasSeen = shown === "true";
    return { isActive: !hasSeen, hasSeen };
  } catch {
    return { isActive: true, hasSeen: false };
  }
}

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(() => checkInitialSplashState());

  const dismissSplash = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false, hasSeen: true }));
    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    } catch {
      // Storage access blocked or unavailable
    }
  }, []);

  const replaySplash = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: true }));
  }, []);

  const resetSplashSession = useCallback(() => {
    try {
      window.sessionStorage.removeItem(SPLASH_SESSION_KEY);
    } catch {
      // Storage access blocked or unavailable
    }
    setState({ isActive: true, hasSeen: false });
  }, []);

  const value = useMemo(
    () => ({
      isSplashActive: state.isActive,
      hasSeenSplash: state.hasSeen,
      dismissSplash,
      replaySplash,
      resetSplashSession,
    }),
    [
      state.isActive,
      state.hasSeen,
      dismissSplash,
      replaySplash,
      resetSplashSession,
    ],
  );

  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  );
};
