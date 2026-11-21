import React, { useState, useCallback, useMemo } from 'react';
import { SplashContext } from './splashContextDef';

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);

  const dismissSplash = useCallback(() => {
    setIsSplashActive(false);
  }, []);

  const replaySplash = useCallback(() => {
    setIsSplashActive(true);
  }, []);

  const value = useMemo(
    () => ({
      isSplashActive,
      dismissSplash,
      replaySplash,
    }),
    [isSplashActive, dismissSplash, replaySplash]
  );

  return <SplashContext.Provider value={value}>{children}</SplashContext.Provider>;
};
