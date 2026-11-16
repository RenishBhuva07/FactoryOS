import { createContext } from 'react';

export interface LayoutContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  toggleNotifications: () => void;
  isWhatsAppDigestOpen: boolean;
  setIsWhatsAppDigestOpen: (open: boolean) => void;
  toggleWhatsAppDigest: () => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
