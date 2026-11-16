import { useContext } from 'react';
import { LayoutContext } from './layoutContextDef';
import type { LayoutContextType } from './layoutContextDef';

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
